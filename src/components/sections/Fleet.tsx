import { fleet } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import type { RevealVariant } from "@/lib/motion";

// Each stat gets its own grid placement + entrance identity.
const layout: { className: string; variant: RevealVariant; delay: number }[] = [
  { className: "lg:col-span-6", variant: "fadeUp", delay: 0 },
  { className: "lg:col-span-5 lg:col-start-8 lg:pt-10", variant: "slideRight", delay: 0.1 },
  { className: "lg:col-span-5 lg:pt-6", variant: "slideLeft", delay: 0.2 },
  { className: "lg:col-span-4 lg:col-start-9 lg:pt-14", variant: "scaleIn", delay: 0.3 },
];

export function Fleet() {
  return (
    <section className="theme-light py-section-y lg:py-section-y-lg">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
          {fleet.index}
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {fleet.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              variant={layout[i].variant}
              delay={layout[i].delay}
              className={layout[i].className}
            >
              <div
                className="whitespace-nowrap text-idx font-light leading-none"
                style={{ fontSize: stat.size }}
              >
                <Counter to={stat.count} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-lg text-ink-muted">{stat.label}</div>
              <div className="text-idx mt-3 text-[10px] text-acc">{stat.note}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
