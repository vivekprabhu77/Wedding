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
    const wheelSensitivity = ctrlCfg.wheelSensitivity ?? 0.78;
    const maxInputPerEventPx = ctrlCfg.maxInputPerEventPx ?? 72;
    const maxWheelBurstBucketPx = ctrlCfg.maxWheelBurstBucketPx ?? 340;
    const wheelBucketRefillPxPerSec = ctrlCfg.wheelBucketRefillPxPerSec ?? 460;

    let forwardBucketPx = maxWheelBurstBucketPx;
    let lastBucketTime = performance.now();
    let lastBucketDir = 0;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
          const now = performance.now();
          const dtSec = Math.min(0.25, Math.max(0.001, (now - lastBucketTime) / 1000));
          lastBucketTime = now;

          const dir = Math.sign(data.deltaY);
          // Reset forward burst regulator immediately on backward intent so reverse responds 1:1
          if (dir < 0 && lastBucketDir > 0) {
            forwardBucketPx = maxWheelBurstBucketPx;
          }
          lastBucketDir = dir;

          let mag = Math.abs(data.deltaY);
          if (dir > 0) {
            // Forward scroll: preserve crisp normal wheel ticks while soft-compressing extreme spikes
            if (mag > maxInputPerEventPx) {
              const excess = mag - maxInputPerEventPx;
              mag = Math.min(maxInputPerEventPx * 1.65, maxInputPerEventPx + excess * 0.25);
            }
            forwardBucketPx = Math.min(
              maxWheelBurstBucketPx,
              forwardBucketPx + wheelBucketRefillPxPerSec * dtSec
            );
            const allowed = Math.min(mag, forwardBucketPx);
            forwardBucketPx = Math.max(0, forwardBucketPx - allowed);
            // Keep strictly non-zero (0.05px min) so Lenis still executes preventDefault() on wheel
            data.deltaY = Math.max(0.05, allowed);
          } else {
            // Backward scroll: nimble and responsive while shaping extreme outlier ticks
            const reverseMax = maxInputPerEventPx * 1.5;
            if (mag > reverseMax) {
              const excess = mag - reverseMax;
              mag = Math.min(reverseMax * 1.3, reverseMax + excess * 0.25);
            }
            data.deltaY = -Math.max(0.05, mag);
          }
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
