import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { OperationsRegistryService } from './operations-registry.service';
import { EvaluateStoreTransitionDto } from './evaluate-transition.dto';
import type { StoreModuleId } from '@clinic/store-operations';

const ROLE_ALIASES: Partial<Record<UserRole, readonly string[]>> = {
  [UserRole.OWNER]: ['Owner', 'Manager', 'Executive', 'AI Supervisor'],
  [UserRole.ADMINISTRATOR]: ['Administrator'],
  [UserRole.OFFICE_MANAGER]: ['Manager', 'Service Manager'],
  [UserRole.DISPATCHER]: ['Dispatcher'],
  [UserRole.TECHNICIAN]: ['Technician', 'Driver'],
  [UserRole.WAREHOUSE]: ['Warehouse', 'Inventory Specialist'],
  [UserRole.PAYROLL]: ['Payroll'],
  [UserRole.HR]: ['HR'],
  [UserRole.ACCOUNTING]: ['Accounting'],
  [UserRole.CUSTOMER_SERVICE]: ['Customer Service'],
  [UserRole.SALES]: ['Sales', 'Cashier'],
  [UserRole.MANAGER]: ['Manager', 'Service Manager', 'AI Supervisor', 'Analyst'],
  [UserRole.AUDITOR]: ['Auditor'],
  [UserRole.READ_ONLY]: ['Read Only'],
};

type AuthenticatedStoreRequest = {
  user: {
    id: string;
    email: string;
    role: UserRole;
    isMfaEnabled: boolean;
  };
};

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
    UserRole.DISPATCHER,
    UserRole.TECHNICIAN,
    UserRole.WAREHOUSE,
    UserRole.PAYROLL,
    UserRole.HR,
    UserRole.ACCOUNTING,
    UserRole.CUSTOMER_SERVICE,
    UserRole.SALES,
    UserRole.MANAGER,
  )
  @Post('transitions/evaluate')
  evaluateTransition(
    @Body() dto: EvaluateStoreTransitionDto,
    @Req() request: AuthenticatedStoreRequest,
  ) {
    const permittedAliases = ROLE_ALIASES[request.user.role] ?? [];
    if (!permittedAliases.includes(dto.actorRole)) {
      throw new ForbiddenException(
        `Authenticated role ${request.user.role} cannot act as ${dto.actorRole}.`,
      );
    }

    return this.registry.evaluateTransition({
      ...dto,
      correlationId: dto.correlationId,
    });
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.OFFICE_MANAGER,
    UserRole.MANAGER,
    UserRole.AUDITOR,
  )
  @Get('triggers/:event')
  resolveTriggers(@Param('event') event: string) {
    return this.registry.resolveTriggers(event);
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
