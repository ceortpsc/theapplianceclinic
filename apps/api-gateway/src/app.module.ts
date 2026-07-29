import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { AccountingModule } from './apps/accounting/accounting.module';
import { CrmModule } from './apps/crm/crm.module';
import { DispatchModule } from './apps/dispatch/dispatch.module';
import { HrPayrollModule } from './apps/hr-payroll/hr-payroll.module';
import { InventoryModule } from './apps/inventory/inventory.module';
import { OperationsRegistryModule } from './apps/operations-registry/operations-registry.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    AccountingModule,
    CrmModule,
    DispatchModule,
    HrPayrollModule,
    InventoryModule,
    OperationsRegistryModule,
  ],
})
export class AppModule {}
