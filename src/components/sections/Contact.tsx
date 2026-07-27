import { contact, site } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="theme-dark relative overflow-hidden border-t border-hair py-section-y lg:py-section-y-lg"
    >
      <div className="absolute inset-0 opacity-25">
        <ParallaxImage className="h-full w-full" hover={0} reveal={false} parallax={30} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/85 to-brand-black" />
      <span className="text-idx absolute right-6 top-8 text-[9px] opacity-40 sm:right-10">
        {contact.shotBrief}
      </span>

      <div className="relative mx-auto max-w-container px-6 sm:px-10">
        <Reveal as="span" variant="fadeUp" className="text-idx block text-xs text-acc">
          {contact.index}
        </Reveal>
        <Reveal variant="fadeUp" delay={0.08} as="h2" className="mt-7 font-serif text-display-lg font-light">
          {contact.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal variant="slideRight" className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal variant="slideLeft" delay={0.1} className="space-y-8 lg:col-span-4 lg:col-start-9">
            <div>
              <div className="text-idx text-[11px] text-ink-muted">Call</div>
              <a
                href={site.phoneHref}
                className="hover-line mt-2 inline-block font-serif text-2xl font-light"
              >
                {site.phone}
              </a>
            </div>
            <div>
              <div className="text-idx text-[11px] text-ink-muted">Email</div>
              <a
                href={site.emailHref}
                className="hover-line mt-2 inline-block break-all font-serif text-2xl font-light"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
