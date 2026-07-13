import { Module } from '@nestjs/common';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';
import { PrismaService } from 'packages/database/src/prisma.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [CrmService, PrismaService],
  controllers: [CrmController],
  exports: [CrmService],
})
export class CrmModule {}
