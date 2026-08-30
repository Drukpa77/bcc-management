"use client";

import { useAppStore } from "@/components/admin/use-app-store";
import { setActiveLeagueAction } from "@/app/actions/tournament";

export function LeagueSwitcher({ compact = false }: { compact?: boolean }) {
  const { store, ready, run } = useAppStore();

  if (!ready || !store || store.leagues.length === 0) {
    return null;
  }

  const league = store.leagues.find((item) => item.id === store.activeLeagueId) ?? store.leagues[0];

  return (
    <label className={`flex min-w-0 items-center gap-2 ${compact ? "" : "rounded-xl bg-paper px-3 py-1.5"}`}>
      <span className="hidden text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase sm:inline">
        Managing
      </span>
      <select
        value={league.id}
        onChange={(event) => void run(() => setActiveLeagueAction(event.target.value))}
        className="max-w-[42vw] truncate border-0 bg-transparent font-display text-[13px] font-bold tracking-[0.03em] text-ink-2 uppercase outline-none sm:max-w-[260px] sm:text-[14px]"
        aria-label="Select league"
      >
        {store.leagues.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} {item.season}
          </option>
        ))}
      </select>
    </label>
  );
}
