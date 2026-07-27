"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { navLinks, site } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { easing } from "@/lib/motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
      className="theme-dark fixed left-0 top-0 z-[60] w-full"
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(11,11,12,0.82)" : "rgba(11,11,12,0)",
        backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
        borderBottomColor: scrolled
          ? "rgba(255,255,255,0.1)"
          : "rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.5, ease: easing.gentle }}
      style={{ borderBottomWidth: 1 }}
    >
      <div className="mx-auto flex h-24 max-w-container items-center justify-between px-6 sm:px-10">
        <a href="#top" className="flex items-center gap-3">
          <span className="text-idx text-xs text-acc">VG</span>
          <span className="text-idx hidden text-[11px] text-ink opacity-70 sm:block">
            Vishal&nbsp;Group
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
          className="relative z-[70] flex h-12 w-12 items-center justify-center border border-white/20 text-ink lg:hidden"
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
            transition={{ duration: 0.3, ease: easing.gentle }}
            className="theme-dark fixed inset-0 z-[55] lg:hidden"
          >
            <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-xl" />
            <motion.nav
              className="relative flex h-full flex-col justify-center gap-1 overflow-y-auto px-6 pb-10 pt-24"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
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
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0 },
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
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
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
