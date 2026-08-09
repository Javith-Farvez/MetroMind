import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Network, ChevronRight, Share2, Layers, ArrowRight, ShieldCheck, Cpu, Building2, MapPin } from 'lucide-react';
import { fetchDocumentGraph, exploreKnowledgeGraph } from '../api/knowledge';

export default function KnowledgeBaseView({ documents = [], onSelectDocument, onNavigateTab }) {
  const [graphNodes, setGraphNodes] = useState([
    { type: "DOCUMENT", label: "KMRL-ENG-2026-8812", category: "Report" },
    { type: "STATION", label: "Aluva / Muttom Depot", category: "Location" },
    { type: "INCIDENT", label: "Brake Pad Accelerated Wear", category: "Anomaly" },
    { type: "MAINTENANCE", label: "Bay-3 Wheel Lathe Overhaul", category: "Work Order" },
    { type: "ENGINEERING", label: "Rolling Stock Directorate", category: "Department" },
    { type: "SAFETY", label: "CMRS Compliance Audit", category: "Directive" }
  ]);

  const [graphEdges, setGraphEdges] = useState([
    { source: "KMRL-ENG-2026-8812", label: "LOCATED_AT", target: "Muttom Depot" },
    { source: "Muttom Depot", label: "REPORTS_INCIDENT", target: "Brake Pad Wear" },
    { source: "Brake Pad Wear", label: "TRIGGERS_TASK", target: "Bay-3 Overhaul" },
    { source: "Bay-3 Overhaul", label: "DISPATCHES_DEPT", target: "Rolling Stock Eng." },
    { source: "Rolling Stock Eng.", label: "VERIFIES_SAFETY", target: "CMRS Compliance" }
  ]);

  const [selectedEntity, setSelectedEntity] = useState('KMRL-ENG-2026-8812');

  useEffect(() => {
    async function loadGraphData() {
      try {
        const res = await fetchDocumentGraph(selectedEntity);
        if (res && res.nodes && res.nodes.length > 0) {
          setGraphNodes(res.nodes);
          setGraphEdges(res.edges || []);
        }
      } catch (err) {
        console.warn('Knowledge graph load note:', err);
      }
    }
    loadGraphData();
  }, [selectedEntity]);

  const WIKI_ARTICLES = [
    { title: 'Muttom Depot Quarterly Rolling Stock Maintenance Protocols', dept: 'Operations & Maintenance', readTime: '5 min read', id: 'KMRL-ENG-2026-8812' },
    { title: 'Aluva Station Platform Screen Door & Viaduct Speed Inspection', dept: 'Safety & Security', readTime: '8 min read', id: 'KMRL-SAF-2026-019' },
    { title: 'BHEL Traction Transformer Maintenance & Vendor PO Match', dept: 'Finance & Procurement', readTime: '4 min read', id: 'KMRL-FIN-2026-3042' }
  ];

  const RELATIONSHIP_FLOW = [
    { name: "Document", val: "KMRL-ENG-8812", icon: BookOpen, color: "text-blue-400" },
    { name: "Station", val: "Muttom / Aluva", icon: MapPin, color: "text-purple-400" },
    { name: "Incident", val: "Brake Wear 3.2mm", icon: Network, color: "text-red-400" },
    { name: "Maintenance", val: "Bay-3 Overhaul", icon: Cpu, color: "text-amber-400" },
    { name: "Engineering", val: "Rolling Stock", icon: Building2, color: "text-indigo-400" },
    { name: "Safety", val: "CMRS Verified", icon: ShieldCheck, color: "text-emerald-400" }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50" />
            <span className="gradient-text-cyan">KMRL Knowledge Base & Institutional Memory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Multi-depth Knowledge Graph, Cross-Department Intelligence & Incident History</p>
        </div>

        <span className="px-3.5 py-1 rounded-xl text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          Neo4j Graph Active
        </span>
      </div>

      {/* VISUAL RELATIONSHIP PIPELINE */}
      <div className="metro-card p-5 space-y-3 bg-slate-950/60">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2 flex items-center justify-between">
          <span>Visual Organizational Knowledge Relationship Flow</span>
          <span className="text-slate-400">Target Entity: {selectedEntity}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
          {RELATIONSHIP_FLOW.map((node, i) => {
            const Icon = node.icon;
            return (
              <React.Fragment key={i}>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5 shadow-md">
                  <Icon className={`w-4 h-4 ${node.color}`} />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400">{node.name}</div>
                    <div className="font-bold text-slate-100 text-xs">{node.val}</div>
                  </div>
                </div>
                {i < RELATIONSHIP_FLOW.length - 1 && <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Pane: SOP Articles & Institutional Memory (5 cols) */}
        <div className="lg:col-span-5 metro-card p-5 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" /> Featured Institutional Guidelines
          </h3>
          <div className="space-y-3">
            {WIKI_ARTICLES.map((art, i) => (
              <div
                key={i}
                onClick={() => setSelectedEntity(art.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs group ${
                  selectedEntity === art.id
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/60'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">{art.title}</div>
                  <div className="text-[11px] text-slate-400">{art.dept} • {art.readTime}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Graph Relationships Visual Panel (7 cols) */}
        <div className="lg:col-span-7 metro-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" /> Connected Graph Entity Nodes
            </h3>
            <span className="text-[11px] font-mono text-cyan-400">{graphNodes.length} Discovered Nodes</span>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {graphNodes.map((n, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">{n.type}</div>
                  <div className="font-bold text-slate-100 text-xs">{n.label}</div>
                  <div className="text-[10px] text-slate-500">{n.category || 'Metadata Entity'}</div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Explicit Document Relationships</div>
              <div className="space-y-1.5 font-mono text-xs">
                {graphEdges.map((e, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-300 font-bold">{e.source}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30 text-[10px]">{e.label}</span>
                    <span className="text-cyan-300 font-bold">{e.target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
