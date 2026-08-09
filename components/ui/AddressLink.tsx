"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function AddressLink({
  address,
  explorer,
  truncate = false,
  className = "",
}: {
  address: string;
  explorer: string;
  truncate?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const shown = truncate ? `${address.slice(0, 6)}...${address.slice(-6)}` : address;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <a
        href={`${explorer}/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        title={address}
        className="break-all font-mono text-[var(--brand-green)] underline decoration-[var(--border-brand)] underline-offset-4 transition hover:decoration-[var(--brand-green)]"
      >
        {shown}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Address copied" : `Copy address ${address}`}
        className="shrink-0 rounded p-1 text-[var(--text-subtle)] transition hover:text-[var(--brand-green)]"
      >
        {copied ? (
          <Check size={14} aria-hidden="true" />
        ) : (
          <Copy size={14} aria-hidden="true" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Address copied to clipboard" : ""}
      </span>
    </span>
  );
}
