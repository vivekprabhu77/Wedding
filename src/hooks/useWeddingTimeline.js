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
  cruiseVelocity: 0.048,
  cruiseVelocityByScene: {
    opening: 0.054,
    varmala: 0.056,
    groom: 0.042,
    bride: 0.042,
    muhurtham: 0.046,
    venue: 0.048,
    blessings: 0.056,
  },
  accelerationPerSec2: 0.22,
  decelerationPerSec2: 0.24,
  settleSmoothing: 12.0,
  maxReverseVelocity: 0.52,
  directNavVelocity: 1.25,
  maxSingleGestureAdvance: 0.18,
  scenes: {
    opening: {
      milestones: [{ id: 'opening-card', atLocal: 0.35, gateLocal: 0.70, minReadableMs: 1100 }],
    },
    varmala: {
      milestones: [
        { id: 'varmala-garlands', atLocal: 0.56, gateLocal: 0.64, minReadableMs: 850 },
        { id: 'varmala-couple-names', atLocal: 0.87, gateLocal: 0.90, minReadableMs: 1700 },
      ],
    },
    groom: {
      milestones: [
        { id: 'groom-hometown-udupi', atLocal: 0.80, gateLocal: 0.855, minReadableMs: 1850 },
      ],
    },
    bride: {
      milestones: [
        { id: 'bride-hometown-udupi', atLocal: 0.80, gateLocal: 0.855, minReadableMs: 1850 },
      ],
    },
    muhurtham: {
      milestones: [
        { id: 'muhurtham-full-schedule', atLocal: 0.85, gateLocal: 0.868, minReadableMs: 1850 },
      ],
    },
    venue: {
      milestones: [
        { id: 'venue-full-directions', atLocal: 0.84, gateLocal: 0.865, minReadableMs: 1850 },
      ],
    },
    blessings: {
      milestones: [],
    },
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
 * Resolves scene exit boundary before crossfade starts in useSceneTimeline
 * so no milestone gate ever lets content slip into exit dissolve prematurely.
 */
function getMaxSafeGateLocal(scene) {
  const [start, end] = scene.range;
  if (end >= 1.0) return 1.0;
  const duration = Math.max(0.001, end - start);
  const buffer = Math.min(0.018, duration * 0.12);
  const crossfadeStartLocal = (duration - buffer) / duration;
  return Math.max(0.5, crossfadeStartLocal - 0.012);
}

/**
 * Provider component wrapping the cinematic viewport.
 * Acts as the single authoritative DT-driven cinematic playback engine between
 * raw user scroll intent and Framer Motion scene choreography.
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

  // Only publish scene visibility bitmask to React context (avoids 60fps React re-renders during scroll)
  const [activeMask, setActiveMask] = useState(() => computeActiveMask(initialRaw));

  const stateRef = useRef({
    displayed: initialRaw,
    prevRawTarget: initialRaw,
    controlledTarget: initialRaw,
    velocity: 0,
    lastTime: typeof performance !== 'undefined' ? performance.now() : 0,
    lastRawChangeAt: typeof performance !== 'undefined' ? performance.now() : 0,
    sceneIndex: findSceneIndex(initialRaw),
    milestoneReachedAt: [],
    lastWheelAt: -Infinity,
    lastTouchAt: -Infinity,
    lastStepKeyAt: -Infinity,
    lastJumpKeyAt: -Infinity,
    lastScrollbarAt: -Infinity,
    activeDirectNav: false,
    lastInputDir: 0,
    lastTouchY: null,
    gestureAnchor: initialRaw,
    pendingBottomWheelAt: -Infinity,
    isTouching: false,
    isScrollbarPointerDown: false,
    reconcilingTo: 0,
    reconcilingUntil: -Infinity,
    lastPublishedMask: computeActiveMask(initialRaw),
  });

  // Track raw user scroll intent & direction across wheel, trackpad, touch, keyboard, and scrollbar
  useEffect(() => {
    if (mockParam !== null || typeof window === 'undefined') return undefined;

    const handleWheel = (e) => {
      const st = stateRef.current;
      const now = performance.now();
      st.lastWheelAt = now;
      st.activeDirectNav = false;
      if (e.deltaY !== 0) {
        const dir = Math.sign(e.deltaY);
        st.lastInputDir = dir;
        if (dir > 0 && st.prevRawTarget >= 0.994) {
          // Track active forward scrolling even when DOM hit the 100% scroll floor
          st.pendingBottomWheelAt = now;
        }
      }
    };

    const handleTouchStart = (e) => {
      const st = stateRef.current;
      const now = performance.now();
      st.isTouching = true;
      st.lastTouchAt = now;
      st.activeDirectNav = false;
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
            if (dy > 0 && st.prevRawTarget >= 0.994) {
              st.pendingBottomWheelAt = now;
            }
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
        if (st.prevRawTarget >= 0.994) st.pendingBottomWheelAt = now;
      } else if (e.key === 'PageUp' || e.key === 'ArrowUp') {
        st.lastStepKeyAt = now;
        st.activeDirectNav = false;
        st.lastInputDir = -1;
      } else if (e.key === ' ') {
        st.lastStepKeyAt = now;
        st.activeDirectNav = false;
        st.lastInputDir = e.shiftKey ? -1 : 1;
        if (!e.shiftKey && st.prevRawTarget >= 0.994) st.pendingBottomWheelAt = now;
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
      const scrollbarMargin = Math.max(18, window.innerWidth - docWidth + 4);
      if (e.pointerType !== 'touch' && e.clientX >= window.innerWidth - scrollbarMargin) {
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

  // Helper to flip scene active visibility bitmask only when crossing scene boundaries
  const syncActiveMask = useMemo(
    () => (val) => {
      const st = stateRef.current;
      const mask = computeActiveMask(val);
      if (mask !== st.lastPublishedMask) {
        st.lastPublishedMask = mask;
        setActiveMask(mask);
      }
    },
    []
  );

  // Reduced-motion direct tracking mode (instant 1:1 follow without velocity gating)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (mockParam !== null || !prefersReducedMotion) return;
    const clamped = clamp01(latest);
    const st = stateRef.current;
    st.displayed = clamped;
    st.controlledTarget = clamped;
    st.prevRawTarget = clamped;
    st.velocity = 0;
    controlledProgress.set(clamped);
    syncActiveMask(clamped);
  });

  // Authoritative single-RAF animation engine (runs in lockstep with SmoothScroll Lenis)
  useEffect(() => {
    if (mockParam !== null || prefersReducedMotion || !subscribeFrame) {
      return undefined;
    }

    const userCtrl = SCROLL_SETTINGS.controller || {};
    const cfg = {
      ...DEFAULT_CONTROLLER_CFG,
      ...userCtrl,
      cruiseVelocityByScene: {
        ...DEFAULT_CONTROLLER_CFG.cruiseVelocityByScene,
        ...(userCtrl.cruiseVelocityByScene || {}),
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
    st.velocity = 0;
    st.lastTime = nowInit;
    st.lastRawChangeAt = nowInit;
    st.sceneIndex = findSceneIndex(rawNow);

    const initScene = SCENE_CONFIG[st.sceneIndex];
    const initSpan = initScene ? Math.max(0.001, initScene.range[1] - initScene.range[0]) : 0.12;
    const initLocal = initScene ? clamp01((rawNow - initScene.range[0]) / initSpan) : 0;
    const initMilestones = cfg.scenes[initScene?.id]?.milestones || [];
    st.milestoneReachedAt = initMilestones.map((m) => (initLocal >= m.atLocal ? nowInit : null));

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

      // ------------------------------------------------------------------
      // LAYER 1: RAW SCROLL INPUT DELTA EXTRACTION
      // ------------------------------------------------------------------
      const rawTarget = clamp01(scrollYProgress.get() || 0);
      let deltaRaw = rawTarget - st.prevRawTarget;

      if (now < st.reconcilingUntil && Math.abs(rawTarget - st.reconcilingTo) < 0.04) {
        deltaRaw = 0;
      } else if (Math.abs(deltaRaw) > 0.0001) {
        st.lastRawChangeAt = now;
      }
      st.prevRawTarget = rawTarget;

      // ------------------------------------------------------------------
      // LAYER 2: DIRECT NAV VS STORYTELLING INTENT CLASSIFICATION
      // ------------------------------------------------------------------
      const recentWheel = now - st.lastWheelAt < 560;
      const recentTouch = st.isTouching || now - st.lastTouchAt < 2400;
      const recentStepKey = now - st.lastStepKeyAt < 500;
      const jumpKeyIsLatest =
        st.lastJumpKeyAt > Math.max(st.lastWheelAt, st.lastTouchAt, st.lastStepKeyAt);
      const recentJumpKey = jumpKeyIsLatest && now - st.lastJumpKeyAt < 1500;
      const activeLenisObj = activeLenis || lenis;
      const isProgrammaticLenis = Boolean(activeLenisObj && activeLenisObj.isScrolling === 'smooth');

      if (st.isScrollbarPointerDown) {
        st.lastScrollbarAt = now;
        st.activeDirectNav = true;
      } else if (
        Math.abs(deltaRaw) > 0.003 &&
        now >= st.reconcilingUntil &&
        !recentWheel &&
        !recentTouch &&
        !recentStepKey &&
        !recentJumpKey &&
        !isProgrammaticLenis
      ) {
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
        now - st.lastScrollbarAt < 240 ||
        recentJumpKey;

      // ------------------------------------------------------------------
      // LAYER 3: INTENT TARGET REGULATOR (BOUNDED FORWARD LEAD + INSTANT REVERSE)
      // ------------------------------------------------------------------
      if (isDirectNav) {
        st.controlledTarget = rawTarget;
        st.gestureAnchor = rawTarget;
      } else if (deltaRaw < 0) {
        const recentBackwardIntent =
          st.lastInputDir < 0 &&
          now - Math.max(st.lastWheelAt, st.lastTouchAt, st.lastStepKeyAt) < 600;

        if (recentBackwardIntent && deltaRaw < -0.0003 && st.controlledTarget > st.displayed + 0.012) {
          const collapsed = clamp01(st.displayed + deltaRaw);
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
        const isTouchDriven = st.isTouching || (now - st.lastTouchAt < 2400 && !recentWheel && !recentStepKey);
        const maxLeadFromDisplayed = clamp01(st.displayed + cfg.maxSingleGestureAdvance);
        const rawCandidate = clamp01(st.controlledTarget + deltaRaw);

        if (isTouchDriven) {
          const touchCeiling = clamp01(st.gestureAnchor + cfg.maxSingleGestureAdvance);
          st.controlledTarget = Math.min(rawCandidate, maxLeadFromDisplayed, touchCeiling);
        } else {
          st.controlledTarget = Math.min(rawCandidate, maxLeadFromDisplayed);
        }
      } else if (
        rawTarget >= 0.994 &&
        st.lastInputDir > 0 &&
        now - st.pendingBottomWheelAt < 140 &&
        st.controlledTarget < 1.0
      ) {
        // Keep steady forward intent flowing cleanly if sustained fast scrolling hit the DOM floor early
        st.controlledTarget = clamp01(
          Math.max(st.controlledTarget, Math.min(1.0, st.displayed + cfg.maxSingleGestureAdvance * 0.75))
        );
      }

      if (
        st.activeDirectNav &&
        !st.isScrollbarPointerDown &&
        Math.abs(st.controlledTarget - st.displayed) < 0.0003
      ) {
        st.activeDirectNav = false;
      }

      // Reconcile DOM scroll track only when completely idle so backward wheel/touch always reacts 1:1
      if (
        !isDirectNav &&
        !st.isTouching &&
        !isProgrammaticLenis &&
        now >= st.reconcilingUntil &&
        now - st.lastWheelAt > 240 &&
        now - st.lastTouchAt > 300 &&
        now - st.lastRawChangeAt > 200 &&
        rawTarget > st.controlledTarget + 0.015
      ) {
        reconcileLenisToTarget(activeLenisObj, st.controlledTarget, now);
      }

      // ------------------------------------------------------------------
      // LAYER 4: ORDERED POST-REVEAL CONTENT PRESENTATION CONTROLLER
      // ------------------------------------------------------------------
      const curDisplayed = st.displayed;
      const curSceneIdx = findSceneIndex(curDisplayed);
      const curScene = SCENE_CONFIG[curSceneIdx];
      const [sceneStart, sceneEnd] = curScene.range;
      const sceneDuration = Math.max(0.001, sceneEnd - sceneStart);
      const localNow = clamp01((curDisplayed - sceneStart) / sceneDuration);
      const milestones = cfg.scenes[curScene.id]?.milestones || [];

      if (curSceneIdx !== st.sceneIndex) {
        st.sceneIndex = curSceneIdx;
        st.milestoneReachedAt = milestones.map((m) => (localNow >= m.atLocal ? now : null));
      }

      // Record exact timestamp once each milestone reaches 100% visibility; reset only on real backward rewind
      for (let i = 0; i < milestones.length; i += 1) {
        const m = milestones[i];
        if (st.milestoneReachedAt[i] === undefined) {
          st.milestoneReachedAt[i] = null;
        }
        if (localNow < m.atLocal - 0.045) {
          st.milestoneReachedAt[i] = null;
        } else if (st.milestoneReachedAt[i] === null && localNow >= m.atLocal) {
          st.milestoneReachedAt[i] = now;
        }
      }

      // Find the earliest incomplete milestone whose exit gate lies before scene crossfade
      let activeGateProgress = 1.0;
      let isGated = false;
      const isTerminalScene = curSceneIdx >= SCENE_CONFIG.length - 1;
      if (!isTerminalScene) {
        const maxSafeGateLocal = getMaxSafeGateLocal(curScene);
        for (let i = 0; i < milestones.length; i += 1) {
          const m = milestones[i];
          const reachedAt = st.milestoneReachedAt[i];
          const remainingReadMs =
            reachedAt === null ? m.minReadableMs : Math.max(0, m.minReadableMs - (now - reachedAt));

          if (remainingReadMs > 0) {
            const safeGateLocal = Math.min(m.gateLocal, maxSafeGateLocal);
            activeGateProgress = sceneStart + sceneDuration * safeGateLocal;
            isGated = true;
            break;
          }
        }
      }

      // ------------------------------------------------------------------
      // LAYER 5: CONSTANT-CRUISE DT PLAYHEAD WITH SMOOTH ATTACK / BRAKING
      // ------------------------------------------------------------------
      const totalGap = st.controlledTarget - curDisplayed;
      let nextDisplayed = curDisplayed;

      if (Math.abs(totalGap) < 0.00003) {
        nextDisplayed = st.controlledTarget;
        st.velocity = 0;
      } else if (isDirectNav) {
        const rawStep = totalGap * (1 - Math.exp(-12.0 * dt));
        const maxStep = cfg.directNavVelocity * dt;
        const clampedStep = Math.sign(rawStep) * Math.min(Math.abs(rawStep), maxStep);
        nextDisplayed = clamp01(curDisplayed + clampedStep);
        st.velocity = clampedStep / dt;
      } else if (totalGap > 0) {
        const effectiveTarget = isGated
          ? Math.min(st.controlledTarget, activeGateProgress)
          : st.controlledTarget;
        const effectiveGap = effectiveTarget - curDisplayed;

        if (effectiveGap <= 0.00005) {
          // Resting cleanly inside milestone readability window until minReadableMs finishes
          nextDisplayed = Math.max(curDisplayed, effectiveTarget);
          st.velocity = 0;
        } else {
          const sceneCruiseVel = cfg.cruiseVelocityByScene[curScene.id] ?? cfg.cruiseVelocity;
          // Smooth parabolic braking cushion so arriving at a gate or resting target never jerks
          const brakingLimit = Math.sqrt(2 * cfg.decelerationPerSec2 * effectiveGap);
          const settleLimit = effectiveGap * cfg.settleSmoothing;
          const isApproachingFinalTarget = !isGated || st.controlledTarget <= activeGateProgress;
          const cushionVel = isApproachingFinalTarget
            ? Math.min(brakingLimit, Math.max(0.004, settleLimit))
            : brakingLimit;

          const desiredVel = Math.min(sceneCruiseVel, cushionVel);

          if (st.velocity < 0) st.velocity = 0;
          const rampRate =
            desiredVel >= st.velocity ? cfg.accelerationPerSec2 : cfg.decelerationPerSec2 * 1.6;
          const dv = desiredVel - st.velocity;
          const maxDv = rampRate * dt;
          if (Math.abs(dv) <= maxDv) {
            st.velocity = desiredVel;
          } else {
            st.velocity += Math.sign(dv) * maxDv;
          }

          const step = Math.min(effectiveGap, Math.max(0.00004, st.velocity * dt));
          nextDisplayed = clamp01(curDisplayed + step);
        }
      } else {
        // Backward progression: responsive & smooth reversal without trapping
        const absGap = Math.abs(totalGap);
        if (absGap < 0.00005) {
          nextDisplayed = st.controlledTarget;
          st.velocity = 0;
        } else {
          const desiredReverseMag = Math.min(
            cfg.maxReverseVelocity,
            Math.max(absGap * cfg.settleSmoothing, 0.015)
          );
          if (st.velocity > 0) st.velocity = 0;
          const currentMag = Math.abs(st.velocity);
          const rampRate = cfg.accelerationPerSec2 * 5.0;
          const nextMag =
            Math.abs(desiredReverseMag - currentMag) <= rampRate * dt
              ? desiredReverseMag
              : currentMag + Math.sign(desiredReverseMag - currentMag) * rampRate * dt;

          st.velocity = -nextMag;
          const step = Math.min(absGap, Math.max(0.00008, nextMag * dt));
          nextDisplayed = clamp01(curDisplayed - step);
        }
      }

      if (nextDisplayed !== st.displayed) {
        st.displayed = nextDisplayed;
        controlledProgress.set(nextDisplayed);
        syncActiveMask(nextDisplayed);
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
    syncActiveMask,
  ]);

  const value = useMemo(
    () => ({
      scrollYProgress: activeMotionValue,
      activeMask,
      scenes: SCENE_CONFIG,
    }),
    [activeMotionValue, activeMask]
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
