import React, { useState, useEffect } from 'react';
import { Search, X, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { executeSearch } from '../../api/search';

export default function CommandPalette({ isOpen, onClose, documents, onSelectDocument }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [liveSearchResults, setLiveSearchResults] = useState(null);
  const [queryIntent, setQueryIntent] = useState(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setLiveSearchResults(null);
      setQueryIntent(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await executeSearch(searchQuery);
        if (res && res.results) {
          setLiveSearchResults(res.results);
          setQueryIntent(res.intent);
        }
      } catch (err) {
        console.warn('Hybrid Search fallback to local list:', err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isOpen) return null;

  const displayResults = liveSearchResults || (searchQuery.trim() === ''
    ? documents.slice(0, 4)
    : documents.filter(d =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.id.toLowerCase().includes(searchQuery.toLowerCase())
      ));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl space-y-3 p-5 text-slate-100">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <Search className="w-4 h-4 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search in English or Malayalam (e.g. Aluva safety incidents, BHEL invoice...)"
            className="flex-1 text-xs text-slate-100 placeholder-slate-500 bg-transparent focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200 text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1.5 text-xs pr-1">
          <div className="flex items-center justify-between px-2 py-1 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
            <span>{searchQuery ? 'Hybrid Smart Search Results' : 'Recent Quick Suggestions'}</span>
            {queryIntent && (
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Intent: {queryIntent}
              </span>
            )}
          </div>

          {displayResults.map(doc => (
            <button
              key={doc.id || doc.document_id}
              onClick={() => {
                onSelectDocument(doc);
                onClose();
              }}
              className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex items-center justify-between text-slate-100 group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">{doc.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {doc.department} • {doc.id || doc.document_id} {doc.relevance_score ? `• ${doc.relevance_score}% Relevance` : ''}
                  </div>
                  {doc.matched_snippet && (
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1 italic">
                      "{doc.matched_snippet}"
                    </div>
                  )}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
