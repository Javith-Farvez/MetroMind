import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight, ChevronLeft, CheckCircle2, Play, Compass, ArrowRight } from 'lucide-react';

export default function JudgeDemoModal({ isOpen, onClose, onNavigateTab, onSelectDocument, documents }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const DEMO_STEPS = [
    {
      num: 1,
      title: "1. Upload Real Document",
      tab: "documents",
      docId: "KMRL-ENG-2026-8812",
      description: "Demonstrates real document ingestion (PDF, scan, email attachment) into KMRL Repository.",
      actionLabel: "Jump to Document Workspace"
    },
    {
      num: 2,
      title: "2. AI Multilingual OCR Processing",
      tab: "viewer",
      docId: "KMRL-ENG-2026-8812",
      description: "Dual Tesseract + LayoutLM OCR converts English and Malayalam technical reports into spatial tokens.",
      actionLabel: "View OCR Bounding Boxes"
    },
    {
      num: 3,
      title: "3. AI Summarization",
      tab: "viewer",
      docId: "KMRL-ENG-2026-8812",
      description: "Synthesizes concise executive summaries for GM and Department Leads.",
      actionLabel: "View AI Summary"
    },
    {
      num: 4,
      title: "4. Risk & Urgency Detection",
      tab: "compliance",
      docId: "KMRL-ENG-2026-8812",
      description: "Flags accelerated bogie friction pad wear (3.2mm vs 6.0mm safety threshold) as High Urgency.",
      actionLabel: "View Risk Center"
    },
    {
      num: 5,
      title: "5. Statutory Deadline Detection",
      tab: "compliance",
      docId: "KMRL-FIN-2026-3042",
      description: "Extracts net 30 payment due date (03-Sep-2026) for BHEL 33kV transformers invoice.",
      actionLabel: "View Expiry Alerts"
    },
    {
      num: 6,
      title: "6. Automatic Department Routing",
      tab: "workflows",
      docId: "KMRL-ENG-2026-8812",
      description: "Automatically routes brake audit to Operations & Maintenance and PO to Finance.",
      actionLabel: "View Routing Table"
    },
    {
      num: 7,
      title: "7. Human Approval Gate",
      tab: "workflows",
      docId: "KMRL-FIN-2026-3042",
      description: "AI recommends releasing ₹16.43 Cr payment based on 0.0% 3-way match. GM approves.",
      actionLabel: "View 3-Way Match Approval"
    },
    {
      num: 8,
      title: "8. Operational Task Creation",
      tab: "workflows",
      docId: "KMRL-ENG-2026-8812",
      description: "Approved recommendation automatically creates Bay-3 overhaul work order for Muttom technicians.",
      actionLabel: "View Task Board"
    },
    {
      num: 9,
      title: "9. Unified Hybrid Search (Ctrl + K)",
      tab: "intelligence",
      docId: "KMRL-ENG-2026-8812",
      description: "RAG hybrid vector search indexes all documents, stations, contracts, and policies instantly.",
      actionLabel: "Open RAG Intelligence"
    },
    {
      num: 10,
      title: "10. Multilingual Query (Malayalam & Hindi RAG)",
      tab: "intelligence",
      docId: "KMRL-SAF-2026-019",
      description: "Execute RAG queries in Malayalam: 'ആലുവ സ്റ്റേഷന്റെ സുരക്ഷാ റിപ്പോർട്ടുകൾ കാണിക്കുക' and Hindi.",
      actionLabel: "Try Malayalam Search"
    },
    {
      num: 11,
      title: "11. Knowledge Relationship Network",
      tab: "knowledge",
      docId: "KMRL-ENG-2026-8812",
      description: "Explores graph relationships: Document ➔ Station ➔ Incident ➔ Maintenance ➔ Engineering ➔ Safety.",
      actionLabel: "Explore Knowledge Graph"
    },
    {
      num: 12,
      title: "12. Immutable SHA-256 Audit Trail",
      tab: "audit",
      docId: "KMRL-ENG-2026-8812",
      description: "Traces complete event lineage: User, Action, Entity, Timestamp, SHA-256 hash.",
      actionLabel: "Inspect Audit Ledger"
    }
  ];

  const step = DEMO_STEPS[currentStep];

  const handleStepAction = () => {
    if (step.docId && documents) {
      const docObj = documents.find(d => d.id === step.docId) || documents[0];
      if (onSelectDocument) onSelectDocument(docObj);
    }
    if (onNavigateTab) onNavigateTab(step.tab);
  };

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-dark p-4 rounded-2xl border border-cyan-500/50 shadow-2xl space-y-3 bg-slate-900/95 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> SIH 2026 Guided Judge Presentation Mode
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 text-xs font-sans">
          <div>
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <span className="font-mono text-cyan-400 font-bold">{step.num}/12</span>
              <span>{step.title}</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">{step.description}</p>
          </div>

          <button
            onClick={handleStepAction}
            className="px-3.5 py-1.5 rounded-xl glow-btn-cyan text-[11px] font-bold shrink-0 shadow-md flex items-center gap-1"
          >
            <span>{step.actionLabel}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(p => Math.max(0, p - 1))}
            className="text-slate-400 hover:text-white disabled:opacity-30 font-bold"
          >
            ← Previous
          </button>

          <div className="flex gap-1">
            {DEMO_STEPS.map((s, i) => (
              <span
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  i === currentStep ? 'bg-cyan-400 scale-125' : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            disabled={currentStep === DEMO_STEPS.length - 1}
            onClick={() => setCurrentStep(p => Math.min(DEMO_STEPS.length - 1, p + 1))}
            className="text-cyan-400 hover:text-cyan-300 disabled:opacity-30 font-bold"
          >
            Next Step →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
