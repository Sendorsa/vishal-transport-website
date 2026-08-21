import { team } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientMesh } from "@/components/ui/GradientMesh";

export function Team() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="theme-light relative overflow-hidden py-section-y lg:py-section-y-lg"
    >
      <GradientMesh variant="subtle" />
      <div className="relative mx-auto max-w-container px-6 sm:px-10">
        {/* Editorial letter: title rail on the left, the message itself running
            to the right edge. The words are the subject — nothing beside them
            competing for the eye. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index={team.letter.label}
              title={team.letter.heading}
              mask
              headingId="leadership-heading"
              size="md"
            />
            <Reveal
              variant="fadeUp"
              delay={0.1}
              className="mt-10 flex items-center gap-4"
            >
              <span className="h-px w-10 shrink-0 bg-acc" />
              <span>
                <span className="block font-serif text-lg font-light">
                  {team.name}
                </span>
                <span className="text-sm text-ink-muted">
                  {team.role}, {team.org}
                </span>
              </span>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <span
              aria-hidden="true"
              className="mb-1 block font-serif text-6xl leading-[0.4] text-acc opacity-25"
            >
              &ldquo;
            </span>
            <Stagger className="space-y-6" stagger={0.1}>
              {team.letter.paragraphs.map((paragraph, i) => (
                <StaggerItem
                  key={i}
                  as="p"
                  className="text-body-lg leading-[1.85] text-ink-muted"
                >
                  {paragraph}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
