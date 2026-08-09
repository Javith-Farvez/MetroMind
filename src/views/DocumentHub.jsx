import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Search,
  Eye,
  Building2,
  Globe,
  Tag,
  ArrowRight,
  ShieldCheck,
  Zap,
  Check,
  Cpu,
  Bot,
  Network
} from 'lucide-react';

export default function DocumentHub({ documents, selectedDoc, onSelectDocument }) {
  const [activeDocId, setActiveDocId] = useState(selectedDoc?.id || documents[0].id);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showMalayalamTranslation, setShowMalayalamTranslation] = useState(false);

  const currentDoc = documents.find(d => d.id === activeDocId) || documents[0];

  const STAGES = [
    "Upload", "OCR", "LangDetect", "Translation", "Classification",
    "Metadata", "NER", "Knowledge Graph", "Embedding", "AI Summary",
    "Recommendation", "Routing", "Notification"
  ];

  const handleSimulateUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-slate-100 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            13-Stage Document Ingestion & Vision OCR Pipeline
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
              Live Neural Pipeline
            </span>
          </h1>
          <p className="text-xs text-slate-400">Upload scanned PDFs, WhatsApp media, and engineering drawings with spatial bounding boxes & Malayalam translation</p>
        </div>

        <button
          onClick={() => setShowMalayalamTranslation(!showMalayalamTranslation)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            showMalayalamTranslation
              ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30'
              : 'bg-slate-900 text-purple-300 border-purple-500/30 hover:border-purple-400'
          }`}
        >
          <Globe className="w-4 h-4 text-purple-300" />
          <span>{showMalayalamTranslation ? 'Showing Malayalam Script' : 'Toggle Malayalam Parallel View'}</span>
        </button>
      </div>

      {/* 13-Stage Document Pipeline Visualizer Strip */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-blue-400" />
            13-Stage Automated Document Processing Pipeline
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">100% Pipeline Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-13 gap-1.5 text-center">
          {STAGES.map((st, i) => (
            <div
              key={st}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-1 hover:border-blue-500/40 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold flex items-center justify-center border border-blue-500/30">
                {i + 1}
              </div>
              <span className="text-[10px] font-semibold text-slate-300 truncate w-full">{st}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Select Document Presets */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <span className="font-bold text-slate-400 mr-2 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-yellow-400" /> Sample Documents:
        </span>
        {documents.map(d => (
          <button
            key={d.id}
            onClick={() => setActiveDocId(d.id)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              activeDocId === d.id
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {d.id} ({d.category})
          </button>
        ))}
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="glass-panel p-6 rounded-2xl border border-dashed border-blue-500/40 bg-slate-950/40 text-center relative overflow-hidden group">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-cursor z-10"
          onChange={handleSimulateUpload}
        />
        <div className="space-y-3 pointer-events-none">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-200">
              {isUploading ? 'Executing 13-Stage Pipeline Ingestion...' : uploadSuccess ? '✓ Document Ingested & Indexed in Knowledge Graph!' : 'Drag & Drop KMRL Document / Engineering PDF'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Supports PDF, Scanned TIFF, WhatsApp JPG, DWG, English & Malayalam Text</p>
          </div>
        </div>
      </div>

      {/* Dual Pane Spatial OCR Reader & Metadata Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Pane: Document Scan with Spatial Bounding Box Tokens */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <h3 className="font-bold text-sm text-slate-100">Document Scan & Bounding Box Spatial Grid</h3>
            </div>
            <span className="font-mono text-emerald-400 text-xs font-bold">{currentDoc.confidence}% OCR Accuracy</span>
          </div>

          <div className="relative w-full min-h-[420px] rounded-xl bg-slate-950 border border-slate-800 p-6 font-mono text-xs text-slate-300 shadow-inner space-y-4">
            <div className="scanline-effect" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-500">
              <span>DOCUMENT ID: {currentDoc.id}</span>
              <span>LANG: {showMalayalamTranslation ? 'Malayalam (translated)' : currentDoc.language}</span>
            </div>

            <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
              {showMalayalamTranslation
                ? `കൊച്ചി മെട്രോ റയിൽ ലിമിറ്റഡ് (KMRL) - മുട്ടം ഡിപ്പോ റിപ്പോർട്ട്: ട്രെയിൻ സെറ്റ് #07 ഫ്രണ്ട് ബോഗി ബ്രേക്ക് പാഡ് തേയ്മാനം 3.2 മില്ലിമീറ്റർ ആയി കുറഞ്ഞു. ഉടൻ മാറ്റണം.`
                : currentDoc.ocrText}
            </p>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Extracted Spatial Bounding Tokens:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentDoc.boundingBoxes.map(b => (
                  <span
                    key={b.id}
                    className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] font-mono flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <strong>{b.label}:</strong> "{b.text}"
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: AI Key-Value Extraction & Auto Routing */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Automated Intelligence & Department Routing
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-semibold">{currentDoc.status}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="text-[10px] text-slate-400">Assigned Department</div>
              <div className="font-bold text-slate-100">{currentDoc.department}</div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
              {currentDoc.urgency} Urgency
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Structured Key-Value Extractions
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden divide-y divide-slate-800 text-xs">
              {Object.entries(currentDoc.extractedEntities).map(([key, val]) => (
                <div key={key} className="p-2.5 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">{key}</span>
                  <span className="font-mono text-blue-300 font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-300">Recommended Department Actions</div>
            <div className="space-y-2">
              {currentDoc.suggestedActions.map(act => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-200 font-medium">{act.action}</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                    {act.targetDept}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
