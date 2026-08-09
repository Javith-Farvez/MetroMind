import React, { useState } from 'react';
import { DEPARTMENT_STATS } from '../data/mockDocuments';
import {
  Activity,
  FileCheck2,
  AlertOctagon,
  Clock,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldAlert,
  Building2,
  CheckCircle,
  FileText,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function ExecutiveDashboard({ documents, onSelectDocument, onNavigateTab }) {
  const [activeDepartmentFilter, setActiveDepartmentFilter] = useState('All');
  const [executedActions, setExecutedActions] = useState([]);

  const urgentDocs = documents.filter(d => d.urgency === 'High' || d.urgency === 'Urgent');
  const filteredDocs = activeDepartmentFilter === 'All'
    ? documents
    : documents.filter(d => d.department === activeDepartmentFilter);

  const handleExecuteAction = (actionId) => {
    if (!executedActions.includes(actionId)) {
      setExecutedActions([...executedActions, actionId]);
    }
  };

  return (
    <div className="space-y-6 text-slate-100 pb-12">
      {/* Page Title & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Executive Command Center
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Live Feed
            </span>
          </h1>
          <p className="text-xs text-slate-400">Real-time document processing velocity, department SLAs, and critical AI action recommendations</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-mono">Pipeline Speed: 0.4s / doc</span>
          </div>
          <button
            onClick={() => onNavigateTab('documents')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ingest New Document</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Daily Doc Volume</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">1,248</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs yesterday</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>OCR Extraction Accuracy</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">99.4%</div>
          <div className="text-[11px] text-slate-400">
            Malayalam + English Dual Engine
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Critical AI Action Items</span>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-red-400 font-mono">{urgentDocs.length} Active</div>
          <div className="text-[11px] text-red-300/80">
            Requires Department Sign-off
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Avg Processing SLA</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">4.2 min</div>
          <div className="text-[11px] text-purple-400">
            85% faster than manual filing
          </div>
        </div>
      </div>

      {/* Main Content Split Grid: Critical Recommendations & Departmental Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent AI Recommended Actions Stream (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-red-500/20 bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                Critical Department Actions Recommended by AI
              </h2>
              <span className="text-xs font-mono text-slate-400">Auto-prioritized by Urgency Index</span>
            </div>

            <div className="space-y-3">
              {urgentDocs.map(doc => (
                <div key={doc.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                        {doc.urgency} URGENCY
                      </span>
                      <span className="text-xs font-bold text-slate-200">{doc.id}</span>
                      <span className="text-xs text-slate-400">• {doc.department}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{doc.timestamp}</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{doc.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{doc.ocrText.substring(0, 140)}...</p>
                  </div>

                  {/* Recommended Action Pill List */}
                  <div className="space-y-2 pt-1 border-t border-slate-800/80">
                    <div className="text-[11px] font-semibold text-cyan-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Recommended Departmental Actions:
                    </div>
                    <div className="space-y-1.5">
                      {doc.suggestedActions.map(act => {
                        const isDone = executedActions.includes(act.id);
                        return (
                          <div key={act.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 text-xs border border-slate-800">
                            <span className="text-slate-300 flex items-center gap-2">
                              <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              {act.action}
                            </span>
                            <button
                              onClick={() => handleExecuteAction(act.id)}
                              disabled={isDone}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                                isDone
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                              }`}
                            >
                              {isDone ? '✓ Executed' : 'Approve & Execute'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Departmental Metrics & Volume Breakdown (Right 1 Column) */}
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-4">
            <h2 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              Department Routing Status
            </h2>

            <div className="space-y-3">
              {DEPARTMENT_STATS.map((dept, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDepartmentFilter(dept.name)}
                  className={`w-full p-3 rounded-xl text-left border transition-all space-y-1.5 ${
                    activeDepartmentFilter === dept.name
                      ? 'bg-cyan-500/10 border-cyan-500/40 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-200">{dept.name}</span>
                    <span className="font-mono text-cyan-400">{dept.count} docs</span>
                  </div>

                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (dept.count / 839) * 100)}%`,
                        backgroundColor: dept.color
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Accuracy: {dept.accuracy}%</span>
                    {dept.urgent > 0 && (
                      <span className="text-red-400 font-bold">{dept.urgent} Urgent</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
