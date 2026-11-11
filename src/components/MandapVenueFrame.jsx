import React from 'react';
import { motion } from 'framer-motion';
import {
  MandapCanopyArch,
  MandapFloralToranam,
  MandapPillar,
  ThookuVilakku,
} from '../illustrations/MandapIllustration';

/**
 * MandapVenueFrame
 * Traditional South Indian Kalyana Mandapa architectural sanctuary composition.
 * Replaces generic boxed venue cards with twin fluted pillars supporting a sweeping
 * temple cornice arch, interior mango-leaf & jasmine toranam garlands,
 * hanging brass deepams, and a stepped Adhishthana threshold plinth.
 */
export default function MandapVenueFrame({
  children,
  frameScale,
  frameOpacity,
  pillarsOpacity,
  leftPillarX,
  rightPillarX,
  archOpacity,
  floralOpacity,
  floralY,
  lampGlowOpacity,
  isCompact = false,
}) {
  return (
    <motion.div
      className="mandap-venue-pavilion"
      style={{
        scale: frameScale,
        opacity: frameOpacity,
        width: '100%',
        maxWidth: isCompact ? 'min(420px, 95vw)' : 'min(700px, 90vw)',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Temple Canopy Arch & Cornice Beam resting directly on Twin Pillars */}
      <MandapCanopyArch archOpacity={archOpacity} />

      {/* Sanctuary Body: Left Pillar | Illuminated Sanctum Interior | Right Pillar */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          marginTop: '-1px',
          background:
            'radial-gradient(ellipse at 50% 46%, rgba(248, 243, 233, 0.08) 0%, rgba(112, 31, 42, 0.24) 52%, rgba(39, 8, 13, 0.34) 100%)',
          borderBottom: '1px solid rgba(182, 138, 67, 0.45)',
        }}
      >
        {/* Subtle Temple Green & Antique Gold Inner Architectural Sanctum Lines */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: isCompact ? '0 18px 4px' : '0 38px 6px',
            borderLeft: '1px solid rgba(223, 186, 115, 0.14)',
            borderRight: '1px solid rgba(223, 186, 115, 0.14)',
            borderBottom: '1px solid rgba(38, 61, 48, 0.42)',
            pointerEvents: 'none',
          }}
        />

        {/* Interior Jasmine & Mango-Leaf Toranam Draped Directly Under Lintel */}
        <MandapFloralToranam
          floralOpacity={floralOpacity}
          floralY={floralY}
          isCompact={isCompact}
        />

        {/* Suspended Brass Temple Hanging Lamps inside the eaves */}
        <ThookuVilakku
          side="left"
          glowOpacity={lampGlowOpacity}
          isCompact={isCompact}
        />
        <ThookuVilakku
          side="right"
          glowOpacity={lampGlowOpacity}
          isCompact={isCompact}
        />

        {/* Left Carved Temple Pillar */}
        <motion.div
          style={{
            opacity: pillarsOpacity,
            x: leftPillarX,
            display: 'flex',
            alignItems: 'stretch',
            zIndex: 4,
          }}
        >
          <MandapPillar side="left" isCompact={isCompact} />
        </motion.div>

        {/* Central Sanctuary Content Area (Guaranteed Pillar & Toranam Clearance) */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isCompact
              ? 'clamp(28px, 5.2vh, 38px) clamp(10px, 2.5vw, 16px) clamp(14px, 2.8vh, 20px)'
              : 'clamp(36px, 5.8vh, 48px) clamp(20px, 3.2vw, 34px) clamp(20px, 3.4vh, 28px)',
          }}
        >
          {children}
        </div>

        {/* Right Carved Temple Pillar */}
        <motion.div
          style={{
            opacity: pillarsOpacity,
            x: rightPillarX,
            display: 'flex',
            alignItems: 'stretch',
            zIndex: 4,
          }}
        >
          <MandapPillar side="right" isCompact={isCompact} />
        </motion.div>
      </div>

      {/* Stepped Temple Mandap Base Plinth (Adhishthana) */}
      <div
        aria-hidden="true"
        style={{
          width: '98%',
          height: isCompact ? '6px' : '9px',
          background:
            'linear-gradient(90deg, rgba(130, 95, 40, 0.35) 0%, rgba(223, 186, 115, 0.72) 50%, rgba(130, 95, 40, 0.35) 100%)',
          borderBottomLeftRadius: '3px',
          borderBottomRightRadius: '3px',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.45)',
        }}
      />
    </motion.div>
  );
}
