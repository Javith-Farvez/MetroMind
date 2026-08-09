import React from 'react';

export default function Wordmark({ size = 20 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: size, height: size, borderRadius: 6, background: "linear-gradient(135deg, #a855f7, #06b6d4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: size * 0.55, color: "#ffffff",
        boxShadow: "0 0 12px rgba(168, 85, 247, 0.4)"
      }}>M</div>
      <span className="disp" style={{ fontWeight: 700, fontSize: size * 0.85, letterSpacing: "-0.02em", color: "#f8fafc" }}>
        MetroMind <span style={{ color: "#c084fc", textShadow: "0 0 10px rgba(192, 132, 252, 0.5)" }}>AI</span>
      </span>
    </div>
  );
}
