import React, { useState } from 'react';
import {
  ShieldAlert,
  Building2,
  Cpu,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Layers,
  Wrench,
  DollarSign,
  Users,
  Scale,
  Activity,
  ChevronRight,
  Sparkles,
  Lock,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function DepartmentalDashboards({ documents, activeRole, onSelectDocument, onNavigateTab }) {
  const [activeDeptTab, setActiveDeptTab] = useState('executive'); // 'executive'|'engineering'|'operations'|'finance'|'hr'|'safety'|'legal'|'compliance'|'risk'|'analytics'
  const [actionDone, setActionDone] = useState([]);

  const handleExecuteAction = (actionId) => {
    if (!actionDone.includes(actionId)) setActionDone([...actionDone, actionId]);
  };

  const DEPARTMENTS = [
    { id: 'executive', name: 'Managing Director & Executive Directorate', icon: Building2, color: '#2563eb', count: 64, alert: 0 },
    { id: 'engineering', name: 'Muttom Depot & Rolling Stock Workshop', icon: Wrench, color: '#06b6d4', count: 482, alert: 3 },
    { id: 'operations', name: 'OCC Operations & Station ATC Control', icon: Zap, color: '#3b82f6', count: 215, alert: 1 },
    { id: 'finance', name: 'Finance & Procurement 3-Way Match', icon: DollarSign, color: '#10b981', count: 839, alert: 1 },
    { id: 'hr', name: 'HR Welfare & Duty Roster Engine', icon: Users, color: '#7c3aed', count: 310, alert: 0 },
    { id: 'safety', name: 'Monsoon Safety & Disaster Sentinel', icon: ShieldAlert, color: '#ef4444', count: 124, alert: 5 },
    { id: 'legal', name: 'Legal & Land Acquisition ROW', icon: Scale, color: '#f59e0b', count: 96, alert: 2 },
    { id: 'compliance', name: 'CMRS Regulatory & Compliance Audit', icon: CheckCircle2, color: '#10b981', count: 180, alert: 0 },
    { id: 'risk', name: 'Risk Prediction & Anomaly Sentinel', icon: AlertTriangle, color: '#ef4444', count: 42, alert: 4 },
    { id: 'analytics', name: 'System SLA Telemetry & AI Analytics', icon: Activity, color: '#7c3aed', count: 1248, alert: 0 }
  ];

  const currentDeptObj = DEPARTMENTS.find(d => d.id === activeDeptTab) || DEPARTMENTS[0];

  return (
    <div className="space-y-6 text-slate-100 pb-16">
      {/* Top Department Switcher Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Enterprise Departmental Command Hub
            </h1>
          </div>
          <p className="text-xs text-slate-400">10 Specialized KMRL Command Centers powered by Neural Document Intelligence</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            Current Active Scope: {currentDeptObj.name}
          </span>
        </div>
      </div>

      {/* 10 Department Selection Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {DEPARTMENTS.map(dept => {
          const isActive = activeDeptTab === dept.id;
          const Icon = dept.icon;
          return (
            <button
              key={dept.id}
              onClick={() => setActiveDeptTab(dept.id)}
              className={`p-3 rounded-xl text-left border transition-all space-y-1 relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <Icon className="w-4 h-4" style={{ color: dept.color }} />
                {dept.alert > 0 && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                    {dept.alert} Alert
                  </span>
                )}
              </div>
              <div className="font-bold text-[11px] text-slate-200 truncate">{dept.name.split('&')[0]}</div>
              <div className="text-[10px] text-slate-400 font-mono">{dept.count} docs indexed</div>
            </button>
          );
        })}
      </div>

      {/* Tailored Command Center View Content */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <currentDeptObj.icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">{currentDeptObj.name}</h2>
              <p className="text-xs text-slate-400">Real-time action queue, automated approvals, and compliance verification</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Processing SLA:</span>
            <span className="text-emerald-400 font-bold">100% Compliant</span>
          </div>
        </div>

        {/* Dynamic Metric Cards for Selected Department */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Active Queue Volume</div>
            <div className="text-2xl font-mono font-bold text-white">{currentDeptObj.count} Documents</div>
            <div className="text-[10px] text-emerald-400">0.4s Ingestion Latency</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">AI Extraction Confidence</div>
            <div className="text-2xl font-mono font-bold text-emerald-400">99.4%</div>
            <div className="text-[10px] text-slate-400">Dual Malayalam & English OCR</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Critical Alerts Pending</div>
            <div className="text-2xl font-mono font-bold text-red-400">{currentDeptObj.alert} Items</div>
            <div className="text-[10px] text-red-300/80">Action Required</div>
          </div>
        </div>

        {/* Department Specific Action Stream Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>High-Priority Document Feed for {currentDeptObj.name}</span>
            <span className="font-mono text-cyan-400">Auto-Prioritized by AI Urgency Index</span>
          </div>

          <div className="space-y-3">
            {documents.map((doc, idx) => (
              <div key={doc.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {doc.id}
                    </span>
                    <span className="text-xs font-bold text-slate-200">{doc.category}</span>
                    <span className="text-xs text-slate-400">• Source: {doc.source}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{doc.timestamp}</span>
                </div>

                <div className="text-xs text-slate-300 font-medium">
                  {doc.title}
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-400">Extracted Key Findings:</div>
                  <div className="text-cyan-300">{doc.ocrText.substring(0, 160)}...</div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Confidence: <strong className="text-emerald-400">{doc.confidence}%</strong></span>
                    <span>• Lang: <strong className="text-purple-400">{doc.language}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.suggestedActions.map(act => {
                      const isDone = actionDone.includes(act.id);
                      return (
                        <button
                          key={act.id}
                          onClick={() => handleExecuteAction(act.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            isDone
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                          }`}
                        >
                          {isDone ? '✓ Executed' : act.action}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
