import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SCROLL_SETTINGS } from '../data/weddingDetails';

/**
 * SmoothScroll Context
 * Exposes the active single Lenis instance and frame subscriber registration
 * so the authoritative timeline controller runs inside the same animation loop.
 */
const SmoothScrollContext = createContext({
  lenis: null,
  subscribeFrame: null,
});

/**
 * Hook to access the active Lenis smooth-scroll instance
 * @returns {Lenis|null}
 */
export function useLenis() {
  const ctx = useContext(SmoothScrollContext);
  return ctx ? ctx.lenis : null;
}

/**
 * Hook to access Lenis + shared single-RAF subscription for the timeline controller
 * @returns {{ lenis: Lenis|null, subscribeFrame: ((cb: Function) => () => void)|null }}
 */
export function useSmoothScrollController() {
  return useContext(SmoothScrollContext);
}

/**
 * SmoothScroll Component
 * Single application-level Lenis smooth-scroll provider & unified animation loop.
 *
 * Requirements:
 * - Initializes Lenis once at the root level.
 * - Shapes extreme single-wheel delta bursts cleanly via Lenis virtualScroll.
 * - Runs a single requestAnimationFrame loop shared with WeddingTimelineProvider.
 * - Preserves natural touch scrolling on mobile devices.
 * - Respects prefers-reduced-motion.
 * - Properly cleans up listeners, animation frames, and destroys Lenis on unmount.
 */
export default function SmoothScroll({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const lenisRef = useRef(null);
  const frameSubscribersRef = useRef(new Set());
  const prefersReducedMotion = useReducedMotion();

  const subscribeFrame = useCallback((callback) => {
    if (typeof callback !== 'function') return () => {};
    frameSubscribersRef.current.add(callback);
    return () => {
      frameSubscribersRef.current.delete(callback);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const ctrlCfg = SCROLL_SETTINGS.controller || {};
    const lenisDuration = ctrlCfg.lenisDuration ?? 0.42;
    const wheelSensitivity = ctrlCfg.wheelSensitivity ?? 0.9;
    const maxInputPerEventPx = ctrlCfg.maxInputPerEventPx ?? 260;
    const softKneeInputPx = ctrlCfg.softKneeInputPx ?? 110;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : lenisDuration,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: wheelSensitivity,
      touchMultiplier: 1.0,
      syncTouch: false,
      autoResize: true,
      infinite: false,
      respectReducedMotion: true,
      virtualScroll: (data) => {
        if (prefersReducedMotion || !data || !data.event) return true;
        if (data.event.type === 'wheel' && data.deltaY !== 0) {
          const dir = Math.sign(data.deltaY);
          let mag = Math.abs(data.deltaY);

          // Soft knee compression for extreme single-event wheel spikes without starving normal scrolls
          if (mag > softKneeInputPx) {
            const excess = mag - softKneeInputPx;
            mag = Math.min(maxInputPerEventPx, softKneeInputPx + excess * 0.45);
          }

          data.deltaY = dir * Math.max(0.5, mag);
        }
        return true;
      },
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Single authoritative requestAnimationFrame loop driving both Lenis & timeline
    let rafId;
    function raf(time) {
      lenis.raf(time);
      frameSubscribersRef.current.forEach((listener) => {
        listener(time, lenis);
      });
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
          duration: prefersReducedMotion ? 0 : 1.3,
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [prefersReducedMotion]);

  const contextValue = useMemo(
    () => ({
      lenis: lenisInstance,
      subscribeFrame,
    }),
    [lenisInstance, subscribeFrame]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
