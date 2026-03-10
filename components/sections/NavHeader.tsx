"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Fund Flow", href: "#fund-flow" },
  { label: "Invariants", href: "#invariants" },
  { label: "Contracts", href: "#contracts" },
  { label: "OlympiaDAO", href: "https://olympiadao.org", external: true },
  {
    label: "GitHub",
    href: "https://github.com/olympiadao",
    external: true,
  },
];

export function NavHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-overlay)] backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Olympia" width={36} height={36} />
          <span className="text-lg font-bold tracking-tight">
            TREASURY
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--brand-green)]"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://etc.blockscout.com/address/0xd6165F3aF4281037bce810621F62B43077Fb0e37"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--brand-green)] px-5 py-2 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:brightness-110"
          >
            View on Explorer
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--border-default)] bg-[var(--background)] px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
              onClick={() => setMobileOpen(false)}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
