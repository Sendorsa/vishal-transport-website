"use client";

import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Icon } from "@/components/ui/Icon";
import { easing } from "@/lib/motion";

function ServiceRow({
  item,
}: {
  item: (typeof services.items)[number];
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <StaggerItem>
      <motion.div
        className="grid grid-cols-1 items-center gap-4 border-b border-hair py-10 lg:grid-cols-12 lg:gap-8"
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={{
          rest: { paddingLeft: 0, backgroundColor: "rgba(212,175,106,0)" },
          hover: reduced
            ? {}
            : { paddingLeft: 22, backgroundColor: "rgba(212,175,106,0.05)" },
        }}
        transition={{ duration: 0.5, ease: easing.expo }}
      >
        <motion.div
          className="text-idx text-sm text-ink-muted lg:col-span-1"
          variants={{ rest: { color: "var(--ink-2)" }, hover: { color: "var(--acc)" } }}
        >
          {item.num}
        </motion.div>
        <div className="aspect-[4/3] overflow-hidden rounded-xl lg:col-span-2">
          <ParallaxImage className="h-full w-full" parallax={12} zoom={0.06} reveal={false} />
        </div>
        <h3 className="font-serif text-3xl font-light lg:col-span-3 lg:text-4xl">
          {item.title}
        </h3>
        <p className="text-body-lg text-ink-muted lg:col-span-5">{item.body}</p>
        <div className="hidden text-acc lg:col-span-1 lg:flex lg:justify-end">
          <motion.span
            className="inline-flex"
            variants={{ rest: { x: 0 }, hover: { x: reduced ? 0 : 6 } }}
            transition={{ duration: 0.4, ease: easing.gentle }}
          >
            <Icon name="arrow" className="h-5 w-5" />
          </motion.span>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export function Services() {
  return (
    <section id="services" className="theme-dark py-section-y lg:py-section-y-lg">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
          {services.index}
        </Reveal>
        <Reveal variant="fadeUp" delay={0.08} as="h2" className="mt-7 font-serif text-display-lg font-light">
          {services.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </Reveal>

        <Stagger className="mt-16 border-t border-hair" stagger={0.1}>
          {services.items.map((item) => (
            <ServiceRow key={item.num} item={item} />
          ))}
        </Stagger>

        <Reveal variant="fadeUp" as="p" className="mt-8 text-xs text-ink-muted">
          {services.imageBriefs}
        </Reveal>
      </div>
    </section>
  );
}
