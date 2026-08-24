"use client";

import { useEffect } from "react";
import { site } from "@/lib/content";

/**
 * Full-page branded startup cover.
 *
 * Server-rendered, so it paints with the first frame and never waits on React.
 * The site underneath is held at opacity 0 (not visibility:hidden) so layout
 * still resolves and images still download and decode while it is covered —
 * that is what lets the whole page appear at once, fully formed.
 *
 * Dismissal is gated on real signals, never a timer:
 *   1. hydration complete — this effect running IS that signal
 *   2. document.fonts.ready
 *   3. window load (all page resources; no image is lazy any more)
 *   4. decode() on EVERY image on the page, not just the first screen
 *
 * (3) and (4) together are what make the promise "the whole site is ready"
 * rather than "the first screen is ready". Because nothing is lazy, `load`
 * has already settled every image at the network layer by the time (4) runs,
 * so decoding is the only work left.
 *
 * FAILSAFE_MS is the one concession: a single hung request must not trap a
 * visitor behind the cover forever. It sits far past the honest worst case
 * (~17s for the full image set on Slow 3G) so it never fires on a real load.
 * Keep it in sync with the failsafe delays in globals.css.
 */
const FAILSAFE_MS = 25_000;

export function SiteLoader() {
  useEffect(() => {
    let done = false;
    let timer = 0;
    const reveal = () => {
      if (done) return;
      done = true;
      document.documentElement.setAttribute("data-loaded", "");
    };

    const fonts = document.fonts?.ready ?? Promise.resolve();

    const loadEvent =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) =>
            window.addEventListener("load", () => r(), { once: true }),
          );

    // EVERY image on the page. decode() resolves only once the bitmap is ready
    // to paint, so the reveal never lands on a half-drawn image — and a
    // rejection (404, decode failure) is swallowed rather than blocking, so a
    // single broken asset degrades to a gap instead of a stuck cover.
    const decoded = loadEvent.then(() =>
      Promise.all(
        [...document.querySelectorAll("img")].map((img) =>
          img.complete && img.naturalWidth > 0
            ? Promise.resolve()
            : img.decode().catch(() => undefined),
        ),
      ),
    );

    const ready = Promise.all([fonts, loadEvent, decoded]);
    const failsafe = new Promise<void>((r) => {
      timer = window.setTimeout(r, FAILSAFE_MS);
    });

    Promise.race([ready, failsafe]).then(() => {
      // Two frames after everything resolves, so the page underneath has
      // painted its final state before the cover lifts.
      requestAnimationFrame(() => requestAnimationFrame(reveal));
    });

    return () => {
      done = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div id="site-loader" aria-hidden="true">
      <div className="site-loader__inner">
        <div className="site-loader__mark" />

        {/* Rolling tyre: one element spins while its wrapper travels the road.
            Separating rotation from translation keeps both on the compositor. */}
        <div className="site-loader__road">
          <span className="site-loader__travel">
            <span className="site-loader__tyre" />
          </span>
        </div>

        <span className="site-loader__word">{site.tagline}</span>
      </div>
    </div>
  );
}
