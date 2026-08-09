import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers } from 'lucide-react';

export default function LandingProblemSection() {
  const [highlighted, setHighlighted] = useState(false);

  const DOC_TITLES = [
    "SAFETY CIRCULAR 19/2026", "MUTTOM DEPOT MAINTENANCE REPORT", "BHEL PURCHASE ORDER PO-7721",
    "ALUVA STATION TRACK INSPECTION REPORT", "ALSTOM VENDOR DISPATCH LETTER", "VIADUCT ENGINEERING DRAWING P-248",
    "PERIYAR BRIDGE MONSOON INCIDENT REPORT", "CMRS REGULATORY DIRECTIVE #084", "ANNUAL SAFETY AUDIT 2026",
    "TRACTION TRANSFORMER INVOICE #094", "STATION CONTROLLER LOGBOOK", "OCC SPEED OVERRIDE MEMO",
    "SIGNALING SYSTEM DIAGNOSTIC REPORT", "FIRE SAFETY EQUIPMENT CHECKLIST", "NIGHT SHIFT DUTY ROSTER"
  ];

  return (
    <section id="problem" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-xl text-slate-100">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Editorial Headline with Purple/Pink Gradient */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-mono font-bold text-pink-300">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>OPERATIONAL REALITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-white">
            THE INFORMATION IS THERE. <span className="gradient-text-purple">FINDING WHAT MATTERS IS HARD.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Thousands of documents accumulate across KMRL departments — burying vital maintenance alerts and safety deadlines in noise.
          </p>
        </div>

        {/* Dense Wall of Document Titles */}
        <div
          onMouseEnter={() => setHighlighted(true)}
          onMouseLeave={() => setHighlighted(false)}
          className="glass-panel-dark p-8 rounded-3xl border border-slate-800/90 hover:border-purple-500/40 space-y-6 relative overflow-hidden cursor-pointer shadow-2xl transition-all"
        >
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>KMRL UNSTRUCTURED DOCUMENT NOISE WALL</span>
            <span className="text-purple-300 font-bold">HOVER TO FILTER SIGNAL</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono transition-all duration-500">
            {DOC_TITLES.map((title, i) => {
              const isTarget = title.includes("ALUVA STATION TRACK INSPECTION");
              return (
                <span
                  key={i}
                  className={`px-3.5 py-1.5 rounded-xl transition-all duration-500 ${
                    highlighted
                      ? (isTarget
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-purple-500/40 scale-105 z-10 border border-purple-300'
                          : 'opacity-20 text-slate-500 bg-slate-950 border border-slate-900')
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800'
                  }`}
                >
                  {isTarget && highlighted ? "▶ Immediate corrective action required — Aluva Track Safety" : title}
                </span>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">RESULT:</span>
            <span className="text-cyan-400 font-extrabold">MetroFlow finds the signal inside the noise.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
