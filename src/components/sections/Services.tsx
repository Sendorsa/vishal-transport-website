"use client";

import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
          rest: { paddingLeft: 0, backgroundColor: "rgba(14,116,180,0)" },
          hover: reduced
            ? {}
            : { paddingLeft: 22, backgroundColor: "rgba(14,116,180,0.05)" },
        }}
        transition={{ duration: 0.5, ease: easing.expo }}
      >
        <motion.div
          className="text-idx text-sm text-ink-muted lg:col-span-1"
          variants={{ rest: { color: "var(--ink-2)" }, hover: { color: "var(--acc)" } }}
        >
          {item.num}
        </motion.div>
        <h3 className="font-serif text-3xl font-light lg:col-span-3 lg:text-4xl">
          {item.title}
        </h3>
        <p className="text-body-lg text-ink-muted lg:col-span-7">{item.body}</p>
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
    <section id="services" className="theme-light py-section-y lg:py-section-y-lg">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <SectionHeading index={services.index} title={services.title} />

        <Stagger className="mt-16 border-t border-hair" stagger={0.1}>
          {services.items.map((item) => (
            <ServiceRow key={item.num} item={item} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
