"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, animate } from "framer-motion";
import { useArmed } from "@/lib/useRevealArm";
import { easing } from "@/lib/motion";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Eased count-up that runs once when scrolled into view.
 * Never jumps instantly; reduced-motion shows the final value immediately.
 * Numbers use the Indian numbering system (en-IN).
 */
export function Counter({
  to,
  suffix = "",
  duration = 1.7,
  className,
}: CounterProps) {
  const { ref, armed } = useArmed<HTMLSpanElement>();
  const reduced = useReducedMotion() ?? false;
  // Starts at the real figure, not zero. Previously this rendered "0" until
  // scrolled into view, so "300+ vehicles" and "550+ employees" read as "0+"
  // on first paint — business data gated on viewport visibility.
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!armed || reduced) return;
    setValue(0);
    const controls = animate(0, to, {
      duration,
      ease: easing.smoothOut,
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [armed, reduced, to, duration]);

  return (
    <span ref={ref} className={`whitespace-nowrap ${className ?? ""}`}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
