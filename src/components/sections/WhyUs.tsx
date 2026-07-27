"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyUs } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { easing } from "@/lib/motion";

export function WhyUs() {
  const reduced = useReducedMotion() ?? false;
  return (
    <section className="theme-dark border-t border-hair py-section-y lg:py-section-y-lg">
      <div className="mx-auto grid max-w-container gap-12 px-6 sm:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
            {whyUs.index}
          </Reveal>
          <Reveal variant="fadeUp" delay={0.08} as="h2" className="mt-7 font-serif text-display-lg font-light">
            {whyUs.title.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </Reveal>
        </div>

        <Stagger className="lg:col-span-6 lg:col-start-7" stagger={0.07}>
          {whyUs.items.map((item, i) => (
            <StaggerItem key={item.label}>
              <motion.div
                className={`flex items-center gap-4 py-5 sm:gap-5 sm:py-6 ${
                  i < whyUs.items.length - 1 ? "border-b border-hair" : ""
                }`}
                whileHover={reduced ? undefined : { x: 8 }}
                transition={{ duration: 0.4, ease: easing.expo }}
              >
                {/* Static placeholder mark — no scroll motion at this size. */}
                <div className="ph ph-grain h-12 w-12 shrink-0 overflow-hidden rounded-lg sm:h-14 sm:w-14" />
                <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-base sm:text-lg">{item.label}</span>
                  <span className="text-sm text-ink-muted">{item.meta}</span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
          <StaggerItem>
            <p className="mt-6 text-xs text-ink-muted">{whyUs.imageBriefs}</p>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
