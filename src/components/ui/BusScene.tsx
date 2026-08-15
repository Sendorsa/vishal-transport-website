"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easing } from "@/lib/motion";

/**
 * The hero's signature motion — a staff coach at speed, shot side-on.
 *
 * The camera tracks the vehicle rather than watching it cross an empty frame:
 * the bus holds its position and the world scrolls past it. That is what makes
 * road movement, layered parallax and suspension travel possible at all, and it
 * removes the dead interval the drive-across version had while the bus was
 * off-frame. Everything still moves at constant linear speed (§8) — eased
 * motion on a vehicle reads as toy-like.
 *
 * Gated by useInView + prefers-reduced-motion; reduced motion collapses to a
 * still illustration with no wheel spin, bob or scroll.
 */

/* ---------- Scene physics ----------
   SPEED is the one number that matters: how fast the world moves past the
   camera, in CSS px/second at desktop scale. Layer durations and wheel rotation
   are *derived* from it, so the road, the parallax layers and the wheels cannot
   drift out of agreement when the speed is retuned. These are scene geometry
   (px, px/s), not shared motion vocabulary, so they stay local to this file
   rather than moving into motion.ts. */
const SPEED = 230;

/** Depth multipliers — further away moves slower. */
const PARALLAX = { far: 0.26, road: 1, fore: 1.65 } as const;

/** Repeat length of each layer's pattern, px. Translating a layer by exactly
    one pitch loops seamlessly, so each layer only needs to overhang by that. */
const PITCH = { far: 240, road: 140, fore: 96 } as const;

/* ---------- Vehicle geometry (viewBox units, 40 units = 1 metre) ----------
   Sized off a real 12 m staff coach: 478 units long x 138 tall to the roof
   = 3.46:1. The previous silhouette was 5.1:1, which is why it read as a tram.
   Wheelbase 240 (6.0 m), front overhang 106 (2.65 m), rear overhang 132 (3.3 m). */
const VIEW_W = 540;
const VIEW_H = 178;
const GROUND_Y = 174;
const WHEEL_R = 21;
const AXLE_Y = 151;
const AXLE_FRONT = 394;
const AXLE_REAR = 154;
/** Rendered bus width at `lg`. Doubles as the reference width the measured
    scene scale is expressed against, so SPEED is "px/s at full size". */
const BUS_CSS_W = 410;
const WHEEL_CIRCUMFERENCE = 2 * Math.PI * (WHEEL_R / VIEW_W) * BUS_CSS_W;

/* Body silhouette. Read it as: up the rear face, along the roof, down the raked
   windscreen to the bumper, then back along the underside — cutting a wheel arch
   over each axle. The arches are what separate a bus from a tram: a tram skirts
   its bogies, a bus shows arch and ground clearance. */
const BODY_PATH = `
  M 22 148
  L 22 50
  Q 22 34 40 34
  L 442 34
  Q 462 34 470 49
  L 492 94
  Q 500 110 500 122
  L 500 148
  L 424 148
  A 30 26 0 0 0 364 148
  L 184 148
  A 30 26 0 0 0 124 148
  L 22 148
  Z
`;

const ARCH_FRONT = "M 424 148 A 30 26 0 0 0 364 148";
const ARCH_REAR = "M 184 148 A 30 26 0 0 0 124 148";

/** Six pillar-separated side windows. The 12-unit (0.3 m) pillars between them
    are deliberate — a continuous glazed band with hairline dividers is the
    single strongest "metro coach" cue there is. */
const WINDOWS = [40, 104, 168, 232, 296, 360];

/* Illustration-local palette. The design tokens describe UI surfaces, not
   vehicle paint — a bus needs material tones (glass, tyre, rim) the same way a
   photograph would. Brand colour still comes from --acc. These are tuned against
   the hero's navy, the only place this component renders. */
const paint = {
  bodyTop: "#FFFFFF",
  bodyLow: "#CBD5E5",
  skirt: "#A7B3C9",
  trim: "#7E8DA8",
  glass: "#26375F",
  glassEdge: "#46608F",
  tyre: "#0D1522",
  rim: "#BFC9D9",
  spoke: "#8593AB",
  hub: "#5E6C84",
  lamp: "#FFF6E2",
  tail: "#C9493A",
};

function Wheel({
  cx,
  spin,
  duration,
}: {
  cx: number;
  spin: boolean;
  duration: number;
}) {
  return (
    <g transform={`translate(${cx} ${AXLE_Y})`}>
      <ellipse cx="0" cy={GROUND_Y - AXLE_Y} rx="23" ry="3" fill="#000" opacity="0.4" />
      <circle r={WHEEL_R} fill={paint.tyre} />
      {/* transform-box: fill-box pins rotation to the wheel's own centre —
          SVG's default view-box origin would swing it around the whole scene. */}
      <g
        className="animate-wheel-spin"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animationDuration: `${duration}s`,
          animationPlayState: spin ? "running" : "paused",
        }}
      >
        <circle r="12.5" fill={paint.rim} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x="-1.9"
            y="-11.4"
            width="3.8"
            height="7.6"
            rx="1.9"
            fill={paint.spoke}
            transform={`rotate(${i * 72})`}
          />
        ))}
        <circle r="4" fill={paint.hub} />
      </g>
      <circle r={WHEEL_R} fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="1.5" />
    </g>
  );
}

function Bus({ run, wheelDuration }: { run: boolean; wheelDuration: number }) {
  // useId() emits colons, which are invalid inside url(#...) references.
  const uid = useId().replace(/:/g, "");
  const bodyGrad = `bus-body-${uid}`;
  const glassGrad = `bus-glass-${uid}`;
  const lampGlow = `bus-lamp-${uid}`;
  const clip = `bus-clip-${uid}`;

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id={bodyGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={paint.bodyTop} />
          <stop offset="0.62" stopColor={paint.bodyTop} />
          <stop offset="1" stopColor={paint.bodyLow} />
        </linearGradient>
        <linearGradient id={glassGrad} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor={paint.glassEdge} />
          <stop offset="0.45" stopColor={paint.glass} />
        </linearGradient>
        <radialGradient id={lampGlow}>
          <stop offset="0" stopColor={paint.lamp} stopOpacity="0.5" />
          <stop offset="1" stopColor={paint.lamp} stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <path d={BODY_PATH} />
        </clipPath>
      </defs>

      {/* Ground shadow — sits under everything, does not travel with the body */}
      <ellipse cx="261" cy={GROUND_Y} rx="243" ry="6" fill="#000" opacity="0.28" />

      {/* Wheels stay planted on the road — only the sprung mass above them
          moves, so the arches ride over the tyres exactly as real travel does */}
      <Wheel cx={AXLE_REAR} spin={run} duration={wheelDuration} />
      <Wheel cx={AXLE_FRONT} spin={run} duration={wheelDuration} />

      <g
        className="animate-bus-bob"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animationPlayState: run ? "running" : "paused",
        }}
      >
        <BusBody clip={clip} bodyGrad={bodyGrad} glassGrad={glassGrad} lampGlow={lampGlow} />
      </g>
    </svg>
  );
}

function BusBody({
  clip,
  bodyGrad,
  glassGrad,
  lampGlow,
}: {
  clip: string;
  bodyGrad: string;
  glassGrad: string;
  lampGlow: string;
}) {
  return (
    <>
      {/* Headlamp wash — outside the clip so it spills forward off the nose */}
      <circle cx="503" cy="130" r="22" fill={`url(#${lampGlow})`} />

      {/* Roof-mounted AC pod — a flat roof is a tram roof; the pod is a
          near-universal cue on Indian corporate staff coaches. Drawn before the
          body so the roof overlaps its base and it reads as moulded into the
          shell rather than a slab parked on top. */}
      <rect x="156" y="25" width="200" height="13" rx="5" fill={paint.bodyTop} />
      <rect x="156" y="31" width="200" height="7" rx="3" fill={paint.bodyLow} opacity="0.55" />

      <path d={BODY_PATH} fill={`url(#${bodyGrad})`} />

      <g clipPath={`url(#${clip})`}>
        {/* Lower body / skirt panel — gives the flank depth instead of one flat slab */}
        <rect x="22" y="126" width="478" height="22" fill={paint.skirt} opacity="0.55" />

        {/* Side glazing. Tight corner radius on purpose — a generous rx reads as
            an app icon, not a bonded coach window. */}
        {WINDOWS.map((x) => (
          <rect key={x} x={x} y="52" width="52" height="48" rx="3" fill={`url(#${glassGrad})`} />
        ))}

        {/* Front entry door, ahead of the front axle — rear-engine coach layout */}
        <rect x="424" y="46" width="34" height="100" rx="3" fill={paint.glass} />
        <rect x="427" y="51" width="28" height="50" rx="2.5" fill={`url(#${glassGrad})`} />
        <rect x="427" y="106" width="28" height="34" rx="2" fill={paint.bodyLow} opacity="0.5" />

        {/* Windscreen — edge-on in side elevation, so a narrow raked wedge */}
        <path
          d="M 462 52 Q 470 52 474 60 L 490 96 L 462 96 Z"
          fill={`url(#${glassGrad})`}
        />

        {/* Livery belt line — the one place brand colour lands on the vehicle */}
        <rect x="22" y="104" width="478" height="5" fill="var(--acc)" />

        {/* Rear engine louvres */}
        {[110, 116, 122].map((y) => (
          <rect key={y} x="34" y={y} width="54" height="2.5" rx="1.25" fill={paint.trim} opacity="0.75" />
        ))}
        <rect x="24" y="110" width="7" height="18" rx="2" fill={paint.tail} opacity="0.9" />

        {/* Headlamp cluster */}
        <rect x="486" y="124" width="14" height="11" rx="3.5" fill={paint.lamp} />
      </g>

      {/* Arch trim sits on the clip boundary, so it draws outside the clip */}
      <path d={ARCH_FRONT} fill="none" stroke={paint.trim} strokeWidth="2" />
      <path d={ARCH_REAR} fill="none" stroke={paint.trim} strokeWidth="2" />

      {/* Wing mirror — projects past the nose, a silhouette cue no train has.
          Kept small and close to the A-pillar; any larger and it reads as a flag. */}
      <path d="M 486 61 L 499 56" stroke={paint.trim} strokeWidth="2" strokeLinecap="round" />
      <rect x="496" y="49" width="6" height="15" rx="2.5" fill={paint.trim} />
    </>
  );
}

/** One infinitely scrolling background layer. The pattern is drawn with CSS
    gradients rather than tiled elements, so the whole parallax costs four DOM
    nodes instead of a few hundred. */
function ScrollLayer({
  pitch,
  duration,
  run,
  className,
  style,
}: {
  pitch: number;
  duration: number;
  run: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-scene-pan absolute left-0 ${className ?? ""}`}
      style={
        {
          "--pan": `${pitch}px`,
          width: `calc(100% + ${pitch}px)`,
          animationDuration: `${duration}s`,
          animationPlayState: run ? "running" : "paused",
          ...style,
        } as React.CSSProperties
      }
    />
  );
}

export function BusScene() {
  const ref = useRef<HTMLDivElement>(null);
  const busRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const reduced = useReducedMotion() ?? false;
  const run = inView && !reduced;

  /* The bus is sized in CSS, so measure it rather than duplicating the
     breakpoints here. Everything else is expressed relative to that one
     number, which makes the scene a true uniform scale of itself at any
     width — including the fluid sizes between breakpoints. */
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = busRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setScale(w / BUS_CSS_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const world = SPEED * scale;
  const dur = {
    far: PITCH.far / (world * PARALLAX.far),
    road: PITCH.road / (world * PARALLAX.road),
    fore: PITCH.fore / (world * PARALLAX.fore),
  };
  /* Deliberately NOT scaled: the wheel's circumference shrinks by `scale` and
     the ground speed shrinks by `scale`, so the two cancel and one revolution
     always takes the same time. Scaling this as well was double-counting, and
     made the wheels visibly under-rotate for the distance covered on phones. */
  const wheelDuration = WHEEL_CIRCUMFERENCE / SPEED;

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none relative h-[20vh] max-h-[212px] min-h-[132px] w-full overflow-hidden"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? 0 : 1.2,
        // Lands after the CTA so the reading order stays headline → body → CTA → scene.
        delay: reduced ? 0 : 1.05,
        ease: easing.smoothOut,
      }}
    >
      {/* Environment. Masked at both edges so the repeating patterns dissolve
          instead of hard-cutting at the viewport. */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        }}
      >
        {/* Far roadside markers — two pole rhythms in one element */}
        <ScrollLayer
          pitch={PITCH.far}
          duration={dur.far}
          run={run}
          className="bottom-[20%] h-[36%] opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, var(--ink-2) 0 3px, transparent 3px), linear-gradient(to right, var(--ink-2) 0 2px, transparent 2px)`,
            backgroundSize: `${PITCH.far}px 100%, ${PITCH.far}px 58%`,
            backgroundPosition: "0 bottom, 118px bottom",
            backgroundRepeat: "repeat-x, repeat-x",
          }}
        />

        {/* Road plane */}
        <div
          className="absolute inset-x-0 bottom-0 h-[20%]"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0))",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-[20%] h-px"
          style={{ background: "var(--hair)" }}
        />

        {/* Lane markings */}
        <ScrollLayer
          pitch={PITCH.road}
          duration={dur.road}
          run={run}
          className="bottom-[11%] h-[3px] opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, var(--ink-2) 0 64px, transparent 64px)`,
            backgroundSize: `${PITCH.road}px 100%`,
            backgroundRepeat: "repeat-x",
          }}
        />

        {/* Foreground rush — nearest, fastest, slightly blurred to suggest the
            motion smear a real camera would pick up at this distance. */}
        <ScrollLayer
          pitch={PITCH.fore}
          duration={dur.fore}
          run={run}
          className="bottom-[3%] h-[9px] opacity-25"
          style={{
            backgroundImage: `linear-gradient(to right, var(--ink-2) 0 46px, transparent 46px), linear-gradient(to right, var(--ink-2) 0 26px, transparent 26px)`,
            backgroundSize: `${PITCH.fore}px 2px, ${PITCH.fore}px 2px`,
            backgroundPosition: "0 0, 52px 7px",
            backgroundRepeat: "repeat-x, repeat-x",
          }}
        />
      </div>

      {/* Vehicle. `translate-y-[2.25%]` of its own height drops the wheels'
          contact point exactly onto the 20% road line, at any rendered width.
          Suspension lives inside the SVG so it can move the body without the
          wheels — and so Framer's inline transform never fights this one. */}
      <div
        ref={busRef}
        className="absolute bottom-[20%] left-[6%] w-[248px] translate-y-[2.25%] sm:left-[10%] sm:w-[330px] lg:left-[13%] lg:w-[410px]"
      >
        <Bus run={run} wheelDuration={wheelDuration} />
      </div>
    </motion.div>
  );
}
