import React, { useState } from 'react';
import {
  Cpu,
  Globe,
  Sparkles,
  Eye,
  Building2,
  Zap,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function NeuralInsightEngine({ documents }) {
  const [selectedDocId, setSelectedDocId] = useState(documents[0].id);
  const [showMalayalam, setShowMalayalam] = useState(false);

  const doc = documents.find(d => d.id === selectedDocId) || documents[0];

  return (
    <div className="space-y-6 text-slate-100 pb-16">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400 animate-spin" />
            <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              Neural Insight Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400">Rotating Neural Core document parser, spatial vision OCR, and Malayalam dual translation</p>
        </div>

        <button
          onClick={() => setShowMalayalam(!showMalayalam)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            showMalayalam
              ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30'
              : 'bg-slate-900 text-purple-300 border-purple-500/30 hover:border-purple-400'
          }`}
        >
          <Globe className="w-4 h-4 text-purple-300" />
          <span>{showMalayalam ? 'Showing Malayalam Script' : 'Toggle Malayalam View'}</span>
        </button>
      </div>

      {/* Select Document Chips */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
        <span className="font-bold text-slate-400 mr-2 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-yellow-400" /> Select Document:
        </span>
        {documents.map(d => (
          <button
            key={d.id}
            onClick={() => setSelectedDocId(d.id)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              selectedDocId === d.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {d.id} ({d.category})
          </button>
        ))}
      </div>

      {/* Split View: Glowing AI Core & Dual Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Glowing Neural AI Core Sphere Card (Left 1 col) */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/40 bg-slate-950/80 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-4">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Active Neural Core Processing
          </div>

          {/* Glowing Animated AI Core Orb */}
          <div className="relative w-36 h-36 flex items-center justify-center my-4">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping" />
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 ai-core-glowing flex items-center justify-center shadow-2xl shadow-cyan-500/50">
              <Cpu className="w-12 h-12 text-slate-950 animate-pulse" />
            </div>
          </div>

          <div className="space-y-1 font-mono text-xs w-full">
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span className="text-slate-400">OCR Confidence:</span>
              <span className="text-emerald-400 font-bold">{doc.confidence}%</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span className="text-slate-400">Urgency Level:</span>
              <span className="text-red-400 font-bold">{doc.urgency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Target Route:</span>
              <span className="text-cyan-300 font-bold">{doc.department}</span>
            </div>
          </div>
        </div>

        {/* Spatial OCR Text Reader & Extracted Extractions (Right 2 cols) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-slate-100">Document Vision Reader & Bounding Box Layer</h3>
            </div>
            <span className="font-mono text-slate-400">{doc.source}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed space-y-3">
            <div className="text-[10px] text-slate-400 border-b border-slate-800 pb-2">
              PROCESSED TEXT ({showMalayalam ? 'Malayalam Dialect' : 'English Original'}):
            </div>
            <p>
              {showMalayalam
                ? `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് - മുട്ടം ഡിപ്പോ ആഡിറ്റ് റിപ്പോർട്ട് #8812: ബ്രേക്ക് പാഡ് അടിയന്തിരമായി മാറ്റേണ്ടതുണ്ട്.`
                : doc.ocrText}
            </p>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Spatial OCR Tokens:</div>
              <div className="flex flex-wrap gap-2">
                {doc.boundingBoxes.map(b => (
                  <span key={b.id} className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px]">
                    <strong>{b.label}:</strong> "{b.text}"
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
