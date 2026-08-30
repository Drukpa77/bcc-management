"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { LeagueSwitcher } from "@/components/admin/league-switcher";
import { DzongStripe } from "@/components/brand/dzong-stripe";
import { Logo } from "@/components/logo";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  section?: string;
};

const nav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: <GridIcon /> },
  { href: "/admin/competitions", label: "Competitions", icon: <TrophyIcon />, section: "Tournament" },
  { href: "/admin/teams", label: "Teams", icon: <TeamsIcon /> },
  { href: "/admin/pools", label: "Pools", icon: <PoolsIcon />, section: "Structure" },
  { href: "/admin/draw/setup", label: "Fixture Draw", icon: <DrawIcon /> },
  { href: "/admin/fixtures", label: "Fixtures", icon: <CalendarIcon /> },
  { href: "/admin/results", label: "Results", icon: <ClipboardIcon /> },
  { href: "/admin/standings", label: "Standings", icon: <BarsIcon /> },
  { href: "/admin/bracket", label: "Brackets", icon: <BracketIcon /> },
  { href: "/admin/women", label: "Women", icon: <WomenIcon /> },
  { href: "/admin/settings", label: "Settings", icon: <GearIcon />, section: "Admin" },
];

function titleFor(pathname: string) {
  if (pathname === "/admin") return "Dashboard";
  if (/^\/admin\/teams\/[^/]+$/.test(pathname)) return "Team roster";
  if (/^\/admin\/competitions\/[^/]+$/.test(pathname)) return "League";
  if (pathname.startsWith("/admin/fixtures/generate")) return "Fixture generator";
  if (pathname.startsWith("/admin/draw/setup")) return "Pool draw";
  if (pathname === "/admin/draw") return "Live draw";
  const match = nav.find((item) => item.href !== "/admin" && (pathname === item.href || pathname.startsWith(`${item.href}/`)));
  return match?.label ?? "Admin";
}

function isActive(href: string, pathname: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  if (href === "/admin/draw/setup") {
    return pathname === "/admin/draw" || pathname.startsWith("/admin/draw/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminChrome({ children }: { children: ReactNode }) {
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

  if (pathname === "/admin/login") {
    return children;
  }

  const title = titleFor(pathname);
  const flush = pathname === "/admin/draw";

  return (
    <div className="flex min-h-dvh bg-paper">
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-ink/50 md:hidden"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col bg-ink text-[#C4CAD6] transition-transform md:sticky md:top-0 md:z-20 md:h-dvh md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/admin" className="flex items-center gap-3 px-4 pt-4 pb-3">
          <Logo className="h-11 w-auto shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-[16px] font-extrabold tracking-[0.06em] text-white">
              BCC ADMIN
            </span>
            <span className="block text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">
              Control room
            </span>
          </span>
        </Link>
        <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-3">
          {nav.map((item) => (
            <div key={item.href}>
              {item.section ? (
                <p className="mt-3 px-2 pt-2 pb-1.5 text-[11px] font-bold tracking-[0.18em] text-[#6B7382] uppercase">
                  {item.section}
                </p>
              ) : null}
              <Link
                href={item.href}
                prefetch
                className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[15px] font-semibold ${
                  isActive(item.href, pathname)
                    ? "bg-saffron text-white shadow-[0_8px_18px_rgba(232,97,28,0.28)]"
                    : "text-[#C4CAD6] hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                    isActive(item.href, pathname) ? "bg-white/20 text-white" : "bg-white/10 text-[#E6E9EF]"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 px-3 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[15px] font-semibold text-[#C4CAD6] hover:bg-white/10 hover:text-white"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-white/10 text-[#E6E9EF]">
              <HomeIcon />
            </span>
            Public site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-[15px] font-semibold text-[#C4CAD6] hover:bg-white/10 hover:text-white"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-white/10 text-[#E6E9EF]">
                <SignOutIcon />
              </span>
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-30 flex min-h-14 items-center gap-3 border-b border-line bg-white px-4 py-2.5">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-[#E0DCD2] text-ink md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="font-display text-[20px] leading-none">{open ? "×" : "≡"}</span>
          </button>
          <h1 className="font-display text-[20px] font-extrabold tracking-[0.04em] text-ink uppercase sm:text-[22px]">
            {title}
          </h1>
          <LeagueSwitcher />
          <span className="grow" />
          <span className="grid size-8 place-items-center rounded-full bg-saffron font-display text-[12px] font-bold text-white">
            TD
          </span>
        </div>
        <DzongStripe />
        <div className={flush ? "min-h-0 flex-1" : "flex-1 bg-paper p-4 md:p-6"}>{children}</div>
      </div>
    </div>
  );
}

export function AdminShell({
  children,
  actions,
}: {
  title?: string;
  active?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      {actions ? <div className="mb-4 flex justify-end">{actions}</div> : null}
      {children}
    </>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      <rect x="10" y="2" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      <rect x="2" y="10" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      <rect x="10" y="10" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 3.2h8v3.2a4 4 0 0 1-8 0V3.2Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 5H3.2A1.8 1.8 0 0 0 5 6.8M13 5h1.8A1.8 1.8 0 0 1 13 6.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 10.4V13M6.4 15h5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function TeamsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="6.4" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12.2" cy="6.4" r="1.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.4 14.2c.4-2.4 2-3.6 4-3.6s3.6 1.2 4 3.6M10.4 10.8c1.5 0 3 .8 3.4 2.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PoolsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2.2" y="2.2" width="13.6" height="13.6" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 2.2v13.6M2.2 9h13.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function DrawIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="9" cy="9" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 2.8v2.2M9 13v2.2M2.8 9h2.2M13 9h2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2.4" y="3.6" width="13.2" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.4 7.4h13.2M6 2.4v2.6M12 2.4v2.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="4" y="3.6" width="10" height="12.2" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="6.4" y="2.2" width="5.2" height="2.6" rx="1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6.6 8.6h4.8M6.6 11.4h3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function BarsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 14.4V8.2M9 14.4V3.6M14 14.4v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BracketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.2 4.4h4.2v3.2H3.2zM3.2 10.4h4.2v3.2H3.2zM10.6 7.4h4.2v3.2h-4.2z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.4 6v6M7.4 9h3.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function WomenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="6.4" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 9.4v5.4M6.6 12.4h4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M9 2.4v1.8M9 13.8v1.8M2.4 9h1.8M13.8 9h1.8M4.3 4.3l1.3 1.3M12.4 12.4l1.3 1.3M13.7 4.3l-1.3 1.3M5.6 12.4l-1.3 1.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.2 8.2 9 3.4l5.8 4.8V15h-3.8V11H7v4H3.2V8.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M7.2 3.4H4.4A1.6 1.6 0 0 0 2.8 5v8a1.6 1.6 0 0 0 1.6 1.6h2.8M7.6 9h7.6M12.4 6.2 15.2 9l-2.8 2.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
