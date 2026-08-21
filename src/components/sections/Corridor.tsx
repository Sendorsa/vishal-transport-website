import { corridor } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { GradientMesh } from "@/components/ui/GradientMesh";

export function Corridor() {
  return (
    <section className="theme-dark relative h-[85vh] overflow-hidden">
      <ParallaxImage
        className="absolute inset-0"
        hover={0}
        reveal={false}
        parallax={40}
        zoom={0.12}
        photo="fleet-tata-dusk"
        sizes="100vw"
        // Bias downward: the navy gradient eats the top band, so hold the
        // vehicles rather than centring on empty sky.
        position="50% 62%"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/40" />
      <GradientMesh variant="bright" />

      <div className="relative mx-auto flex h-full max-w-container flex-col justify-between px-6 py-16 sm:px-10">
        <Reveal
          variant="fadeUp"
          className="flex justify-end"
        >
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
