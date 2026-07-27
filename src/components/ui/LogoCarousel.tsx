import type { ReactNode } from "react";

export type Logo = {
  /** Company name — used for alt text / SR label once real logos land. */
  name: string;
  /** Real logo image (preferred when available). */
  src?: string;
  /** Placeholder vector mark, used until a real `src` is supplied. */
  mark?: ReactNode;
};

/* ---------------------------------------------------------------
   Reserved placeholder marks — abstract, monochrome, equal-weight.
   Swap for real client logos by passing `logos` with `src` set.
   Intentionally nameless so we never imply a client we don't have.
   --------------------------------------------------------------- */
const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;
const placeholderMarks: ReactNode[] = [
  <>
    <circle cx="18" cy="24" r="9" {...s} />
    <circle cx="32" cy="24" r="9" {...s} />
  </>,
  <>
    <path d="M24 7l14 8v18l-14 8-14-8V15z" {...s} strokeLinejoin="round" />
    <circle cx="24" cy="24" r="5" {...s} />
  </>,
  <>
    <path d="M10 30a14 14 0 0 1 28 0" {...s} strokeLinecap="round" />
    <path d="M16 30a8 8 0 0 1 16 0" {...s} strokeLinecap="round" />
    <circle cx="24" cy="30" r="1.6" fill="currentColor" stroke="none" />
  </>,
  <>
    <path d="M14 14l10 8-10 8M24 14l10 8-10 8" {...s} strokeLinecap="round" strokeLinejoin="round" />
  </>,
  <>
    {[14, 24, 34].map((cx) =>
      [14, 24, 34].map((cy) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="currentColor" stroke="none" />
      )),
    )}
  </>,
  <>
    <path d="M24 9l15 26H9z" {...s} strokeLinejoin="round" />
    <circle cx="24" cy="27" r="5" {...s} />
  </>,
  <>
    <rect x="10" y="10" width="28" height="28" rx="7" {...s} />
    <path d="M16 32L32 16" {...s} strokeLinecap="round" />
  </>,
  <>
    <path d="M8 20c6 0 6 8 12 8s6-8 12-8 6 8 8 8" {...s} strokeLinecap="round" />
    <path d="M8 28c6 0 6-8 12-8s6 8 12 8 6-8 8-8" {...s} strokeLinecap="round" opacity="0.5" />
  </>,
];

export const placeholderLogos: Logo[] = placeholderMarks.map((mark, i) => ({
  name: `Partner ${i + 1}`,
  mark,
}));

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <li className="flex shrink-0 items-center">
      {logo.src ? (
        // Real logo path: grayscale + muted, resolves to full colour on hover.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.src}
          alt={logo.name}
          className="h-9 w-auto object-contain opacity-60 grayscale transition-all duration-500 ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0 sm:h-10"
        />
      ) : (
        <span className="block h-9 text-ink-muted opacity-50 transition-all duration-500 ease-out hover:scale-105 hover:text-acc hover:opacity-100 sm:h-10">
          <svg viewBox="0 0 48 48" className="h-full w-auto" aria-hidden="true">
            {logo.mark}
          </svg>
        </span>
      )}
    </li>
  );
}

/**
 * Infinite, slow, seamless logo marquee.
 *  • Two identical copies of the set → -50% translate loops with no jump.
 *  • Pauses on hover (whole track), so per-logo hover is usable.
 *  • Edge fade masks instead of borders. Respects reduced motion.
 */
export function LogoCarousel({ logos }: { logos: Logo[] }) {
  return (
    <div
      className="group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      role="img"
      aria-label="Logos of the manufacturers and industrial organisations Vishal Group serves"
    >
      <ul
        className="flex w-max animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-24 sm:pr-24"
        aria-hidden="true"
      >
        {[...logos, ...logos].map((logo, i) => (
          <LogoItem key={i} logo={logo} />
        ))}
      </ul>
    </div>
  );
}
