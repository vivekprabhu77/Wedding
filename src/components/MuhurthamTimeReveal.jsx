import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DETAILS } from '../data/weddingDetails';

/**
 * MuhurthamTimeReveal Component
 * STAGE 3: Sacred Muhurtham Time Reveal
 *
 * Sequence:
 * 1. THE MUHURTHAM (classical uppercase tracking header)
 * 2. Delicate ornamental gold divider
 * 3. 11:15 AM (prominent ceremonial time with warm antique gold framing)
 */
export default function MuhurthamTimeReveal({
  containerOpacity,
  containerY,
  titleOpacity,
  titleY,
  timeOpacity,
  timeScale,
  timeY,
  isCompact = false,
  isShortViewport = false,
}) {
  const { date } = WEDDING_DETAILS;

  return (
    <motion.div
      className="muhurtham-time-reveal"
      style={{
        opacity: containerOpacity,
        y: containerY,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: isCompact
          ? isShortViewport
            ? '8px'
            : '14px'
          : 'clamp(12px, 2.5vh, 22px)',
        width: '100%',
        maxWidth: '460px',
      }}
    >
      {/* Delicate Ornamental Time Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          maxWidth: isCompact ? '160px' : '200px',
          marginBottom: isCompact ? (isShortViewport ? '5px' : '8px') : '8px',
        }}
        aria-hidden="true"
      >
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(182, 138, 67, 0.55))' }} />
        <span style={{ color: 'var(--color-gold-bright)', fontSize: '0.62rem' }}>✧</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(182, 138, 67, 0.55))' }} />
      </div>

      {/* 1. Header: THE MUHURTHAM */}
      <motion.div
        style={{
          opacity: titleOpacity,
          y: titleY,
          fontFamily: 'var(--font-display)',
          fontSize: isCompact
            ? isShortViewport
              ? '0.82rem'
              : 'clamp(0.88rem, 3.5vw, 0.98rem)'
            : 'clamp(0.8rem, 1.3vw, 0.92rem)',
          letterSpacing: isCompact ? '0.16em' : '0.22em',
          color: 'var(--color-gold-light)',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: isCompact ? '3px' : '6px',
        }}
      >
        {date.muhurthamTitle || 'THE MUHURTHAM'}
      </motion.div>

      {/* 2. Prominent Ceremonial Time: 11:15 AM */}
      <motion.div
        style={{
          opacity: timeOpacity,
          scale: timeScale,
          y: timeY,
          padding: isCompact
            ? isShortViewport
              ? '4px 18px'
              : '6px 24px'
            : 'clamp(6px, 1.2vh, 10px) clamp(18px, 4vw, 32px)',
          borderRadius: '4px',
          border: isCompact ? 'none' : '1px solid rgba(182, 138, 67, 0.55)',
          background: isCompact
            ? 'radial-gradient(ellipse at 50% 50%, rgba(182, 138, 67, 0.16) 0%, transparent 78%)'
            : 'linear-gradient(180deg, rgba(182, 138, 67, 0.16) 0%, rgba(39, 8, 13, 0.5) 100%)',
          boxShadow: isCompact
            ? 'none'
            : '0 4px 20px rgba(0, 0, 0, 0.45), inset 0 0 12px rgba(182, 138, 67, 0.15)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: isCompact
              ? isShortViewport
                ? 'clamp(1.78rem, 7vw, 2.08rem)'
                : 'clamp(2.1rem, 8vw, 2.6rem)'
              : 'clamp(1.85rem, 4.2vw, 2.8rem)',
            fontWeight: 700,
            letterSpacing: '0.07em',
            lineHeight: 1.15,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF4D0 40%, #E6C47A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.65)',
            display: 'inline-block',
          }}
        >
          {date.muhurtham || '11:15 AM'}
        </span>
      </motion.div>
    </motion.div>
  );
}

