"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { hero } from "@/lib/content";
import { useIsDesktop } from "@/lib/useMediaQuery";
import { MaskText } from "@/components/motion/MaskText";
import { Button } from "@/components/ui/Button";
import { easing } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  // Ken-burns only runs while the hero is actually on screen (saves battery
  // once scrolled past); scroll parallax is a desktop-only refinement.
  const inView = useInView(ref, { amount: 0.1 });
  const enableParallax = isDesktop && !reduced;
  const kenBurns = !reduced && inView;

  // Parallax: the background drifts and scales as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="theme-dark relative flex min-h-screen flex-col justify-between overflow-hidden"
    >
      {/* Background — slow continuous ken-burns + scroll parallax */}
      <motion.div
        className="ph-grain absolute inset-0"
        style={enableParallax ? { y: bgY, scale: bgScale } : undefined}
      >
        <motion.div
          className="ph ph-image h-full w-full"
          initial={{ scale: 1.04 }}
          animate={kenBurns ? { scale: 1.12 } : { scale: 1.04 }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <div className="ph-vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/30" />
        <span className="text-idx absolute right-6 top-1/2 hidden -translate-y-1/2 text-[10px] uppercase opacity-50 [writing-mode:vertical-rl] sm:right-10 sm:block">
          {hero.shotBrief}
        </span>
      </motion.div>

      {/* Top eyebrow row */}
      <motion.div
        className="relative mx-auto flex w-full max-w-container items-center justify-between px-6 pt-32 sm:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="text-idx text-xs opacity-60">{hero.eyebrowLeft}</span>
        <span className="text-idx hidden text-xs opacity-60 sm:block">
          {hero.eyebrowRight}
        </span>
      </motion.div>

      {/* Headline + CTA */}
      <motion.div
        className="relative mx-auto w-full max-w-container px-6 pb-20 sm:px-10"
        style={enableParallax ? { y: contentY, opacity: contentOpacity } : undefined}
      >
        <MaskText
          immediate
          className="max-w-4xl font-serif text-display-xl font-light"
          lines={hero.headline}
          delay={0.15}
          stagger={0.12}
        />

        <motion.div
          className="mt-10 flex flex-wrap items-end justify-between gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
          }}
        >
          <motion.p
            className="max-w-md text-body-lg text-ink-muted"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: easing.smoothOut },
              },
            }}
          >
            {hero.body}
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: easing.smoothOut },
              },
            }}
          >
            <Button href="#contact" arrow>
              Get a Quote
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
