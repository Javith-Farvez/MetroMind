import React, { useState } from 'react';
import MetroNetworkCanvas from '../components/common/MetroNetworkCanvas';
import { Layers, Train, Building2, Wrench, FileText, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function DigitalTwin({ documents }) {
  const [selectedAsset, setSelectedAsset] = useState({
    id: 'MTM',
    name: 'Muttom Depot & Maintenance Yard',
    type: 'Depot & OCC',
    status: 'Active Servicing',
    rake: 'Trainset KM-07 (Alstom Metropolis)',
    docs: ['KMRL-ENG-2026-8812', 'KMRL-HR-2026-512'],
    vendor: 'Alstom Transport India',
    contract: 'CNT-KMRL-2024-009'
  });

  return (
    <div className="space-y-6 text-slate-100 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              Digital Twin Rail Corridor
            </h1>
          </div>
          <p className="text-xs text-slate-400">Spatial telemetry twin of Aluva-Pettah 25km Line 1 — Click stations & trains to inspect connected intelligence</p>
        </div>

        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          Spatial Twin Live
        </span>
      </div>

      <MetroNetworkCanvas />

      {/* Selected Asset Digital Twin Telemetry Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl shadow-2xl space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">{selectedAsset.name}</h3>
              <div className="text-[10px] text-cyan-400">{selectedAsset.type} • Status: {selectedAsset.status}</div>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            0ms Telemetry Sync
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px]">Active Trainset / Rake:</span>
            <div className="font-bold text-slate-200 text-xs">{selectedAsset.rake}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px]">Contractor / OEM:</span>
            <div className="font-bold text-purple-300 text-xs">{selectedAsset.vendor} ({selectedAsset.contract})</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px]">Connected Documents:</span>
            <div className="font-bold text-cyan-400 text-xs">{selectedAsset.docs.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
