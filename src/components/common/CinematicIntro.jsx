import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Zap, ShieldCheck, Play, ArrowRight, Layers, Cpu } from 'lucide-react';

export default function CinematicIntro({ onCompleteIntro }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('ingesting'); // 'ingesting' | 'core_ready'
  const [ingestCount, setIngestCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    // Incoming document particle streams flying to central AI Core
    const docParticles = Array.from({ length: 60 }, (_, i) => {
      const angle = (i / 60) * Math.PI * 2;
      const dist = Math.random() * 400 + 300;
      return {
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        targetX: centerX,
        targetY: centerY,
        speed: Math.random() * 2 + 1.5,
        color: i % 3 === 0 ? '#00f2fe' : i % 3 === 1 ? '#8b5cf6' : '#10b981',
        label: i % 4 === 0 ? 'WhatsApp PDF' : i % 4 === 1 ? 'BHEL Invoice' : i % 4 === 2 ? 'Safety Circular' : 'Muttom Audit'
      };
    });

    let count = 0;
    let coreRadius = 40;
    let rotation = 0;

    const render = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.25)';
      ctx.fillRect(0, 0, width, height);

      rotation += 0.015;

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
      ctx.lineWidth = 1;
      const step = 80;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Central Rotating AI Core
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      // Core outer ring
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius + 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.stroke();

      // Core inner glowing orb
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 30;
      ctx.fill();

      ctx.restore();

      // Move incoming document particles toward AI Core
      docParticles.forEach((p, idx) => {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 15) {
          p.x += (dx / dist) * p.speed * 3;
          p.y += (dy / dist) * p.speed * 3;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - (dx / dist) * 15, p.y - (dy / dist) * 15);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          // Particle absorbed by AI Core
          p.x = centerX + (Math.random() - 0.5) * width;
          p.y = centerY + (Math.random() - 0.5) * height;
          count++;
          setIngestCount(prev => prev + 1);
          if (coreRadius < 70) coreRadius += 0.5;
        }
      });

      if (count > 80 && phase !== 'core_ready') {
        setPhase('core_ready');
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 text-center space-y-2 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold font-mono tracking-wider">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>SMART INDIA HACKATHON 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          NEXUS Metro Intelligence
        </h1>
        <p className="text-xs sm:text-sm font-mono text-slate-400">
          The Living Digital Brain of Kochi Metro Rail Limited (KMRL)
        </p>
      </div>

      {/* Center AI Neural Core Status Card */}
      <div className="relative z-10 text-center space-y-4 max-w-lg">
        <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-slate-950/80 backdrop-blur-2xl shadow-2xl space-y-3">
          <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-3">
            <span className="text-slate-400">NEURAL INGESTION STREAM</span>
            <span className="text-cyan-400 font-bold">{ingestCount} Docs Absorbed</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {phase === 'ingesting'
              ? 'Absorbing WhatsApp dispatches, BHEL invoices, Muttom depot maintenance logs, and Malayalam circulars into Central Knowledge Core...'
              : 'KMRL Neural Core fully illuminated. Knowledge graph nodes linked across 25 km Aluva-Petta corridor.'}
          </p>

          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${Math.min(100, (ingestCount / 100) * 100)}%` }}
            />
          </div>
        </div>

        {/* Launch Button */}
        <button
          onClick={onCompleteIntro}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-sm tracking-wider uppercase shadow-2xl shadow-cyan-500/30 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Initialize Mission Control Operating System</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Footer Metadata */}
      <div className="relative z-10 flex items-center justify-between w-full text-[11px] font-mono text-slate-500 border-t border-slate-900 pt-4">
        <span>KMRL OCC Engine v3.4</span>
        <span>Secure SHA-256 Mesh</span>
        <span>Kochi, Kerala</span>
      </div>
    </div>
  );
}
