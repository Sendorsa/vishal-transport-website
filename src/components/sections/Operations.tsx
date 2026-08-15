"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { operations } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Counter } from "@/components/motion/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { easing } from "@/lib/motion";

/** Hand-drawn "live tracking" panel — a route drawing in, a pulsing
 * vehicle marker, and a CCTV status chip. Illustrative, not a screenshot,
 * consistent with the rest of the site's placeholder-photography system. */
function TrackingIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion() ?? false;
  const show = inView || reduced;
  const pulse = inView && !reduced;

  return (
    <div ref={ref} className="ph relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[6/5]">
      <svg viewBox="0 0 400 340" className="h-full w-full" aria-hidden="true">
        <g stroke="var(--hair)" strokeWidth="1">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`h${i}`} x1="0" y1={i * 68 + 30} x2="400" y2={i * 68 + 30} />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={`v${i}`} x1={i * 70 + 20} y1="0" x2={i * 70 + 20} y2="340" />
          ))}
        </g>
        <motion.path
          d="M45 280 C 110 250, 150 160, 220 150 S 330 90, 355 55"
          fill="none"
          stroke="var(--acc)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={show ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: reduced ? 0 : 1.8, ease: easing.expo }}
        />
        <circle cx="45" cy="280" r="5" fill="var(--acc)" />
        <g>
          <circle cx="355" cy="55" r="5" fill="var(--ink)" />
          <motion.circle
            cx="355"
            cy="55"
            r="5"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={pulse ? { opacity: 0, scale: 2.8 } : { opacity: 0.6, scale: 1 }}
            transition={{ duration: 2, repeat: pulse ? Infinity : 0, ease: "easeOut" }}
          />
        </g>
      </svg>
      <div
        className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full px-3 py-2 shadow-card backdrop-blur"
        style={{ backgroundColor: "color-mix(in srgb, var(--bg) 90%, transparent)" }}
      >
        <Icon name="camera" className="h-4 w-4 text-acc" />
        <span className="text-idx text-[10px] text-ink-muted">Live — Cam 04</span>
      </div>
    </div>
  );
}

export function Operations() {
  const { technology, safety } = operations;

  return (
    <section id="operations" className="theme-light py-section-y lg:py-section-y-lg">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <div className="lg:max-w-2xl">
          <SectionHeading index={operations.index} title={operations.title} />
          <Reveal
            variant="fadeUp"
            as="p"
            delay={0.12}
            className="mt-7 text-body-lg text-ink-muted"
          >
            {operations.intro}
          </Reveal>
        </div>

        {/* Technology & Tracking */}
        <div className="mt-20 lg:mt-28">
          <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
            {technology.label}
          </Reveal>
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal variant="blur" className="lg:col-span-5">
              <TrackingIllustration />
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal variant="fadeUp" as="p" className="max-w-xl text-body-lg text-ink-muted">
                {technology.body}
              </Reveal>
              <Stagger className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2" stagger={0.08}>
                {technology.features.map((f) => (
                  <StaggerItem key={f.label}>
                    <Icon name={f.icon} className="h-6 w-6 text-acc" aria-hidden="true" />
                    <div className="mt-3 text-base">{f.label}</div>
                    <div className="mt-1 text-sm text-ink-muted">{f.meta}</div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>

        {/* Driver Training & Safety */}
        <div className="mt-20 border-t border-hair pt-16 lg:mt-28 lg:pt-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="lg:max-w-xl">
              <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
                {safety.label}
              </Reveal>
              <Reveal
                variant="fadeUp"
                as="p"
                delay={0.08}
                className="mt-5 text-body-lg text-ink-muted"
              >
                {safety.body}
              </Reveal>
            </div>
            <Reveal variant="scaleIn" delay={0.12} className="shrink-0">
              <div
                className="whitespace-nowrap text-idx font-light leading-none"
                style={{ fontSize: "clamp(2.75rem,6vw,5rem)" }}
              >
                <Counter to={safety.stat.count} suffix={safety.stat.suffix} />
              </div>
              <div className="mt-2 whitespace-nowrap text-lg text-ink-muted">
                {safety.stat.label}
              </div>
            </Reveal>
          </div>

          {/* Connected process flow — vertical on mobile/tablet, horizontal from lg */}
          <div className="mt-14 flex flex-col lg:hidden">
            {safety.pillars.map((p, i) => (
              <div key={p.label} className="flex gap-5">
                <div className="flex flex-col items-center pt-0.5">
                  <span className="text-idx flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-acc text-xs text-acc">
                    {`0${i + 1}`}
                  </span>
                  {i < safety.pillars.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-hair" />
                  )}
                </div>
                <div className={i < safety.pillars.length - 1 ? "pb-10" : ""}>
                  <Icon name={p.icon} className="h-6 w-6 text-ink" aria-hidden="true" />
                  <h3 className="mt-3 font-serif text-2xl font-light">{p.label}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-14 hidden lg:block">
            <div className="absolute left-0 right-0 top-[18px] h-px bg-hair" />
            <div className="relative grid grid-cols-3 gap-10">
              {safety.pillars.map((p, i) => (
                <div key={p.label}>
                  <span
                    className="text-idx relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-acc text-xs text-acc"
                    style={{ backgroundColor: "var(--bg)" }}
                  >
                    {`0${i + 1}`}
                  </span>
                  <Icon name={p.icon} className="mt-6 h-7 w-7 text-ink" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-2xl font-light">{p.label}</h3>
                  <p className="mt-3 max-w-xs text-sm text-ink-muted">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
