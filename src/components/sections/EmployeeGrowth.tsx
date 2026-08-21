import { employeeGrowth } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GrowthTimeline } from "@/components/ui/GrowthTimeline";

export function EmployeeGrowth() {
  return (
    <section id="workforce" className="theme-light py-section-y lg:py-section-y-lg">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <div className="lg:max-w-2xl">
          <SectionHeading index={employeeGrowth.index} title={employeeGrowth.title} />
          <Reveal
            variant="fadeUp"
            as="p"
            delay={0.12}
            className="mt-7 text-body-lg text-ink-muted"
          >
            {employeeGrowth.body}
          </Reveal>
        </div>

        {/* A wide strip, not a side-by-side panel — the composition is a long
            line of people, and it keeps this section distinct from the
            categories-plus-image layout used by Fleet Strength. */}
        <Reveal variant="fadeUp" delay={0.16} className="mt-14 lg:mt-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[2/1] lg:aspect-[16/7]">
            <ParallaxImage
              className="absolute inset-0 h-full w-full"
              parallax={18}
              zoom={0.06}
              reveal={false}
              photo="workforce-uno-minda"
              sizes="(min-width: 1480px) 1400px, 100vw"
              position="50% 62%"
            />
          </div>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.1} className="mt-16 lg:mt-24">
          <div className="text-idx mb-10 text-xs text-acc lg:mb-14">
            {employeeGrowth.growthNote}
          </div>
          <GrowthTimeline data={employeeGrowth.chart} unit={employeeGrowth.unit} />
        </Reveal>

        <Stagger className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-24" stagger={0.1}>
          {employeeGrowth.callouts.map((c) => (
            <StaggerItem key={c.label}>
              <div className="border-l-2 border-acc pl-5">
                <div className="text-lg">{c.label}</div>
                <div className="mt-2 text-sm text-ink-muted">{c.meta}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
