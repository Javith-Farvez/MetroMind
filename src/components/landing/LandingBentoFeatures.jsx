import React from 'react';
import { FileText, CheckSquare, Users, BookOpen, ShieldCheck, Search, BarChart3, Lock, Sparkles } from 'lucide-react';

export default function LandingBentoFeatures({ onLaunchWorkspace }) {
  const FEATURES = [
    {
      title: "Smart Document Workspace",
      desc: "Organize KMRL engineering reports, scanned PDFs, WhatsApp media, and invoices with spatial OCR extractions.",
      icon: FileText,
      color: "from-blue-600 to-cyan-500",
      span: "lg:col-span-2"
    },
    {
      title: "3-Way Invoice Approvals",
      desc: "Automated line-item match between BHEL tax invoices, Purchase Orders, and GRN receipts.",
      icon: CheckSquare,
      color: "from-emerald-500 to-teal-400",
      span: "lg:col-span-1"
    },
    {
      title: "Department Collaboration",
      desc: "Connect O&M, Finance, Safety, HR, Legal, and Procurement in one unified operational space.",
      icon: Users,
      color: "from-purple-500 to-indigo-400",
      span: "lg:col-span-1"
    },
    {
      title: "Knowledge Base & SOP Wiki",
      desc: "Centralized policy repository for station controllers, engineers, and executive directors.",
      icon: BookOpen,
      color: "from-orange-500 to-amber-400",
      span: "lg:col-span-2"
    },
    {
      title: "CMRS Compliance Tracking",
      desc: "Monitors monsoon rainfall speed restrictions and safety commission guidelines.",
      icon: ShieldCheck,
      color: "from-rose-500 to-pink-500",
      span: "lg:col-span-1"
    },
    {
      title: "Universal Ctrl+K Search",
      desc: "Instantly query across documents, contracts, employees, stations, and policies.",
      icon: Search,
      color: "from-cyan-500 to-blue-600",
      span: "lg:col-span-1"
    },
    {
      title: "Executive Analytics",
      desc: "Real-time SLA performance curves and automated daily/weekly operational reports.",
      icon: BarChart3,
      color: "from-yellow-400 to-amber-500",
      span: "lg:col-span-1"
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Enterprise Productivity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Everything Kochi Metro Needs to Work Smarter
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Replace fragmented email threads, paper filing, and manual spreadsheets with an integrated decision workspace.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                onClick={onLaunchWorkspace}
                className={`saas-card p-6 cursor-pointer flex flex-col justify-between space-y-4 ${f.span}`}
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} p-3 text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{f.desc}</p>
                </div>

                <div className="pt-2 text-xs font-bold text-blue-600 flex items-center gap-1">
                  <span>Explore Feature</span> →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
