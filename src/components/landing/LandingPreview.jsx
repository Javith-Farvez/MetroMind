import React from 'react';
import { Layers, CheckCircle2, FileText } from 'lucide-react';

export default function LandingPreview({ onLaunchWorkspace }) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Daily Productivity
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            High-density workspace layout with instant search, spatial OCR reader, and Kanban boards.
          </p>
        </div>

        {/* Browser Mockup Window Showcase */}
        <div
          onClick={onLaunchWorkspace}
          className="rounded-3xl border border-slate-200 bg-slate-900 shadow-2xl overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform max-w-5xl mx-auto"
        >
          {/* Top Window Bar */}
          <div className="px-4 py-3 bg-slate-800 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-[11px] font-mono text-slate-400">metroflow.kochimetro.org/workspace</span>
            </div>
            <span className="text-[10px] font-mono bg-blue-600 text-white px-2 py-0.5 rounded font-bold">
              Click to Open Interactive Demo
            </span>
          </div>

          {/* Interior UI Mockup Content */}
          <div className="p-6 text-slate-100 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="font-extrabold text-sm text-white">KMRL Executive Operations Dashboard</div>
                <div className="text-[10px] text-slate-400">Daily Ingestion: 1,248 Docs • SLA Efficiency: 98%</div>
              </div>
              <div className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                100% CMRS Compliant
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                <div className="text-slate-400 text-[10px]">Document Ingestion</div>
                <div className="font-bold text-white">1,248 Digitized</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                <div className="text-slate-400 text-[10px]">3-Way PO Match</div>
                <div className="font-bold text-emerald-400">₹16.43 Cr Approved</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                <div className="text-slate-400 text-[10px]">Approval Turnaround</div>
                <div className="font-bold text-cyan-400">4.2 min SLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
