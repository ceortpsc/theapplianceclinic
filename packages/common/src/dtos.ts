// Shared Data Transfer Objects used across the monorepo

export interface PostJournalEntryDto {
  description: string;
  referenceId?: string;
  lines: JournalLineDto[];
}

export interface JournalLineDto {
  accountId: string;
  debit: number;
  credit: number;
}

export interface CreateWorkOrderDto {
  customerId: string;
  equipmentId?: string;
  technicianId?: string;
  description: string;
  scheduledDate?: string;
}

export interface UpdateWorkOrderDto {
  status?: string;
  technicianId?: string;
  scheduledDate?: string;
  startedAt?: string;
  completedAt?: string;
  latitude?: number;
  longitude?: number;
}

export interface CreateCustomerDto {
  squareId?: string;
  companyName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CreateInvoiceDto {
  customerId: string;
  workOrderId: string;
  totalAmount: number;
  taxAmount: number;
  squareInvoiceId?: string;
}

export interface GenerateForm941Dto {
  quarter: number;
  year: number;
}
