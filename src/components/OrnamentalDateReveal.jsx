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
          fontSize: 'clamp(0.65rem, 1.1vw, 0.82rem)',
          letterSpacing: '0.24em',
          color: 'var(--color-gold-light)',
          textTransform: 'uppercase',
          marginBottom: '4px',
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
          fontSize: 'clamp(1.15rem, 2.4vw, 1.7rem)',
          letterSpacing: '0.18em',
          color: 'var(--color-gold-bright)',
          textTransform: 'uppercase',
          fontWeight: 600,
          margin: '2px 0 6px',
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
          margin: '2px 0',
        }}
      >
        {/* Subtle decorative gold flanking wings */}
        <span
          aria-hidden="true"
          style={{
            color: 'var(--color-antique-gold)',
            fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
            opacity: 0.7,
            marginRight: 'clamp(8px, 2vw, 16px)',
          }}
        >
          ❧
        </span>

        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4.2rem, 11vw, 7.6rem)',
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF0C2 35%, #DFBA73 70%, #B68A43 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 6px 18px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 25px rgba(223, 186, 115, 0.3))',
            display: 'inline-block',
          }}
        >
          {date.dateNumber || '26'}
        </span>

        <span
          aria-hidden="true"
          style={{
            color: 'var(--color-antique-gold)',
            fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
            opacity: 0.7,
            marginLeft: 'clamp(8px, 2vw, 16px)',
            transform: 'scaleX(-1)',
            display: 'inline-block',
          }}
        >
          ❧
        </span>
      </motion.div>

      {/* 4. Month & Year: NOVEMBER 2026 */}
      <motion.div
        style={{
          opacity: monthYearOpacity,
          y: monthYearY,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.05rem, 2.2vw, 1.55rem)',
          letterSpacing: '0.16em',
          color: 'var(--color-ivory)',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginTop: '4px',
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
          fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
          marginTop: '6px',
          fontWeight: 500,
          letterSpacing: '0.04em',
        }}
      >
        {date.kannada}
      </motion.div>
    </div>
  );
}

