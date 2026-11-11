import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useTransform, useMotionValueEvent, useMotionValue } from 'framer-motion';
import { SCENE_CONFIG } from '../data/weddingDetails';

/**
 * React Context for the Master Wedding Timeline
 */
const WeddingTimelineContext = createContext(null);

/**
 * Provider component wrapping the cinematic viewport
 */
export function WeddingTimelineProvider({ scrollYProgress, children }) {
  // Support deterministic visual testing via window.__MOCK_PROGRESS__, hash (#0.XX), or ?mockProgress=0.XX parameter
  const mockParam = useMemo(() => {
    if (typeof window === 'undefined') return null;
    if (typeof window.__MOCK_PROGRESS__ === 'number') {
      return Math.max(0, Math.min(1, window.__MOCK_PROGRESS__));
    }
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const match = hash.match(/([\d\.]+)/);
      if (match) return Math.max(0, Math.min(1, parseFloat(match[1])));
    }
    const p = new URLSearchParams(window.location.search).get('mockProgress');
    return p !== null ? Math.max(0, Math.min(1, parseFloat(p))) : null;
  }, []);

  const mockMotionValue = useMotionValue(mockParam ?? 0);
  const activeMotionValue = mockParam !== null ? mockMotionValue : scrollYProgress;

  const [currentProgress, setCurrentProgress] = useState(mockParam ?? 0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(() => {
    if (mockParam !== null) {
      const idx = SCENE_CONFIG.findIndex(
        (scene) => mockParam >= scene.range[0] && mockParam <= scene.range[1]
      );
      return idx !== -1 ? idx : (mockParam >= 1.0 ? SCENE_CONFIG.length - 1 : 0);
    }
    return 0;
  });

  // Monitor progress changes for high-level HUD / state indicators
  useMotionValueEvent(activeMotionValue, 'change', (latest) => {
    setCurrentProgress(latest);

    const index = SCENE_CONFIG.findIndex(
      (scene) => latest >= scene.range[0] && latest <= scene.range[1]
    );

    if (index !== -1 && index !== activeSceneIndex) {
      setActiveSceneIndex(index);
    } else if (latest >= 1.0) {
      setActiveSceneIndex(SCENE_CONFIG.length - 1);
    }
  });

  const value = useMemo(
    () => ({
      scrollYProgress: activeMotionValue,
      currentProgress,
      activeSceneIndex,
      activeScene: SCENE_CONFIG[activeSceneIndex] || SCENE_CONFIG[0],
      scenes: SCENE_CONFIG,
    }),
    [activeMotionValue, currentProgress, activeSceneIndex]
  );

  return React.createElement(
    WeddingTimelineContext.Provider,
    { value },
    children
  );
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
 * - localProgress: MotionValue [0, 1] mapped to the scene's scroll range
 * - opacity: Mathematically continuous equal-power crossfade MotionValue
 * - y: Subtle vertical parallax translation
 * - scale: Subtle depth zooming
 * - isActive: Boolean flag indicating if current progress falls in this scene
 * - sceneConfig: Metadata for the scene
 *
 * @param {string|number} sceneIdOrNumber - ID (e.g. 'varmala') or index/number (e.g. 2)
 */
export function useSceneTimeline(sceneIdOrNumber) {
  const { scrollYProgress, currentProgress } = useWeddingTimeline();

  const sceneConfig = useMemo(() => {
    if (typeof sceneIdOrNumber === 'number') {
      return (
        SCENE_CONFIG.find((s) => s.number === sceneIdOrNumber) ||
        SCENE_CONFIG[sceneIdOrNumber] ||
        SCENE_CONFIG[0]
      );
    }
    return (
      SCENE_CONFIG.find((s) => s.id === sceneIdOrNumber) ||
      SCENE_CONFIG[0]
    );
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
  // Smooth continuous transition with zero dip to dark between consecutive scenes
  const buffer = Math.min(0.018, duration * 0.12);

  const opacityInputRange = useMemo(() => {
    if (isFirstScene) {
      return [0, end - buffer, end + buffer];
    }
    if (isLastScene) {
      return [start - buffer, start + buffer, 1];
    }
    return [
      start - buffer,
      start + buffer,
      end - buffer,
      end + buffer,
    ];
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

  const opacity = useTransform(
    scrollYProgress,
    opacityInputRange,
    opacityOutputRange,
    { clamp: true }
  );

  // 3. Subtle Parallax Y translation (scene 1 stays anchored; others have subtle entrance/exit float)
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
      return [0, 0]; // Grounded & calm for the opening invitation
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

  const isActive = currentProgress >= (start - buffer) && currentProgress <= (end + buffer);

  return {
    localProgress,
    opacity,
    y,
    scale,
    isActive,
    sceneConfig,
  };
}
