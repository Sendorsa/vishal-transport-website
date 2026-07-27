import { ScrollProgress } from "@/components/nav/ScrollProgress";
import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Corridor } from "@/components/sections/Corridor";
import { Fleet } from "@/components/sections/Fleet";
import { Services } from "@/components/sections/Services";
import { TrustedPartners } from "@/components/sections/TrustedPartners";
import { Team } from "@/components/sections/Team";
import { Coverage } from "@/components/sections/Coverage";
import { WhyUs } from "@/components/sections/WhyUs";
import { Trust } from "@/components/sections/Trust";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

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
        <TrustedPartners />
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
