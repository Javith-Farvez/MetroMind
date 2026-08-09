import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LandingNavbar({ onLaunchWorkspace }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunch = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.2 }
    });
    if (onLaunchWorkspace) onLaunchWorkspace();
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={handleLaunch} 
          data-cursor="Logo"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-cyan-400 text-sm tracking-tighter">
              KM
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                MetroMind AI
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                KMRL OS
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-400">Kochi Metro Document OS</p>
          </div>
        </div>

        {/* Center Menu Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">Keynote</a>
          <a href="#stats" className="hover:text-cyan-400 transition-colors">Metrics</a>
          <a href="#canvas" className="hover:text-cyan-400 transition-colors">Neural Corridor</a>
          <a href="#modules" className="hover:text-cyan-400 transition-colors">Pillars</a>
          <a href="#bento" className="hover:text-cyan-400 transition-colors">Bento Grid</a>
        </div>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLaunch}
            data-cursor="Sign In"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-colors"
          >
            Access Portal
          </button>
          <button
            onClick={handleLaunch}
            data-cursor="Command OS"
            className="liquid-btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5"
          >
            <span>Launch Command OS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
