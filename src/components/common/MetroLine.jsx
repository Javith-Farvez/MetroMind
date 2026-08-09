import React from 'react';

export default function MetroLine({ stationCount = 6, active = 2, pulsing = true }) {
  const stations = Array.from({ length: stationCount });
  return (
    <svg viewBox="0 0 640 40" width="100%" height="40" style={{ display: "block" }}>
      <line x1="20" y1="20" x2="620" y2="20" stroke="#1c2b30" strokeWidth="2" />
      <line
        x1="20"
        y1="20"
        x2={20 + (620 - 20) * (active / (stationCount - 1))}
        y2="20"
        stroke="#2dd4b3"
        strokeWidth="2"
      />
      {stations.map((_, i) => {
        const x = 20 + ((620 - 20) / (stationCount - 1)) * i;
        const isActive = i <= active;
        return (
          <g key={i}>
            <circle
              cx={x}
              cy="20"
              r={i === active ? 6 : 4}
              fill={isActive ? "#2dd4b3" : "#12201f"}
              stroke={isActive ? "#2dd4b3" : "#2a3b3a"}
              strokeWidth="1.5"
            />
            {i === active && pulsing && (
              <circle cx={x} cy="20" r="6" fill="none" stroke="#2dd4b3" strokeWidth="1.5">
                <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}
