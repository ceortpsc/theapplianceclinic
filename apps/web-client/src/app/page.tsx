import Link from 'next/link';
import { storeModules } from '@clinic/store-operations';
import styles from './page.module.css';

const featuredModules = storeModules.filter((module) =>
  ['point-of-sale', 'inventory', 'service-repair', 'pickup-delivery', 'analytics', 'ai-operations'].includes(module.id),
);

const operatingProof = [
  ['Serial-level inventory', 'Track each appliance by condition, cost, location, reservation and readiness.'],
  ['Controlled checkout', 'Connect customer, appliance, payment result, receipt and fulfillment evidence.'],
  ['Repair lifecycle', 'Preserve diagnosis, estimate, approval, technician work and quality review.'],
  ['Delivery accountability', 'Coordinate manifests, crews, customer readiness and proof of delivery.'],
];

export default function HomePage() {
  return (
    <main className={styles.canvas}>
      <header className={styles.navigation}>
        <Link href="/" className={styles.brand}>
          <span>THE</span>
          <strong>APPLIANCE CLINIC</strong>
          <small>Sales · Service · Delivery</small>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/operations">Operations</Link>
          <Link href="/operations/inventory">Inventory</Link>
          <Link href="/operations/service">Repairs</Link>
          <Link href="/operations/dispatch">Dispatch</Link>
        </nav>
        <Link href="/operations/pos" className={styles.counterAction}>Open sales counter</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span>THE APPLIANCE CLINIC · INDEPENDENT STORE PLATFORM</span>
          <h1>Sell it. Service it. Deliver it. Account for every step.</h1>
          <p>
            A dedicated operating system for appliance inventory, point of sale, customers, repairs,
            technicians, pickup, delivery, employees, payroll, accounting and real-time store intelligence.
          </p>
          <div className={styles.heroActions}>
            <Link href="/operations">Enter store command</Link>
            <Link href="/operations/service">Open repair workshop</Link>
          </div>
        </div>

        <div className={styles.inventoryShowcase} aria-label="Store operations preview">
          <div className={styles.showcaseHeader}>
            <div><small>Store status</small><strong>Operational Command</strong></div>
            <em>LIVE WORKSPACE</em>
          </div>
          <div className={styles.applianceStage}>
            <div className={styles.applianceUnit}>
              <span>READY FOR SALE</span>
              <b>French Door Refrigerator</b>
              <small>Serial verified · Condition A · Warehouse A3</small>
            </div>
            <div className={styles.pricePlate}>
              <small>Approved floor price</small>
              <strong>$1,675</strong>
              <span>Delivery available</span>
            </div>
          </div>
          <div className={styles.showcaseRail}>
            <div><b>12</b><span>units ready</span></div>
            <div><b>7</b><span>orders active</span></div>
            <div><b>4</b><span>repairs due</span></div>
            <div><b>3</b><span>deliveries today</span></div>
          </div>
        </div>
      </section>

      <section className={styles.proofBand}>
        {operatingProof.map(([title, detail], index) => (
          <article key={title}>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <h2>{title}</h2>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className={styles.moduleShowcase}>
        <header>
          <div><span>STORE OPERATING SYSTEM</span><h2>Purpose-built departments, not generic dashboards.</h2></div>
          <p>Each workspace has its own actions, users, evidence, workflow states, exceptions and release controls.</p>
        </header>
        <div className={styles.moduleGrid}>
          {featuredModules.map((module, index) => (
            <article key={module.id}>
              <div className={styles.moduleIndex}>{String(index + 1).padStart(2, '0')}</div>
              <small>{module.primaryRoles.join(' · ')}</small>
              <h3>{module.label}</h3>
              <p>{module.purpose}</p>
              <div>{module.primaryActions.slice(0, 3).map((action) => <span key={action}>{action}</span>)}</div>
              <Link href={module.route}>Enter workspace →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.independenceStatement}>
        <div>
          <span>INDEPENDENT CLIENT PRODUCT</span>
          <h2>The Appliance Clinic operates as its own business system.</h2>
        </div>
        <div>
          <p>
            This platform is dedicated exclusively to The Appliance Clinic’s stores, customers, employees,
            inventory, payments and service operations. It does not participate in taxpayer, ERO, e-file,
            transcript or tax-software workflows.
          </p>
          <Link href="/operations">Review the full operating architecture →</Link>
        </div>
      </section>
    </main>
  );
}
