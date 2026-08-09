import React, { useState } from 'react';
import { Settings, User, Shield, Key, Building2, Bell, Globe, Lock, Cpu, CheckCircle2 } from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'rbac' | 'multilingual' | 'notifications' | 'security'
  const [userRole, setUserRole] = useState('General Manager');
  const [department, setDepartment] = useState('Executive Directorate');
  const [primaryLanguage, setPrimaryLanguage] = useState('English');
  const [enableVoice, setEnableVoice] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50" />
            <span className="gradient-text-cyan">System Settings & Governance Preferences</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Control User Profiles, RBAC Permissions, Multilingual Models, & System Configuration</p>
        </div>

        {savedSuccess && (
          <span className="px-3.5 py-1 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" /> Preferences Saved
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sub-Nav (3 cols) */}
        <div className="lg:col-span-3 metro-card p-4 space-y-1 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'profile' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" /> User Profile & Role
          </button>
          <button
            onClick={() => setActiveTab('rbac')}
            className={`w-full text-left px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'rbac' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> RBAC Permissions
          </button>
          <button
            onClick={() => setActiveTab('multilingual')}
            className={`w-full text-left px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'multilingual' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Multilingual & OCR
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'notifications' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Bell className="w-3.5 h-3.5" /> Notifications & Alerts
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'security' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:bg-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> Security & System Core
          </button>
        </div>

        {/* Right Settings Body (9 cols) */}
        <div className="lg:col-span-9 metro-card p-5 space-y-4">
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-slate-100 border-b border-slate-800 pb-2">User Profile & Department Assignment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="K. Menon"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Email Address</label>
                  <input
                    type="text"
                    defaultValue="k.menon@kochimetro.org"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Assigned Role</label>
                  <select
                    value={userRole}
                    onChange={e => setUserRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="General Manager">General Manager & Board Directorate</option>
                    <option value="Muttom Maintenance Lead">Muttom Maintenance Lead</option>
                    <option value="Safety Officer">Safety & Quality Officer</option>
                    <option value="Finance Officer">Finance & Procurement Officer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Department</label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="Executive Directorate">Executive Directorate</option>
                    <option value="Operations & Maintenance">Operations & Maintenance</option>
                    <option value="Finance & Procurement">Finance & Procurement</option>
                    <option value="Safety & Quality Assurance">Safety & Quality Assurance</option>
                  </select>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button onClick={handleSave} className="px-5 py-2 rounded-xl glow-btn-cyan text-xs font-bold shadow-lg">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'rbac' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-slate-100 border-b border-slate-800 pb-2">Enterprise Role-Based Access Control (RBAC)</h3>
              <div className="space-y-2">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100">General Manager & Board Directorate</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Full Approval & Financial Release Clearance (Unlimited Threshold)</div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 text-[10px]">Tier 1 Admin</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100">Muttom Maintenance Lead</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Rolling Stock Work Orders & Maintenance Inspections</div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold border border-slate-700 text-[10px]">Engineering Role</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'multilingual' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-slate-100 border-b border-slate-800 pb-2">Multilingual & OCR Vision Engine Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <div className="font-bold text-slate-100">Default Interface Language</div>
                    <div className="text-[11px] text-slate-400">Primary UI & RAG Answer Synthesis language</div>
                  </div>
                  <select
                    value={primaryLanguage}
                    onChange={e => setPrimaryLanguage(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100"
                  >
                    <option value="English">English</option>
                    <option value="Malayalam">Malayalam (മലയാളം)</option>
                    <option value="Hindi">Hindi (हिन्दी)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <div className="font-bold text-slate-100">Voice Recognition Input</div>
                    <div className="text-[11px] text-slate-400">Enable microphone speech query recognition</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableVoice}
                    onChange={e => setEnableVoice(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button onClick={handleSave} className="px-5 py-2 rounded-xl glow-btn-cyan text-xs font-bold shadow-lg">
                  Save Language Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-slate-100 border-b border-slate-800 pb-2">Notification & Expiry Alerts</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span>High-Priority Safety & Monsoon Restrictions</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-400" />
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span>Invoice 3-Way PO Match Verification Alerts</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-400" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 text-xs font-mono">
              <h3 className="font-extrabold text-sm text-slate-100 font-sans border-b border-slate-800 pb-2">System Core & Microservices Health</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Database Engine</div>
                  <div className="text-emerald-400 font-bold mt-1">PostgreSQL v16.2 (Connected)</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Knowledge Graph</div>
                  <div className="text-cyan-400 font-bold mt-1">Neo4j v5.12 (Connected)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
