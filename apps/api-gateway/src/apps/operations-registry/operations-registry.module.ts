import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { OperationsRegistryController } from './operations-registry.controller';
import { OperationsRegistryService } from './operations-registry.service';

@Module({
  imports: [AuthModule],
  controllers: [OperationsRegistryController],
  providers: [OperationsRegistryService],
  exports: [OperationsRegistryService],
})
export class OperationsRegistryModule {}
