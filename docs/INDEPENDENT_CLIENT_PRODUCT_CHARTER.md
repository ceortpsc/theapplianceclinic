# The Appliance Clinic — Independent Client Product Charter

## Product identity

`ceortpsc/theapplianceclinic` is a client-commissioned point-of-sale and store-operations platform for The Appliance Clinic. It is an independent commercial application and does not belong to, participate in, or depend on Ross Tax Pro Software Co.'s taxpayer, ERO, e-file, transcript, tax-practice, refund, or tax-software operating systems.

Ross Tax Pro Software Co. may provide software development, implementation, maintenance, hosting support, security engineering, documentation, or operational consulting under the applicable client engagement. That service-provider relationship does not convert the client's application, records, customers, employees, inventory, payments, or workflows into RTPSC tax-software assets.

## Mandatory separation

The Appliance Clinic must maintain independent:

- product branding and public presentation;
- user directory, authentication realm and role assignments;
- databases, object storage, encryption keys and backups;
- cloud accounts or strictly isolated cloud resources;
- domains, certificates, email and notification configuration;
- payment, POS, payroll, mapping and communication credentials;
- monitoring, incident records, audit logs and release evidence;
- privacy notices, store policies, employee policies and customer communications;
- data-retention schedules and destruction procedures;
- CI/CD environments, secrets and production approvals.

The platform must not ingest, expose, synchronize, reuse or infer any RTPSC taxpayer, tax return, ERO, transcript, PTIN, EFIN, CAF, tax notice, bank-product or tax-practice information.

## Product mission

The product exists to operate the client's appliance business across the following domains:

1. point of sale and checkout;
2. appliance and parts inventory;
3. customers and communication preferences;
4. quotes, orders, invoices and payments;
5. repairs, diagnostics, estimates and approvals;
6. technician assignments and field service;
7. pickup, delivery, installation and return workflows;
8. employees, schedules, attendance and training;
9. payroll operations and approval evidence;
10. double-entry accounting and management reporting;
11. operational analytics and exception management;
12. policy-scoped AI customer service and store-operations assistance.

## Operating principles

- **Explicit actions:** Buttons and API operations use precise verbs such as `Reserve appliance`, `Approve repair estimate`, `Assign delivery crew` and `Close fulfilled order`.
- **Evidence-first state changes:** Material changes require source records, actor identity, timestamps and audit events.
- **Human accountability:** AI may assist but cannot issue refunds, alter payment records, approve payroll, write off inventory, make employment decisions or release material customer commitments.
- **Fail-closed integrations:** POS, payment, payroll, mapping, SMS, email and AI providers remain disabled until credentials, contracts, tests and owner approval exist.
- **Single-business scope:** All data and workflows are limited to The Appliance Clinic and its authorized stores, workers, customers and vendors.
- **Production truthfulness:** A rendered interface or stub adapter is not represented as a live external integration.

## Product surfaces

### Sales Counter Command

Fast item lookup, serial-specific appliance selection, customer cart, approved pricing, payment request, receipt, order and fulfillment creation.

### Inventory and Warehouse Control

Receiving, inspection, condition grading, refurbishment, parts, serial numbers, warehouse locations, reservations, aging, transfers and inventory exceptions.

### Customer Relationship Office

Customer profiles, verified contact details, communication preferences, purchase history, service history, support cases and duplicate-profile resolution.

### Order and Fulfillment Office

Order confirmation, inventory allocation, pickup or delivery selection, installation requirements, exception resolution and final completion.

### Repair and Service Workshop

Diagnostic intake, estimates, customer approvals, parts reservation, technician assignment, work evidence, quality review and service release.

### Field Dispatch Command

Appointments, routes, technician capacity, travel status, delays, arrival evidence and field-visit completion.

### Pickup and Delivery Control

Warehouse release, delivery manifests, vehicle and crew assignment, customer readiness, proof of delivery, failed attempts and returns.

### Employee and Payroll Operations

Employee profiles, roles, schedules, time records, training, payroll exceptions, register approval, payment instructions and statements.

### Store Accounting and Ledger

Sales, inventory, payroll, payments, expenses, journal entries, reconciliations, close exceptions and management statements.

### Store Intelligence Center

Sales, gross margin, aging stock, repair cycle time, delivery performance, employee capacity, customer-service workload and operational exceptions.

### AI Operations Workforce

Supervised AI assistance for status summaries, product descriptions, scheduling proposals, support drafts, document classification and management briefs.

## Release classification

A release may be described as:

- `design-complete` — approved product and interface specification;
- `implemented` — executable code exists;
- `controlled` — authentication, authorization, audit and workflow gates operate;
- `integration-ready` — provider adapter and tests exist but production credentials may be absent;
- `production-candidate` — build, tests, security checks, migrations, backup and rollback evidence pass;
- `production-active` — client owner has approved cutover and required external integrations are live and monitored.

No lower classification may be represented as `production-active`.
