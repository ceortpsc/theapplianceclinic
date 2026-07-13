import { Injectable } from '@nestjs/common';
import { PrismaService } from 'packages/database/src/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class HrPayrollService {
  constructor(private prisma: PrismaService) {}

  async clockIn(userId: string) {
    return this.prisma.timeCard.create({
      data: { userId, clockIn: new Date() },
    });
  }

  async clockOut(timeCardId: string) {
    const card = await this.prisma.timeCard.findUniqueOrThrow({
      where: { id: timeCardId },
    });
    const clockOut = new Date();
    const totalHours =
      (clockOut.getTime() - card.clockIn.getTime()) / (1000 * 60 * 60);

    return this.prisma.timeCard.update({
      where: { id: timeCardId },
      data: { clockOut, totalHours },
    });
  }

  async getTimeCards(userId: string) {
    return this.prisma.timeCard.findMany({
      where: { userId },
      orderBy: { clockIn: 'desc' },
    });
  }

  async processPayroll(dto: {
    userId: string;
    payPeriodStart: Date;
    payPeriodEnd: Date;
    grossPay: number;
    netPay: number;
    taxWithheld: number;
  }) {
    return this.prisma.payrollEntry.create({
      data: {
        userId: dto.userId,
        payPeriodStart: dto.payPeriodStart,
        payPeriodEnd: dto.payPeriodEnd,
        grossPay: new Decimal(dto.grossPay),
        netPay: new Decimal(dto.netPay),
        taxWithheld: new Decimal(dto.taxWithheld),
      },
    });
  }

  async getPayrollEntries(userId: string) {
    return this.prisma.payrollEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
