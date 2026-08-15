import { whyUs } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function WhyUs() {
  return (
    <section className="theme-light border-t border-hair py-section-y lg:py-section-y-lg">
      <div className="mx-auto grid max-w-container gap-12 px-6 sm:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading index={whyUs.index} title={whyUs.title} />
        </div>

        <Stagger className="lg:col-span-6 lg:col-start-7" stagger={0.08}>
          {whyUs.items.map((item, i) => (
            <StaggerItem key={item.label}>
              <div
                className={`flex items-center gap-5 py-6 ${
                  i < whyUs.items.length - 1 ? "border-b border-hair" : ""
                }`}
              >
                <Icon name={item.icon} className="h-6 w-6 shrink-0 text-acc" aria-hidden="true" />
                <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-base sm:text-lg">{item.label}</span>
                  <span className="text-sm text-ink-muted">{item.meta}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
