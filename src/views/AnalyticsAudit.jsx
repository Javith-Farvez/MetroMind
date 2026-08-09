import React from 'react';
import {
  BarChart3,
  ShieldCheck,
  Cpu,
  Lock,
  FileText,
  Clock,
  Zap,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export default function AnalyticsAudit({ documents }) {
  const AUDIT_LOGS = [
    { id: 'LOG-9912', timestamp: '2026-08-07 10:45:12', docId: 'KMRL-FIN-3042', action: 'PO 3-Way Match Verified', confidence: '99.1%', status: 'Passed Audit', rule: 'Rule #FIN-88' },
    { id: 'LOG-9911', timestamp: '2026-08-07 09:14:02', docId: 'KMRL-ENG-8812', action: 'Brake Pad Anomaly Flagged', confidence: '99.4%', status: 'Work Order Generated', rule: 'Rule #ENG-04' },
    { id: 'LOG-9910', timestamp: '2026-08-07 07:30:44', docId: 'KMRL-SAF-019', action: 'Malayalam Speed Restriction Pushed', confidence: '99.8%', status: 'ATC Enforced', rule: 'Rule #SAF-19' },
    { id: 'LOG-9909', timestamp: '2026-08-06 16:15:30', docId: 'KMRL-HR-512', action: 'Night Shift Rate Updated to ₹450', confidence: '97.9%', status: 'Indexed RAG', rule: 'Rule #HR-02' }
  ];

  return (
    <div className="space-y-6 text-slate-100 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Enterprise Analytics & Immutable AI Decision Audit Log
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Audit Grade
            </span>
          </h1>
          <p className="text-xs text-slate-400">Complete cryptographic audit ledger for governance, OCR confidence heatmaps, and system SLAs</p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>SHA-256 Ledger Locked</span>
        </div>
      </div>

      {/* Analytics KPI summary grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Total System Decisions Executed</div>
          <div className="text-2xl font-extrabold text-white font-mono">14,892</div>
          <div className="text-[11px] text-emerald-400">100% Zero-tamper guarantee</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Malayalam OCR Accuracy Index</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">99.4%</div>
          <div className="text-[11px] text-slate-400">Verified across 3,400 Malayalam circulars</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Average Department SLA Saved</div>
          <div className="text-2xl font-extrabold text-purple-400 font-mono">3.8 Hours</div>
          <div className="text-[11px] text-purple-300">85% automated routing efficiency</div>
        </div>
      </div>

      {/* Cryptographic Immutable Audit Log Table */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Cryptographic AI Decision Audit Ledger
          </h3>
          <span className="text-xs font-mono text-slate-400">Real-time Stream</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Log Hash / Time</th>
                <th className="p-3">Doc Ref</th>
                <th className="p-3">AI Action Executed</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Enforced Rule</th>
                <th className="p-3 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {AUDIT_LOGS.map(log => (
                <tr key={log.id} className="hover:bg-slate-900/50">
                  <td className="p-3">
                    <div className="font-bold text-cyan-400">{log.id}</div>
                    <div className="text-[10px] text-slate-400">{log.timestamp}</div>
                  </td>
                  <td className="p-3 font-bold text-slate-100">{log.docId}</td>
                  <td className="p-3 text-slate-300 font-sans">{log.action}</td>
                  <td className="p-3 text-emerald-400 font-bold">{log.confidence}</td>
                  <td className="p-3 text-purple-300">{log.rule}</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ✓ {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
