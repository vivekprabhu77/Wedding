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
  transitionSmoothing: 10.5,
  maxForwardVelocity: 0.095,
  maxForwardVelocityByScene: {
    opening: 0.105,
    varmala: 0.085,
    groom: 0.044,
    bride: 0.044,
    muhurtham: 0.052,
    venue: 0.054,
    blessings: 0.075,
  },
  maxReverseVelocity: 0.44,
  directNavVelocity: 1.15,
  maxSingleGestureAdvance: 0.16,
  scenes: {
    opening: { minPresentationMs: 1100, fullRevealLocal: 0.65, minReadDwellMs: 500 },
    varmala: { minPresentationMs: 2400, fullRevealLocal: 0.84, minReadDwellMs: 950 },
    groom: { minPresentationMs: 2350, fullRevealLocal: 0.84, minReadDwellMs: 950 },
    bride: { minPresentationMs: 2350, fullRevealLocal: 0.84, minReadDwellMs: 950 },
    muhurtham: { minPresentationMs: 2600, fullRevealLocal: 0.84, minReadDwellMs: 1100 },
    venue: { minPresentationMs: 2700, fullRevealLocal: 0.84, minReadDwellMs: 1150 },
    blessings: { minPresentationMs: 1500, fullRevealLocal: 0.75, minReadDwellMs: 600 },
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
 * Computes the scene exit protection gate right after full content reveal
 * and just before the scene's exit crossfade cliff.
 */
function getSceneExitGate(scene, fullRevealLocal = 0.84) {
  const [start, end] = scene.range;
  if (end >= 1.0) return 1.0;
  const duration = end - start;
  const buffer = Math.min(0.018, duration * 0.12);
  const crossfadeStart = end - buffer;
  const minAfterReveal = start + duration * Math.min(0.92, fullRevealLocal + 0.06);
  return Math.max(start + duration * 0.75, Math.min(crossfadeStart - 0.002, minAfterReveal));
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
    controlledTarget: initialRaw,
    lastTime: typeof performance !== 'undefined' ? performance.now() : 0,
    lastRawChangeAt: typeof performance !== 'undefined' ? performance.now() : 0,
    sceneIndex: findSceneIndex(initialRaw),
    sceneEnteredAt: typeof performance !== 'undefined' ? performance.now() : 0,
    fullRevealReachedAt: null,
    lastWheelAt: -Infinity,
    lastTouchAt: -Infinity,
    lastStepKeyAt: -Infinity,
    lastJumpKeyAt: -Infinity,
    lastScrollbarAt: -Infinity,
    activeDirectNav: false,
    lastInputDir: 0,
    lastTouchY: null,
    gestureAnchor: initialRaw,
    isTouching: false,
    isScrollbarPointerDown: false,
    reconcilingTo: 0,
    reconcilingUntil: -Infinity,
    lastPublishedMask: computeActiveMask(initialRaw),
    lastPublishedSceneIdx: findSceneIndex(initialRaw),
    lastPublishedProgress: initialRaw,
  });

  // Track raw input intent & direction across wheel, trackpad, touch, keyboard, and scrollbar
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
      // Snapshot controlled progress at gesture start so one single aggressive swipe has a bounded advance
      st.gestureAnchor = st.controlledTarget;
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
          const dy = st.lastTouchY - curY; // Positive = swiping finger up (advancing story forward)
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
      // Only treat non-touch clicks directly on the right scrollbar edge as direct scrollbar drags
      if (e.pointerType !== 'touch' && e.clientX >= docWidth - 6) {
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
    stateRef.current.controlledTarget = clamped;
    stateRef.current.prevRawTarget = clamped;
    controlledProgress.set(clamped);
    publishControlled(clamped);
  });

  // Subscribe to the single root Lenis animation frame loop
  useEffect(() => {
    if (mockParam !== null || prefersReducedMotion || !subscribeFrame) {
      return undefined;
    }

    const userCtrl = SCROLL_SETTINGS.controller || {};
    const cfg = {
      ...DEFAULT_CONTROLLER_CFG,
      ...userCtrl,
      maxForwardVelocityByScene: {
        ...DEFAULT_CONTROLLER_CFG.maxForwardVelocityByScene,
        ...(userCtrl.maxForwardVelocityByScene || {}),
      },
      scenes: {
        ...DEFAULT_CONTROLLER_CFG.scenes,
        ...(userCtrl.scenes || {}),
      },
    };

    const st = stateRef.current;
    const nowInit = performance.now();
    const rawNow = clamp01(scrollYProgress.get() || 0);
    st.displayed = rawNow;
    st.prevRawTarget = rawNow;
    st.controlledTarget = rawNow;
    st.gestureAnchor = rawNow;
    st.lastTime = nowInit;
    st.lastRawChangeAt = nowInit;
    st.sceneIndex = findSceneIndex(rawNow);
    st.sceneEnteredAt = nowInit;
    const initScene = SCENE_CONFIG[st.sceneIndex];
    const initSpan = initScene ? initScene.range[1] - initScene.range[0] : 0.12;
    const initLocal = initScene ? clamp01((rawNow - initScene.range[0]) / Math.max(0.001, initSpan)) : 0;
    const initReveal = cfg.scenes[initScene?.id]?.fullRevealLocal ?? 0.65;
    st.fullRevealReachedAt = initLocal >= initReveal ? nowInit : null;

    const reconcileLenisToTarget = (activeLenisObj, targetVal, now) => {
      if (!activeLenisObj || activeLenisObj.limit <= 0) return;
      st.reconcilingTo = targetVal;
      st.reconcilingUntil = now + 180;
      st.prevRawTarget = targetVal;
      activeLenisObj.scrollTo(targetVal * activeLenisObj.limit, {
        immediate: true,
        force: true,
        programmatic: true,
      });
    };

    const unsubscribe = subscribeFrame((_rafTime, activeLenis) => {
      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0.001, (now - st.lastTime) / 1000));
      st.lastTime = now;

      const rawTarget = clamp01(scrollYProgress.get() || 0);
      let deltaRaw = rawTarget - st.prevRawTarget;

      // Ignore synthetic delta triggered when silently aligning DOM track with controlled target
      if (now < st.reconcilingUntil && Math.abs(rawTarget - st.reconcilingTo) < 0.04) {
        deltaRaw = 0;
      } else if (Math.abs(deltaRaw) > 0.0001) {
        st.lastRawChangeAt = now;
      }
      st.prevRawTarget = rawTarget;

      // Stage 2: Strict direct-nav classification (never falsely triggered by wheel/touch tails)
      const recentWheel = now - st.lastWheelAt < 1800;
      const recentTouch = st.isTouching || now - st.lastTouchAt < 3800;
      const recentStepKey = now - st.lastStepKeyAt < 1500;
      const jumpKeyIsLatest =
        st.lastJumpKeyAt > Math.max(st.lastWheelAt, st.lastTouchAt, st.lastStepKeyAt);
      const recentJumpKey = jumpKeyIsLatest && now - st.lastJumpKeyAt < 1500;
      const activeLenisObj = activeLenis || lenis;
      const isProgrammaticLenis = Boolean(activeLenisObj && activeLenisObj.isScrolling === 'smooth');

      if (st.isScrollbarPointerDown) {
        st.lastScrollbarAt = now;
        st.activeDirectNav = true;
      } else if (
        Math.abs(deltaRaw) > 0.002 &&
        now >= st.reconcilingUntil &&
        !recentWheel &&
        !recentTouch &&
        !recentStepKey &&
        !recentJumpKey &&
        !isProgrammaticLenis
      ) {
        // Explicit native scrollbar drag outside wheel, touch, keyboard, or Lenis smoothing
        st.lastScrollbarAt = now;
        st.activeDirectNav = true;
      }

      if (
        st.activeDirectNav &&
        !st.isScrollbarPointerDown &&
        now - st.lastScrollbarAt > 60 &&
        (recentWheel || recentTouch || recentStepKey)
      ) {
        st.activeDirectNav = false;
      }

      const isDirectNav =
        st.isScrollbarPointerDown ||
        st.activeDirectNav ||
        now - st.lastScrollbarAt < 250 ||
        recentJumpKey;

      // Stage 3: Update regulated controlledTarget from raw scroll intent
      if (isDirectNav) {
        st.controlledTarget = rawTarget;
        st.gestureAnchor = rawTarget;
      } else if (deltaRaw < 0) {
        // Backward scroll / Replay rewind: collapse unseen forward surplus immediately & unwind cleanly
        const recentBackwardIntent =
          st.lastInputDir < 0 &&
          now - Math.max(st.lastWheelAt, st.lastTouchAt, st.lastStepKeyAt) < 600;

        if (recentBackwardIntent && deltaRaw < -0.0003 && st.controlledTarget > st.displayed + 0.012) {
          const collapsed = Math.max(0, st.displayed + deltaRaw);
          st.controlledTarget = collapsed;
          if (!st.isTouching) {
            reconcileLenisToTarget(activeLenisObj, collapsed, now);
          }
        } else if (rawTarget <= 0.001) {
          st.controlledTarget = 0;
        } else {
          st.controlledTarget = clamp01(Math.min(rawTarget, st.controlledTarget + deltaRaw));
        }
        st.gestureAnchor = Math.min(st.gestureAnchor, st.controlledTarget);
      } else if (deltaRaw > 0) {
        // Forward scroll: normalize & cap target horizon so a single huge fling cannot queue multiple scenes
        const isTouchDriven = st.isTouching || (now - st.lastTouchAt < 2600 && !recentWheel && !recentStepKey);
        const maxLeadFromDisplayed = clamp01(st.displayed + cfg.maxSingleGestureAdvance);
        const rawCandidate = clamp01(st.controlledTarget + deltaRaw);

        if (isTouchDriven) {
          const touchCeiling = clamp01(st.gestureAnchor + cfg.maxSingleGestureAdvance);
          st.controlledTarget = Math.min(rawCandidate, maxLeadFromDisplayed, touchCeiling);
        } else {
          st.controlledTarget = Math.min(rawCandidate, maxLeadFromDisplayed);
        }
      }

      if (
        st.activeDirectNav &&
        !st.isScrollbarPointerDown &&
        Math.abs(st.controlledTarget - st.displayed) < 0.003
      ) {
        st.activeDirectNav = false;
      }

      // Quietly re-align hidden DOM scroll track only if a touch/fling overshot downward & settled
      if (
        !isDirectNav &&
        !st.isTouching &&
        !isProgrammaticLenis &&
        now >= st.reconcilingUntil &&
        now - st.lastRawChangeAt > 170 &&
        rawTarget > st.controlledTarget + 0.015
      ) {
        reconcileLenisToTarget(activeLenisObj, st.controlledTarget, now);
      }

      // Stage 4 & 5: Content-aware scene presentation protection & bounded playhead motion
      const curDisplayed = st.displayed;
      const curSceneIdx = findSceneIndex(curDisplayed);
      if (curSceneIdx !== st.sceneIndex) {
        st.sceneIndex = curSceneIdx;
        st.sceneEnteredAt = now;
        st.fullRevealReachedAt = null;
      }

      const scene = SCENE_CONFIG[curSceneIdx];
      const [sceneStart, sceneEnd] = scene.range;
      const sceneDuration = Math.max(0.001, sceneEnd - sceneStart);
      const isTerminalScene = curSceneIdx >= SCENE_CONFIG.length - 1;
      const sceneCfg = cfg.scenes[scene.id] || {
        minPresentationMs: 2200,
        fullRevealLocal: 0.84,
        minReadDwellMs: 950,
      };
      const sceneMaxForwardVel =
        cfg.maxForwardVelocityByScene[scene.id] ?? cfg.maxForwardVelocity;

      const fullRevealPoint = sceneStart + sceneDuration * sceneCfg.fullRevealLocal;
      const localNow = clamp01((curDisplayed - sceneStart) / sceneDuration);
      if (st.fullRevealReachedAt === null && localNow >= sceneCfg.fullRevealLocal) {
        st.fullRevealReachedAt = now;
      }

      const elapsedSceneMs = now - st.sceneEnteredAt;
      const remainingPresentationMs = Math.max(0, sceneCfg.minPresentationMs - elapsedSceneMs);
      const elapsedReadMs = st.fullRevealReachedAt !== null ? now - st.fullRevealReachedAt : 0;
      const remainingReadMs =
        st.fullRevealReachedAt !== null
          ? Math.max(0, sceneCfg.minReadDwellMs - elapsedReadMs)
          : sceneCfg.minReadDwellMs;

      const requiredWaitMs = isTerminalScene
        ? 0
        : Math.max(remainingPresentationMs, remainingReadMs);
      const gate = getSceneExitGate(scene, sceneCfg.fullRevealLocal);

      const gap = st.controlledTarget - curDisplayed;
      let nextDisplayed = curDisplayed;

      if (Math.abs(gap) < 0.00004) {
        nextDisplayed = st.controlledTarget;
      } else if (isDirectNav) {
        const lerpAlpha = 1 - Math.exp(-10.0 * dt);
        const rawStep = gap * lerpAlpha;
        const maxStep = cfg.directNavVelocity * dt;
        nextDisplayed = clamp01(
          curDisplayed + Math.sign(rawStep) * Math.min(Math.abs(rawStep), maxStep)
        );
      } else if (gap > 0) {
        // Forward playhead motion: obey scene exit gate until content has been presented & readable
        const gatedTarget =
          !isTerminalScene && requiredWaitMs > 0
            ? Math.min(st.controlledTarget, gate)
            : st.controlledTarget;

        const targetGap = gatedTarget - curDisplayed;

        if (targetGap > 0) {
          if (!isTerminalScene && requiredWaitMs > 0 && st.controlledTarget > gate) {
            if (st.fullRevealReachedAt === null) {
              // Phase 1 (Reveal): glide steadily to full-reveal point without pre-reveal Zeno stall
              const revealTarget = Math.min(gate, fullRevealPoint + 0.0008);
              const distToReveal = Math.max(0, revealTarget - curDisplayed);
              const revealBudgetMs = Math.max(
                350,
                sceneCfg.minPresentationMs - sceneCfg.minReadDwellMs - elapsedSceneMs
              );
              const revealSec = revealBudgetMs / 1000;
              const revealMaxVel = Math.max(sceneMaxForwardVel * 1.6, 0.075);
              const paceSpeed = Math.min(
                revealMaxVel,
                Math.max(0.015, distToReveal / revealSec)
              );
              nextDisplayed = clamp01(curDisplayed + Math.min(targetGap, paceSpeed * dt));
            } else {
              // Phase 2 (Read Dwell): gently drift across remainder up to exit gate until read dwell finishes
              const remainingSec = Math.max(0.016, requiredWaitMs / 1000);
              const paceSpeed = Math.min(
                sceneMaxForwardVel,
                Math.max(0.004, targetGap / remainingSec)
              );
              nextDisplayed = clamp01(curDisplayed + Math.min(targetGap, paceSpeed * dt));
            }
          } else {
            // Immediate deliberate response, bounded by reading speed inside scene and crisp crossfade once read-dwell finishes
            const isExitingReadyScene =
              !isTerminalScene &&
              requiredWaitMs === 0 &&
              st.fullRevealReachedAt !== null &&
              curDisplayed >= gate - 0.002;
            const effectiveForwardVel = isExitingReadyScene
              ? Math.max(sceneMaxForwardVel * 2.0, 0.16)
              : sceneMaxForwardVel;
            const lerpAlpha = 1 - Math.exp(-cfg.transitionSmoothing * dt);
            const maxStep = effectiveForwardVel * dt;
            const desiredStep = Math.min(targetGap * lerpAlpha, maxStep);
            const step =
              targetGap < 0.0005 ? targetGap : Math.max(desiredStep, Math.min(targetGap, 0.00025));
            nextDisplayed = clamp01(curDisplayed + Math.min(targetGap, step));
          }
        }
      } else {
        // Backward progression: smooth, responsive, zero scene trap
        const lerpAlpha = 1 - Math.exp(-cfg.transitionSmoothing * dt);
        const maxStep = cfg.maxReverseVelocity * dt;
        const absGap = Math.abs(gap);
        const desiredStep = Math.min(absGap * lerpAlpha, maxStep);
        const step =
          absGap < 0.0005 ? absGap : Math.max(desiredStep, Math.min(absGap, 0.00035));
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
