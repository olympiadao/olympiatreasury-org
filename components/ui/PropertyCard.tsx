import { ArrowUpRight, type LucideIcon } from "lucide-react";

export function PropertyCard({
  icon: Icon,
  name,
  description,
  href,
}: {
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--divider)] p-5 transition-all duration-200 hover:border-[var(--border-strong)]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-green-subtle)]">
        <Icon size={20} aria-hidden="true" className="text-[var(--brand-green)]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{name}</p>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
          {description}
        </p>
      </div>
      <ArrowUpRight
        size={16}
        aria-hidden="true"
        className="shrink-0 text-[var(--text-subtle)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--brand-green)]"
      />
    </a>
  );
}
