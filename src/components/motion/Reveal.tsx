"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { buildReveal, viewportOnce, type RevealVariant } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useMediaQuery";

type RevealProps = {
  /** Entrance identity — give each section its own. */
  variant?: RevealVariant;
  /** Seconds before the animation starts. */
  delay?: number;
  /** Render as a different element (default div). */
  as?: "div" | "section" | "span" | "li" | "p" | "h2" | "h3";
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
  const isDesktop = useIsDesktop();
  const MotionTag = motion[as] as typeof motion.div;

  // Horizontal slide-ins translate full-width elements ±64px, which pushes
  // them past the viewport on phones (horizontal overflow). Below `lg`, fall
  // back to a vertical reveal so nothing ever extends beyond the screen.
  const safeVariant: RevealVariant =
    !isDesktop && (variant === "slideLeft" || variant === "slideRight")
      ? "fadeUp"
      : variant;

  return (
    <MotionTag
      variants={buildReveal(safeVariant, delay, reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
