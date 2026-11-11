import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneTimeline } from '../hooks/useWeddingTimeline';
import { WEDDING_DETAILS } from '../data/weddingDetails';
import GroomIllustration from '../illustrations/GroomIllustration';
import OrnamentalPortraitFrame from '../components/OrnamentalPortraitFrame';
import SequentialTextReveal from '../components/SequentialTextReveal';

/**
 * Scene 3: Groom Introduction Scene (34% – 45% of Master Timeline)
 *
 * Traditional Indian Wedding Portrait of Chi. Vighnesh:
 * - Stage 1 (0.00 – 0.28): Architectural temple mandap alcove emerges with warm diya radiance;
 *   re-uses the approved luxury editorial groom illustration.
 * - Stage 2 (0.28 – 0.50): Sequential Name reveal (CHI. then VIGHNESH in prominent classical serif).
 * - Stage 3 (0.50 – 0.74): Parents reveal (Son of -> Smt. Divya & Sri Dinesh Prabhu).
 * - Stage 4 (0.74 – 1.00): Hometown reveal (UPPUNDA · Udupi), held before transitioning to the bride.
 */
export default function GroomScene() {
  const { localProgress, opacity, y, scale, isActive, sceneConfig } =
    useSceneTimeline('groom');

  // Stage 1: Portrait Entrance Transforms
  const actorY = useTransform(localProgress, [0.0, 0.28], [28, 0]);
  const actorScale = useTransform(localProgress, [0.0, 0.35, 0.85, 1.0], [0.95, 1.0, 1.0, 0.98]);
  const auraOpacity = useTransform(localProgress, [0.08, 0.32, 0.85, 1.0], [0, 0.85, 0.85, 0.4]);
  const frameScale = useTransform(localProgress, [0.0, 0.30], [0.94, 1.0]);

  return (
    <motion.section
      id="scene-groom"
      className="wedding-scene scene-portrait"
      aria-label={`${sceneConfig.title} (${sceneConfig.rangePercent})`}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(8px, 2.5vw, 24px)',
        opacity,
        y,
        scale,
        pointerEvents: isActive ? 'auto' : 'none',
        overflow: 'hidden',
      }}
    >
      <div
        className="groom-scene-container"
        style={{
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ========================================================
            STAGE 1: TRADITIONAL ARCHITECTURAL PORTRAIT SETTING
            ======================================================== */}
        <OrnamentalPortraitFrame
          variant="architectural"
          auraOpacity={auraOpacity}
          frameScale={frameScale}
        >
          <motion.div
            style={{
              y: actorY,
              scale: actorScale,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            {/* Approved Editorial Groom Illustration */}
            <GroomIllustration width="clamp(160px, 25vw, 240px)" />
          </motion.div>
        </OrnamentalPortraitFrame>

        {/* ========================================================
            STAGES 2, 3, 4: SEQUENTIAL TEXT REVEAL
            (Name -> Parents -> Hometown)
            ======================================================== */}
        <SequentialTextReveal
          person={WEDDING_DETAILS.couple.groom}
          localProgress={localProgress}
        />
      </div>
    </motion.section>
  );
}
