import { Injectable } from '@nestjs/common';
import { PrismaService } from 'packages/database/src/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getAllParts() {
    // Equipment records serve as the inventory reference for tracked assets
    return this.prisma.equipment.findMany({
      include: { customer: { select: { firstName: true, lastName: true, companyName: true } } },
      orderBy: { brand: 'asc' },
    });
  }

  async getEquipmentBySerial(serialNumber: string) {
    return this.prisma.equipment.findUnique({
      where: { serialNumber },
      include: { customer: true, workOrders: { orderBy: { createdAt: 'desc' } } },
    });
  }
}
