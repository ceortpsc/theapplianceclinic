import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          The Appliance Clinic
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          Enterprise Management Platform — Powered by Ross Tax Pro Software Co.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dispatch"
            className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-4 font-semibold transition-colors"
          >
            Dispatch Board
          </Link>
          <Link
            href="/executive"
            className="rounded-lg bg-blue-600 hover:bg-blue-500 px-6 py-4 font-semibold transition-colors"
          >
            Executive Dashboard
          </Link>
          <Link
            href="/crm"
            className="rounded-lg bg-violet-600 hover:bg-violet-500 px-6 py-4 font-semibold transition-colors"
          >
            CRM & Work Orders
          </Link>
          <Link
            href="/accounting"
            className="rounded-lg bg-amber-600 hover:bg-amber-500 px-6 py-4 font-semibold transition-colors"
          >
            Accounting & Ledger
          </Link>
        </div>
      </div>
    </main>
  );
}
