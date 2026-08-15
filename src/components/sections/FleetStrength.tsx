import { fleetStrength } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GrowthTimeline } from "@/components/ui/GrowthTimeline";
import { Icon } from "@/components/ui/Icon";

export function FleetStrength() {
  return (
    <section id="fleet-strength" className="theme-light py-section-y lg:py-section-y-lg">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <div className="lg:max-w-2xl">
          <SectionHeading index={fleetStrength.index} title={fleetStrength.title} />
          <Reveal
            variant="fadeUp"
            as="p"
            delay={0.12}
            className="mt-7 text-body-lg text-ink-muted"
          >
            {fleetStrength.body}
          </Reveal>
        </div>

        <Reveal variant="fadeUp" delay={0.1} className="mt-16 lg:mt-24">
          <div className="text-idx mb-10 text-xs text-acc lg:mb-14">
            {fleetStrength.growthNote}
          </div>
          <GrowthTimeline data={fleetStrength.chart} unit={fleetStrength.unit} />
        </Reveal>

        <div className="mt-16 grid items-start gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <Stagger className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1" stagger={0.1}>
            {fleetStrength.categories.map((c) => (
              <StaggerItem key={c.label}>
                <div className="flex items-start gap-4 border-l-2 border-acc pl-5">
                  <Icon name={c.icon} className="mt-1 h-7 w-7 shrink-0 text-acc" aria-hidden="true" />
                  <div>
                    <div className="font-serif text-2xl font-light">{c.label}</div>
                    <div className="mt-1.5 text-sm text-ink-muted">{c.meta}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Fleet mosaic — the yard, in operation, rather than another card. */}
          <Reveal
            variant="scaleIn"
            delay={0.1}
            className="grid grid-cols-3 grid-rows-2 gap-3 lg:col-span-7 sm:gap-4"
            style={{ height: "clamp(280px, 34vw, 420px)" }}
          >
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl">
              <ParallaxImage
                className="absolute inset-0 h-full w-full"
                parallax={14}
                zoom={0.06}
                reveal={false}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <ParallaxImage
                className="absolute inset-0 h-full w-full"
                parallax={10}
                zoom={0.06}
                hover={1.04}
                reveal={false}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <ParallaxImage
                className="absolute inset-0 h-full w-full"
                parallax={10}
                zoom={0.06}
                hover={1.04}
                reveal={false}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
