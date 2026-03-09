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
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
