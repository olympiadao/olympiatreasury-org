import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/lib/providers";
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
    "The Olympia Treasury (ECIP-1112) is an immutable, protocol-controlled vault that receives EIP-1559 basefee revenue and disburses funds through on-chain governance. Non-inflationary, transparent, and auditable.",
  keywords: [
    "Ethereum Classic",
    "ETC",
    "Olympia",
    "Treasury",
    "ECIP-1112",
    "BASEFEE",
    "protocol funding",
    "non-inflationary",
    "smart contract",
    "on-chain governance",
    "public goods",
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
      "Immutable, non-inflationary vault for ETC protocol revenue. ECIP-1112.",
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
      "Immutable, non-inflationary vault for ETC protocol revenue. ECIP-1112.",
    images: ["https://olympiatreasury.org/og-image.png"],
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
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
