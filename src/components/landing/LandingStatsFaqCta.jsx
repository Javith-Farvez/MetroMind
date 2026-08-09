import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function LandingStatsFaqCta({ onLaunchWorkspace }) {
  const [openFaq, setOpenFaq] = useState(0);

  const FAQS = [
    {
      q: "How does MetroFlow handle Malayalam language documents?",
      a: "MetroFlow includes native optical character recognition (OCR) and layout parsing specifically trained on Malayalam script, official KMRL government circulars, and handwritten field notes."
    },
    {
      q: "What is 3-Way Purchase Order Invoice Reconciliation?",
      a: "MetroFlow automatically compares vendor tax invoices (e.g. from BHEL or Alstom) line-by-line against Purchase Orders and Warehouse Goods Received Notes (GRN) to ensure zero overbilling before releasing payment approvals."
    },
    {
      q: "Is MetroFlow compliant with CMRS safety guidelines?",
      a: "Yes, MetroFlow continuously tracks safety directives issued by the Commissioner of Metro Railway Safety (CMRS) and automatically enforces speed restrictions (50 km/h during heavy rainfall) into Automatic Train Control (ATC) operational systems."
    },
    {
      q: "How does Universal Search (Ctrl + K) work?",
      a: "Pressing Ctrl + K opens a universal command palette indexing documents, contracts, employees, stations, invoices, and statutory policies from a single input."
    }
  ];

  return (
    <div className="space-y-20 bg-[#F8FAFC]">
      {/* FAQ Section */}
      <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Everything you need to know about MetroFlow enterprise deployment.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Vibrant 7-Color Gradient CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-blue-600 via-cyan-500 via-purple-600 to-rose-500 text-white shadow-2xl text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Transform Kochi Metro Operations?
          </h2>
          <p className="text-blue-50 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Empower your team with a world-class enterprise decision workspace today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onLaunchWorkspace}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-blue-600 font-extrabold text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Launch Enterprise Workspace
            </button>
          </div>
        </div>
      </section>

      {/* Enterprise Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              MetroFlow
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold border border-blue-100">
                SIH 2026
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">Kochi Metro Rail Limited Enterprise Platform</p>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <a href="#platform" className="hover:text-blue-600">Platform</a>
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#solutions" className="hover:text-blue-600">Solutions</a>
            <a href="#faq" className="hover:text-blue-600">FAQ</a>
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            © 2026 MetroFlow • Kochi Metro Rail Limited
          </div>
        </div>
      </footer>
    </div>
  );
}
