import { extendedCapabilities } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function ExtendedCapabilities() {
  return (
    <section
      id="extended-capabilities"
      className="theme-light py-section-y lg:py-section-y-lg"
    >
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index={extendedCapabilities.index}
              title={extendedCapabilities.title}
            />
            <Reveal
              variant="fadeUp"
              as="p"
              delay={0.12}
              className="mt-7 text-body-lg text-ink-muted"
            >
              {extendedCapabilities.body}
            </Reveal>
          </div>

          <Reveal variant="slideLeft" className="lg:col-span-6 lg:col-start-7">
            <div className="flex h-full flex-col justify-center gap-10 border-t border-hair pt-10 xl:flex-row xl:items-center xl:gap-16">
              <div className="flex items-start gap-4">
                <Icon
                  name="warehouse"
                  className="mt-1 h-9 w-9 shrink-0 text-acc"
                  aria-hidden="true"
                />
                <div>
                  <div
                    className="whitespace-nowrap text-idx font-light leading-none"
                    style={{ fontSize: "clamp(2.25rem,7vw,3.75rem)" }}
                  >
                    <Counter
                      to={extendedCapabilities.stat.count}
                      suffix={extendedCapabilities.stat.suffix}
                    />
                  </div>
                  <div className="mt-2 text-base text-ink-muted">
                    {extendedCapabilities.stat.label}
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="whitespace-nowrap text-idx font-light leading-none"
                  style={{ fontSize: "clamp(2.25rem,7vw,3.75rem)" }}
                >
                  {extendedCapabilities.tenants.value}
                </div>
                <div className="mt-2 text-base text-ink-muted">
                  {extendedCapabilities.tenants.label}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
