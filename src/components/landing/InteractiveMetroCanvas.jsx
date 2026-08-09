import React, { useState } from 'react';
import MetroNetworkCanvas from '../common/MetroNetworkCanvas';
import { Zap, Cpu, Activity, FileText } from 'lucide-react';

export default function InteractiveMetroCanvas({ onLaunchWorkspace }) {
  return (
    <section id="canvas" className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>REAL-TIME CORRIDOR SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Kochi Metro <span className="gradient-text-cyan">Neural Document Corridor</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Click any station node along the 25km Aluva to Petta revenue line to inspect live document ingestion dispatches and train telemetry.
          </p>
        </div>

        {/* Canvas Interactive Component */}
        <div data-cursor="Corridor">
          <MetroNetworkCanvas />
        </div>
      </div>
    </section>
  );
}
