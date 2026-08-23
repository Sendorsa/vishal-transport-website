"use client";

import { useEffect } from "react";
import { site } from "@/lib/content";

/**
 * Branded first-paint screen.
 *
 * Rendered on the server, so the markup is in the initial HTML and paints with
 * the first frame — it does not wait for React. Dismissal is the only part that
 * needs JavaScript.
 *
 * Why the dismissal runs in an effect rather than an inline script: writing the
 * flag before React hydrates would put an attribute on <html> that the server
 * never rendered, which is exactly the hydration mismatch we fixed on the mobile
 * menu. Running it post-hydration also makes "ready" mean something honest —
 * markup painted, CSS applied, fonts resolved, and the page actually
 * interactive.
 *
 * A pure-CSS failsafe in globals.css retires the loader at 6s regardless, so a
 * JS failure or a stalled font can never trap the visitor behind it.
 */
export function SiteLoader() {
  useEffect(() => {
    let cancelled = false;

    const reveal = () => {
      if (cancelled) return;
      document.documentElement.setAttribute("data-loaded", "");
    };

    // Fonts are the last thing that changes the hero's appearance. They use
    // display:optional, so they either arrive quickly or are skipped for this
    // view — a 500ms cap is generous.
    const cap = window.setTimeout(reveal, 500);
    const fonts = document.fonts?.ready ?? Promise.resolve();

    fonts.then(() => {
      // One frame after fonts resolve, so the hero paints its final text
      // metrics underneath before we fade the cover away.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          window.clearTimeout(cap);
          reveal();
        }),
      );
    });

    return () => {
      cancelled = true;
      window.clearTimeout(cap);
    };
  }, []);

  return (
    <div id="site-loader" aria-hidden="true">
      <div className="site-loader__inner">
        <div className="site-loader__mark" />
        <div className="site-loader__road">
          <span className="site-loader__sweep" />
        </div>
        <span className="site-loader__word">{site.tagline}</span>
      </div>
    </div>
  );
}
