import React, { useState } from 'react';
import { Building2, Wrench, DollarSign, Users, ShieldCheck, Scale, FileText } from 'lucide-react';

export default function DepartmentWorkspaceView({ documents, onSelectDocument, onNavigateTab }) {
  const [activeDept, setActiveDept] = useState('Operations & Maintenance');

  const DEPTS = [
    { id: 'Operations & Maintenance', name: 'Operations & Muttom Maintenance', icon: Wrench, count: 482 },
    { id: 'Finance & Procurement', name: 'Finance & Procurement', icon: DollarSign, count: 839 },
    { id: 'Safety & Security', name: 'Safety & Monsoon Sentinel', icon: ShieldCheck, count: 124 },
    { id: 'Human Resources', name: 'Human Resources & Welfare', icon: Users, count: 310 },
    { id: 'Legal & Land Acquisition', name: 'Legal & Rights of Way', icon: Scale, count: 96 }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50" />
            <span className="gradient-text-cyan">Department Workspaces</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Dedicated operational portals across KMRL core divisions</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {DEPTS.map(d => {
          const Icon = d.icon;
          const isActive = activeDept === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDept(d.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{d.name}</span>
            </button>
          );
        })}
      </div>

      <div className="metro-card p-5 space-y-4">
        <h2 className="font-extrabold text-sm text-slate-100">Department Documents & Directives</h2>
        <div className="space-y-3">
          {documents.map(doc => (
            <button
              key={doc.id}
              onClick={() => {
                onSelectDocument(doc);
                onNavigateTab('viewer');
              }}
              className="w-full text-left p-3.5 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all flex items-center justify-between text-xs group"
            >
              <div>
                <div className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">{doc.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{doc.category} • Source: {doc.source}</div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/30">Inspect</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
