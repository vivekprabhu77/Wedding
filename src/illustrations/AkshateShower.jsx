import React, { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * AkshateShower Component
 * Renders the sacred South Indian wedding shower of Akshate (turmeric-dyed golden rice grains)
 * and fragrant red rose petals cascading upon the couple during the Varmala celebration.
 *
 * Mapped to local progress of the Varmala celebration stage (approx. 0.70 to 1.0 local progress).
 */
export default function AkshateShower({ progress, className = '', style = {} }) {
  const prefersReducedMotion = useReducedMotion();

  // Generate deterministic falling rice grains and rose petals
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const isRice = i % 3 !== 0; // 2/3 rice grains, 1/3 rose petals
      const xOffset = ((i * 13.7) % 86) + 7; // spread across 7% to 93% width
      const startDelay = (i % 7) * 0.04;
      const fallDistance = 140 + (i % 5) * 20;

      return {
        id: i,
        isRice,
        left: `${xOffset}%`,
        size: isRice ? 4 : 12,
        rotation: (i * 47) % 360,
        startDelay,
        fallDistance,
      };
    });
  }, []);

  // Opacity fade in as celebration starts (0.7 to 0.78), holds, and fades gently towards scene exit (0.95 to 1.0)
  const showerOpacity = useTransform(progress, [0.7, 0.78, 0.94, 1.0], [0, 1, 1, 0.2]);
  const showerY = useTransform(progress, [0.7, 1.0], [-20, 90]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className={`akshate-shower-container ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: showerOpacity,
        y: showerY,
        zIndex: 15,
        ...style,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: `${(p.id * 11) % 60}%`,
            width: `${p.size}px`,
            height: `${p.size * (p.isRice ? 2 : 1)}px`,
            transform: `rotate(${p.rotation}deg)`,
            filter: p.isRice
              ? 'drop-shadow(0 1px 3px rgba(223, 186, 115, 0.6))'
              : 'drop-shadow(0 2px 4px rgba(112, 31, 42, 0.4))',
          }}
        >
          {p.isRice ? (
            // Golden Turmeric-infused Rice Grain
            <svg viewBox="0 0 6 12" width="100%" height="100%">
              <ellipse cx="3" cy="6" rx="2.5" ry="5.5" fill="#F5E5C0" stroke="#DFBA73" strokeWidth="0.5" />
            </svg>
          ) : (
            // Crimson Rose Petal
            <svg viewBox="0 0 16 16" width="100%" height="100%">
              <path
                d="M8 2 C4 5 3 10 5 13 C8 16 13 15 14 11 C15 7 12 4 8 2 Z"
                fill="#A82839"
                stroke="#701F2A"
                strokeWidth="0.5"
              />
            </svg>
          )}
        </div>
      ))}
    </motion.div>
  );
}

