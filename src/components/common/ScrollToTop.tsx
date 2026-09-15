'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

// useLayoutEffect logs a warning when rendered on the server; alias to useEffect
// in that case so SSR + hydration don't trip React.
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Forces the page to start at the top on every navigation/reload.
 * Combines several strategies because browsers race with React hydration
 * for scroll restoration:
 *  1. Disable the browser's auto scroll restoration (manual mode).
 *  2. On every pathname change, scroll to top immediately + on the
 *     next frame + after a short delay (covers lazy hydration).
 *  3. Strip any URL hash so the browser doesn't scroll to a fragment.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  // Run as early as possible (right after DOM mutations, before paint).
  useIsoLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Strip a hash that would otherwise force the browser to a section.
    if (window.location.hash) {
      try {
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search
        );
      } catch {
        /* no-op */
      }
    }

    scrollToTopNow();
  }, [pathname]);

  // Belt-and-braces: re-run on mount after paint and after a tick to win
  // the race against anything that lazy-mounts and re-scrolls.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    scrollToTopNow();
    const raf = requestAnimationFrame(scrollToTopNow);
    const t = window.setTimeout(scrollToTopNow, 50);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [pathname]);

  return null;
}

function scrollToTopNow() {
  if (typeof window === 'undefined') return;
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' as ScrollBehavior });
  } catch {
    window.scrollTo(0, 0);
  }
}
