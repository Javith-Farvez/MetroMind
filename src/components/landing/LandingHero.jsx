import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, FileText, CheckCircle2, ShieldAlert, Cpu, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LandingHero({ onLaunchWorkspace }) {
  const [activeStage, setActiveStage] = useState(0);

  const STAGES = [
    { id: '01', title: "RAW DOCUMENT", label: "Aluva Station Inspection PDF Ingested", desc: "Dual OCR detects Malayalam & English script with 99.4% spatial precision.", color: "from-cyan-500 to-blue-500", border: "border-cyan-500/50" },
    { id: '02', title: "TEXT EXTRACTION", label: "Multilingual OCR & Spatial Parsing", desc: "Converts scanned PDF pages into indexed organizational knowledge.", color: "from-purple-500 to-pink-500", border: "border-purple-500/50" },
    { id: '03', title: "SPATIAL METADATA", label: "Ref: KMRL/SFT/2026/084 • Date: 09 Aug 2026", desc: "Extracts Location (Aluva), Dept (Safety), and Contract Number.", color: "from-blue-500 to-indigo-500", border: "border-blue-500/50" },
    { id: '04', title: "RISK DETECTION", label: "High Severity Track Vibration & Drainage", desc: "Flags critical safety directive compliance and statutory deadlines.", color: "from-pink-500 to-red-500", border: "border-pink-500/50" },
    { id: '05', title: "AI RECOMMENDATION", label: "Route Task to Safety Dept for Inspection", color: "from-amber-500 to-yellow-500", border: "border-amber-500/50", desc: "Recommends immediate track maintenance before monsoon cycle." },
    { id: '06', title: "HUMAN GATE ACCEPTED", label: "Action Created & Committed to PostgreSQL DB", desc: "Task assigned to Safety Lead S. Nair with 18 Aug 2026 deadline.", color: "from-emerald-500 to-teal-500", border: "border-emerald-500/50" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % STAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleLaunchClick = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#38bdf8', '#34d399']
    });
    if (onLaunchWorkspace) {
      setTimeout(() => onLaunchWorkspace(), 300);
    }
  };

  const handleScrollToSolution = () => {
    const el = document.getElementById('solution');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950 text-slate-100 selection:bg-purple-500/40 bg-grid-cyber">
      {/* Dynamic Multi-Layered Glowing Ambient Kinetic Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-purple-600/25 via-fuchsia-500/20 to-cyan-400/25 rounded-full blur-[140px] animate-float-orb" />
        <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-purple-500/15 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-indigo-500/15 rounded-full blur-[110px] animate-float-orb" style={{ animationDelay: '6s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        {/* Top Centered Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 shadow-xl shadow-purple-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>KOCHI METRO RAIL LIMITED OPERATIONAL PLATFORM</span>
        </motion.div>

        {/* Centered Title & Description */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]"
          >
            Turn KMRL's scattered documents into{' '}
            <span className="gradient-text-purple">
              decisions that move.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            MetroFlow reads, understands and analyzes multilingual KMRL documents — then turns important information into traceable actions.
          </motion.p>
        </div>

        {/* Centered CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={handleLaunchClick}
            className="px-9 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white text-xs font-extrabold tracking-wider uppercase shadow-2xl shadow-purple-500/30 flex items-center gap-3 transition-all scale-100 hover:scale-105 cursor-pointer"
          >
            <span>EXPLORE METROFLOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleScrollToSolution}
            className="px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-purple-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <ChevronDown className="w-4 h-4 text-purple-400" />
            <span>SEE HOW IT WORKS</span>
          </button>
        </motion.div>

        {/* CENTERED ANIMATED DOCUMENT TRANSFORMATION CANVAS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl mx-auto pt-6"
        >
          <div className="glass-panel-dark p-6 sm:p-8 rounded-3xl border border-purple-500/40 space-y-6 shadow-2xl shadow-purple-950/40 text-left relative overflow-hidden backdrop-blur-2xl bg-slate-900/80">
            {/* Top Interactive Pipeline Timeline Indicator */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-purple-400 animate-pulse shadow-lg shadow-purple-500/50" />
                <span className="font-extrabold text-xs text-white font-mono uppercase tracking-wider">
                  Live Document Transformation Pipeline
                </span>
              </div>

              {/* Progress Stage Pills */}
              <div className="flex items-center gap-1.5">
                {STAGES.map((stg, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStage(i)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      activeStage === i
                        ? 'bg-purple-500/30 text-purple-200 border border-purple-500/60 shadow-md shadow-purple-500/20'
                        : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-purple-500/20'
                    }`}
                  >
                    {stg.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Stage Animated Card Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-2xl bg-slate-950/95 border ${STAGES[activeStage].border} space-y-4 shadow-xl`}
              >
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-gradient-to-r ${STAGES[activeStage].color} text-white shadow-md`}>
                    STAGE {STAGES[activeStage].id} — {STAGES[activeStage].title}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 100% Traceable Execution
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-base font-extrabold text-white font-sans">
                    {STAGES[activeStage].label}
                  </div>
                  <div className="text-xs text-slate-300 font-sans leading-relaxed">
                    {STAGES[activeStage].desc}
                  </div>
                </div>

                {/* Animated Line Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-purple-500/20">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${STAGES[activeStage].color}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.8, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Flow Summary */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-300 flex-wrap gap-2">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span>TRANSFORMATION: DOCUMENT ➔ TEXT ➔ INSIGHT ➔ HUMAN ACTION</span>
              </span>
              <button
                onClick={onLaunchWorkspace}
                className="text-cyan-300 hover:text-cyan-200 font-bold transition-colors underline cursor-pointer"
              >
                Launch Workspace Directly →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
