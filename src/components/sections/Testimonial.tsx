"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonial } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { easing } from "@/lib/motion";

function FaqItem({
  item,
  isOpen,
  onToggle,
  last,
}: {
  item: (typeof testimonial.faq)[number];
  isOpen: boolean;
  onToggle: () => void;
  last: boolean;
}) {
  return (
    <div className={`border-t border-hair ${last ? "border-b" : ""}`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-7 text-left text-lg"
      >
        {item.q}
        <motion.span
          className="shrink-0 text-acc"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease: easing.gentle }}
        >
          <Icon name="plus" className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easing.expo }}
            className="overflow-hidden text-sm text-ink-muted"
          >
            <p className="max-w-md pb-7">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Testimonial() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="theme-light py-section-y lg:py-section-y-lg">
      <div className="mx-auto grid max-w-container gap-16 px-6 sm:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
            {testimonial.index}
          </Reveal>
          <Reveal variant="fadeUp" delay={0.04} className="mt-8 flex items-center gap-3">
            <div className="text-idx flex h-10 w-10 items-center justify-center rounded-full border border-hair text-[10px] text-ink-muted">
              —
            </div>
            <span className="text-idx text-[9px] opacity-50">Reserved for client portrait</span>
          </Reveal>
          <Reveal
            variant="blur"
            as="p"
            delay={0.08}
            className="mt-6 font-serif font-light italic"
            style={{ fontSize: "clamp(1.4rem,2.6vw,2rem)", lineHeight: 1.35 }}
          >
            {testimonial.quote}
          </Reveal>
          <Reveal variant="fadeUp" delay={0.14} className="text-idx mt-6 text-xs text-ink-muted">
            {testimonial.note}
          </Reveal>
        </div>

        <Reveal variant="slideLeft" className="lg:col-span-6 lg:col-start-7">
          {testimonial.faq.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              last={i === testimonial.faq.length - 1}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
