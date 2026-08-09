import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Sparkles, UserCheck, ChevronDown, Layers, Shield, Award, Radio } from 'lucide-react';

export default function Navbar({
  activeRole,
  onRoleChange,
  isDarkMode,
  onToggleTheme,
  onOpenSearch,
  activeTab,
  onSelectTab,
  onToggleSihMode,
  isSihMode
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const ROLES = [
    { id: 'gm', name: 'Managing Director & Executive GM', title: 'Macro Command & Board Oversight', icon: Shield },
    { id: 'maint', name: 'Muttom Depot Maintenance Engineer', title: 'Rolling Stock & Wheel Lathe', icon: Layers },
    { id: 'fin', name: 'Finance Officer (3-Way PO Match)', title: 'BHEL & Alstom Invoices', icon: UserCheck },
    { id: 'ops', name: 'OCC Operations Chief', title: 'ATC Station Speed Restrictions', icon: Sparkles }
  ];

  const currentRoleObj = ROLES.find(r => r.id === activeRole) || ROLES[0];

  return (
    <header className="sticky top-0 z-40 w-full holo-panel border-b border-cyan-500/30 bg-[#030712]/90 backdrop-blur-2xl px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* NEXUS Brand Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onSelectTab('mission')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <span className="text-xl">🚇</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-mono">
                  NEXUS OS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  SIH 2026
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase font-mono">
                Kochi Metro Digital Brain
              </p>
            </div>
          </button>

          {/* SIH Hackathon Presentation Mode Button */}
          <button
            onClick={onToggleSihMode}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono transition-all border ${
              isSihMode
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30 animate-pulse'
                : 'bg-slate-900 text-purple-300 border-purple-500/30 hover:border-purple-400'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-yellow-400" />
            <span>SIH Judge Mode</span>
          </button>
        </div>

        {/* Global RAG Search Bar Trigger */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div
            onClick={onOpenSearch}
            className="relative flex items-center w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 text-xs hover:border-cyan-500/50 transition-all cursor-pointer group shadow-inner font-mono"
          >
            <Search className="w-4 h-4 mr-2.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <span className="truncate">Search Knowledge Mesh... (e.g. "Muttom brake pads" or "BHEL invoice")</span>
            <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
              ⌘K
            </div>
          </div>
        </div>

        {/* Role Selector & Action Tools */}
        <div className="flex items-center gap-3">
          {/* Quick Nav OS Tabs */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-300 mr-2 font-mono">
            <button
              onClick={() => onSelectTab('mission')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'mission' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'hover:bg-slate-900'
              }`}
            >
              Mission Control
            </button>
            <button
              onClick={() => onSelectTab('insight')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'insight' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'hover:bg-slate-900'
              }`}
            >
              Neural Insight
            </button>
            <button
              onClick={() => onSelectTab('explorer')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'explorer' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'hover:bg-slate-900'
              }`}
            >
              Knowledge Explorer
            </button>
          </div>

          {/* Active Role Selector */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-200 transition-all font-mono"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold hidden sm:inline">{currentRoleObj.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 holo-panel rounded-2xl p-2 bg-slate-950 border border-slate-800 shadow-2xl z-50 animate-in fade-in">
                <div className="px-3 py-2 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Select Active Role Scope
                </div>
                {ROLES.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onRoleChange(r.id);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-3 transition-colors ${
                      activeRole === r.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <r.icon className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-bold text-slate-100 font-sans">{r.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{r.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pulse PA Notification Bell */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            title="Pulse PA Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-yellow-400 transition-all"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}
