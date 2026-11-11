import React from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DETAILS } from '../data/weddingDetails';

/**
 * LagnamReveal Component
 * STAGE 4: Concluding Auspicious Announcement — MAKARA LAGNAM
 *
 * Sequence:
 * 1. Traditional auspicious flourish
 * 2. Auspicious Lagnam banner
 * 3. MAKARA LAGNAM in dignified classical serif
 */
export default function LagnamReveal({
  containerOpacity,
  containerY,
  lagnamOpacity,
  lagnamScale,
  lagnamY,
}) {
  const { date } = WEDDING_DETAILS;

  return (
    <motion.div
      className="lagnam-reveal-container"
      style={{
        opacity: containerOpacity,
        y: containerY,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'clamp(10px, 2.2vh, 18px)',
        width: '100%',
        maxWidth: '440px',
      }}
    >
      {/* Auspicious Lagnam Announcement Badge */}
      <motion.div
        style={{
          opacity: lagnamOpacity,
          scale: lagnamScale,
          y: lagnamY,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'clamp(6px, 1.2vh, 10px) clamp(16px, 3.5vw, 28px)',
          borderRadius: '3px',
          border: '1px solid rgba(182, 138, 67, 0.4)',
          background: 'rgba(39, 8, 13, 0.55)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.62rem, 1vw, 0.74rem)',
            letterSpacing: '0.24em',
            color: 'var(--color-gold-light)',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '3px',
          }}
        >
          {date.lagnamTitle || 'AUSPICIOUS LAGNAM'}
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: 'var(--color-antique-gold)', fontSize: '0.85rem' }} aria-hidden="true">
            ✻
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.15rem, 2.4vw, 1.65rem)',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'var(--color-gold-bright)',
              textTransform: 'uppercase',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
            }}
          >
            {date.lagnam || 'MAKARA LAGNAM'}
          </span>
          <span style={{ color: 'var(--color-antique-gold)', fontSize: '0.85rem' }} aria-hidden="true">
            ✻
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

