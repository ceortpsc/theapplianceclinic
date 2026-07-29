import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { OperationsRegistryService } from './operations-registry.service';
import type { StoreModuleId } from '@clinic/store-operations';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('operations-registry')
export class OperationsRegistryController {
  constructor(private readonly registry: OperationsRegistryService) {}

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.OFFICE_MANAGER,
    UserRole.MANAGER,
    UserRole.AUDITOR,
    UserRole.READ_ONLY,
  )
  @Get()
  getOverview() {
    return this.registry.getOverview();
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.OFFICE_MANAGER,
    UserRole.MANAGER,
    UserRole.AUDITOR,
    UserRole.READ_ONLY,
  )
  @Get('modules/:id')
  getModule(@Param('id') id: StoreModuleId) {
    return this.registry.getModule(id);
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.OFFICE_MANAGER,
    UserRole.MANAGER,
    UserRole.AUDITOR,
  )
  @Get('workflows')
  getWorkflowContract() {
    return this.registry.getWorkflowContract();
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.OFFICE_MANAGER,
    UserRole.MANAGER,
    UserRole.AUDITOR,
  )
  @Get('ai-governance')
  getAiGovernance() {
    return this.registry.getAiGovernance();
  }
}
