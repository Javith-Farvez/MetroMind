import React from 'react';
import { UploadCloud, FileSearch, CheckSquare, UserCheck, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LandingWorkflow({ onLaunchWorkspace }) {
  const STEPS = [
    { title: "1. Upload", desc: "PDFs, TIFFs, WhatsApp dispatches", icon: UploadCloud },
    { title: "2. Review", desc: "Vision OCR & Malayalam translation", icon: FileSearch },
    { title: "3. Approve", desc: "Multi-tier 3-way PO invoice match", icon: CheckSquare },
    { title: "4. Assign", desc: "Roster task routing & notifications", icon: UserCheck },
    { title: "5. Track", desc: "SLA telemetry & compliance radar", icon: Activity },
    { title: "6. Complete", desc: "SHA-256 encrypted audit logging", icon: CheckCircle2 }
  ];

  return (
    <section id="workflow" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Seamless Workflow Execution Line
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            From raw document ingestion to complete audit closure in 6 clear stages.
          </p>
        </div>

        {/* Workflow Line Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                onClick={onLaunchWorkspace}
                className="p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-slate-900">{s.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
