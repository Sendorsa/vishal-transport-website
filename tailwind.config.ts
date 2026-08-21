import type { Config } from "tailwindcss";

/**
 * Centralized design system.
 *
 * Two token layers:
 *  1. Static brand palette (`brand`, `blue`, `neutral`) — fixed hex values.
 *  2. Theme-aware tokens (`bg`, `ink`, `ink-2`, `acc`, `hair`) — resolve to the
 *     CSS custom properties set by `.theme-dark` / `.theme-light` in globals.css,
 *     so the same utility (e.g. `text-ink`) adapts per section.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Static brand palette — sampled directly from the Vishal Group logo
        brand: {
          navy: "#1F3265",
        },
        blue: {
          DEFAULT: "#0E74B4",
          dark: "#0B5C8E",
        },
        neutral: {
          white: "#FFFFFF",
          line: "#E4E2DC",
          mid: "#63666C",
          ink: "#14161B",
        },
        // Theme-aware tokens (driven by CSS variables)
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-2)",
        },
        acc: "var(--acc)",
        hair: "var(--hair)",
        danger: "var(--danger)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 8vw, 7.5rem)", { lineHeight: "1.0", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.2rem, 5.6vw, 4.6rem)", { lineHeight: "1.04", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.8rem, 3.4vw, 2.8rem)", { lineHeight: "1.12" }],
        // Fluid body: ~17px on phones, 19px from tablet up (desktop unchanged).
        "body-lg": ["clamp(16.5px, 0.6vw + 15px, 19px)", { lineHeight: "1.7" }],
      },
      letterSpacing: {
        idx: "0.14em",
      },
      maxWidth: {
        container: "1480px",
      },
      spacing: {
        // Vertical rhythm tokens for section padding
        "section-y": "6rem", // 96px  — mobile
        "section-y-lg": "9rem", // 144px — desktop
      },
      borderRadius: {
        pill: "999px",
      },
      boxShadow: {
        card: "0 8px 24px -14px rgba(0,0,0,0.35)",
        "card-hover": "0 22px 48px -20px rgba(0,0,0,0.45)",
        blue: "0 14px 32px -12px rgba(14,116,180,0.45)",
        lift: "0 18px 40px -18px rgba(0,0,0,0.5)",
      },
      transitionTimingFunction: {
        // Modern easing curves shared across the motion system
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
        "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "4/5": "4 / 5",
        map: "1200 / 380",
      },
      keyframes: {
        // Seamless logo marquee — track holds two identical copies,
        // so translating by -50% loops with no visible jump.
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },

        /* --- Hero bus scene (see components/ui/BusScene.tsx) ---
           These loops run forever, so they are CSS rather than Framer: the
           compositor drives them off the main thread, which is what §11 asks
           for. Each one reads its distance/duration from the element, so the
           scene stays governed by the single SPEED constant in BusScene. */

        /* One wheel revolution. Pair with transform-box:fill-box so it turns
           about the wheel's own centre, not the SVG viewBox origin. */
        "wheel-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },

        /* Suspension travel for the sprung mass only — the wheels stay planted.
           Deliberately irregular: an even sine reads mechanical, this reads as
           road input. Lengths are SVG user units, not screen px. */
        "bus-bob": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "24%": { transform: "translateY(-1.6px) rotate(-0.14deg)" },
          "52%": { transform: "translateY(0.5px) rotate(0.09deg)" },
          "76%": { transform: "translateY(-1.1px) rotate(-0.05deg)" },
        },

        /* Ground/parallax layers. Each element is one --pan wider than its
           container and shifts by exactly --pan, so the repeating gradient
           inside it loops with no visible seam. */
        "scene-pan": {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(calc(var(--pan) * -1), 0, 0)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        // Durations here are placeholders — BusScene overrides each one inline
        // so every layer stays derived from its SPEED constant.
        "wheel-spin": "wheel-spin 1s linear infinite",
        "bus-bob": "bus-bob 2.1s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "scene-pan": "scene-pan 1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
