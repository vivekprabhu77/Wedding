import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useWeddingTimeline } from '../hooks/useWeddingTimeline';

/**
 * ScrollProgress Component
 * Renders:
 * - A refined top antique-gold progress line
 * - A minimal editorial HUD indicator displaying current scene & progress
 * - Interactive scene dot indicators for testing and easy navigation
 * - A gentle scroll cue on the opening scene
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useWeddingTimeline();

  // Smooth width calculation for the golden progress bar
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Fade out scroll cue once user scrolls beyond 3%
  const cueOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  return (
    <>
      {/* 1. Top Fine Gold Progress Line */}
      <div
        className="scroll-progress-line-track"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(182, 138, 67, 0.15)',
          zIndex: 'var(--z-timeline-hud, 30)',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            scaleX: progressScaleX,
            transformOrigin: '0% 50%',
            background:
              'linear-gradient(90deg, var(--color-antique-gold) 0%, var(--color-gold-bright) 100%)',
            boxShadow: '0 0 8px rgba(223, 186, 115, 0.5)',
          }}
        />
      </div>

      {/* 2. Bottom Center Gentle Scroll Cue */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 'clamp(20px, 4vw, 36px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 'var(--z-timeline-hud, 30)',
          pointerEvents: 'none',
          opacity: cueOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.68rem',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase',
            color: 'var(--color-champagne)',
            opacity: 0.85,
          }}
        >
          Scroll to Experience
        </span>
        <svg
          className="anim-scroll-pulse"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-antique-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </>
  );
}

