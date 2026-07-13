'use client';

import React from 'react';

export default function ExecutiveDashboard() {
  // Enterprise metrics are hydrated server-side via Next.js async layouts or state stores
  const kpis = [
    { name: 'Gross Operational Income', value: '$428,950.00', change: '+14.2%', trendingUp: true },
    {
      name: 'Open IRS Tax Liability Accruals',
      value: '$34,120.50',
      change: 'On Track',
      trendingUp: false,
    },
    { name: 'Field Force Utilization Rate', value: '91.4%', change: '+3.1%', trendingUp: true },
    { name: 'Square Sync Pipeline Status', value: 'Synced', change: 'Healthy', trendingUp: true },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ross Tax Pro Software Co.</h1>
          <p className="mt-2 text-sm text-slate-600">
            The Appliance Clinic Real-time Analytics &amp; Executive Ledger
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 border border-slate-200"
          >
            <dt>
              <p className="truncate text-sm font-medium text-slate-500">{kpi.name}</p>
            </dt>
            <dd className="flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold tracking-tight text-slate-900">{kpi.value}</p>
              <span
                className={`ml-2 text-xs font-semibold ${
                  kpi.trendingUp ? 'text-emerald-600' : 'text-slate-500'
                }`}
              >
                {kpi.change}
              </span>
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}
