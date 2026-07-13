import { Injectable } from '@nestjs/common';
import { PrismaService } from 'packages/database/src/prisma.service';
import { WorkOrderStatus } from '@prisma/client';

@Injectable()
export class DispatchService {
  constructor(private prisma: PrismaService) {}

  async getAllActiveOrders() {
    return this.prisma.workOrder.findMany({
      where: {
        status: {
          notIn: [WorkOrderStatus.COMPLETED, WorkOrderStatus.CANCELED],
        },
      },
      include: {
        customer: true,
        equipment: true,
        technician: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { scheduledDate: 'asc' },
    });
  }

  async assignTechnician(workOrderId: string, technicianId: string) {
    const technician = await this.prisma.user.findUniqueOrThrow({
      where: { id: technicianId },
    });

    return this.prisma.workOrder.update({
      where: { id: workOrderId },
      data: {
        technicianId,
        status: WorkOrderStatus.SCHEDULED,
      },
    });
  }

  async updateStatus(workOrderId: string, status: WorkOrderStatus) {
    const updates: Record<string, unknown> = { status };
    if (status === WorkOrderStatus.IN_PROGRESS) {
      updates.startedAt = new Date();
    }
    if (status === WorkOrderStatus.COMPLETED) {
      updates.completedAt = new Date();
    }

    return this.prisma.workOrder.update({
      where: { id: workOrderId },
      data: updates,
    });
  }
}
