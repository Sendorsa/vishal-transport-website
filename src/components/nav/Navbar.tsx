"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { navLinks, site } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { easing } from "@/lib/motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The bar renders light-on-dark only while it floats over the hero. Once the
  // page is scrolled the white bar takes over, and while the mobile overlay is
  // open it paints solid white behind the bar — both need the dark-ink tokens.
  const lightBar = scrolled || open;

  // Lock the page behind the overlay. Scroll position is restored on close so
  // the user lands exactly where they left.
  useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  // Escape closes the menu — expected for any full-screen overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const [active, setActive] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 30));

  // Lock body scroll + close on Escape while the mobile overlay is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Scroll-spy: highlight the nav link for the section in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="theme-light fixed left-0 top-0 z-[60] w-full"
      initial={false}
      // .theme-light sets an opaque `background` on whatever it's applied
      // to — needed for its --ink/--acc/--hair custom properties, but the
      // header itself must stay see-through so only the dedicated blur
      // layer below controls what's visible (and can genuinely go
      // transparent pre-scroll). Inline style beats the class rule.
      style={{ backgroundColor: "transparent" }}
    >
      {/* Blurred bar background, isolated on its own layer — an animated
          backdrop-filter on the header itself would make it a containing
          block for the fixed-position mobile overlay below, clipping that
          overlay to the header's own (bar-height) box instead of the
          viewport. Keeping the filter off the header sidesteps that. */}
      <motion.div
        className="absolute inset-x-0 top-0 h-24 border-b"
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          borderBottomColor: scrolled
            ? "rgba(31,50,101,0.1)"
            : "rgba(31,50,101,0)",
        }}
        transition={{ duration: 0.5, ease: easing.gentle }}
      />

      <div
        className="relative mx-auto flex h-24 max-w-container items-center justify-between px-6 sm:px-10"
        style={
          {
            // Unscrolled, the bar is transparent and floats over the (dark)
            // hero — override the theme-light tokens to their dark-theme
            // equivalents so text stays legible until the solid white bar
            // takes over on scroll. Scoped to the bar row only (not the
            // header itself) so it never leaks into the mobile overlay,
            // which is always on its own solid white background.
            "--ink": lightBar ? undefined : "#f6f5f2",
            "--ink-2": lightBar ? undefined : "#adb2be",
            "--acc": lightBar ? undefined : "#42aef0",
            "--hair": lightBar ? undefined : "rgba(255,255,255,0.25)",
          } as CSSProperties
        }
      >
        {/* Both variants are stacked and cross-faded rather than swapped, so
            the bar never flashes an unpainted box mid-transition. The link
            carries the accessible name; the images are decorative. */}
        <a
          href="#top"
          aria-label={`${site.legalName} — home`}
          // z-70 for the same reason as the menu button: the mobile overlay is
          // a sibling at z-55, so anything in the bar row without its own
          // z-index gets painted over while the menu is open.
          // Padding grows the tap target to 46px without changing the mark's
          // size — the crossfade layers are absolute, so they must be measured
          // against an inner box, not the padded anchor.
          className="relative z-[70] -my-2 flex shrink-0 items-center py-2"
        >
          <span className="relative block h-[30px] w-[117px] sm:h-9 sm:w-[140px]">
            <motion.span
              className="absolute inset-0 block"
              animate={{ opacity: lightBar ? 1 : 0 }}
              transition={{ duration: 0.5, ease: easing.gentle }}
            >
              <Logo variant="full" height={36} priority className="h-full w-auto" />
            </motion.span>
            <motion.span
              className="absolute inset-0 block"
              animate={{ opacity: lightBar ? 0 : 1 }}
              transition={{ duration: 0.5, ease: easing.gentle }}
            >
              <Logo variant="mono" height={36} priority className="h-full w-auto" />
            </motion.span>
          </span>
        </a>

        <nav className="hidden items-center gap-10 text-[15px] lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 text-ink transition-colors hover:text-acc"
                style={{ color: isActive ? "var(--acc)" : undefined }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-acc"
                    transition={{ duration: 0.4, ease: easing.expo }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact" variant="line" size="sm">
            Get a Quote
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[70] flex h-12 w-12 items-center justify-center border border-hair text-ink lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: easing.smoothOut }}
            className="theme-light fixed inset-0 z-[55] lg:hidden"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="absolute inset-0 bg-neutral-white" />
            <motion.nav
              className="relative flex h-full flex-col justify-center gap-1 overflow-y-auto px-6 pb-10 pt-24"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.03 } },
              }}
            >
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.18, ease: easing.smoothOut },
                      },
                    }}
                    className="flex items-center justify-between border-b border-hair py-5 font-serif text-3xl font-light text-ink transition-colors active:text-acc"
                    style={{ color: isActive ? "var(--acc)" : undefined }}
                  >
                    {link.label}
                    <Icon name="arrow" className="h-5 w-5 opacity-40" />
                  </motion.a>
                );
              })}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.18, ease: easing.smoothOut },
                  },
                }}
                className="mt-10"
              >
                <Button
                  href="#contact"
                  arrow
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  Get a Quote
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
