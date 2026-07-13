import { Module } from '@nestjs/common';
import { HrPayrollService } from './hr-payroll.service';
import { HrPayrollController } from './hr-payroll.controller';
import { PrismaService } from 'packages/database/src/prisma.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [HrPayrollService, PrismaService],
  controllers: [HrPayrollController],
  exports: [HrPayrollService],
})
export class HrPayrollModule {}
