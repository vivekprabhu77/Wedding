import React from 'react';
import { motion } from 'framer-motion';

/**
 * OrnamentalPortraitFrame Component
 * Renders an elaborate classical Indian portrait setting:
 * - 'architectural' variant for the Groom: Temple mandap fluted pillar archway, antique gold accents, and warm diya radiance.
 * - 'floral' variant for the Bride: Delicate jasmine (mallige) and lotus vine flourishes, rose-gold accents, and warm celebration aura.
 */
export default function OrnamentalPortraitFrame({
  variant = 'architectural', // 'architectural' | 'floral'
  children,
  auraOpacity = 1,
  frameScale = 1,
  className = '',
  style = {},
}) {
  const isArchitectural = variant === 'architectural';

  return (
    <motion.div
      className={`ornamental-portrait-frame variant-${variant} ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '360px',
        height: 'clamp(230px, 34vh, 290px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: '0 auto clamp(6px, 1.2vh, 12px)',
        scale: frameScale,
        ...style,
      }}
    >
      {/* --- RADIANT WARMTH AURA GLOW --- */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(290px, 86%)',
          height: 'min(290px, 86%)',
          borderRadius: '50%',
          background: isArchitectural
            ? 'radial-gradient(circle, rgba(223, 186, 115, 0.3) 0%, rgba(182, 138, 67, 0.12) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(245, 215, 175, 0.32) 0%, rgba(196, 61, 77, 0.12) 50%, transparent 75%)',
          opacity: auraOpacity,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* --- ARCHITECTURAL OR FLORAL ARCHWAY OUTLINE --- */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        {isArchitectural ? (
          /* Classical South Indian Temple Mandap Archway */
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="groomArchGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFBA73" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#B68A43" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#825F28" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Master Arch Curve */}
            <path
              d="M30 280 V130 C30 50, 160 16, 160 16 C160 16, 290 50, 290 130 V280"
              stroke="url(#groomArchGold)"
              strokeWidth="1.5"
              strokeDasharray="none"
            />
            {/* Inner Echo Arch */}
            <path
              d="M40 280 V132 C40 64, 160 34, 160 34 C160 34, 280 64, 280 132 V280"
              stroke="url(#groomArchGold)"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />

            {/* Apex Temple Kalasha Finial */}
            <g transform="translate(160, 16)">
              <circle cx="0" cy="-6" r="4" fill="#DFBA73" />
              <path d="M0 -15 L3 -7 L-3 -7 Z" fill="#DFBA73" />
              <circle cx="0" cy="-6" r="1.5" fill="#27080D" />
            </g>

            {/* Pillar Capital Flutes */}
            <line x1="24" y1="130" x2="36" y2="130" stroke="#DFBA73" strokeWidth="1.5" />
            <line x1="284" y1="130" x2="296" y2="130" stroke="#DFBA73" strokeWidth="1.5" />
          </svg>
        ) : (
          /* Graceful Jasmine & Lotus Bridal Floral Archway */
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="brideFloralGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5E5C0" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#DFBA73" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#B68A43" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* Delicate Curved Floral Vine */}
            <path
              d="M32 280 C32 120, 70 30, 160 30 C250 30, 288 120, 288 280"
              stroke="url(#brideFloralGold)"
              strokeWidth="1.4"
            />
            <path
              d="M42 280 C42 135, 78 44, 160 44 C242 44, 278 135, 278 280"
              stroke="url(#brideFloralGold)"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />

            {/* Top Center Lotus Blossom */}
            <g transform="translate(160, 30)">
              {/* Central petal */}
              <path d="M0 -10 C-4 -4, -3 2, 0 6 C3 2, 4 -4, 0 -10Z" fill="#F8F3E9" stroke="#DFBA73" strokeWidth="0.8" />
              {/* Left petal */}
              <path d="M-2 4 C-8 1, -10 -4, -8 -8 C-6 -4, -4 0, -2 4Z" fill="#F8F3E9" stroke="#DFBA73" strokeWidth="0.8" />
              {/* Right petal */}
              <path d="M2 4 C8 1, 10 -4, 8 -8 C6 -4, 4 0, 2 4Z" fill="#F8F3E9" stroke="#DFBA73" strokeWidth="0.8" />
              {/* Gold center seed */}
              <circle cx="0" cy="3" r="2" fill="#DFBA73" />
            </g>

            {/* Dainty Jasmine Buds along the Arch */}
            <circle cx="68" cy="85" r="2.5" fill="#FFFFFF" stroke="#DFBA73" strokeWidth="0.6" />
            <circle cx="108" cy="48" r="2.5" fill="#FFFFFF" stroke="#DFBA73" strokeWidth="0.6" />
            <circle cx="212" cy="48" r="2.5" fill="#FFFFFF" stroke="#DFBA73" strokeWidth="0.6" />
            <circle cx="252" cy="85" r="2.5" fill="#FFFFFF" stroke="#DFBA73" strokeWidth="0.6" />
          </svg>
        )}
      </div>

      {/* --- CHARACTER ILLUSTRATION CONTENT --- */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

