import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, GitMerge, ShieldCheck, AlertTriangle, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

const MODULES = [
  {
    number: '01',
    title: 'Multilingual Malayalam OCR',
    category: 'Computer Vision & Deep Learning',
    description: 'Recognizes handwritten Malayalam dispatches, distorted WhatsApp low-res scans, and official government circulars with 99.4% precision.',
    badge: '99.4% Multilingual Accuracy',
    icon: Globe,
    accentColor: 'from-cyan-500 to-blue-600',
    borderColor: 'hover:border-cyan-500/50',
    tags: ['Malayalam OCR', 'Tesseract & Vision Transformer', 'Bilingual Entity Stream']
  },
  {
    number: '02',
    title: 'Financial PO 3-Way Matcher',
    category: 'Finance & Procurement Automation',
    description: 'Line-by-line automated verification comparing BHEL and Alstom tax invoices directly against Purchase Orders and Goods Received Notes.',
    badge: 'Zero Discrepancy Assurance',
    icon: ShieldCheck,
    accentColor: 'from-emerald-500 to-teal-600',
    borderColor: 'hover:border-emerald-500/50',
    tags: ['Automated Audit', 'ERP Integration', 'Tax Invoice Parser']
  },
  {
    number: '03',
    title: 'Monsoon ATC Safety Sentinel',
    category: 'Operations & Emergency Override',
    description: 'Monitors real-time rainfall advisories and automatically broadcasts speed limit restriction orders to Automatic Train Control systems.',
    badge: 'Sub-second ATC Broadcast',
    icon: AlertTriangle,
    accentColor: 'from-amber-500 to-orange-600',
    borderColor: 'hover:border-amber-500/50',
    tags: ['Rainfall Sensor Sync', 'ATC Protocol Integration', 'Speed Restriction Alert']
  },
  {
    number: '04',
    title: 'Autonomous Workflow Engine',
    category: 'Cross-Department Automation',
    description: 'Transforms unstructured maintenance notes into prioritized work orders for Bay-3 technicians at Muttom Depot instantly.',
    badge: '12 Depts Connected',
    icon: GitMerge,
    accentColor: 'from-purple-500 to-indigo-600',
    borderColor: 'hover:border-purple-500/50',
    tags: ['Muttom Depot Sync', 'Automated Work Orders', 'Role-based Approvals']
  },
  {
    number: '05',
    title: 'Cryptographic Audit Ledger',
    category: 'Governance & CMRS Compliance',
    description: 'Logs every AI routing decision, confidence score, and user intervention to an immutable ledger for total auditability.',
    badge: 'Immutable Governance',
    icon: FileText,
    accentColor: 'from-pink-500 to-rose-600',
    borderColor: 'hover:border-pink-500/50',
    tags: ['CMRS Directive Enforcement', 'Audit Trail', 'Cryptographic Proof']
  }
];

export default function HorizontalModulesScroll({ onLaunchWorkspace }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);

  return (
    <section ref={containerRef} className="relative h-[300vh] z-10">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Five Pillars of <span className="gradient-text-cyan">Metro Intelligence</span>
            </h2>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            [SCROLL TO EXPLORE PILLARS ➔]
          </div>
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex gap-8 px-4 sm:px-12 w-max">
          {MODULES.map((mod, idx) => {
            const Icon = mod.icon;

            return (
              <div
                key={idx}
                data-cursor="Module"
                className={`w-[85vw] sm:w-[480px] h-[480px] glass-panel-dark p-8 rounded-3xl border border-white/10 ${mod.borderColor} flex flex-col justify-between relative group transition-all duration-300 shadow-2xl`}
              >
                {/* Background Accent Mesh */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br ${mod.accentColor} opacity-10 blur-3xl group-hover:opacity-25 transition-opacity`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-extrabold text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {mod.number}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {mod.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>

                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {mod.category}
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {mod.tags.map((t, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onLaunchWorkspace}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs font-bold transition-all"
                  >
                    <span>Test Module Live</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
