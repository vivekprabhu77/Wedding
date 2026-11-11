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
  isCompact = false,
  isShortViewport = false,
  style = {},
}) {
  return (
    <motion.div
      className="ceremonial-shrine-frame"
      style={{
        scale: frameScale,
        opacity: frameOpacity,
        width: '100%',
        maxWidth: isCompact ? 'min(420px, calc(100vw - 28px))' : 'min(580px, 91vw)',
        margin: '0 auto',
        padding: isCompact
          ? isShortViewport
            ? '12px 14px 13px'
            : '18px 18px 20px'
          : 'clamp(18px, 3.5vw, 34px) clamp(14px, 3vw, 28px)',
        position: 'relative',
        boxSizing: 'border-box',
        borderRadius: isCompact ? '8px' : '6px',
        border: isCompact
          ? '1px solid rgba(223, 186, 115, 0.36)'
          : '1.5px solid rgba(182, 138, 67, 0.55)',
        background: isCompact
          ? 'radial-gradient(ellipse at 50% 38%, rgba(248, 243, 233, 0.06) 0%, rgba(56, 14, 20, 0.52) 55%, rgba(30, 7, 11, 0.84) 100%)'
          : 'radial-gradient(ellipse at 50% 36%, rgba(248, 243, 233, 0.08) 0%, rgba(74, 18, 26, 0.45) 45%, rgba(39, 8, 13, 0.88) 100%)',
        boxShadow: isCompact
          ? '0 16px 40px rgba(0, 0, 0, 0.6), inset 0 0 24px rgba(182, 138, 67, 0.08)'
          : '0 24px 60px rgba(0, 0, 0, 0.75), inset 0 0 40px rgba(182, 138, 67, 0.1)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      {/* Inner Delicate Inlay Border (desktop/tablet shrine view only; kept open on mobile) */}
      {!isCompact && (
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
      )}

      {/* 4 Traditional Temple Corner Brackets (kept off narrow screens to prevent collision) */}
      {!isCompact && (
        <>
          <TempleCornerBracket corner="top-left" />
          <TempleCornerBracket corner="top-right" />
          <TempleCornerBracket corner="bottom-left" />
          <TempleCornerBracket corner="bottom-right" />
        </>
      )}

      {/* Flanking Traditional South Indian Kuthuvillakku Lamps (desktop/tablet composition) */}
      {!isCompact && (
        <>
          <Kuthuvillakku side="left" glowIntensity={lampGlow} />
          <Kuthuvillakku side="right" glowIntensity={lampGlow} />
        </>
      )}

      {/* Top Sacred Kalasha Medallion & Temple Archway Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: isCompact ? (isShortViewport ? '5px' : '9px') : '10px',
        }}
      >
        <PurnaKalashaMedallion
          size={isCompact ? (isShortViewport ? 30 : 38) : 46}
        />
        {/* Fine gold decorative line beneath kalasha */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            maxWidth: isCompact ? '180px' : '240px',
            marginTop: isCompact ? '4px' : '6px',
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

