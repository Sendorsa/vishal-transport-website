import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    // Short trading name for the installed-app label; full legal name where
    // there is room for it.
    name: "Vishal Transport and HR Solutions Pvt. Ltd.",
    short_name: "Vishal Transport",
    description:
      "Staff transportation, cargo management, warehousing and manpower consulting for manufacturing operations across Tamil Nadu and Karnataka.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1F3265",
    icons: [{ src: "/icon.png", sizes: "218x218", type: "image/png" }],
  };
}
