import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'packages/database/src/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { DOUBLE_ENTRY_TOLERANCE } from '@clinic/common';

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  async postJournalEntry(dto: {
    description: string;
    referenceId?: string;
    lines: { accountId: string; debit: number; credit: number }[];
  }) {
    // Validate balanced entry: Total Debits must exactly equal Total Credits
    const totalDebits = dto.lines.reduce((sum, l) => sum + l.debit, 0);
    const totalCredits = dto.lines.reduce((sum, l) => sum + l.credit, 0);

    if (Math.abs(totalDebits - totalCredits) > DOUBLE_ENTRY_TOLERANCE) {
      throw new BadRequestException('Unbalanced Journal Entry: Debits must equal Credits.');
    }

    return this.prisma.$transaction(async (tx) => {
      const group = await tx.journalEntryGroup.create({
        data: { description: dto.description, referenceId: dto.referenceId },
      });

      for (const line of dto.lines) {
        await tx.journalLine.create({
          data: {
            groupId: group.id,
            accountId: line.accountId,
            debit: new Decimal(line.debit),
            credit: new Decimal(line.credit),
          },
        });

        // Update real-time account ledger balance sheets
        const account = await tx.account.findUniqueOrThrow({ where: { id: line.accountId } });
        let newBalance = new Decimal(account.balance);

        if (account.type === 'ASSET' || account.type === 'EXPENSE') {
          newBalance = newBalance.add(line.debit).sub(line.credit);
        } else {
          // Liabilities, Equity, Revenues
          newBalance = newBalance.add(line.credit).sub(line.debit);
        }

        await tx.account.update({
          where: { id: line.accountId },
          data: { balance: newBalance },
        });
      }
      return group;
    });
  }

  async getChartOfAccounts() {
    return this.prisma.account.findMany({ orderBy: { code: 'asc' } });
  }

  async getAccountLedger(accountId: string) {
    return this.prisma.journalLine.findMany({
      where: { accountId },
      include: { group: true },
      orderBy: { group: { postedAt: 'desc' } },
    });
  }

  async createAccount(dto: { code: string; name: string; type: string }) {
    return this.prisma.account.create({
      data: {
        code: dto.code,
        name: dto.name,
        type: dto.type as any,
      },
    });
  }
}
