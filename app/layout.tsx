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
    "Ethereum Classic's base-fee revenue is credited to the immutable Olympia Sovereignty Vault, which sweeps it to the Olympia Treasury, governed on-chain by Ethereum Classic's Olympia DAO.",
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
    "Live dashboard for Ethereum Classic's base-fee revenue: the Olympia Sovereignty Vault that receives it, and the Olympia Treasury that holds it under governance.",
  publisher: {
    "@type": "Organization",
    name: "Olympia Treasury",
    url: "https://olympiatreasury.org",
  },
};

export const metadata: Metadata = {
  title: {
    default: "Olympia Treasury — Base-Fee Revenue for Ethereum Classic",
    template: "%s | Olympia Treasury",
  },
  // Keep under ~155 chars; search results truncate.
  //
  // The old pair described one contract that both received the base fee and disbursed
  // it through governance. That is two contracts and it was the pre-respec design: the
  // immutable receiver is the ECIP-1112 Vault, and the thing that disburses is the
  // ECIP-1113 Timelock, which is emphatically not immutable. Keep them distinct here.
  description:
    "Live monitoring of Ethereum Classic's base-fee revenue: the immutable Sovereignty Vault that receives it, and the Treasury that holds it under on-chain governance.",
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
    "base fee",
    "Sovereignty Vault",
    "TimelockController",
    "miner rewards untouched",
    "block rewards",
    "EIP-1559",
    "ECIP-1111",
    "ECIP-1112",
    "ECIP-1113",
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
    title: "Olympia Treasury — Base-Fee Revenue for Ethereum Classic",
    description:
      "Live monitoring of the Sovereignty Vault that receives Ethereum Classic's base fee and the Treasury it sweeps into. Priority-fee tips and block rewards go to miners in full.",
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
    title: "Olympia Treasury — Base-Fee Revenue for Ethereum Classic",
    description:
      "Live monitoring of the Sovereignty Vault that receives Ethereum Classic's base fee and the Treasury it sweeps into. Priority-fee tips and block rewards go to miners in full.",
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
