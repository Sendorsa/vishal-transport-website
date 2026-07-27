"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trust, faq } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { Icon } from "@/components/ui/Icon";
import { LogoCarousel, placeholderLogos } from "@/components/ui/LogoCarousel";
import { easing } from "@/lib/motion";

function FaqItem({
  item,
  isOpen,
  onToggle,
  last,
}: {
  item: (typeof faq)[number];
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

export function Trust() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="trust-heading"
      className="theme-light py-section-y lg:py-section-y-lg"
    >
      <div className="mx-auto max-w-container px-6 sm:px-10">
        {/* Editorial trust block — large heading, short paragraph, whitespace */}
        <div className="max-w-3xl">
          <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
            {trust.index}
          </Reveal>
          <h2 id="trust-heading" className="mt-7">
            <MaskText
              className="block font-serif text-display-lg font-light"
              lines={trust.title}
            />
          </h2>
          <Reveal variant="fadeUp" as="p" delay={0.1} className="mt-9 max-w-xl text-body-lg text-ink-muted">
            {trust.body}
          </Reveal>
        </div>

        {/* Logo marquee */}
        <Reveal variant="fadeUp" delay={0.15} className="mt-16 lg:mt-20">
          <LogoCarousel logos={placeholderLogos} />
        </Reveal>
        <Reveal variant="fadeUp" as="p" delay={0.2} className="mt-8 text-xs text-ink-muted">
          {trust.footnote}
        </Reveal>

        {/* FAQ — retained, subordinate to the trust block */}
        <div className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
              Questions
            </Reveal>
            <Reveal variant="fadeUp" delay={0.06} as="h3" className="mt-6 font-serif text-3xl font-light lg:text-4xl">
              Answered.
            </Reveal>
          </div>
          <Reveal variant="slideLeft" className="lg:col-span-7 lg:col-start-6">
            {faq.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                last={i === faq.length - 1}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
