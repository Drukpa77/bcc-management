"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { publicNav } from "@/components/public/nav-links";
import { Logo } from "@/components/logo";

function Wordmark() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2.5 text-white sm:gap-3">
      <Logo className="h-11 w-auto shrink-0 sm:h-12" priority />
      <span className="min-w-0 leading-none">
        <span className="block truncate font-display text-[13px] font-extrabold tracking-[0.06em] sm:text-[15px]">
          BHUTANESE BASKETBALL CUP
        </span>
        <span className="mt-1 hidden text-[8px] font-semibold tracking-[0.28em] text-gold min-[400px]:block">
          OFFICIAL PLATFORM
        </span>
      </span>
    </Link>
  );
}

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pub-site-header sticky top-0 z-50 bg-ink text-white shadow-[0_12px_40px_-24px_rgba(0,0,0,0.65)]">
      <div className="flags" aria-hidden="true" />
      <div className="pub-wrap flex items-center gap-3 py-2.5 sm:gap-4 sm:py-3">
        <Wordmark />
        <nav className="ml-auto hidden items-center gap-0.5 xl:flex">
          {publicNav.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase no-underline transition-colors ${
                  active ? "bg-white/10 text-gold" : "text-nav-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/admin/login"
            className="ml-2 rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-white uppercase hover:border-gold hover:text-gold"
          >
            Officials
          </Link>
        </nav>
        <button
          type="button"
          className="ml-auto grid size-10 place-items-center rounded-xl border border-white/15 text-white xl:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="font-display text-[18px] leading-none">{open ? "×" : "≡"}</span>
        </button>
      </div>
      {open ? (
        <nav className="max-h-[min(70vh,28rem)] overflow-y-auto border-t border-white/10 bg-[#121722] px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))] xl:hidden">
          {publicNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 font-display text-[16px] font-bold tracking-[0.08em] text-nav-muted uppercase hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex rounded-full border border-white/20 px-3 py-1.5 text-[12px] font-semibold text-white"
          >
            Officials login
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
