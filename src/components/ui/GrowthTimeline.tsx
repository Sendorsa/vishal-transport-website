"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/motion/Counter";
import { easing } from "@/lib/motion";

type Milestone = { year: string; count: number };

type GrowthTimelineProps = {
  /** Chronological — earliest first. The final milestone renders largest. */
  data: Milestone[];
  unit: string;
  suffix?: string;
};

/**
 * Editorial milestone timeline — a drawn line with dot markers, each
 * carrying a large serif number rather than a bar. The final (current)
 * milestone is set larger, so the growth story reads in the typography
 * itself. Vertical on mobile/tablet, horizontal from lg up.
 */
export function GrowthTimeline({ data, unit, suffix = "+" }: GrowthTimelineProps) {
  const reduced = useReducedMotion() ?? false;
  const last = data.length - 1;

  return (
    <div>
      {/* Mobile / tablet — vertical timeline */}
      <div className="flex flex-col lg:hidden">
        {data.map((d, i) => (
          <div key={d.year} className="flex gap-5">
            <div className="flex flex-col items-center pt-2">
              <span
                className={`h-3 w-3 shrink-0 rounded-full ${
                  i === last ? "bg-acc" : "border-2 border-acc bg-bg"
                }`}
              />
              {i < last && <span className="mt-1 w-px flex-1 bg-hair" />}
            </div>
            <div className={i < last ? "pb-10" : ""}>
              <div className="text-idx text-xs text-ink-muted">{d.year}</div>
              <div
                className="mt-1 whitespace-nowrap font-serif font-light leading-none text-ink"
                style={{ fontSize: i === last ? "clamp(2.5rem,11vw,3.5rem)" : "clamp(1.875rem,8vw,2.5rem)" }}
              >
                <Counter to={d.count} suffix={suffix} />
              </div>
              <div className="mt-1.5 text-sm text-ink-muted">{unit}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop — horizontal timeline */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-[9px] h-px bg-hair" />
        <motion.div
          className="absolute left-0 top-[9px] h-px w-full origin-left bg-acc"
          initial={{ scaleX: reduced ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0 : 1.3, ease: easing.expo }}
        />
        <div className="relative flex justify-between gap-6">
          {data.map((d, i) => (
            <div key={d.year} className="flex flex-col items-start">
              <span
                className={`h-[18px] w-[18px] shrink-0 rounded-full ${
                  i === last ? "bg-acc" : "border-2 border-acc bg-bg"
                }`}
              />
              <div className="mt-7">
                <div className="text-idx text-xs text-ink-muted">{d.year}</div>
                <div
                  className="mt-2 whitespace-nowrap font-serif font-light leading-none text-ink"
                  style={{ fontSize: i === last ? "clamp(3rem,4.8vw,4.5rem)" : "clamp(2rem,3vw,2.75rem)" }}
                >
                  <Counter to={d.count} suffix={suffix} />
                </div>
                <div className="mt-2 text-sm text-ink-muted">{unit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
