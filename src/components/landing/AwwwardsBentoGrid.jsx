import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, FileText, CheckCircle2, ShieldCheck, Zap, AlertTriangle, Layers, Cpu } from 'lucide-react';

export default function AwwwardsBentoGrid({ onLaunchWorkspace }) {
  // Mouse 3D Tilt calculation state
  const [tilt, setTilt] = useState({ cardId: null, x: 0, y: 0 });

  const handleMouseMove = (e, cardId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ cardId, x: y / 12, y: -x / 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ cardId: null, x: 0, y: 0 });
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            ENGINEERING EXCELLENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for <span className="gradient-text-purple">KMRL Operational Reality</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            From low-resolution Malayalam field dispatches to multi-crore traction transformer invoices, MetroMind AI automates every step with enterprise rigor.
          </p>
        </div>

        {/* Asymmetrical Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Multilingual Malayalam OCR Scanner (7 cols) */}
          <div
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: tilt.cardId === 1 ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
              transition: tilt.cardId === 1 ? 'none' : 'transform 0.5s ease-out'
            }}
            data-cursor="OCR"
            className="md:col-span-7 glass-panel-dark p-8 rounded-3xl border border-cyan-500/20 relative overflow-hidden group hover:border-cyan-500/50 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Dual-Engine Tesseract + LayoutLM
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                Native Malayalam & English Deep OCR
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Trained specifically on Kerala transit terminology, station names, and Malayalam administrative phrasing. Converts low-contrast WhatsApp dispatches into structured JSON data in 0.3s.
              </p>
            </div>

            {/* Interactive Live Malayalam Snippet Card */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                <span>OCR LIVE DETECTION</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 99.4% Match
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                "മഴക്കാല വേഗത 50 km/h ആയി പരിമിതപ്പെടുത്തണം — Muttom Bay 3 Catenary Check"
              </div>

              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Lang: Malayalam (99.1%)</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Route: Speed Restriction ATC</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Dept: O&M Operations</span>
              </div>
            </div>
          </div>

          {/* Card 2: BHEL Invoice 3-Way Matcher (5 cols) */}
          <div
            onMouseMove={(e) => handleMouseMove(e, 2)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: tilt.cardId === 2 ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
              transition: tilt.cardId === 2 ? 'none' : 'transform 0.5s ease-out'
            }}
            data-cursor="Finance"
            className="md:col-span-5 glass-panel-dark p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/50 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  PO Matcher Engine
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Financial PO 3-Way Matcher
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prevents overbilling by cross-referencing vendor tax invoices line-by-line against SAP Purchase Orders & Goods Received Notes (GRN).
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Invoice #BHEL-094</span>
                <span className="text-emerald-400 font-bold">100% Validated</span>
              </div>
              <div className="text-slate-200 font-extrabold text-sm">₹164,315,000</div>
              <div className="text-[10px] text-slate-400">2x 33kV Traction Transformers</div>
            </div>
          </div>

          {/* Card 3: Muttom Depot Brake Pad Order (5 cols) */}
          <div
            onMouseMove={(e) => handleMouseMove(e, 3)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: tilt.cardId === 3 ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
              transition: tilt.cardId === 3 ? 'none' : 'transform 0.5s ease-out'
            }}
            data-cursor="Depot"
            className="md:col-span-5 glass-panel-dark p-8 rounded-3xl border border-purple-500/20 relative overflow-hidden group hover:border-purple-500/50 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Depot Workflow
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                Muttom Depot Work Order Routing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extracts bogie inspection notes and instantly creates work orders for bay technicians without human delay.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div>
                <div className="text-purple-300 font-bold">Brake Pad Bay-3</div>
                <div className="text-[10px] text-slate-400">Target: Bogie #KM-204</div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40">
                Pushed to Tech
              </span>
            </div>
          </div>

          {/* Card 4: Monsoon Safety Sentinel (7 cols) */}
          <div
            onMouseMove={(e) => handleMouseMove(e, 4)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: tilt.cardId === 4 ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
              transition: tilt.cardId === 4 ? 'none' : 'transform 0.5s ease-out'
            }}
            data-cursor="Safety"
            className="md:col-span-7 glass-panel-dark p-8 rounded-3xl border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/50 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ATC Safety Sentinel
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Monsoon Rain Safety Directive Override
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Monitors regional weather advisories and Kerala State Disaster Management circulars. Auto-updates Automatic Train Control (ATC) maximum viaduct speed limits.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                <div>
                  <span className="font-bold text-slate-200">VIADUCT SPEED OVERRIDE:</span>
                  <div className="text-[10px] text-slate-400">Rainfall &gt; 45mm/hr detected at Edapally</div>
                </div>
              </div>
              <span className="text-amber-400 font-extrabold text-base">50 km/h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
