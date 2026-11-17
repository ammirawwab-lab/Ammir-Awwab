import { useEffect, useState } from 'react';

export interface MobileOrientationState {
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
  isMobilePhone: boolean;
}

function readViewportMetrics(): MobileOrientationState {
  if (typeof window === 'undefined') {
    return {
      width: 1440,
      height: 900,
      isPortrait: false,
      isLandscape: true,
      isMobilePhone: false,
    };
  }

  const width = Math.round(window.visualViewport?.width ?? window.innerWidth);
  const height = Math.round(window.visualViewport?.height ?? window.innerHeight);

  const portraitMedia = window.matchMedia?.('(orientation: portrait)').matches;
  const isPortrait = width === height ? Boolean(portraitMedia) : height > width;
  const isLandscape = !isPortrait;

  const shortSide = Math.min(width, height);
  const longSide = Math.max(width, height);
  // Covers phones (320px–430px portrait and 568px–932px landscape) while leaving tablets (768px+) & desktops unaffected
  const isMobilePhone = shortSide <= 540 && longSide <= 960;

  return {
    width,
    height,
    isPortrait,
    isLandscape,
    isMobilePhone,
  };
}

export function useMobileOrientation(): MobileOrientationState {
  const [state, setState] = useState<MobileOrientationState>(() =>
    readViewportMetrics()
  );

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const next = readViewportMetrics();
        setState((prev) => {
          if (
            prev.width === next.width &&
            prev.height === next.height &&
            prev.isPortrait === next.isPortrait &&
            prev.isMobilePhone === next.isMobilePhone
          ) {
            return prev;
          }
          return next;
        });
      });
    };

    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update, { passive: true });
    window.visualViewport?.addEventListener('resize', update, { passive: true });

    const orientationMql = window.matchMedia?.('(orientation: portrait)');
    orientationMql?.addEventListener?.('change', update);
    window.screen?.orientation?.addEventListener?.('change', update);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      window.visualViewport?.removeEventListener('resize', update);
      orientationMql?.removeEventListener?.('change', update);
      window.screen?.orientation?.removeEventListener?.('change', update);
    };
  }, []);

  return state;
}
