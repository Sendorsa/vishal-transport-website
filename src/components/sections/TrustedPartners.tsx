"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { partners } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Landscape, not portrait: every client-site photograph is a wide line of
// people and vehicles, and a tall crop cuts the ends off the group.
function GalleryCard({ card }: { card: (typeof partners.cards)[number] }) {
  return (
    <div className="relative h-[46vh] w-[86vw] shrink-0 sm:h-[52vh] sm:w-[720px] lg:h-[58vh]">
      <ParallaxImage
        className="h-full w-full"
        parallax={16}
        zoom={0.06}
        photo={card.photo}
        sizes="(min-width: 640px) 720px, 86vw"
        // Groups stand in the lower half of frame — hold them, not the sky.
        position="50% 60%"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute bottom-7 left-7 font-serif text-2xl font-light text-white">
          {card.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
          <span className="text-idx block text-[10px] opacity-80">{card.tag}</span>
        </span>
      </ParallaxImage>
    </div>
  );
}

export function TrustedPartners() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [pinHeight, setPinHeight] = useState(0);
  const [pinned, setPinned] = useState(false);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 });

  useIsoLayoutEffect(() => {
    const measure = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const enable = desktop && !reduced;
      setPinned(enable);
      if (enable && trackRef.current) {
        const distance = Math.max(
          0,
          trackRef.current.scrollWidth - window.innerWidth + 80,
        );
        setMaxTranslate(distance);
        // Vertical scroll budget for the horizontal pan — sized off the actual
        // track width instead of a fixed vh, so the pace stays consistent
        // whether the gallery is two cards or ten. Floor keeps a short track
        // from snapping past in an instant.
        setPinHeight(
          window.innerHeight +
            Math.max(distance * 1.2, window.innerHeight * 0.6),
        );
      } else {
        setMaxTranslate(0);
        setPinHeight(0);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduced]);

  return (
    <section id="industries" className="theme-light relative">
      <div className="mx-auto max-w-container px-6 pt-24 sm:px-10 lg:pt-28">
        <SectionHeading index={partners.index} title={partners.title} />
      </div>

      <div
        ref={outerRef}
        className="relative mt-14 lg:mt-20"
        style={pinned ? { height: pinHeight } : undefined}
      >
        <div
          className={
            pinned
              ? "sticky top-0 flex h-screen items-center overflow-hidden"
              : "overflow-hidden"
          }
        >
          {pinned ? (
            <motion.div ref={trackRef} className="flex gap-6 pl-6 will-change-transform sm:pl-10" style={{ x }}>
              {partners.cards.map((card, i) => (
                <GalleryCard key={i} card={card} />
              ))}
              <div className="w-[8vw] shrink-0" aria-hidden />
            </motion.div>
          ) : (
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 sm:px-10 [&>*]:snap-start"
            >
              {partners.cards.map((card, i) => (
                <GalleryCard key={i} card={card} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-container px-6 sm:px-10">
        <Reveal variant="fadeUp" as="p" className="mt-10 pb-20 text-xs text-ink-muted lg:pb-28">
          {partners.footnote}
        </Reveal>
      </div>
    </section>
  );
}
