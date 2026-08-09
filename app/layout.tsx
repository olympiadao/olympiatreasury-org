import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Providers } from "@/lib/providers";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Olympia Treasury",
  alternateName: "OlympiaTreasury",
  url: "https://olympiatreasury.org",
  logo: "https://olympiatreasury.org/android-chrome-512x512.png",
  description:
    "The Olympia Treasury is a protocol-controlled vault for Ethereum Classic funded by EIP-1559 basefee revenue. Governed on-chain by the Olympia DAO.",
  foundingDate: "2025",
  sameAs: [
    "https://olympiadao.org",
    "https://app.olympiadao.org",
    "https://github.com/olympiadao",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Olympia Treasury",
  url: "https://olympiatreasury.org",
  description:
    "Real-time dashboard for the Olympia Treasury — the protocol-controlled vault for Ethereum Classic funded by EIP-1559 basefee revenue.",
  publisher: {
    "@type": "Organization",
    name: "Olympia Treasury",
    url: "https://olympiatreasury.org",
  },
};

export const metadata: Metadata = {
  title: {
    default: "Olympia Treasury — Sovereignty Vault for Ethereum Classic",
    template: "%s | Olympia Treasury",
  },
  // Keep under ~155 chars; search results truncate.
  description:
    "An immutable, protocol-controlled vault that receives Ethereum Classic's EIP-1559 base fee revenue and disburses it only through on-chain governance.",
  keywords: [
    "Ethereum Classic",
    "ETC",
    "Olympia",
    "Treasury",
    "protocol funding",
    "non-inflationary",
    "smart contract",
    "on-chain governance",
    "Olympia DAO",
    "CoreNFT",
    "soulbound governance token",
    "Olympia Funding Proposal",
    "OFP",
    "basefee",
    "miner rewards untouched",
    "block rewards",
    "EIP-1559",
    "ECIP-1112",
    "ECIP-1121",
    "ECIP-1122",
    "Glamsterdam",
    "Fusaka",
    "EVM upgrade",
    "EVM compatibility",
    "MiCA",
    "FSA Green List",
    "digital commodity",
    "decentralized asset",
    "regulated stablecoin",
    "Japan crypto-asset",
    "CLARITY Act",
    "GENIUS Act",
    "Dencun",
    "Pectra",
    "Solidity compatibility",
    "Glamsterdam EVM alignment",
    "Glamsterdam EVM",
    "Foundry ETC",
    "Hardhat ETC",
    "wagmi ETC",
    "EVM tooling",
  ],
  authors: [
    { name: "Cody Burns", url: "https://github.com/realcodywburns" },
    { name: "Chris Mercer", url: "https://github.com/chris-mercer" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://olympiatreasury.org",
    siteName: "Olympia Treasury",
    title: "Olympia Treasury — Sovereignty Vault for Ethereum Classic",
    description:
      "Live monitoring of the core development vault. Base fee revenue funds the treasury; priority-fee tips and block rewards go to miners in full.",
    images: [
      {
        url: "https://olympiatreasury.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Olympia Treasury",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olympia Treasury — Sovereignty Vault for Ethereum Classic",
    description:
      "Live monitoring of the core development vault. Base fee revenue funds the treasury; priority-fee tips and block rewards go to miners in full.",
    images: ["https://olympiatreasury.org/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  // "./" not an absolute URL: alternates is inherited, and an absolute value would
  // stamp this canonical onto every child route.
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  metadataBase: new URL("https://olympiatreasury.org"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--brand-green)] focus:px-4 focus:py-2 focus:text-[var(--background)] focus:outline-none"
          >
            Skip to main content
          </a>
          <Providers>
            <div id="main-content">{children}</div>
          </Providers>
        </ThemeProvider>
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "5d05d742738e43a2976bd963478ca71b"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
