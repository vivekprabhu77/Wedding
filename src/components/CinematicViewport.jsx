import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { WeddingTimelineProvider } from '../hooks/useWeddingTimeline';
import SceneRenderer from './SceneRenderer';
import OrnamentalFrame from './OrnamentalFrame';
import FloralParticles from './FloralParticles';
import ScrollProgress from './ScrollProgress';
import { SCROLL_SETTINGS } from '../data/weddingDetails';

/**
 * CinematicViewport Component
 * The central architectural container for the continuous storytelling wedding invitation.
 *
 * Architecture:
 * - Outer Master Scroll Container: An unconstrained scroll track (e.g. 700vh) that powers natural browser scroll.
 * - Inner Pinned Viewport: Pinned sticky at top: 0, taking 100vw x 100dvh.
 * - No horizontal overflow, no competing scroll containers.
 * - Master scroll progress connects directly to Framer Motion timeline.
 */
export default function CinematicViewport() {
  const containerRef = useRef(null);

  // Bind master scroll progress to the entire scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={containerRef}
      className="master-scroll-container"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: `${SCROLL_SETTINGS.totalScrollTrackVh}vh`,
        overflowX: 'hidden',
      }}
    >
      <WeddingTimelineProvider scrollYProgress={scrollYProgress}>
        {/* Pinned Cinematic Screen (Fixed 100vw x 100dvh, never scrolls off-screen) */}
        <div
          className="pinned-visual-viewport"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 'var(--z-scene-content, 10)',
          }}
        >
          {/* Subtle Ambient Diya / Mandap Warmth Radial Glow */}
          <div
            className="anim-ambient-glow"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(90vw, 750px)',
              height: 'min(90vw, 750px)',
              background:
                'radial-gradient(circle, rgba(182, 138, 67, 0.16) 0%, rgba(112, 31, 42, 0.08) 50%, transparent 75%)',
              pointerEvents: 'none',
              zIndex: 'var(--z-ambient-glow, 5)',
              borderRadius: '50%',
            }}
          />

          {/* 7 Cinematic Scenes */}
          <SceneRenderer />

          {/* South Indian Temple Ornamental Frame */}
          <OrnamentalFrame />

          {/* Ambient Floral & Jasmine Petal Particles */}
          <FloralParticles />

          {/* Editorial Progress Bar, Scene HUD & Scroll Cue */}
          <ScrollProgress />
        </div>
      </WeddingTimelineProvider>
    </div>
  );
}
