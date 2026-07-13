import { Controller, Get, Post, Patch, Body, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { HrPayrollService } from './hr-payroll.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('hr')
export class HrPayrollController {
  constructor(private hrPayrollService: HrPayrollService) {}

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.TECHNICIAN,
    UserRole.DISPATCHER,
    UserRole.WAREHOUSE,
    UserRole.CUSTOMER_SERVICE,
    UserRole.SALES,
    UserRole.OFFICE_MANAGER,
    UserRole.HR,
    UserRole.PAYROLL,
    UserRole.MANAGER,
    UserRole.ACCOUNTING,
  )
  @Post('time-cards/clock-in')
  clockIn(@Request() req: any) {
    return this.hrPayrollService.clockIn(req.user.id);
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.TECHNICIAN,
    UserRole.DISPATCHER,
    UserRole.WAREHOUSE,
    UserRole.CUSTOMER_SERVICE,
    UserRole.SALES,
    UserRole.OFFICE_MANAGER,
    UserRole.HR,
    UserRole.PAYROLL,
    UserRole.MANAGER,
    UserRole.ACCOUNTING,
  )
  @Patch('time-cards/:id/clock-out')
  clockOut(@Param('id') id: string) {
    return this.hrPayrollService.clockOut(id);
  }

  @Roles(UserRole.OWNER, UserRole.ADMINISTRATOR, UserRole.HR, UserRole.PAYROLL, UserRole.MANAGER)
  @Get('time-cards/:userId')
  getTimeCards(@Param('userId') userId: string) {
    return this.hrPayrollService.getTimeCards(userId);
  }

  @Roles(UserRole.OWNER, UserRole.ADMINISTRATOR, UserRole.PAYROLL)
  @Post('payroll')
  processPayroll(
    @Body()
    body: {
      userId: string;
      payPeriodStart: Date;
      payPeriodEnd: Date;
      grossPay: number;
      netPay: number;
      taxWithheld: number;
    },
  ) {
    return this.hrPayrollService.processPayroll(body);
  }

  @Roles(UserRole.OWNER, UserRole.ADMINISTRATOR, UserRole.HR, UserRole.PAYROLL)
  @Get('payroll/:userId')
  getPayrollEntries(@Param('userId') userId: string) {
    return this.hrPayrollService.getPayrollEntries(userId);
  }
}
