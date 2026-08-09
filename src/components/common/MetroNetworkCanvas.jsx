import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Activity, Cpu, FileText, Zap } from 'lucide-react';

const STATIONS = [
  { id: 'aluva', name: 'Aluva', x: 8, y: 50, docs: 142, status: 'Normal', code: 'ALV' },
  { id: 'muttom', name: 'Muttom Depot', x: 24, y: 35, docs: 489, status: 'Active Inspection', code: 'MTM', highlight: true },
  { id: 'edapally', name: 'Edapally', x: 42, y: 58, docs: 215, status: 'Monsoon Alert', code: 'EDP', alert: true },
  { id: 'palarivattom', name: 'Palarivattom', x: 60, y: 42, docs: 178, status: 'OHE Verified', code: 'PLR' },
  { id: 'maharajas', name: 'Maharajas', x: 76, y: 65, docs: 310, status: 'Normal', code: 'MHC' },
  { id: 'petta', name: 'Petta', x: 92, y: 48, docs: 194, status: 'Normal', code: 'PTA' }
];

export default function MetroNetworkCanvas({ onSelectStation, activeDocumentCount = 1248 }) {
  const canvasRef = useRef(null);
  const [selectedStation, setSelectedStation] = useState(STATIONS[1]); // Default Muttom Depot

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 800);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 240;
    };
    window.addEventListener('resize', handleResize);

    // Pulse dispatches travelling along line
    const pulses = [
      { progress: 0.1, speed: 0.006, color: '#06b6d4' },
      { progress: 0.45, speed: 0.008, color: '#10b981' },
      { progress: 0.75, speed: 0.005, color: '#8b5cf6' }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Main Metro Corridor Line (Glow effect)
      ctx.beginPath();
      STATIONS.forEach((s, idx) => {
        const px = (s.x / 100) * width;
        const py = (s.y / 100) * height;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });

      // Ambient Glow line
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Sharp core line
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 0;
      ctx.stroke();

      // Draw document pulses along line
      pulses.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        // Calculate point on multi-segment line
        const totalSegments = STATIONS.length - 1;
        const scaledProgress = p.progress * totalSegments;
        const segIndex = Math.floor(scaledProgress);
        const segFraction = scaledProgress - segIndex;

        if (segIndex < totalSegments) {
          const s1 = STATIONS[segIndex];
          const s2 = STATIONS[segIndex + 1];

          const x1 = (s1.x / 100) * width;
          const y1 = (s1.y / 100) * height;
          const x2 = (s2.x / 100) * width;
          const y2 = (s2.y / 100) * height;

          const cx = x1 + (x2 - x1) * segFraction;
          const cy = y1 + (y2 - y1) * segFraction;

          ctx.beginPath();
          ctx.arc(cx, cy, 6, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw Station Nodes
      STATIONS.forEach(s => {
        const px = (s.x / 100) * width;
        const py = (s.y / 100) * height;

        const isSelected = selectedStation?.id === s.id;

        // Node Ring
        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = s.alert ? '#ef4444' : s.highlight ? '#06b6d4' : '#0f172a';
        ctx.strokeStyle = isSelected ? '#38bdf8' : s.alert ? '#fca5a5' : '#334155';
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.fill();
        ctx.stroke();

        // Inner glowing dot
        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#ffffff' : s.alert ? '#fee2e2' : '#38bdf8';
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  }, [selectedStation]);

  const handleStationClick = (st) => {
    setSelectedStation(st);
    if (onSelectStation) onSelectStation(st);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 relative overflow-hidden bg-slate-900/60 backdrop-blur-xl shadow-2xl">
      {/* Top Header stats bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              Kochi Metro Neural Document Corridor
              <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Live AI Pipeline
              </span>
            </h3>
            <p className="text-xs text-slate-400">Aluva to Petta Revenue Line (25 km) — Real-time Node Activity</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Node Ingestion Rate:</span>
            <span className="font-mono font-bold text-slate-200">142 docs/hr</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400">Total Digits:</span>
            <span className="font-mono font-bold text-cyan-400">{activeDocumentCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Metro Canvas Node Graph */}
      <div className="relative w-full h-[210px] rounded-xl bg-slate-950/70 border border-slate-800/80 p-2 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />

        {/* Floating Station Buttons Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {STATIONS.map(st => (
            <button
              key={st.id}
              onClick={() => handleStationClick(st)}
              style={{ left: `${st.x}%`, top: `${st.y}%` }}
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-12 flex flex-col items-center group transition-all duration-200 ${
                selectedStation?.id === st.id ? 'scale-110 z-20' : 'hover:scale-105 z-10'
              }`}
            >
              <div className={`px-2.5 py-1 rounded-md text-[11px] font-bold shadow-lg flex items-center gap-1.5 transition-colors border ${
                selectedStation?.id === st.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 font-extrabold shadow-cyan-500/30'
                  : st.alert
                  ? 'bg-red-500/20 text-red-300 border-red-500/40 backdrop-blur-md'
                  : 'bg-slate-900/90 text-slate-200 border-slate-700 backdrop-blur-md group-hover:border-cyan-500/50'
              }`}>
                <span className="font-mono">{st.code}</span>
                <span>{st.name}</span>
              </div>
              <div className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 px-1.5 py-0.5 rounded mt-0.5">
                {st.docs} docs
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Station detail inspector strip */}
      {selectedStation && (
        <div className="mt-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${selectedStation.alert ? 'bg-red-500 animate-ping' : 'bg-cyan-400'}`} />
            <div>
              <span className="font-bold text-slate-200">{selectedStation.name} Station Node</span>
              <span className="mx-2 text-slate-600">•</span>
              <span className="text-slate-400">Status: </span>
              <span className={selectedStation.alert ? 'text-red-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                {selectedStation.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Processed Docs: <strong className="text-cyan-400 font-mono">{selectedStation.docs}</strong></span>
            <button className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors text-[11px] font-medium">
              View Node Telemetry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
