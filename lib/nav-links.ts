/**
 * Kept out of NavHeader: exports of a "use client" module become client references
 * when a server component imports them, so mapping over them throws at prerender.
 */
export type NavLink = {
  label: string;
  href: string;
  /** An internal route rather than an on-page anchor. */
  page?: boolean;
  external?: boolean;
};

export const navLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Upgrade", href: "/upgrade", page: true },
  { label: "Olympia DAO", href: "https://olympiadao.org", external: true },
];
