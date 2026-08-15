import type { Variants, Transition, TargetAndTransition } from "framer-motion";

/* ============================================================
   MOTION SYSTEM
   Centralized easing, durations and reusable Framer Motion
   variants. Every animation in the app is composed from these
   presets — no inline magic numbers in components.
   ============================================================ */

/** Modern easing curves shared across the whole experience. */
export const easing = {
  /** Expressive ease-out — hero, headings, large moves. */
  expo: [0.19, 1, 0.22, 1] as const,
  /** Softer ease-out — reveals, cards. */
  smoothOut: [0.16, 1, 0.3, 1] as const,
  /** Balanced — hovers, small UI transitions. */
  gentle: [0.4, 0, 0.2, 1] as const,
};

export const duration = {
  fast: 0.35,
  base: 0.7,
  slow: 0.9,
  slower: 1.1,
};

/* ---------- Section reveal variants ----------
   Distinct entrance identities so no two adjacent sections
   share the same motion. Selected per-section via <Reveal variant>. */
export type RevealVariant =
  | "fadeUp"
  | "slideLeft"
  | "slideRight"
  | "blur"
  | "scaleIn";

const hiddenStates: Record<RevealVariant, TargetAndTransition> = {
  fadeUp: { opacity: 0, y: 40 },
  slideLeft: { opacity: 0, x: -64 },
  slideRight: { opacity: 0, x: 64 },
  blur: { opacity: 0, filter: "blur(16px)", y: 18 },
  scaleIn: { opacity: 0, scale: 0.92 },
};

const shownState: TargetAndTransition = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
};

/**
 * Build a reveal variant set.
 * @param variant  entrance identity
 * @param delay    seconds before start (for hand-tuned choreography)
 * @param reduced  collapse to an instant opacity fade for reduced-motion
 */
export function buildReveal(
  variant: RevealVariant,
  delay = 0,
  reduced = false,
): Variants {
  if (reduced) {
    // Spread shownState so the transform is explicitly reset, not just omitted.
    // useReducedMotion() is false on the server, so the SSR markup already
    // carries the *non-reduced* hidden transform (e.g. translateX(64px)).
    // Variants that only touch opacity never clear it, leaving the element
    // permanently offset for exactly the users who opted out of motion.
    return {
      hidden: { ...shownState, opacity: 0 },
      visible: { ...shownState, opacity: 1, transition: { duration: 0.2, delay } },
    };
  }
  return {
    hidden: hiddenStates[variant],
    visible: {
      ...shownState,
      transition: { duration: duration.slow, ease: easing.expo, delay },
    },
  };
}

/* ---------- Stagger container + item ----------
   For lists, service rows, CTA groups, footer columns. */
export function staggerContainer(
  stagger = 0.08,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export function staggerItem(reduced = false): Variants {
  if (reduced) {
    // y is reset explicitly — see the note in buildReveal.
    return {
      hidden: { opacity: 0, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.base, ease: easing.smoothOut },
    },
  };
}

/* ---------- Mask / line reveal ----------
   Text slides up from behind an overflow-hidden clip. */
export function maskLine(delay = 0, reduced = false): Variants {
  if (reduced) {
    // y is reset explicitly — see the note in buildReveal. Without it the line
    // keeps the server-rendered y:112% and stays clipped out of sight entirely.
    return {
      hidden: { opacity: 0, y: "0%" },
      visible: { opacity: 1, y: "0%", transition: { duration: 0.2, delay } },
    };
  }
  return {
    hidden: { y: "112%" },
    visible: {
      y: "0%",
      transition: { duration: duration.slower, ease: easing.expo, delay },
    },
  };
}

/* ---------- Shared interaction transitions ---------- */
export const hoverTransition: Transition = {
  duration: duration.fast,
  ease: easing.gentle,
};

/** Standard in-view trigger config — reveal once, a little early. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
