import { corridor } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function Corridor() {
  return (
    <section className="theme-dark relative h-[85vh] overflow-hidden">
      <ParallaxImage
        className="absolute inset-0"
        hover={0}
        reveal={false}
        parallax={40}
        zoom={0.12}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/40" />

      <div className="relative mx-auto flex h-full max-w-container flex-col justify-between px-6 py-16 sm:px-10">
        <Reveal
          variant="fadeUp"
          className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
        >
          <span className="text-idx text-[10px] opacity-45">{corridor.shotBrief}</span>
          <span className="text-idx text-xs opacity-70">{corridor.metric}</span>
        </Reveal>
        <Reveal
          variant="blur"
          as="p"
          delay={0.1}
          className="max-w-xl font-serif text-display-md italic"
        >
          {corridor.quote}
        </Reveal>
      </div>
    </section>
  );
}
