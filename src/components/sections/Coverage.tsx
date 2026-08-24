"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useArmed } from "@/lib/useRevealArm";
import { coverage } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { easing } from "@/lib/motion";

export function Coverage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, amount: 0.3 });
  const reduced = useReducedMotion() ?? false;
  // `show` drives the decorative route line and dots only.
  const show = inView || reduced;
  // The location labels are business content, so they render immediately and
  // only animate when they started below the fold.
  const { ref: pinsRef, armed: pinsArmed } = useArmed<HTMLDivElement>();

  return (
    <section id="coverage" className="theme-light py-section-y lg:py-section-y-lg">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <SectionHeading index={coverage.index} title={coverage.title} />

        {/* Mobile: a stacked corridor list — the wide map strip would clip
            its overlaid pin labels on narrow screens. */}
        <div className="mt-12 lg:hidden">
          {coverage.pins.map((pin, i) => (
            <Reveal
              key={pin.city}
              variant="fadeUp"
              delay={i * 0.1}
              className="relative flex gap-5 pb-8 last:pb-0"
            >
              <div className="flex flex-col items-center pt-1.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-acc" />
                {i < coverage.pins.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-acc opacity-30" />
                )}
              </div>
              <div>
                <div className="text-idx text-xs text-acc">{pin.region}</div>
                <div className="mt-1 font-serif text-3xl font-light">{pin.city}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Desktop: the drawn route map with overlaid pins. */}
        <div ref={mapRef} className="relative mt-16 hidden aspect-map lg:block">
          <svg viewBox="0 0 1200 380" className="h-full w-full">
            {/* Route line drawing itself in */}
            <motion.path
              d="M 140 300 C 450 120, 750 60, 1060 110"
              fill="none"
              stroke="var(--acc)"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={show ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: reduced ? 0 : 1.9, ease: easing.expo }}
            />
            {[
              { cx: 140, cy: 300, delay: 0 },
              { cx: 1060, cy: 110, delay: 1.75 },
            ].map((dot, i) => (
              <motion.circle
                key={i}
                cx={dot.cx}
                cy={dot.cy}
                r={5}
                fill="var(--acc)"
                initial={{ opacity: 0 }}
                animate={show ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: reduced ? 0 : dot.delay }}
              />
            ))}
          </svg>

          {coverage.pins.map((pin, i) => (
            <motion.div
              key={pin.city}
              className={`absolute ${pin.side === "right" ? "text-right" : ""}`}
              style={pin.style}
              ref={i === 0 ? pinsRef : undefined}
              initial={false}
              animate={
                pinsArmed && show ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={{
                duration: pinsArmed ? 0.5 : 0,
                delay: pinsArmed && !reduced ? 0.8 + i * 0.45 : 0,
              }}
            >
              <div
                className={pin.side === "right" ? "border-r pr-4" : "border-l pl-4"}
                style={{ borderColor: "var(--acc)" }}
              >
                <div className="text-idx text-xs text-acc">{pin.region}</div>
                <div className="mt-1 font-serif text-2xl font-light">{pin.city}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-hair pt-10 sm:grid-cols-2">
          {coverage.addresses.map((addr, i) => (
            <Reveal key={i} variant="fadeUp" delay={i * 0.1}>
              <div className="text-sm text-ink-muted">{addr.text}</div>
              <div className="text-idx mt-3 text-xs text-ink-muted">{addr.gstin}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
