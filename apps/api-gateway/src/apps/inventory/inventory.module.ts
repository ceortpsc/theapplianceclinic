import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PrismaService } from 'packages/database/src/prisma.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [InventoryService, PrismaService],
  controllers: [InventoryController],
  exports: [InventoryService],
})
export class InventoryModule {}
