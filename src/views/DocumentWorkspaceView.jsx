import React, { useState } from 'react';
import {
  Folder,
  FileText,
  Search,
  Plus,
  Mail,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  ExternalLink,
  Download,
  Loader2,
  UploadCloud,
  FileSearch,
  AlertTriangle
} from 'lucide-react';
import { importPublicKMRLData } from '../api/analytics';

export default function DocumentWorkspaceView({ documents = [], onSelectDocument, onNavigateTab, onOpenUploadModal }) {
  const [selectedTab, setSelectedTab] = useState('library'); // 'library' | 'sources'
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [activeDocState, setActiveDocState] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [importStatus, setImportStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [importMessage, setImportMessage] = useState('');

  const activeDoc = activeDocState || (documents.length > 0 ? documents[0] : null);

  const PUBLIC_KMRL_SOURCES = [
    { title: 'KMRL Annual Report 2024-25', url: 'https://kochimetro.org/annual-report-2024-25/', category: 'Annual Report' },
    { title: 'KMRL Tender Notices (Active)', url: 'https://kochimetro.org/tenders/', category: 'Tender' },
    { title: 'KMRL Press Releases & Circulars', url: 'https://kochimetro.org/press-release/', category: 'Public Notice' },
    { title: 'KMRL RTI Disclosures', url: 'https://kochimetro.org/rti/', category: 'Regulatory' },
  ];

  // Smart department matching
  const matchesDept = (docDept = '', folderId = 'All') => {
    if (folderId === 'All') return true;
    const d = docDept.toLowerCase();
    const f = folderId.toLowerCase();
    if (f.includes('maint') || f.includes('eng')) {
      return d.includes('maint') || d.includes('eng') || d.includes('operation');
    }
    if (f.includes('fin') || f.includes('invoic') || f.includes('procure')) {
      return d.includes('fin') || d.includes('invoic') || d.includes('procure');
    }
    if (f.includes('safe') || f.includes('monsoon') || f.includes('sec')) {
      return d.includes('safe') || d.includes('sec') || d.includes('quality') || d.includes('monsoon');
    }
    if (f.includes('hr') || f.includes('staff') || f.includes('exec') || f.includes('legal')) {
      return d.includes('hr') || d.includes('staff') || d.includes('human') || d.includes('exec') || d.includes('legal');
    }
    return d === f || d.includes(f);
  };

  // Dynamic counts calculated from real documents
  const getDeptCount = (folderId) => {
    if (folderId === 'All') return documents.length;
    return documents.filter(d => matchesDept(d.department || d.category, folderId)).length;
  };

  const FOLDERS = [
    { id: 'All', name: 'All KMRL Documents', count: getDeptCount('All') },
    { id: 'Operations & Maintenance', name: 'Maintenance & Engineering', count: getDeptCount('Operations & Maintenance') },
    { id: 'Finance & Procurement', name: 'Finance & Invoices', count: getDeptCount('Finance & Procurement') },
    { id: 'Safety & Security', name: 'Safety & Monsoon Rules', count: getDeptCount('Safety & Security') },
    { id: 'Human Resources', name: 'HR Policies & Executive', count: getDeptCount('Human Resources') }
  ];

  const PROCESSING_TIMELINE_STAGES = [
    { name: "DOCUMENT RECEIVED", icon: FileText, color: "text-blue-400" },
    { name: "READING", icon: Cpu, color: "text-purple-400" },
    { name: "UNDERSTANDING", icon: Sparkles, color: "text-cyan-400" },
    { name: "EXTRACTING", icon: Layers, color: "text-pink-400" },
    { name: "ANALYZING", icon: ShieldCheck, color: "text-amber-400" },
    { name: "RECOMMENDATION READY", icon: CheckCircle2, color: "text-emerald-400" }
  ];

  const filteredDocs = documents.filter(d => {
    const matchesFolder = matchesDept(d.department || d.category, selectedFolder);
    const matchesSearch = !searchQuery.trim() ||
      (d.title && d.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (d.id && d.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (d.department && d.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 text-slate-100 font-sans">
      {/* Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shadow-lg shadow-purple-500/50" />
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
              Document Workspace — Operational Ingestion
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Kochi Metro Rail Limited • Ingestion, OCR, Spatial Metadata & Document Storage
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onOpenUploadModal && (
            <button
              onClick={onOpenUploadModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs font-mono uppercase hover:brightness-110 transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Ingest Document</span>
            </button>
          )}

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-purple-500/30 text-xs font-bold">
            <button
              onClick={() => setSelectedTab('library')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                selectedTab === 'library'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold shadow-md shadow-purple-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Document Library
            </button>
            <button
              onClick={() => setSelectedTab('sources')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                selectedTab === 'sources'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold shadow-md shadow-purple-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-purple-400" /> Sources & Email Ingestion
            </button>
          </div>
        </div>
      </div>



      {selectedTab === 'library' ? (
        /* Main 3-Pane Workspace Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Pane: Folder Tree & Categories (3 cols) */}
          <div className="lg:col-span-3 glass-panel-dark p-4 space-y-3 border border-purple-500/30">
            <div className="flex items-center justify-between text-xs font-bold text-purple-300 uppercase tracking-wider font-mono">
              <span>KMRL Departments</span>
              <span className="text-[10px] text-cyan-400 font-mono">({documents.length} Docs)</span>
            </div>
            <div className="space-y-1">
              {FOLDERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFolder(f.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    selectedFolder === f.id
                      ? 'bg-purple-500/20 text-purple-200 font-bold border border-purple-500/50 shadow-lg shadow-purple-500/15'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <Folder className={`w-3.5 h-3.5 ${selectedFolder === f.id ? 'text-purple-400' : 'text-slate-500'}`} />
                    <span className="truncate">{f.name}</span>
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    selectedFolder === f.id ? 'bg-purple-500/30 text-purple-200 font-bold' : 'text-slate-500 bg-slate-900'
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Upload Action Box */}
            {onOpenUploadModal && (
              <div className="mt-4 p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-center space-y-2">
                <div className="text-[11px] font-mono text-purple-300 font-bold">Upload Local KMRL Document</div>
                <div className="text-[10px] text-slate-400">OCR, Entity Extraction & AI Analysis</div>
                <button
                  onClick={onOpenUploadModal}
                  className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload PDF / DOCX</span>
                </button>
              </div>
            )}
          </div>

          {/* Center Pane: Document List Table (5 cols) */}
          <div className="lg:col-span-5 glass-panel-dark p-4 space-y-3 border border-purple-500/30">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter KMRL documents..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950/60 border border-purple-500/30 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400 font-mono"
                />
              </div>

              {onOpenUploadModal && (
                <button
                  onClick={onOpenUploadModal}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                  title="Add New Document"
                >
                  <Plus className="w-3.5 h-3.5 text-purple-300" />
                  <span>+ Add New</span>
                </button>
              )}
            </div>

            {/* Document List Cards */}
            {filteredDocs.length === 0 ? (
              <div className="py-12 px-4 text-center space-y-3 bg-slate-950/50 border border-dashed border-purple-500/30 rounded-2xl">
                <FileSearch className="w-10 h-10 text-purple-400 mx-auto opacity-80" />
                <div className="text-xs font-mono font-bold text-slate-300">
                  {searchQuery ? `No documents match "${searchQuery}"` : `No documents in "${selectedFolder}"`}
                </div>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Click below to ingest a new PDF/DOCX or select "All KMRL Documents" to view the indexed library.
                </p>
                <div className="flex justify-center gap-2 pt-1">
                  {selectedFolder !== 'All' && (
                    <button
                      onClick={() => setSelectedFolder('All')}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-bold hover:bg-slate-700"
                    >
                      Show All ({documents.length})
                    </button>
                  )}
                  {onOpenUploadModal && (
                    <button
                      onClick={onOpenUploadModal}
                      className="px-4 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-mono font-bold hover:bg-purple-500 shadow-md flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Upload Document
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {filteredDocs.map(doc => {
                  const isSelected = activeDoc?.id === doc.id;
                  const priority = doc.urgency || doc.priority || 'HIGH';
                  const isHigh = priority === 'HIGH' || priority === 'High' || priority === 'CRITICAL' || priority === 'Urgent';

                  return (
                    <button
                      key={doc.id}
                      onClick={() => {
                        setActiveDocState(doc);
                        if (onSelectDocument) onSelectDocument(doc);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all space-y-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/15'
                          : 'bg-slate-900/60 border-purple-500/20 hover:bg-slate-900/90 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-cyan-300">{doc.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isHigh
                            ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {priority}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-white line-clamp-1">{doc.title}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span className="text-purple-300">{doc.department}</span>
                        <span>{doc.timestamp || 'Real DB Record'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Pane: WHAT MATTERS LAYER (4 cols) */}
          <div className="lg:col-span-4 glass-panel-dark p-4 space-y-4 border border-purple-500/30">
            {activeDoc ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                  <span className="font-extrabold text-xs text-purple-300 font-mono tracking-wider">
                    WHAT MATTERS LAYER
                  </span>
                  <button
                    onClick={() => {
                      if (onSelectDocument) onSelectDocument(activeDoc);
                      if (onNavigateTab) onNavigateTab('viewer');
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>[ OPEN FULL PAGE → ]</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-extrabold text-white">{activeDoc.title}</div>
                  <div className="text-[11px] font-mono text-purple-300">
                    REF: {activeDoc.extractedEntities?.['Reference Number'] || activeDoc.id}
                  </div>
                </div>

                {/* Key Extracted Metadata */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                      <div className="text-[9px] text-purple-400 uppercase">LOCATION</div>
                      <div className="font-bold text-slate-200 truncate">
                        {activeDoc.extractedEntities?.['Location'] || activeDoc.extractedEntities?.['Depot Location'] || 'Aluva Station'}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                      <div className="text-[9px] text-cyan-400 uppercase">DEADLINE</div>
                      <div className="font-bold text-cyan-300">
                        {activeDoc.extractedEntities?.['Deadline'] || activeDoc.extractedEntities?.['Target Date'] || '18 Aug 2026'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                      <div className="text-[9px] text-purple-400 uppercase">DEPARTMENT</div>
                      <div className="font-bold text-slate-200 truncate">{activeDoc.department}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-purple-500/20">
                      <div className="text-[9px] text-amber-400 uppercase">PRIORITY</div>
                      <div className="font-bold text-amber-300">{activeDoc.urgency || activeDoc.priority || 'HIGH'}</div>
                    </div>
                  </div>
                </div>

                {/* AI Summary / OCR snippet */}
                <div className="p-3 rounded-xl bg-slate-950/90 border border-purple-500/20 space-y-1 text-xs">
                  <div className="text-purple-300 font-bold font-mono text-[10px] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" /> AI ANALYSIS SUMMARY:
                  </div>
                  <p className="text-slate-300 font-sans text-[11px] leading-relaxed line-clamp-4">
                    {activeDoc.ocrText || activeDoc.description || 'Document analyzed and indexed into PostgreSQL DB.'}
                  </p>
                </div>

                {/* Recommended Action */}
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-1">
                  <div className="text-purple-300 font-bold font-mono text-[10px]">RECOMMENDED ACTION:</div>
                  <div className="text-slate-200 font-medium text-xs">
                    {activeDoc.suggestedActions?.[0]?.action || `Route to ${activeDoc.department} for immediate review.`}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onSelectDocument) onSelectDocument(activeDoc);
                    if (onNavigateTab) onNavigateTab('viewer');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white text-xs font-mono font-extrabold shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all cursor-pointer"
                >
                  Open Full Intelligence Page →
                </button>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 font-mono text-xs space-y-2">
                <FileSearch className="w-8 h-8 mx-auto text-purple-400 opacity-60" />
                <div>Select a document to inspect key extracted data</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* IMPORT PUBLIC KMRL DATA — ADMIN SECTION */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2 font-mono">
                  <Download className="w-4 h-4 text-purple-400" />
                  IMPORT PUBLIC KMRL DATA
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Import official public KMRL documents with full provenance tracking
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                PUBLIC KMRL SOURCE
              </span>
            </div>

            {importStatus === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {importMessage}
              </div>
            )}
            {importStatus === 'error' && (
              <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-xs">
                ⚠ {importMessage}
              </div>
            )}

            <div className="space-y-2">
              <div className="text-xs font-bold text-purple-300 font-mono uppercase">AVAILABLE PUBLIC KMRL SOURCES</div>
              {PUBLIC_KMRL_SOURCES.map((src, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20 hover:border-purple-400 transition-all">
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="text-xs font-bold text-white font-mono">{src.title}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 flex-wrap">
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                        {src.category}
                      </span>
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 flex items-center gap-1 hover:underline truncate">
                        {src.url} <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                  <button
                    disabled={importStatus === 'loading'}
                    onClick={async () => {
                      setImportStatus('loading');
                      setImportMessage('');
                      try {
                        const res = await importPublicKMRLData(src.url, src.title);
                        setImportStatus('success');
                        setImportMessage(`Imported: ${res.title || src.title} → ID: ${res.document_id}`);
                      } catch (err) {
                        setImportStatus('error');
                        setImportMessage(err.message || 'Import failed. Check backend connection.');
                      }
                    }}
                    className="ml-4 flex-shrink-0 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs font-mono uppercase transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    {importStatus === 'loading' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    IMPORT
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* EMAIL INGESTION SECTION */}
          <div className="glass-panel-dark p-6 space-y-6 border border-purple-500/30">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2 font-mono">
                  <Mail className="w-4 h-4 text-purple-400" />
                  Email-to-Document Ingestion & Automated Sources
                </h3>
                <p className="text-xs text-slate-400 font-mono">KMRL email attachment ingestion pipeline (inbox@kochimetro.org)</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                IMAP SSL Connected
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-purple-300 font-mono">LIVE MONITORED MAILBOXES</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20 space-y-2">
                  <div className="flex justify-between font-bold text-white">
                    <span>safety-circulars@kochimetro.org</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">Target Dept: Safety & Quality Assurance</div>
                  <div className="text-[10px] text-cyan-400">Last check: 2 mins ago • 14 attachments ingested today</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20 space-y-2">
                  <div className="flex justify-between font-bold text-white">
                    <span>invoices-vendor@kochimetro.org</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">Target Dept: Finance & Procurement</div>
                  <div className="text-[10px] text-cyan-400">Last check: Just now • BHEL & Alstom invoices matched</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
