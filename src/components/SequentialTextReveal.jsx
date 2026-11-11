import React from 'react';
import { motion, useTransform } from 'framer-motion';
import OrnamentalDivider from './OrnamentalDivider';

/**
 * SequentialTextReveal Component
 * Handles the individual, scroll-driven sequential reveal of:
 * - Salutation (CHI. / CHI. SOU.)
 * - Name (VIGHNESH / RASHMITHA)
 * - Parents (Son of / Daughter of, Smt. ..., &, Sri / Late ...)
 * - Hometown (UPPUNDA / SANTHEKATTE, Udupi)
 *
 * All animations are mathematically bound to localProgress [0, 1]
 * and reverse with absolute fidelity on backward scrolling.
 */
export default function SequentialTextReveal({
  person, // WEDDING_DETAILS.couple.groom or bride
  localProgress,
  className = '',
  style = {},
}) {
  // ========================================================
  // STAGE 2: NAME REVEALS (0.26 -> 0.50)
  // ========================================================
  const salutationOpacity = useTransform(localProgress, [0.26, 0.36], [0, 1]);
  const salutationY = useTransform(localProgress, [0.26, 0.36], [10, 0]);

  const nameOpacity = useTransform(localProgress, [0.32, 0.44], [0, 1]);
  const nameY = useTransform(localProgress, [0.32, 0.44], [14, 0]);
  const nameScale = useTransform(localProgress, [0.32, 0.48], [0.96, 1.0]);

  const kannadaOpacity = useTransform(localProgress, [0.28, 0.40], [0, 0.9]);

  // ========================================================
  // STAGE 3: PARENTS REVEALS (0.48 -> 0.74)
  // ========================================================
  const dividerOpacity = useTransform(localProgress, [0.46, 0.54], [0, 1]);

  const roleOpacity = useTransform(localProgress, [0.50, 0.58], [0, 1]);
  const roleY = useTransform(localProgress, [0.50, 0.58], [8, 0]);

  const motherOpacity = useTransform(localProgress, [0.55, 0.63], [0, 1]);
  const motherY = useTransform(localProgress, [0.55, 0.63], [8, 0]);

  const ampersandOpacity = useTransform(localProgress, [0.60, 0.67], [0, 1]);

  const fatherOpacity = useTransform(localProgress, [0.64, 0.72], [0, 1]);
  const fatherY = useTransform(localProgress, [0.64, 0.72], [8, 0]);

  // ========================================================
  // STAGE 4: HOMETOWN REVEALS (0.72 -> 0.96)
  // ========================================================
  const hometownDividerOpacity = useTransform(localProgress, [0.72, 0.79], [0, 1]);

  const placeOpacity = useTransform(localProgress, [0.76, 0.85], [0, 1]);
  const placeY = useTransform(localProgress, [0.76, 0.85], [8, 0]);

  const districtOpacity = useTransform(localProgress, [0.82, 0.90], [0, 1]);
  const districtY = useTransform(localProgress, [0.82, 0.90], [6, 0]);

  return (
    <div
      className={`sequential-text-reveal ${className}`}
      style={{
        width: '100%',
        maxWidth: 'min(640px, 94vw)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        padding: '0 8px',
        ...style,
      }}
    >
      {/* Kannada Invocation / Name Accent */}
      <motion.p
        className="kannada-text"
        style={{
          opacity: kannadaOpacity,
          fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
          color: 'var(--color-gold-bright)',
          margin: '0 0 2px',
          fontWeight: 600,
        }}
      >
        {person.kannada}
      </motion.p>

      {/* --- STAGE 2: SALUTATION & PROMINENT NAME --- */}
      <div style={{ margin: '1px 0 4px' }}>
        <motion.div
          style={{
            opacity: salutationOpacity,
            y: salutationY,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.72rem, 1.2vw, 0.95rem)',
            letterSpacing: '0.18em',
            color: 'var(--color-gold-light)',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '2px',
          }}
        >
          {person.salutationUpper || person.salutation}
        </motion.div>

        <motion.h2
          className="editorial-display"
          style={{
            opacity: nameOpacity,
            y: nameY,
            scale: nameScale,
            fontSize: 'clamp(1.5rem, 3.8vw, 2.7rem)',
            fontWeight: 700,
            letterSpacing: 'clamp(0.06em, 0.15vw, 0.12em)',
            color: 'var(--color-ivory)',
            textTransform: 'uppercase',
            margin: '0',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)',
            lineHeight: 1.15,
          }}
        >
          {person.name.toUpperCase()}
        </motion.h2>
      </div>

      {/* --- STAGE 3: PARENTS REVEAL --- */}
      <motion.div style={{ opacity: dividerOpacity, width: '100%', margin: '2px 0 4px' }}>
        <OrnamentalDivider width="min(180px, 42%)" style={{ margin: '2px auto' }} />
      </motion.div>

      <div style={{ margin: '2px 0 6px', minHeight: 'clamp(44px, 7vh, 60px)' }}>
        {/* "Son of" or "Daughter of" */}
        <motion.p
          style={{
            opacity: roleOpacity,
            y: roleY,
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
            color: 'var(--color-champagne)',
            margin: '0 0 2px',
          }}
        >
          {person.parentsRole}
        </motion.p>

        {/* Parents Names with individual reveals */}
        <div
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)',
            color: '#FFF2D6',
            lineHeight: 1.4,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <motion.span style={{ opacity: motherOpacity, y: motherY, fontWeight: 600 }}>
            {person.mother}
          </motion.span>

          <motion.span
            style={{
              opacity: ampersandOpacity,
              color: 'var(--color-gold-light)',
              fontStyle: 'italic',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85em',
            }}
          >
            &amp;
          </motion.span>

          <motion.span style={{ opacity: fatherOpacity, y: fatherY, fontWeight: 600 }}>
            {person.father}
          </motion.span>
        </div>
      </div>

      {/* --- STAGE 4: HOMETOWN REVEAL --- */}
      <motion.div style={{ opacity: hometownDividerOpacity, width: '100%', margin: '2px 0 4px' }}>
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(182, 138, 67, 0.5), transparent)',
            margin: '0 auto',
          }}
        />
      </motion.div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <motion.span
          style={{
            opacity: placeOpacity,
            y: placeY,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.72rem, 1.1vw, 0.9rem)',
            letterSpacing: 'var(--tracking-widest)',
            color: 'var(--color-gold-light)',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {person.hometown}
        </motion.span>

        <motion.span
          style={{
            opacity: districtOpacity,
            color: 'rgba(182, 138, 67, 0.6)',
            fontSize: '0.75rem',
          }}
        >
          ·
        </motion.span>

        <motion.span
          style={{
            opacity: districtOpacity,
            y: districtY,
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
            color: 'var(--color-cream)',
          }}
        >
          {person.district}
        </motion.span>
      </div>
    </div>
  );
}

