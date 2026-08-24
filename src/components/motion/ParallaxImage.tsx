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
import { useRevealArm } from "@/lib/useRevealArm";

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
/** Shared inner markup. Kept in one place so the two variants can never drift. */
function ImageLayer({
  reduced,
  hover,
  reveal,
  asset,
  sizes,
  position,
  priority,
  alt,
}: {
  reduced: boolean;
  hover: number;
  reveal: boolean;
  asset: (typeof photos)[PhotoKey] | null;
  sizes: string;
  position: string;
  priority: boolean;
  alt?: string;
}) {
  // Same rule as Reveal: only images still below the fold may start hidden,
  // so a photo is never blank waiting on hydration.
  const { ref, controls } = useRevealArm<HTMLDivElement>(reveal && !reduced);
  return (
    <motion.div
      ref={ref}
      className="ph-image relative h-full w-full"
      whileHover={reduced || hover === 0 ? undefined : { scale: hover }}
      transition={hoverTransition}
      variants={{
        hidden: { opacity: 0, scale: 1.04 },
        visible: { opacity: 1, scale: 1 },
      }}
      initial={false}
      animate={controls}
    >
      {asset ? (
        <Image
          src={asset.src}
          alt={alt ?? asset.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={asset.blurDataURL}
          // Eager site-wide. Some of these live in horizontally translated
          // tracks (the pinned gallery on desktop), where lazy loading never
          // fires at all; the rest must be decoded before the cover lifts so
          // nothing appears after it. See §11a.
          loading={priority ? undefined : "eager"}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      ) : null}
    </motion.div>
  );
}

/** Desktop-only: the single place that subscribes to scroll. */
function ParallaxImageMotion(props: ParallaxImageProps & { reduced: boolean }) {
  const {
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
    reduced,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + zoom]);
  const asset = photo ? photos[photo] : null;

  return (
    <div ref={ref} className={`ph ph-grain ${className}`}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <ImageLayer
          reduced={reduced}
          hover={hover}
          reveal={reveal}
          asset={asset}
          sizes={sizes}
          position={position}
          priority={priority}
          alt={alt}
        />
      </motion.div>
      <div className="ph-vignette" />
      {children}
    </div>
  );
}

/** Touch + reduced-motion: identical markup, no scroll subscription. */
function ParallaxImageStatic(props: ParallaxImageProps & { reduced: boolean }) {
  const {
    className = "",
    hover = 1.03,
    children,
    reveal = true,
    photo,
    sizes = "100vw",
    position = "50% 50%",
    priority = false,
    alt,
    reduced,
  } = props;
  const asset = photo ? photos[photo] : null;

  return (
    <div className={`ph ph-grain ${className}`}>
      <div className="absolute inset-0">
        <ImageLayer
          reduced={reduced}
          hover={hover}
          reveal={reveal}
          asset={asset}
          sizes={sizes}
          position={position}
          priority={priority}
          alt={alt}
        />
      </div>
      <div className="ph-vignette" />
      {children}
    </div>
  );
}

/**
 * Image block with three coordinated motions:
 *  • slight scroll parallax   • slow scroll zoom   • gentle hover scale
 *
 * The scroll-linked variant is a separate component so that touch devices and
 * reduced-motion users never call useScroll at all. Previously every instance
 * subscribed and measured on each scroll frame even though the transform was
 * discarded on mobile — eight wasted subscriptions per page load.
 */
export function ParallaxImage(props: ParallaxImageProps) {
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();

  return isDesktop && !reduced ? (
    <ParallaxImageMotion {...props} reduced={reduced} />
  ) : (
    <ParallaxImageStatic {...props} reduced={reduced} />
  );
}
