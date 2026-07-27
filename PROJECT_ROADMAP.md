# PROJECT_ROADMAP.md — Vishal Group

Remaining work to take the site from "migrated & building" to **premium, enterprise-grade, production-launched.**

**How to read this**
- **Effort** is T-shirt sized: **S** ≈ ≤2h · **M** ≈ ½–1 day · **L** ≈ 1–2 days · **XL** ≈ 3+ days.
- **Dependencies** reference other milestones by number. A milestone with no hard dependency can start now.
- Milestones are ordered by recommended sequence, but M1, M9–M12 are largely parallelizable.
- Every DoD assumes the baseline gate in `CLAUDE.md` §12 (clean build, tokens/variants reused, reduced-motion + a11y respected).

**Critical path:** M0 → M1 → (M2–M7 section work) → M8 → M9 → M13.
Cross-cutting quality (M10 SEO, M11 A11y, M12 Mobile) runs alongside section work and must all be green before M13.

---

## M0 — Foundation & Cleanup
**Objective:** Remove the structural debt flagged in the lead audit so every later milestone is cheaper and more consistent.

**Tasks**
- Extract a `<SectionHeading index title />` primitive; replace the ~7 duplicated eyebrow+title blocks.
- Add a committed **ESLint flat config** (so lint rules are enforced, not implicit).
- Strip scroll parallax from sub-64px decorative images (`WhyUs` thumbnails); reserve `ParallaxImage`'s scroll motion for hero-scale visuals.
- Gate the hero ken-burns with `useInView` so it pauses off-screen.
- Add `not-found.tsx` and a root error boundary.

**Dependencies:** none.
**Effort:** M
**Definition of done:** No duplicated section-header markup; `npm run lint` passes on a real config; no infinite animation runs off-screen; 404/error routes render on-brand.

---

## M1 — Branding
**Objective:** Lock the visual identity so all section refinement builds on a final foundation, not a moving target.

**Tasks**
- Finalize logo/wordmark (replace the temporary "VG" mark in `Navbar`/`Footer`).
- Confirm the color system in `tailwind.config.ts` + `globals.css` (dark/light `acc`, `ink`, `hair`) against real brand guidelines; adjust tokens centrally if needed.
- Audit + trim font weights in `layout.tsx` to only those actually used.
- Add favicon set, `apple-touch-icon`, and a designed OG/Twitter share image (`opengraph-image`).

**Dependencies:** M0 (tokens/primitives stable).
**Effort:** M
**Definition of done:** Real logo in place; palette + type confirmed and driven entirely by tokens; favicons + OG image ship and preview correctly in link unfurls.

---

## M2 — Hero Refinement
**Objective:** Make the first screen unmistakably premium — the highest-impact surface.

**Tasks**
- Replace hero placeholder with real photography/video via `next/image` (or optimized `<video>`), preserving the ken-burns + scroll parallax.
- Tune the line-by-line `MaskText` timing and CTA stagger against real imagery.
- Verify LCP element is the hero and is prioritized (`priority` on the image).

**Dependencies:** M1 (branding), M6-image-abstraction pattern (see M3 note), real hero asset.
**Effort:** M
**Definition of done:** Hero uses a real, optimized asset; motion reads as cinematic at 60 FPS on mid-tier mobile; LCP is the hero and is measurably fast.

---

## M3 — Services
**Objective:** Elevate the editorial services rows and establish the reusable **image abstraction** all other sections will reuse.

**Tasks**
- Build the `next/image` wrapper inside `ParallaxImage` (blur-up, responsive `srcset`) — this is the shared pattern for M2, M4, M5, M7.
- Drop real photography into the three service rows.
- Confirm hover choreography (row lift/tint, arrow slide) still feels intentional with real images.

**Dependencies:** M0, M1.
**Effort:** L (carries the image-abstraction cost for the whole project)
**Definition of done:** `ParallaxImage` renders real optimized images with graceful placeholder fallback; service rows use real assets; the abstraction is documented and adopted by later sections.

---

## M4 — Fleet
**Objective:** Make the statistics section feel substantiated, not decorative.

**Tasks**
- Verify the eased `Counter` values against real, current figures in `content.ts`.
- Optionally back numbers with real fleet imagery using the M3 abstraction.
- Confirm reveal variety (slide/scale mix) reads well beside neighboring sections.

**Dependencies:** M3 (image abstraction, if imagery added).
**Effort:** S
**Definition of done:** Numbers are accurate and animate once, eased, from zero; section reads distinct from its neighbors.

---

## M5 — Trusted Partners
**Objective:** Turn the placeholder gallery into a credible client/industry showcase, and fix its structural fragility.

**Tasks**
- Replace the hardcoded `220vh` pin height with a value derived from measured track width (scroll speed should track content, not a magic number).
- Add real industry/partner imagery (and logos if provided) via the M3 abstraction.
- Re-test the desktop pinned scroll and the mobile snap-carousel fallback + reduced-motion path.

**Dependencies:** M3.
**Effort:** M
**Definition of done:** Horizontal scroll distance derives from content; real imagery in place; all three modes (pinned / mobile snap / reduced-motion) verified.

---

## M6 — Team (Leadership)
**Objective:** Give the leadership section a real, human presence.

**Tasks**
- Add the real MD/leadership portrait via the M3 abstraction.
- Confirm the pull-quote is a final, approved statement in `content.ts`.
- Tune the blur/slide reveal against the real portrait.

**Dependencies:** M3, real portrait + approved quote.
**Effort:** S
**Definition of done:** Real portrait and finalized quote; reveal motion respects reduced-motion; section feels handcrafted, not placeholder.

---

## M7 — Coverage
**Objective:** Sharpen the map/coverage story.

**Tasks**
- Validate addresses, GSTINs, and pin coordinates against source data.
- Refine the SVG route-draw timing; consider a more accurate corridor path if brand wants geographic fidelity.
- Confirm pin reveal choreography on mobile.

**Dependencies:** M0.
**Effort:** S–M
**Definition of done:** Data verified correct; route + pins animate cleanly once, reduced-motion-safe; layout holds on small screens.

---

## M8 — Contact Form
**Objective:** Ship a fully working, trustworthy inquiry pipeline.

**Tasks**
- Provision Resend: verify sending domain, set `CONTACT_FROM_EMAIL`/`CONTACT_TO_EMAIL`, add `RESEND_API_KEY` to the deploy env.
- Add spam protection (honeypot and/or rate limiting) and success/error UX polish.
- Confirm `aria-live` status messaging and non-color error signaling (from M11).
- End-to-end test: real submission lands in the destination inbox.

**Dependencies:** M11 (a11y for the form), Resend account + verified domain.
**Effort:** M
**Definition of done:** A real submission is delivered via Resend in production; validation, spam guard, and accessible status feedback all work; stub fallback still functions without a key.

---

## M9 — Performance
**Objective:** Hit premium-feel performance budgets on real hardware.

**Tasks**
- Run Lighthouse + Web Vitals; set budgets (target LCP < 2.5s, CLS < 0.1, INP < 200ms).
- Audit First Load JS; confirm the server/client boundary is tight and no section over-instruments scroll.
- Verify all imagery is optimized (`next/image`, correct sizes, lazy where appropriate).
- Profile motion for 60 FPS (transform/opacity only, no layout thrash).

**Dependencies:** M2–M7 (real assets in place), M3 (image abstraction).
**Effort:** M
**Definition of done:** Lighthouse mobile perf ≥ 90; Core Web Vitals within budget on a mid-tier device; no dropped frames in scroll/reveal profiling.

---

## M10 — SEO
**Objective:** Maximize discoverability and correct rich-result rendering.

**Tasks**
- Add `sitemap.ts` and `robots.ts`.
- Validate the `MovingCompany` JSON-LD against Google's Rich Results test; expand structured data if warranted.
- Confirm canonical, Open Graph, and Twitter metadata (OG image from M1).
- Semantic heading hierarchy audit (single `h1`, ordered headings).

**Dependencies:** M1 (OG image).
**Effort:** S–M
**Definition of done:** Sitemap + robots served; structured data passes validation with no errors; social unfurls render the designed card; heading order is correct.

---

## M11 — Accessibility
**Objective:** Meet WCAG 2.1 AA; accessibility is a requirement, not a pass.

**Tasks**
- Add `aria-live` to the contact form status; ensure errors aren't color-only.
- Add `aria-labelledby` linking sections to their headings; verify landmark structure.
- Keyboard-nav pass (focus order, visible focus, accordion/nav/menu operable); `aria-expanded` correctness.
- Contrast audit for gold-on-dark/light and muted text.
- Verify `prefers-reduced-motion` across every animated primitive.

**Dependencies:** M0 (SectionHeading enables consistent `aria-labelledby`).
**Effort:** M
**Definition of done:** Automated axe scan clean; full keyboard operability; AA contrast met; reduced-motion verified everywhere; screen-reader pass on nav, form, and accordion.

---

## M12 — Mobile Polish
**Objective:** Make the small-screen experience feel as handcrafted as desktop.

**Tasks**
- Real-device pass (iOS Safari, Android Chrome): tap targets ≥ 44px, safe-area insets, no horizontal overflow.
- Verify the mobile nav drawer, gallery snap-carousel, and section rhythm on narrow viewports.
- Confirm fluid `clamp()` type scales cleanly; retune section padding if cramped.

**Dependencies:** M2–M7.
**Effort:** M
**Definition of done:** No overflow or layout breakage 320px–430px; all interactions comfortable on touch; motion smooth on real mid-tier phones.

---

## M13 — Deployment
**Objective:** Launch to production, repeatably and observably.

**Tasks**
- Configure Vercel project, production env vars (Resend, contact emails), and custom domain + HTTPS.
- Set up preview deployments per branch and a basic CI gate (build + lint must pass).
- Add analytics + error monitoring; configure security headers.
- Final pre-launch checklist: all cross-cutting milestones (M9–M12) green.

**Dependencies:** M8, M9, M10, M11, M12.
**Effort:** M
**Definition of done:** Live on the production domain over HTTPS; contact form delivers in prod; CI blocks broken builds; analytics/monitoring reporting; launch checklist signed off.

---

## Sequencing summary

1. **Now:** M0 (foundation) → M1 (branding).
2. **Then, gated on real assets:** M3 first (it builds the shared image abstraction), then M2, M4–M7 in parallel as assets arrive.
3. **Alongside section work:** M10 (SEO), M11 (A11y) — both mostly asset-independent.
4. **After sections have real content:** M8 (form), M9 (perf), M12 (mobile).
5. **Last:** M13 (deployment), gated on M9–M12 being green.

**Biggest external unblock:** real photography. It gates M2, M3, M5, M6 and the meaningful parts of M9/M12. Everything else we can drive independently.
