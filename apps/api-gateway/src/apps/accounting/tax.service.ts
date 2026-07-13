import { Injectable } from '@nestjs/common';
import { PrismaService } from 'packages/database/src/prisma.service';

@Injectable()
export class TaxService {
  constructor(private prisma: PrismaService) {}

  async generateForm941Data(quarter: number, year: number) {
    const records = await this.prisma.payrollEntry.findMany({
      where: {
        payPeriodStart: { gte: new Date(`${year}-01-01`) },
        payPeriodEnd: { lte: new Date(`${year}-12-31`) },
      },
    });

    // Transform raw payroll entries into compliance Aggregates for IRS Form 941
    const totalWages = records.reduce((acc, curr) => acc + Number(curr.grossPay), 0);
    const totalTaxWithheld = records.reduce((acc, curr) => acc + Number(curr.taxWithheld), 0);

    return {
      quarter,
      year,
      line2_TotalWages: totalWages,
      line3_FederalIncomeTaxWithheld: totalTaxWithheld,
      line5a_SocialSecurityTaxableWages: totalWages,
      line5a_TaxCollected: totalWages * 0.124, // Combined employer + employee SS matching
      line5c_MedicareTaxableWages: totalWages,
      line5c_TaxCollected: totalWages * 0.029, // Combined Medicare matching
    };
  }
}
