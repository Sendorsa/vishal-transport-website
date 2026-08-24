import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "optional",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "optional",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vishal-transport.com"),
  title: "Vishal Transport — Transportation & HR Solutions",
  description:
    "Vishal Transport and HR Solutions Pvt. Ltd. is a transportation and manpower partner for the automobile and manufacturing sectors in Hosur, Tamil Nadu and Bengaluru, Karnataka. 300+ vehicles, 550+ skilled employees, fourteen years on the road.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Vishal Transport",
    title: "Vishal Transport — Transportation & HR Solutions",
    description:
      "A transportation and manpower partner for manufacturing operations across Tamil Nadu and Karnataka.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Transport — Transportation & HR Solutions",
    description:
      "Staff transportation, cargo management and manpower consulting for manufacturing companies in Hosur and Bengaluru.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F3265",
};

/**
 * Runs before hydration and owns the mobile menu.
 *
 * The menu button is server-rendered, so on a mid-range phone it is visible
 * and tappable-looking about two seconds before React attaches any handler —
 * taps in that window did nothing, which is why the menu "sometimes didn't
 * open". Delegating from `document` means this works the moment the parser
 * reaches it, with no dependency on the React bundle at all.
 */
const menuBootstrap = `
(function(){
  var d=document.documentElement;
  function set(open){
    /* Absence of the attribute IS the closed state. Writing
       data-menu-open="false" here would put an attribute on <html> that the
       server never rendered, and React reports that as a hydration mismatch
       (it explicitly does not patch attribute mismatches). */
    if(open) d.setAttribute('data-menu-open','true');
    else d.removeAttribute('data-menu-open');
    var b=document.getElementById('menu-toggle');
    if(b){
      b.setAttribute('aria-expanded', open?'true':'false');
      b.setAttribute('aria-label', open?'Close menu':'Open menu');
    }
  }
  document.addEventListener('click',function(e){
    var t=e.target;
    if(!t||!t.closest) return;
    if(t.closest('#menu-toggle')){
      set(!d.hasAttribute('data-menu-open'));
      return;
    }
    if(t.closest('#mobile-menu a')) set(false);
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape') set(false);
  });
})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Vishal Transport and HR Solutions Pvt. Ltd.",
  alternateName: "Vishal Transport",
  email: "vishaladml1@gmail.com",
  telephone: "+91-9994391696",
  areaServed: ["Hosur", "Bengaluru", "Tamil Nadu", "Karnataka"],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "#2/158 Upparapalli Village, Hosur to Thally Main Road",
      addressLocality: "Hosur",
      addressRegion: "Tamil Nadu",
      postalCode: "635114",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "C12B, Sarjapura Attibele Road, Indiabele Village, Anekal Taluk",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "562107",
      addressCountry: "IN",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: menuBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
