import React from 'react';
import OpeningScene from '../scenes/OpeningScene';
import VarmalaScene from '../scenes/VarmalaScene';
import GroomScene from '../scenes/GroomScene';
import BrideScene from '../scenes/BrideScene';
import MuhurthamScene from '../scenes/MuhurthamScene';
import VenueScene from '../scenes/VenueScene';
import BlessingScene from '../scenes/BlessingScene';

/**
 * SceneRenderer Component
 * Orchestrates the seven continuous cinematic scenes within the pinned viewport.
 * All scenes are mounted within the coordinate space; their visibility, opacity,
 * and transforms are smoothly managed by Framer Motion and useWeddingTimeline.
 */
export default function SceneRenderer() {
  return (
    <div
      className="scene-viewport-stage"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: 'var(--viewport-max-width, 1440px)',
        margin: '0 auto',
        overflow: 'hidden',
        pointerEvents: 'auto',
        zIndex: 'var(--z-scene-content, 10)',
      }}
    >
      <OpeningScene />
      <VarmalaScene />
      <GroomScene />
      <BrideScene />
      <MuhurthamScene />
      <VenueScene />
      <BlessingScene />
    </div>
  );
}

