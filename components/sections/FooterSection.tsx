import { Github } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t border-[var(--border-default)] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <span className="text-sm font-semibold tracking-tight text-[var(--text-muted)]">
            OLYMPIA TREASURY
          </span>

          <div className="flex items-center gap-6">
            <a
              href="https://olympiadao.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
            >
              OlympiaDAO
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
              href="https://github.com/olympiadao/olympia-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
            >
              Framework
            </a>
            <a
              href="https://github.com/olympiadao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-[var(--text-subtle)]">
          A community-driven initiative for Ethereum Classic protocol funding.
        </p>
      </div>
    </footer>
  );
}
