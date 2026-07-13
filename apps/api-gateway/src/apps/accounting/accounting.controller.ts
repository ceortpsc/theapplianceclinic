import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { AccountingService } from './accounting.service';
import { TaxService } from './tax.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('accounting')
export class AccountingController {
  constructor(
    private accountingService: AccountingService,
    private taxService: TaxService,
  ) {}

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.ACCOUNTING,
    UserRole.AUDITOR,
    UserRole.MANAGER,
  )
  @Get('accounts')
  getChartOfAccounts() {
    return this.accountingService.getChartOfAccounts();
  }

  @Roles(UserRole.OWNER, UserRole.ADMINISTRATOR, UserRole.ACCOUNTING)
  @Post('accounts')
  createAccount(@Body() body: { code: string; name: string; type: string }) {
    return this.accountingService.createAccount(body);
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.ACCOUNTING,
    UserRole.AUDITOR,
  )
  @Get('accounts/:id/ledger')
  getAccountLedger(@Param('id') id: string) {
    return this.accountingService.getAccountLedger(id);
  }

  @Roles(UserRole.OWNER, UserRole.ADMINISTRATOR, UserRole.ACCOUNTING)
  @Post('journal-entries')
  postJournalEntry(
    @Body()
    body: {
      description: string;
      referenceId?: string;
      lines: { accountId: string; debit: number; credit: number }[];
    },
  ) {
    return this.accountingService.postJournalEntry(body);
  }

  @Roles(
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.ACCOUNTING,
    UserRole.AUDITOR,
    UserRole.PAYROLL,
  )
  @Get('tax/form-941')
  getForm941Data(
    @Query('quarter') quarter: string,
    @Query('year') year: string,
  ) {
    return this.taxService.generateForm941Data(Number(quarter), Number(year));
  }
}
