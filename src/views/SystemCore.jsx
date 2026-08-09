import React from 'react';
import AnalyticsAudit from './AnalyticsAudit';
import { Cpu, ShieldCheck, Lock, Key } from 'lucide-react';

export default function SystemCore({ documents }) {
  return (
    <div className="space-y-6 text-slate-100 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              System Core & Governance Mesh
            </h1>
          </div>
          <p className="text-xs text-slate-400">Cryptographic audit ledger, RBAC permissions matrix, and encryption status</p>
        </div>

        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Security: SHA-256 Mesh Active
        </span>
      </div>

      <AnalyticsAudit documents={documents} />
    </div>
  );
}
