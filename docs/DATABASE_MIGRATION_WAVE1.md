# The Appliance Clinic — Database Migration Plan, Wave 1

## Classification

- **Product:** Independent client POS and store-operations platform
- **Change type:** Additive schema expansion with selected existing-model extensions
- **Production risk:** High until tested against a sanitized staging copy
- **Production execution:** Prohibited until client owner approval, backup verification, migration evidence and rollback readiness exist

## Schema changes

### Existing models extended

- `User`: optional store assignment and relations for sales, manifests, AI tasks and operational events.
- `Customer`: SMS/email consent, preferred channel, sales and fulfillment relations.

### New operational models

- `Store`
- `Register`
- `InventoryUnit`
- `SalesOrder`
- `SaleLineItem`
- `PaymentRecord`
- `FulfillmentOrder`
- `DeliveryManifest`
- `DeliveryStop`
- `AiTask`
- `OperationalEvent`

### New enums

- `InventoryCondition`
- `SalesOrderStatus`
- `PaymentStatus`
- `FulfillmentMode`
- `FulfillmentStatus`
- `DeliveryManifestStatus`
- `AiTaskStatus`
- `AiRiskTier`
- `OperationalEventSeverity`

## Migration prerequisites

1. Confirm the production database engine and PostgreSQL version.
2. Export and verify a complete encrypted backup.
3. Restore the backup into an isolated staging database.
4. Record row counts and integrity checks for all existing models.
5. Confirm there are no uncommitted schema changes in another deployment branch.
6. Generate the Prisma client from the reviewed schema.
7. Generate a migration using a staging-only database.
8. Review generated SQL for locks, table rewrites, indexes and foreign-key behavior.
9. Run application build, API tests and smoke tests against the migrated staging database.
10. Obtain written client-owner approval for the maintenance window and rollback plan.

## Data seeding requirements

Before the new workflows are enabled, create:

- at least one `Store` record;
- store codes and timezone;
- approved register records;
- user-to-store assignments;
- role-mapping review;
- opening inventory import plan;
- payment-provider mapping values;
- warehouse location codes;
- event-retention configuration.

Do not fabricate opening inventory, costs, serial numbers, prices, customers or payment records to satisfy a migration.

## Existing-user migration

`User.storeId` is optional during Wave 1 to avoid blocking the schema change. Before store-scoped authorization is enforced:

1. map each active user to the correct store;
2. verify the user's operational role;
3. suspend obsolete or unknown accounts;
4. require MFA for privileged users;
5. record the migration actor and timestamp;
6. produce an exception list for any unassigned active user.

## Existing-customer migration

New consent fields default to `false`. Existing customers must not be silently marked as having SMS or email consent. Communication preferences are populated only from verified records or a new customer action.

## Inventory migration

Inventory import must include, where available:

- store;
- SKU;
- serial number;
- appliance category;
- brand and model;
- condition;
- acquisition source;
- acquisition cost;
- approved list and floor prices;
- warehouse location;
- received date;
- inspection status.

Rows with duplicate or missing required serial numbers are routed to an exception file and are not imported as sellable inventory.

## Payment migration

Only payment-result metadata required for reconciliation should be imported. Do not import raw card numbers, security codes, full magnetic-stripe data or payment credentials. Provider references must remain unique where present.

## Validation checks

### Before migration

- database backup hash recorded;
- existing schema validation passes;
- current application health recorded;
- row counts captured;
- active-user count captured;
- unresolved migration conflicts documented.

### After migration

- Prisma validation passes;
- Prisma client generation passes;
- all foreign keys validate;
- all indexes exist;
- existing row counts remain unchanged except approved seed records;
- existing user authentication still works;
- existing inventory, CRM, dispatch, payroll and accounting routes load;
- new operations-registry routes require authentication;
- unauthorized role alias is rejected;
- valid transition evaluation passes;
- missing evidence routes to HOLD or EXCEPTION;
- no unrelated or tax-software records exist in the database.

## Rollout sequence

1. Deploy schema-compatible application code with new features disabled.
2. Execute the reviewed migration in the approved maintenance window.
3. Validate database and existing application behavior.
4. Seed stores, registers and user assignments.
5. Enable operations registry for administrators and auditors.
6. Enable one controlled domain at a time:
   - inventory;
   - sales;
   - fulfillment;
   - repair;
   - delivery;
   - payroll/accounting;
   - AI assistance.
7. Monitor errors, latency, audit events and user exceptions.
8. Obtain client acceptance before broad production activation.

## Rollback plan

A rollback decision is made by the client owner and designated technical lead when:

- migration fails;
- existing authentication fails;
- material record counts differ unexpectedly;
- foreign-key or unique-index failures remain unresolved;
- existing workflows become unavailable;
- payment, payroll or delivery records are at risk;
- security or data-isolation controls fail.

Rollback procedure:

1. disable writes and place the application in maintenance mode;
2. preserve migration logs and failure evidence;
3. stop application workers and background tasks;
4. restore the verified pre-migration backup into a clean database;
5. point the prior approved application release to the restored database;
6. run health and integrity checks;
7. document the incident, cause and corrective action;
8. do not retry until a revised migration passes staging.

## Production evidence package

The final migration record must contain:

- approved migration SQL;
- schema version and commit SHA;
- backup identifier and verification evidence;
- staging test report;
- client approval;
- start and completion timestamps;
- operator identities;
- row-count and integrity comparison;
- smoke-test results;
- rollback result or confirmation that rollback was not required;
- post-deployment monitoring summary.
