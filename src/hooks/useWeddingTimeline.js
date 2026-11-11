import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useTransform, useMotionValueEvent, useMotionValue } from 'framer-motion';
import { SCENE_CONFIG, SCROLL_SETTINGS } from '../data/weddingDetails';
import { useSmoothScrollController } from '../components/SmoothScroll';
import { useReducedMotion } from './useReducedMotion';

/**
 * React Context for the Master Wedding Timeline
 */
const WeddingTimelineContext = createContext(null);

const DEFAULT_CONTROLLER_CFG = {
  normalLerpSpeed: 12.0,
  maxSteadyForwardVelocity: 0.22,
  maxBackwardVelocity: 0.48,
  directNavVelocity: 1.15,
  minScenePresentationMs: {
    opening: 1250,
    varmala: 1750,
    groom: 1350,
    bride: 1350,
    muhurtham: 1450,
    venue: 1450,
    blessings: 1200,
  },
};

function clamp01(val) {
  if (!Number.isFinite(val)) return 0;
  return Math.max(0, Math.min(1, val));
}

function findSceneIndex(p) {
  if (p >= 1.0) return SCENE_CONFIG.length - 1;
  if (p <= 0.0) return 0;
  for (let i = 0; i < SCENE_CONFIG.length; i += 1) {
    const [start, end] = SCENE_CONFIG[i].range;
    if (p >= start && p < end) {
      return i;
    }
  }
  return SCENE_CONFIG.length - 1;
}

/**
 * Computes the scene progression exit checkpoint.
 * Sits right after the scene's primary reveal completes and just before its
 * exit crossfade cliff so every scene receives a full presentation window.
 */
function getSceneExitGate(scene) {
  const [start, end] = scene.range;
  if (end >= 1.0) return 1.0;
  const duration = end - start;
  const buffer = Math.min(0.018, duration * 0.12);
  if (start === 0) {
    // Opening canvas rests crisp before dissolving cleanly across [0.75..0.98] local
    return Math.max(start + duration * 0.78, end - buffer * 1.6);
  }
  return Math.max(start + duration * 0.72, end - buffer * 0.8);
}

function computeActiveMask(progress) {
  let mask = 0;
  for (let i = 0; i < SCENE_CONFIG.length; i += 1) {
    const [start, end] = SCENE_CONFIG[i].range;
    const duration = end - start;
    const buffer = Math.min(0.018, duration * 0.12);
    if (progress >= start - buffer && progress <= end + buffer) {
      mask |= 1 << i;
    }
  }
  return mask;
}

/**
 * Provider component wrapping the cinematic viewport.
 * Acts as the single authoritative timeline-progress controller between raw
 * browser/Lenis scroll input and Framer Motion scene choreography.
 */
export function WeddingTimelineProvider({ scrollYProgress, children }) {
  // Support deterministic visual testing via window.__MOCK_PROGRESS__, hash (#0.XX), or ?mockProgress=0.XX
  const mockParam = useMemo(() => {
    if (typeof window === 'undefined') return null;
    if (typeof window.__MOCK_PROGRESS__ === 'number') {
      return clamp01(window.__MOCK_PROGRESS__);
    }
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const match = hash.match(/([\d\.]+)/);
      if (match) return clamp01(parseFloat(match[1]));
    }
    const p = new URLSearchParams(window.location.search).get('mockProgress');
    return p !== null ? clamp01(parseFloat(p)) : null;
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const { lenis, subscribeFrame } = useSmoothScrollController();

  const initialRaw = mockParam !== null ? mockParam : clamp01(scrollYProgress.get() || 0);
  const mockMotionValue = useMotionValue(mockParam ?? 0);
  const controlledProgress = useMotionValue(initialRaw);

  const activeMotionValue = mockParam !== null ? mockMotionValue : controlledProgress;

  const [activeSceneIndex, setActiveSceneIndex] = useState(() => findSceneIndex(initialRaw));
  const [activeMask, setActiveMask] = useState(() => computeActiveMask(initialRaw));
  const [currentProgress, setCurrentProgress] = useState(initialRaw);

  const stateRef = useRef({
    displayed: initialRaw,
    prevRawTarget: initialRaw,
    effectiveTarget: initialRaw,
    lastTime: typeof performance !== 'undefined' ? performance.now() : 0,
    sceneIndex: findSceneIndex(initialRaw),
    sceneEnteredAt: typeof performance !== 'undefined' ? performance.now() : 0,
    lastWheelAt: -Infinity,
    lastTouchAt: -Infinity,
    lastStepKeyAt: -Infinity,
    lastJumpKeyAt: -Infinity,
    lastScrollbarAt: -Infinity,
    activeDirectNav: false,
    lastInputDir: 0,
    lastTouchY: null,
    isTouching: false,
    isScrollbarPointerDown: false,
    needsTouchSyncOnEnd: false,
    reconcilingTo: 0,
    reconcilingUntil: -Infinity,
    lastPublishedMask: computeActiveMask(initialRaw),
    lastPublishedSceneIdx: findSceneIndex(initialRaw),
    lastPublishedProgress: initialRaw,
  });

  // Track raw input intent (wheel, touch, keyboard, scrollbar) to classify
  // direct navigation vs accidental velocity surges without hijacking scroll.
  useEffect(() => {
    if (mockParam !== null || typeof window === 'undefined') return undefined;

    const handleWheel = (e) => {
      const st = stateRef.current;
      st.lastWheelAt = performance.now();
      st.activeDirectNav = false;
      if (e.deltaY !== 0) {
        st.lastInputDir = Math.sign(e.deltaY);
      }
    };

    const handleTouchStart = (e) => {
      const st = stateRef.current;
      const now = performance.now();
      st.isTouching = true;
      st.lastTouchAt = now;
      st.activeDirectNav = false;
      if (e.touches && e.touches.length > 0) {
        st.lastTouchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      const st = stateRef.current;
      const now = performance.now();
      st.isTouching = true;
      st.lastTouchAt = now;
      st.activeDirectNav = false;
      if (e.touches && e.touches.length > 0) {
        const curY = e.touches[0].clientY;
        if (st.lastTouchY !== null) {
          const dy = st.lastTouchY - curY; // Positive when swiping up (scrolling down)
          if (Math.abs(dy) > 1) {
            st.lastInputDir = Math.sign(dy);
          }
        }
        st.lastTouchY = curY;
      }
    };

    const handleTouchEnd = () => {
      const st = stateRef.current;
      st.isTouching = false;
      st.lastTouchAt = performance.now();
      st.lastTouchY = null;
    };

    const handleKeyDown = (e) => {
      const st = stateRef.current;
      const now = performance.now();
      if (e.key === 'PageDown' || e.key === 'ArrowDown') {
        st.lastStepKeyAt = now;
        st.activeDirectNav = false;
        st.lastInputDir = 1;
      } else if (e.key === 'PageUp' || e.key === 'ArrowUp') {
        st.lastStepKeyAt = now;
        st.activeDirectNav = false;
        st.lastInputDir = -1;
      } else if (e.key === ' ') {
        st.lastStepKeyAt = now;
        st.activeDirectNav = false;
        st.lastInputDir = e.shiftKey ? -1 : 1;
      } else if (e.key === 'End') {
        st.lastJumpKeyAt = now;
        st.activeDirectNav = true;
        st.lastInputDir = 1;
      } else if (e.key === 'Home') {
        st.lastJumpKeyAt = now;
        st.activeDirectNav = true;
        st.lastInputDir = -1;
      }
    };

    const handlePointerDown = (e) => {
      const st = stateRef.current;
      const docWidth = document.documentElement.clientWidth;
      // Detect clicks near/on the right scrollbar track
      if (e.clientX >= docWidth - 4) {
        st.isScrollbarPointerDown = true;
        st.activeDirectNav = true;
        st.lastScrollbarAt = performance.now();
      }
    };

    const handlePointerUp = () => {
      stateRef.current.isScrollbarPointerDown = false;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('blur', handlePointerUp);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('blur', handlePointerUp);
    };
  }, [mockParam]);

  // Helper to publish state only on scene transitions or meaningful progress deltas
  const publishControlled = useMemo(
    () => (val) => {
      const st = stateRef.current;
      const mask = computeActiveMask(val);
      const idx = val >= 1.0 ? SCENE_CONFIG.length - 1 : findSceneIndex(val);

      if (mask !== st.lastPublishedMask) {
        st.lastPublishedMask = mask;
        setActiveMask(mask);
      }
      if (idx !== st.lastPublishedSceneIdx) {
        st.lastPublishedSceneIdx = idx;
        setActiveSceneIndex(idx);
      }
      if (Math.abs(val - st.lastPublishedProgress) >= 0.015 || val === 0 || val === 1) {
        st.lastPublishedProgress = val;
        setCurrentProgress(val);
      }
    },
    []
  );

  // Reduced-motion direct tracking mode (instant 1:1 follow without smoothing delay)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (mockParam !== null || !prefersReducedMotion) return;
    const clamped = clamp01(latest);
    stateRef.current.displayed = clamped;
    stateRef.current.effectiveTarget = clamped;
    stateRef.current.prevRawTarget = clamped;
    controlledProgress.set(clamped);
    publishControlled(clamped);
  });

  // Subscribe to the single root Lenis animation frame loop
  useEffect(() => {
    if (mockParam !== null || prefersReducedMotion || !subscribeFrame) {
      return undefined;
    }

    const cfg = {
      ...DEFAULT_CONTROLLER_CFG,
      ...(SCROLL_SETTINGS.controller || {}),
      minScenePresentationMs: {
        ...DEFAULT_CONTROLLER_CFG.minScenePresentationMs,
        ...(SCROLL_SETTINGS.controller?.minScenePresentationMs || {}),
      },
    };

    const st = stateRef.current;
    const nowInit = performance.now();
    const rawNow = clamp01(scrollYProgress.get() || 0);
    st.displayed = rawNow;
    st.prevRawTarget = rawNow;
    st.effectiveTarget = rawNow;
    st.lastTime = nowInit;
    st.sceneIndex = findSceneIndex(rawNow);
    st.sceneEnteredAt = nowInit;

    const unsubscribe = subscribeFrame((_rafTime, activeLenis) => {
      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0.001, (now - st.lastTime) / 1000));
      st.lastTime = now;

      const rawTarget = clamp01(scrollYProgress.get() || 0);
      let deltaRaw = rawTarget - st.prevRawTarget;

      // Ignore synthetic delta triggered when reconciling buffered scroll on reverse
      if (now < st.reconcilingUntil && Math.abs(rawTarget - st.reconcilingTo) < 0.03) {
        deltaRaw = 0;
      }
      st.prevRawTarget = rawTarget;

      // Classify active scroll source
      const recentWheel = now - st.lastWheelAt < 800;
      const recentTouch = st.isTouching || now - st.lastTouchAt < 2400;
      const recentStepKey = now - st.lastStepKeyAt < 900;
      const recentJumpKey = now - st.lastJumpKeyAt < 900;
      const activeLenisObj = activeLenis || lenis;
      const isProgrammaticLenis = Boolean(activeLenisObj && activeLenisObj.isScrolling === 'smooth');

      if (st.isScrollbarPointerDown) {
        st.lastScrollbarAt = now;
        st.activeDirectNav = true;
      } else if (
        Math.abs(deltaRaw) > 0.0015 &&
        Math.abs(deltaRaw) < 0.25 &&
        !recentWheel &&
        !recentTouch &&
        !recentStepKey &&
        !recentJumpKey &&
        !isProgrammaticLenis
      ) {
        // Progressive native scrollbar drag outside wheel/touch/keyboard
        st.lastScrollbarAt = now;
        st.activeDirectNav = true;
      }

      if (st.activeDirectNav && !st.isScrollbarPointerDown && Math.abs(st.effectiveTarget - st.displayed) < 0.003) {
        st.activeDirectNav = false;
      }

      const isDirectNav =
        st.isScrollbarPointerDown ||
        st.activeDirectNav ||
        now - st.lastScrollbarAt < 250 ||
        recentJumpKey;
      const isAtEdgeZero = rawTarget <= 0.001;
      const isAtEdgeOne = rawTarget >= 0.999;

      // 1. Update effectiveTarget cleanly, cancelling buffered future surplus on backward reversal
      if (st.isScrollbarPointerDown || recentJumpKey || isAtEdgeZero || isAtEdgeOne) {
        st.effectiveTarget = rawTarget;
        st.needsTouchSyncOnEnd = false;
      } else {
        const recentBackwardIntent =
          st.lastInputDir < 0 &&
          (now - Math.max(st.lastWheelAt, st.lastTouchAt, st.lastStepKeyAt)) < 450;

        if (
          recentBackwardIntent &&
          deltaRaw < -0.0003 &&
          st.effectiveTarget > st.displayed + 0.012
        ) {
          const collapsed = Math.max(0, st.displayed + deltaRaw);
          st.effectiveTarget = collapsed;

          if (activeLenisObj && activeLenisObj.limit > 0) {
            if (!st.isTouching) {
              st.reconcilingTo = collapsed;
              st.reconcilingUntil = now + 120;
              st.prevRawTarget = collapsed;
              activeLenisObj.scrollTo(collapsed * activeLenisObj.limit, {
                immediate: true,
                force: true,
                programmatic: true,
              });
            } else {
              st.needsTouchSyncOnEnd = true;
            }
          }
        } else {
          st.effectiveTarget = clamp01(st.effectiveTarget + deltaRaw);
          if (
            st.needsTouchSyncOnEnd &&
            !st.isTouching &&
            activeLenisObj &&
            activeLenisObj.limit > 0
          ) {
            st.needsTouchSyncOnEnd = false;
            st.reconcilingTo = st.effectiveTarget;
            st.reconcilingUntil = now + 120;
            st.prevRawTarget = st.effectiveTarget;
            activeLenisObj.scrollTo(st.effectiveTarget * activeLenisObj.limit, {
              immediate: true,
              force: true,
              programmatic: true,
            });
          }
        }
      }

      // 2. Scene-aware velocity & presentation progression
      const curDisplayed = st.displayed;
      const curSceneIdx = findSceneIndex(curDisplayed);
      if (curSceneIdx !== st.sceneIndex) {
        st.sceneIndex = curSceneIdx;
        st.sceneEnteredAt = now;
      }

      const scene = SCENE_CONFIG[curSceneIdx];
      const sceneEnd = scene.range[1];
      const isTerminalScene = curSceneIdx >= SCENE_CONFIG.length - 1;
      const minPresentationMs = cfg.minScenePresentationMs[scene.id] ?? 1350;
      const elapsedMs = now - st.sceneEnteredAt;
      const remainingMs = Math.max(0, minPresentationMs - elapsedMs);
      const gate = getSceneExitGate(scene);

      const gap = st.effectiveTarget - curDisplayed;
      let nextDisplayed = curDisplayed;

      if (Math.abs(gap) < 0.00004) {
        nextDisplayed = st.effectiveTarget;
      } else if (isDirectNav) {
        // Direct navigation (scrollbar drag / Home / End) catches up smoothly without hard locking
        const lerpAlpha = 1 - Math.exp(-10.0 * dt);
        const rawStep = gap * lerpAlpha;
        const maxStep = cfg.directNavVelocity * dt;
        nextDisplayed = clamp01(
          curDisplayed + Math.sign(rawStep) * Math.min(Math.abs(rawStep), maxStep)
        );
      } else if (gap > 0) {
        // Forward progression: enforce scene presentation window & bounded velocity
        const gatedTarget =
          !isTerminalScene && remainingMs > 0
            ? Math.min(st.effectiveTarget, gate)
            : st.effectiveTarget;

        const targetGap = gatedTarget - curDisplayed;

        if (targetGap > 0) {
          if (!isTerminalScene && remainingMs > 0 && st.effectiveTarget > sceneEnd) {
            // Buffered fast-scroll surge across this scene: pace smoothly across its
            // choreography up to the exit gate so the scene arrives intact when dwell completes
            const remainingSec = Math.max(0.016, remainingMs / 1000);
            const paceSpeed = Math.min(
              cfg.maxSteadyForwardVelocity,
              Math.max(0.012, targetGap / remainingSec)
            );
            nextDisplayed = clamp01(curDisplayed + Math.min(targetGap, paceSpeed * dt));
          } else {
            // Normal deliberate scroll or post-presentation transition
            const lerpAlpha = 1 - Math.exp(-cfg.normalLerpSpeed * dt);
            const maxStep = cfg.maxSteadyForwardVelocity * dt;
            const desiredStep = Math.min(targetGap * lerpAlpha, maxStep);
            // Avoid crawling infinitely when close to target
            const step = targetGap < 0.0006 ? targetGap : Math.max(desiredStep, Math.min(targetGap, 0.0003));
            nextDisplayed = clamp01(curDisplayed + Math.min(targetGap, step));
          }
        }
      } else {
        // Backward progression: unconditionally smooth & responsive (zero scene lock)
        const lerpAlpha = 1 - Math.exp(-cfg.normalLerpSpeed * dt);
        const maxStep = cfg.maxBackwardVelocity * dt;
        const absGap = Math.abs(gap);
        const desiredStep = Math.min(absGap * lerpAlpha, maxStep);
        const step = absGap < 0.0006 ? absGap : Math.max(desiredStep, Math.min(absGap, 0.0004));
        nextDisplayed = clamp01(curDisplayed - Math.min(absGap, step));
      }

      if (nextDisplayed !== st.displayed) {
        st.displayed = nextDisplayed;
        controlledProgress.set(nextDisplayed);
        publishControlled(nextDisplayed);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [
    mockParam,
    prefersReducedMotion,
    subscribeFrame,
    scrollYProgress,
    controlledProgress,
    lenis,
    publishControlled,
  ]);

  const value = useMemo(
    () => ({
      scrollYProgress: activeMotionValue,
      currentProgress,
      activeSceneIndex,
      activeMask,
      activeScene: SCENE_CONFIG[activeSceneIndex] || SCENE_CONFIG[0],
      scenes: SCENE_CONFIG,
    }),
    [activeMotionValue, currentProgress, activeSceneIndex, activeMask]
  );

  return React.createElement(WeddingTimelineContext.Provider, { value }, children);
}

/**
 * Hook to access the master timeline context
 */
export function useWeddingTimeline() {
  const context = useContext(WeddingTimelineContext);
  if (!context) {
    throw new Error('useWeddingTimeline must be used within a WeddingTimelineProvider');
  }
  return context;
}

/**
 * Hook for individual scenes to derive their own animations from the master timeline.
 *
 * Provides:
 * - localProgress: MotionValue [0, 1] mapped to the scene's controlled scroll range
 * - opacity: Mathematically continuous equal-power crossfade MotionValue
 * - y: Subtle vertical parallax translation
 * - scale: Subtle depth zooming
 * - isActive: Boolean flag indicating if current controlled progress falls in this scene
 * - sceneConfig: Metadata for the scene
 *
 * @param {string|number} sceneIdOrNumber - ID (e.g. 'varmala') or index/number (e.g. 2)
 */
export function useSceneTimeline(sceneIdOrNumber) {
  const { scrollYProgress, activeMask } = useWeddingTimeline();

  const { sceneConfig, sceneIdx } = useMemo(() => {
    let idx = 0;
    if (typeof sceneIdOrNumber === 'number') {
      idx = SCENE_CONFIG.findIndex((s) => s.number === sceneIdOrNumber);
      if (idx === -1) {
        idx = sceneIdOrNumber >= 0 && sceneIdOrNumber < SCENE_CONFIG.length ? sceneIdOrNumber : 0;
      }
    } else {
      idx = SCENE_CONFIG.findIndex((s) => s.id === sceneIdOrNumber);
      if (idx === -1) idx = 0;
    }
    return { sceneConfig: SCENE_CONFIG[idx] || SCENE_CONFIG[0], sceneIdx: idx };
  }, [sceneIdOrNumber]);

  const [start, end] = sceneConfig.range;
  const duration = end - start;
  const isFirstScene = start === 0;
  const isLastScene = end >= 1.0;

  // 1. Normalized local progress [0, 1] across this scene's slice
  const localProgress = useTransform(scrollYProgress, [start, end], [0, 1], {
    clamp: true,
  });

  // 2. Coordinated Equal-Power Crossfade Buffer
  const buffer = Math.min(0.018, duration * 0.12);

  const opacityInputRange = useMemo(() => {
    if (isFirstScene) {
      return [0, end - buffer, end + buffer];
    }
    if (isLastScene) {
      return [start - buffer, start + buffer, 1];
    }
    return [start - buffer, start + buffer, end - buffer, end + buffer];
  }, [start, end, buffer, isFirstScene, isLastScene]);

  const opacityOutputRange = useMemo(() => {
    if (isFirstScene) {
      return [1, 1, 0];
    }
    if (isLastScene) {
      return [0, 1, 1];
    }
    return [0, 1, 1, 0];
  }, [isFirstScene, isLastScene]);

  const opacity = useTransform(scrollYProgress, opacityInputRange, opacityOutputRange, {
    clamp: true,
  });

  // 3. Subtle Parallax Y translation
  const yInputRange = useMemo(() => {
    if (isFirstScene) {
      return [0, end];
    }
    if (isLastScene) {
      return [start, 1];
    }
    return [start, start + duration * 0.5, end];
  }, [start, end, duration, isFirstScene, isLastScene]);

  const yOutputRange = useMemo(() => {
    if (isFirstScene) {
      return [0, 0];
    }
    if (isLastScene) {
      return [20, 0];
    }
    return [20, 0, -20];
  }, [isFirstScene, isLastScene]);

  const y = useTransform(scrollYProgress, yInputRange, yOutputRange, {
    clamp: true,
  });

  // 4. Subtle Cinematic Scale
  const scale = useTransform(
    scrollYProgress,
    [start, start + duration * 0.5, end],
    [0.98, 1.0, 1.01],
    { clamp: true }
  );

  const isActive = (activeMask & (1 << sceneIdx)) !== 0;

  return {
    localProgress,
    opacity,
    y,
    scale,
    isActive,
    sceneConfig,
  };
}
