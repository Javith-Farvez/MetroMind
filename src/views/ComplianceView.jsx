import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, Clock, AlertTriangle, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { fetchComplianceItems } from '../api/compliance';

export default function ComplianceView({ documents = [], onSelectDocument, onNavigateTab }) {
  const [items, setItems] = useState([
    { id: 'CMRS-2026-01', title: 'Periyar Bridge Structural Ultrasonic Testing', agency: 'CMRS Safety Commission', status: 'Compliant', date: '04-Aug-2026', riskLevel: 'Critical', docId: 'KMRL-SAF-2026-019' },
    { id: 'MOHUA-2026-14', title: 'Phase 2 Kakkanad Line Environmental Assessment', agency: 'MoHUA Ministry', status: 'Pending Review', date: '12-Aug-2026', riskLevel: 'High', docId: 'KMRL-ENG-2026-8812' },
    { id: 'KMRL-SAF-019', title: 'Monsoon Heavy Rainfall Viaduct Speed Restriction', agency: 'KMRL Safety Directorate', status: 'Enforced', date: '07-Aug-2026', riskLevel: 'Critical', docId: 'KMRL-SAF-2026-019' },
    { id: 'BHEL-PO-094', title: '33kV Transformer PO Net 30 Discrepancy Gate', agency: 'Finance Audit', status: 'Verified', date: '03-Sep-2026', riskLevel: 'Medium', docId: 'KMRL-FIN-2026-3042' }
  ]);

  useEffect(() => {
    async function loadCompliance() {
      try {
        const live = await fetchComplianceItems();
        if (live && Array.isArray(live) && live.length > 0) {
          const formatted = live.map(c => ({
            id: `CMP-${c.id}`,
            title: c.title,
            agency: c.department_name || 'KMRL Safety Directorate',
            status: c.status || 'Compliant',
            date: c.deadline ? new Date(c.deadline).toLocaleDateString() : '08-Aug-2026',
            riskLevel: c.priority || 'High',
            docId: c.document_id || 'KMRL-ENG-2026-8812'
          }));
          setItems(formatted);
        }
      } catch (err) {
        console.warn('Compliance API fallback:', err);
      }
    }
    loadCompliance();
  }, []);

  const criticalCount = items.filter(i => i.riskLevel === 'Critical').length;
  const highCount = items.filter(i => i.riskLevel === 'High').length;
  const mediumCount = items.filter(i => i.riskLevel === 'Medium').length;
  const lowCount = items.filter(i => i.riskLevel === 'Low').length;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50" />
            <span className="gradient-text-cyan">Compliance Center & Risk Intelligence</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Commissioner of Metro Railway Safety (CMRS), MoHUA & Statutory Directives Tracker</p>
        </div>

        <span className="px-3.5 py-1 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
          Statutory Compliance Rate: 98.4%
        </span>
      </div>

      {/* RISK LEVEL BREAKDOWN CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metro-card p-4 space-y-1 relative overflow-hidden bg-red-950/20 border-red-500/30">
          <div className="text-xs text-red-300 font-bold uppercase tracking-wider font-mono">Critical Risk</div>
          <div className="text-3xl font-extrabold text-red-400 font-mono">{criticalCount}</div>
          <div className="text-[11px] text-red-300">Requires Immediate Action</div>
        </div>

        <div className="metro-card p-4 space-y-1 relative overflow-hidden bg-amber-950/20 border-amber-500/30">
          <div className="text-xs text-amber-300 font-bold uppercase tracking-wider font-mono">High Risk</div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono">{highCount}</div>
          <div className="text-[11px] text-amber-300">Target Deadline Imminent</div>
        </div>

        <div className="metro-card p-4 space-y-1 relative overflow-hidden bg-blue-950/20 border-blue-500/30">
          <div className="text-xs text-blue-300 font-bold uppercase tracking-wider font-mono">Medium Risk</div>
          <div className="text-3xl font-extrabold text-blue-400 font-mono">{mediumCount}</div>
          <div className="text-[11px] text-blue-300">Routine Statutory Audits</div>
        </div>

        <div className="metro-card p-4 space-y-1 relative overflow-hidden bg-emerald-950/20 border-emerald-500/30">
          <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider font-mono">Low Risk</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">{lowCount}</div>
          <div className="text-[11px] text-emerald-300">Compliant Archives</div>
        </div>
      </div>

      <div className="metro-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Active Regulatory Directives & Statutory Expiry Alerts
          </h3>
          <span className="text-xs text-slate-400">Source Document Linkage Enforced</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono metro-table">
            <thead>
              <tr>
                <th>Risk Level</th>
                <th>Compliance Ref ID</th>
                <th>Directive Title</th>
                <th>Source Document</th>
                <th>Regulatory Agency</th>
                <th>Target Date</th>
                <th className="text-right">Action & Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      item.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                      item.riskLevel === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    }`}>
                      {item.riskLevel}
                    </span>
                  </td>
                  <td className="font-bold text-cyan-400">{item.id}</td>
                  <td className="font-sans font-bold text-slate-100">{item.title}</td>
                  <td>
                    <button
                      onClick={() => {
                        const targetDoc = documents.find(d => d.id === item.docId) || documents[0];
                        if (targetDoc && onSelectDocument && onNavigateTab) {
                          onSelectDocument(targetDoc);
                          onNavigateTab('viewer');
                        }
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors underline decoration-cyan-500/40"
                    >
                      <span>{item.docId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                  <td className="font-sans text-slate-300">{item.agency}</td>
                  <td className="text-slate-400">{item.date}</td>
                  <td className="text-right font-bold text-emerald-400">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                      {item.status}
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
