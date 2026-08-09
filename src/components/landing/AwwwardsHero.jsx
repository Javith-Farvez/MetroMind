import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Volume2, VolumeX, ShieldCheck, Cpu, Activity, Award, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AwwwardsHero({ onLaunchWorkspace }) {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleLaunchClick = (e) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#38bdf8', '#8b5cf6', '#10b981']
    });
    if (onLaunchWorkspace) {
      setTimeout(() => onLaunchWorkspace(), 400);
    }
  };

  const handleScrollToSolution = () => {
    const el = document.getElementById('solution');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      {/* Top Floating Glassmorphic Ambient HUD Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel-dark border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span className="text-slate-200">Kochi Metro Rail Limited • METROFLOW Enterprise Intelligence</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
            ALUVA ➔ PETTA 25KM
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => setIsAudioActive(!isAudioActive)}
            data-cursor="Sound"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-dark border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs transition-colors"
          >
            {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden md:inline text-[11px]">{isAudioActive ? 'Ambient Sound ON' : 'Mute Sound'}</span>
          </button>
        </motion.div>
      </div>

      {/* Hero Central Keynote Pitch */}
      <div className="max-w-5xl mx-auto w-full text-center space-y-8 my-auto py-12">
        {/* Hackathon Honor Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 border border-purple-500/40 text-purple-200 text-xs font-bold shadow-lg shadow-purple-500/10"
        >
          <Award className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Smart India Hackathon 2026 Innovation Flagship</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            AI DOCUMENT INTELLIGENCE FOR KMRL
          </div>
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.04]">
            Turn thousands of scattered documents into{' '}
            <span className="gradient-text-full drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
              trusted decisions, actionable tasks & organizational knowledge.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          MetroFlow understands KMRL's multilingual documents, extracts what matters, connects related information, and routes critical actions to the right people.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-5 pt-4"
        >
          <button
            onClick={handleLaunchClick}
            data-cursor="Launch"
            className="liquid-btn group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-sm shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_rgba(6,182,212,0.8)] transition-all transform hover:-translate-y-1"
          >
            <span>EXPLORE METROFLOW</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={handleScrollToSolution}
            data-cursor="Learn"
            className="group flex items-center gap-3 px-7 py-4 rounded-2xl glass-panel-dark text-slate-200 hover:text-white border-white/10 hover:border-cyan-500/50 text-sm font-semibold transition-all transform hover:-translate-y-0.5"
          >
            <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChevronDown className="w-4 h-4" />
            </div>
            <span>SEE HOW IT WORKS</span>
          </button>
        </motion.div>

        {/* Live Indicator Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-medium"
        >
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            CMRS Statutory Directive Compliant
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800">
            <Cpu className="w-4 h-4 text-cyan-400" />
            99.4% Multilingual Malayalam OCR
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800">
            <Activity className="w-4 h-4 text-purple-400" />
            Zero Discrepancy Invoice PO Match
          </span>
        </motion.div>
      </div>

      {/* Floating Ambient Bottom Glass Card Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto w-full glass-panel-dark rounded-2xl p-4 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-slate-100 font-sans">LIVE KMRL METROFLOW STREAM:</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-slate-400">
          <span>ALUVA DEPOT: <strong className="text-cyan-400">142 docs/hr</strong></span>
          <span>MUTTOM BAY-3: <strong className="text-emerald-400">Active Brake Order</strong></span>
          <span>BHEL PO-7721: <strong className="text-purple-400">100% Matched</strong></span>
          <span>SPEED LIMIT: <strong className="text-amber-400">50 km/h (Monsoon ATC)</strong></span>
        </div>
      </motion.div>
    </section>
  );
}
