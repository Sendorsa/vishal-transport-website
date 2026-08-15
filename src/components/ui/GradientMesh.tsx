"use client";

import { motion, useReducedMotion } from "framer-motion";

type GradientMeshProps = {
  className?: string;
  /** "bright" for dark/navy sections, "subtle" for light sections. */
  variant?: "bright" | "subtle";
};

/**
 * The site's one recurring signature device — two soft blurred blobs of
 * brand blue, positioned asymmetrically behind a headline. Used sparingly,
 * at a small number of flagship moments, so it reads as deliberate brand
 * signature rather than decoration repeated everywhere.
 */
export function GradientMesh({ className = "", variant = "bright" }: GradientMeshProps) {
  const reduced = useReducedMotion() ?? false;
  const stops =
    variant === "bright"
      ? { a: "rgba(66,174,240,0.38)", b: "rgba(14,116,180,0.30)" }
      : { a: "rgba(14,116,180,0.12)", b: "rgba(66,174,240,0.09)" };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 1.6, ease: "easeOut" }}
    >
      <div
        className="absolute -left-[10%] -top-[25%] h-[75%] w-[60%] rounded-full"
        style={{ background: stops.a, filter: "blur(90px)" }}
      />
      <div
        className="absolute -right-[8%] bottom-[-20%] h-[65%] w-[55%] rounded-full"
        style={{ background: stops.b, filter: "blur(110px)" }}
      />
    </motion.div>
  );
}
