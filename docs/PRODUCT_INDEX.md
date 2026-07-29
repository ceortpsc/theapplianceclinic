# The Appliance Clinic — Product, Route, Engine and Layer Index

## 1. Product classification

- **Product:** The Appliance Clinic POS and Store Operations Platform
- **Business relationship:** Independent client-commissioned application
- **Repository:** `ceortpsc/theapplianceclinic`
- **Primary users:** Owner, managers, sales, customer service, warehouse, technicians, dispatchers, drivers, HR, payroll, accounting, auditors and approved read-only users
- **Data boundary:** The Appliance Clinic business, customer, employee, inventory, sales, payment-result, repair, delivery and operational data only
- **Explicit exclusions:** Taxpayer data, tax returns, ERO records, e-file data, transcripts, tax notices, PTIN/EFIN/CAF records and RTPSC tax-software runtime dependencies

## 2. Application surfaces

| Route | Surface | Primary purpose | Status |
|---|---|---|---|
| `/` | Branded store entry | Present the independent product and direct authorized staff to store workflows | Implemented |
| `/operations` | Store Operations Command | Full module, workflow, trigger and AI command index | Implemented |
| `/operations/pos` | Sales Counter Command | Customer carts, appliance selection, payment confirmation, receipts and fulfillment | Contract implemented |
| `/operations/inventory` | Inventory and Warehouse Control | Receiving, serial numbers, condition, location, pricing, reservation and availability | Contract implemented |
| `/operations/customers` | Customer Relationship Office | Customer profiles, consent, history, service and support cases | Contract implemented |
| `/operations/orders` | Order and Fulfillment Office | Confirmed sales, allocation, pickup/delivery, exceptions and completion | Contract implemented |
| `/operations/service` | Repair and Service Workshop | Diagnosis, estimates, approval, parts, technician work, quality and release | Contract implemented |
| `/operations/dispatch` | Field Dispatch Command | Appointments, routes, technician assignment, status and field evidence | Contract implemented |
| `/operations/fulfillment` | Pickup and Delivery Control | Manifests, vehicles, crews, customer readiness and proof of delivery | Contract implemented |
| `/operations/employees` | Employee Operations | Roles, schedules, time, training, assignments and access | Contract implemented |
| `/operations/payroll` | Payroll Operations | Pay periods, time import, exceptions, approval, payment instructions and statements | Contract implemented |
| `/operations/accounting` | Store Accounting and Ledger | Journals, payments, inventory, payroll, reconciliation and close | Contract implemented |
| `/operations/analytics` | Store Intelligence Center | Sales, margin, stock age, service, delivery, labor and exceptions | Contract implemented |
| `/operations/ai` | AI Operations Workforce | Supervised customer-service, inventory, dispatch and analysis assistance | Contract implemented |

## 3. Backend API index

Global API prefix: `/api/v1`

| Endpoint | Method | Purpose | Access boundary |
|---|---|---|---|
| `/operations-registry` | GET | Return module registry and product boundary | Authenticated management/read roles |
| `/operations-registry/modules/:id` | GET | Return one module with transitions and triggers | Authenticated management/read roles |
| `/operations-registry/workflows` | GET | Return approved workflow and trigger contracts | Management and audit roles |
| `/operations-registry/transitions/evaluate` | POST | Evaluate state, JWT-role alias, evidence and approval requirements | Authenticated operating roles |
| `/operations-registry/triggers/:event` | GET | Resolve approved tasks for one operational event | Management and audit roles |
| `/operations-registry/ai-governance` | GET | Return AI capabilities and prohibited actions | Management and audit roles |

Existing application modules remain available under their registered routes for accounting, CRM, dispatch, HR/payroll and inventory.

## 4. Domain modules

### 4.1 Point of sale

**Responsibilities**

- register and cashier session context;
- customer or guest cart;
- serial-specific appliance selection;
- approved discounts and adjustments;
- payment request and provider-result recording;
- sales receipt;
- fulfillment-order creation;
- void, dispute and refund-request escalation.

**Material controls**

- no sale completion without inventory reservation and confirmed payment result;
- no user-provided processor status accepted without provider correlation evidence;
- no refund approval by AI;
- price and discount exceptions require manager approval.

### 4.2 Inventory

**Responsibilities**

- receiving and acquisition source;
- serial-number integrity;
- condition grading and inspection;
- refurbishment and quality review;
- acquisition cost, list price and floor price;
- warehouse location and transfer;
- order reservation and release;
- aging and stock exceptions;
- return, scrap and write-off routing.

**Material controls**

- serial numbers are unique;
- uninspected units cannot be represented as ready for sale;
- write-off, scrap and floor-price changes require approved human action;
- reservations expire or are explicitly released.

### 4.3 Customers

**Responsibilities**

- identity and contact information;
- communication preference and consent;
- purchase, repair, delivery and support history;
- duplicate-profile review;
- complaint and service-recovery cases.

**Material controls**

- customer communications follow the recorded channel preference;
- one customer's records are never disclosed to another customer;
- duplicate merges require review and audit evidence.

### 4.4 Orders and fulfillment

**Responsibilities**

- order confirmation;
- inventory allocation;
- pickup, delivery or field-service mode;
- address and window capture;
- installation and readiness instructions;
- fulfillment exceptions;
- completion evidence.

### 4.5 Repairs and field service

**Responsibilities**

- reported problem;
- diagnostic finding;
- estimate and customer approval;
- parts reservation;
- technician assignment;
- service evidence;
- quality testing;
- release to customer.

### 4.6 Dispatch and delivery

**Responsibilities**

- route date and capacity;
- appointment windows;
- vehicle and crew assignment;
- warehouse release;
- en-route, arrival and delay status;
- proof of delivery;
- failed-attempt and return routing.

### 4.7 Employees and payroll

**Responsibilities**

- employee profile and role;
- schedules and time records;
- training and acknowledgments;
- payroll periods, earnings, deductions and exceptions;
- register approval;
- payment instructions and employee statements.

**Material controls**

- payroll requires approved time and exception clearance;
- AI cannot approve payroll or payment instructions;
- access suspension is preserved as an audit event.

### 4.8 Accounting

**Responsibilities**

- double-entry ledger;
- sales and payment batches;
- inventory and cost records;
- payroll posting;
- reconciliations;
- close exceptions;
- management statements.

### 4.9 Analytics

**Responsibilities**

- daily sales and margin;
- stock age and turnover;
- repair cycle time and backlog;
- delivery success and failed attempts;
- employee and route capacity;
- customer-service cases;
- exception volume and aging.

### 4.10 AI operations

**Permitted**

- draft published-policy explanations;
- summarize approved order status;
- propose routes and schedules;
- draft product descriptions;
- identify aging inventory;
- prepare management summaries;
- classify approved store documents;
- open human-review tasks.

**Prohibited**

- payment settlement changes;
- refunds or write-offs;
- payroll approval;
- employment decisions;
- serial-number changes;
- final route publication without dispatcher approval;
- outcome guarantees;
- access to unrelated business or tax-software data.

## 5. Workflow engine

The domain package defines:

- valid current states;
- destination state;
- authorized operational aliases;
- required evidence keys;
- action mode;
- emitted event;
- fail-closed state.

The decision engine returns:

- `allowed`;
- `nextState`;
- `event`;
- `failureState`;
- missing evidence;
- validation errors;
- correlation and evaluation metadata.

The API maps a JWT-authenticated `UserRole` to approved store-role aliases before evaluating the transition. Caller-supplied role text alone is insufficient.

## 6. Event and task engine

Approved events may resolve to proposed tasks such as:

- payment confirmed → create fulfillment work;
- unit received → open inspection checklist;
- stock exception → assign warehouse exception and calculate impacted orders;
- repair approved → reserve parts and propose technician time;
- delivery scheduled → build route candidate;
- delivery failed → create failed-delivery case;
- pay period opened → collect approved time records;
- margin variance → open management investigation;
- AI escalation → suspend delivery and assign a human owner.

Triggers with a `humanGate` are returned as `REQUIRES_HUMAN_REVIEW` and cannot be treated as final approval.

## 7. Data layer

The Prisma/PostgreSQL schema contains:

- `Store`
- `User`
- `Customer`
- `Equipment`
- `WorkOrder`
- `Register`
- `InventoryUnit`
- `SalesOrder`
- `SaleLineItem`
- `PaymentRecord`
- `FulfillmentOrder`
- `DeliveryManifest`
- `DeliveryStop`
- `Invoice`
- `Account`
- `JournalEntryGroup`
- `JournalLine`
- `TimeCard`
- `PayrollEntry`
- `AiTask`
- `OperationalEvent`
- `AuditLog`

## 8. Security layers

1. JWT authentication.
2. MFA evidence in the authenticated user context.
3. route-level RBAC.
4. JWT-role-to-operating-alias verification.
5. request DTO validation and forbidden-field rejection.
6. throttling.
7. security response headers.
8. client-product dependency boundary checks.
9. credential-pattern scanning.
10. audit and operational event evidence.

## 9. Infrastructure layers

### Required environments

- local development;
- integration test;
- staging/client acceptance;
- production.

### Required resources

- isolated application hosting;
- isolated API runtime;
- PostgreSQL database;
- object storage for approved documents and delivery evidence;
- cache and job queue when async processing is activated;
- secret manager;
- encryption keys;
- monitoring and alerting;
- backup and restore system;
- domain, DNS and TLS certificates;
- email/SMS provider configuration;
- payment/POS provider adapter;
- maps and route provider adapter;
- AI provider adapter with data minimization and logging controls.

## 10. Release gates

- dependency installation;
- Prisma schema validation;
- Prisma client generation;
- monorepo build;
- client-product dependency boundary scan;
- required-asset verification;
- credential-pattern review;
- architecture evidence hashes;
- migration review;
- staging acceptance;
- backup and rollback evidence;
- client-owner production approval.
