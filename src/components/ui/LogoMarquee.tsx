import Image from "next/image";
import { partnerLogos, type Partner } from "@/lib/content";

/**
 * Continuous, seamless partner logo band.
 *
 * Seam mechanics: the track holds two identical copies of the set and
 * translates -50%, so the loop point is invisible. The per-item spacing is
 * padding on the item itself rather than a flex `gap` — a `gap` is applied
 * *between* children only, which leaves the wrap-around joint one gap short
 * and produces a visible hitch once per cycle.
 *
 * The animation is CSS, not Framer: it runs forever, and a compositor-driven
 * transform keeps it off the main thread (§11).
 */

/** Rendered height (px) a full-scale logo occupies, per breakpoint. */
const BASE_H = { mobile: 26, desktop: 34 };

function LogoItem({ partner, hidden }: { partner: Partner; hidden?: boolean }) {
  const { logo, name } = partner;
  const ratio = logo.width / logo.height;

  // Two sizes, both derived from the same optical scale, so the pair stays
  // proportional and each reserves an exact box (no CLS).
  const h = { m: BASE_H.mobile * logo.scale, d: BASE_H.desktop * logo.scale };
  const w = { m: ratio * h.m, d: ratio * h.d };

  return (
    <li
      className={`group/logo flex shrink-0 items-center px-8 sm:px-12 ${hidden ? "motion-reduce:hidden" : ""}`}
      aria-hidden={hidden ? true : undefined}
    >
      <span
        className="block"
        style={
          {
            "--lw": `${w.m}px`,
            "--lh": `${h.m}px`,
            "--lw-d": `${w.d}px`,
            "--lh-d": `${h.d}px`,
          } as React.CSSProperties
        }
      >
        <Image
          src={logo.src}
          alt={hidden ? "" : name}
          width={Math.round(w.d * 2)}
          height={Math.round(h.d * 2)}
          sizes={`${Math.round(w.d)}px`}
          loading="lazy"
          className="logo-band-img object-contain opacity-90 grayscale transition-all duration-500 ease-out group-hover/logo:scale-110 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
        />
      </span>
    </li>
  );
}

export function LogoMarquee() {
  return (
    <div
      className="logo-band group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="img"
      aria-label="Logos of the industrial organisations Vishal Transport serves"
    >
      {/* Reduced motion: the band becomes a static centred wrap. `w-max` has to
          be overridden too — left in place it pins the track to its intrinsic
          width, so flex-wrap never wraps and all but the first two logos sit
          outside the clipped box, permanently invisible. */}
      <ul className="flex w-max animate-marquee items-center will-change-transform group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4 motion-reduce:will-change-auto">
        {partnerLogos.map((p) => (
          <LogoItem key={p.name} partner={p} />
        ))}
        {/* Second copy completes the -50% loop. Duplicated marks are hidden
            from assistive tech so the list is announced once. */}
        {partnerLogos.map((p) => (
          <LogoItem key={`dup-${p.name}`} partner={p} hidden />
        ))}
      </ul>
    </div>
  );
}
