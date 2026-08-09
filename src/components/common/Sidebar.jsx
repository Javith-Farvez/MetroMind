import React from 'react';
import {
  Crosshair,
  Cpu,
  Globe,
  GitMerge,
  Radio,
  Layers,
  BarChart3,
  Sliders,
  ShieldCheck,
  Building2,
  Zap,
  Bot
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, isCollapsed, onToggleCollapse }) {
  const OS_MODULES = [
    { id: 'landing', label: 'Launch Sequence & Intro', icon: Globe, highlight: true },
    { id: 'mission', label: 'Mission Control', icon: Crosshair, badge: 'Live Telemetry' },
    { id: 'insight', label: 'Neural Insight Engine', icon: Cpu, badge: 'Vision OCR' },
    { id: 'explorer', label: 'Knowledge Explorer', icon: Globe, badge: 'Neural Mesh' },
    { id: 'journey', label: 'Journey Flow', icon: GitMerge, badge: '8 Stations' },
    { id: 'pulse', label: 'Pulse Center', icon: Radio, badge: 'PA Broadcast' },
    { id: 'digitaltwin', label: 'Digital Twin Corridor', icon: Layers, badge: '25 km Line 1' },
    { id: 'dashboards', label: 'Department Command Hub', icon: Building2, badge: '10 Views' },
    { id: 'systemcore', label: 'System Core', icon: ShieldCheck, badge: 'SHA-256' }
  ];

  return (
    <aside
      className={`holo-panel border-r border-cyan-500/30 bg-[#030712]/95 backdrop-blur-2xl transition-all duration-300 flex flex-col z-30 shrink-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-3 space-y-1.5 flex-1">
        <div className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono ${isCollapsed ? 'hidden' : 'block'}`}>
          NEXUS Intelligence Modules
        </div>

        {OS_MODULES.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono font-bold transition-all group ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className={`w-4 h-4 shrink-0 transition-colors ${
                isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-400 group-hover:text-cyan-400'
              }`} />
              
              {!isCollapsed && (
                <div className="flex-1 text-left flex items-center justify-between truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!isCollapsed && (
        <div className="p-3 mx-3 mb-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2 font-mono">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-200">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Kochi Metro Brain
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-[10px] text-slate-400">
            Active Directory & Muttom OCC Linked
          </div>
        </div>
      )}

      <div className="p-3 border-t border-slate-800 flex items-center justify-between font-mono">
        {!isCollapsed && (
          <div className="text-[10px] text-slate-400">
            SIH 2026 • Kochi Metro
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors mx-auto"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>
    </aside>
  );
}
