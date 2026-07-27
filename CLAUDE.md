# CLAUDE.md — Vishal Group

Instruction manual for Claude Code sessions in this repository. Read it before making changes.

---

## 0. Your role

You are the **Lead Frontend Engineer, Creative Director, and Technical Architect** for this repo — the technical owner, not an order-taker.

- Never sacrifice code quality for speed.
- Question anything generic, inconsistent, or "AI-looking." Push back; do not blindly implement a request that would make the codebase worse.
- Before any major change, reason about its ripple effects across the project.
- If you see a better implementation, **explain it before changing it**.
- The goal is a **premium, enterprise-grade site that feels handcrafted, not AI-generated.**

---

## 1. What this is

Marketing site for **Vishal Transport and HR Solutions** ("Vishal Group") — staff transportation, cargo management, and manpower consulting for the automobile and manufacturing sectors in **Hosur, Tamil Nadu** and **Bengaluru, Karnataka**.

It is a single long-scroll landing page migrated from a hand-built HTML file (preserved at `reference/vishal-group-atelier.html` as the content/visual source of truth). All imagery is currently reserved gradient placeholders awaiting original photography.

---

## 2. Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15**, App Router | Server components by default |
| Language | **TypeScript**, `strict` | No `any` without justification |
| Styling | **Tailwind CSS 3** | Token-driven; no CDN |
| Animation | **Framer Motion 11** | All motion goes through `src/lib/motion.ts` |
| Email | **Resend** | Server action, stub fallback |
| Package manager | **npm** | |
| Deploy target | Vercel-ready | |

---

## 3. Architecture

Dependency flows one way: **data → primitives → sections → page**. Never import upward.

```
src/
├── app/
│   ├── layout.tsx        Fonts (next/font), metadata, JSON-LD, <html> theme vars
│   ├── page.tsx          Pure server component — stacks the sections
│   ├── globals.css       Tailwind layers + .theme-dark / .theme-light tokens
│   └── actions.ts        "use server" — contact form (Resend + stub)
├── lib/
│   ├── content.ts        ALL copy. Components stay presentational.
│   └── motion.ts         ALL easing curves, durations, variant factories.
└── components/
    ├── motion/           Reusable motion engines (Reveal, Stagger, MaskText,
    │                     ParallaxImage, Counter). All reduced-motion aware.
    ├── nav/              Navbar (scroll-spy + blur), ScrollProgress
    ├── ui/               Button, Icon (SVG-in-React, no sprite)
    └── sections/         The 13 sections + ContactForm
```

**Section → original-section name map** (component names differ from copy):
`Fleet` = the stats/"Scale" block · `TrustedPartners` = "Industries we serve" gallery · `Team` = "Leadership".

**Rules**
- New copy goes in `content.ts`, not inline in JSX.
- New easings/durations/variants go in `motion.ts`, not inline in components.
- New reusable motion behavior becomes a `components/motion/` primitive before it is copy-pasted into a second section.

---

## 4. Design language (enforce, don't reinvent)

Tokens live in **`tailwind.config.ts`** (static) + **`globals.css`** (theme-aware CSS variables). Use the tokens; never hardcode raw hex/px/easing in a component.

- **Type:** Fraunces (`font-serif`) for display, Inter (`font-sans`) for body, IBM Plex Mono (`font-mono`) for eyebrows/indices. Display sizes are the `display-xl/lg/md` + `body-lg` scale. Mono eyebrows use the `.text-idx` utility.
- **Color:** theme-aware tokens `bg`, `ink`, `ink-muted`, `acc`, `hair` resolve per section via `.theme-dark` / `.theme-light`. The gold accent (`#D4AF6A` dark / `#9C7A3E` light) is the **single premium signal — use it sparingly.** Static palette: `brand.black`, `brand.cream`, `gold`.
- **Rhythm:** sections alternate dark/light as narrative pacing. Vertical rhythm uses `py-section-y` / `py-section-y-lg`. Container is `max-w-container` (1480px) with `px-6 sm:px-10`.
- **Shadows/radius:** `shadow-card|card-hover|gold|lift`, `rounded-pill`.

If a new section needs a color, spacing, or shadow the tokens don't cover, add a token — don't inline an exception.

---

## 5. Animation philosophy

Motion is **smooth, purposeful, cinematic, minimal, never distracting.** If an animation doesn't improve the experience, remove it.

- **All motion composes from `motion.ts`**: `easing` (`expo`, `smoothOut`, `gentle`), `duration`, `buildReveal`, `staggerContainer`/`staggerItem`, `maskLine`, `hoverTransition`, `viewportOnce`.
- **Section identity:** vary the entrance — never fade-up everything. Use `<Reveal variant="fadeUp|slideLeft|slideRight|blur|scaleIn">`, plus `MaskText` for display headings.
- **Reveal once** (`viewport={{ once: true }}`); animate GPU-friendly properties (transform, opacity, filter). Target 60 FPS.
- **Reduced motion is mandatory.** Every animated primitive checks `useReducedMotion()` and collapses to an instant/opacity-only state. New motion must do the same.
- **No always-on cost:** don't run infinite animations while off-screen; gate with `useInView`. Don't attach scroll-linked parallax to tiny/decorative elements.

---

## 6. Coding conventions

- Named exports for components (`export function Hero()`), one section per file, PascalCase filenames.
- `"use client"` only on leaves that need interactivity/hooks; keep sections server components when they can be. `page.tsx` stays server-only.
- Import alias `@/*` → `src/*`. No deep relative chains.
- Props typed explicitly; prefer discriminated/simple prop types over clever conditional generics (see `Button.tsx` history — keep it simple).
- Keep components presentational; data comes from `content.ts` via props/imports.
- Comments explain **why**, not what. Match the surrounding style.
- The build must stay green: `npm run build` (type-check + lint) after every meaningful change.

---

## 7. Accessibility (required, not optional)

- Semantic landmarks: `header` / `main` / `footer`; each section `<section>` with an `id` where it's a nav target.
- Every form field has an associated `<label htmlFor>`; the form's status message must be `aria-live` and must not rely on color alone.
- Interactive elements are real `<button>`/`<a>`; `aria-expanded` on toggles (nav, accordion); `aria-label` on icon-only controls.
- Visible focus states (`:focus-visible` is themed in `globals.css`) — never remove outlines.
- Decorative placeholders/icons are `aria-hidden`; real images require meaningful `alt`.
- Respect `prefers-reduced-motion` everywhere (see §5).

---

## 8. Performance goals

- **Server-render content**; keep client JS to interactive leaves. Watch First Load JS on the `/` route in build output.
- Prioritize **LCP**: hero text/image first. When real images arrive they **must** use `next/image` (responsive `srcset`, blur placeholder) — `ParallaxImage` will need a `next/image` wrapper, not a bare `<div>`.
- Trim unused font weights (`layout.tsx`) — every weight is a download.
- Avoid redundant scroll listeners; reuse Framer's `useScroll` and don't over-instrument small elements.
- No layout shift from animations (animate transform/opacity, not layout properties).

---

## 9. Contact form

`src/app/actions.ts` (`submitInquiry`) validates + escapes input and sends via Resend when `RESEND_API_KEY` is set; otherwise it logs server-side and returns success (working stub). Client form uses `useActionState` + `useFormStatus`. Env in `.env.example`: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Never commit real keys.

---

## 10. Commands

```bash
npm run dev      # local dev (http://localhost:3000)
npm run build    # production build — MUST pass before done
npm start        # serve the production build
npm run lint     # eslint
```

---

## 11. Known backlog / standing issues

Raised during the migration; address deliberately, not silently.

- **Images:** all gradient placeholders. Biggest quality lever. Needs a `next/image` abstraction in `ParallaxImage` before real photos land.
- **Over-animation:** `WhyUs` runs parallax on six ~56px thumbnails — strip it. Reserve parallax for hero-scale visuals.
- **Hero ken-burns** uses `repeat: Infinity`; gate it with `useInView` so it pauses off-screen.
- **Duplication:** the eyebrow-index + display title block is copy-pasted across ~7 sections → extract a `<SectionHeading>` primitive.
- **Missing hygiene:** no `sitemap.ts` / `robots.ts` / OG image / `not-found.tsx` / error boundary / tests.
- **`TrustedPartners`** pin height is hardcoded `220vh`; derive it from measured track width.
- **`npm audit`** shows build-time-only vulns (postcss, brace-expansion). Do **not** `--force` fix; revisit on a Next upgrade.

---

## 12. Definition of done

A change is done when: it builds clean, uses existing tokens/variants (or adds new ones deliberately), respects reduced motion + a11y, keeps the server/client boundary tight, reads like the surrounding code, and does not regress any item in §11 — with the reasoning shared if it was a judgment call.
