"use client";

import { updateLeagueStatusAction } from "@/app/actions/tournament";
import { useAppStore } from "@/components/admin/use-app-store";
import type { LeagueStatus } from "@/lib/app-store";

const options: { value: LeagueStatus; label: string }[] = [
  { value: "registration", label: "Registration" },
  { value: "upcoming", label: "Upcoming" },
  { value: "live", label: "Live now" },
  { value: "done", label: "Completed" },
];

export function LeagueStatusSelect({
  leagueId,
  status,
  dark = false,
}: {
  leagueId: string;
  status: LeagueStatus;
  dark?: boolean;
}) {
  const { run } = useAppStore();

  return (
    <label className="inline-flex items-center gap-2">
      <span className={`hidden text-[11px] font-bold tracking-[0.12em] uppercase sm:inline ${dark ? "text-gold" : "text-[#6B7280]"}`}>
        Public status
      </span>
      <select
        value={status}
        onChange={(event) => void run(() => updateLeagueStatusAction(leagueId, event.target.value as LeagueStatus))}
        className="h-10 rounded-xl border border-[#D8D3C8] bg-white px-3 text-[13px] font-semibold text-ink-2 outline-none focus:border-saffron"
        aria-label="Competition public status"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
