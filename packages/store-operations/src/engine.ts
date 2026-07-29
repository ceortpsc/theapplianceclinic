import {
  storeEventTriggers,
  storeWorkflowTransitions,
  type StoreWorkflowState,
} from './index';

export type StoreTransitionRequest = {
  transitionId: string;
  currentState: StoreWorkflowState;
  actorRole: string;
  evidence: Record<string, unknown>;
  humanApprovalId?: string;
  correlationId?: string;
};

export type StoreTransitionDecision = {
  allowed: boolean;
  transitionId: string;
  nextState: StoreWorkflowState;
  event: string;
  failureState: StoreWorkflowState;
  mode: string;
  missingEvidence: string[];
  errors: string[];
  audit: {
    correlationId?: string;
    evaluatedAt: string;
    actorRole: string;
  };
};

const hasEvidence = (evidence: Record<string, unknown>, key: string): boolean => {
  const value = evidence[key];
  if (value === undefined || value === null || value === '') return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export function evaluateStoreTransition(request: StoreTransitionRequest): StoreTransitionDecision {
  const transition = storeWorkflowTransitions.find((item) => item.id === request.transitionId);

  if (!transition) {
    return {
      allowed: false,
      transitionId: request.transitionId,
      nextState: 'HOLD',
      event: 'UNKNOWN_TRANSITION_BLOCKED',
      failureState: 'HOLD',
      mode: 'human-approval-required',
      missingEvidence: [],
      errors: ['The requested store transition is not registered.'],
      audit: {
        correlationId: request.correlationId,
        evaluatedAt: new Date().toISOString(),
        actorRole: request.actorRole,
      },
    };
  }

  const errors: string[] = [];
  const missingEvidence = transition.evidence.filter((key) => !hasEvidence(request.evidence, key));

  if (!transition.from.includes(request.currentState)) {
    errors.push(`Transition ${transition.id} cannot run from ${request.currentState}.`);
  }

  if (!transition.actorRoles.includes(request.actorRole)) {
    errors.push(`Role ${request.actorRole} is not authorized for transition ${transition.id}.`);
  }

  if (missingEvidence.length > 0) {
    errors.push(`Missing required evidence: ${missingEvidence.join(', ')}.`);
  }

  if (transition.mode === 'human-approval-required' && !request.humanApprovalId) {
    errors.push('A recorded human approval is required for this transition.');
  }

  const allowed = errors.length === 0;

  return {
    allowed,
    transitionId: transition.id,
    nextState: allowed ? transition.to : transition.failureState,
    event: allowed ? transition.event : 'STORE_TRANSITION_BLOCKED',
    failureState: transition.failureState,
    mode: transition.mode,
    missingEvidence,
    errors,
    audit: {
      correlationId: request.correlationId,
      evaluatedAt: new Date().toISOString(),
      actorRole: request.actorRole,
    },
  };
}

export type ResolvedTrigger = {
  event: string;
  trigger: string;
  target: string;
  automation: string;
  humanGate?: string;
  taskStatus: 'PROPOSED' | 'REQUIRES_HUMAN_REVIEW';
};

export function resolveStoreEventTriggers(event: string): ResolvedTrigger[] {
  return storeEventTriggers
    .filter((item) => item.event === event)
    .map((item) => ({
      ...item,
      taskStatus: item.humanGate ? 'REQUIRES_HUMAN_REVIEW' : 'PROPOSED',
    }));
}

export function listAvailableStoreTransitions(currentState: StoreWorkflowState, actorRole: string) {
  return storeWorkflowTransitions.filter(
    (transition) => transition.from.includes(currentState) && transition.actorRoles.includes(actorRole),
  );
}
