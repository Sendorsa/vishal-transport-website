import { team } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Button } from "@/components/ui/Button";

export function Team() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="theme-dark py-section-y lg:py-section-y-lg"
    >
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — large executive portrait */}
          <Reveal
            variant="scaleIn"
            className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-white/10">
              <ParallaxImage
                className="h-full w-full"
                parallax={26}
                zoom={0.08}
                hover={1.04}
                reveal={false}
              />
              <span className="text-idx absolute bottom-6 left-6 max-w-[12rem] text-[10px] opacity-60">
                {team.shotBrief}
              </span>
            </div>
          </Reveal>

          {/* RIGHT — identity, message, signature, CTA */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
              {team.index}
            </Reveal>

            {team.name && (
              <Reveal variant="fadeUp" delay={0.06} as="h2" className="mt-6 font-serif text-display-md font-light">
                {team.name}
              </Reveal>
            )}

            <h2
              id="leadership-heading"
              className="mt-6 font-serif text-2xl font-light italic leading-relaxed lg:text-[1.9rem] lg:leading-[1.45]"
            >
              <MaskText
                className="block"
                lines={team.message.map((line, i) =>
                  i === 0 ? `“${line}` : i === team.message.length - 1 ? `${line}”` : line,
                )}
                stagger={0.14}
              />
            </h2>

            <Reveal variant="fadeUp" delay={0.15} className="mt-10 border-t border-hair pt-6">
              <div className="font-medium">{team.role}</div>
              <div className="mt-1 text-sm text-ink-muted">{team.org}</div>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.22} className="mt-9">
              <Button href={team.cta.href} variant="line" arrow>
                {team.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
