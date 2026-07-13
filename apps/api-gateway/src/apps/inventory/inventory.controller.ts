import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { InventoryService } from './inventory.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.WAREHOUSE,
    UserRole.TECHNICIAN,
    UserRole.MANAGER,
  )
  @Get()
  getAllParts() {
    return this.inventoryService.getAllParts();
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.WAREHOUSE,
    UserRole.TECHNICIAN,
    UserRole.MANAGER,
    UserRole.CUSTOMER_SERVICE,
  )
  @Get('serial/:serialNumber')
  getBySerial(@Param('serialNumber') serialNumber: string) {
    return this.inventoryService.getEquipmentBySerial(serialNumber);
  }
}
