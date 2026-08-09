import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Cpu, CheckCircle2, Layers, Search, Sparkles } from 'lucide-react';

export default function LiveDeviceMockup({ onLaunchWorkspace }) {
  const [activeStep, setActiveStep] = useState(0);

  const EXTRACTED_ENTITIES = [
    { label: 'Document Code', value: 'KMRL-ENG-2026-8812', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Department', value: 'Operations & Maintenance (Depot)', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Language', value: 'Bilingual Malayalam + English', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Action Required', value: 'Brake Pad Replacement Bay 3', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            LIVE ENGINE DEMONSTRATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            See Deep OCR <span className="gradient-text-full">Scan in Real-Time</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Our AI engine parses scanned PDFs, extracts bounding box coordinates, and translates Malayalam instructions into operational workflow triggers instantly.
          </p>
        </div>

        {/* 3D Glass Device Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glass Browser Frame */}
          <div className="glass-panel-dark rounded-3xl border border-cyan-500/30 overflow-hidden shadow-[0_30px_90px_rgba(6,182,212,0.2)]">
            {/* Top Browser Bar */}
            <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>https://ai.kmrl.co.in/ocr-vision-stream/KMRL-8812</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono text-emerald-400 font-bold hidden sm:inline">ENGINE ONLINE</span>
              </div>
            </div>

            {/* Browser Content Split Screen */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
              {/* Left Column: Simulated Document Scanner (7 cols) */}
              <div className="md:col-span-7 p-6 bg-slate-950/90 border-r border-slate-800/80 relative overflow-hidden flex flex-col justify-between">
                {/* Laser Scanning Line */}
                <div className="laser-scanner" />

                {/* Simulated Scanned Engineering Document */}
                <div className="space-y-4 font-mono text-xs text-slate-300 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>KOCHI METRO RAIL LIMITED — O&M DISPATCH</span>
                    </div>
                    <span className="text-[10px] text-slate-500">REF: KMRL/MTM/2026/8812</span>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Substance: Emergency Bogie Brake Pad Inspection report for Muttom Depot trainsets.
                  </p>

                  {/* Malayalam & English Extracted Text Box with Animated Bounding Box */}
                  <motion.div
                    animate={{
                      scale: activeStep === 1 ? [1, 1.02, 1] : 1,
                      borderColor: activeStep === 1 ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)'
                    }}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 relative"
                  >
                    <div className="text-[10px] text-cyan-400 font-bold flex items-center justify-between">
                      <span>[BOUNDING BOX ID: B-0941]</span>
                      <span>Confidence: 99.4%</span>
                    </div>
                    <p className="text-white text-xs font-semibold">
                      "Friction Brake Pads: Front bogie pad replacement mandatory prior to next 500-km cycle."
                    </p>
                    <p className="text-cyan-300 text-xs italic">
                      "ഫ്രണ്ട് ബോഗി ബ്രേക്ക് പാഡ് മാറ്റിസ്ഥാപിക്കണം."
                    </p>

                    {/* Animated Corner Bounding Box Markers */}
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />
                  </motion.div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>OCR Model: LayoutLMv3-KMRL</span>
                  <span className="text-cyan-400">Latency: 340ms</span>
                </div>
              </div>

              {/* Right Column: Real-time Extracted Metadata Cards (5 cols) */}
              <div className="md:col-span-5 p-6 bg-slate-900/60 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-100">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>STRUCTURED ENTITY FEED</span>
                  </div>

                  <div className="space-y-3">
                    {EXTRACTED_ENTITIES.map((ent, idx) => (
                      <motion.div
                        key={idx}
                        animate={{
                          x: activeStep === idx ? [0, 6, 0] : 0,
                          borderColor: activeStep === idx ? '#06b6d4' : 'rgba(255, 255, 255, 0.08)'
                        }}
                        className="p-3 rounded-xl bg-slate-950/80 border border-white/10 space-y-1 transition-colors"
                      >
                        <div className="text-[10px] uppercase font-mono text-slate-400">{ent.label}</div>
                        <div className={`text-xs font-bold font-mono ${ent.color}`}>{ent.value}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onLaunchWorkspace}
                  data-cursor="Open"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <span>Open Full Ingestion Reader</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
