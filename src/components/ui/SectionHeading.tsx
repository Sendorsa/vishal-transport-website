import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";

type SectionHeadingProps = {
  /** Mono eyebrow label, e.g. "05 — What We Do". */
  index: string;
  /** Heading lines, each rendered on its own line. */
  title: string[];
  /** Cinematic line-mask reveal instead of the plain fade-up (Trust, Team). */
  mask?: boolean;
  /** id for sections that reference the heading via aria-labelledby. */
  headingId?: string;
  /** "lg" (default) for standalone section titles; "md" for a heading paired with a portrait/long-form message (Team). */
  size?: "lg" | "md";
};

const sizeClass: Record<NonNullable<SectionHeadingProps["size"]>, string> = {
  lg: "mt-7 text-display-lg",
  md: "mt-5 text-display-md",
};

/** Eyebrow index + display heading — the block repeated at the top of every section. */
export function SectionHeading({
  index,
  title,
  mask = false,
  headingId,
  size = "lg",
}: SectionHeadingProps) {
  return (
    <>
      <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
        {index}
      </Reveal>
      {mask ? (
        <h2 id={headingId} className={`font-serif font-light ${sizeClass[size]}`}>
          <MaskText className="block" lines={title} />
        </h2>
      ) : (
        <Reveal
          variant="fadeUp"
          delay={0.08}
          as="h2"
          className={`font-serif font-light ${sizeClass[size]}`}
        >
          {title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </Reveal>
      )}
    </>
  );
}
