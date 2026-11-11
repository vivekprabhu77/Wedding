import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneTimeline } from '../hooks/useWeddingTimeline';
import { WEDDING_DETAILS } from '../data/weddingDetails';
import BrideIllustration from '../illustrations/BrideIllustration';
import OrnamentalPortraitFrame from '../components/OrnamentalPortraitFrame';
import SequentialTextReveal from '../components/SequentialTextReveal';

/**
 * Scene 4: Bride Introduction Scene (45% – 56% of Master Timeline)
 *
 * Traditional Indian Bridal Portrait of Chi. Sou. Rashmitha:
 * - Stage 1 (0.00 – 0.28): Graceful floral bridal frame emerges with lotus flourishes and warm glow;
 *   re-uses the approved luxury editorial bride illustration.
 * - Stage 2 (0.28 – 0.50): Sequential Name reveal (CHI. SOU. then RASHMITHA in prominent classical serif).
 * - Stage 3 (0.50 – 0.74): Parents reveal (Daughter of -> Smt. Jayanthi & Late Ramadas S. Pai).
 * - Stage 4 (0.74 – 1.00): Hometown reveal (SANTHEKATTE · Udupi), held before transitioning to Muhurtham.
 */
export default function BrideScene() {
  const { localProgress, opacity, y, scale, isActive, sceneConfig } =
    useSceneTimeline('bride');

  // Stage 1: Portrait Entrance Transforms
  const actorY = useTransform(localProgress, [0.0, 0.28], [28, 0]);
  const actorScale = useTransform(localProgress, [0.0, 0.35, 0.85, 1.0], [0.95, 1.0, 1.0, 0.98]);
  const auraOpacity = useTransform(localProgress, [0.08, 0.32, 0.85, 1.0], [0, 0.85, 0.85, 0.4]);
  const frameScale = useTransform(localProgress, [0.0, 0.30], [0.94, 1.0]);

  return (
    <motion.section
      id="scene-bride"
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
        className="bride-scene-container"
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
            STAGE 1: TRADITIONAL FLORAL BRIDAL PORTRAIT SETTING
            ======================================================== */}
        <OrnamentalPortraitFrame
          variant="floral"
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
            {/* Approved Editorial Bride Illustration */}
            <BrideIllustration width="clamp(160px, 25vw, 240px)" />
          </motion.div>
        </OrnamentalPortraitFrame>

        {/* ========================================================
            STAGES 2, 3, 4: SEQUENTIAL TEXT REVEAL
            (Name -> Parents -> Hometown)
            ======================================================== */}
        <SequentialTextReveal
          person={WEDDING_DETAILS.couple.bride}
          localProgress={localProgress}
        />
      </div>
    </motion.section>
  );
}
