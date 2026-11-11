import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneTimeline } from '../hooks/useWeddingTimeline';
import { WEDDING_DETAILS } from '../data/weddingDetails';
import { useLenis } from '../components/SmoothScroll';
import OrnamentalDivider from '../components/OrnamentalDivider';

/**
 * Scene 7: Family Blessings & Closing Scene (85% – 100%)
 * Elder blessings, sacred Mangalam, family gratitude, and replay journey.
 */
export default function BlessingScene() {
  const { localProgress, opacity, y, scale, isActive, sceneConfig } =
    useSceneTimeline('blessings');
  const lenis = useLenis();

  const contentY = useTransform(localProgress, [0, 0.4, 0.8, 1], [20, 0, 0, -10]);
  const contentEntranceOpacity = useTransform(localProgress, [0.12, 0.30], [0, 1]);
  const blessingScale = useTransform(localProgress, [0, 0.6], [0.97, 1.02]);
  const sealOpacity = useTransform(localProgress, [0.15, 0.4], [0, 1]);
  const replayOpacity = useTransform(localProgress, [0.55, 0.8], [0, 1]);

  const replayJourney = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="scene-blessings"
      className="wedding-scene"
      aria-label={`${sceneConfig.title} (${sceneConfig.rangePercent})`}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(12px, 3.5vw, 40px)',
        opacity,
        y,
        scale,
        pointerEvents: isActive ? 'auto' : 'none',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          y: contentY,
          opacity: contentEntranceOpacity,
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Discreet Editorial Scene Tag */}
        {/* Auspicious Royal Monogram Seal */}
        <motion.div
          style={{
            opacity: sealOpacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '1px solid var(--color-antique-gold)',
              background: 'radial-gradient(circle, rgba(182, 138, 67, 0.2) 0%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <span
              className="editorial-display"
              style={{
                fontSize: '1rem',
                color: 'var(--color-gold-bright)',
                fontWeight: 600,
                letterSpacing: '0.12em',
              }}
            >
              V × R
            </span>
          </div>
        </motion.div>

        {/* Scene Title */}
        <h2
          className="editorial-display"
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
            color: 'var(--color-ivory)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            margin: '2px 0 4px',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}
        >
          {sceneConfig.title}
        </h2>

        <OrnamentalDivider width="min(200px, 50%)" style={{ margin: '6px auto 12px' }} />

        {/* Sacred Mangalam Shloka */}
        <motion.p
          className="kannada-text"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            color: 'var(--color-gold-bright)',
            lineHeight: 1.6,
            maxWidth: '560px',
            margin: '6px auto 12px',
            scale: blessingScale,
          }}
        >
          {WEDDING_DETAILS.shlokas.blessingKannada}
        </motion.p>

        {/* Family Gratitude Message */}
        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
            color: 'var(--color-champagne)',
            lineHeight: 1.55,
            maxWidth: '540px',
            margin: '8px auto 14px',
          }}
        >
          Your esteemed presence, warm blessings, and affectionate wishes are our greatest gifts as we embark on this sacred journey of togetherness.
        </p>

        <OrnamentalDivider width="min(160px, 40%)" style={{ margin: '8px auto' }} />

        {/* Closing Signature */}
        <div
          className="editorial-display"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            color: 'var(--color-ivory)',
            letterSpacing: 'var(--tracking-widest)',
            marginTop: '6px',
          }}
        >
          Vighnesh & Rashmitha
        </div>

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '0.92rem',
            color: 'var(--color-gold-light)',
            opacity: 0.8,
            marginTop: '4px',
          }}
        >
          With Best Compliments from Family, Relatives & Friends
        </p>

        {/* Replay Journey Button */}
        <motion.div style={{ opacity: replayOpacity, marginTop: '18px' }}>
          <button
            onClick={replayJourney}
            aria-label="Replay the wedding invitation journey from beginning"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              background: 'rgba(182, 138, 67, 0.15)',
              border: '1px solid var(--color-antique-gold)',
              color: 'var(--color-gold-bright)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-antique-gold)';
              e.currentTarget.style.color = 'var(--color-maroon-deepest)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(182, 138, 67, 0.15)';
              e.currentTarget.style.color = 'var(--color-gold-bright)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Replay Experience
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
