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
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center border border-white/20 text-ink lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easing.expo }}
            className="overflow-hidden border-b border-white/10 bg-bg lg:hidden"
          >
            <motion.nav
              className="flex flex-col gap-6 px-6 py-8 text-lg text-ink"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="hover-line w-fit"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="text-idx w-fit text-sm text-acc"
              >
                Get a Quote →
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
