"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setPublicLeagueAction } from "@/app/actions/results";
import type { League } from "@/lib/app-store";
import type { LeagueTab } from "@/lib/public-league";

export function CompetitionBar({
  leagues,
  currentId,
  tabs,
  onTabSelect,
  onLeagueSelect,
}: {
  leagues: League[];
  currentId: string;
  tabs?: { id?: LeagueTab; href: string; label: string; active?: boolean }[];
  onTabSelect?: (tab: LeagueTab) => void;
  onLeagueSelect?: (leagueId: string) => void;
}) {
  const router = useRouter();
  const current = leagues.find((item) => item.id === currentId) ?? leagues[0];

  return (
    <div className="pub-sticky-sub border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="pub-wrap flex flex-col gap-2 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:py-3">
        <label className="flex min-w-0 items-center gap-2 rounded-full bg-white px-3.5 py-1.5 ring-1 ring-[#E8E4DA]">
          <span className="text-[10px] font-bold tracking-[0.14em] text-[#8A909C] uppercase">League</span>
          <select
            value={current?.id ?? ""}
            onChange={(event) => {
              const id = event.target.value;
              if (onLeagueSelect) {
                onLeagueSelect(id);
                return;
              }
              void setPublicLeagueAction(id).then(() => {
                const url = new URL(window.location.href);
                url.searchParams.set("league", id);
                router.push(`${url.pathname}${url.search}`);
                router.refresh();
              });
            }}
            className="min-w-0 flex-1 border-0 bg-transparent font-display text-[13px] font-bold uppercase outline-none sm:max-w-[240px] sm:text-[14px] md:max-w-none"
          >
            {leagues.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} {item.season}
              </option>
            ))}
          </select>
        </label>
        <div className="pub-tabs flex-1">
          {tabs?.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              prefetch
              onClick={() => {
                if (tab.id) {
                  onTabSelect?.(tab.id);
                }
              }}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold whitespace-nowrap transition-colors ${
                tab.active ? "bg-ink text-gold" : "text-[#5B6472] hover:bg-white"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
