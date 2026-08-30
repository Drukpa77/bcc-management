"use client";

import Link from "next/link";
import { TeamTile } from "@/components/ui/team-tile";
import { useAppStore } from "@/components/admin/use-app-store";
import { setActiveLeagueAction, startDrawAction } from "@/app/actions/tournament";
import { FORMAT_LABEL, getDraw, leagueTeams } from "@/lib/app-store";

export function DrawSetupPanel() {
  const { store, ready, run } = useAppStore();

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading draw setup…</p>;
  }

  const league = store.leagues.find((item) => item.id === store.activeLeagueId) ?? store.leagues[0];
  if (!league) {
    return (
      <div className="rounded-3xl border border-dashed border-[#D5D1C8] bg-white px-6 py-16 text-center">
        <p className="font-display text-[24px] font-extrabold uppercase">Create a league first</p>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-muted">
          The wheel needs a pool-format competition and at least two clubs.
        </p>
        <Link
          href="/admin/competitions"
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-saffron px-4 text-[13px] font-semibold text-white"
        >
          Open competitions
        </Link>
      </div>
    );
  }

  const teams = leagueTeams(store, league);
  const draw = getDraw(store, league.id);
  const canStart = league.format === "pools" && teams.length >= 2;
  const startLabel =
    draw.status === "drawing"
      ? "Continue live draw"
      : draw.status === "confirmed"
        ? "Re-run live draw"
        : "Start live draw";

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-saffron uppercase">Live pool draw</p>
        <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted">
          Check the roster, then send the hall to the wheel. Odd spins fill Pool A, even spins fill Pool B.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {store.leagues.map((item) => {
          const active = item.id === league.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => void run(() => setActiveLeagueAction(item.id))}
              className={`h-10 rounded-xl px-3.5 text-[13px] font-semibold transition ${
                active ? "bg-ink text-white" : "bg-white text-[#5B6472] ring-1 ring-[#E0DCD2] hover:text-ink-2"
              }`}
            >
              {item.name}
              <span className={`ml-2 text-[11px] ${active ? "text-gold" : "text-muted"}`}>{item.season}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#E8E4DA]">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-display text-[20px] font-extrabold tracking-[0.03em] uppercase">On the wheel</p>
              <p className="text-[13px] text-muted">{teams.length} clubs eligible for {league.name}</p>
            </div>
            <Link href={`/admin/competitions/${league.id}`} className="text-[13px] font-semibold text-saffron hover:text-[#d45518]">
              Edit roster
            </Link>
          </div>
          {teams.length === 0 ? (
            <p className="px-5 pb-8 text-[14px] text-muted">Add teams to this league before you spin.</p>
          ) : (
            <div className="grid gap-2 px-4 pb-5 sm:grid-cols-2">
              {teams.map((team) => (
                <div key={team.id} className="flex items-center gap-3 rounded-2xl bg-paper px-3 py-2.5">
                  <TeamTile team={team} size="lg" />
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold">{team.name}</p>
                    <p className="text-[12px] text-muted">{team.city ?? team.code}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="flex flex-col gap-4">
          <div className="rounded-3xl bg-ink p-5 text-white">
            <p className="font-display text-[11px] font-bold tracking-[0.18em] text-gold uppercase">How it works</p>
            <p className="mt-2 font-display text-[22px] font-extrabold uppercase">{FORMAT_LABEL[league.format]}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#A8AFBD]">
              {league.format === "pools"
                ? "Each spin picks one remaining team at random. Pool A and Pool B fill in turn until the wheel is empty."
                : "This league does not use pools. Skip the wheel and generate fixtures from the roster."}
            </p>
            {league.format === "pools" ? (
              <ol className="mt-4 space-y-2 text-[13px] text-[#C5CBD6]">
                <li className="flex gap-2">
                  <span className="font-mono text-gold">01</span>
                  Spin 1 → Pool A
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-gold">02</span>
                  Spin 2 → Pool B
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-gold">03</span>
                  Alternate until every club is placed
                </li>
              </ol>
            ) : null}
          </div>

          {canStart ? (
            <Link
              href="/admin/draw"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-saffron text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(232,97,28,0.22)] hover:bg-[#d45518]"
              onClick={() => {
                if (draw.status !== "drawing") {
                  void run(() => startDrawAction(league.id));
                }
              }}
            >
              {startLabel}
            </Link>
          ) : (
            <Link
              href={`/admin/competitions/${league.id}`}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#D8D3C8] bg-white text-[14px] font-semibold"
            >
              Add teams to this league
            </Link>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/draw"
              target="_blank"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D8D3C8] bg-white text-[13px] font-semibold hover:bg-paper"
            >
              Presentation
            </Link>
            <Link
              href="/admin/pools"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D8D3C8] bg-white text-[13px] font-semibold hover:bg-paper"
            >
              View pools
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
