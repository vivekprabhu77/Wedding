import React from 'react';
import { motion } from 'framer-motion';
import { Kuthuvillakku, PurnaKalashaMedallion, TempleCornerBracket } from './CeremonialDecoration';

/**
 * CeremonialFrame Component
 * An authentic traditional South Indian ceremonial temple frame with:
 * - Sacred Kalasha at top center
 * - Traditional brass corner brackets
 * - Flanking Kuthuvillakku oil lamps with warm jyoti illumination
 * - Subtle ivory/gold parchment inlay
 */
export default function CeremonialFrame({
  children,
  frameScale,
  frameOpacity,
  lampGlow = 1,
  style = {},
}) {
  return (
    <motion.div
      className="ceremonial-shrine-frame"
      style={{
        scale: frameScale,
        opacity: frameOpacity,
        width: '100%',
        maxWidth: 'min(580px, 91vw)',
        margin: '0 auto',
        padding: 'clamp(18px, 3.5vw, 34px) clamp(14px, 3vw, 28px)',
        position: 'relative',
        boxSizing: 'border-box',
        borderRadius: '6px',
        border: '1.5px solid rgba(182, 138, 67, 0.55)',
        background:
          'radial-gradient(ellipse at 50% 36%, rgba(248, 243, 233, 0.08) 0%, rgba(74, 18, 26, 0.45) 45%, rgba(39, 8, 13, 0.88) 100%)',
        boxShadow:
          '0 24px 60px rgba(0, 0, 0, 0.75), inset 0 0 40px rgba(182, 138, 67, 0.1)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      {/* Inner Delicate Inlay Border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '7px',
          border: '1px solid rgba(223, 186, 115, 0.35)',
          borderRadius: '4px',
          pointerEvents: 'none',
        }}
      />

      {/* 4 Traditional Temple Corner Brackets */}
      <TempleCornerBracket corner="top-left" />
      <TempleCornerBracket corner="top-right" />
      <TempleCornerBracket corner="bottom-left" />
      <TempleCornerBracket corner="bottom-right" />

      {/* Flanking Traditional South Indian Kuthuvillakku Lamps */}
      <Kuthuvillakku side="left" glowIntensity={lampGlow} />
      <Kuthuvillakku side="right" glowIntensity={lampGlow} />

      {/* Top Sacred Kalasha Medallion & Temple Archway Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px',
        }}
      >
        <PurnaKalashaMedallion size={46} />
        {/* Fine gold decorative line beneath kalasha */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            maxWidth: '240px',
            marginTop: '6px',
          }}
          aria-hidden="true"
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-antique-gold))' }} />
          <span style={{ color: 'var(--color-gold-bright)', fontSize: '0.65rem' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, var(--color-antique-gold))' }} />
        </div>
      </div>

      {/* Children: The staged reveals */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}

