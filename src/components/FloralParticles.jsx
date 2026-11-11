import React, { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * FloralParticles Component
 * Renders lightweight ambient South Indian wedding motifs (jasmine petals,
 * marigold blossoms, and subtle gold dust motes) floating in the atmosphere.
 * Designed for extreme lightweight performance using SVG and hardware-accelerated transforms.
 * Fully disabled when user requests reduced motion.
 */
export default function FloralParticles() {
  const prefersReducedMotion = useReducedMotion();

  // Generate deterministic particle definitions
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const type = i % 3; // 0: gold dust mote, 1: jasmine petal, 2: rose petal
      return {
        id: i,
        type,
        left: `${(i * 7.1 + 5) % 94}%`,
        top: `${(i * 8.3 + 8) % 88}%`,
        size: type === 0 ? 4 : type === 1 ? 14 : 18,
        opacity: type === 0 ? 0.35 : 0.22,
        duration: 12 + (i % 6) * 3,
        delay: (i % 5) * 1.5,
      };
    });
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className="floral-particles-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 'var(--z-particles, 15)',
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `particleDrift ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform',
          }}
        >
          {p.type === 0 ? (
            // Golden light mote
            <svg viewBox="0 0 10 10" width="100%" height="100%">
              <circle cx="5" cy="5" r="3" fill="var(--color-gold-bright, #F5E5C0)" />
            </svg>
          ) : p.type === 1 ? (
            // Jasmine / Mallige white-gold petal
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path
                d="M12 2C8 7 5 13 8 18C10 21 14 21 16 18C19 13 16 7 12 2Z"
                fill="var(--color-ivory, #F8F3E9)"
                stroke="var(--color-antique-gold, #B68A43)"
                strokeWidth="0.5"
              />
            </svg>
          ) : (
            // Deep Rose Petal
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path
                d="M12 3C7 6 5 12 7 17C9 21 15 21 17 17C19 12 17 6 12 3Z"
                fill="var(--color-antique-gold, #B68A43)"
                fillOpacity="0.4"
                stroke="var(--color-gold-light, #DFBA73)"
                strokeWidth="0.5"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

