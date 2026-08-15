import { employeeGrowth } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
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
