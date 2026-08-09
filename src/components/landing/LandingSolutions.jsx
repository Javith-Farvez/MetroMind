import React from 'react';
import { Wrench, Zap, DollarSign, Users, Scale, ShieldCheck, ShoppingCart, Building2 } from 'lucide-react';

export default function LandingSolutions({ onLaunchWorkspace }) {
  const SOLUTIONS = [
    { name: "Muttom Maintenance", desc: "Wheel lathe audits, bogie brake pad wear logs, ultrasonic axle testing.", icon: Wrench, color: "text-blue-600 bg-blue-50" },
    { name: "OCC Operations", desc: "Station ATC speed restriction overrides & monsoon rain sensor alerts.", icon: Zap, color: "text-cyan-600 bg-cyan-50" },
    { name: "Finance & Accounts", desc: "3-way PO invoice reconciliation and GST tax audit verification.", icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
    { name: "Human Resources", desc: "Malayalam staff welfare policies, night shift duty allowances, medical claims.", icon: Users, color: "text-purple-600 bg-purple-50" },
    { name: "Legal & Rights-of-Way", desc: "Phase 2 Kakkanad Extension land acquisition & NHAI contract deeds.", icon: Scale, color: "text-amber-600 bg-amber-50" },
    { name: "Safety & Security", desc: "CMRS safety commission compliance checklists and emergency circulars.", icon: ShieldCheck, color: "text-rose-600 bg-rose-50" },
    { name: "Procurement & Spares", desc: "Alstom & BHEL vendor performance scoring and inventory GRNs.", icon: ShoppingCart, color: "text-indigo-600 bg-indigo-50" },
    { name: "Executive Directorate", desc: "Board meeting minutes action item tracking and macro SLA analytics.", icon: Building2, color: "text-teal-600 bg-teal-50" }
  ];

  return (
    <section id="solutions" className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored Solutions for Every KMRL Division
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Operational workflows engineered specifically for metro railway governance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <div
                key={idx}
                onClick={onLaunchWorkspace}
                className="saas-card p-5 space-y-3 cursor-pointer group"
              >
                <div className={`w-10 h-10 rounded-2xl ${sol.color} flex items-center justify-center font-bold`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{sol.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{sol.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
