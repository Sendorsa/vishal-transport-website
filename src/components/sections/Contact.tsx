import { contact, site } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/85 to-brand-navy" />

      <div className="relative mx-auto max-w-container px-6 sm:px-10">
        <SectionHeading index={contact.index} title={contact.title} />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal variant="slideRight" className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal variant="slideLeft" delay={0.1} className="space-y-8 lg:col-span-4 lg:col-start-9">
            <div>
              <div className="text-idx text-[11px] text-ink-muted">Call</div>
              <a
                href={site.phoneHref}
                className="hover-line mt-1 inline-block py-2 font-serif text-2xl font-light"
              >
                {site.phone}
              </a>
            </div>
            <div>
              <div className="text-idx text-[11px] text-ink-muted">Email</div>
              <a
                href={site.emailHref}
                className="hover-line mt-1 inline-block break-all py-2 font-serif text-2xl font-light"
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
