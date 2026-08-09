import React, { useState } from 'react';
import {
  GitMerge,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Zap,
  ArrowRight,
  RefreshCw,
  Sliders,
  DollarSign,
  Award
} from 'lucide-react';

export default function WorkflowAutomation() {
  const [activeTab, setActiveTab] = useState('invoices'); // 'invoices' | 'safety' | 'hr'
  const [verifiedInvoices, setVerifiedInvoices] = useState(['BHEL/KMRL/2026/094']);

  return (
    <div className="space-y-6 text-slate-100 pb-12">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Automated Workflow & Action Engine
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active Autopilot
            </span>
          </h1>
          <p className="text-xs text-slate-400">Automated PO 3-way invoice matching, safety circular broadcasts, and HR policy rules</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'invoices'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Invoice 3-Way Match
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'safety'
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Safety Circular Sentinel
          </button>
        </div>
      </div>

      {activeTab === 'invoices' ? (
        /* Invoice 3-Way Match Verification Studio */
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 bg-slate-900/60 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                3-Way Purchase Order vs Tax Invoice Matching Studio
              </h3>
              <p className="text-xs text-slate-400">Automated cross-check between Vendor Invoice, KMRL Purchase Order, and Warehouse Goods Received Note (GRN)</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Audit Accuracy: 100%
            </span>
          </div>

          {/* Verification Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Vendor / Invoice #</th>
                  <th className="p-3">PO Ref & GRN</th>
                  <th className="p-3">Line Items</th>
                  <th className="p-3">Billed Total</th>
                  <th className="p-3">Discrepancy</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3">
                    <div className="font-bold text-slate-100 font-sans">BHEL Southern Region</div>
                    <div className="text-[10px] text-cyan-400">Invoice #BHEL/KMRL/2026/094</div>
                  </td>
                  <td className="p-3">
                    <div>PO-KMRL-2025-7721</div>
                    <div className="text-[10px] text-emerald-400">GRN-4412 (Aluva Substation)</div>
                  </td>
                  <td className="p-3">
                    2x 33kV Dry Transformers + 4x SCADA Telemetry Units
                  </td>
                  <td className="p-3 font-bold text-emerald-400">
                    ₹16,43,15,000
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      0.0% Discrepancy
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      Clear Payment Release
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/50">
                  <td className="p-3">
                    <div className="font-bold text-slate-100 font-sans">Alstom Transport India</div>
                    <div className="text-[10px] text-cyan-400">Invoice #ALT/2026/4401</div>
                  </td>
                  <td className="p-3">
                    <div>PO-KMRL-2026-8810</div>
                    <div className="text-[10px] text-yellow-400">GRN-4490 (Pending Inspection)</div>
                  </td>
                  <td className="p-3">
                    16x Bogie Friction Pad Maintenance Kits
                  </td>
                  <td className="p-3 font-bold text-slate-200">
                    ₹48,20,000
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                      Awaiting Muttom Audit
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-medium cursor-not-allowed">
                      Pending GRN
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Safety Circular Sentinel View */
        <div className="glass-panel rounded-2xl p-5 border border-red-500/20 bg-slate-900/60 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Monsoon Safety Circular & Speed Restriction Sentinel
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
              Active Broadcast Node
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="font-bold text-slate-200">Current Enforcement Rule: Safety Circular 19/2026</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Rainfall Threshold:</span>
                <div className="font-bold text-cyan-400 text-sm mt-0.5">&gt; 35 mm / hr</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Max Viaduct Speed:</span>
                <div className="font-bold text-red-400 text-sm mt-0.5">50 km/h Override</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">ATC System Link:</span>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">Connected (0ms lag)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
