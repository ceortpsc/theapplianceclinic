import { Module } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';
import { TaxService } from './tax.service';
import { PrismaService } from 'packages/database/src/prisma.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AccountingService, TaxService, PrismaService],
  controllers: [AccountingController],
  exports: [AccountingService, TaxService],
})
export class AccountingModule {}
