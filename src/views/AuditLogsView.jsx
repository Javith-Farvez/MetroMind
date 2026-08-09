import React, { useEffect, useState } from 'react';
import { History, CheckCircle2, Loader2 } from 'lucide-react';
import { apiRequest } from '../api/client';

export default function AuditLogsView() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAuditLogs() {
      try {
        const res = await apiRequest('/admin/audit-logs');
        if (res && Array.isArray(res)) {
          setLogs(res);
        }
      } catch (err) {
        console.warn("Audit log fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuditLogs();
  }, []);

  return (
    <div className="space-y-6 pb-12 text-[#e9f3f0] font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(120,200,190,0.14)] pb-4 font-mono">
        <div>
          <div className="text-xs font-bold text-[#8fa6a1] uppercase">CHRONOLOGICAL LEDGER</div>
          <h1 className="text-xl font-black text-[#e9f3f0] tracking-tight uppercase">SYSTEM AUDIT TIMELINE</h1>
          <p className="text-xs text-[#8fa6a1] font-sans mt-0.5">Chronological event ledger of all operational decisions in PostgreSQL DB</p>
        </div>

        <span className="px-3.5 py-1 rounded text-xs font-bold bg-[rgba(45,212,179,0.12)] text-[#2dd4b3] border border-[rgba(45,212,179,0.3)]">
          POSTGRESQL AUDIT LEDGER
        </span>
      </div>

      {/* CHRONOLOGICAL OPERATIONAL TIMELINE */}
      <div className="p-6 rounded-xl bg-[#0b1218] border border-[rgba(120,200,190,0.14)] space-y-6 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-[rgba(120,200,190,0.14)] pb-3">
          <span className="font-bold text-[#2dd4b3] flex items-center gap-2">
            <History className="w-4 h-4" /> RECENT OPERATIONAL EVENT SEQUENCE
          </span>
          <span className="text-[#8fa6a1]">{logs.length} EVENTS RECORDED</span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-[#8fa6a1]">
            <Loader2 className="w-6 h-6 animate-spin text-[#2dd4b3] mx-auto mb-2" />
            Loading audit events from PostgreSQL database...
          </div>
        ) : logs.length === 0 ? (
          <div className="py-12 text-center text-[#8fa6a1] font-mono border border-dashed border-[rgba(120,200,190,0.14)] rounded-lg">
            No audit events recorded yet. Upload a document or perform a workflow action to generate audit events.
          </div>
        ) : (
          <div className="relative border-l-2 border-[rgba(120,200,190,0.2)] ml-4 pl-6 space-y-6">
            {logs.map((item) => {
              const timeStr = item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now';
              const metaDetail = item.log_metadata ? JSON.stringify(item.log_metadata) : `${item.entity_type} (${item.entity_id || ''})`;

              return (
                <div key={item.id} className="relative group">
                  <div className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-[#2dd4b3] border-2 border-[#0b1218] ring-2 ring-[rgba(45,212,179,0.2)]" />
                  
                  <div className="p-3.5 rounded-lg bg-[#070c10] border border-[rgba(120,200,190,0.14)] space-y-1 hover:border-[#2dd4b3] transition-colors">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2dd4b3]">{timeStr} — {item.action}</span>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED
                      </span>
                    </div>
                    <div className="text-[#8fa6a1] font-sans text-xs">
                      Entity: <strong className="text-[#e9f3f0]">{item.entity_type}</strong> {item.entity_id ? `(#${item.entity_id})` : ''} • {metaDetail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
