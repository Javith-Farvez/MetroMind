import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LandingClosingSection({ onLaunchWorkspace }) {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden bg-slate-950 border-t border-slate-800 text-center">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Kinetic Statement Line */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono font-extrabold text-cyan-400 uppercase tracking-widest">
          <span>FROM DOCUMENTS</span>
          <span className="text-slate-600">➔</span>
          <span>TO INTELLIGENCE</span>
          <span className="text-slate-600">➔</span>
          <span>TO DECISIONS</span>
          <span className="text-slate-600">➔</span>
          <span>TO ACTION</span>
          <span className="text-slate-600">➔</span>
          <span className="text-purple-400">TO INSTITUTIONAL MEMORY</span>
        </div>

        {/* Main Final Statement */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          "MetroFlow gives KMRL one intelligent layer across <span className="gradient-text-full">documents, departments, decisions and knowledge.</span>"
        </h2>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Transform scattered KMRL operational records into trusted, traceable and actionable organizational intelligence.
        </p>

        <div className="pt-4 flex justify-center">
          <button
            onClick={onLaunchWorkspace}
            className="group flex items-center gap-3 px-9 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-sm shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_rgba(6,182,212,0.8)] transition-all transform hover:-translate-y-1"
          >
            <span>EXPLORE METROFLOW</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
