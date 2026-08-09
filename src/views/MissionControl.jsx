import React, { useState } from 'react';
import MetroNetworkCanvas from '../components/common/MetroNetworkCanvas';
import {
  ShieldAlert,
  Activity,
  Cpu,
  FileText,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Building2,
  ChevronRight,
  Radio,
  Eye,
  Crosshair,
  BarChart2
} from 'lucide-react';
import { DEPARTMENT_STATS } from '../data/mockDocuments';

export default function MissionControl({ documents, onSelectDocument, onNavigateTab }) {
  const [executedActions, setExecutedActions] = useState([]);

  const urgentDocs = documents.filter(d => d.urgency === 'High' || d.urgency === 'Urgent');

  const handleExecuteAction = (actionId) => {
    if (!executedActions.includes(actionId)) setExecutedActions([...executedActions, actionId]);
  };

  return (
    <div className="space-y-6 text-slate-100 pb-16">
      {/* Top Header Command Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              Mission Control Operating Center
            </h1>
          </div>
          <p className="text-xs text-slate-400">KMRL Central Command • Live Metro Corridor Telemetry & AI Decision Radar</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-mono">JARVIS Mesh: 1,248 Docs Indexed</span>
          </div>
        </div>
      </div>

      {/* Interactive Metro Network Corridor Visualizer */}
      <MetroNetworkCanvas />

      {/* Middle Grid: Rotating Radars + Department Health Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Radar & Risk Radar Sweeper (Left 1 col) */}
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400" />
              Compliance & Risk Radar
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">Sweep Rate: 4s</span>
          </div>

          {/* Rotating Radar Sweeper Graphic */}
          <div className="relative w-full h-48 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Concentric radar circles */}
            <div className="absolute w-40 h-40 rounded-full border border-cyan-500/20" />
            <div className="absolute w-28 h-28 rounded-full border border-cyan-500/30" />
            <div className="absolute w-16 h-16 rounded-full border border-cyan-500/40" />

            {/* Crosshairs */}
            <div className="absolute inset-0 border-t border-b border-slate-800/80 top-1/2" />
            <div className="absolute inset-0 border-l border-r border-slate-800/80 left-1/2" />

            {/* Rotating Radar Line */}
            <div className="absolute inset-0 radar-sweeper flex items-center justify-center pointer-events-none">
              <div className="w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent absolute right-0" />
            </div>

            {/* Glowing Anomaly Blips */}
            <div className="absolute top-10 right-12 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" title="Muttom Brake Pad Anomaly" />
            <div className="absolute bottom-12 left-14 w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" title="BHEL Invoice Approval" />
          </div>

          <div className="text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Muttom Depot Track Risk:</span>
              <span className="text-red-400 font-bold">Action Needed</span>
            </div>
            <div className="flex justify-between">
              <span>BHEL Invoice PO-Match:</span>
              <span className="text-emerald-400 font-bold">99.1% Verified</span>
            </div>
          </div>
        </div>

        {/* Live Critical Actions & Dispatches (Right 2 cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Critical AI Recommendations & Urgency Stream
            </h3>
            <span className="text-[10px] font-mono text-slate-400">{urgentDocs.length} Urgent Items</span>
          </div>

          <div className="space-y-3">
            {urgentDocs.map(doc => (
              <div key={doc.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                      {doc.urgency} URGENCY
                    </span>
                    <span className="text-xs font-bold text-slate-200">{doc.id}</span>
                    <span className="text-xs text-slate-400">• {doc.department}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{doc.timestamp}</span>
                </div>

                <div className="text-xs text-slate-200 font-bold">{doc.title}</div>
                <p className="text-xs text-slate-400 line-clamp-2">{doc.ocrText.substring(0, 140)}...</p>

                <div className="space-y-1.5 pt-1 border-t border-slate-800">
                  {doc.suggestedActions.map(act => {
                    const isDone = executedActions.includes(act.id);
                    return (
                      <div key={act.id} className="flex items-center justify-between p-2 rounded bg-slate-950 text-xs">
                        <span className="text-slate-300 font-mono text-[11px]">{act.action}</span>
                        <button
                          onClick={() => handleExecuteAction(act.id)}
                          disabled={isDone}
                          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                            isDone
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                          }`}
                        >
                          {isDone ? '✓ Executed' : 'Approve'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
