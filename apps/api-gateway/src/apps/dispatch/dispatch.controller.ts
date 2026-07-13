import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole, WorkOrderStatus } from '@prisma/client';
import { DispatchService } from './dispatch.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('dispatch')
export class DispatchController {
  constructor(private dispatchService: DispatchService) {}

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.DISPATCHER,
    UserRole.MANAGER,
    UserRole.OFFICE_MANAGER,
  )
  @Get('orders')
  getActiveOrders() {
    return this.dispatchService.getAllActiveOrders();
  }

  @Roles(UserRole.OWNER, UserRole.ADMINISTRATOR, UserRole.DISPATCHER, UserRole.MANAGER)
  @Patch('orders/:id/assign')
  assignTechnician(
    @Param('id') id: string,
    @Body() body: { technicianId: string },
  ) {
    return this.dispatchService.assignTechnician(id, body.technicianId);
  }

  @Roles(UserRole.OWNER, UserRole.ADMINISTRATOR, UserRole.DISPATCHER, UserRole.TECHNICIAN)
  @Patch('orders/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: WorkOrderStatus },
  ) {
    return this.dispatchService.updateStatus(id, body.status);
  }
}
