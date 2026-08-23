"use client";

import { motion, useReducedMotion } from "framer-motion";
import { maskLine } from "@/lib/motion";
import { useRevealArm } from "@/lib/useRevealArm";

type MaskTextProps = {
  /** Lines rendered one above the other, each revealing in sequence. */
  lines: React.ReactNode[];
  /** Seconds between lines. */
  stagger?: number;
  /** Delay before the first line. */
  delay?: number;
  className?: string;
  /** Trigger immediately on mount instead of on scroll (hero). */
  immediate?: boolean;
  /** Element to render. The hero passes "h1" so the page has one. */
  as?: "span" | "h1" | "h2";
  id?: string;
};

/**
 * Cinematic line-by-line reveal — each line slides up from behind a
 * clipping mask. Used for hero and large display headings.
 */
export function MaskText({
  lines,
  stagger = 0.12,
  delay = 0,
  className,
  immediate = false,
  as: Tag = "span",
  id,
}: MaskTextProps) {
  const reduced = useReducedMotion() ?? false;
  const { ref, controls, armed } = useRevealArm<HTMLElement>();
  // Immediate mode animates on mount; scroll mode is driven by the arm hook,
  // which only hides lines that are still below the fold.
  const trigger = immediate
    ? { animate: "visible" as const }
    : { animate: controls };

  // Immediate mode (the hero) is pure CSS: no Framer, so the headline paints
  // and reveals without waiting for the JS bundle. Scroll-triggered headings
  // keep the Framer path — they are below the fold and never the LCP element.
  if (immediate) {
    return (
      <Tag className={className} id={id}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.05em]">
            <span
              className="mask-line-css block"
              style={{ animationDelay: `${delay + i * stagger}s` }}
            >
              {line}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    // Tag is polymorphic (span | h1 | h2), so its ref type is a union React
    // cannot narrow here; the hook only ever calls getBoundingClientRect.
    <Tag className={className} id={id} ref={ref as React.Ref<HTMLHeadingElement>}>
      {lines.map((line, i) => (
        /* The trigger lives on the clip wrapper, not on the line inside it.
           The inner span starts at y:112% — fully below this wrapper's
           overflow-hidden box — and IntersectionObserver clips its intersection
           rect against ancestor overflow, so observing the inner span gives a
           permanent ratio of 0 and `amount` can never be satisfied: the heading
           would stay hidden forever. The wrapper is never transformed, so it
           observes normally and propagates the variant down. */
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.05em]"
          initial={false}
          {...trigger}
        >
          <motion.span
            className="block will-change-transform"
            variants={maskLine(delay + i * stagger, reduced)}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
