import React, { useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneTimeline } from '../hooks/useWeddingTimeline';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { WEDDING_DETAILS } from '../data/weddingDetails';
import MandapVenueFrame from '../components/MandapVenueFrame';
import VenueDirectionsAction from '../components/VenueDirectionsAction';
import OrnamentalDivider from '../components/OrnamentalDivider';

/**
 * Scene 6: THE WEDDING VENUE — Mandap Sanctuary & Google Maps Directions (70% – 85%)
 *
 * Scroll-controlled sequential choreography:
 * 1. Muhurtham-to-Venue Transition (0.00 – 0.22): Pillars expand outward to open the mandap sanctuary.
 * 2. Mandap Architectural Canopy & Pillars (0.06 – 0.30): Twin carved stambhas and royal arch emerge.
 * 3. Floral Garlands & Brass Lamps (0.22 – 0.42): Mango leaves, jasmine toranams, and hanging deepams glow.
 * 4. Venue Title (0.25 – 0.36): "THE WEDDING VENUE".
 * 5. Auditorium Name (0.35 – 0.56): "AMMANNI RAMANNA SHETTY" then "MEMORIAL AUDITORIUM".
 * 6. Location (0.53 – 0.71): "CHITPADY" then "UDUPI, KARNATAKA".
 * 7. Interactive Location Marker & Dotted Journey Path (0.67 – 0.82).
 * 8. Gilded "GET DIRECTIONS" Action & Supporting Line (0.75 – 0.88).
 */
export default function VenueScene() {
  const { localProgress, opacity, y, scale, isActive, sceneConfig } =
    useSceneTimeline('venue');
  const reducedMotion = useReducedMotion();
  const { venue } = WEDDING_DETAILS;

  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== 'undefined'
      ? window.innerWidth < 640 || window.innerHeight < 700
      : false
  );

  useEffect(() => {
    const checkViewport = () => {
      setIsCompact(window.innerWidth < 640 || window.innerHeight < 700);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // ========================================================
  // 1. MUHURTHAM TO MANDAP TRANSITION & ARCHITECTURAL STAGING
  // ========================================================
  const contentY = useTransform(localProgress, [0.0, 0.32, 0.88, 1.0], [20, 0, 0, -14]);
  const frameScale = useTransform(localProgress, [0.0, 0.24, 0.88, 1.0], [0.94, 1.0, 1.0, 0.98]);
  const frameOpacity = useTransform(localProgress, [0.0, 0.18], [0.15, 1.0]);

  const pillarsOpacity = useTransform(localProgress, [0.06, 0.24], [0, 1]);
  const leftPillarX = useTransform(localProgress, [0.06, 0.28], [26, 0]);
  const rightPillarX = useTransform(localProgress, [0.06, 0.28], [-26, 0]);

  const archOpacity = useTransform(localProgress, [0.14, 0.30], [0, 1]);
  const floralOpacity = useTransform(localProgress, [0.22, 0.38], [0, 1]);
  const floralY = useTransform(localProgress, [0.22, 0.38], [-10, 0]);
  const lampGlowOpacity = useTransform(localProgress, [0.24, 0.42], [0, 0.95]);

  // ========================================================
  // 2. STAGE 1: INTRODUCTION HEADING (0.25 – 0.36)
  // ========================================================
  const headingOpacity = useTransform(localProgress, [0.25, 0.36], [0, 1]);
  const headingY = useTransform(localProgress, [0.25, 0.36], [10, 0]);

  // ========================================================
  // 3. STAGE 3: VENUE NAME REVEAL (0.35 – 0.56)
  // ========================================================
  const nameLine1Opacity = useTransform(localProgress, [0.35, 0.47], [0, 1]);
  const nameLine1Y = useTransform(localProgress, [0.35, 0.47], [14, 0]);

  const nameLine2Opacity = useTransform(localProgress, [0.43, 0.55], [0, 1]);
  const nameLine2Y = useTransform(localProgress, [0.43, 0.55], [12, 0]);

  // ========================================================
  // 4. STAGE 4: LOCATION REVEAL (0.53 – 0.71)
  // ========================================================
  const locationDividerOpacity = useTransform(localProgress, [0.53, 0.62], [0, 1]);

  const cityOpacity = useTransform(localProgress, [0.57, 0.66], [0, 1]);
  const cityY = useTransform(localProgress, [0.57, 0.66], [10, 0]);

  const regionOpacity = useTransform(localProgress, [0.62, 0.71], [0, 1]);
  const regionY = useTransform(localProgress, [0.62, 0.71], [8, 0]);

  // ========================================================
  // 5. LOCATION MARKER, ROUTE LINE & GET DIRECTIONS (0.65 – 0.84)
  // ========================================================
  const pinOpacity = useTransform(localProgress, [0.65, 0.74], [0, 1]);
  const pinY = useTransform(localProgress, [0.65, 0.74], [-12, 0]);
  const pinScale = useTransform(localProgress, [0.65, 0.74], [0.72, 1.0]);
  const pathProgress = useTransform(localProgress, [0.68, 0.78], [0, 1]);

  const ctaOpacity = useTransform(localProgress, [0.71, 0.80], [0, 1]);
  const ctaY = useTransform(localProgress, [0.71, 0.80], [10, 0]);

  const noteOpacity = useTransform(localProgress, [0.76, 0.84], [0, 1]);
  const noteY = useTransform(localProgress, [0.76, 0.84], [8, 0]);

  return (
    <motion.section
      id="scene-venue"
      className="wedding-scene scene-venue"
      aria-label={`${sceneConfig.title} (${sceneConfig.rangePercent})`}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: isCompact ? 'clamp(6px, 2vw, 12px)' : 'clamp(12px, 2.5vw, 24px)',
        opacity,
        y: reducedMotion ? 0 : y,
        scale: reducedMotion ? 1 : scale,
        pointerEvents: isActive ? 'auto' : 'none',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          y: reducedMotion ? 0 : contentY,
          width: '100%',
          maxWidth: '760px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MandapVenueFrame
          frameScale={reducedMotion ? 1 : frameScale}
          frameOpacity={frameOpacity}
          pillarsOpacity={pillarsOpacity}
          leftPillarX={reducedMotion ? 0 : leftPillarX}
          rightPillarX={reducedMotion ? 0 : rightPillarX}
          archOpacity={archOpacity}
          floralOpacity={floralOpacity}
          floralY={reducedMotion ? 0 : floralY}
          lampGlowOpacity={lampGlowOpacity}
          isCompact={isCompact}
        >
          {/* Stage 1: Classical Heading — THE WEDDING VENUE */}
          <motion.div
            style={{
              opacity: headingOpacity,
              y: reducedMotion ? 0 : headingY,
              fontFamily: 'var(--font-display)',
              fontSize: isCompact
                ? 'clamp(0.64rem, 2.6vw, 0.78rem)'
                : 'clamp(0.74rem, 1.15vw, 0.88rem)',
              letterSpacing: '0.24em',
              color: 'var(--color-gold-light)',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: isCompact ? '6px' : '10px',
            }}
          >
            {venue.sectionLabel || 'THE WEDDING VENUE'}
          </motion.div>

          {/* Subtle Temple Lotus Crown Accent above Venue Name */}
          <motion.div
            style={{
              opacity: headingOpacity,
              marginBottom: isCompact ? '6px' : '10px',
            }}
            aria-hidden="true"
          >
            <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
              <path
                d="M13 1 C15 5 18 8 24 9 C18 11 15 13 13 15 C11 13 8 11 2 9 C8 8 11 5 13 1 Z"
                fill="rgba(223, 186, 115, 0.25)"
                stroke="var(--color-antique-gold)"
                strokeWidth="1"
              />
              <circle cx="13" cy="9" r="1.8" fill="var(--color-gold-bright)" />
            </svg>
          </motion.div>

          {/* Stage 3: Monumental Auditorium Name Lines */}
          <h2
            style={{
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isCompact ? '2px' : '4px',
              width: '100%',
            }}
          >
            <motion.span
              className="editorial-display"
              style={{
                opacity: nameLine1Opacity,
                y: reducedMotion ? 0 : nameLine1Y,
                fontSize: isCompact
                  ? 'clamp(1rem, 4.3vw, 1.28rem)'
                  : 'clamp(1.36rem, 2.4vw, 1.88rem)',
                fontWeight: 700,
                letterSpacing: isCompact ? '0.04em' : '0.08em',
                lineHeight: 1.22,
                color: 'var(--color-ivory)',
                textShadow: '0 3px 14px rgba(0, 0, 0, 0.75)',
                display: 'block',
              }}
            >
              {venue.nameLine1 || 'AMMANNI RAMANNA SHETTY'}
            </motion.span>

            <motion.span
              className="editorial-display"
              style={{
                opacity: nameLine2Opacity,
                y: reducedMotion ? 0 : nameLine2Y,
                fontSize: isCompact
                  ? 'clamp(0.88rem, 3.7vw, 1.12rem)'
                  : 'clamp(1.12rem, 1.9vw, 1.48rem)',
                fontWeight: 600,
                letterSpacing: isCompact ? '0.07em' : '0.12em',
                lineHeight: 1.25,
                color: 'var(--color-gold-bright)',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)',
                display: 'block',
              }}
            >
              {venue.nameLine2 || 'MEMORIAL AUDITORIUM'}
            </motion.span>
          </h2>

          {/* Ornamental Temple Divider before Location */}
          <motion.div
            style={{
              opacity: locationDividerOpacity,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <OrnamentalDivider
              width={isCompact ? 'min(150px, 50%)' : 'min(220px, 48%)'}
              style={{ margin: isCompact ? '8px auto' : '12px auto' }}
            />
          </motion.div>

          {/* Stage 4: Venue Location — CHITPADY / UDUPI, KARNATAKA */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <motion.div
              style={{
                opacity: cityOpacity,
                y: reducedMotion ? 0 : cityY,
                fontFamily: 'var(--font-display)',
                fontSize: isCompact
                  ? 'clamp(0.86rem, 3.6vw, 1.02rem)'
                  : 'clamp(1.02rem, 1.6vw, 1.24rem)',
                letterSpacing: '0.22em',
                color: 'var(--color-ivory)',
                fontWeight: 600,
              }}
            >
              {venue.city || 'CHITPADY'}
            </motion.div>

            <motion.div
              style={{
                opacity: regionOpacity,
                y: reducedMotion ? 0 : regionY,
                fontFamily: 'var(--font-editorial)',
                fontSize: isCompact
                  ? 'clamp(0.82rem, 3.3vw, 0.96rem)'
                  : 'clamp(0.95rem, 1.5vw, 1.12rem)',
                letterSpacing: '0.16em',
                color: 'var(--color-gold-light)',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
            >
              {venue.region || 'UDUPI, KARNATAKA'}
            </motion.div>
          </div>

          {/* Stage 5: Interactive Location Experience & Google Maps Navigation */}
          <VenueDirectionsAction
            pathProgress={reducedMotion ? 1 : pathProgress}
            pinOpacity={pinOpacity}
            pinY={reducedMotion ? 0 : pinY}
            pinScale={reducedMotion ? 1 : pinScale}
            ctaOpacity={ctaOpacity}
            ctaY={reducedMotion ? 0 : ctaY}
            noteOpacity={noteOpacity}
            noteY={reducedMotion ? 0 : noteY}
            isCompact={isCompact}
            reducedMotion={reducedMotion}
          />
        </MandapVenueFrame>
      </motion.div>
    </motion.section>
  );
}
