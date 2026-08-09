import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Olympia Treasury",
    short_name: "Treasury",
    description:
      "Protocol-controlled vault for Ethereum Classic basefee revenue",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f10",
    theme_color: "#0a0f10",
    // icon-maskable-512.png is emitted square at a 0.45 inset. The plain tiles have
    // transparent rounded corners a squircle mask can expose, so they stay "any".
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
