# The Appliance Clinic — POS and Store Operations Platform

> Independent client application for appliance sales, inventory, repair, dispatch, pickup, delivery, employees, payroll, accounting, analytics and supervised AI operations.

## Business and product boundary

This repository is a client-commissioned business application for **The Appliance Clinic**. It is not part of a taxpayer, ERO, e-file, transcript, refund, tax-practice or tax-software system.

Ross Tax Pro Software Co. may provide software engineering, implementation, maintenance, documentation or operational consulting under the applicable client engagement. That development relationship does not authorize data sharing or runtime coupling with any RTPSC tax platform.

The application must maintain separate client data, users, authentication, infrastructure, credentials, storage, backups, monitoring, release evidence and incident records.

## Architecture

```text
theapplianceclinic/
├── .github/workflows/
│   └── client-pos-enterprise-ci.yml      # Schema, build, boundary and evidence gates
├── apps/
│   ├── web-client/                       # Next.js customer and staff experiences
│   │   └── src/app/
│   │       ├── page.tsx                  # Branded public/store entry
│   │       └── operations/
│   │           ├── page.tsx              # Store command center
│   │           └── [module]/page.tsx     # Purpose-built domain dossiers
│   └── api-gateway/                      # NestJS authenticated operations gateway
│       └── src/apps/
│           ├── accounting/
│           ├── crm/
│           ├── dispatch/
│           ├── hr-payroll/
│           ├── inventory/
│           └── operations-registry/      # Domain, workflow and AI contracts
├── packages/
│   ├── common/                           # Shared DTOs and types
│   ├── database/                         # Prisma/PostgreSQL store data model
│   └── store-operations/                 # Modules, actions, transitions, triggers and AI rules
├── docker/                               # Development and production containers
├── docs/
│   ├── INDEPENDENT_CLIENT_PRODUCT_CHARTER.md
│   ├── HANDBOOK.md
│   └── DEPLOYMENT.md
└── turbo.json                            # Monorepo task orchestration
```

## Operating domains

1. **Sales Counter Command** — carts, serial-specific items, approved adjustments, payments, receipts and fulfillment creation.
2. **Inventory and Warehouse Control** — receiving, inspection, grading, refurbishment, pricing, reservations, transfers and stock exceptions.
3. **Customer Relationship Office** — customer profiles, verified contacts, communication preferences, purchases, repairs and support cases.
4. **Order and Fulfillment Office** — confirmed orders, inventory allocation, pickup/delivery selection, installation details and completion.
5. **Repair and Service Workshop** — diagnosis, estimates, approvals, parts, technician assignments, quality review and release.
6. **Field Dispatch Command** — appointment windows, routes, technician status, delays, arrival and visit evidence.
7. **Pickup and Delivery Control** — manifests, vehicles, crews, warehouse release, customer readiness and proof of delivery.
8. **Employee Operations** — roles, schedules, attendance, training, assignments and access controls.
9. **Payroll Operations** — pay periods, approved time, exceptions, registers, payment instructions and employee statements.
10. **Store Accounting and Ledger** — double-entry records, inventory, sales, payments, payroll, reconciliation and close.
11. **Store Intelligence Center** — margin, stock aging, service time, delivery performance, capacity and exception analytics.
12. **AI Operations Workforce** — supervised support, product, scheduling, document and management assistance.

## Data model

The PostgreSQL/Prisma schema includes:

- stores, users and role assignments;
- customers and communication preferences;
- registered POS terminals;
- serial-number appliance inventory;
- sales orders and line items;
- payment-result records;
- fulfillment orders;
- delivery manifests and stops;
- equipment and repair work orders;
- invoices and double-entry journal records;
- time cards and payroll entries;
- AI task contracts, outputs and human dispositions;
- operational events and audit logs.

## Workflow and AI controls

Material operations declare valid states, actors, evidence, approval mode, emitted event and fail-closed outcome.

AI may assist with approved customer-service drafts, product descriptions, scheduling proposals, document classification and operational summaries. AI may not:

- issue or approve refunds;
- alter payment settlement records;
- approve payroll or release payroll payments;
- write off inventory or change serial numbers;
- make employment or disciplinary decisions;
- publish final routes without dispatcher approval;
- guarantee delivery, repair, sales or financial outcomes;
- access any unrelated business or tax-software data.

## Quick start

```bash
npm install

# Validate the independent store schema
npm run schema:validate

# Generate the Prisma client
npm run schema:generate

# Start development dependencies
docker-compose -f docker/dev.dockercompose.yml up -d

# Start applications
npm run dev
```

## Validation

```bash
npm run validate        # Prisma schema + monorepo build
npm run validate:full   # Schema + lint + tests + build
```

GitHub quality gates also check the client-product dependency boundary, credential patterns and architecture evidence.

## Release classification

- `design-complete`
- `implemented`
- `controlled`
- `integration-ready`
- `production-candidate`
- `production-active`

A rendered interface or adapter stub is never represented as `production-active` without client approval, production credentials, migration evidence, monitoring, backups and rollback readiness.
