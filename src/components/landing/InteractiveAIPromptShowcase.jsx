import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Send, FileText, ArrowRight, CheckCircle2, Wifi } from 'lucide-react';
import { queryLiveRAG } from '../../services/api';

const PRESET_QUERIES = [
  {
    prompt: "Show brake pad maintenance rules for Muttom Bay 3",
    answer: "Muttom Depot Bay-3 standard operating procedure (SOP #ENG-402) mandates replacing bogie friction pads after 500-km cycles. Work Order #WO-8812 has been auto-routed to Technician K. Menon.",
    citation: "KMRL-Muttom-Maintenance-SOP.pdf (Page 14, Section 3.2)",
    dept: "Operations & Maintenance"
  },
  {
    prompt: "Verify BHEL 33kV transformer invoice #094",
    answer: "Invoice #BHEL-094 for ₹164,315,000 matches 100% against Purchase Order PO-KMRL-2025-7721 and Goods Received Note GRN-4412. Zero discrepancies detected.",
    citation: "BHEL_TaxInvoice_33kV_Transformers.pdf (Page 1)",
    dept: "Finance & Procurement"
  },
  {
    prompt: "What is the monsoon speed restriction for viaducts?",
    answer: "Per Kerala Weather Advisory Circular #SAF-2026-09, when rainfall exceeds 45mm/hr, maximum train operational speed on elevated viaduct sections is limited to 50 km/h.",
    citation: "Monsoon_Safety_Restriction_Circular_മലയാളം.pdf",
    dept: "Safety & ATC Control"
  }
];

export default function InteractiveAIPromptShowcase({ onLaunchWorkspace }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [liveAnswer, setLiveAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const activeQuery = PRESET_QUERIES[selectedIdx];

  useEffect(() => {
    async function executeLiveRAG() {
      setIsLoading(true);
      const res = await queryLiveRAG(activeQuery.prompt);
      if (res && res.answer) {
        setLiveAnswer({
          answer: res.answer,
          citations: res.citations ? res.citations.join(', ') : activeQuery.citation,
          confidence: res.confidence || 99.4
        });
      } else {
        setLiveAnswer(null);
      }
      setIsLoading(false);
    }
    executeLiveRAG();
  }, [selectedIdx]);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            KNOWLEDGE RETRIEVAL (RAG)
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ask <span className="gradient-text-full">MetroMind Anything</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Query thousands of Malayalam and English engineering drawings, invoices, and CMRS directives using natural language.
          </p>
        </div>

        {/* Interactive Query Box */}
        <div className="max-w-4xl mx-auto glass-panel-dark rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-[0_20px_80px_rgba(139,92,246,0.2)] space-y-6">
          {/* Prompt Selector Pills */}
          <div className="flex flex-wrap gap-3">
            {PRESET_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                data-cursor="Ask"
                className={`px-4 py-2 rounded-2xl text-xs font-semibold border transition-all ${
                  selectedIdx === idx
                    ? 'bg-purple-500/20 text-purple-200 border-purple-500/60 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {q.prompt}
              </button>
            ))}
          </div>

          {/* Prompt Input Container */}
          <div className="relative">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
              <Bot className="w-5 h-5 text-purple-400" />
              <input
                type="text"
                readOnly
                value={activeQuery.prompt}
                className="w-full bg-transparent text-slate-100 text-sm focus:outline-none font-medium"
              />
              <button
                onClick={onLaunchWorkspace}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Response Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-white">METROMIND RAG NEURAL ANSWER</span>
                  {liveAnswer && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-emerald-400" /> Live Backend ({liveAnswer.confidence}%)
                    </span>
                  )}
                </div>
                <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                  {activeQuery.dept}
                </span>
              </div>

              <p className="text-slate-200 leading-relaxed font-sans text-sm font-normal">
                {liveAnswer ? liveAnswer.answer : activeQuery.answer}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-cyan-400">
                  <FileText className="w-3.5 h-3.5" />
                  <span>CITATION: {liveAnswer ? liveAnswer.citations : activeQuery.citation}</span>
                </div>
                <button
                  onClick={onLaunchWorkspace}
                  className="text-purple-300 hover:text-purple-200 flex items-center gap-1 font-sans font-bold"
                >
                  <span>Open PDF Citation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
