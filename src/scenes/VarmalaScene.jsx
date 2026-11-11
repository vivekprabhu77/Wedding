import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useSceneTimeline } from '../hooks/useWeddingTimeline';
import { WEDDING_DETAILS } from '../data/weddingDetails';
import {
  EditorialBride,
  EditorialGroom,
  EditorialGroomPlaces,
  EditorialBridePlaces,
  EditorialCoupleAdorned,
} from '../illustrations/EditorialActors';
import DeterministicPetals from '../illustrations/varmala/DeterministicPetals';
import OrnamentalDivider from '../components/OrnamentalDivider';

/**
 * Scene 2: The Sacred Varmala Ceremony Scene (12% – 34% of Master Timeline)
 *
 * LUXURY EDITORIAL CHOREOGRAPHY (WedMeGood / Vogue Wedding Style):
 * - Terrace Stage Frame: Pure visual art (lake palace, checkered marble floor, latkans, couple).
 * - Downside Narrative: All titles, captions, and couple names are positioned BELOW the image
 *   for 100% crystal-clear readability with zero text covering the couple's heads or hands.
 * - Stage 1 (0.00 – 0.12): Empty Royal Terrace Court.
 * - Stage 2 (0.12 – 0.32): Entrances. Bride from left, Groom from right holding loose garlands.
 * - Stage 3 (0.32 – 0.44): Taking positions & turning gracefully towards each other.
 * - Stage 4 (0.44 – 0.62): Groom places garland over Bride's head.
 * - Stage 5 (0.62 – 0.78): Bride places garland over Groom's head.
 * - Stage 6 (0.78 – 1.00): Grand celebration. Completed couple adorned in Varmalas, Akshate shower,
 *   Vedic Shloka, and regal reveal of VIGHNESH & RASHMITHA.
 */
export default function VarmalaScene() {
  const { localProgress, opacity, y, scale, isActive, sceneConfig } =
    useSceneTimeline('varmala');

  // ========================================================
  // STAGE 1 & 2: APPROACH FROM EDGES
  // Bride from Left (-65vw -> -11vw), Groom from Right (+65vw -> +11vw)
  // ========================================================
  const brideXRaw = useTransform(
    localProgress,
    [0.00, 0.12, 0.32, 0.44],
    [-65, -65, -11, -7]
  );
  const brideX = useTransform(brideXRaw, (v) => `${v}vw`);

  const groomXRaw = useTransform(
    localProgress,
    [0.00, 0.12, 0.32, 0.44],
    [65, 65, 11, 7]
  );
  const groomX = useTransform(groomXRaw, (v) => `${v}vw`);

  // ========================================================
  // STAGE 2 -> 3: 3D ORIENTATION / GRACEFUL TURNING
  // Stage 2: 0deg (Faces Audience / Viewer)
  // Stage 3: Turns 24deg towards partner
  // ========================================================
  const brideRotateYRaw = useTransform(
    localProgress,
    [0.00, 0.30, 0.42],
    [0, 0, 24]
  );
  const brideRotateY = useTransform(brideRotateYRaw, (v) => `${v}deg`);

  const groomRotateYRaw = useTransform(
    localProgress,
    [0.00, 0.30, 0.42],
    [0, 0, -24]
  );
  const groomRotateY = useTransform(groomRotateYRaw, (v) => `${v}deg`);

  // Solo actors opacity during Stages 2 and 3:
  // Fades in at entry (0.10 -> 0.18), stays visible through 0.42, dissolves out by 0.47
  const soloActorsOpacity = useTransform(
    localProgress,
    [0.10, 0.18, 0.42, 0.47],
    [0, 1, 1, 0]
  );

  // ========================================================
  // STAGE 4: GROOM PLACES GARLAND ON BRIDE (0.44 -> 0.62)
  // ========================================================
  const groomPlacesOpacity = useTransform(
    localProgress,
    [0.44, 0.48, 0.58, 0.63],
    [0, 1, 1, 0]
  );
  const groomPlacesScale = useTransform(
    localProgress,
    [0.44, 0.53, 0.62],
    [0.98, 1.01, 0.99]
  );

  // ========================================================
  // STAGE 5: BRIDE PLACES GARLAND ON GROOM (0.62 -> 0.78)
  // ========================================================
  const bridePlacesOpacity = useTransform(
    localProgress,
    [0.60, 0.64, 0.74, 0.79],
    [0, 1, 1, 0]
  );
  const bridePlacesScale = useTransform(
    localProgress,
    [0.60, 0.69, 0.78],
    [0.98, 1.01, 0.99]
  );

  // ========================================================
  // STAGE 6: COMPLETED COUPLE ADORNED TOGETHER (0.78 -> 1.00)
  // ========================================================
  const coupleAdornedOpacity = useTransform(
    localProgress,
    [0.76, 0.82],
    [0, 1]
  );
  const coupleAdornedScale = useTransform(
    localProgress,
    [0.76, 0.88],
    [0.97, 1.0]
  );

  const celebrationGlowOpacity = useTransform(
    localProgress,
    [0.75, 0.85],
    [0, 0.88]
  );

  // Downside narrative crossfades (placed cleanly BELOW the terrace image)
  const stage1TextOpacity = useTransform(localProgress, [0.08, 0.16, 0.38, 0.43], [0, 1, 1, 0]);
  const stage4TextOpacity = useTransform(localProgress, [0.44, 0.49, 0.58, 0.62], [0, 1, 1, 0]);
  const stage5TextOpacity = useTransform(localProgress, [0.62, 0.67, 0.74, 0.78], [0, 1, 1, 0]);

  const namesOpacity = useTransform(localProgress, [0.78, 0.86], [0, 1]);
  const namesY = useTransform(localProgress, [0.78, 0.86], [16, 0]);
  const namesScale = useTransform(localProgress, [0.78, 0.87], [0.97, 1.0]);

  return (
    <motion.section
      id="scene-varmala"
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
        padding: 'clamp(4px, 1.5vw, 16px)',
        opacity,
        y,
        scale,
        pointerEvents: isActive ? 'auto' : 'none',
        overflow: 'hidden',
      }}
    >
      <div
        className="varmala-scene-container"
        style={{
          maxWidth: '1040px',
          width: '100%',
          height: '100%',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ========================================================
            ROYAL PALACE TERRACE SCENIC STAGE (PURE VISUAL ART)
            Zero text overlap — couple heads & garlands 100% visible
            ======================================================== */}
        <div
          className="royal-terrace-stage-frame"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '920px',
            height: 'clamp(290px, 50vh, 460px)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(182, 138, 67, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            perspective: '1200px',
            flexShrink: 0,
          }}
        >
          {/* Scenic Royal Palace Background Image */}
          <img
            src="./decorations/royal_palace_terrace_background.jpg"
            alt="Royal Palace Wedding Terrace"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 75%',
              zIndex: 1,
            }}
          />

          {/* Elegant Ambient Vignette Gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(39, 8, 13, 0.15) 0%, transparent 40%, rgba(39, 8, 13, 0.45) 85%, rgba(39, 8, 13, 0.85) 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Celebratory Radial Glow */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(480px, 90%)',
              height: 'min(480px, 90%)',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(223, 186, 115, 0.38) 0%, rgba(182, 138, 67, 0.18) 50%, transparent 75%)',
              opacity: celebrationGlowOpacity,
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {/* ========================================================
              ACTORS ON THE CHECKERED MARBLE TERRACE
              ======================================================== */}
          <div
            className="terrace-actors-container"
            style={{
              position: 'relative',
              width: '100%',
              height: '92%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              zIndex: 15,
              paddingBottom: '12px',
            }}
          >
            {/* --- SOLO BRIDE (Stages 2-3) --- */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '12px',
                x: brideX,
                rotateY: brideRotateY,
                transformStyle: 'preserve-3d',
                opacity: soloActorsOpacity,
                zIndex: 20,
              }}
            >
              <EditorialBride
                width="clamp(150px, 22vw, 240px)"
              />
            </motion.div>

            {/* --- SOLO GROOM (Stages 2-3) --- */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '12px',
                x: groomX,
                rotateY: groomRotateY,
                transformStyle: 'preserve-3d',
                opacity: soloActorsOpacity,
                zIndex: 20,
              }}
            >
              <EditorialGroom
                width="clamp(150px, 22vw, 240px)"
              />
            </motion.div>

            {/* --- STAGE 4: GROOM PLACES GARLAND ON BRIDE --- */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                x: '-50%',
                opacity: groomPlacesOpacity,
                scale: groomPlacesScale,
                zIndex: 24,
                pointerEvents: 'none',
              }}
            >
              <EditorialGroomPlaces width="clamp(200px, 30vw, 320px)" />
            </motion.div>

            {/* --- STAGE 5: BRIDE PLACES GARLAND ON GROOM --- */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                x: '-50%',
                opacity: bridePlacesOpacity,
                scale: bridePlacesScale,
                zIndex: 25,
                pointerEvents: 'none',
              }}
            >
              <EditorialBridePlaces width="clamp(200px, 30vw, 320px)" />
            </motion.div>

            {/* --- STAGE 6: COMPLETED COUPLE ADORNED TOGETHER IN FULL GLORY --- */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                x: '-50%',
                opacity: coupleAdornedOpacity,
                scale: coupleAdornedScale,
                zIndex: 26,
              }}
            >
              <EditorialCoupleAdorned width="clamp(200px, 30vw, 320px)" />
            </motion.div>

            {/* Celebratory Petals & Akshate Shower */}
            <DeterministicPetals progress={localProgress} />
          </div>
        </div>

        {/* ========================================================
            DOWNSIDE NARRATIVE & CEREMONY TEXTS (BELOW THE IMAGE)
            Crystal-clear readability on deep royal maroon canvas
            ======================================================== */}
        <div
          className="varmala-downside-narrative"
          style={{
            width: '100%',
            maxWidth: 'min(780px, 94vw)',
            minHeight: 'clamp(95px, 18vh, 140px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'clamp(8px, 1.6vh, 16px)',
            position: 'relative',
            padding: '0 12px',
            boxSizing: 'border-box',
          }}
        >
          {/* --- STAGES 1, 2, 3 NARRATIVE --- */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              y: '-50%',
              opacity: stage1TextOpacity,
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          >
            <h2
              className="editorial-display"
              style={{
                fontSize: 'clamp(1.25rem, 3.8vw, 1.9rem)',
                color: '#FFF2D6',
                fontWeight: 600,
                letterSpacing: '0.06em',
                margin: '2px 0 4px',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              The Sacred Varmala Ceremony
            </h2>
            <OrnamentalDivider width="min(180px, 40%)" style={{ margin: '2px auto 6px' }} />
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.02rem, 3vw, 1.2rem)',
                color: '#F8E7C0',
                margin: 0,
              }}
            >
              The exchange of sacred garlands uniting two souls
            </p>
          </motion.div>

          {/* --- STAGE 4 NARRATIVE: GROOM ADORNS BRIDE --- */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              y: '-50%',
              opacity: stage4TextOpacity,
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
                letterSpacing: '0.18em',
                color: 'var(--color-gold-light)',
                textTransform: 'uppercase',
                opacity: 0.9,
                marginBottom: '3px',
              }}
            >
              The Sacred Offering
            </div>
            <h2
              className="editorial-display"
              style={{
                fontSize: 'clamp(1.25rem, 3.8vw, 1.9rem)',
                color: '#FFF2D6',
                fontWeight: 600,
                letterSpacing: '0.06em',
                margin: '2px 0 4px',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              Chi. Vighnesh Adorns The Bride
            </h2>
            <OrnamentalDivider width="min(180px, 40%)" style={{ margin: '2px auto 6px' }} />
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.02rem, 3vw, 1.2rem)',
                color: '#F8E7C0',
                margin: 0,
              }}
            >
              With lifelong devotion, the groom places the sacred Varmala
            </p>
          </motion.div>

          {/* --- STAGE 5 NARRATIVE: BRIDE ADORNS GROOM --- */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              y: '-50%',
              opacity: stage5TextOpacity,
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
                letterSpacing: '0.18em',
                color: 'var(--color-gold-light)',
                textTransform: 'uppercase',
                opacity: 0.9,
                marginBottom: '3px',
              }}
            >
              The Reciprocal Blessing
            </div>
            <h2
              className="editorial-display"
              style={{
                fontSize: 'clamp(1.25rem, 3.8vw, 1.9rem)',
                color: '#FFF2D6',
                fontWeight: 600,
                letterSpacing: '0.06em',
                margin: '2px 0 4px',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              Chi. Sou. Rashmitha Adorns The Groom
            </h2>
            <OrnamentalDivider width="min(180px, 40%)" style={{ margin: '2px auto 6px' }} />
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.02rem, 3vw, 1.2rem)',
                color: '#F8E7C0',
                margin: 0,
              }}
            >
              With grace and joy, the bride crowns her beloved
            </p>
          </motion.div>

          {/* --- STAGE 6: COMPLETED COUPLE CELEBRATION --- */}
          <motion.div
            style={{
              opacity: namesOpacity,
              y: namesY,
              scale: namesScale,
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Shloka */}
            <p
              className="sanskrit-text"
              style={{
                color: 'var(--color-gold-light)',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.06rem)',
                lineHeight: 1.4,
                fontWeight: 500,
                fontStyle: 'italic',
                margin: '0 0 3px',
                maxWidth: '620px',
              }}
            >
              {WEDDING_DETAILS.shlokas.varmalaShloka}
            </p>

            {/* Couple Grand Title */}
            <h1
              className="couple-grand-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.04rem, 4.3vw, 2.25rem)',
                fontWeight: 700,
                letterSpacing: 'clamp(0.03em, 0.16vw, 0.16em)',
                color: 'var(--color-gold-light)',
                textTransform: 'uppercase',
                margin: '1px 0 3px',
                textShadow:
                  '0 2px 14px rgba(223, 186, 115, 0.4), 0 4px 28px rgba(0, 0, 0, 0.9)',
                whiteSpace: 'nowrap',
              }}
            >
              {WEDDING_DETAILS.couple.groom.name} &amp; {WEDDING_DETAILS.couple.bride.name}
            </h1>

            <OrnamentalDivider width="min(220px, 50%)" style={{ margin: '2px auto 4px' }} />

            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(0.92rem, 2.6vw, 1.08rem)',
                color: 'var(--color-cream)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              {WEDDING_DETAILS.date.display} · {WEDDING_DETAILS.venue.location}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
