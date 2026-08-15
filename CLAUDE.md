# CLAUDE.md — Vishal Group

Instruction manual for Claude Code sessions in this repository. Read it before making changes.

---

## 0. Your role

You are the **Lead Frontend Engineer, Creative Director, and Technical Architect** for this repo — the technical owner, not an order-taker.

- Never sacrifice code quality for speed.
- Question anything generic, inconsistent, or "AI-looking." Push back; do not blindly implement a request that would make the codebase worse.
- Before any major change, reason about its ripple effects across the project.
- If you see a better implementation, **explain it before changing it**.
- The goal is a **premium, enterprise-grade site that feels handcrafted, not AI-generated** — closer to Volvo Trucks / Scania / Mercedes-Benz Trucks than a template.

---

## 1. Project overview

Marketing site for **Vishal Transport and HR Solutions Pvt. Ltd.** ("Vishal Group") — staff transportation, cargo management, warehouse leasing, and manpower consulting for the automobile and manufacturing sectors, operating from **Hosur, Tamil Nadu** and **Bengaluru, Karnataka**. 14+ years in operation, 300+ vehicles, 550+ employees, 20+ corporate clients (UNO MINDA, TATA Electronics, TITAN, Jamna Auto, AVTEC/CK Birla, Luminous, and others).

**Purpose:** convert manufacturing/automotive procurement and HR decision-makers evaluating a transport-and-manpower partner. Audience is B2B — plant managers, HR heads, and procurement teams at automobile/manufacturing companies in the Hosur–Bengaluru corridor — not consumers.

It is a single long-scroll landing page. The original hand-built HTML (pre-Next.js) is preserved at `reference/vishal-group-atelier.html` as a historical record only — it no longer reflects current design or content and should not be treated as a source of truth. All imagery is currently reserved gradient placeholders awaiting original photography (see §15 Known Issues).

---

## 2. Brand direction

Current, deliberate design direction — **do not reintroduce the earlier gold/black luxury-boutique theme**, and don't default to "more color" as a fix:

- **White-dominant.** Section backgrounds are almost entirely white (`#FFFFFF`) or navy (`#1F3265`, used sparingly for 4 deliberate contrast moments — see §6). Body text and headings are near-black neutral ink, not brand navy — the brand color is a signal, not the default text color.
- **Blue is an accent, used sparingly.** Not "excessive blue everywhere." Reserve it for CTAs, links, icons, and small accent marks.
- **Reference points:** Volvo Trucks, Scania, Mercedes-Benz Trucks — premium, industrial, corporate, confident. Explicitly *not* startup/SaaS aesthetics, not dashboard/admin-panel styling, not gold accents, not generic template card grids.
- **Mobile-first.** Every layout decision gets checked at 375px before it's considered done, not as an afterthought.
- Full token rationale is in §7 (Design system).

---

## 3. Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15**, App Router | Server components by default |
| Language | **TypeScript**, `strict` | No `any` without justification |
| Styling | **Tailwind CSS 3.4** | Token-driven; no CDN |
| Animation | **Framer Motion 11** | All motion goes through `src/lib/motion.ts` |
| Email | **Resend** | Server action, stub fallback (see §12) |
| Package manager | **npm** | |
| Deploy target | Vercel-ready | |

---

## 4. Architecture

Dependency flows one way: **data → primitives → sections → page**. Never import upward.

```
src/
├── app/
│   ├── layout.tsx        Fonts (next/font), metadata, JSON-LD, <html> theme vars
│   ├── page.tsx           Pure server component — stacks the 17 sections (see §6)
│   ├── globals.css        Tailwind layers + .theme-dark / .theme-light tokens
│   ├── actions.ts         "use server" — contact form (Resend + stub)
│   ├── not-found.tsx      404 page
│   ├── error.tsx          Client error boundary
│   ├── sitemap.ts         Dynamic sitemap.xml
│   └── robots.ts          Dynamic robots.txt
├── lib/
│   ├── content.ts         ALL copy and business facts. Components stay presentational.
│   ├── motion.ts          ALL easing curves, durations, variant factories.
│   └── useMediaQuery.ts   useIsDesktop() — gates desktop-only motion refinements
└── components/
    ├── motion/            Reveal, Stagger, MaskText, ParallaxImage, Counter — reduced-motion aware
    ├── nav/               Navbar (scroll-spy + blur), ScrollProgress
    ├── ui/                Button, Icon, SectionHeading, GrowthTimeline, GradientMesh, BusScene, LogoCarousel
    └── sections/           The 17 sections + ContactForm (see §6)
```

**Rules**
- New copy or business facts go in `content.ts`, not inline in JSX. Never invent numbers — see §5.
- New easings/durations/variants go in `motion.ts`, not inline in components.
- New reusable motion or visual behavior becomes a `components/ui/` or `components/motion/` primitive before it is copy-pasted into a second section.
- Before flipping a section's `theme-dark`/`theme-light` class, grep that file for hardcoded colors (raw hex, `ring-white/...`, gradient stops assuming a specific bg) — several past bugs came from sections that assumed their own theme.
- Never use a Tailwind opacity modifier (`text-acc/25`, `bg-hair/10`, etc.) on a CSS-variable-backed color (`acc`, `ink`, `hair`, `bg`, `surface`). Tailwind 3.4 silently generates **no CSS at all** for these — confirmed by inspecting compiled output. Use a separate `opacity-*` utility instead, or `color-mix()` in an inline style if you need genuine translucency. `neutral.white` is a plain static hex and is exempt (opacity modifiers work fine on it).

---

## 5. Content sources

- **`reference/vishal-group-atelier.html`** — the original pre-migration HTML. Historical only, not current-source-of-truth.
- **`reference/brand/vishal-logo.png`** — the real Vishal logo. Brand colors (`#0F7DC1` wordmark, `#1F3265` emblem navy) were extracted from this file by sampling actual pixels, not eyeballing — see §7.
- **Company profile PDF** ("Vishal Transport - Company Profile 2026") — supplied once by the user, not stored in the repo. Its facts (fleet/workforce growth figures, client list, services, MD name/quote, locations) are already integrated into `content.ts`. If asked to re-verify or extend business facts, ask the user for the PDF again rather than inventing numbers — do not guess.
- All growth figures in `content.ts` (`employeeGrowth.chart`, `fleetStrength.chart`) are real FY23-24 → FY25-26 data points from that PDF, not projections.
- **Known unresolved discrepancy:** the PDF listed a different phone (`+91 73730 61696`) and email (`info@vishal-trasport.com`, likely a typo) than what's live on the site (`+91 99943 91696`, `vishaladml1@gmail.com`). This was deliberately **not** changed — contact-info errors have real business cost, and the correct value was never confirmed. Flag this to the user again if it comes up; don't silently pick one.

---

## 6. Current sections (in page order)

17 sections + Footer. Theme is `theme-dark` (navy `#1F3265` bg) or `theme-light` (white bg) — see §7 for the reasoning behind which sections are dark.

| # | Component | Purpose | Theme | Notes |
|---|---|---|---|---|
| 1 | `Hero` | First impression, headline, CTA | dark | Custom `BusScene` vector bus+road animation + `GradientMesh` signature glow. See §6a. |
| 2 | `About` | Company positioning / who we are | light | Layered two-image composition (primary + inset offset panel), not a single flat block. |
| 3 | `Corridor` | Cinematic full-bleed statement/quote | dark | Deliberate "breather" moment; `GradientMesh` applied here too. |
| 4 | `Fleet` | Quick scale stats (4 big numbers) | light | Fast-scan snapshot: vehicles, employees, clients, years. No imagery by design — keep it punchy. |
| 5 | `Services` | 3 core services (numbered row list) | light | Staff Transportation, Cargo Management, Manpower Consulting. Do **not** add Warehouse Leasing back here — it has its own section (#6) to avoid duplicate service cards. |
| 6 | `ExtendedCapabilities` | Warehouse leasing spotlight | light | Real stats: 200,000+ sq ft, 6–7 tenant companies. |
| 7 | `TrustedPartners` | "Industries we serve" gallery | dark | Horizontal pinned-scroll gallery on desktop, snap-scroll on mobile. Pin height is dynamically derived from measured track width (not hardcoded — was a backlog item, now fixed). |
| 8 | `EmployeeGrowth` | Workforce growth deep-dive | light | `GrowthTimeline` (not a bar chart) + 2 left-accent-bar callouts. |
| 9 | `FleetStrength` | Fleet growth deep-dive | dark | `GrowthTimeline` + Buses/Trucks category pair + 3-image mosaic (only real fleet imagery placement on the page besides `Maintenance`). |
| 10 | `Operations` | Technology & Tracking + Driver Training & Safety | light | **Merged section**, two sub-blocks — was two separate thin sections (`Technology.tsx`, `Safety.tsx`), consolidated because they read as fragments. Tech = airy borderless icon pairs + hand-drawn SVG tracking illustration; Safety = connected numbered process flow (line + circle markers), not cards. |
| 11 | `Maintenance` | Workshops & maintenance capability | light | Row-list features + workshop image + "2 workshop locations" metric. |
| 12 | `Team` | Leadership — MD letter | light | Real name/role rendered: Vishal Manjunath, Managing Director. `GradientMesh` (subtle variant) applied here as the 3rd signature moment. |
| 13 | `Coverage` | Locations / GSTIN | light | Hosur + Bengaluru map, addresses, GST numbers. |
| 14 | `WhyUs` | Quick summary reasons (4 items) | light | Row-list, not cards. Deliberately short — the deep-dive content lives in its own dedicated sections (7–11); this is a summary, not a repeat. |
| 15 | `Trust` | Client logo wall + FAQ | light | Real client names rendered as text wordmarks (`LogoCarousel`) — no logo image files exist for these clients, so `LogoItem` falls back to a styled text treatment, not the abstract placeholder mark. |
| 16 | `Contact` | Contact form + CTA | dark | `ContactForm.tsx` — see §12. |
| 17 | `Footer` | Standard footer | dark | |

**§6a — BusScene (`src/components/ui/BusScene.tsx`)**: a flat vector coach silhouette (no photography exists yet, so this is deliberately illustrative, not a photoreal render) driving at constant linear speed along an animated road line, looping, gated by `useInView` + `prefers-reduced-motion`. Lives in normal document flow (not `position: absolute` against the Hero section) specifically so it can never overlap the CTA button — an earlier absolute-positioned version overlapped the button by ~23px on short mobile viewports because the section didn't always grow past `min-h-screen`. If you touch Hero's layout, keep BusScene as a normal flex child, not an overlay.

**Sections deliberately NOT present**: no separate "Technology" or "Safety" section (merged into `Operations`, see #10). No 4th Services card for warehousing (moved to `ExtendedCapabilities`, see #6).

---

## 7. Design system

### Color

Tokens live in **`tailwind.config.ts`** (static) + **`globals.css`** (theme-aware CSS variables). Use the tokens; never hardcode raw hex in a component.

**Static palette** (`tailwind.config.ts`):
```
brand.navy:    #1F3265   — dark-section background, secondary brand color
blue.DEFAULT:  #0E74B4   — primary accent (buttons, links) — 4% darkened from the raw
                           logo-sampled #0F7DC1 specifically so white button text clears
                           4.5:1 contrast; the raw value fails at 4.45:1
blue.dark:     #0B5C8E   — hover/pressed state
neutral.white: #FFFFFF
neutral.line:  #E4E2DC
neutral.mid:   #63666C
neutral.ink:   #14161B
```

**Theme-aware vars** (`globals.css`, resolved via `.theme-dark` / `.theme-light`):
```
                --bg        --surface   --ink       --ink-2     --acc       --hair
.theme-dark     #1F3265     #223066     #F6F5F2     #ADB2BE     #42AEF0     rgba(255,255,255,.14)
.theme-light    #FFFFFF     #F5F5F3     #14161B     #63666C     #0E74B4     rgba(20,22,27,.1)
```
`--surface` is for subtle panel/card fills that need to read as distinct from the section's own `--bg` (e.g. a card inside a white section) — it is **not** the section background itself. Don't use it as a substitute for `--bg`.

All pairings above are WCAG-AA verified (≥4.5:1 for text, ≥3:1 for large/UI) by computing actual relative-luminance contrast ratios — re-verify with the same method if you change any of these values, don't eyeball it.

**Why only 4 dark sections (Hero, Corridor, Contact, Footer):** the site used to alternate dark/light every section (~50/50). Explicit user feedback: "avoid heavy dark backgrounds everywhere." Dark is now reserved for deliberate punctuation, not a repeating pattern. Before adding a new section, default to `theme-light` unless there's a specific cinematic reason not to.

### Typography

Fraunces (`font-serif`) for display headings, Inter (`font-sans`) for body, IBM Plex Mono (`font-mono`) for eyebrows/indices via the `.text-idx` utility. Display sizes: `display-xl/lg/md` + `body-lg` scale (all `clamp()`-based, fluid). This pairing is deliberate — premium/editorial, validated against reference sites — don't swap it for a geometric sans without a strong reason.

### Layout rhythm

Vertical rhythm: `py-section-y` (96px) / `py-section-y-lg` (144px). Container: `max-w-container` (1480px) with `px-6 sm:px-10`.

### Numbers must never wrap

`whitespace-nowrap` is baked directly into the `Counter` primitive itself (`src/components/motion/Counter.tsx`), so every animated stat is non-wrapping by construction. Large standalone numbers built without `Counter` (e.g. static `About` stats) still need `whitespace-nowrap` added manually — check this whenever you add a new big-number display, and verify with real measurements (`el.scrollWidth > el.clientWidth`), not by eye, at 375px width specifically.

### Section-level variety, not a repeating card grid

Multiple sections used to share one identical "icon + label + meta in a bordered rounded box" card-grid pattern (`Operations`, `Maintenance`, `WhyUs`, `EmployeeGrowth`, `FleetStrength` all had it). This was flagged as making the site feel templated. It's now deliberately varied — row-lists (`WhyUs`, `Maintenance`, reusing the `Services` pattern), borderless icon pairs (`Operations` tech block), a connected numbered process flow (`Operations` safety block), left-accent-bar pairs (`EmployeeGrowth`, `FleetStrength`). **Before adding a new "list of things" section, don't default to a bordered card grid** — check what's already used nearby and pick something different, or the "collection of templated sections" feeling comes right back.

### Signature device — `GradientMesh`

A soft two-blob radial blur in brand blue (`src/components/ui/GradientMesh.tsx`). Used at exactly 3 places: Hero, Corridor, Team/Leadership. This is deliberately rationed — it's the site's one recurring visual signature, not a decoration to sprinkle everywhere. If a new section wants "more visual interest," reach for varied layout/imagery first, not another `GradientMesh` instance.

### Reusable primitives worth knowing about

- **`SectionHeading`** (`ui/`) — the eyebrow-index + display-title block, used by ~9 sections. Supports `mask` (MaskText cinematic reveal, for Trust/Team) vs. plain (`Reveal` fade, everything else) and `size="lg"|"md"`.
- **`GrowthTimeline`** (`ui/`) — editorial milestone timeline (dots + connecting line + large serif numbers, final milestone rendered largest), used by `EmployeeGrowth` and `FleetStrength`. **Not** a bar chart — a bar-chart version (`GrowthChart.tsx`) was built and explicitly rejected as "generic dashboard widget" and deleted. Don't reintroduce a literal bar/track chart for growth data; extend `GrowthTimeline` instead if a third section needs this pattern.

---

## 8. Animation philosophy

Motion is **smooth, purposeful, cinematic, minimal, never distracting.** If an animation doesn't improve the experience, remove it.

- **All motion composes from `motion.ts`**: `easing` (`expo`, `smoothOut`, `gentle`), `duration`, `buildReveal`, `staggerContainer`/`staggerItem`, `maskLine`, `hoverTransition`, `viewportOnce`.
- **Section identity:** vary the entrance — never fade-up everything. Use `<Reveal variant="fadeUp|slideLeft|slideRight|blur|scaleIn">`, plus `MaskText` for display headings.
- **Reveal once** (`viewport={{ once: true }}`); animate GPU-friendly properties (transform, opacity, filter). Target 60 FPS.
- **Reduced motion is mandatory.** Every animated primitive checks `useReducedMotion()` and collapses to an instant/opacity-only state. New motion must do the same.
- **No always-on cost:** don't run infinite animations while off-screen; gate with `useInView` (see `BusScene`, `Hero`'s old ken-burns, `Operations`' pulsing tracking dot for the pattern). Don't attach scroll-linked parallax to tiny/decorative elements.
- Constant-speed (`ease: "linear"`) reads as purposeful/mechanical (used for `BusScene`'s drive-across) — eased motion on a vehicle reads as toy-like. Use linear easing for anything meant to simulate real transit motion.

---

## 9. Coding conventions

- Named exports for components (`export function Hero()`), one section per file, PascalCase filenames.
- `"use client"` only on leaves that need interactivity/hooks; keep sections server components when they can be. `page.tsx` stays server-only.
- Import alias `@/*` → `src/*`. No deep relative chains.
- Props typed explicitly; prefer discriminated/simple prop types over clever conditional generics (see `Button.tsx` history — keep it simple).
- Keep components presentational; data comes from `content.ts` via props/imports.
- Comments explain **why**, not what. Match the surrounding style.
- The build must stay green: `npm run build` (type-check + lint) after every meaningful change.
- `next lint` prompts for interactive ESLint setup on a fresh checkout (no `.eslintrc` committed) — this is pre-existing, not a regression. `npm run build` runs its own lint pass and is the authoritative check; don't try to fix `next lint`'s interactive prompt.

---

## 10. Accessibility (required, not optional)

- Semantic landmarks: `header` / `main` / `footer`; each section `<section>` with an `id` where it's a nav target.
- Every form field has an associated `<label htmlFor>`; the form's status message must be `aria-live` and must not rely on color alone.
- Interactive elements are real `<button>`/`<a>`; `aria-expanded` on toggles (nav, accordion); `aria-label` on icon-only controls.
- Visible focus states (`:focus-visible` is themed in `globals.css`) — never remove outlines.
- Decorative placeholders/icons/illustrations (including `BusScene`) are `aria-hidden`; real images require meaningful `alt`.
- Respect `prefers-reduced-motion` everywhere (see §8).

---

## 11. Performance goals

- **Server-render content**; keep client JS to interactive leaves. Watch First Load JS on the `/` route in build output (currently ~163 kB First Load JS for `/`, page-own JS ~21 kB).
- Prioritize **LCP**: hero text first (image/bus-scene is decorative, not LCP-critical). When real images arrive they **must** use `next/image` (responsive `srcset`, blur placeholder) — `ParallaxImage` will need a `next/image` wrapper, not a bare `<div>`.
- Trim unused font weights (`layout.tsx`) — every weight is a download.
- Avoid redundant scroll listeners; reuse Framer's `useScroll` and don't over-instrument small elements.
- No layout shift from animations (animate transform/opacity, not layout properties).

---

## 12. Contact form

`src/app/actions.ts` (`submitInquiry`) validates + escapes input and sends via Resend when `RESEND_API_KEY` is set; otherwise it logs server-side and returns success (working stub — **this is the current live behavior**, no real API key configured yet). Client form uses `useActionState` + `useFormStatus`. Env in `.env.example`: `RESEND_API_KEY` (unset), `CONTACT_TO_EMAIL` (`vishaladml1@gmail.com`), `CONTACT_FROM_EMAIL` (`onboarding@resend.dev`, Resend's shared dev sender — should become a verified domain sender before real launch). Never commit real keys.

---

## 13. Commands

```bash
npm run dev      # local dev (http://localhost:3000)
npm run build    # production build — MUST pass before done
npm start        # serve the production build
npm run lint     # eslint (prompts for setup on fresh checkout — see §9)
```

---

## 14. Features implemented this project

Roughly chronological. Useful for understanding *why* something looks the way it does if it seems non-obvious.

1. Full brand color extraction from the real logo (pixel-sampled, not eyeballed) — replaced an earlier gold/black luxury theme entirely.
2. Company-profile PDF content integration — corrected several stats that were wrong on the live site (workforce overstated at "2,000+" vs. real 550+; fleet understated at "200+" vs. real 300+), added MD's real name, added Warehouse Leasing as a real service line, replaced anonymous placeholder client logos with 8 real named clients.
3. `SectionHeading` primitive extracted (was duplicated across ~7 sections).
4. Fixed: `TrustedPartners` hardcoded `220vh` pin height → now derived from measured track width.
5. Fixed: mobile nav overlay was clipped to 96px tall due to a `backdrop-filter`-creates-containing-block CSS bug — full-screen overlay now correct.
6. Six new sections added from PDF content: `EmployeeGrowth`, `FleetStrength`, `ExtendedCapabilities`, plus what became `Operations` (originally two sections, `Technology` + `Safety`, later merged).
7. Redesigned stat/growth presentation from a bar-chart (`GrowthChart`, deleted) to the editorial `GrowthTimeline` after explicit "looks like a dashboard" feedback.
8. Complete color-system rebuild: navy-as-text → neutral ink; cool off-white → warm-then-pure-white background; `blue` promoted to the sole accent color.
9. `GradientMesh` signature device added (Hero, Corridor, Team).
10. Site restructured/reordered; `Technology` + `Safety` merged into `Operations`; dark sections reduced from ~50% to 4 (Hero, Corridor, Contact, Footer) after "avoid heavy dark backgrounds everywhere" feedback.
11. De-duplicated the repeated bordered-card-grid pattern across 6 sections into varied treatments (see §7).
12. `BusScene` hero animation built — vector coach silhouette + road, constant-speed loop.
13. Found and fixed a real, pre-existing bug: Tailwind opacity modifiers on CSS-variable colors (`text-acc/25` etc.) silently compile to nothing. Fixed every instance site-wide.
14. SEO/hygiene: `sitemap.ts`, `robots.ts`, `not-found.tsx`, `error.tsx` added.

---

## 15. Known issues / gaps

- **No real photography or video anywhere.** Every image is a `.ph` gradient placeholder. This is the single biggest quality lever left — see `ParallaxImage` and the `next/image` note in §11.
- **Contact info discrepancy unresolved** — see §5. Don't silently pick a phone/email; ask.
- **Resend not connected to a real key/domain** — form works via the logging stub only. `CONTACT_FROM_EMAIL` still points at Resend's shared dev sender, not a verified Vishal domain.
- **No OG image** — `layout.tsx` has OG metadata but no actual image asset.
- **No automated tests.**
- **`npm audit`** shows build-time-only vulnerabilities (postcss, brace-expansion). Do **not** `--force` fix; revisit on a Next.js major upgrade.
- **Full visual QA has been done via computed-style/DOM assertions more than pixel screenshots** in recent sessions, due to a screenshot-capture staleness issue in the local browser-preview tool (confirmed via computed styles being correct while screenshots showed stale frames). If you hit the same issue, trust `getComputedStyle`/`getBoundingClientRect` assertions over a stale screenshot, and prefer a fresh tab over reusing one that's shown this behavior.
- **If a dev server is already running on port 3000 when you start a session, check whether it's the user's own** (`ps -p <pid> -o lstart,command`) before killing it — they may be actively reviewing the site locally. Use a second `launch.json` entry on a different port for your own verification instead of assuming it's a stray process.

---

## 16. Next priorities

Roughly in order:

1. **Real photography/video.** Everything else is downstream of this — fleet, drivers, workshops, tracking dashboards, leadership portrait, client operations. Until then the placeholder system (`ParallaxImage`, `.ph`) stays.
2. **Resolve the contact-info discrepancy** with the user (§5), then wire `CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL` to a real verified domain and set `RESEND_API_KEY`.
3. **OG image** — generate one (e.g. via `next/og` `ImageResponse`, no extra asset needed) so social shares aren't blank.
4. Continue mobile-first review of any new work — every new section/component should be measured (not eyeballed) for overflow and number-wrap at 375px before being called done, per §7.
5. Automated tests (currently none) — at minimum, a smoke test that the build produces all expected sections and no console errors.
6. Revisit `npm audit` findings on the next Next.js major version bump.

---

## 17. Definition of done

A change is done when: it builds clean (`npm run build`), uses existing tokens/variants (or adds new ones deliberately per §7), respects reduced motion + accessibility (§8, §10), keeps the server/client boundary tight, reads like the surrounding code, avoids reintroducing anything explicitly rejected in §2 or §7 (gold/black theme, bar-chart stats, repeating card grids), and does not regress any item in §14 — with the reasoning shared if it was a judgment call.
