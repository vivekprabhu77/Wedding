import React from 'react';
import { motion } from 'framer-motion';

/**
 * MandapCanopyArch
 * Ornate South Indian Kalyana Mandapa temple roof Vimana, Kalasha finial,
 * and wide sweeping cornice lintel that rests flush atop twin pillars.
 */
export function MandapCanopyArch({ archOpacity, isCompact = false, isShortViewport = false }) {
  return (
    <motion.div
      className="mandap-canopy-arch"
      style={{
        opacity: archOpacity,
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 6,
      }}
      aria-hidden="true"
    >
      {/* Ornate Temple Roof Vimana & Kalasha Arch resting directly on both pillars */}
      <svg
        viewBox="0 0 700 56"
        preserveAspectRatio={isCompact ? 'none' : 'xMidYMid meet'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: isCompact ? (isShortViewport ? '28px' : '38px') : 'auto',
          display: 'block',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id="mandap-gold-arch" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#825F28" />
            <stop offset="25%" stopColor="#DFBA73" />
            <stop offset="50%" stopColor="#FFF0C2" />
            <stop offset="75%" stopColor="#DFBA73" />
            <stop offset="100%" stopColor="#825F28" />
          </linearGradient>

          <linearGradient id="mandap-gold-vert" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="45%" stopColor="#DFBA73" />
            <stop offset="100%" stopColor="#825F28" />
          </linearGradient>

          <linearGradient id="mandap-maroon-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#701F2A" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#27080D" stopOpacity="0.96" />
          </linearGradient>
        </defs>

        {/* Central Temple Gopuram Finial / Kalasha Crown */}
        <path
          d="M350 2 C347.5 8 343 12 343 17 C343 21.5 346 23.5 350 23.5 C354 23.5 357 21.5 357 17 C357 12 352.5 8 350 2 Z"
          fill="url(#mandap-gold-vert)"
        />
        <rect x="341" y="23.5" width="18" height="3" rx="1" fill="url(#mandap-gold-arch)" />

        {/* Stepped Royal Mandap Shikhara / Canopy Dome */}
        <path
          d="M262 44 C284 27 318 24 350 24 C382 24 416 27 438 44 Z"
          fill="url(#mandap-maroon-fill)"
          stroke="url(#mandap-gold-arch)"
          strokeWidth="1.5"
        />
        <path
          d="M292 44 C308 31 328 29 350 29 C372 29 392 31 408 44"
          stroke="#F5E5C0"
          strokeWidth="0.7"
          strokeOpacity="0.45"
        />
        {/* Inner Carved Chakra / Lotus Emblem on Arch Crest */}
        <circle cx="350" cy="36" r="4.5" fill="url(#mandap-gold-vert)" />
        <circle cx="350" cy="36" r="1.8" fill="#701F2A" />

        {/* Left & Right Pillar-Crown Finials seated directly above the pillars */}
        <path d="M22 30 L28 44 H16 Z" fill="url(#mandap-gold-vert)" />
        <circle cx="22" cy="27" r="2.2" fill="#FFF2D6" />
        <path d="M678 30 L684 44 H672 Z" fill="url(#mandap-gold-vert)" />
        <circle cx="678" cy="27" r="2.2" fill="#FFF2D6" />

        {/* Sweeping Temple Cornice / Lintel Beam Spanning Outer Pillar-to-Pillar */}
        <path
          d="M10 44 H690 L698 55 H2 Z"
          fill="url(#mandap-maroon-fill)"
          stroke="url(#mandap-gold-arch)"
          strokeWidth="1.6"
        />
        <line
          x1="12"
          y1="49.5"
          x2="688"
          y2="49.5"
          stroke="#F5E5C0"
          strokeWidth="0.75"
          strokeOpacity="0.55"
        />
      </svg>
    </motion.div>
  );
}

/**
 * MandapFloralToranam
 * Scalloped jasmine strands, Amra Pallava (mango leaves), and crimson rose tassels
 * suspended right beneath the mandap cornice beam between both carved pillars.
 */
export function MandapFloralToranam({
  floralOpacity,
  floralY,
  isCompact = false,
  isUltraNarrow = false,
  isShortViewport = false,
}) {
  return (
    <motion.div
      className="mandap-floral-toranam"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: isUltraNarrow ? '14px' : isCompact ? '18px' : 'clamp(28px, 4.4vw, 44px)',
        right: isUltraNarrow ? '14px' : isCompact ? '18px' : 'clamp(28px, 4.4vw, 44px)',
        opacity: floralOpacity,
        y: floralY,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <svg
        viewBox="0 0 600 42"
        preserveAspectRatio={isCompact ? 'none' : 'xMidYMid meet'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: isCompact ? (isShortViewport ? '18px' : '24px') : 'auto',
          display: 'block',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id="mandap-toranam-scallop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B68A43" />
            <stop offset="50%" stopColor="#F5E5C0" />
            <stop offset="100%" stopColor="#B68A43" />
          </linearGradient>
        </defs>

        {/* Subtle Engraved Brass Ceiling Arch Scallops */}
        <path
          d="M0 1 Q75 18 150 2 Q225 18 300 2 Q375 18 450 2 Q525 18 600 1"
          stroke="url(#mandap-toranam-scallop)"
          strokeWidth="1.2"
          strokeOpacity="0.8"
          fill="none"
        />

        {/* Scalloped White Jasmine Garland Strands */}
        <path
          d="M14 4 Q85 32 156 6 Q228 32 300 6 Q372 32 444 6 Q515 32 586 4"
          stroke="#F8F3E9"
          strokeWidth="3.2"
          strokeDasharray="1 5.5"
          strokeLinecap="round"
        />
        <path
          d="M14 4 Q85 32 156 6 Q228 32 300 6 Q372 32 444 6 Q515 32 586 4"
          stroke="#DFBA73"
          strokeWidth="0.65"
          strokeOpacity="0.6"
        />

        {/* Mango Leaves (Amra Pallava) Draped at Garland Nodes */}
        {[58, 114, 198, 256, 344, 402, 486, 542].map((x) => (
          <g key={x} transform={`translate(${x}, 10)`}>
            <path
              d="M0 0 C-3.5 6 -2.5 14 0 18 C2.5 14 3.5 6 0 0 Z"
              fill="#263D30"
              stroke="#B68A43"
              strokeWidth="0.65"
            />
          </g>
        ))}

        {/* Corner Marigold Rosettes flanking the Pillars */}
        {[14, 586].map((x) => (
          <circle key={`corner-${x}`} cx={x} cy="6" r="3.6" fill="#DFBA73" stroke="#825F28" strokeWidth="0.7" />
        ))}

        {/* Marigold & Crimson Rose Floral Tassels at Inner Arch Peaks */}
        {[156, 300, 444].map((x) => (
          <g key={x} transform={`translate(${x}, 5)`}>
            <line x1="0" y1="0" x2="0" y2="19" stroke="#F8F3E9" strokeWidth="1.4" strokeDasharray="1.5 2.5" />
            <circle cx="0" cy="4" r="4" fill="#DFBA73" stroke="#825F28" strokeWidth="0.7" />
            <circle cx="0" cy="22" r="3.2" fill="#8C2634" stroke="#DFBA73" strokeWidth="0.7" />
            <circle cx="0" cy="22" r="1.1" fill="#F8F3E9" />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

/**
 * MandapPillar
 * Traditional carved South Indian temple column (Stambha) with stepped plinth,
 * fluted gold shaft rings, lotus capital, and ornamental bracket.
 */
export function MandapPillar({ side = 'left', isCompact = false, isUltraNarrow = false }) {
  const isLeft = side === 'left';
  return (
    <div
      className={`mandap-pillar mandap-pillar-${side}`}
      aria-hidden="true"
      style={{
        width: isUltraNarrow ? '14px' : isCompact ? '18px' : 'clamp(34px, 5vw, 52px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        pointerEvents: 'none',
        transform: isLeft ? 'none' : 'scaleX(-1)',
      }}
    >
      <svg
        viewBox="0 0 56 380"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <linearGradient id={`mandap-pillar-shaft-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6D4D1D" />
            <stop offset="28%" stopColor="#DFBA73" />
            <stop offset="52%" stopColor="#F5E5C0" />
            <stop offset="78%" stopColor="#B68A43" />
            <stop offset="100%" stopColor="#5C4018" />
          </linearGradient>

          <linearGradient id={`mandap-pillar-stone-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E0B10" />
            <stop offset="45%" stopColor="#5E1922" />
            <stop offset="100%" stopColor="#27080D" />
          </linearGradient>
        </defs>

        {/* Top Temple Capital / Bodhigai Bracket */}
        <path d="M4 0 H52 L44 18 H12 Z" fill={`url(#mandap-pillar-shaft-${side})`} />
        <rect x="8" y="18" width="40" height="8" rx="1.5" fill={`url(#mandap-pillar-stone-${side})`} stroke="#DFBA73" strokeWidth="1" />
        {/* Lotus Neck Ring */}
        <path d="M12 26 C18 34 38 34 44 26 Z" fill={`url(#mandap-pillar-shaft-${side})`} />

        {/* Vertical Fluted Pillar Shaft */}
        <rect x="16" y="32" width="24" height="304" fill={`url(#mandap-pillar-stone-${side})`} stroke="#B68A43" strokeWidth="1.2" />
        {/* Inner gold vertical flutes */}
        <line x1="22" y1="36" x2="22" y2="332" stroke="#DFBA73" strokeWidth="0.9" strokeOpacity="0.65" />
        <line x1="28" y1="36" x2="28" y2="332" stroke="#F5E5C0" strokeWidth="1.1" strokeOpacity="0.8" />
        <line x1="34" y1="36" x2="34" y2="332" stroke="#DFBA73" strokeWidth="0.9" strokeOpacity="0.65" />

        {/* Carved Ornamental Bands Along Shaft */}
        {[90, 185, 280].map((yPos) => (
          <g key={yPos} transform={`translate(0, ${yPos})`}>
            <rect x="13" y="0" width="30" height="8" rx="1.5" fill={`url(#mandap-pillar-shaft-${side})`} />
            <circle cx="28" cy="4" r="2" fill="#701F2A" />
          </g>
        ))}

        {/* Base Molding & Stepped Temple Plinth (Adhishthana) */}
        <path d="M12 336 H44 L48 348 H8 Z" fill={`url(#mandap-pillar-shaft-${side})`} />
        <rect x="6" y="348" width="44" height="12" rx="1" fill={`url(#mandap-pillar-stone-${side})`} stroke="#DFBA73" strokeWidth="1.1" />
        <rect x="2" y="360" width="52" height="18" rx="2" fill={`url(#mandap-pillar-shaft-${side})`} />
      </svg>
    </div>
  );
}

/**
 * ThookuVilakku
 * Antique hanging temple brass oil lamp suspended gracefully from the mandap beam.
 */
export function ThookuVilakku({ side = 'left', glowOpacity, isCompact = false }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: isCompact ? '6px' : '12px',
        [side === 'left' ? 'left' : 'right']: isCompact ? '24px' : 'clamp(50px, 6.6vw, 66px)',
        width: isCompact ? '16px' : 'clamp(22px, 2.8vw, 28px)',
        pointerEvents: 'none',
        zIndex: 6,
        opacity: glowOpacity,
      }}
    >
      <svg viewBox="0 0 36 86" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <radialGradient id={`mandap-lamp-aura-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="1" />
            <stop offset="50%" stopColor="#FF9800" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#B68A43" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Brass suspension chain */}
        <line x1="18" y1="0" x2="18" y2="34" stroke="#DFBA73" strokeWidth="1.4" strokeDasharray="2 2" />
        {/* Warm jyoti aura */}
        <circle cx="18" cy="48" r="14" fill={`url(#mandap-lamp-aura-${side})`} />
        {/* Sacred flame */}
        <path d="M18 39 C19.5 44 21 47 21 50 C21 52.5 19.6 54 18 54 C16.4 54 15 52.5 15 50 C15 47 16.5 44 18 39 Z" fill="#FFF9C4" />
        <path d="M18 43 C19 46 20 48 20 50 C20 51.5 19 52.5 18 52.5 C17 52.5 16 51.5 16 50 C16 48 17 46 18 43 Z" fill="#FFB300" />
        {/* Brass oil dish */}
        <path d="M6 54 H30 C28 62 23 66 18 66 C13 66 8 62 6 54 Z" fill="#DFBA73" stroke="#825F28" strokeWidth="0.8" />
        {/* Finial bottom drop */}
        <path d="M18 66 L20.5 72 L18 78 L15.5 72 Z" fill="#B68A43" />
      </svg>
    </motion.div>
  );
}

/**
 * LocationRouteMotif
 * Handcrafted traditional route path & illustrated temple location pin emblem.
 * Uses Framer Motion pathLength so the dotted ceremonial path draws smoothly on scroll.
 */
export function LocationRouteMotif({
  pathProgress,
  pinOpacity,
  pinY,
  pinScale,
  isCompact = false,
  isShortViewport = false,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: isCompact ? (isShortViewport ? '150px' : '185px') : '240px',
        margin: '0 auto',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 240 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          maxHeight: isCompact ? (isShortViewport ? '26px' : '34px') : '42px',
          height: 'auto',
          overflow: 'visible',
        }}
      >
        {/* Origin Lotus Diamond Point (Left) */}
        <motion.g style={{ opacity: pinOpacity }}>
          <polygon points="24,28 29,33 24,38 19,33" fill="none" stroke="#DFBA73" strokeWidth="1.2" />
          <circle cx="24" cy="33" r="1.8" fill="#F5E5C0" />
        </motion.g>

        {/* Scroll-Animated Ceremonial Dotted Journey Arc (GPU transform, zero SVG stroke re-layout) */}
        <motion.path
          d="M34 33 C72 16 105 42 150 26 C168 19 182 22 198 31"
          stroke="#DFBA73"
          strokeWidth="1.4"
          strokeDasharray="3 4"
          strokeLinecap="round"
          fill="none"
          style={{ scaleX: pathProgress, opacity: pinOpacity, transformOrigin: '34px 33px' }}
        />

        {/* Subtle destination halo ring */}
        <motion.ellipse
          cx="208"
          cy="35"
          rx="11"
          ry="4"
          stroke="#DFBA73"
          strokeWidth="0.9"
          strokeOpacity="0.55"
          style={{ opacity: pinOpacity, scale: pinScale }}
        />

        {/* Illustrated Traditional Location Marker Pin (Right Destination) */}
        <motion.g style={{ opacity: pinOpacity, y: pinY, scale: pinScale, transformOrigin: '208px 34px' }}>
          <path
            d="M208 6 C201.4 6 196 11.4 196 18 C196 25.5 208 35 208 35 C208 35 220 25.5 220 18 C220 11.4 214.6 6 208 6 Z"
            fill="#701F2A"
            stroke="#F5E5C0"
            strokeWidth="1.5"
          />
          <circle cx="208" cy="17.5" r="4.5" fill="#DFBA73" />
          <circle cx="208" cy="17.5" r="2" fill="#27080D" />
        </motion.g>
      </svg>
    </div>
  );
}
