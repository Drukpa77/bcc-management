"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const publicNav = [
  { href: "/", label: "Home" },
  { href: "/competitions", label: "Competitions" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/standings", label: "Standings" },
  { href: "/teams", label: "Teams" },
  { href: "/results", label: "Results" },
  { href: "/bracket", label: "Bracket" },
];

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-white">
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#F08A4B,#D2531A_70%)] font-display text-[9px] font-extrabold text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.35)]">
        BB
      </span>
      <span className="leading-none">
        <span className="block font-display text-sm font-bold tracking-[0.05em]">
          BHUTAN BASKETBALL
        </span>
        <span className="mt-px block text-[7px] font-semibold tracking-[0.28em] text-gold">
          NATIONAL TOURNAMENT PLATFORM
        </span>
      </span>
    </Link>
  );
}

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1120px] items-center gap-3 px-4 py-2.5 md:gap-4 md:px-5">
        <Wordmark />
        <nav className="ml-auto hidden items-center gap-3 lg:flex xl:gap-4">
          {publicNav.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-semibold tracking-[0.07em] uppercase no-underline ${
                  active
                    ? "border-b-2 border-gold pb-0.5 text-gold"
                    : "text-nav-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/admin/login"
            className="rounded-[5px] border border-white/35 px-2 py-0.5 text-[11px] font-semibold text-white"
          >
            Admin Login
          </Link>
        </nav>
        <button
          type="button"
          className="ml-auto text-lg text-white lg:hidden"
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          ☰
        </button>
      </div>
      {open ? (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 lg:hidden">
          {publicNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-1.5 text-[12px] font-semibold tracking-[0.07em] text-nav-muted uppercase"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="mt-1 w-fit rounded-[5px] border border-white/35 px-2 py-1 text-[11px] font-semibold text-white"
          >
            Admin Login
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
