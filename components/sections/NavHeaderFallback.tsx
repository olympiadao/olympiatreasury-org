import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/nav-links";

/**
 * Server-rendered stand-in for NavHeader, which is client-only because it reads the
 * chain from a search param. Same shell and links, without the client-state controls.
 */
export function NavHeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-overlay)] backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/olympia-mark-light.svg"
            alt="Olympia"
            width={14}
            height={36}
            className="dark:hidden"
            priority
          />
          <Image
            src="/olympia-mark-dark.svg"
            alt=""
            aria-hidden="true"
            width={14}
            height={36}
            className="hidden dark:block"
            priority
          />
          <span className="text-base font-bold tracking-tight">
            Olympia <span className="text-[var(--brand-green)]">Treasury</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-green)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
