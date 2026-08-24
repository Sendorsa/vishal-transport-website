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
 *   3. decode() on every above-the-fold image
 *   4. window load (all critical page resources)
 *
 * A CSS failsafe retires the cover regardless, so a stalled font or a JS
 * failure can never trap a visitor behind it.
 */
export function SiteLoader() {
  useEffect(() => {
    let done = false;
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

    // Above-the-fold set: every image whose box intersects the first viewport.
    // decode() resolves only once the bitmap is ready to paint, so the reveal
    // never lands on a half-drawn image.
    const decoded = loadEvent.then(() => {
      const aboveFold = [...document.querySelectorAll("img")].filter((img) => {
        const r = img.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0 && r.width > 0;
      });
      return Promise.all(
        aboveFold.map((img) =>
          img.complete && img.naturalWidth > 0
            ? Promise.resolve()
            : img.decode().catch(() => undefined),
        ),
      );
    });

    Promise.all([fonts, loadEvent, decoded]).then(() => {
      // Two frames after everything resolves, so the page underneath has
      // painted its final state before the cover lifts.
      requestAnimationFrame(() => requestAnimationFrame(reveal));
    });

    return () => {
      done = true;
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
