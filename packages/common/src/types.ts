// Shared TypeScript types mirroring Prisma enums for use across packages

export enum UserRole {
  OWNER = 'OWNER',
  ADMINISTRATOR = 'ADMINISTRATOR',
  OFFICE_MANAGER = 'OFFICE_MANAGER',
  DISPATCHER = 'DISPATCHER',
  TECHNICIAN = 'TECHNICIAN',
  WAREHOUSE = 'WAREHOUSE',
  PAYROLL = 'PAYROLL',
  HR = 'HR',
  ACCOUNTING = 'ACCOUNTING',
  CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
  SALES = 'SALES',
  MANAGER = 'MANAGER',
  AUDITOR = 'AUDITOR',
  READ_ONLY = 'READ_ONLY',
}

export enum WorkOrderStatus {
  UNASSIGNED = 'UNASSIGNED',
  SCHEDULED = 'SCHEDULED',
  EN_ROUTE = 'EN_ROUTE',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum AccountType {
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  EQUITY = 'EQUITY',
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  isMfaEnabled: boolean;
  iat?: number;
  exp?: number;
}

export interface LiveTechLocation {
  technicianId: string;
  latitude: number;
  longitude: number;
}
