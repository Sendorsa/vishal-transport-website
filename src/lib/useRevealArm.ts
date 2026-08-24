"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationControls } from "framer-motion";

/**
 * Drives a scroll reveal without ever server-rendering content hidden.
 *
 * The problem: Framer writes its `initial` variant into the SSR HTML, so
 * `initial="hidden"` shipped 92 elements at `opacity: 0`. They stayed blank
 * until the bundle downloaded, React hydrated and an observer fired — seconds
 * on a throttled phone, and forever with JS disabled.
 *
 * Flipping `initial` after mount does not work either: Framer only applies it
 * once. So this uses controls instead — `.set()` applies the hidden state
 * instantly (no transition) and only for elements still below the fold, which
 * the user cannot see. Anything already on screen is left alone and never
 * animates. Entry is observed directly rather than via `whileInView`, because
 * `whileInView` would re-introduce an `initial` dependency.
 */
/**
 * Master switch for scroll-triggered entrance reveals.
 *
 * Off: every section is fully painted the moment it exists, and nothing waits
 * on viewport entry. This is deliberate — the reveal was the last mechanism
 * that left content invisible until scrolled to, which read as "sections
 * loading late" on mobile.
 *
 * Flip to `true` to bring the entrances back; all the plumbing below still
 * works and is exercised by the rest of the motion system.
 */
export const SCROLL_REVEALS_ENABLED = false;

export function useRevealArm<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  const controls = useAnimationControls();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || !SCROLL_REVEALS_ENABLED) return;

    // Already visible or scrolled past — leave it be.
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    controls.set("hidden");
    setArmed(true);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          controls.start("visible");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controls, enabled]);

  return { ref, controls, armed };
}

/**
 * Lightweight sibling of useRevealArm for components that animate their own
 * content rather than a Framer variant (counters, map pins).
 *
 * Same contract: `armed` is false on the server and on first paint, and only
 * becomes true for elements that were below the fold at mount. Callers must
 * render their FINAL content when `armed` is false — never a placeholder —
 * so business content is never gated on viewport visibility.
 */
export function useArmed<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !SCROLL_REVEALS_ENABLED) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);

  return { ref, armed };
}
