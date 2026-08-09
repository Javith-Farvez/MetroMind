import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function LandingSolutionFlow({ onLaunchWorkspace }) {
  const [activeStep, setActiveStep] = useState(0);

  const STAGES = [
    { num: "01", name: "RECEIVED", desc: "PDF, DOCX, Scanned Images ingested from email or portals.", color: "text-blue-400" },
    { num: "02", name: "READ", desc: "Multi-page Malayalam & English OCR extracts full document text.", color: "text-purple-400" },
    { num: "03", name: "UNDERSTOOD", desc: "Document classified & structured metadata extracted (Ref, Date, Dept, Location, Vendor, Amount, Deadline).", color: "text-cyan-400" },
    { num: "04", name: "ANALYZED", desc: "Structured AI Summary, Key Findings, Risk Level (HIGH/MED/LOW), Priority, and Urgency generated.", color: "text-pink-400" },
    { num: "05", name: "RECOMMENDED", desc: "Actionable recommendation dispatched with target department and deadline.", color: "text-amber-400" },
    { num: "06", name: "DECIDED", desc: "Human Gate Keeper accepts, rejects (with reason), or modifies recommendation.", color: "text-emerald-400" },
    { num: "07", name: "STORED", desc: "Decision saved to PostgreSQL DB, task created, and SHA-256 audit log committed.", color: "text-[#38bdf8]" }
  ];

  return (
    <section id="solution" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono font-bold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>OPERATIONAL WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-white">
            ONE DOCUMENT. <span className="gradient-text-purple">ONE CLEAR PATH.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans">
            Every document follows the exact 7-stage operational decision loop.
          </p>
        </div>

        {/* Large Horizontal Operational Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {STAGES.map((stg, i) => {
            const isActive = activeStep === i;
            return (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setActiveStep(i)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 space-y-2 relative ${
                  isActive
                    ? 'bg-purple-500/15 border-purple-500/60 shadow-lg shadow-purple-500/20 scale-105 z-10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-purple-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className={isActive ? 'text-purple-300 font-extrabold' : 'text-slate-400'}>{stg.num}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-md shadow-purple-500/50" />}
                </div>
                <div className={`font-extrabold text-xs tracking-wider font-mono ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {stg.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass-panel-dark p-8 rounded-3xl border border-purple-500/30 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-2xl"
          >
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-mono font-extrabold text-purple-300 uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>STAGE {STAGES[activeStep].num} — {STAGES[activeStep].name}</span>
              </div>
              <p className="text-sm text-slate-200 font-sans leading-relaxed">
                {STAGES[activeStep].desc}
              </p>
            </div>

            <div className="lg:col-span-4 text-right">
              <button
                onClick={onLaunchWorkspace}
                className="px-6 py-3 rounded-xl glow-btn-cyan text-xs font-extrabold font-mono uppercase shadow-lg flex items-center gap-2 ml-auto"
              >
                <span>ENTER WORKSPACE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
