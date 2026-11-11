import { useState, useEffect } from 'react';

function getViewportMetrics() {
  if (typeof window === 'undefined') {
    return {
      width: 1280,
      height: 800,
      isCompact: false,
      isUltraNarrow: false,
      isShortViewport: false,
      isTablet: false,
    };
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
    isCompact: width < 640 || height < 690,
    isUltraNarrow: width < 360,
    isShortViewport: height <= 650,
    isTablet: width >= 640 && width <= 1024,
  };
}

/**
 * Shared responsive viewport tier hook.
 * Distinguishes compact mobile phones, ultra-narrow 320px screens,
 * short 568px-640px screens, and tablets/desktops cleanly.
 */
export function useViewportTier() {
  const [metrics, setMetrics] = useState(getViewportMetrics);

  useEffect(() => {
    const update = () => {
      const next = getViewportMetrics();
      setMetrics((prev) =>
        prev.width === next.width && prev.height === next.height ? prev : next
      );
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return metrics;
}

