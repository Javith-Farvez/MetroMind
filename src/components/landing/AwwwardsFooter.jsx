import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, FileText, Globe, Github, Twitter, Linkedin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AwwwardsFooter({ onLaunchWorkspace }) {
  const handleLaunch = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#38bdf8', '#8b5cf6', '#10b981']
    });
    if (onLaunchWorkspace) {
      setTimeout(() => onLaunchWorkspace(), 400);
    }
  };

  return (
    <footer className="relative bg-slate-950 text-white pt-24 pb-12 border-t border-slate-800/80 z-10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Top Launch Call to Action */}
        <div className="glass-panel-dark p-8 sm:p-12 rounded-3xl border border-cyan-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ready for Kochi Metro Command OS?</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Experience the Future of{' '}
            <span className="gradient-text-full">Document Intelligence</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ingest Malayalam field reports, verify multi-crore BHEL invoices, and automate cross-departmental rail operations in sub-second speed.
          </p>

          <div className="pt-2">
            <button
              onClick={handleLaunch}
              data-cursor="Enter OS"
              className="liquid-btn inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-sm shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:shadow-[0_0_80px_rgba(6,182,212,0.9)] transition-all transform hover:-translate-y-1"
            >
              <span>Enter Command Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-extrabold text-slate-950 text-base shadow-lg shadow-cyan-500/30">
                KM
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">MetroMind AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Official Multilingual AI Operating System for Kochi Metro Rail Limited (KMRL). Smart India Hackathon 2026 Submission.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Corridor: Aluva ➔ Petta (25 km • 22 Stations)
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-bold text-white uppercase font-mono tracking-wider">Modules</div>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><button onClick={onLaunchWorkspace} className="hover:text-cyan-300 transition-colors">Malayalam Deep OCR</button></li>
              <li><button onClick={onLaunchWorkspace} className="hover:text-cyan-300 transition-colors">PO 3-Way Matcher</button></li>
              <li><button onClick={onLaunchWorkspace} className="hover:text-cyan-300 transition-colors">Monsoon ATC Sentinel</button></li>
              <li><button onClick={onLaunchWorkspace} className="hover:text-cyan-300 transition-colors">Muttom Depot Routing</button></li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-bold text-white uppercase font-mono tracking-wider">Compliance & Security</div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Compliant with CMRS Safety Directives, ISO 27001 Security Standards, and Indian Railways Telemetry Protocols.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Immutable Ledger Active</span>
            </div>
          </div>
        </div>

        {/* Massive Kinetic Typography Footer Text */}
        <div className="pt-8 border-t border-slate-900 text-center overflow-hidden select-none pointer-events-none">
          <div className="text-[12vw] font-black leading-none tracking-tighter text-slate-900/60 uppercase hover:text-slate-800 transition-colors">
            METROMIND
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-500 pt-4 border-t border-slate-900">
          <div>© 2026 Kochi Metro Rail Limited (KMRL) • All Rights Reserved</div>
          <div>Smart India Hackathon Flagship Project</div>
        </div>
      </div>
    </footer>
  );
}
