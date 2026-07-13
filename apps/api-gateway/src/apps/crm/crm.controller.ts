import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { CrmService } from './crm.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('crm')
export class CrmController {
  constructor(private crmService: CrmService) {}

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.CUSTOMER_SERVICE,
    UserRole.MANAGER,
    UserRole.OFFICE_MANAGER,
    UserRole.SALES,
    UserRole.DISPATCHER,
  )
  @Get('customers')
  getCustomers(@Query('search') search?: string) {
    return this.crmService.getCustomers(search);
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.CUSTOMER_SERVICE,
    UserRole.MANAGER,
    UserRole.OFFICE_MANAGER,
    UserRole.SALES,
    UserRole.DISPATCHER,
    UserRole.TECHNICIAN,
  )
  @Get('customers/:id')
  getCustomer(@Param('id') id: string) {
    return this.crmService.getCustomer(id);
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.CUSTOMER_SERVICE,
    UserRole.OFFICE_MANAGER,
    UserRole.SALES,
  )
  @Post('customers')
  createCustomer(
    @Body()
    body: {
      squareId?: string;
      companyName?: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    },
  ) {
    return this.crmService.createCustomer(body);
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.CUSTOMER_SERVICE,
    UserRole.OFFICE_MANAGER,
  )
  @Post('equipment')
  createEquipment(
    @Body()
    body: {
      customerId: string;
      type: string;
      brand: string;
      modelNumber: string;
      serialNumber: string;
      warrantyExpiry?: Date;
    },
  ) {
    return this.crmService.createEquipment(body);
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.CUSTOMER_SERVICE,
    UserRole.DISPATCHER,
    UserRole.OFFICE_MANAGER,
  )
  @Post('work-orders')
  createWorkOrder(
    @Body()
    body: {
      customerId: string;
      equipmentId?: string;
      technicianId?: string;
      description: string;
      scheduledDate?: Date;
    },
  ) {
    return this.crmService.createWorkOrder(body);
  }
}
