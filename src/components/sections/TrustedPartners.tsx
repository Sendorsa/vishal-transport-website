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

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function GalleryCard({ card }: { card: (typeof partners.cards)[number] }) {
  return (
    <div className="relative h-[62vh] w-[86vw] shrink-0 sm:w-[560px] lg:h-[70vh]">
      <ParallaxImage className="h-full w-full" parallax={16} zoom={0.06}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute bottom-7 left-7 font-serif text-2xl font-light text-white">
          {card.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
          <span className="text-idx block text-[10px] opacity-70">{card.tag}</span>
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
        setMaxTranslate(
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 80),
        );
      } else {
        setMaxTranslate(0);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduced]);

  return (
    <section id="industries" className="theme-light relative">
      <div className="mx-auto max-w-container px-6 pt-24 sm:px-10 lg:pt-28">
        <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
          {partners.index}
        </Reveal>
        <Reveal variant="fadeUp" delay={0.08} as="h2" className="mt-7 font-serif text-display-lg font-light">
          {partners.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </Reveal>
      </div>

      <div
        ref={outerRef}
        className="relative mt-14 lg:mt-20"
        style={pinned ? { height: "220vh" } : undefined}
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
