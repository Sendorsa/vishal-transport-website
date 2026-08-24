"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion, animate } from "framer-motion";
import { easing } from "@/lib/motion";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

// useLayoutEffect warns during SSR; useEffect is the correct no-op there.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Eased count-up that runs once when scrolled into view.
 *
 * Deliberately owns its own IntersectionObserver rather than going through
 * `useRevealArm`. That hook is behind SCROLL_REVEALS_ENABLED, which is off,
 * so routing through it meant `animate()` was never called on any device.
 * More importantly it is the wrong tool: reveals gate *visibility*, and a
 * business figure must never be gated on scrolling to it.
 *
 * The contract that keeps this safe:
 *   • SSR — and any pre-hydration or no-JS render — emits the FINAL figure.
 *     "300+ vehicles" is never served as "0+".
 *   • The reset to 0 happens in a layout effect, before paint, so the real
 *     figure is never briefly shown and then yanked back.
 *   • If the element is off-screen at mount, it is primed to 0 while the user
 *     cannot see it, then counts up when it enters.
 *   • Reduced motion skips all of it and leaves the final figure in place.
 */
export function Counter({
  to,
  suffix = "",
  duration = 1.7,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion() ?? false;
  // Starts at the real figure, not zero, so the server-rendered markup is
  // already correct and stays correct if JS never arrives.
  const [value, setValue] = useState(to);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let stopped = false;
    let controls: ReturnType<typeof animate<number>> | undefined;

    const run = () => {
      if (stopped) return;
      setValue(0);
      controls = animate(0, to, {
        duration,
        ease: easing.smoothOut,
        onUpdate: (v) => setValue(Math.floor(v)),
      });
    };

    // On screen already: prime and start now, still inside the layout phase,
    // so the browser never paints the final figure first.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      run();
      return () => {
        stopped = true;
        controls?.stop();
      };
    }

    // Below the fold: zero it now (invisible to the user), animate on entry.
    setValue(0);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    return () => {
      stopped = true;
      io.disconnect();
      controls?.stop();
    };
  }, [reduced, to, duration]);

  return (
    <span ref={ref} className={`whitespace-nowrap ${className ?? ""}`}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
