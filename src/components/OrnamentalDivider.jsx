import React from 'react';

/**
 * OrnamentalDivider Component
 * Classical South Indian hairline divider with central lotus / bindu motif in Antique Gold.
 * Provides sophisticated editorial separation without clutter or heavy card borders.
 */
export default function OrnamentalDivider({ width = 'min(260px, 70%)', className = '', style = {} }) {
  return (
    <div
      className={`ornamental-divider ${className}`}
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '14px auto',
        width,
        ...style,
      }}
    >
      <svg
        width="100%"
        height="14"
        viewBox="0 0 240 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="dividerFadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B68A43" stopOpacity="0" />
            <stop offset="100%" stopColor="#B68A43" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="dividerFadeRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B68A43" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B68A43" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left tapering hairline */}
        <line x1="0" y1="7" x2="100" y2="7" stroke="url(#dividerFadeLeft)" strokeWidth="0.8" />
        <circle cx="104" cy="7" r="1.2" fill="#B68A43" />

        {/* Central Auspicious Motif */}
        <g transform="translate(120, 7)">
          <path
            d="M0 -5L3.5 0L0 5L-3.5 0Z"
            fill="var(--color-gold-bright, #F5E5C0)"
            stroke="var(--color-antique-gold, #B68A43)"
            strokeWidth="0.6"
          />
          <circle cx="0" cy="0" r="1" fill="#701F2A" />
        </g>

        {/* Right tapering hairline */}
        <circle cx="136" cy="7" r="1.2" fill="#B68A43" />
        <line x1="140" y1="7" x2="240" y2="7" stroke="url(#dividerFadeRight)" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

