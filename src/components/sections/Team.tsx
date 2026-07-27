import { team } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function Team() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="theme-dark py-section-y lg:py-section-y-lg"
    >
      <div className="mx-auto max-w-container px-6 sm:px-10">
        {/* A single executive statement: portrait + message, nothing competing.
            Vertically centred on desktop; stacks portrait-over-message below lg. */}
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          {/* LEFT (40%) — the portrait, standing on its own */}
          <Reveal variant="fadeUp" className="lg:col-span-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-white/10 lg:max-w-none">
              <ParallaxImage
                className="absolute inset-0 h-full w-full"
                parallax={24}
                zoom={0.08}
                hover={1.04}
                reveal={false}
              />
              <span className="text-idx absolute bottom-6 left-6 max-w-[12rem] text-[10px] opacity-60">
                {team.shotBrief}
              </span>
            </div>
          </Reveal>

          {/* RIGHT (60%) — the executive message */}
          <div className="lg:col-span-3">
            <div className="max-w-3xl">
              <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
                {team.letter.label}
              </Reveal>
              <h2
                id="leadership-heading"
                className="mt-5 font-serif text-display-md font-light"
              >
                <MaskText className="block" lines={team.letter.heading} stagger={0.12} />
              </h2>

              <div className="mt-9">
                <span
                  aria-hidden="true"
                  className="mb-1 block font-serif text-6xl leading-[0.4] text-acc/25"
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
                <Reveal
                  variant="fadeUp"
                  delay={0.1}
                  className="mt-10 flex items-center gap-4"
                >
                  <span className="h-px w-10 shrink-0 bg-acc" />
                  <span>
                    <span className="block font-serif text-lg font-light">
                      {team.letter.signoff}
                    </span>
                    <span className="text-sm text-ink-muted">{team.org}</span>
                  </span>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
