"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ChainSelector } from "@/components/chain-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { useChainConfig } from "@/lib/hooks/use-chain-config";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Upgrade", href: "/upgrade", page: true },
  { label: "Olympia DAO", href: "https://olympiadao.org", external: true },
];

export function NavHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const config = useChainConfig();

  const badgeLabel = `Demo v0.3 \u00b7 ${config.name}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-overlay)] backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Olympia" width={36} height={36} />
          <span className="text-lg font-bold tracking-tight">OLYMPIA</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--brand-green)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--brand-green)]" />
            {badgeLabel}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {navLinks.map((link) =>
              link.page ? (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--brand-green)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--brand-green)]"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>
          <ChainSelector />
          <ThemeToggle />
          <a
            href="https://app.olympiadao.org"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--brand-green)] px-5 py-2 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:brightness-110"
          >
            Launch App
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--border-default)] bg-[var(--background)] px-6 py-4 md:hidden">
          <div className="mb-4 flex items-center gap-3">
            <ChainSelector />
            <ThemeToggle />
          </div>
          <ul className="flex flex-col list-none m-0 p-0">
            {navLinks.map((link) =>
              link.page ? (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
                    onClick={() => setMobileOpen(false)}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
