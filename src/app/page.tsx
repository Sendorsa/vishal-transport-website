import { Suspense } from "react";
import dynamic from "next/dynamic";

import { ScrollProgress } from "@/components/nav/ScrollProgress";
import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Corridor } from "@/components/sections/Corridor";
import { Fleet } from "@/components/sections/Fleet";
import { ExtendedCapabilities } from "@/components/sections/ExtendedCapabilities";
import { EmployeeGrowth } from "@/components/sections/EmployeeGrowth";
import { FleetStrength } from "@/components/sections/FleetStrength";
import { Maintenance } from "@/components/sections/Maintenance";
import { Team } from "@/components/sections/Team";
import { WhyUs } from "@/components/sections/WhyUs";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/**
 * Below-the-fold interactive sections are split out.
 *
 * Every one of these is a client component, and until they had all downloaded
 * and hydrated, React had not attached a single event handler anywhere on the
 * page — including the navbar's menu button, which is server-rendered and so
 * *looks* ready roughly two seconds before it actually is. Splitting them into
 * their own chunks keeps that work off the critical path.
 *
 * `ssr` stays on: the markup is still server-rendered, so content, SEO and
 * layout are unchanged. Only the JavaScript is deferred.
 */
const Services = dynamic(() =>
  import("@/components/sections/Services").then((m) => m.Services),
);
const TrustedPartners = dynamic(() =>
  import("@/components/sections/TrustedPartners").then((m) => m.TrustedPartners),
);
const Operations = dynamic(() =>
  import("@/components/sections/Operations").then((m) => m.Operations),
);
const Coverage = dynamic(() =>
  import("@/components/sections/Coverage").then((m) => m.Coverage),
);
const Trust = dynamic(() =>
  import("@/components/sections/Trust").then((m) => m.Trust),
);

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="top">
        <Hero />
        <About />
        <Corridor />
        <Fleet />
        {/* Each boundary is its own hydration unit, so React can hydrate the
            navbar first and yield between sections instead of blocking on one
            long uninterruptible pass. */}
        <Suspense>
          <Services />
        </Suspense>
        <ExtendedCapabilities />
        <Suspense>
          <TrustedPartners />
        </Suspense>
        <EmployeeGrowth />
        <FleetStrength />
        <Suspense>
          <Operations />
        </Suspense>
        <Maintenance />
        <Team />
        <Suspense>
          <Coverage />
        </Suspense>
        <WhyUs />
        <Suspense>
          <Trust />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
