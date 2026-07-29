import { OperationsRegistryService } from './operations-registry.service';

describe('OperationsRegistryService', () => {
  let service: OperationsRegistryService;

  beforeEach(() => {
    service = new OperationsRegistryService();
  });

  it('allows a valid sales transition with required evidence', () => {
    const result = service.evaluateTransition({
      transitionId: 'open-sale',
      currentState: 'DRAFT',
      actorRole: 'Sales',
      evidence: {
        customer_or_guest_id: 'guest-1',
        store_id: 'store-1',
        register_id: 'register-1',
      },
      correlationId: 'test-sale-1',
    });

    expect(result.decision.allowed).toBe(true);
    expect(result.decision.nextState).toBe('OPEN');
    expect(result.decision.event).toBe('SALE_OPENED');
  });

  it('blocks a transition when the current state is invalid', () => {
    const result = service.evaluateTransition({
      transitionId: 'open-sale',
      currentState: 'COMPLETED',
      actorRole: 'Sales',
      evidence: {
        customer_or_guest_id: 'customer-1',
        store_id: 'store-1',
        register_id: 'register-1',
      },
    });

    expect(result.decision.allowed).toBe(false);
    expect(result.decision.nextState).toBe('HOLD');
    expect(result.decision.errors.join(' ')).toContain('cannot run from COMPLETED');
  });

  it('blocks an unauthorized operating role', () => {
    const result = service.evaluateTransition({
      transitionId: 'approve-unit-for-sale',
      currentState: 'QUALITY_REVIEW',
      actorRole: 'Sales',
      evidence: {
        inspection_id: 'inspection-1',
        condition_grade: 'A',
        sale_price: 1200,
        reviewer_id: 'reviewer-1',
      },
      humanApprovalId: 'approval-1',
    });

    expect(result.decision.allowed).toBe(false);
    expect(result.decision.errors.join(' ')).toContain('is not authorized');
  });

  it('requires a recorded human approval for material payroll release', () => {
    const result = service.evaluateTransition({
      transitionId: 'approve-payroll-register',
      currentState: 'QUALITY_REVIEW',
      actorRole: 'Payroll',
      evidence: {
        pay_period_id: 'period-1',
        register_hash: 'sha256:test',
        exception_clearance: 'clear',
        approver_id: 'manager-1',
      },
    });

    expect(result.decision.allowed).toBe(false);
    expect(result.decision.nextState).toBe('HOLD');
    expect(result.decision.errors).toContain('A recorded human approval is required for this transition.');
  });

  it('reports missing transition evidence', () => {
    const result = service.evaluateTransition({
      transitionId: 'complete-delivery',
      currentState: 'IN_PROGRESS',
      actorRole: 'Driver',
      evidence: {
        delivered_at: '2026-07-29T12:00:00Z',
      },
      humanApprovalId: 'approval-2',
    });

    expect(result.decision.allowed).toBe(false);
    expect(result.decision.missingEvidence).toEqual(
      expect.arrayContaining(['proof_id', 'recipient_confirmation']),
    );
  });

  it('resolves payment confirmation into governed fulfillment work', () => {
    const result = service.resolveTriggers('PAYMENT_CONFIRMED');

    expect(result.tasks).toHaveLength(1);
    expect(result.tasks[0]).toMatchObject({
      target: 'orders',
      taskStatus: 'REQUIRES_HUMAN_REVIEW',
    });
  });

  it('publishes global AI prohibitions for material store actions', () => {
    const governance = service.getAiGovernance();

    expect(governance.materialActionsRequireHumanApproval).toBe(true);
    expect(governance.globalProhibitions).toEqual(
      expect.arrayContaining([
        'Issue or approve refunds',
        'Approve payroll or release payroll payments',
        'Write off inventory or change serial numbers',
      ]),
    );
  });
});
