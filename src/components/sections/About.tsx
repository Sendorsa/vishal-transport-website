import { about, site } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Logo } from "@/components/ui/Logo";

export function About() {
  return (
    <section id="about" className="theme-light">
      <div className="grid lg:grid-cols-12">
        {/* Brand plate rather than a photograph: the mark sits on its own
            tonal ground so it reads as a deliberate statement, not a logo
            dropped onto white. Height comes from padding — no aspect box to
            leave dead space now that there is no image to fill it. */}
        <div className="relative flex items-center justify-center overflow-hidden bg-surface px-8 py-24 sm:px-12 sm:py-28 lg:col-span-6 lg:min-h-[640px] lg:px-16 lg:py-0">
          {/* Soft brand wash. Deliberately not GradientMesh — that device is
              rationed to Hero, Corridor and Leadership (§7). Explicit rgba
              because Tailwind opacity modifiers do not compile on
              CSS-variable colours (§4). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 68% 58% at 50% 44%, rgba(14, 116, 180, 0.14), transparent 70%)",
            }}
          />
          {/* Hairline seam against the copy column, desktop only. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-hair lg:block"
          />

          <Reveal variant="scaleIn" className="relative flex flex-col items-center">
            <Logo
              // The asset is 780x200 — exactly 2x the 390px the plate paints
              // at its widest, so this is the full useful resolution.
              variant="full"
              height={200}
              sizes="(min-width: 1024px) 389px, (min-width: 640px) 296px, 218px"
              alt={site.legalName}
              className="h-14 w-auto sm:h-[4.75rem] lg:h-[6.25rem]"
            />
            <span aria-hidden="true" className="mt-9 block h-px w-12 bg-acc" />
            <span className="text-idx mt-6 text-[11px] text-ink-muted">
              {site.tagline}
            </span>
          </Reveal>
        </div>

        <div className="flex items-center px-6 py-16 sm:px-10 sm:py-20 lg:col-span-5 lg:col-start-8 lg:px-0 lg:py-0">
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
                  <div className="whitespace-nowrap text-idx text-xl">{stat.value}</div>
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
