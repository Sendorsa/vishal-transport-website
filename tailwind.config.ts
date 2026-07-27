import type { Config } from "tailwindcss";

/**
 * Centralized design system.
 *
 * Two token layers:
 *  1. Static brand palette (`brand`, `gold`) — fixed hex values.
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
        // Static brand palette
        brand: {
          black: "#0B0B0C",
          cream: "#F7F5F0",
        },
        gold: {
          DEFAULT: "#D4AF6A",
          dark: "#9C7A3E",
        },
        // Theme-aware tokens (driven by CSS variables)
        bg: "var(--bg)",
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-2)",
        },
        acc: "var(--acc)",
        hair: "var(--hair)",
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
        gold: "0 14px 32px -12px rgba(212,175,106,0.55)",
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
      },
      animation: {
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
