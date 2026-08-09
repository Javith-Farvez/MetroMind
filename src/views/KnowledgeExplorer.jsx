import React, { useState } from 'react';
import { GRAPH_NODES, GRAPH_EDGES } from '../data/mockKnowledgeGraph';
import { Globe, Network, Search, Sparkles, Filter, ShieldCheck, Zap } from 'lucide-react';

export default function KnowledgeExplorer() {
  const [filterType, setFilterType] = useState('all');
  const [selectedNode, setSelectedNode] = useState(GRAPH_NODES[0]);

  const filteredNodes = filterType === 'all'
    ? GRAPH_NODES
    : GRAPH_NODES.filter(n => n.type === filterType);

  return (
    <div className="space-y-6 text-slate-100 pb-16">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-400 animate-spin" />
            <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              Knowledge Explorer & Neural Universe
            </h1>
          </div>
          <p className="text-xs text-slate-400">Celestial spatial graph — Departments are Planets, Documents are Moons, Contracts are Satellites</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${filterType === 'all' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400'}`}
          >
            All Planets & Moons ({GRAPH_NODES.length})
          </button>
          <button
            onClick={() => setFilterType('station')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${filterType === 'station' ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-900 text-slate-400'}`}
          >
            Stations (Planets)
          </button>
          <button
            onClick={() => setFilterType('asset')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${filterType === 'asset' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400'}`}
          >
            Trains & Assets
          </button>
        </div>
      </div>

      {/* Celestial Graph Canvas & Selected Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Spatial Universe Graph (Left 2 cols) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-purple-500/30 bg-slate-950/80 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
            <span className="text-purple-300 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              KMRL Interconnected Celestial Mesh
            </span>
            <span className="text-slate-400">Click node to inspect orbital data</span>
          </div>

          <div className="relative w-full h-[480px] rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            <svg className="w-full h-full">
              {GRAPH_EDGES.map((edge, idx) => {
                const s = GRAPH_NODES.find(n => n.id === edge.source);
                const t = GRAPH_NODES.find(n => n.id === edge.target);
                if (!s || !t) return null;

                return (
                  <line
                    key={idx}
                    x1={s.x}
                    y1={s.y}
                    x2={t.x}
                    y2={t.y}
                    stroke="rgba(139, 92, 246, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                  />
                );
              })}

              {filteredNodes.map(node => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                  >
                    <circle
                      r={node.type === 'station' ? 18 : 12}
                      fill={node.type === 'station' ? '#00f2fe' : node.type === 'asset' ? '#10b981' : node.type === 'vendor' ? '#8b5cf6' : '#f59e0b'}
                      opacity={isSelected ? '1' : '0.75'}
                      className="transition-transform group-hover:scale-125"
                    />
                    <text
                      y="32"
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Celestial Node Details Card (Right 1 col) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
            <span className="text-slate-400">ORBITAL NODE TELEMETRY</span>
            <span className="text-cyan-400 font-bold">{selectedNode.id}</span>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-extrabold text-base text-white">{selectedNode.label}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Type: {selectedNode.type}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
              {selectedNode.details}
            </p>

            <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="text-cyan-300 font-bold">{selectedNode.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Linked Assets:</span>
                <span className="text-emerald-400 font-bold">4 Active Links</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
