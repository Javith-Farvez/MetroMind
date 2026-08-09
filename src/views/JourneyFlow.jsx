import React, { useState } from 'react';
import { GitMerge, CheckCircle2, ArrowRight, ShieldCheck, Zap, Cpu, MapPin } from 'lucide-react';

export default function JourneyFlow() {
  const STATIONS = [
    { id: 1, name: 'Upload Station', desc: 'Ingestion of multi-channel PDF, TIFF, WhatsApp & DWG files' },
    { id: 2, name: 'OCR Station', desc: 'Vision Layout Parser & spatial bounding box mapping' },
    { id: 3, name: 'Translation Station', desc: 'Malayalam script & dialect normalizer' },
    { id: 4, name: 'Classification Station', desc: 'Document category & urgency scoring' },
    { id: 5, name: 'Knowledge Station', desc: 'Entity extraction & Neo4j graph linkage' },
    { id: 6, name: 'Risk Station', desc: '3-way PO match & safety circular protocol check' },
    { id: 7, name: 'Routing Station', desc: 'Automated dispatch to target KMRL department' },
    { id: 8, name: 'Completion Station', desc: 'SHA-256 immutable audit logging & notification' }
  ];

  const [activeStep, setActiveStep] = useState(4);

  return (
    <div className="space-y-6 text-slate-100 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              Document Journey Flow
            </h1>
          </div>
          <p className="text-xs text-slate-400">Pipeline progression across 8 Metro Ingestion Stations</p>
        </div>

        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          Station Progress: Step {activeStep} of 8
        </span>
      </div>

      {/* Metro Rail Journey Track Visualizer */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="relative flex items-center justify-between my-8 px-4">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1.5 bg-slate-800 rounded-full" />
          <div
            className="absolute left-8 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${((activeStep - 1) / (STATIONS.length - 1)) * 92}%` }}
          />

          {STATIONS.map((st) => {
            const isDone = st.id <= activeStep;
            const isCurrent = st.id === activeStep;

            return (
              <button
                key={st.id}
                onClick={() => setActiveStep(st.id)}
                className="relative z-10 flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all border ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 border-white scale-125 shadow-lg shadow-cyan-500/50'
                    : isDone
                    ? 'bg-blue-600 text-white border-blue-400'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}>
                  {st.id}
                </div>
                <span className={`text-[10px] font-bold mt-2 font-mono truncate max-w-[90px] text-center ${
                  isCurrent ? 'text-cyan-300' : isDone ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {st.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Station Station Details Card */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              {STATIONS[activeStep - 1].name}
            </span>
            <span className="text-emerald-400">Processing Latency: 0.04s</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{STATIONS[activeStep - 1].desc}</p>
        </div>
      </div>
    </div>
  );
}
