"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media-query hook. Defaults to `false` on the server and first
 * client render, then syncs on mount — so mobile is the safe default
 * (desktop-only enhancements like scroll parallax never flash on phones).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Matches the Tailwind `lg` breakpoint — our desktop threshold. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
