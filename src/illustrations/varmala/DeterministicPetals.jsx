import React, { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * DeterministicPetals Component
 * Renders traditional South Indian wedding Akshate (golden turmeric rice grains)
 * and crimson rose petals that fall strictly based on scroll progress.
 *
 * Deterministic math guarantees that scrolling backwards perfectly reverses the petal paths.
 *
 * @param {MotionValue} progress - Local progress of the Varmala scene [0, 1]
 */
export default function DeterministicPetals({ progress }) {
  const prefersReducedMotion = useReducedMotion();

  // 32 deterministic particles with fixed trajectory seeds
  const petals = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const isRice = i % 3 !== 0; // 2/3 gold rice, 1/3 rose petals
      const xPercent = ((i * 19.3) % 88) + 6; // Spread nicely across 6% to 94%
      const speed = 0.8 + ((i * 7) % 5) * 0.15;
      const initialRotation = (i * 53) % 360;
      const rotationDrift = ((i % 2 === 0 ? 1 : -1) * (90 + (i % 6) * 20));
      const size = isRice ? 4.5 : 13;

      return {
        id: i,
        isRice,
        xPercent,
        speed,
        initialRotation,
        rotationDrift,
        size,
      };
    });
  }, []);

  // Celebration stage is active during progress 0.70 to 1.00
  const containerOpacity = useTransform(
    progress,
    [0.70, 0.76, 0.94, 1.00],
    [0, 1, 1, 0.15]
  );

  // Global vertical fall mapped to scroll progress
  const fallY = useTransform(progress, [0.70, 1.00], [-30, 240]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="deterministic-petals-layer"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: containerOpacity,
        y: fallY,
        zIndex: 20,
      }}
    >
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.xPercent}%`,
            top: `${(p.id * 8.5) % 65}%`,
            width: `${p.size}px`,
            height: `${p.size * (p.isRice ? 2 : 1)}px`,
            transform: `rotate(${p.initialRotation}deg)`,
            filter: p.isRice
              ? 'drop-shadow(0 1px 3px rgba(223, 186, 115, 0.7))'
              : 'drop-shadow(0 2px 4px rgba(112, 31, 42, 0.45))',
          }}
        >
          {p.isRice ? (
            // Sacred Golden Turmeric Rice (Akshate)
            <svg viewBox="0 0 6 12" width="100%" height="100%">
              <ellipse
                cx="3"
                cy="6"
                rx="2.5"
                ry="5.5"
                fill="var(--color-gold-bright, #F5E5C0)"
                stroke="var(--color-antique-gold, #B68A43)"
                strokeWidth="0.6"
              />
            </svg>
          ) : (
            // Velvet Rose Petal (Kempu Gulabi)
            <svg viewBox="0 0 16 16" width="100%" height="100%">
              <path
                d="M8 2 C4 5 3 10 5 13 C8 16 13 15 14 11 C15 7 12 4 8 2 Z"
                fill="var(--color-deep-maroon, #701F2A)"
                stroke="var(--color-maroon-dark, #4A121A)"
                strokeWidth="0.5"
              />
            </svg>
          )}
        </div>
      ))}
    </motion.div>
  );
}

