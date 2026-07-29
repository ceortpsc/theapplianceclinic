import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  aiCapabilities,
  storeEventTriggers,
  storeModules,
  storeWorkflowTransitions,
} from '@clinic/store-operations';
import styles from './page.module.css';

const routeSegment = (route: string) => route.split('/').filter(Boolean).at(-1) ?? '';

export function generateStaticParams() {
  return storeModules.map((module) => ({ module: routeSegment(module.route) }));
}

export default function StoreModulePage({ params }: { params: { module: string } }) {
  const operation = storeModules.find((item) => routeSegment(item.route) === params.module);
  if (!operation) notFound();

  const transitions = storeWorkflowTransitions.filter((transition) => transition.domain === operation.id);
  const triggers = storeEventTriggers.filter((trigger) => trigger.target === operation.id);
  const aiProfile = operation.id === 'ai-operations' ? aiCapabilities : [];

  return (
    <main className={styles.canvas}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <div className={styles.crumbs}>
              <Link href="/">The Appliance Clinic</Link>
              <span>/</span>
              <Link href="/operations">Operations</Link>
              <span>/</span>
              <b>{operation.id}</b>
            </div>
            <span className={styles.eyebrow}>INDEPENDENT STORE DOMAIN · {operation.riskTier.toUpperCase()} RISK</span>
            <h1>{operation.label}</h1>
            <p>{operation.purpose}</p>
            <div className={styles.heroActions}>
              <Link href={`/operations/${params.module}#actions`}>Review controlled actions</Link>
              <Link href="/operations">Return to store command</Link>
            </div>
          </div>

          <aside className={styles.controlCard}>
            <header><span>Domain control record</span><em>{operation.id}</em></header>
            <div className={styles.controlMetrics}>
              <div><b>{operation.primaryRoles.length}</b><span>authorized role groups</span></div>
              <div><b>{operation.primaryActions.length}</b><span>explicit operations</span></div>
              <div><b>{operation.emittedEvents.length}</b><span>domain events</span></div>
              <div><b>{transitions.length}</b><span>state transitions</span></div>
            </div>
            <footer>
              <b>Data classification</b>
              <p>{operation.dataClasses.join(' · ')}</p>
            </footer>
          </aside>
        </div>
      </section>

      <section className={styles.roleAndData}>
        <article>
          <span>01</span>
          <h2>Authorized operating roles</h2>
          <div>{operation.primaryRoles.map((role) => <b key={role}>{role}</b>)}</div>
        </article>
        <article>
          <span>02</span>
          <h2>Controlled information scope</h2>
          <div>{operation.dataClasses.map((dataClass) => <b key={dataClass}>{dataClass}</b>)}</div>
        </article>
        <article>
          <span>03</span>
          <h2>Events emitted</h2>
          <div>{operation.emittedEvents.map((event) => <b key={event}>{event}</b>)}</div>
        </article>
      </section>

      <section className={styles.actionChamber} id="actions">
        <header className={styles.sectionHeader}>
          <div><span>CONTROLLED ACTIONS</span><h2>Every command says exactly what it does.</h2></div>
          <p>Actions are assigned to an authorized role, recorded in the audit trail and prevented from bypassing payment, inventory, customer, safety or management approval rules.</p>
        </header>
        <div className={styles.actionGrid}>
          {operation.primaryActions.map((action, index) => (
            <article key={action}>
              <b>{String(index + 1).padStart(2, '0')}</b>
              <h3>{action}</h3>
              <p>{index === 0 ? 'Opens the governed domain workflow and records the responsible actor.' : index === operation.primaryActions.length - 1 ? 'Closes or releases the controlled phase with evidence.' : 'Advances the workflow only after required conditions are satisfied.'}</p>
              <footer><span>ACTOR + EVIDENCE + EVENT</span><em>CONTROLLED</em></footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workflowLedger}>
        <header className={styles.sectionHeader}>
          <div><span>STATE TRANSITIONS</span><h2>Material operations fail closed.</h2></div>
          <p>Missing evidence, unauthorized actors and absent approvals route the operation to HOLD or EXCEPTION instead of silently advancing.</p>
        </header>
        {transitions.length > 0 ? (
          <div className={styles.transitionRows}>
            {transitions.map((transition, index) => (
              <article key={transition.id}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <div>
                  <small>{transition.from.join(' / ')} → {transition.to}</small>
                  <h3>{transition.label}</h3>
                  <p>{transition.evidence.join(' · ')}</p>
                </div>
                <aside>
                  <span>{transition.event}</span>
                  <em>{transition.mode.replaceAll('-', ' ')}</em>
                  <small>Failure: {transition.failureState}</small>
                </aside>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>Transition contract scheduled for the next implementation wave.</h3>
            <p>The domain remains visible for architecture and route planning, but no material action is represented as executable until its transition rules are approved.</p>
          </div>
        )}
      </section>

      <section className={styles.triggerSection}>
        <header className={styles.sectionHeader}>
          <div><span>EVENT AUTOMATION</span><h2>Triggers create governed work.</h2></div>
          <p>Automations may create checklists, assignments, alerts and proposed routes. They do not approve refunds, payroll, write-offs or material customer commitments.</p>
        </header>
        {triggers.length > 0 ? (
          <div className={styles.triggerGrid}>
            {triggers.map((trigger) => (
              <article key={`${trigger.event}-${trigger.trigger}`}>
                <small>{trigger.event}</small>
                <h3>{trigger.trigger}</h3>
                <p>{trigger.automation}</p>
                <footer>{trigger.humanGate ?? 'Runs within approved policy limits.'}</footer>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>No automatic trigger is approved for this domain yet.</h3>
            <p>Manual operations remain available only through existing authenticated modules and approved procedures.</p>
          </div>
        )}
      </section>

      {aiProfile.length > 0 && (
        <section className={styles.aiSection}>
          <header className={styles.sectionHeader}>
            <div><span>AI PERSONA GOVERNANCE</span><h2>Assistance without unauthorized authority.</h2></div>
            <p>Every AI profile declares permitted work, prohibited work and the exact point where a human reviewer becomes mandatory.</p>
          </header>
          <div className={styles.aiGrid}>
            {aiProfile.map((capability) => (
              <article key={capability.id}>
                <h3>{capability.name}</h3>
                <div><b>Permitted</b>{capability.permitted.map((item) => <span key={item}>{item}</span>)}</div>
                <div className={styles.prohibited}><b>Prohibited</b>{capability.prohibited.map((item) => <span key={item}>{item}</span>)}</div>
                <footer>{capability.requiredReview}</footer>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className={styles.boundaryFooter}>
        <div><span>CLIENT PRODUCT BOUNDARY</span><h2>This route belongs exclusively to The Appliance Clinic.</h2></div>
        <div><p>No taxpayer, tax-return, ERO, e-file, transcript or unrelated business data is authorized in this domain.</p><Link href="/operations">Return to operations index →</Link></div>
      </section>
    </main>
  );
}
