import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vishal-transport.com"),
  title: "Vishal Group — We Move Industry",
  description:
    "Vishal Group is a transportation and manpower partner for the automobile and manufacturing sectors in Hosur, Tamil Nadu and Bengaluru, Karnataka. 200+ vehicles, 2,000+ skilled employees, ten years on the road.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Vishal Group",
    title: "Vishal Group — We Move Industry",
    description:
      "A transportation and manpower partner for manufacturing operations across Tamil Nadu and Karnataka.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Group — We Move Industry",
    description:
      "Staff transportation, cargo management and manpower consulting for manufacturing companies in Hosur and Bengaluru.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Vishal Transport and HR Solutions",
  alternateName: "Vishal Group",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
