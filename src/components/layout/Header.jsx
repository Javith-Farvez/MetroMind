import React, { useState } from 'react';
import Wordmark from '../common/Wordmark';
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  User,
  HelpCircle,
  Sparkles,
  LogOut
} from 'lucide-react';

export default function Header({ onOpenSearch, onNavigateTab, activeTab, onOpenUploadModal, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  const NOTIFICATIONS = [
    { id: 'n1', title: 'Muttom Depot Track Audit #8812', dept: 'Operations & Maintenance', time: '10 min ago', unread: true },
    { id: 'n2', title: 'BHEL Tax Invoice #094 PO Matched', dept: 'Finance & Procurement', time: '1 hr ago', unread: true },
    { id: 'n3', title: 'Monsoon Speed Restriction Advisory', dept: 'Safety & Security', time: '3 hrs ago', unread: false }
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/90 backdrop-blur-xl border-b border-purple-500/30 px-4 lg:px-6 py-2.5 shadow-xl shadow-purple-950/20">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Workspace Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab && onNavigateTab('landing')}
            className="hover:opacity-90 transition-opacity cursor-pointer text-left flex items-center gap-2"
            title="Return to MetroMind AI Landing Page"
          >
            <Wordmark size={22} />
          </button>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/20">
            KMRL OS
          </span>
        </div>

        {/* Universal Search Ctrl+K Input Trigger */}
        <div className="flex-1 max-w-lg mx-4 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-slate-300 text-xs hover:border-purple-400 transition-all group shadow-sm"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-purple-400 group-hover:text-cyan-300 transition-colors" />
              <span className="text-slate-300">Search documents, tasks, approvals, contracts (Ctrl + K)...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-purple-500/30 text-[10px] font-mono text-purple-300">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Action Tools & User Profile */}
        <div className="flex items-center gap-3 font-mono">
          <button
            onClick={onOpenUploadModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-extrabold text-xs uppercase transition-all shadow-md shadow-purple-500/25 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ingest Document</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationCenter(!showNotificationCenter)}
              className="relative p-2 rounded-xl text-purple-300 hover:bg-slate-900 transition-colors border border-purple-500/30 cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-purple-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950 animate-pulse" />
            </button>

            {showNotificationCenter && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl z-50 p-3 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                  <span className="font-bold text-xs text-purple-300">Notifications</span>
                  <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    2 Unread
                  </span>
                </div>

                <div className="space-y-1.5">
                  {NOTIFICATIONS.map(n => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl text-xs transition-colors ${
                        n.unread ? 'bg-purple-500/10 border border-purple-500/30' : 'hover:bg-slate-950'
                      }`}
                    >
                      <div className="font-semibold text-slate-100">{n.title}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                        <span>{n.dept}</span>
                        <span className="text-cyan-300">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-900 border border-purple-500/30 transition-colors text-xs cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 text-slate-950 font-extrabold flex items-center justify-center text-xs font-sans shadow-md">
                KM
              </div>
              <div className="hidden sm:block text-left font-sans">
                <div className="font-extrabold text-slate-100 text-[12px]">K. Menon</div>
                <div className="text-[10px] text-purple-300 font-mono">General Manager</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl z-50 p-1.5 text-xs space-y-1 animate-in fade-in">
                <div className="px-3 py-2 border-b border-purple-500/20">
                  <div className="font-bold text-slate-100">K. Menon</div>
                  <div className="text-[11px] text-purple-300 font-mono">k.menon@kochimetro.org</div>
                </div>
                <button
                  onClick={() => {
                    onNavigateTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-950 text-slate-200 font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-purple-400" /> Account Settings
                </button>
                <button
                  onClick={() => {
                    if (onLogout) onLogout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-red-500/10 text-pink-400 font-bold flex items-center gap-2 transition-colors cursor-pointer border-t border-purple-500/20 pt-2 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5 text-pink-400" /> Sign Out / Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
