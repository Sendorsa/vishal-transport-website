"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { buildReveal, viewportOnce, type RevealVariant } from "@/lib/motion";

type RevealProps = {
  /** Entrance identity — give each section its own. */
  variant?: RevealVariant;
  /** Seconds before the animation starts. */
  delay?: number;
  /** Render as a different element (default div). */
  as?: "div" | "section" | "span" | "li" | "p" | "h2";
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView" | "viewport">;

/**
 * Scroll-triggered reveal. Composes a variant from the central motion
 * system and respects prefers-reduced-motion automatically.
 */
export function Reveal({
  variant = "fadeUp",
  delay = 0,
  as = "div",
  children,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion() ?? false;
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      variants={buildReveal(variant, delay, reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
