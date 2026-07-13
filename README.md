# The Appliance Clinic — Enterprise Management Platform

> A Modular Monorepo Blueprint by **Ross Tax Pro Software Co.**

A production-ready, enterprise-grade cloud application for high-volume operational, financial, and compliance workflows.

---

## Architecture

```
the-appliance-clinic/
├── .github/workflows/       # CI/CD & Security scan pipelines
├── apps/
│   ├── web-client/          # Next.js 14 + React 18 + Tailwind CSS
│   └── api-gateway/         # NestJS Gateway (RBAC, JWT/MFA, WebSockets)
│       └── src/apps/
│           ├── accounting/  # Double-entry ledger + IRS Form 941
│           ├── crm/         # Customers, Equipment, Work Orders
│           ├── dispatch/    # Live GPS dispatch + WebSocket gateway
│           ├── hr-payroll/  # Time cards + Payroll processing
│           └── inventory/   # Equipment & parts tracking
├── packages/
│   ├── database/            # Prisma schema + PrismaService
│   └── common/              # Shared types, DTOs, constants
├── docker/                  # Dev & prod Docker Compose configs
├── docs/                    # Handbook & Deployment Guide
└── turbo.json               # Turborepo orchestration
```

## Quick Start

```bash
# 1. Install all workspace dependencies
npm install

# 2. Start the development database
docker-compose -f docker/dev.dockercompose.yml up -d

# 3. Push Prisma schema to database
npx prisma db push --schema=packages/database/prisma/schema.prisma

# 4. Run all dev servers
npx turbo run dev
```

## Key Features

- **RBAC + JWT + MFA** — 14 user roles with route-level access control and TOTP MFA
- **Double-Entry Accounting** — Balanced journal entries with real-time account balance updates
- **Live Dispatch** — WebSocket-powered GPS tracking for field technicians
- **IRS Form 941** — Automated quarterly payroll tax aggregation
- **SOC2/HIPAA Audit Logging** — Immutable audit trail for all protected access
- **Turborepo Monorepo** — Unified CI/CD with shared types across frontend and backend

## Documentation

- [Corporate Handbook & Compliance Framework](docs/HANDBOOK.md)
- [Production Deployment Guide](docs/DEPLOYMENT.md)