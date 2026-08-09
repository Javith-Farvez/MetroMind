import React from 'react';
import { Radio, ShieldAlert, DollarSign, CloudRain, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PulseCenter() {
  const ALERTS = [
    { id: 'PULSE-01', type: 'Critical Maintenance', text: 'Muttom Depot Track Inspection Doc #8812 flagged Rake #07 front bogie brake pad wear (3.2mm vs 6.0mm). Work Order auto-issued for Bay-3 on 08-Aug-2026.', time: '09:14 AM', urgent: true },
    { id: 'PULSE-02', type: 'Financial Match', text: 'BHEL Invoice #094 for ₹16.43 Cr verified 99.1% against PO-KMRL-2025-7721 and GRN-4412 with zero discrepancies. Ready for payment clearance.', time: '10:45 AM', urgent: false },
    { id: 'PULSE-03', type: 'Monsoon Directive', text: 'Safety Circular 19/2026 pushed max speed 50 km/h override to Automatic Train Control (ATC) during rainfall exceeding 35 mm/hr.', time: '07:30 AM', urgent: true }
  ];

  return (
    <div className="space-y-6 text-slate-100 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-2xl font-extrabold tracking-tight text-white uppercase font-mono">
              Pulse Center & Broadcast Feed
            </h1>
          </div>
          <p className="text-xs text-slate-400">Real-time PA control broadcasts, critical safety announcements, and financial updates</p>
        </div>

        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          Radio Frequency: 440.25 MHz
        </span>
      </div>

      <div className="space-y-4">
        {ALERTS.map(al => (
          <div
            key={al.id}
            className={`p-4 rounded-2xl glass-panel border transition-all space-y-2 ${
              al.urgent
                ? 'border-red-500/40 bg-slate-950/80 shadow-lg shadow-red-500/10'
                : 'border-slate-800 bg-slate-950/80'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={`font-bold flex items-center gap-2 ${al.urgent ? 'text-red-400' : 'text-emerald-400'}`}>
                {al.urgent && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                {al.type}
              </span>
              <span className="text-slate-400">{al.time}</span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-mono">{al.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
