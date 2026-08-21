"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/content";
import { useIsDesktop } from "@/lib/useMediaQuery";
import { MaskText } from "@/components/motion/MaskText";
import { Button } from "@/components/ui/Button";
import { GradientMesh } from "@/components/ui/GradientMesh";
import { BusScene } from "@/components/ui/BusScene";
import { easing } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  const enableParallax = isDesktop && !reduced;

  // Parallax: the content drifts as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="theme-dark relative flex min-h-screen flex-col justify-between overflow-hidden"
    >
      {/* Background — atmosphere only; the bus scene below carries the motion */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/30" />
        <GradientMesh variant="bright" />
        <span className="text-idx absolute right-6 top-1/2 hidden -translate-y-1/2 text-[10px] uppercase opacity-80 [writing-mode:vertical-rl] sm:right-10 sm:block">
          {hero.sideNote}
        </span>
      </div>

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

      {/* Headline + CTA, then the bus scene directly beneath — both live in
          normal flow together so the bus can never overlap the CTA, on any
          viewport height. */}
      <div className="relative">
        <motion.div
          className="relative mx-auto w-full max-w-container px-6 pb-10 sm:px-10"
          style={enableParallax ? { y: contentY, opacity: contentOpacity } : undefined}
        >
          <MaskText
            as="h1"
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

        <BusScene />
      </div>
    </section>
  );
}
