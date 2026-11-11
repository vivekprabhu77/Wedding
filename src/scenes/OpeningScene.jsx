import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneTimeline } from '../hooks/useWeddingTimeline';
import { WEDDING_DETAILS } from '../data/weddingDetails';
import GaneshaEmblem from '../illustrations/GaneshaEmblem';
import OrnamentalDivider from '../components/OrnamentalDivider';

/**
 * Scene 1: The Traditional Cinematic Invitation Opening (0% – 12%)
 *
 * Grounded, rock-steady ivory card composition:
 * - Perfectly centered in the viewport at all times.
 * - Text, auspicious emblem, and ornamental frame are clearly visible from scroll = 0.
 * - Stays comfortably readable as the visitor scrolls through the opening stage.
 * - Smoothly dissolves between 0.75 and 1.0 local progress into the Varmala mandapa.
 */
export default function OpeningScene() {
  const { localProgress, opacity, scale, isActive, sceneConfig } =
    useSceneTimeline('opening');

  // As visitor scrolls through the opening range (0.0 to 1.0 local, corresponding to 0% to 12% master):
  // The card stays fully visible from 0.0 to 0.75, allowing relaxed reading.
  // Between 0.75 and 1.0, it gently crossfades out as Scene 2 (Varmala) enters.
  const canvasOpacity = useTransform(localProgress, [0.0, 0.75, 0.98], [1, 1, 0]);
  const canvasScale = useTransform(localProgress, [0.0, 0.75, 1.0], [1, 1.01, 0.98]);

  // Subtle scroll cue fades out quickly as user starts scrolling
  const scrollCueOpacity = useTransform(localProgress, [0.0, 0.15], [1, 0]);

  return (
    <motion.section
      id="scene-opening"
      className="wedding-scene"
      aria-label={`${sceneConfig.title} (${sceneConfig.rangePercent})`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(12px, 3vw, 32px)',
        opacity,
        scale,
        pointerEvents: isActive ? 'auto' : 'none',
        overflow: 'hidden',
      }}
    >
      {/* --- SOPHISTICATED IVORY BACKDROP CANVAS (CENTERED) --- */}
      <motion.div
        className="opening-ivory-canvas"
        style={{
          position: 'relative',
          width: 'min(92vw, 580px)',
          maxHeight: 'min(82vh, 520px)',
          background: 'linear-gradient(180deg, #FBF8F1 0%, #F6F0E4 50%, #EFE5D3 100%)',
          color: 'var(--color-maroon-deepest, #27080D)',
          borderRadius: '4px',
          padding: 'clamp(16px, 3.2vw, 30px) clamp(16px, 3.5vw, 36px)',
          boxShadow: '0 16px 45px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: canvasOpacity,
          scale: canvasScale,
          border: '1px solid rgba(182, 138, 67, 0.4)',
          boxSizing: 'border-box',
          margin: 'auto',
        }}
      >
        {/* --- FINE GOLD INNER ORNAMENTAL BORDER --- */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            right: '8px',
            bottom: '8px',
            border: '1px solid rgba(182, 138, 67, 0.45)',
            borderRadius: '2px',
            pointerEvents: 'none',
          }}
        />

        {/* --- CORNER TEMPLE FLORAL MOTIFS --- */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          {/* Top-Left */}
          <svg style={{ position: 'absolute', top: '12px', left: '12px' }} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M2 22V2H22" stroke="var(--color-antique-gold)" strokeWidth="1.5" />
            <circle cx="7" cy="7" r="2" fill="var(--color-antique-gold)" />
          </svg>
          {/* Top-Right */}
          <svg style={{ position: 'absolute', top: '12px', right: '12px', transform: 'scaleX(-1)' }} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M2 22V2H22" stroke="var(--color-antique-gold)" strokeWidth="1.5" />
            <circle cx="7" cy="7" r="2" fill="var(--color-antique-gold)" />
          </svg>
          {/* Bottom-Left */}
          <svg style={{ position: 'absolute', bottom: '12px', left: '12px', transform: 'scaleY(-1)' }} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M2 22V2H22" stroke="var(--color-antique-gold)" strokeWidth="1.5" />
            <circle cx="7" cy="7" r="2" fill="var(--color-antique-gold)" />
          </svg>
          {/* Bottom-Right */}
          <svg style={{ position: 'absolute', bottom: '12px', right: '12px', transform: 'scale(-1, -1)' }} width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M2 22V2H22" stroke="var(--color-antique-gold)" strokeWidth="1.5" />
            <circle cx="7" cy="7" r="2" fill="var(--color-antique-gold)" />
          </svg>
        </div>

        {/* --- CARD CONTENT (CLEAR & GROUNDED) --- */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Auspicious Vigneshwara Emblem */}
          <div style={{ marginBottom: '6px' }}>
            <GaneshaEmblem size={50} />
          </div>

          {/* Sacred Sanskrit / Kannada Invocation */}
          <p
            className="kannada-text"
            style={{
              color: 'var(--color-deep-maroon)',
              fontSize: 'clamp(0.92rem, 1.8vw, 1.15rem)',
              letterSpacing: '0.04em',
              fontWeight: 600,
              margin: '2px 0 10px',
            }}
          >
            {WEDDING_DETAILS.shlokas.opening}
          </p>

          {/* Welcoming Line */}
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.05rem, 1.9vw, 1.35rem)',
              color: 'var(--color-deep-maroon)',
              lineHeight: 1.4,
              maxWidth: '480px',
              margin: '0 auto 8px',
            }}
          >
            With the blessings of the Almighty and our elders
          </p>

          <OrnamentalDivider width="min(180px, 45%)" style={{ margin: '6px auto 10px' }} />

          {/* Invitation Message */}
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
              color: '#3A141A',
              lineHeight: 1.5,
              maxWidth: '500px',
              margin: '0 auto',
              letterSpacing: '0.02em',
            }}
          >
            Together with our families, we joyfully invite you to celebrate the wedding of
          </p>

          {/* Gentle Scroll Cue (fades out as you begin scrolling) */}
          <motion.div
            style={{
              opacity: scrollCueOpacity,
              marginTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.62rem',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-antique-gold)',
                fontWeight: 600,
              }}
            >
              Scroll to witness the ceremony
            </span>
            <svg
              className="anim-scroll-pulse"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-antique-gold)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
