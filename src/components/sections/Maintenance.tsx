import { maintenance } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function Maintenance() {
  return (
    <section id="maintenance" className="theme-light py-section-y lg:py-section-y-lg">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading index={maintenance.index} title={maintenance.title} />
            <Reveal
              variant="fadeUp"
              as="p"
              delay={0.12}
              className="mt-7 max-w-xl text-body-lg text-ink-muted"
            >
              {maintenance.body}
            </Reveal>

            <Reveal variant="fadeUp" delay={0.16} className="mt-10 flex items-baseline gap-3">
              <span className="whitespace-nowrap font-serif text-4xl font-light leading-none text-ink">
                2
              </span>
              <span className="text-sm text-ink-muted">
                Workshop locations — Hosur &amp; Bengaluru
              </span>
            </Reveal>

            <Stagger className="mt-8 border-t border-hair" stagger={0.08}>
              {maintenance.features.map((f, i) => (
                <StaggerItem key={f.label}>
                  <div
                    className={`flex items-center gap-5 py-5 ${
                      i < maintenance.features.length - 1 ? "border-b border-hair" : ""
                    }`}
                  >
                    <Icon name={f.icon} className="h-6 w-6 shrink-0 text-acc" aria-hidden="true" />
                    <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <span className="text-base">{f.label}</span>
                      <span className="text-sm text-ink-muted">{f.meta}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal variant="slideLeft" className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <ParallaxImage className="h-full w-full" parallax={20} zoom={0.08}>
                <span className="text-idx absolute bottom-4 right-4 text-[10px] opacity-50">
                  {maintenance.shotBrief}
                </span>
              </ParallaxImage>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
