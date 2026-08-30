import type { ReactNode } from "react";
import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { LeagueSwitcher } from "@/components/admin/league-switcher";
import { DzongStripe } from "@/components/brand/dzong-stripe";
import { Logo } from "@/components/logo";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "▦", section: null },
  { href: "/admin/competitions", label: "Competitions", icon: "🏆", section: "Tournament" },
  { href: "/admin/teams", label: "Teams", icon: "👥", section: null },
  { href: "/admin/pools", label: "Pools", icon: "◲", section: "Structure" },
  { href: "/admin/draw/setup", label: "Fixture Draw", icon: "🎡", section: null },
  { href: "/admin/fixtures", label: "Fixtures", icon: "📅", section: null },
  { href: "/admin/results", label: "Results", icon: "🗂", section: null },
  { href: "/admin/standings", label: "Standings", icon: "📊", section: null },
  { href: "/admin/bracket", label: "Brackets", icon: "🏁", section: null },
  { href: "/admin/women", label: "Women", icon: "♀", section: null },
  { href: "/admin/settings", label: "Settings", icon: "⚙", section: "Admin" },
];

type AdminShellProps = {
  title: string;
  active: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AdminShell({ title, active, actions, children }: AdminShellProps) {
  return (
    <div className="flex min-h-full bg-paper">
      <aside className="flex w-[168px] shrink-0 flex-col gap-px bg-ink px-2 py-2.5 text-[#A8AFBD]">
        <Link href="/admin" className="mb-2 flex items-center gap-2 px-1.5 py-1">
          <Logo className="h-8 w-auto shrink-0" />
          <b className="font-display text-[11px] tracking-[0.05em] text-white">
            BCC ADMIN
          </b>
        </Link>
        <div className="flex min-h-0 flex-1 flex-col gap-px overflow-y-auto">
          {nav.map((item) => (
            <div key={item.href}>
              {item.section ? (
                <p className="mt-2 px-2 pt-2 pb-1 text-[10px] font-bold tracking-[0.2em] text-[#5B6472] uppercase">
                  {item.section}
                </p>
              ) : null}
              <Link
                href={item.href}
                prefetch
                className={`flex items-center gap-2 rounded-[5px] px-2.5 py-1.5 text-[13px] font-semibold ${
                  active === item.href
                    ? "bg-saffron text-white"
                    : "text-[#A8AFBD] hover:text-white"
                }`}
              >
                <span className="w-3 text-center opacity-80">{item.icon}</span>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-white/10 pt-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-[5px] px-2.5 py-1.5 text-[13px] font-semibold text-[#A8AFBD] hover:text-white"
          >
            <span className="w-3 text-center opacity-80">⌂</span>
            Home
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-[5px] px-2.5 py-1.5 text-left text-[13px] font-semibold text-[#A8AFBD] hover:text-white"
            >
              <span className="w-3 text-center opacity-80">↩</span>
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2.5 border-b border-line bg-white px-4 py-2">
          <h1 className="font-display text-[17px] font-bold tracking-[0.05em] uppercase">
            {title}
          </h1>
          <LeagueSwitcher />
          <span className="grow" />
          {actions}
          <span className="grid size-6 place-items-center rounded-full bg-saffron font-display text-[10px] font-bold text-white">
            TD
          </span>
        </div>
        <DzongStripe />
        <div className="flex-1 bg-paper p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
