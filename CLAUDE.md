# CLAUDE.md — Vishal Transport

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

It is a single long-scroll landing page. The original hand-built HTML (pre-Next.js) is preserved at `reference/vishal-group-atelier.html` as a historical record only — it no longer reflects current design or content and should not be treated as a source of truth.

**Naming:** the brand is written **"Vishal Transport"** everywhere in UI copy. "Vishal Group" was renamed out of the site deliberately — don't reintroduce it.

**Imagery is real now.** Client-supplied photography has replaced the gradient placeholders across About, Industries, Workforce, Fleet Strength, Maintenance and the client gallery. The `.ph` placeholder system still exists for any *new* slot that has no photo yet.

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
│   ├── useMediaQuery.ts   useIsDesktop() — gates desktop-only motion refinements
│   └── useRevealArm.ts    Reveal arming + SCROLL_REVEALS_ENABLED master switch (§8)
└── components/
    ├── motion/            Reveal, Stagger, MaskText, ParallaxImage, Counter — reduced-motion aware
    ├── nav/               Navbar (scroll-spy + blur), ScrollProgress
    ├── ui/                Button, Icon, SectionHeading, GrowthTimeline, GradientMesh, BusScene, LogoCarousel
    └── sections/           The 17 sections + ContactForm (see §6)

`scripts/` holds one-shot asset pipelines (`optimize-photos.mjs`, `build-logo.mjs`,
`build-partner-logos.mjs`, `rightsize-assets.mjs`, `convert-to-webp.mjs`). They are
build-time tools, not app code. `sharp` and `playwright-core` are devDependencies
because of these — don't prune them.
```

**Rules**
- New copy or business facts go in `content.ts`, not inline in JSX. Never invent numbers — see §5.
- New easings/durations/variants go in `motion.ts`, not inline in components.
- New reusable motion or visual behavior becomes a `components/ui/` or `components/motion/` primitive before it is copy-pasted into a second section.
- Before flipping a section's `theme-dark`/`theme-light` class, grep that file for hardcoded colors (raw hex, `ring-white/...`, gradient stops assuming a specific bg) — several past bugs came from sections that assumed their own theme.
- **Never put `loading="lazy"` on an image inside a horizontally-translated track.** Native lazy-loading decides what to fetch from an element's *layout* position against the viewport. A CSS `transform` slides items into view without changing layout position and does **not** re-trigger the check, so those images never load — permanently, on every visit. This shipped as a real bug in `LogoMarquee` and in the desktop pinned gallery in `TrustedPartners` (a `motion.div` translate track). It is now structurally prevented: **every image on the site is `loading="eager"`** and the loader gates on all of them (§11a). A horizontal *scroll container* is less severe — scrolling does update intersection — but it still left a card blank until swiped, so it gets eager too.
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
| 2 | `About` | Company positioning / who we are | light | Layered composition. The secondary panel is the **official logo**, not a bus photo — a deliberate branding choice. |
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
| 15 | `Trust` | Client logo marquee + FAQ | light | `LogoMarquee` — a seamless continuous band of **real client logo images**. No grouping, no categories, no text placeholders: a company with no logo file is simply omitted. Item spacing is `px-8 sm:px-12` per item, **not** flex `gap` (gap leaves the wrap-around joint short and breaks the seam). |
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

### Logo sizing across brands

Client logos have wildly different aspect ratios (square crests vs. long wordmarks). Balance them by **rendered area**, not by height — giving every logo the same height makes square crests visually dominate by several times. This was applied backwards once already; if you touch `LogoMarquee` sizing, verify by measuring `width × height` per item, not by eye.

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
- **Scroll-triggered entrance reveals are currently OFF** via `SCROLL_REVEALS_ENABLED = false` in `src/lib/useRevealArm.ts`. They were the last mechanism leaving content invisible until scrolled to, which read as "sections loading late" on mobile. All the plumbing still works — flip the flag to bring them back, but re-verify §11's SSR-visibility check if you do.
- **Framer's `initial` is written into the SSR HTML** and only applies once at mount, so `initial="hidden"` ships real content at `opacity: 0`. It cannot be flipped after mount. Use `useAnimationControls()` + `.set()` instead — that is what `useRevealArm` does. Motion primitives use `initial={false}` + `animate={controls}`.
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

- **Server-render content**; keep client JS to interactive leaves. All 17 sections ship complete in the initial HTML — verified. Nothing mounts after hydration.
- **Never ship real content at `opacity: 0` in SSR.** This regressed once at 92 elements; it is now 8, all `pointer-events: none` decorative overlays. Re-check after any motion change (§19).
- Prioritize **LCP**: hero text first (BusScene is decorative, not LCP-critical). Real images use `next/image` with an explicit `sizes` prop — every image on the page has one, and none is over-delivered.
- Trim unused font weights (`layout.tsx`) — every weight is a download. Fonts are the heaviest layer on the page: 5 WOFF2 files ≈ 128 KB, more than double the entire image payload.
- Avoid redundant scroll listeners; reuse Framer's `useScroll` and don't over-instrument small elements.
- No layout shift from animations (animate transform/opacity, not layout properties). CLS is currently **0.0000** with 0 shift events — treat any regression as a bug.
- **The mobile menu must not wait on hydration.** It is driven by a pre-hydration inline script (`menuBootstrap` in `layout.tsx`) using event delegation, with the overlay styled from `html[data-menu-open="true"]` in CSS. Hydration-gated, it had a 2294 ms dead window (34 dead taps); it is now ~92 ms on the first tap. Do not add an `onClick` to `#menu-toggle` — the delegated bootstrap owns it.
- **Absence of the attribute means closed.** `menuBootstrap` must never write `data-menu-open="false"` before React hydrates — that is a hydration mismatch. Removing the attribute is the closed state.

### 11a. The startup loader (`ui/SiteLoader.tsx`)

A full-page navy cover that holds the entire site at `opacity: 0` until it is ready, so the page appears **all at once** rather than in pieces. Server-rendered, so it paints on the first frame. The user explicitly asked for this and accepted that it delays first content — **do not argue it away or replace it with a timer.**

Dismissal sets `data-loaded` on `<html>` and is gated on four real signals, never a timeout:

| Gate | Mechanism | Actually binding? |
|---|---|---|
| Hydration complete | the `useEffect` running *is* the signal | partly |
| Fonts | `document.fonts.ready` | **no — see below** |
| Window load | `load` event / `readyState` | yes |
| **Decode of EVERY image** | `img.decode()` over all `<img>` | **yes — now the real gate** |
| 2× rAF settle | `rAF(rAF(reveal))` | yes |

**The contract is "the whole site is ready", not "the first screen is ready".** Nothing on the page is lazy (§4), so `window load` settles every image at the network layer and the decode pass covers all of them. A failed image is swallowed (`.catch`) so one broken URL degrades to a gap instead of a stuck cover.

Two failsafes, both at **25 s** — keep them in sync:
- `FAILSAFE_MS` in `SiteLoader.tsx` (JS path, `Promise.race`).
- `loader-failsafe` / `content-failsafe` / `scroll-unlock` in `globals.css` (JS-disabled backstop).

25 s, not the original 6 s, because the honest worst case for the full image set is ~17 s on Slow 3G — a 6 s failsafe would fire *during* a normal load and reveal a half-loaded page, which is precisely what the cover exists to prevent. The CSS backstop must release the **content opacity and the scroll lock too**, not just the cover; releasing only the cover left a no-JS visitor on a blank, unscrollable page.

**Known wrinkle:** under `font-display: optional`, `document.fonts.ready` resolves against the current layout pass, not the network — measured at 542 ms while the WOFF2 files finished at 2638 ms. The font gate is effectively a no-op. It causes no harm today only because `window load` lands later. Latent, not live.

**Verified after the change:** 27/27 images painted at dismissal, **0** image requests after dismissal (idle and after a full scroll), 0 blank slots, marquee 16/16, gallery 4/4 without a swipe.

**Cost model for widening the gate.** Measured across 3 runs per profile; the delta is purely bandwidth and predicts almost exactly as `bytes ÷ throughput`:

> **Every 100 KB added to the loader's gate costs ≈ 2 s on Slow 3G, 0.5 s on Fast 3G, 0.2 s on Slow 4G, 0.08 s on normal mobile.**

This was the trade accepted when the gate widened to the whole page. Measured on Vercel (median, cold, 4× CPU): Fast 3G **3.5 → 4.4 s**, Slow 4G **1.5 → 1.9 s**, normal mobile **0.65 → 0.9 s**, Slow 3G 12.5 → 17.1 s, as the image payload went 55 KB → 276 KB.

**Local `next start` is not a proxy for production payload.** Its AVIF encoder is markedly less efficient than Vercel's edge (66.8 KB vs 36.9 KB for the same photo), so a local A/B overstates the cost by roughly 1.8×. Use local only for controlled before/after; take absolute numbers from the deployed build.

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
15. **Real photography integrated.** Client-supplied photos audited, placed by section with a written plan before any change, optimised (`scripts/optimize-photos.mjs`) and wired through `next/image`. Placeholders removed from `Maintenance` and `Team` (MD's Desk), both sections reflowed so no empty gaps remain.
16. **Official logo integrated** across navbar, footer, mobile overlay and favicon (`ui/Logo.tsx`). Right-sized to 780×200 and converted to WebP: 359 KB → 87 KB → 73 KB. `About`'s secondary image became the logo instead of a bus photo.
17. **`Trusted By` rebuilt as `LogoMarquee`** — a seamless continuous logo band with real client logo files, replacing text wordmarks and all category grouping. Seam verified at `seamDelta = 0px`.
18. **Brand renamed** "Vishal Group" → "Vishal Transport" site-wide.
19. **Mobile menu latency fixed at the root cause** (hydration, not animation duration): pre-hydration inline script + CSS-driven overlay. 2294 ms / 34 dead taps → ~92 ms, first tap. A `next/dynamic` + `Suspense` attempt first was tried and only bought 68 ms — recorded so it isn't retried.
20. **Hydration mismatch on `<html data-menu-open>` fixed correctly** (absence = closed), not with `suppressHydrationWarning`.
21. **SSR-hidden content eliminated**: 92 elements shipping `opacity: 0` → 8 decorative ones, by moving every motion primitive to `initial={false}` + `useAnimationControls`. Scroll reveals then switched off entirely (§8).
22. **Image pipeline rebuilt**: `deviceSizes`/`imageSizes` tuned, explicit `sizes` on every image, AVIF/WebP negotiation. Above-fold payload is now 8 KB; nothing is over-delivered.
23. **`Who We Serve` dead space fixed** — 574 px → 36 px.
24. **Startup loader built and shipped** (§11a), after a first experiment was measured and rejected, then explicitly re-requested by the user.
25. **Lazy loading removed site-wide and the loader's contract widened to the whole page.** All three image components (`ParallaxImage`, `Logo`, `LogoMarquee`) are eager; `SiteLoader` now decodes every `<img>`, not just the first viewport. Fixed the permanently-blank marquee logos and the pinned-gallery cards in one change. Failsafes raised 6 s → 25 s, and the CSS backstop now releases content opacity and the scroll lock as well as the cover — previously a no-JS visitor got a blank, unscrollable page.
26. **Two full read-only audits performed** — a mobile-first teardown (verdict: repair, not rebuild) and a loading-pipeline forensic trace. Findings live in §15 and §19.

---

## 15. Known issues / gaps

Ordered by user impact.

- **THE LIVE DOMAIN STILL SERVES THE OLD SITE.** `vishal-transport.com` and `www` both resolve to `103.235.104.165` — an Apache host running the pre-Next.js jQuery site (`id="preloader"`, ~29 references to jQuery/animate.css scroll reveals). The new build only exists at the Vercel URL. **Every "the mobile site loads in chunks / is broken" report traced back to this**, because animate.css scroll-reveal does exactly that. Before debugging any reported symptom, confirm which URL is being looked at.
- **Contact form sends nothing.** `RESEND_API_KEY` is unset, so `submitInquiry` logs server-side and returns success. `CONTACT_FROM_EMAIL` is still Resend's shared dev sender.
- **Contact info discrepancy unresolved** — see §5. Don't silently pick a phone/email; ask.
- **One WCAG AA contrast miss**: the 12 px `.text-idx` eyebrow in `--acc` (`#0e74b4`) over a light-blue brand wash (`#e2eef6`) measures **4.26:1** against 4.5:1. It is the only thing keeping accessibility off 100.
- **No OG image** — `layout.tsx` has OG metadata but no asset.
- **No privacy policy page.**
- **No automated tests.**
- **`npm audit`** shows build-time-only vulnerabilities plus high-severity `sharp`/libvips advisories. Do **not** `--force` fix; revisit on a Next.js major upgrade.

**Resolved, do not re-report:** all-placeholder imagery, blank/late-rendering sections, hamburger latency, hydration mismatch, SSR `opacity:0` content, layout shift (CLS is 0), scroll jank (0 long frames, 120 fps), touch targets (0 under 44 px), horizontal overflow (0 px at 320–768).

## 16. Next priorities

Roughly in order:

1. **Point DNS at Vercel.** Nothing else on this list reaches a real visitor until this happens. A → `76.76.21.21`, `www` CNAME → `cname.vercel-dns.com`. **Do not touch the MX records** (`0 smtp.google.com`) — email is live on Google Workspace. SPF is missing `include:_spf.google.com`.
2. **Un-lazy the `LogoMarquee` images** (§15) — the only permanently-broken content on the site, and a one-line fix.
3. **Wire Resend**: real `RESEND_API_KEY`, and move `CONTACT_FROM_EMAIL` to a verified Vishal domain sender.
4. **Resolve the contact-info discrepancy** (§5) with the user.
5. Darken the accent for small text to clear 4.5:1 (§15).
6. **OG image** — generate via `next/og` `ImageResponse`, no extra asset needed.
7. Privacy policy page.
8. Automated tests — at minimum a smoke test that all expected sections render with no console errors.
9. Revisit `npm audit` on the next Next.js major bump.

## 17. Definition of done

A change is done when: it builds clean (`npm run build`), uses existing tokens/variants (or adds new ones deliberately per §7), respects reduced motion + accessibility (§8, §10), keeps the server/client boundary tight, reads like the surrounding code, avoids reintroducing anything explicitly rejected in §2 or §7 (gold/black theme, bar-chart stats, repeating card grids), does not regress any item in §14, and holds every standing invariant in §19 — with the reasoning shared if it was a judgment call.

For anything touching layout, motion or loading, "done" additionally means **measured at 375/390 px**, not eyeballed, and checked against §19's false-positive list before the finding is reported.

---

## 18. Deployment & environments

| Environment | URL | Serves |
|---|---|---|
| Production build | `vishal-transport-website.vercel.app` | **The current site.** Vercel, Next.js. |
| Customer domain | `vishal-transport.com` / `www` | **The OLD jQuery site.** Apache at `103.235.104.165`. Not this repo. |

The Vercel deployment tracks `origin/main`. Before investigating any user-reported symptom, **verify which URL was actually looked at** — this single confusion accounted for weeks of reported "broken mobile" behaviour that could not be reproduced on the real build.

DNS cutover values are in §16. The MX records must survive it.

**Local dev vs. your own builds:** if you run `npm run build` while the user's `npm run dev` is live, you clobber their `.next` and they get phantom runtime `SyntaxError`s. Always isolate:

```bash
NEXT_DIST_DIR=.next-verify npm run build
```

Also check whether a dev server on :3000 is theirs (`ps -p <pid> -o lstart,command`) before killing it.

---

## 19. Verification & measurement

**Measure, don't eyeball.** Every performance or layout claim in this file came from instrumentation, and the standard is: real measurements at 375/390 px, not screenshots and not intuition.

Tooling that works here: `playwright-core` driving system Chrome (`/Applications/Google Chrome.app/...`) with CDP for `Emulation.setCPUThrottlingRate` and `Network.emulateNetworkConditions`; Lighthouse 12 for scores. For pipeline work, a pre-navigation `addInitScript` that patches `HTMLImageElement.prototype.decode`, `IntersectionObserver` and `requestAnimationFrame`, plus `PerformanceObserver`s on `paint`/`largest-contentful-paint`/`longtask`/`layout-shift`/`resource`, a `MutationObserver` on `data-loaded`, and a rAF probe for `__reactFiber$` appearance (that is how hydration completion was timed).

Throttling profiles used for the numbers in §11a — state them, because "Slow 4G" is ambiguous:

| Profile | Down | Up | RTT | CPU |
|---|---|---|---|---|
| Slow 3G | 400 kbps | 400 kbps | 2000 ms | 4× |
| Fast 3G | 1.6 Mbps | 750 kbps | 562.5 ms | 4× |
| Slow 4G | 4 Mbps | 3 Mbps | 170 ms | 4× |
| Normal mobile | 10 Mbps | 5 Mbps | 60 ms | 2× |

**Always take a median of ≥3 runs.** A single run once showed eager-loading as *faster* than lazy; three runs showed the opposite consistently.

### Probe false positives — verify before reporting

Each of these was a confident-looking finding that turned out to be the instrument, not the site. Check for them before escalating:

- **"N elements are hidden on every viewport."** A constant count at every scroll position is the closed mobile-menu overlay (`visibility: hidden`, `position: fixed`), which is correct. Exclude `#mobile-menu` / `header` subtrees.
- **"This viewport is blank."** Counting only `h1–h4/p/li` misses content in `div`/`span`. Dump actual text nodes before calling anything blank.
- **"Images are served at `w=1280`."** Below-fold lazy images that haven't fetched yet report the fallback `src`. Read `currentSrc`, and only after the image has loaded.
- **"54% of the page is blank."** Logo images sit at exactly `opacity: 0.9`; a `> 0.9` threshold excludes them.
- **"Horizontal overflow at 320 px."** Usually the marquee's transform transient inside `overflow-hidden`. Use the containment-aware `scripts/overflow-check.mjs`, which reports 0 px.
- **"Nav links are unusable."** Don't count the closed overlay's hidden links.
- **Screenshot staleness.** If computed styles and screenshots disagree, trust `getComputedStyle` / `getBoundingClientRect` and use a fresh tab.

### Standing invariants

Re-verify these after any structural change; each was earned by fixing a real bug:

- CLS `0.0000`, 0 shift events, at 320/375/390/414/768.
- 0 long frames while scrolling the full page (currently 361 frames, 120 fps).
- SSR `opacity: 0` count ≤ 8, all `pointer-events: none`.
- All 17 sections present in the SSR HTML; `<h1>` present.
- 0 interactive targets under 44×44; 0 horizontal overflow.
- Menu opens on the first tap in < 150 ms under 4× CPU.
- No content-leak frames: the page reveals as one unit, never section by section.
