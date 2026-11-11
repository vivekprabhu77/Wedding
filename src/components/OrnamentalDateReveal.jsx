import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DETAILS } from '../data/weddingDetails';

/**
 * OrnamentalDateReveal Component
 * STAGE 2: Auspicious Wedding Date Reveal
 *
 * Sequence:
 * 1. THE AUSPICIOUS DAY (small uppercase tracking label)
 * 2. THURSDAY (classical ceremonial serif)
 * 3. 26 (Dominant monumental hero numeral)
 * 4. NOVEMBER 2026 (refined classical serif)
 * 5. Kannada auspicious date inscription
 */
export default function OrnamentalDateReveal({
  labelOpacity,
  labelY,
  dayOpacity,
  dayY,
  dateNumberOpacity,
  dateNumberScale,
  dateNumberY,
  monthYearOpacity,
  monthYearY,
  kannadaOpacity,
  kannadaY,
  isCompact = false,
  isUltraNarrow = false,
  isShortViewport = false,
}) {
  const { date } = WEDDING_DETAILS;

  return (
    <div
      className="ornamental-date-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      {/* 1. Auspicious Day Label */}
      <motion.div
        style={{
          opacity: labelOpacity,
          y: labelY,
          fontFamily: 'var(--font-display)',
          fontSize: isCompact
            ? isShortViewport
              ? '0.82rem'
              : 'clamp(0.88rem, 3.5vw, 0.98rem)'
            : 'clamp(0.76rem, 1.25vw, 0.9rem)',
          letterSpacing: isCompact ? '0.15em' : '0.24em',
          color: 'var(--color-gold-light)',
          textTransform: 'uppercase',
          marginBottom: isCompact ? '3px' : '4px',
          fontWeight: 600,
        }}
      >
        {date.auspiciousDayLabel || 'THE AUSPICIOUS DAY'}
      </motion.div>

      {/* 2. Weekday: THURSDAY */}
      <motion.div
        style={{
          opacity: dayOpacity,
          y: dayY,
          fontFamily: 'var(--font-display)',
          fontSize: isCompact
            ? isShortViewport
              ? '1.12rem'
              : 'clamp(1.24rem, 4.6vw, 1.42rem)'
            : 'clamp(1.25rem, 2.5vw, 1.78rem)',
          letterSpacing: isCompact ? '0.15em' : '0.18em',
          color: 'var(--color-gold-bright)',
          textTransform: 'uppercase',
          fontWeight: 600,
          margin: isCompact ? '1px 0 3px' : '2px 0 6px',
          textShadow: '0 2px 10px rgba(0,0,0,0.6)',
        }}
      >
        {date.dayUpper || 'THURSDAY'}
      </motion.div>

      {/* 3. MONUMENTAL DATE NUMBER: 26 (Visual Hero) */}
      <motion.div
        className="monumental-date-hero"
        style={{
          opacity: dateNumberOpacity,
          scale: dateNumberScale,
          y: dateNumberY,
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: isCompact ? '1px 0' : '2px 0',
        }}
      >
        {/* Subtle decorative gold flanking wings (hidden on ultra-narrow screens for breathing room) */}
        {!isUltraNarrow && (
          <span
            aria-hidden="true"
            style={{
              color: 'var(--color-antique-gold)',
              fontSize: isCompact ? '1.25rem' : 'clamp(1.25rem, 3vw, 2.2rem)',
              opacity: 0.65,
              marginRight: isCompact ? '10px' : 'clamp(8px, 2vw, 16px)',
            }}
          >
            ❧
          </span>
        )}

        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: isCompact
              ? isShortViewport
                ? 'clamp(3.35rem, 13vw, 3.9rem)'
                : 'clamp(4.1rem, 15.5vw, 5.1rem)'
              : 'clamp(4.4rem, 11vw, 7.6rem)',
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF0C2 35%, #DFBA73 70%, #B68A43 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 6px 18px rgba(0, 0, 0, 0.82), 0 0 22px rgba(223, 186, 115, 0.25)',
            display: 'inline-block',
          }}
        >
          {date.dateNumber || '26'}
        </span>

        {!isUltraNarrow && (
          <span
            aria-hidden="true"
            style={{
              color: 'var(--color-antique-gold)',
              fontSize: isCompact ? '1.25rem' : 'clamp(1.25rem, 3vw, 2.2rem)',
              opacity: 0.65,
              marginLeft: isCompact ? '10px' : 'clamp(8px, 2vw, 16px)',
              transform: 'scaleX(-1)',
              display: 'inline-block',
            }}
          >
            ❧
          </span>
        )}
      </motion.div>

      {/* 4. Month & Year: NOVEMBER 2026 */}
      <motion.div
        style={{
          opacity: monthYearOpacity,
          y: monthYearY,
          fontFamily: 'var(--font-display)',
          fontSize: isCompact
            ? isShortViewport
              ? '1.1rem'
              : 'clamp(1.22rem, 4.4vw, 1.38rem)'
            : 'clamp(1.15rem, 2.3vw, 1.62rem)',
          letterSpacing: isCompact ? '0.12em' : '0.16em',
          color: 'var(--color-ivory)',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginTop: isCompact ? '2px' : '4px',
          textShadow: '0 2px 8px rgba(0,0,0,0.7)',
        }}
      >
        {`${date.monthUpper || 'NOVEMBER'} ${date.year || '2026'}`}
      </motion.div>

      {/* 5. Kannada Auspicious Date Inscription */}
      <motion.div
        className="kannada-text"
        style={{
          opacity: kannadaOpacity,
          y: kannadaY,
          color: 'var(--color-gold-bright)',
          fontSize: isCompact
            ? isShortViewport
              ? '0.94rem'
              : 'clamp(1.04rem, 3.9vw, 1.16rem)'
            : 'clamp(0.95rem, 1.6vw, 1.12rem)',
          marginTop: isCompact ? '4px' : '6px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          lineHeight: 1.35,
        }}
      >
        {date.kannada}
      </motion.div>
    </div>
  );
}

