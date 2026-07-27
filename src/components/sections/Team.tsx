import { team } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function Team() {
  return (
    <section className="theme-dark relative py-section-y lg:py-section-y-lg">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
          {team.index}
        </Reveal>
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
          <Reveal
            variant="blur"
            as="p"
            delay={0.1}
            className="font-serif font-light italic lg:col-span-9"
            style={{ fontSize: "clamp(1.6rem,3.6vw,3rem)", lineHeight: 1.3 }}
          >
            &ldquo;{team.quote}&rdquo;
          </Reveal>
          <Reveal
            variant="slideLeft"
            delay={0.2}
            className="flex flex-col items-end gap-2 lg:col-span-3"
          >
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full lg:h-40 lg:w-40">
              <ParallaxImage className="h-full w-full" parallax={10} zoom={0.05} reveal={false} />
            </div>
            <span className="text-idx max-w-[10rem] text-right text-[9px] opacity-50">
              {team.shotBrief}
            </span>
          </Reveal>
        </div>
        <Reveal variant="fadeUp" delay={0.26} className="mt-10 max-w-md border-t border-hair pt-6">
          <div className="font-medium">{team.role}</div>
          <div className="mt-1 text-sm text-ink-muted">{team.org}</div>
        </Reveal>
      </div>
    </section>
  );
}
