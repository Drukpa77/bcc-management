"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";

const links = [
  { href: "/competitions", label: "Competitions" },
  { href: "/clubs", label: "Clubs" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/dashboard", label: "Office" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 text-card backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="shrink-0 text-card">
          <Logo />
        </Link>
        <nav className="flex items-center gap-4 overflow-x-auto text-sm text-card/70 sm:gap-7">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap transition-colors hover:text-card ${
                  active ? "text-amber" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/signin"
          className="hidden rounded-full bg-amber px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90 sm:inline-flex"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
