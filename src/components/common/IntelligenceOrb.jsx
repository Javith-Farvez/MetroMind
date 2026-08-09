import React, { useState } from 'react';
import { Sparkles, Bot, Send, X, Globe, FileText, ChevronRight } from 'lucide-react';
import { SAMPLE_AI_QUERIES } from '../../data/mockKnowledgeGraph';

export default function IntelligenceOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'I am Metro Intelligence Orb. Ask me anything regarding Kochi Metro Rail Limited documents, Muttom maintenance logs, BHEL invoices, or Malayalam safety circulars.', citations: [] }
  ]);

  const handleAsk = (customQ = null) => {
    const q = customQ || query;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: q }]);
    setQuery('');

    setTimeout(() => {
      const match = SAMPLE_AI_QUERIES.find(s => s.query.toLowerCase().includes(q.substring(0, 8).toLowerCase())) || SAMPLE_AI_QUERIES[0];
      setMessages(prev => [...prev, { sender: 'ai', text: match.answer, citations: match.citations }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Orb Chat Dialog Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 glass-panel rounded-2xl p-4 bg-slate-950/90 border border-cyan-500/40 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-extrabold text-xs text-white">Metro Intelligence Orb (JARVIS Mesh)</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 text-xs p-1 rounded bg-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-3 pr-1 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-[85%] space-y-1.5 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-cyan-500 text-slate-950 font-semibold rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}>
                  <p>{m.text}</p>
                  {m.citations && m.citations.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1 text-[9px] text-cyan-400 font-mono">
                      {m.citations.map((c, idx) => (
                        <span key={idx} className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                          📄 {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAsk()}
              placeholder="Ask Metro Intelligence Orb..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleAsk()}
              className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Glowing Orb Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-2xl shadow-cyan-500/40 hover:scale-110 transition-transform"
        title="Metro Intelligence Orb"
      >
        <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-cyan-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/10 animate-ping rounded-full" />
          <Bot className="w-6 h-6 animate-pulse text-cyan-400" />
        </div>
      </button>
    </div>
  );
}
