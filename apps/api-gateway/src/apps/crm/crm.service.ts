import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'packages/database/src/prisma.service';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  async getCustomers(search?: string) {
    return this.prisma.customer.findMany({
      where: search
        ? {
            OR: [
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { companyName: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      include: { workOrders: { orderBy: { createdAt: 'desc' }, take: 5 } },
      orderBy: { lastName: 'asc' },
    });
  }

  async getCustomer(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        equipment: true,
        workOrders: { orderBy: { createdAt: 'desc' } },
        invoices: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);
    return customer;
  }

  async createCustomer(dto: {
    squareId?: string;
    companyName?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) {
    return this.prisma.customer.create({ data: dto });
  }

  async createEquipment(dto: {
    customerId: string;
    type: string;
    brand: string;
    modelNumber: string;
    serialNumber: string;
    warrantyExpiry?: Date;
  }) {
    return this.prisma.equipment.create({ data: dto });
  }

  async createWorkOrder(dto: {
    customerId: string;
    equipmentId?: string;
    technicianId?: string;
    description: string;
    scheduledDate?: Date;
  }) {
    return this.prisma.workOrder.create({
      data: dto,
      include: { customer: true, equipment: true },
    });
  }
}
