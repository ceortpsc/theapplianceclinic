import { Module } from '@nestjs/common';
import { DispatchGateway } from './dispatch.gateway';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';
import { PrismaService } from 'packages/database/src/prisma.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [DispatchGateway, DispatchService, PrismaService],
  controllers: [DispatchController],
})
export class DispatchModule {}
