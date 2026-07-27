"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whyUs } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
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
                className={`flex items-center gap-5 py-6 ${
                  i < whyUs.items.length - 1 ? "border-b border-hair" : ""
                }`}
                whileHover={reduced ? undefined : { x: 8 }}
                transition={{ duration: 0.4, ease: easing.expo }}
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <ParallaxImage className="h-full w-full" parallax={6} zoom={0.04} reveal={false} />
                </div>
                <div className="flex flex-1 items-baseline justify-between gap-6">
                  <span className="text-lg">{item.label}</span>
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
