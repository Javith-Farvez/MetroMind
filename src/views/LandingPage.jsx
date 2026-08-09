import React, { useState } from 'react';
import MetroNetworkCanvas from '../components/common/MetroNetworkCanvas';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  FileText,
  Bot,
  GitMerge,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Globe,
  Award,
  BarChart3,
  Search,
  Check,
  AlertTriangle,
  Play
} from 'lucide-react';

export default function LandingPage({ onLaunchDashboard, onLaunchDocHub, onLaunchCopilot, onLaunchSihMode }) {
  const [selectedDemoDoc, setSelectedDemoDoc] = useState(0);

  const DEMO_SAMPLES = [
    {
      title: "Muttom Brake Pad Inspection (Engineering)",
      dept: "Operations & Maintenance",
      lang: "English",
      snippet: "Friction Brake Pads: Front bogie pad replacement mandatory prior to next 500-km cycle.",
      route: "Automated Work Order #WO-8812 -> Muttom Bay-3"
    },
    {
      title: "BHEL Substation Tax Invoice #094 (Finance)",
      dept: "Finance & Procurement",
      lang: "English",
      snippet: "Total Amount: ₹164,315,000 for 2x 33kV Dry-Type Traction Transformers.",
      route: "Matched with PO-KMRL-2025-7721 & GRN-4412 (100% Match)"
    },
    {
      title: "Monsoon Safety Restriction (മലയാളം & English)",
      dept: "Safety & Security",
      lang: "Malayalam + English",
      snippet: "മഴക്കാല വേഗത 50 km/h ആയി പരിമിതപ്പെടുത്തണം (Speed max 50km/h on viaduct).",
      route: "Pushed speed limit to Automatic Train Control (ATC)"
    }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 space-y-12 pb-16">
      {/* SIH Hackathon Top Pitch Banner */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-slate-900 border border-purple-500/30 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <Award className="w-5 h-5 text-yellow-400 animate-bounce" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-purple-200">Smart India Hackathon 2026 Submission</span>
            <p className="text-xs text-slate-300">Problem Statement: AI Document Intelligence Operating System for Kochi Metro Rail Limited (KMRL)</p>
          </div>
        </div>
        <button
          onClick={onLaunchSihMode}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/30 transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Judge Presentation Walkthrough</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative pt-6 pb-4 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold backdrop-blur-md shadow-lg shadow-cyan-500/10 animate-fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Next-Gen Enterprise AI Operating System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Transforming KMRL Document Chaos into{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Automated Intelligence
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Kochi Metro processes thousands of engineering reports, BHEL invoices, safety circulars, and Malayalam documents daily. MetroMind AI ingests, OCR extracts, classifies, and executes departmental workflows instantly.
        </p>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onLaunchDashboard}
            className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onLaunchDocHub}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-slate-200 hover:text-cyan-300 border-slate-700 hover:border-cyan-500/40 text-sm font-semibold transition-all"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Try Document Ingestion Studio</span>
          </button>
        </div>

        {/* Enterprise Highlights Pill Grid */}
        <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            99.4% Multilingual Malayalam/English OCR
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            85% Reduction in Department SLA Time
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            Zero Discrepancy Invoice Match
          </span>
        </div>
      </div>

      {/* Interactive Metro Network Visualization Hero Card */}
      <MetroNetworkCanvas />

      {/* Interactive Live Ingestion Simulator Widget */}
      <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Live Interactive Ingestion Pipeline Demo
            </h3>
            <p className="text-xs text-slate-400">Select a real KMRL document sample to test automated extraction & routing</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Status: Engine Online (0.4s Response)
          </span>
        </div>

        {/* Demo Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DEMO_SAMPLES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDemoDoc(idx)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                selectedDemoDoc === idx
                  ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-slate-200 truncate">{sample.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{sample.dept}</span>
                <span className="text-[10px] text-cyan-400 font-mono">{sample.lang}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Demo Execution Result Card */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>OCR EXTRACTION & ENTITY STREAM</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <Check className="w-3.5 h-3.5" /> 99.4% Confidence
            </span>
          </div>

          <div className="space-y-1 text-slate-300">
            <div><span className="text-slate-500">Document Text:</span> "{DEMO_SAMPLES[selectedDemoDoc].snippet}"</div>
            <div><span className="text-slate-500">Extracted Action Route:</span> <span className="text-cyan-300 font-semibold">{DEMO_SAMPLES[selectedDemoDoc].route}</span></div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onLaunchDocHub}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-sans font-semibold transition-colors"
            >
              Open in Full Interactive OCR Reader →
            </button>
          </div>
        </div>
      </div>

      {/* Enterprise Capabilities Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Built for KMRL’s Multilingual Enterprise Reality</h2>
          <p className="text-xs text-slate-400">Six core pillars powering India's most advanced metro document operating system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100">Malayalam & English Native OCR</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom trained deep-learning vision models to recognize handwritten field dispatches, Malayalam HR circulars, and low-res WhatsApp scans.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <GitMerge className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100">Smart Departmental Routing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-categorizes documents into O&M, Finance, Safety, HR, Legal, and Executive queues with zero manual sorting latency.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100">RAG Knowledge Graph</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Query KMRL documents in natural English or Malayalam. Instant citations linked directly to underlying PDFs and engineering drawings.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100">Financial PO 3-Way Match</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compares BHEL/Alstom vendor invoices line-by-line against Purchase Orders and Goods Received Notes to prevent overbilling.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-red-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100">Monsoon Safety Sentinel</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monitors rainfall circulars and automatically broadcasts speed limit overrides to Automatic Train Control (ATC) systems.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-yellow-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100">Immutable Audit Trail</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every AI routing decision, confidence score, and document access is logged to a cryptographic audit ledger for complete governance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
