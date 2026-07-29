import { Injectable } from '@nestjs/common';
import {
  aiCapabilities,
  storeEventTriggers,
  storeModules,
  storeWorkflowTransitions,
  type StoreModuleId,
} from '@clinic/store-operations';
import {
  evaluateStoreTransition,
  resolveStoreEventTriggers,
  type StoreTransitionRequest,
} from '@clinic/store-operations/engine';

@Injectable()
export class OperationsRegistryService {
  getOverview() {
    return {
      contract: 'appliance-clinic.operations-registry.v1',
      productBoundary: 'independent-client-store-platform',
      generatedAt: new Date().toISOString(),
      counts: {
        modules: storeModules.length,
        transitions: storeWorkflowTransitions.length,
        triggers: storeEventTriggers.length,
        aiCapabilities: aiCapabilities.length,
      },
      modules: storeModules,
    };
  }

  getModule(id: StoreModuleId) {
    const module = storeModules.find((item) => item.id === id);
    if (!module) return null;

    return {
      ...module,
      transitions: storeWorkflowTransitions.filter((transition) => transition.domain === id),
      triggers: storeEventTriggers.filter((trigger) => trigger.target === id),
    };
  }

  getWorkflowContract() {
    return {
      contract: 'appliance-clinic.workflow-contract.v1',
      transitions: storeWorkflowTransitions,
      triggers: storeEventTriggers,
    };
  }

  evaluateTransition(request: StoreTransitionRequest) {
    return {
      contract: 'appliance-clinic.transition-decision.v1',
      productBoundary: 'independent-client-store-platform',
      decision: evaluateStoreTransition(request),
    };
  }

  resolveTriggers(event: string) {
    return {
      contract: 'appliance-clinic.trigger-resolution.v1',
      event,
      resolvedAt: new Date().toISOString(),
      tasks: resolveStoreEventTriggers(event),
    };
  }

  getAiGovernance() {
    return {
      contract: 'appliance-clinic.ai-governance.v1',
      productBoundary: 'store-operations-only',
      materialActionsRequireHumanApproval: true,
      capabilities: aiCapabilities,
      globalProhibitions: [
        'Issue or approve refunds',
        'Alter payment settlement records',
        'Approve payroll or release payroll payments',
        'Write off inventory or change serial numbers',
        'Make employment or disciplinary decisions',
        'Publish final routes without dispatcher approval',
        'Represent forecasts, delivery windows or repair outcomes as guarantees',
        'Access data from any unrelated business or tax-software system',
      ],
    };
  }
}
