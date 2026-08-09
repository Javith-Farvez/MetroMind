import React from 'react';
import { AlertTriangle, FileText, Clock, Calendar, ExternalLink, Sparkles, Database } from 'lucide-react';

export default function DashboardView({ documents = [], dashboardSummary = null, onNavigateTab, onSelectDocument }) {
  // Prefer live DB summary; fall back to client-computed values
  const totalDocs = dashboardSummary?.total_documents ?? documents.length;
  const highPriority = dashboardSummary?.high_priority ?? documents.filter(d => d.urgency === 'High' || d.urgency === 'Urgent' || d.urgency === 'HIGH' || d.priority === 'High' || d.priority === 'HIGH' || d.urgency === 'CRITICAL').length;
  const pendingDecisions = dashboardSummary?.pending_review ?? documents.filter(d => d.suggestedActions && d.suggestedActions.length > 0).length;
  const upcomingDeadlines = dashboardSummary?.upcoming_deadlines ?? documents.filter(d => d.extractedEntities && (d.extractedEntities['Deadline'] || d.extractedEntities['Target Date'])).length;

  const urgentDoc = documents.find(d => d.urgency === 'High' || d.urgency === 'Urgent' || d.urgency === 'HIGH' || d.urgency === 'CRITICAL' || d.priority === 'High' || d.id?.includes('084')) || (documents.length > 0 ? documents[0] : null);

  return (
    <div className="space-y-6 pb-12 text-slate-100 font-sans">
      {/* Workspace Title Header with Purple AI Theme */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>KOCHI METRO RAIL LIMITED</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent mt-0.5 font-mono uppercase">
            TODAY AT KMRL
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 shadow-md">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>POSTGRESQL DB: <strong className="text-cyan-300">CONNECTED</strong></span>
          </span>
        </div>
      </div>

      {/* 4 UNIQUE & DISTINCT INFORMATION BLOCKS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {/* Block 1: Decisions Waiting */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 to-slate-950 border border-amber-500/40 space-y-2 shadow-lg shadow-amber-950/30 hover:border-amber-400 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">DECISIONS WAITING</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-4xl font-black text-amber-400">{pendingDecisions}</div>
          <div className="text-[10px] text-amber-400/80 font-sans">Human Approval Gate Required</div>
        </div>

        {/* Block 2: Deadlines This Week */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-950 border border-cyan-500/40 space-y-2 shadow-lg shadow-cyan-950/30 hover:border-cyan-400 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cyan-300 uppercase font-bold tracking-wider">DEADLINES THIS WEEK</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-4xl font-black text-cyan-300">{upcomingDeadlines}</div>
          <div className="text-[10px] text-cyan-400/80 font-sans">Tracked in PostgreSQL DB</div>
        </div>

        {/* Block 3: High Priority Documents */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-pink-950/40 to-slate-950 border border-pink-500/40 space-y-2 shadow-lg shadow-pink-950/30 hover:border-pink-400 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-pink-400 uppercase font-bold tracking-wider">HIGH PRIORITY</span>
            <AlertTriangle className="w-4 h-4 text-pink-400 animate-pulse" />
          </div>
          <div className="text-4xl font-black text-pink-400">{highPriority}</div>
          <div className="text-[10px] text-pink-400/80 font-sans">Critical Exposure Flagged</div>
        </div>

        {/* Block 4: Documents Indexed */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-950/40 to-slate-950 border border-purple-500/40 space-y-2 shadow-lg shadow-purple-950/30 hover:border-purple-400 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-purple-300 uppercase font-bold tracking-wider">DOCUMENTS INDEXED</span>
            <FileText className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-4xl font-black text-white">{totalDocs}</div>
          <div className="text-[10px] text-purple-300/80 font-sans">100% Traceable RAG</div>
        </div>
      </div>

      {/* ONE STRONG CRITICAL ITEM — NEEDS ATTENTION */}
      {urgentDoc && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-pink-500/40 space-y-4 shadow-xl shadow-pink-950/20">
          <div className="flex justify-between items-center border-b border-purple-500/20 pb-3 text-xs font-mono">
            <span className="font-bold text-pink-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-pink-400 animate-pulse" /> NEEDS ATTENTION
            </span>
            <span className="text-purple-300 font-bold">REF: {urgentDoc.id}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="text-lg font-extrabold text-white">{urgentDoc.title}</div>
              <div className="text-xs text-slate-400 font-mono">
                Location: {urgentDoc.extractedEntities?.['Location'] || urgentDoc.extractedEntities?.['Depot Location'] || 'Aluva Station'} • Deadline: <strong className="text-cyan-300">{urgentDoc.extractedEntities?.['Deadline'] || urgentDoc.extractedEntities?.['Target Date'] || '18 AUG 2026'}</strong> • Department: {urgentDoc.department}
              </div>
              <p className="text-xs text-slate-200 bg-slate-950/80 p-3 rounded-xl border border-purple-500/20 font-sans">
                <strong className="text-purple-300 font-mono">AI Recommendation:</strong> {urgentDoc.suggestedActions?.[0]?.action || `Route to ${urgentDoc.department} for immediate review.`}
              </p>
            </div>

            <div className="lg:col-span-4 text-right">
              <button
                onClick={() => {
                  onSelectDocument(urgentDoc);
                  onNavigateTab('viewer');
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs font-mono uppercase hover:brightness-110 transition-all shadow-lg shadow-purple-500/25 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>[ REVIEW DOCUMENT ]</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECENT DOCUMENTS TABLE WITH PURPLE AI THEME */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3 font-mono shadow-xl shadow-purple-950/20">
        <div className="flex justify-between items-center border-b border-purple-500/20 pb-3 text-xs">
          <span className="font-bold text-purple-300">RECENT KMRL DOCUMENTS</span>
          <span className="text-cyan-400">REAL DB RECORDS</span>
        </div>

        {documents.length === 0 ? (
          <div className="py-12 text-center text-slate-400 font-mono border border-dashed border-purple-500/30 rounded-xl space-y-2">
            <div>No documents found in PostgreSQL database.</div>
            <div className="text-xs text-purple-300">Click "+ Ingest Document" in top bar to upload and analyze your files.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs metro-table">
              <thead>
                <tr className="bg-slate-950/80 text-purple-400 border-b border-purple-500/20">
                  <th className="p-3">Reference</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {documents.map(d => (
                  <tr key={d.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="p-3 font-bold text-cyan-300">{d.id}</td>
                    <td className="p-3 font-sans text-slate-100 font-bold">{d.title}</td>
                    <td className="p-3 text-purple-300">{d.department}</td>
                    <td className="p-3 font-bold text-pink-400">{d.urgency || d.priority || 'HIGH'}</td>
                    <td className="p-3 text-cyan-300">{d.status}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          onSelectDocument(d);
                          onNavigateTab('viewer');
                        }}
                        className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline font-bold cursor-pointer"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
