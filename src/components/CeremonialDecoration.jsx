import React from 'react';
import { motion } from 'framer-motion';

/**
 * Traditional South Indian Ceremonial Brass Oil Lamp (Kuthuvillakku / Hanging Deepam)
 * Renders an authentic multi-tier brass lamp with gentle warm jyoti (flame) illumination.
 */
export function Kuthuvillakku({ side = 'left', glowIntensity = 1, style = {} }) {
  const isLeft = side === 'left';
  return (
    <div
      className={`ceremonial-lamp lamp-${side}`}
      style={{
        position: 'absolute',
        top: 'clamp(24px, 5.5vh, 55px)',
        [isLeft ? 'left' : 'right']: 'clamp(6px, 1.8vw, 16px)',
        width: 'clamp(24px, 5vw, 42px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 5,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 60 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto' }}
      >
        <defs>
          <linearGradient id={`goldGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA73" />
            <stop offset="45%" stopColor="#B68A43" />
            <stop offset="85%" stopColor="#F5E5C0" />
            <stop offset="100%" stopColor="#825F28" />
          </linearGradient>

          <radialGradient id={`flameGlow-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="1" />
            <stop offset="40%" stopColor="#FF9800" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FF5722" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#B68A43" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Top Hanging Brass Chain Links */}
        <line x1="30" y1="0" x2="30" y2="40" stroke={`url(#goldGrad-${side})`} strokeWidth="2.5" strokeDasharray="3 3" />
        <circle cx="30" cy="40" r="4" fill={`url(#goldGrad-${side})`} />

        {/* Ornate Brass Bell Finial */}
        <path
          d="M22 44 C22 44 26 48 30 48 C34 48 38 44 38 44 L36 54 H24 Z"
          fill={`url(#goldGrad-${side})`}
        />

        {/* Sacred Flame (Jyoti) with aura */}
        <motion.ellipse
          cx="30"
          cy="74"
          rx="14"
          ry="20"
          fill={`url(#flameGlow-${side})`}
          style={{ opacity: glowIntensity }}
        />
        <path
          d="M30 60 C32 68 35 74 35 78 C35 83 32.8 86 30 86 C27.2 86 25 83 25 78 C25 74 28 68 30 60 Z"
          fill="#FFF9C4"
        />
        <path
          d="M30 66 C31.2 71 33 75 33 78 C33 81 31.6 83 30 83 C28.4 83 27 81 27 78 C27 75 28.8 71 30 66 Z"
          fill="#FFB300"
        />

        {/* Deepam Oil Bowl / Thattu */}
        <ellipse cx="30" cy="86" rx="22" ry="6" fill={`url(#goldGrad-${side})`} />
        <path
          d="M8 86 C8 96 18 104 30 104 C42 104 52 96 52 86 Z"
          fill={`url(#goldGrad-${side})`}
        />
        {/* Spout detail */}
        <circle cx="12" cy="86" r="2" fill="#FFE082" />
        <circle cx="48" cy="86" r="2" fill="#FFE082" />

        {/* Fluted Middle Stem (Stambha) with ornamental ridges */}
        <rect x="27" y="104" width="6" height="50" rx="2" fill={`url(#goldGrad-${side})`} />
        <ellipse cx="30" cy="116" rx="10" ry="3.5" fill={`url(#goldGrad-${side})`} />
        <ellipse cx="30" cy="136" rx="8" ry="3" fill={`url(#goldGrad-${side})`} />

        {/* Lower Secondary Bowl (Step Tier) */}
        <ellipse cx="30" cy="154" rx="16" ry="4" fill={`url(#goldGrad-${side})`} />
        <path d="M14 154 C14 162 20 168 30 168 C40 168 46 162 46 154 Z" fill={`url(#goldGrad-${side})`} />

        {/* Fluted Base Column */}
        <rect x="26" y="168" width="8" height="18" rx="2" fill={`url(#goldGrad-${side})`} />

        {/* Pedestal / Peetham (Curved Bell Base) */}
        <path
          d="M10 212 C14 194 22 186 30 186 C38 186 46 194 50 212 Z"
          fill={`url(#goldGrad-${side})`}
        />
        <rect x="6" y="212" width="48" height="6" rx="2" fill={`url(#goldGrad-${side})`} />
      </svg>
    </div>
  );
}

/**
 * Traditional Purna Kalasha Medallion
 * Represents auspicious fullness, coconut, mango leaves, and sacred chandan water vessel.
 */
export function PurnaKalashaMedallion({ size = 52, style = {} }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="kalashaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA73" />
            <stop offset="50%" stopColor="#B68A43" />
            <stop offset="100%" stopColor="#F5E5C0" />
          </linearGradient>
        </defs>

        {/* Mango Leaves (Amra Pallava) */}
        <path
          d="M32 4 C30 12 24 18 20 22 C26 21 31 16 32 4 Z"
          fill="#3B5E43"
          stroke="#B68A43"
          strokeWidth="0.8"
        />
        <path
          d="M32 4 C34 12 40 18 44 22 C38 21 33 16 32 4 Z"
          fill="#3B5E43"
          stroke="#B68A43"
          strokeWidth="0.8"
        />
        <path
          d="M32 2 C30 10 32 18 32 24 C32 18 34 10 32 2 Z"
          fill="#4D7856"
          stroke="#DFBA73"
          strokeWidth="0.8"
        />

        {/* Sacred Coconut (Nariyal) */}
        <circle cx="32" cy="20" r="8" fill="#8D5B4C" stroke="#DFBA73" strokeWidth="1" />
        <circle cx="32" cy="18" r="2.5" fill="#E65100" />

        {/* Kalasha Neck Ring */}
        <rect x="24" y="27" width="16" height="4" rx="2" fill="url(#kalashaGold)" />

        {/* Kalasha Pot Body (Kumbha) */}
        <path
          d="M24 30 C16 32 14 42 18 50 C22 55 26 56 32 56 C38 56 42 55 46 50 C50 42 48 32 40 30 Z"
          fill="url(#kalashaGold)"
          stroke="#DFBA73"
          strokeWidth="1.2"
        />

        {/* Sacred Swastika / Auspicious Center Symbol */}
        <circle cx="32" cy="42" r="3.5" fill="#701F2A" />
        <path d="M32 37 V47 M27 42 H37" stroke="#F5E5C0" strokeWidth="1.2" strokeLinecap="round" />

        {/* Pedestal Base */}
        <rect x="22" y="56" width="20" height="4" rx="1.5" fill="url(#kalashaGold)" />
      </svg>
    </div>
  );
}

/**
 * Traditional South Indian Brass Temple Corner Filigree
 */
export function TempleCornerBracket({ corner = 'top-left' }) {
  const isTop = corner.startsWith('top');
  const isLeft = corner.endsWith('left');

  return (
    <div
      style={{
        position: 'absolute',
        top: isTop ? '8px' : 'auto',
        bottom: !isTop ? '8px' : 'auto',
        left: isLeft ? '8px' : 'auto',
        right: !isLeft ? '8px' : 'auto',
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        transform: `scale(${isLeft ? 1 : -1}, ${isTop ? 1 : -1})`,
        opacity: 0.8,
      }}
      aria-hidden="true"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M2 2 H28 M2 2 V28" stroke="var(--color-antique-gold)" strokeWidth="1.8" />
        <path d="M6 6 H22 M6 6 V22" stroke="var(--color-gold-light)" strokeWidth="1" opacity="0.6" />
        <circle cx="6" cy="6" r="2.5" fill="var(--color-gold-bright)" />
        <path d="M2 14 C6 14 14 6 14 2" stroke="var(--color-antique-gold)" strokeWidth="1.2" />
        <circle cx="18" cy="2" r="1.5" fill="var(--color-gold-light)" />
        <circle cx="2" cy="18" r="1.5" fill="var(--color-gold-light)" />
      </svg>
    </div>
  );
}

