import { about } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function About() {
  return (
    <section id="about" className="theme-light">
      <div className="grid lg:grid-cols-12">
        <div className="relative aspect-[4/3] lg:col-span-6 lg:aspect-auto">
          <ParallaxImage className="h-full min-h-[420px] w-full lg:min-h-[640px]">
            <span className="text-idx absolute bottom-6 left-6 text-[10px] opacity-60">
              {about.shotBrief}
            </span>
          </ParallaxImage>
        </div>

        <div className="flex items-center px-6 py-20 sm:px-10 lg:col-span-5 lg:col-start-8 lg:px-0 lg:py-0">
          <Reveal variant="slideRight">
            <span className="text-idx text-xs text-acc">{about.index}</span>
            <h2 className="mt-7 font-serif text-display-lg font-light">
              {about.title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-9 max-w-md text-body-lg text-ink-muted">
              {about.body}
            </p>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-hair pt-8">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-idx text-xl">{stat.value}</div>
                  <div className="mt-2 text-xs text-ink-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
