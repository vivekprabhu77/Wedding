
import React from 'react';

/**
 * GaneshaEmblem Component
 * A classical, minimalist South Indian temple-style line-art SVG of Lord Vigneshwara (Ganesha).
 * Crafted in Antique Gold (#B68A43) with fine sacred geometry, Modak, and Trishula/Tilak.
 */
export default function GaneshaEmblem({ size = 80, className = '', style = {} }) {
  return (
    <div
      className={`ganesha-emblem-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 2px 8px rgba(182, 138, 67, 0.35))',
        ...style,
      }}
      aria-label="Lord Vigneshwara Emblem"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle Halo / Aura */}
        <circle
          cx="50"
          cy="48"
          r="42"
          stroke="var(--color-antique-gold, #B68A43)"
          strokeWidth="0.75"
          strokeDasharray="2 3"
          strokeOpacity="0.6"
        />
        <circle
          cx="50"
          cy="48"
          r="38"
          stroke="var(--color-gold-light, #DFBA73)"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />

        {/* Crown (Mukuta) */}
        <path
          d="M43 22L50 12L57 22H43Z"
          stroke="var(--color-antique-gold, #B68A43)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="rgba(182, 138, 67, 0.15)"
        />
        <circle cx="50" cy="17" r="1.5" fill="var(--color-gold-bright, #F5E5C0)" />
        <path
          d="M40 24H60V27H40V24Z"
          stroke="var(--color-antique-gold, #B68A43)"
          strokeWidth="1.2"
          fill="rgba(182, 138, 67, 0.2)"
        />

        {/* Forehead & Sacred Tilak */}
        <path
          d="M42 27C42 35 46 39 50 40C54 39 58 27 58 27"
          stroke="var(--color-antique-gold, #B68A43)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M50 28V36"
          stroke="var(--color-gold-bright, #F5E5C0)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="33" r="1.2" fill="#DFBA73" />

        {/* Big Ears (Supakarna) */}
        {/* Left Ear */}
        <path
          d="M42 28C33 27 26 33 26 42C26 50 34 52 40 50"
          stroke="var(--color-antique-gold, #B68A43)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M38 34C32 35 30 40 31 45"
          stroke="var(--color-gold-light, #DFBA73)"
          strokeWidth="0.8"
          strokeOpacity="0.7"
        />

        {/* Right Ear */}
        <path
          d="M58 28C67 27 74 33 74 42C74 50 66 52 60 50"
          stroke="var(--color-antique-gold, #B68A43)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M62 34C68 35 70 40 69 45"
          stroke="var(--color-gold-light, #DFBA73)"
          strokeWidth="0.8"
          strokeOpacity="0.7"
        />

        {/* Trunk (Vakratunda) gracefully turning to the left */}
        <path
          d="M50 40C52 46 54 54 51 61C48 67 40 68 38 64C36 60 41 57 44 59C46 60 46 62 45 64"
          stroke="var(--color-antique-gold, #B68A43)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Auspicious Modak at the trunk tip */}
        <circle
          cx="43"
          cy="60"
          r="2.5"
          fill="var(--color-gold-bright, #F5E5C0)"
          stroke="var(--color-antique-gold, #B68A43)"
          strokeWidth="0.75"
        />

        {/* Right Tusk (Ekadanta - unbroken on right, small broken on left) */}
        <line
          x1="55"
          y1="46"
          x2="59"
          y2="52"
          stroke="var(--color-ivory, #F8F3E9)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="45"
          y1="46"
          x2="43"
          y2="49"
          stroke="var(--color-ivory, #F8F3E9)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Gentle Eyes */}
        <circle cx="45" cy="34" r="1.2" fill="var(--color-antique-gold, #B68A43)" />
        <circle cx="55" cy="34" r="1.2" fill="var(--color-antique-gold, #B68A43)" />

        {/* Lotus Pedestal Base */}
        <path
          d="M30 78C35 72 45 72 50 75C55 72 65 72 70 78C60 84 40 84 30 78Z"
          stroke="var(--color-antique-gold, #B68A43)"
          strokeWidth="1.2"
          fill="rgba(182, 138, 67, 0.12)"
        />
        <path
          d="M50 75V81"
          stroke="var(--color-gold-light, #DFBA73)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
