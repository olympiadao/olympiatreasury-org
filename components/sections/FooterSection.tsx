import { ExternalLink } from "lucide-react";

const links = [
  {
    label: "OlympiaDAO",
    href: "https://olympiadao.org",
  },
  {
    label: "Framework",
    href: "https://github.com/olympiadao/olympia-framework",
  },
  {
    label: "GitHub",
    href: "https://github.com/olympiadao",
  },
];

export function FooterSection() {
  return (
    <footer className="border-t border-[var(--border-default)] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--text-subtle)]">
          CC0 — No rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
            >
              {link.label}
              <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
