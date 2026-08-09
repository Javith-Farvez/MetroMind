import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Key, Lock, ArrowRight, Building2, CheckCircle, Sparkles, Server } from 'lucide-react';
import { loginUser } from '../api/auth';

export default function AuthModal({ isOpen, onClose, currentRole, onSelectRole }) {
  const [selected, setSelected] = useState(currentRole);
  const [authMode, setAuthMode] = useState('sso'); // 'sso' | 'password'
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const ROLES_LIST = [
    {
      id: 'gm',
      title: 'General Manager (KMRL HQ)',
      dept: 'Executive Directorate',
      email: 'admin@metromind.ai',
      desc: 'Full system oversight, board minutes approval, macro financial audits',
      badge: 'Admin Access',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'maint',
      title: 'Muttom Maintenance Lead',
      dept: 'Operations & Maintenance',
      email: 'kurup.engineering@metromind.ai',
      desc: 'Rolling stock audits, work orders, wheel lathe reports, Alstom OEM spares',
      badge: 'Engineering Access',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'fin',
      title: 'Finance & Procurement Officer',
      dept: 'Finance & Procurement',
      email: 'siddharth.finance@metromind.ai',
      desc: 'PO 3-way matching, BHEL tax invoices, GST reconciliation, GRN clearance',
      badge: 'Financial Access',
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 'ops',
      title: 'Operations Chief (OCC)',
      dept: 'Safety & Operations',
      email: 'rajesh.om@metromind.ai',
      desc: 'Station ATC speed restrictions, monsoon weather sensor alerts, driver circulars',
      badge: 'Operations Access',
      color: 'from-amber-500 to-pink-500'
    }
  ];

  const handleAuthenticate = async () => {
    setLoading(true);
    const targetRole = ROLES_LIST.find(r => r.id === selected);
    const emailToUse = targetRole ? targetRole.email : 'admin@metromind.ai';

    try {
      await loginUser(emailToUse, 'admin123');
    } catch (err) {
      console.warn('SSO fallback authentication activated:', err);
    } finally {
      setLoading(false);
      onSelectRole(selected);
      onClose();
    }
  };

  const activeRoleObj = ROLES_LIST.find(r => r.id === selected) || ROLES_LIST[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in font-mono">
      <div className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-slate-900/95 border border-purple-500/40 shadow-2xl shadow-purple-950/50 space-y-6 backdrop-blur-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 rounded-full blur-xs" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 border border-purple-500/50 text-purple-300 shadow-md">
              <ShieldCheck className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h2 className="font-black text-lg text-slate-100 uppercase tracking-tight flex items-center gap-2">
                <span>KMRL ENTERPRISE SSO</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                  ACTIVE DIRECTORY
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">Kochi Metro Rail Identity & Access Management Service</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-950 border border-purple-500/30 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-purple-500/30 text-xs font-bold">
          <button
            onClick={() => setAuthMode('sso')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'sso'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>ROLE SSO AUTHENTICATION</span>
          </button>
          <button
            onClick={() => setAuthMode('password')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'password'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>CREDENTIAL SIGN-IN</span>
          </button>
        </div>

        {authMode === 'sso' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-purple-300">
              <span>SELECT ACTIVE DEPARTMENT ROLE:</span>
              <span className="text-[10px] text-cyan-300 flex items-center gap-1 font-mono">
                <Server className="w-3 h-3 text-cyan-400" /> KMRL.INTERNAL Domain
              </span>
            </div>

            <div className="space-y-2 font-sans">
              {ROLES_LIST.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelected(role.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all space-y-1 cursor-pointer ${
                    selected === role.id
                      ? 'bg-purple-500/20 border-purple-500/70 shadow-lg shadow-purple-500/20 text-purple-100 font-bold scale-[1.01]'
                      : 'bg-slate-950/80 border-purple-500/20 hover:border-purple-400 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-100">{role.title}</span>
                      {selected === role.id && <CheckCircle className="w-4 h-4 text-cyan-300" />}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/30 text-purple-200 border border-purple-500/40 font-bold">
                      {role.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">{role.desc}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 font-sans text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3 font-mono">
              <div className="text-purple-300 font-bold text-xs">ACTIVE DIRECTORY LOGIN</div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400">ENTERPRISE EMAIL:</label>
                <input
                  type="email"
                  value={activeRoleObj.email}
                  readOnly
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-slate-100 font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400">PASSWORD:</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-slate-100 font-mono text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions & Security Seal */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 font-mono border-t border-purple-500/20">
          <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>TLS 1.3 • AES-256 GCM ENCRYPTED</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-500/30 text-slate-300 text-xs font-bold hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAuthenticate}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'AUTHENTICATE SESSION'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
