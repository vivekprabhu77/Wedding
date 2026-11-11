import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import CinematicViewport from './components/CinematicViewport';
import './styles/global.css';
import './styles/animations.css';

/**
 * Root Application Component
 * Chi. Vighnesh × Chi. Sou. Rashmitha
 * Phase 2 — Lenis Smooth Scroll + Cinematic Wedding Experience Foundation
 */
export default function App() {
  return (
    <SmoothScroll>
      <main
        id="wedding-experience-root"
        aria-label="Chi. Vighnesh and Chi. Sou. Rashmitha Wedding Invitation"
        style={{
          width: '100%',
          minHeight: '100dvh',
          position: 'relative',
          backgroundColor: 'var(--color-maroon-dark)',
        }}
      >
        <h1 className="sr-only">
          Wedding Invitation of Chi. Vighnesh and Chi. Sou. Rashmitha - 26 November 2026
        </h1>
        <CinematicViewport />
      </main>
    </SmoothScroll>
  );
}
