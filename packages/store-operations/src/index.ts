export type StoreModuleId =
  | 'point-of-sale'
  | 'inventory'
  | 'customers'
  | 'orders'
  | 'service-repair'
  | 'dispatch'
  | 'pickup-delivery'
  | 'employees'
  | 'payroll'
  | 'accounting'
  | 'analytics'
  | 'ai-operations';

export type StoreRiskTier = 'routine' | 'controlled' | 'high' | 'material';
export type StoreActionMode = 'human' | 'assisted' | 'automated-with-policy' | 'human-approval-required';

export type StoreModule = {
  id: StoreModuleId;
  label: string;
  route: string;
  purpose: string;
  primaryRoles: string[];
  primaryActions: string[];
  dataClasses: string[];
  emittedEvents: string[];
  riskTier: StoreRiskTier;
};

export const storeModules: readonly StoreModule[] = [
  {
    id: 'point-of-sale',
    label: 'Sales Counter Command',
    route: '/operations/pos',
    purpose: 'Create quotes, reserve inventory, calculate approved charges, accept supported payment methods, issue receipts and open fulfillment work.',
    primaryRoles: ['Owner', 'Manager', 'Sales', 'Cashier'],
    primaryActions: ['Open customer cart', 'Reserve appliance', 'Apply approved adjustment', 'Authorize payment request', 'Issue sales receipt', 'Open fulfillment order'],
    dataClasses: ['Customer', 'Product', 'Price', 'Payment token', 'Receipt'],
    emittedEvents: ['CART_OPENED', 'INVENTORY_RESERVED', 'SALE_AUTHORIZED', 'PAYMENT_CONFIRMED', 'RECEIPT_ISSUED'],
    riskTier: 'material'
  },
  {
    id: 'inventory',
    label: 'Inventory and Warehouse Control',
    route: '/operations/inventory',
    purpose: 'Track appliance units, parts, serial numbers, condition, acquisition cost, location, reservations, refurbishment and availability.',
    primaryRoles: ['Owner', 'Manager', 'Warehouse', 'Inventory Specialist'],
    primaryActions: ['Receive appliance unit', 'Record serial number', 'Grade appliance condition', 'Move warehouse location', 'Reserve for order', 'Release reservation', 'Mark ready for sale'],
    dataClasses: ['Inventory unit', 'Serial number', 'Cost', 'Condition report', 'Warehouse location'],
    emittedEvents: ['UNIT_RECEIVED', 'UNIT_INSPECTED', 'UNIT_MOVED', 'UNIT_RESERVED', 'UNIT_AVAILABLE', 'STOCK_EXCEPTION_OPENED'],
    riskTier: 'high'
  },
  {
    id: 'customers',
    label: 'Customer Relationship Office',
    route: '/operations/customers',
    purpose: 'Maintain verified customer profiles, addresses, communication preferences, purchase history, service history and support interactions.',
    primaryRoles: ['Customer Service', 'Sales', 'Manager'],
    primaryActions: ['Create customer profile', 'Verify contact details', 'Record communication preference', 'Open support case', 'Review purchase history', 'Merge approved duplicate profile'],
    dataClasses: ['Customer identity', 'Contact details', 'Address', 'Communication consent', 'Interaction history'],
    emittedEvents: ['CUSTOMER_CREATED', 'CUSTOMER_VERIFIED', 'CONSENT_UPDATED', 'SUPPORT_CASE_OPENED', 'CUSTOMER_PROFILE_MERGED'],
    riskTier: 'controlled'
  },
  {
    id: 'orders',
    label: 'Order and Fulfillment Office',
    route: '/operations/orders',
    purpose: 'Convert approved sales into governed fulfillment orders with inventory, payment, pickup, delivery, installation and completion evidence.',
    primaryRoles: ['Sales', 'Customer Service', 'Warehouse', 'Dispatcher', 'Manager'],
    primaryActions: ['Confirm order scope', 'Allocate inventory', 'Collect fulfillment details', 'Schedule pickup or delivery', 'Resolve order exception', 'Close fulfilled order'],
    dataClasses: ['Order', 'Line item', 'Fulfillment address', 'Payment status', 'Delivery instruction'],
    emittedEvents: ['ORDER_OPENED', 'ORDER_CONFIRMED', 'ORDER_ALLOCATED', 'FULFILLMENT_SCHEDULED', 'ORDER_EXCEPTION_OPENED', 'ORDER_COMPLETED'],
    riskTier: 'high'
  },
  {
    id: 'service-repair',
    label: 'Repair and Service Workshop',
    route: '/operations/service',
    purpose: 'Manage diagnostics, estimates, customer approvals, technician work, parts, status updates, quality checks and service completion.',
    primaryRoles: ['Customer Service', 'Technician', 'Service Manager', 'Warehouse'],
    primaryActions: ['Open service work order', 'Record diagnostic finding', 'Create repair estimate', 'Request customer approval', 'Assign technician', 'Reserve part', 'Complete quality check', 'Release repaired appliance'],
    dataClasses: ['Equipment', 'Diagnostic notes', 'Estimate', 'Approval', 'Parts', 'Technician evidence'],
    emittedEvents: ['SERVICE_ORDER_OPENED', 'DIAGNOSIS_RECORDED', 'ESTIMATE_ISSUED', 'REPAIR_APPROVED', 'TECHNICIAN_ASSIGNED', 'QUALITY_CHECK_PASSED', 'SERVICE_COMPLETED'],
    riskTier: 'high'
  },
  {
    id: 'dispatch',
    label: 'Field Dispatch Command',
    route: '/operations/dispatch',
    purpose: 'Assign and monitor field service routes, technician capacity, appointment windows, location updates, delays and completion evidence.',
    primaryRoles: ['Dispatcher', 'Service Manager', 'Technician'],
    primaryActions: ['Assign technician route', 'Confirm appointment window', 'Record en-route status', 'Report delay', 'Capture arrival', 'Close field visit'],
    dataClasses: ['Route', 'Appointment', 'Technician location', 'Customer address', 'Visit evidence'],
    emittedEvents: ['ROUTE_ASSIGNED', 'APPOINTMENT_CONFIRMED', 'TECHNICIAN_EN_ROUTE', 'FIELD_DELAY_REPORTED', 'TECHNICIAN_ARRIVED', 'FIELD_VISIT_CLOSED'],
    riskTier: 'high'
  },
  {
    id: 'pickup-delivery',
    label: 'Pickup and Delivery Control',
    route: '/operations/fulfillment',
    purpose: 'Coordinate warehouse release, vehicle assignment, delivery windows, customer readiness, proof of delivery, failed attempts and returns.',
    primaryRoles: ['Dispatcher', 'Warehouse', 'Driver', 'Manager'],
    primaryActions: ['Create delivery manifest', 'Verify unit release', 'Assign vehicle and crew', 'Confirm customer readiness', 'Capture delivery proof', 'Record failed attempt', 'Open return intake'],
    dataClasses: ['Manifest', 'Vehicle', 'Crew', 'Address', 'Proof of delivery', 'Return record'],
    emittedEvents: ['DELIVERY_MANIFEST_CREATED', 'WAREHOUSE_RELEASED', 'CREW_ASSIGNED', 'CUSTOMER_READY_CONFIRMED', 'DELIVERY_COMPLETED', 'DELIVERY_FAILED', 'RETURN_OPENED'],
    riskTier: 'material'
  },
  {
    id: 'employees',
    label: 'Employee Operations',
    route: '/operations/employees',
    purpose: 'Manage employee profiles, roles, schedules, attendance, training, assignments, acknowledgments and performance evidence.',
    primaryRoles: ['Owner', 'HR', 'Manager'],
    primaryActions: ['Create employee profile', 'Assign store role', 'Publish schedule', 'Record training completion', 'Approve time exception', 'Suspend system access'],
    dataClasses: ['Employee identity', 'Role', 'Schedule', 'Training record', 'Attendance', 'Performance evidence'],
    emittedEvents: ['EMPLOYEE_CREATED', 'ROLE_ASSIGNED', 'SCHEDULE_PUBLISHED', 'TRAINING_COMPLETED', 'TIME_EXCEPTION_APPROVED', 'ACCESS_SUSPENDED'],
    riskTier: 'material'
  },
  {
    id: 'payroll',
    label: 'Payroll Operations',
    route: '/operations/payroll',
    purpose: 'Convert approved time and earnings records into controlled payroll calculations, manager review, payment instructions and payroll evidence.',
    primaryRoles: ['Payroll', 'HR', 'Manager', 'Owner'],
    primaryActions: ['Open pay period', 'Import approved time', 'Resolve payroll exception', 'Approve payroll register', 'Release payment instruction', 'Publish employee statement'],
    dataClasses: ['Time record', 'Earnings', 'Deduction', 'Payroll register', 'Payment instruction'],
    emittedEvents: ['PAY_PERIOD_OPENED', 'TIME_IMPORTED', 'PAYROLL_EXCEPTION_OPENED', 'PAYROLL_APPROVED', 'PAYMENT_INSTRUCTION_RELEASED', 'PAY_STATEMENT_PUBLISHED'],
    riskTier: 'material'
  },
  {
    id: 'accounting',
    label: 'Store Accounting and Ledger',
    route: '/operations/accounting',
    purpose: 'Preserve double-entry records for sales, inventory, expenses, payroll, payments, adjustments, reconciliations and management reporting.',
    primaryRoles: ['Accounting', 'Manager', 'Owner', 'Auditor'],
    primaryActions: ['Post approved journal group', 'Reconcile payment batch', 'Reconcile inventory movement', 'Open close exception', 'Approve monthly close', 'Release management statements'],
    dataClasses: ['Account', 'Journal entry', 'Payment batch', 'Reconciliation', 'Financial statement'],
    emittedEvents: ['JOURNAL_POSTED', 'PAYMENT_BATCH_RECONCILED', 'INVENTORY_RECONCILED', 'CLOSE_EXCEPTION_OPENED', 'MONTH_CLOSED', 'STATEMENTS_RELEASED'],
    riskTier: 'material'
  },
  {
    id: 'analytics',
    label: 'Store Intelligence Center',
    route: '/operations/analytics',
    purpose: 'Provide governed operational metrics for sales, margin, stock age, repairs, delivery performance, labor, customer service and exceptions.',
    primaryRoles: ['Owner', 'Executive', 'Manager', 'Analyst'],
    primaryActions: ['Review daily command brief', 'Inspect margin variance', 'Review aging inventory', 'Review service cycle time', 'Open performance investigation', 'Export approved report'],
    dataClasses: ['Aggregated operations', 'KPI', 'Exception', 'Forecast', 'Report'],
    emittedEvents: ['DAILY_BRIEF_GENERATED', 'MARGIN_VARIANCE_DETECTED', 'AGING_STOCK_FLAGGED', 'SERVICE_SLA_RISK_DETECTED', 'REPORT_EXPORTED'],
    riskTier: 'controlled'
  },
  {
    id: 'ai-operations',
    label: 'AI Operations Workforce',
    route: '/operations/ai',
    purpose: 'Provide policy-scoped assistance for customer service, product descriptions, scheduling, document classification, exception summaries and operational analysis.',
    primaryRoles: ['Owner', 'AI Supervisor', 'Manager', 'Customer Service'],
    primaryActions: ['Create AI task contract', 'Approve allowed data scope', 'Run assisted task', 'Review source evidence', 'Approve customer-safe output', 'Escalate material decision'],
    dataClasses: ['Task instruction', 'Approved source data', 'AI output', 'Review disposition', 'Audit evidence'],
    emittedEvents: ['AI_TASK_CREATED', 'AI_SCOPE_APPROVED', 'AI_TASK_COMPLETED', 'AI_OUTPUT_REVIEWED', 'AI_OUTPUT_RELEASED', 'AI_TASK_ESCALATED'],
    riskTier: 'material'
  }
] as const;

export type StoreWorkflowState =
  | 'DRAFT'
  | 'OPEN'
  | 'AWAITING_CUSTOMER'
  | 'AWAITING_PAYMENT'
  | 'AWAITING_INVENTORY'
  | 'SCHEDULED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'QUALITY_REVIEW'
  | 'READY_FOR_RELEASE'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXCEPTION'
  | 'HOLD';

export type StoreWorkflowTransition = {
  id: string;
  domain: StoreModuleId;
  from: StoreWorkflowState[];
  to: StoreWorkflowState;
  label: string;
  actorRoles: string[];
  evidence: string[];
  mode: StoreActionMode;
  event: string;
  failureState: StoreWorkflowState;
};

export const storeWorkflowTransitions: readonly StoreWorkflowTransition[] = [
  { id: 'open-sale', domain: 'point-of-sale', from: ['DRAFT'], to: 'OPEN', label: 'Open customer sale', actorRoles: ['Sales', 'Cashier', 'Manager'], evidence: ['customer_or_guest_id', 'store_id', 'register_id'], mode: 'human', event: 'SALE_OPENED', failureState: 'HOLD' },
  { id: 'reserve-sale-inventory', domain: 'point-of-sale', from: ['OPEN', 'AWAITING_INVENTORY'], to: 'AWAITING_PAYMENT', label: 'Reserve selected appliance units', actorRoles: ['Sales', 'Warehouse', 'Manager'], evidence: ['sale_id', 'inventory_unit_ids', 'reservation_expiry'], mode: 'automated-with-policy', event: 'SALE_INVENTORY_RESERVED', failureState: 'EXCEPTION' },
  { id: 'confirm-sale-payment', domain: 'point-of-sale', from: ['AWAITING_PAYMENT'], to: 'READY_FOR_RELEASE', label: 'Confirm approved payment result', actorRoles: ['Cashier', 'Manager', 'Payment Worker'], evidence: ['payment_reference', 'amount', 'processor_status'], mode: 'human-approval-required', event: 'SALE_PAYMENT_CONFIRMED', failureState: 'HOLD' },
  { id: 'complete-sale', domain: 'point-of-sale', from: ['READY_FOR_RELEASE'], to: 'COMPLETED', label: 'Issue receipt and open fulfillment', actorRoles: ['Cashier', 'Manager'], evidence: ['receipt_id', 'fulfillment_order_id'], mode: 'human-approval-required', event: 'SALE_COMPLETED', failureState: 'HOLD' },
  { id: 'receive-unit', domain: 'inventory', from: ['DRAFT'], to: 'OPEN', label: 'Receive appliance into inventory', actorRoles: ['Warehouse', 'Inventory Specialist', 'Manager'], evidence: ['serial_number', 'acquisition_source', 'acquisition_cost', 'received_location'], mode: 'human', event: 'INVENTORY_UNIT_RECEIVED', failureState: 'HOLD' },
  { id: 'approve-unit-for-sale', domain: 'inventory', from: ['OPEN', 'QUALITY_REVIEW'], to: 'READY_FOR_RELEASE', label: 'Approve appliance for sale', actorRoles: ['Inventory Specialist', 'Technician', 'Manager'], evidence: ['inspection_id', 'condition_grade', 'sale_price', 'reviewer_id'], mode: 'human-approval-required', event: 'INVENTORY_UNIT_APPROVED', failureState: 'HOLD' },
  { id: 'open-service-order', domain: 'service-repair', from: ['DRAFT'], to: 'OPEN', label: 'Open customer service work order', actorRoles: ['Customer Service', 'Service Manager'], evidence: ['customer_id', 'equipment_id_or_description', 'reported_issue'], mode: 'human', event: 'SERVICE_ORDER_OPENED', failureState: 'HOLD' },
  { id: 'request-repair-approval', domain: 'service-repair', from: ['IN_PROGRESS'], to: 'AWAITING_CUSTOMER', label: 'Request customer approval of repair estimate', actorRoles: ['Technician', 'Service Manager', 'Customer Service'], evidence: ['diagnostic_id', 'estimate_id', 'customer_contact_channel'], mode: 'human-approval-required', event: 'REPAIR_APPROVAL_REQUESTED', failureState: 'HOLD' },
  { id: 'approve-repair', domain: 'service-repair', from: ['AWAITING_CUSTOMER'], to: 'ASSIGNED', label: 'Record customer repair approval', actorRoles: ['Customer Service', 'Service Manager'], evidence: ['approval_id', 'approved_amount', 'approved_at'], mode: 'human-approval-required', event: 'REPAIR_APPROVED', failureState: 'HOLD' },
  { id: 'complete-repair-quality-review', domain: 'service-repair', from: ['IN_PROGRESS'], to: 'QUALITY_REVIEW', label: 'Complete repair quality review', actorRoles: ['Technician', 'Service Manager'], evidence: ['repair_summary', 'test_result', 'reviewer_id'], mode: 'human-approval-required', event: 'REPAIR_QUALITY_REVIEWED', failureState: 'HOLD' },
  { id: 'schedule-delivery', domain: 'pickup-delivery', from: ['OPEN'], to: 'SCHEDULED', label: 'Schedule customer delivery window', actorRoles: ['Dispatcher', 'Customer Service', 'Manager'], evidence: ['order_id', 'address_id', 'delivery_window', 'customer_readiness'], mode: 'human', event: 'DELIVERY_SCHEDULED', failureState: 'EXCEPTION' },
  { id: 'assign-delivery-crew', domain: 'pickup-delivery', from: ['SCHEDULED'], to: 'ASSIGNED', label: 'Assign vehicle and delivery crew', actorRoles: ['Dispatcher', 'Manager'], evidence: ['vehicle_id', 'crew_ids', 'manifest_id'], mode: 'human-approval-required', event: 'DELIVERY_CREW_ASSIGNED', failureState: 'HOLD' },
  { id: 'complete-delivery', domain: 'pickup-delivery', from: ['IN_PROGRESS', 'ASSIGNED'], to: 'COMPLETED', label: 'Record delivery completion and proof', actorRoles: ['Driver', 'Dispatcher', 'Manager'], evidence: ['proof_id', 'delivered_at', 'recipient_confirmation'], mode: 'human-approval-required', event: 'DELIVERY_COMPLETED', failureState: 'EXCEPTION' },
  { id: 'approve-payroll-register', domain: 'payroll', from: ['QUALITY_REVIEW'], to: 'READY_FOR_RELEASE', label: 'Approve payroll register', actorRoles: ['Payroll', 'Manager', 'Owner'], evidence: ['pay_period_id', 'register_hash', 'exception_clearance', 'approver_id'], mode: 'human-approval-required', event: 'PAYROLL_REGISTER_APPROVED', failureState: 'HOLD' },
  { id: 'release-ai-output', domain: 'ai-operations', from: ['QUALITY_REVIEW'], to: 'COMPLETED', label: 'Release reviewed AI-assisted output', actorRoles: ['AI Supervisor', 'Manager', 'Owner'], evidence: ['task_id', 'source_refs', 'review_disposition', 'approver_id'], mode: 'human-approval-required', event: 'AI_OUTPUT_RELEASED', failureState: 'HOLD' }
] as const;

export type StoreEventTrigger = {
  event: string;
  trigger: string;
  target: string;
  automation: string;
  humanGate?: string;
};

export const storeEventTriggers: readonly StoreEventTrigger[] = [
  { event: 'PAYMENT_CONFIRMED', trigger: 'Create fulfillment work', target: 'orders', automation: 'Create order, allocate reserved units and request fulfillment details.', humanGate: 'Manager reviews exceptions and price adjustments.' },
  { event: 'UNIT_RECEIVED', trigger: 'Open inspection task', target: 'inventory', automation: 'Create serial-number, condition, testing and refurbishment checklist.' },
  { event: 'STOCK_EXCEPTION_OPENED', trigger: 'Route inventory exception', target: 'inventory', automation: 'Assign warehouse owner and calculate impacted orders.', humanGate: 'Manager decides substitution, refund or delay.' },
  { event: 'REPAIR_APPROVED', trigger: 'Reserve parts and technician time', target: 'service-repair', automation: 'Create part reservations and propose technician slot.', humanGate: 'Service manager approves assignment.' },
  { event: 'DELIVERY_SCHEDULED', trigger: 'Build route candidate', target: 'dispatch', automation: 'Group compatible stops by window, capacity and location.', humanGate: 'Dispatcher approves final route.' },
  { event: 'DELIVERY_FAILED', trigger: 'Open failed-delivery case', target: 'pickup-delivery', automation: 'Preserve proof, notify customer service and propose retry windows.', humanGate: 'Manager approves additional fee or exception.' },
  { event: 'PAY_PERIOD_OPENED', trigger: 'Collect approved time records', target: 'payroll', automation: 'Import eligible time cards and open variance queue.', humanGate: 'Payroll reviewer clears every material variance.' },
  { event: 'MARGIN_VARIANCE_DETECTED', trigger: 'Open margin investigation', target: 'analytics', automation: 'Collect sale, cost, discount, refund and delivery-cost evidence.' },
  { event: 'AI_TASK_ESCALATED', trigger: 'Route to responsible human', target: 'ai-operations', automation: 'Suspend delivery and assign the task to the approved operational owner.', humanGate: 'Human disposition is mandatory.' }
] as const;

export type AiCapability = {
  id: string;
  name: string;
  permitted: string[];
  prohibited: string[];
  requiredReview: string;
};

export const aiCapabilities: readonly AiCapability[] = [
  {
    id: 'customer-support-assistant',
    name: 'Customer Support Assistant',
    permitted: ['Summarize order status', 'Draft appointment messages', 'Explain published store policies', 'Create internal follow-up tasks'],
    prohibited: ['Issue refunds', 'Change payment records', 'Promise delivery outcomes', 'Disclose another customer’s data'],
    requiredReview: 'Customer-facing messages involving disputes, refunds, safety, legal threats or material commitments require human approval.'
  },
  {
    id: 'inventory-intelligence-assistant',
    name: 'Inventory Intelligence Assistant',
    permitted: ['Draft product descriptions', 'Identify aging stock', 'Suggest reorder or markdown candidates', 'Summarize inspection notes'],
    prohibited: ['Change sale price', 'Write off inventory', 'Alter serial numbers', 'Mark an uninspected appliance safe or ready'],
    requiredReview: 'Price, condition, safety and disposition decisions require warehouse or manager approval.'
  },
  {
    id: 'dispatch-planning-assistant',
    name: 'Dispatch Planning Assistant',
    permitted: ['Propose routes', 'Identify schedule conflicts', 'Draft delay notices', 'Estimate workload by approved data'],
    prohibited: ['Track staff outside authorized shifts', 'Publish a route without dispatcher approval', 'Override vehicle or crew restrictions'],
    requiredReview: 'Dispatcher approves every final route and material schedule change.'
  },
  {
    id: 'operations-analyst-assistant',
    name: 'Operations Analyst Assistant',
    permitted: ['Summarize KPIs', 'Detect variance patterns', 'Prepare management briefs', 'Draft investigation checklists'],
    prohibited: ['Alter accounting records', 'Approve payroll', 'Represent forecasts as guarantees', 'Make employment decisions'],
    requiredReview: 'Management reviews all financial, payroll, performance and employment-related outputs.'
  }
] as const;

export function getStoreModule(id: StoreModuleId): StoreModule {
  const module = storeModules.find((item) => item.id === id);
  if (!module) throw new Error(`Unknown store module: ${id}`);
  return module;
}

export function getTransitionsForDomain(domain: StoreModuleId): StoreWorkflowTransition[] {
  return storeWorkflowTransitions.filter((transition) => transition.domain === domain);
}
