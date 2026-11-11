import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Lenis Smooth Scroll Context
 * Exposes the active Lenis instance to any child component.
 */
const SmoothScrollContext = createContext(null);

/**
 * Hook to access the active Lenis smooth-scroll instance
 * @returns {Lenis|null}
 */
export function useLenis() {
  return useContext(SmoothScrollContext);
}

/**
 * SmoothScroll Component
 * Single application-level Lenis smooth-scroll provider.
 *
 * Requirements:
 * - Initializes Lenis once at the root level.
 * - Synchronizes with browser rendering via a single requestAnimationFrame loop.
 * - Preserves natural touch scrolling on mobile devices (no artificial touch delay).
 * - Respects prefers-reduced-motion (disables smoothing when requested).
 * - Properly cleans up animation frames and destroys the Lenis instance on unmount.
 * - Handles in-page anchor navigation smoothly through Lenis.
 */
export default function SmoothScroll({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const lenisRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Configure Lenis with cinematic, natural scrolling curve
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false, // Preserves 100% natural mobile touch responsiveness
      autoResize: true,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Single requestAnimationFrame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global in-page anchor link handler (e.g. for #scene-venue)
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        lenis.scrollTo(targetElement, {
          offset: 0,
          duration: prefersReducedMotion ? 0 : 1.2,
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [prefersReducedMotion]);

  return (
    <SmoothScrollContext.Provider value={lenisInstance}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

