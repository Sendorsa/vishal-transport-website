"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { hoverTransition } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useMediaQuery";
import { photos, type PhotoKey } from "@/lib/photos";

type ParallaxImageProps = {
  className?: string;
  /** Vertical parallax travel in px (subtle by default). */
  parallax?: number;
  /** Extra zoom applied across the scroll (e.g. 0.08 = up to +8%). */
  zoom?: number;
  /** Gentle scale on hover. Set 0 to disable (e.g. background layers). */
  hover?: number;
  /** Overlay/label children rendered above the image layer. */
  children?: React.ReactNode;
  /** Reveal the placeholder tint once in view. */
  reveal?: boolean;
  /** Key into the photo manifest. Omit to keep the reserved placeholder. */
  photo?: PhotoKey;
  /** Responsive `sizes` hint — required whenever `photo` is set. */
  sizes?: string;
  /** Crop anchor, e.g. "50% 35%" to hold a horizon or a line of faces. */
  position?: string;
  /** Opt this image into eager loading (above-the-fold slots only). */
  priority?: boolean;
  /** Override the manifest alt — use when context makes a shorter one better. */
  alt?: string;
};

/**
 * Image block with three coordinated motions:
 *  • slight scroll parallax   • slow scroll zoom   • gentle hover scale
 * Renders real photography via next/image when `photo` is supplied, and falls
 * back to the reserved gradient placeholder for slots still awaiting a shot.
 * All motion collapses to a static block under prefers-reduced-motion.
 */
export function ParallaxImage({
  className = "",
  parallax = 24,
  zoom = 0.08,
  hover = 1.03,
  children,
  reveal = true,
  photo,
  sizes = "100vw",
  position = "50% 50%",
  priority = false,
  alt,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  // Scroll parallax/zoom is a desktop-only refinement — on touch it costs
  // frames for motion that reads as jitter. Mobile keeps the calm reveal only.
  const enableScrollMotion = isDesktop && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + zoom]);

  const asset = photo ? photos[photo] : null;

  return (
    <div ref={ref} className={`ph ph-grain ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={enableScrollMotion ? { y, scale } : undefined}
      >
        <motion.div
          className="ph-image relative h-full w-full"
          whileHover={reduced || hover === 0 ? undefined : { scale: hover }}
          transition={hoverTransition}
          initial={reveal && !reduced ? { opacity: 0, scale: 1.04 } : false}
          whileInView={reveal && !reduced ? { opacity: 1, scale: 1 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
        >
          {asset ? (
            <Image
              src={asset.src}
              alt={alt ?? asset.alt}
              fill
              sizes={sizes}
              placeholder="blur"
              blurDataURL={asset.blurDataURL}
              priority={priority}
              className="object-cover"
              style={{ objectPosition: position }}
            />
          ) : null}
        </motion.div>
      </motion.div>
      <div className="ph-vignette" />
      {children}
    </div>
  );
}
