import Link from 'next/link';
import {
  aiCapabilities,
  storeEventTriggers,
  storeModules,
  storeWorkflowTransitions,
} from '@clinic/store-operations';
import styles from './page.module.css';

const commandMetrics = [
  { value: storeModules.length, label: 'operating domains', detail: 'POS, inventory, service, delivery, workforce, finance and AI' },
  { value: storeWorkflowTransitions.length, label: 'governed transitions', detail: 'Evidence-backed state changes with explicit actors and failure states' },
  { value: storeEventTriggers.length, label: 'event automations', detail: 'Operational triggers that create tasks without bypassing human gates' },
  { value: aiCapabilities.length, label: 'AI capability profiles', detail: 'Supervised assistance with prohibited-action boundaries' },
];

const operatingLanes = [
  ['SALE', 'Customer cart', 'Inventory reservation', 'Payment confirmation', 'Receipt', 'Fulfillment'],
  ['SERVICE', 'Customer intake', 'Diagnosis', 'Estimate approval', 'Repair', 'Quality review'],
  ['DELIVERY', 'Order release', 'Manifest', 'Crew assignment', 'Proof', 'Completion'],
  ['PAYROLL', 'Pay period', 'Approved time', 'Exception review', 'Register approval', 'Statements'],
];

export default function OperationsCommandPage() {
  return (
    <main className={styles.canvas}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>THE APPLIANCE CLINIC · STORE OPERATIONS SYSTEM</span>
            <h1>One command center for the entire appliance business.</h1>
            <p>
              Sales, serial-number inventory, customer service, repairs, field dispatch, pickup and delivery,
              employees, payroll, accounting, analytics and supervised AI operations—built as an independent
              client platform with no tax-software dependency.
            </p>
            <div className={styles.heroActions}>
              <Link href="/operations/pos">Open sales counter</Link>
              <Link href="/operations/inventory">Inspect inventory control</Link>
            </div>
            <div className={styles.boundaryNotice}>
              <b>Independent product boundary</b>
              <span>No taxpayer, ERO, e-file, transcript or RTPSC tax-platform records are used by this system.</span>
            </div>
          </div>

          <aside className={styles.liveBoard}>
            <header>
              <div><small>Operating posture</small><strong>Client Store Command</strong></div>
              <em>INDEPENDENT</em>
            </header>
            <div className={styles.boardRows}>
              {operatingLanes.map(([code, ...steps]) => (
                <div className={styles.boardRow} key={code}>
                  <b>{code}</b>
                  <div>{steps.map((step, index) => <span key={step} data-active={index === 1}>{step}</span>)}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.metricBand}>
        {commandMetrics.map((metric) => (
          <article key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.detail}</small>
          </article>
        ))}
      </section>

      <section className={styles.modulePortfolio}>
        <header className={styles.sectionHeader}>
          <div><span>01 · OPERATING DOMAINS</span><h2>Every department gets its own working environment.</h2></div>
          <p>No generic “management” cards. Each domain carries purpose-built actions, roles, events, risk language and data boundaries.</p>
        </header>

        <div className={styles.moduleGrid}>
          {storeModules.map((module, index) => (
            <article className={styles.moduleCard} key={module.id}>
              <div className={styles.moduleCardTop}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <em data-risk={module.riskTier}>{module.riskTier}</em>
              </div>
              <small>{module.primaryRoles.join(' · ')}</small>
              <h3>{module.label}</h3>
              <p>{module.purpose}</p>
              <div className={styles.actionList}>
                {module.primaryActions.slice(0, 4).map((action) => <span key={action}>{action}</span>)}
              </div>
              <footer>
                <span>{module.emittedEvents.length} events</span>
                <Link href={module.route}>Open domain →</Link>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workflowChamber}>
        <header className={styles.sectionHeader}>
          <div><span>02 · WORKFLOW ENGINE</span><h2>State changes require actors, evidence and a permitted route.</h2></div>
          <p>Sales, repairs, deliveries, inventory and payroll cannot jump directly to completion. Material transitions fail closed when evidence or approval is missing.</p>
        </header>

        <div className={styles.transitionLedger}>
          {storeWorkflowTransitions.map((transition, index) => (
            <article key={transition.id}>
              <b>{String(index + 1).padStart(2, '0')}</b>
              <div className={styles.transitionState}>
                <span>{transition.from.slice(0, 2).join(' / ')}</span>
                <i>→</i>
                <strong>{transition.to}</strong>
              </div>
              <h3>{transition.label}</h3>
              <p>{transition.evidence.join(' · ')}</p>
              <footer>
                <span>{transition.event}</span>
                <em>{transition.mode.replaceAll('-', ' ')}</em>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.triggerTheater}>
        <header className={styles.sectionHeader}>
          <div><span>03 · TASK TRIGGERS</span><h2>Automation creates work. It does not erase accountability.</h2></div>
          <p>Events generate assignments, checklists, alerts and proposed actions. Refunds, payroll release, pricing decisions and material exceptions remain human-controlled.</p>
        </header>
        <div className={styles.triggerRows}>
          {storeEventTriggers.map((trigger, index) => (
            <article key={`${trigger.event}-${trigger.trigger}`}>
              <b>{String(index + 1).padStart(2, '0')}</b>
              <div><small>{trigger.event}</small><h3>{trigger.trigger}</h3><p>{trigger.automation}</p></div>
              <aside><span>{trigger.target}</span><em>{trigger.humanGate ?? 'Policy automation'}</em></aside>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.aiCommand}>
        <div className={styles.aiIntro}>
          <span>04 · AI OPERATIONS WORKFORCE</span>
          <h2>Useful, visible and supervised.</h2>
          <p>AI assists store personnel with approved data and narrow tasks. It does not become the cashier, payroll approver, inventory write-off authority or employment decision-maker.</p>
          <Link href="/operations/ai">Open AI supervision center →</Link>
        </div>
        <div className={styles.aiRoster}>
          {aiCapabilities.map((capability) => (
            <article key={capability.id}>
              <h3>{capability.name}</h3>
              <div><b>Permitted</b>{capability.permitted.map((item) => <span key={item}>{item}</span>)}</div>
              <div className={styles.prohibited}><b>Prohibited</b>{capability.prohibited.map((item) => <span key={item}>{item}</span>)}</div>
              <footer>{capability.requiredReview}</footer>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
