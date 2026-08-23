import { ScrollProgress } from "@/components/nav/ScrollProgress";
import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Corridor } from "@/components/sections/Corridor";
import { Fleet } from "@/components/sections/Fleet";
import { Services } from "@/components/sections/Services";
import { ExtendedCapabilities } from "@/components/sections/ExtendedCapabilities";
import { TrustedPartners } from "@/components/sections/TrustedPartners";
import { EmployeeGrowth } from "@/components/sections/EmployeeGrowth";
import { FleetStrength } from "@/components/sections/FleetStrength";
import { Operations } from "@/components/sections/Operations";
import { Maintenance } from "@/components/sections/Maintenance";
import { Team } from "@/components/sections/Team";
import { Coverage } from "@/components/sections/Coverage";
import { WhyUs } from "@/components/sections/WhyUs";
import { Trust } from "@/components/sections/Trust";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/**
 * Every section is imported statically and rendered in one pass.
 *
 * These were briefly split with next/dynamic + Suspense to shave hydration
 * work. It cost more than it saved: the split chunks hydrated later, and
 * because the reveal primitives only become visible after hydration, those
 * sections stayed blank longer. The whole page ships and renders together.
 */
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
        <Services />
        <ExtendedCapabilities />
        <TrustedPartners />
        <EmployeeGrowth />
        <FleetStrength />
        <Operations />
        <Maintenance />
        <Team />
        <Coverage />
        <WhyUs />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
