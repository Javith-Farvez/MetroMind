import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Zap, ArrowRight, CheckCircle2, CloudRain } from 'lucide-react';

const STORY_STEPS = [
  {
    step: '01',
    title: 'Rainfall Circular Circular Ingestion',
    subtitle: 'Kerala Disaster Management Advisory',
    description: 'At 08:14 AM, a scanned Malayalam advisory circular arrives. Rain gauge sensors report 52mm/hr precipitation along the Muttom-Edapally viaduct section.',
    badge: 'Raw Unstructured Scan',
    statusColor: 'text-amber-400',
    borderColor: 'border-amber-500/30'
  },
  {
    step: '02',
    title: 'Malayalam Multilingual OCR Context Extraction',
    subtitle: 'Vision Engine Processing (340ms)',
    description: 'MetroMind AI recognizes Malayalam text ("മഴക്കാല വേഗത 50 km/h"), identifies the critical safety mandate, and extracts target section bounds.',
    badge: '99.4% Dual OCR Match',
    statusColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30'
  },
  {
    step: '03',
    title: 'Direct Automatic Train Control (ATC) Broadcast',
    subtitle: 'Viaduct Speed Overriding',
    description: 'System automatically dispatches speed limit restrictions directly to automatic train control signaling computers without human sorting latency.',
    badge: 'Sub-second Signals',
    statusColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30'
  },
  {
    step: '04',
    title: 'Immutable CMRS Audit Log Sealed',
    subtitle: 'Cryptographic Governance Ledger',
    description: 'The entire incident, confidence scores, and machine dispatch telemetry are recorded in a cryptographic audit ledger for CMRS safety audits.',
    badge: '100% Governance',
    statusColor: 'text-purple-400',
    borderColor: 'border-purple-500/30'
  }
];

export default function CinematicScrollStory({ onLaunchWorkspace }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <CloudRain className="w-4 h-4 text-amber-400" />
            <span>CINEMATIC STORYTELLING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How MetroMind Handles a <span className="gradient-text-full">Monsoon Weather Alert</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Follow the 4-step autonomous pipeline from raw Malayalam field scan to sub-second rail system speed overrides.
          </p>
        </div>

        {/* Step-by-Step Interactive Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Story Navigator (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {STORY_STEPS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                data-cursor="Story"
                className={`w-full p-5 rounded-2xl border text-left transition-all ${
                  activeStep === idx
                    ? 'glass-panel-dark border-cyan-500/50 shadow-xl shadow-cyan-500/10 scale-[1.02]'
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 opacity-65 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">STEP {s.step}</span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-slate-300 border border-slate-800">
                    {s.badge}
                  </span>
                </div>
                <div className="font-bold text-white text-base mb-1">{s.title}</div>
                <div className="text-xs text-slate-400">{s.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Stage Showcase (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`glass-panel-dark p-8 rounded-3xl border ${STORY_STEPS[activeStep].borderColor} shadow-2xl relative overflow-hidden space-y-6 min-h-[380px] flex flex-col justify-between`}>
              {/* Background Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-extrabold text-white text-xl">{STORY_STEPS[activeStep].title}</div>
                      <div className="text-xs text-slate-400">{STORY_STEPS[activeStep].subtitle}</div>
                    </div>
                  </div>
                  <span className={`font-mono font-extrabold text-3xl ${STORY_STEPS[activeStep].statusColor}`}>
                    0{activeStep + 1}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-normal pt-2">
                  {STORY_STEPS[activeStep].description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PIPELINE HEALTH: OPTIMAL (0.34s)</span>
                </div>

                <button
                  onClick={onLaunchWorkspace}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-sans font-bold transition-all"
                >
                  <span>Simulate Full Emergency Workflow</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
