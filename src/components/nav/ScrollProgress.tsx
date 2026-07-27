"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Slim reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <div className="fixed left-0 top-0 z-[70] h-[2px] w-full bg-white/10">
      <motion.div
        className="h-full origin-left bg-gold"
        style={{ scaleX }}
      />
    </div>
  );
}
