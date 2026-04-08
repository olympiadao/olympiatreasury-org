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

export const metadata: Metadata = {
  title: {
    default: "Olympia Treasury — Protocol-Controlled Vault for Ethereum Classic",
    template: "%s | Olympia Treasury",
  },
  description:
    "The Olympia Treasury is an immutable, protocol-controlled vault that receives EIP-1559 basefee revenue and disburses funds through on-chain governance. Non-inflationary, transparent, and auditable.",
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
    "basefee",
    "miner rewards untouched",
    "block rewards",
    "EIP-1559",
    "ECIP-1112",
    "ECIP-1121",
    "Fusaka",
    "EVM upgrade",
    "EVM compatibility",
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
    title: "Olympia Treasury — Protocol-Controlled Vault for Ethereum Classic",
    description:
      "Immutable, non-inflationary vault for Ethereum Classic protocol revenue. Governed by Olympia DAO on Ethereum Classic.",
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
    title: "Olympia Treasury — Protocol-Controlled Vault for Ethereum Classic",
    description:
      "Immutable, non-inflationary vault for Ethereum Classic protocol revenue. Governed by Olympia DAO on Ethereum Classic.",
    images: ["https://olympiatreasury.org/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Providers>{children}</Providers>
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
