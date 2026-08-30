"use client";

import Link from "next/link";
import { useAppStore } from "@/components/admin/use-app-store";
import { findTeam } from "@/lib/app-store";
import { buildLeagueView, isOfficialResult } from "@/lib/tournament-engine";

export function DashboardHome() {
  const { store, ready } = useAppStore();

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading dashboard…</p>;
  }

  const view = buildLeagueView(store, store.activeLeagueId);
  if (!view) {
    return (
      <div className="rounded-3xl border border-dashed border-[#D5D1C8] bg-white px-6 py-16 text-center">
        <p className="font-display text-[22px] font-extrabold uppercase">No competition yet</p>
        <Link href="/admin/competitions" className="mt-4 inline-flex text-[13px] font-semibold text-saffron">
          Create a league
        </Link>
      </div>
    );
  }

  const recent = [...view.fixtures].filter(isOfficialResult).at(-1);
  const home = recent ? findTeam(store, recent.homeId) : undefined;
  const away = recent ? findTeam(store, recent.awayId) : undefined;
  const upcoming = view.fixtures.filter((fixture) => !isOfficialResult(fixture)).length;
  const completed = view.fixtures.filter(isOfficialResult).length;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-saffron uppercase">Current league</p>
        <h2 className="font-display text-[28px] font-extrabold uppercase">{view.league.name}</h2>
        <p className="text-[14px] text-muted">
          {view.league.season} · {view.league.location} · {view.knockoutStarted ? "Knockout stage" : "Pool stage"}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Completed" value={String(completed)} />
        <Stat label="Upcoming" value={String(upcoming)} />
        <Stat
          label="Tournament stage"
          value={view.knockoutStarted ? "Knockout" : "Pool stage"}
        />
      </div>

      {view.league.format === "pools" ? (
        <div className="grid gap-3 md:grid-cols-2">
          <ProgressCard label="Pool A" done={view.poolProgress.a.done} expected={view.poolProgress.a.expected} />
          <ProgressCard label="Pool B" done={view.poolProgress.b.done} expected={view.poolProgress.b.expected} />
        </div>
      ) : null}

      <div className="rounded-3xl bg-white p-5 ring-1 ring-[#E8E4DA]">
        <p className="text-[13px] font-semibold">
          {view.bracketReady
            ? "Knockout bracket is seeded from the final pool tables."
            : `Knockout bracket will generate after ${view.remainingPoolMatches} remaining pool match${view.remainingPoolMatches === 1 ? "" : "es"}.`}
        </p>
        {recent && home && away ? (
          <p className="mt-2 text-[14px] text-muted">
            Latest result: {home.name} {recent.homeScore}–{recent.awayScore} {away.name}
          </p>
        ) : (
          <p className="mt-2 text-[14px] text-muted">No published results yet.</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/results" className={actionClass(true)}>
          Manage results
        </Link>
        <Link href="/admin/standings" className={actionClass(false)}>
          View standings
        </Link>
        <Link href="/admin/fixtures" className={actionClass(false)}>
          Manage fixtures
        </Link>
        <Link href="/admin/bracket" className={actionClass(false)}>
          View bracket
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 ring-1 ring-[#E8E4DA]">
      <p className="text-[11px] font-bold tracking-[0.14em] text-[#8A909C] uppercase">{label}</p>
      <p className="mt-1 font-display text-[26px] font-extrabold">{value}</p>
    </div>
  );
}

function ProgressCard({ label, done, expected }: { label: string; done: number; expected: number }) {
  const pct = expected ? Math.min(100, (done / expected) * 100) : 0;
  return (
    <div className="rounded-3xl bg-white p-4 ring-1 ring-[#E8E4DA]">
      <div className="flex items-center justify-between">
        <p className="font-display text-[16px] font-extrabold uppercase">{label}</p>
        <p className="font-mono text-[13px] font-bold">
          {done}/{expected || "–"}
        </p>
      </div>
      <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-paper">
        <i className="block h-full rounded-full bg-[linear-gradient(90deg,#E8611C,#F0B429)]" style={{ width: `${pct}%` }} />
      </span>
    </div>
  );
}

function actionClass(primary: boolean) {
  return primary
    ? "inline-flex h-11 items-center rounded-xl bg-saffron px-4 text-[13px] font-semibold text-white"
    : "inline-flex h-11 items-center rounded-xl border border-[#D8D3C8] bg-white px-4 text-[13px] font-semibold";
}
