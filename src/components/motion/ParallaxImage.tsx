"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { hoverTransition } from "@/lib/motion";

type ParallaxImageProps = {
  className?: string;
  /** Vertical parallax travel in px (subtle by default). */
  parallax?: number;
  /** Extra zoom applied across the scroll (e.g. 0.08 = up to +8%). */
  zoom?: number;
  /** Gentle scale on hover. Set 0 to disable (e.g. background layers). */
  hover?: number;
  /** Overlay/label children rendered above the image layer. */
  children?: React.ReactNode;
  /** Reveal the placeholder tint once in view. */
  reveal?: boolean;
};

/**
 * Placeholder image block with three coordinated motions:
 *  • slight scroll parallax   • slow scroll zoom   • gentle hover scale
 * Renders the reserved gradient placeholder until real photography lands.
 * All motion collapses to a static block under prefers-reduced-motion.
 */
export function ParallaxImage({
  className = "",
  parallax = 24,
  zoom = 0.08,
  hover = 1.03,
  children,
  reveal = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + zoom]);

  return (
    <div ref={ref} className={`ph ph-grain ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y, scale }}
      >
        <motion.div
          className="ph-image h-full w-full"
          whileHover={reduced || hover === 0 ? undefined : { scale: hover }}
          transition={hoverTransition}
          initial={reveal && !reduced ? { opacity: 0, scale: 1.04 } : false}
          whileInView={reveal && !reduced ? { opacity: 1, scale: 1 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
        />
      </motion.div>
      <div className="ph-vignette" />
      {children}
    </div>
  );
}
