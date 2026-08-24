import { footer, site } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark border-t border-hair pb-8 pt-16">
      <div className="mx-auto max-w-container px-6 sm:px-10">
        <Reveal variant="fadeUp" className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* Mono knockout: the navy emblem would vanish on this section. */}
            <Logo
              variant="mono"
              height={40}
              sizes="156px"
              alt={`${site.legalName} logo`}
            />
            <p className="mt-5 max-w-xs text-sm text-ink-muted">{footer.blurb}</p>
            <div className="mt-6 flex gap-3">
              {footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center border border-hair transition-colors hover:border-acc hover:text-acc"
                >
                  <Icon name={s.name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-idx text-xs text-acc">Quick Links</h3>
            <ul className="mt-4 text-sm text-ink-muted">
              {footer.quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover-line block w-fit min-w-[44px] py-3">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-idx text-xs text-acc">Services</h3>
            <ul className="mt-6 space-y-4 text-sm text-ink-muted">
              {footer.servicesList.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-idx text-xs text-acc">Locations</h3>
            <ul className="mt-6 space-y-5 text-sm text-ink-muted">
              {footer.locations.map((loc) => (
                <li key={loc.zip}>
                  <span className="text-ink">{loc.city}</span>
                  <br />
                  {loc.zip}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hair pt-8 text-xs text-ink-muted sm:flex-row">
          <p>© {year} {site.legalName} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
