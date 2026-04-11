import Image from "next/image";
import { Github } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t border-[var(--border-default)] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Olympia" width={28} height={28} />
            <span className="text-sm font-semibold tracking-tight text-[var(--text-muted)]">
              OLYMPIA TREASURY
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://ethereumclassicdao.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
            >
              Ethereum Classic DAO
            </a>
            <a
              href="https://olympiadao.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
            >
              Olympia DAO
            </a>
            <a
              href="https://app.olympiadao.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
            >
              Governance App
            </a>
            <a
              href="https://github.com/olympiadao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
              aria-label="GitHub"
            >
              <Github size={20} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-[var(--text-subtle)]">
          Protocol-funded treasury infrastructure for the Ethereum Classic network.
        </p>
      </div>
    </footer>
  );
}
