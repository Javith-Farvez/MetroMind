import React from 'react';
import Wordmark from '../common/Wordmark';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  GitMerge,
  BarChart3,
  History,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, isCollapsed, onToggleCollapse }) {
  const NAVIGATION = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, symbol: '◆' },
    { id: 'document-workspace', label: 'Document Workspace', icon: FileText, badge: 'Core', symbol: '▤' },
    { id: 'ai-intelligence', label: 'AI Intelligence', icon: Sparkles, badge: 'RAG', symbol: '✦' },
    { id: 'actions-approvals', label: 'Actions & Approvals', icon: GitMerge, badge: 'Decision', symbol: '⎇' },
    { id: 'analysis', label: 'Analysis', icon: BarChart3, symbol: '▰' },
    { id: 'audit-logs', label: 'Audit Logs', icon: History, symbol: '🧾' },
    { id: 'settings', label: 'Settings', icon: Settings, symbol: '◍' }
  ];

  return (
    <aside
      className={`bg-slate-950 border-r border-purple-500/20 transition-all duration-200 flex flex-col z-20 shrink-0 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Top Wordmark Brand Header */}
      <div className="p-4 border-b border-purple-500/20 flex items-center justify-between">
        {!isCollapsed ? (
          <Wordmark size={20} />
        ) : (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-extrabold flex items-center justify-center text-sm font-sans mx-auto shadow-md shadow-purple-500/30">
            M
          </div>
        )}
      </div>

      <div className="p-3 space-y-1 flex-1 overflow-y-auto font-sans">
        {!isCollapsed && (
          <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
            NAVIGATION
          </div>
        )}

        {NAVIGATION.map(item => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/50 shadow-lg shadow-purple-500/15'
                  : 'text-slate-400 hover:bg-purple-500/10 hover:text-slate-200 border border-transparent'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <span className={`mono text-xs opacity-80 shrink-0 ${isActive ? 'text-purple-400 font-bold' : 'text-slate-500'}`}>
                {item.symbol}
              </span>

              {!isCollapsed && (
                <div className="flex-1 text-left flex items-center justify-between truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold shrink-0 ${
                      isActive
                        ? 'bg-purple-500/30 text-purple-200 border border-purple-500/40'
                        : 'bg-slate-900 text-slate-400 border border-purple-500/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-3 border-t border-purple-500/20 flex items-center justify-between text-xs text-slate-400 font-mono">
        {!isCollapsed && (
          <span className="text-[11px] text-purple-400 font-bold">KMRL AI OS • v3.4</span>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl text-purple-300 hover:bg-purple-500/20 border border-purple-500/30 transition-colors mx-auto cursor-pointer"
          title="Toggle Navigation"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4 text-purple-400" /> : <ChevronLeft className="w-4 h-4 text-purple-400" />}
        </button>
      </div>
    </aside>
  );
}
