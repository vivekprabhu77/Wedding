import React from 'react';

/**
 * GarlandFlying Component
 * Represents the sacred Varmala garland while being lifted and placed.
 * Crafted with interwoven jasmine buds (Mallige), velvet red roses (Kempu Gulabi),
 * and an antique gold zari tie medallion.
 */
export default function GarlandFlying({ size = 110, isDraped = false, className = '', style = {} }) {
  const height = size * 1.35;

  return (
    <div
      className={`garland-flying ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: `${size}px`,
        height: `${height}px`,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45))',
        ...style,
      }}
      aria-label="Flying Wedding Garland"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 160 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flyGoldZari" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E5C0" />
            <stop offset="40%" stopColor="#DFBA73" />
            <stop offset="70%" stopColor="#B68A43" />
            <stop offset="100%" stopColor="#825F28" />
          </linearGradient>

          <radialGradient id="flyRoseGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#A82839" />
            <stop offset="60%" stopColor="#701F2A" />
            <stop offset="100%" stopColor="#4A121A" />
          </radialGradient>

          <linearGradient id="flyJasmineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#F8F3E9" />
            <stop offset="100%" stopColor="#E6D5B8" />
          </linearGradient>
        </defs>

        {/* Master Garland Cord Curve */}
        <path
          d={
            isDraped
              ? 'M34 15 C34 75, 45 152, 80 182 C115 152, 126 75, 126 15'
              : 'M34 38 C46 95, 62 132, 80 144 C98 132, 114 95, 126 38'
          }
          stroke="url(#flyGoldZari)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Garland Strand */}
        <FloralCluster cx={35} cy={22} r={7.5} />
        <FloralCluster cx={37} cy={42} r={8.5} isRose />
        <FloralCluster cx={41} cy={62} r={9} />
        <FloralCluster cx={45} cy={82} r={9.5} isRose />
        <FloralCluster cx={51} cy={102} r={10} />
        <FloralCluster cx={58} cy={122} r={10} isRose />
        <FloralCluster cx={65} cy={142} r={10.5} />
        <FloralCluster cx={73} cy={162} r={11} isRose />

        {/* Right Garland Strand */}
        <FloralCluster cx={125} cy={22} r={7.5} />
        <FloralCluster cx={123} cy={42} r={8.5} isRose />
        <FloralCluster cx={119} cy={62} r={9} />
        <FloralCluster cx={115} cy={82} r={9.5} isRose />
        <FloralCluster cx={109} cy={102} r={10} />
        <FloralCluster cx={102} cy={122} r={10} isRose />
        <FloralCluster cx={95} cy={142} r={10.5} />
        <FloralCluster cx={87} cy={162} r={11} isRose />

        {/* Bottom Central Grand Medallion & Tassel (Kucchu) */}
        <g transform={isDraped ? 'translate(80, 182)' : 'translate(80, 144)'}>
          <circle cx="0" cy="0" r="13" fill="url(#flyRoseGrad)" stroke="url(#flyGoldZari)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="8.5" fill="url(#flyJasmineGrad)" stroke="rgba(182, 138, 67, 0.4)" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="4.5" fill="url(#flyRoseGrad)" />

          {/* Hanging Gold Thread Tassels */}
          <path d="M-6 12L-4 34M0 13L0 42M6 12L4 34" stroke="url(#flyGoldZari)" strokeWidth="1.5" />
          <circle cx="-4" cy="35" r="3" fill="url(#flyRoseGrad)" />
          <circle cx="0" cy="43" r="3.5" fill="url(#flyRoseGrad)" />
          <circle cx="4" cy="35" r="3" fill="url(#flyRoseGrad)" />
        </g>
      </svg>
    </div>
  );
}

function FloralCluster({ cx, cy, r, isRose = false }) {
  if (isRose) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill="url(#flyRoseGrad)" stroke="url(#flyGoldZari)" strokeWidth="0.75" />
        <path
          d={`M${cx - r * 0.5} ${cy} C${cx} ${cy - r * 0.6}, ${cx + r * 0.5} ${cy}, ${cx} ${cy + r * 0.6} Z`}
          fill="none"
          stroke="rgba(248, 243, 233, 0.35)"
          strokeWidth="0.6"
        />
        <circle cx={cx} cy={cy} r={r * 0.35} fill="#4A121A" />
      </g>
    );
  }

  return (
    <g>
      <circle cx={cx - 3} cy={cy - 2} r={r * 0.55} fill="url(#flyJasmineGrad)" />
      <circle cx={cx + 3} cy={cy - 2} r={r * 0.55} fill="url(#flyJasmineGrad)" />
      <circle cx={cx} cy={cy + 3} r={r * 0.55} fill="url(#flyJasmineGrad)" />
      <circle cx={cx} cy={cy} r={r * 0.35} fill="url(#flyGoldZari)" stroke="#825F28" strokeWidth="0.5" />
    </g>
  );
}

