"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { useAppStore } from "@/components/admin/use-app-store";
import { AdminButton, ConfirmDialog, PlusIcon } from "@/components/admin/admin-ui";
import {
  addTeamToLeagueAction,
  discardDrawAction,
  removeTeamFromLeagueAction,
  setActiveLeagueAction,
  startDrawAction,
} from "@/app/actions/tournament";
import {
  FORMAT_LABEL,
  availableTeams,
  getDraw,
  leagueTeams,
  rosterLocked,
} from "@/lib/app-store";

export function LeagueEditor({ leagueId }: { leagueId: string }) {
  const { store, ready, run } = useAppStore();
  const [discardOpen, setDiscardOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading league…</p>;
  }

  const league = store.leagues.find((item) => item.id === leagueId);
  if (!league) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">This league was not found.</p>;
  }

  const draw = getDraw(store, league.id);
  const locked = rosterLocked(draw);
  const inLeague = leagueTeams(store, league);
  const available = availableTeams(store, league);
  const canDraw = league.format === "pools" && league.teamIds.length >= 2;

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-3xl bg-ink text-white">
        <div className="h-1.5 bg-[linear-gradient(90deg,#E8611C,#F0B429)]" />
        <div className="flex flex-wrap items-center gap-4 px-6 py-6">
          <div className="min-w-0 flex-1">
            <Link href="/admin/competitions" className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
              ← All competitions
            </Link>
            <h2 className="font-display text-[32px] font-extrabold tracking-[0.03em] uppercase">{league.name}</h2>
            <p className="text-[14px] text-[#A8AFBD]">
              {league.season} · {league.location} · {FORMAT_LABEL[league.format]}
            </p>
          </div>
          <Badge tone={league.status} />
          <div className="text-right">
            <p className="font-mono text-[34px] leading-none font-extrabold text-gold">{inLeague.length}</p>
            <p className="mt-1 text-[11px] tracking-[0.14em] text-[#7A828F] uppercase">On roster</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {canDraw ? (
          <Link
            href="/admin/draw"
            className="inline-flex h-11 items-center rounded-xl bg-saffron px-4 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(232,97,28,0.22)]"
            onClick={() => void run(() => startDrawAction(league.id))}
          >
            Start pool draw
          </Link>
        ) : league.format === "pools" ? (
          <span className="inline-flex h-11 items-center rounded-xl border border-[#D8D3C8] px-4 text-[13px] text-muted">
            Add at least two teams to draw
          </span>
        ) : (
          <p className="inline-flex h-11 items-center text-[13px] text-muted">Round robin — generate fixtures once the roster is set.</p>
        )}
        <Link
          href="/admin/fixtures/generate"
          className="inline-flex h-11 items-center rounded-xl border border-[#D8D3C8] bg-white px-4 text-[13px] font-semibold hover:bg-paper"
          onClick={() => void run(() => setActiveLeagueAction(league.id))}
        >
          Fixture generator
        </Link>
        <Link
          href="/admin/results"
          className="inline-flex h-11 items-center rounded-xl border border-[#D8D3C8] bg-white px-4 text-[13px] font-semibold hover:bg-paper"
          onClick={() => void run(() => setActiveLeagueAction(league.id))}
        >
          Results
        </Link>
        {draw.status !== "idle" ? (
          <AdminButton type="button" variant="ghost" className="text-loss hover:bg-[#FDECEC]" onClick={() => setDiscardOpen(true)}>
            Discard draw
          </AdminButton>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#E8E4DA]">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-display text-[18px] font-extrabold uppercase">In this league</p>
              <p className="text-[13px] text-muted">{inLeague.length} clubs assigned</p>
            </div>
            {locked ? (
              <span className="rounded-full bg-[#F4EEE4] px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-[#9A4F1C] uppercase">
                Roster locked
              </span>
            ) : null}
          </div>
          {inLeague.length === 0 ? (
            <p className="px-5 pb-8 text-[14px] text-muted">No teams yet. Add clubs from the list on the right.</p>
          ) : (
            <ul className="divide-y divide-[#F0EEE8]">
              {inLeague.map((team) => (
                <li key={team.id} className="flex items-center gap-3 px-5 py-3">
                  <TeamTile team={team} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">{team.name}</p>
                    <p className="text-[12px] text-muted">{team.city ?? team.code}</p>
                  </div>
                  {locked ? null : (
                    <AdminButton
                      type="button"
                      variant="ghost"
                      className="h-9 text-loss hover:bg-[#FDECEC]"
                      onClick={() => void run(() => removeTeamFromLeagueAction(league.id, team.id))}
                    >
                      Remove
                    </AdminButton>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="rounded-3xl bg-white p-4 ring-1 ring-[#E8E4DA]">
          <p className="font-display text-[16px] font-extrabold uppercase">Add teams</p>
          <p className="mt-1 text-[12px] text-muted">Only clubs that match this division appear here.</p>
          <div className="mt-3 space-y-1.5">
            {locked ? (
              <p className="rounded-2xl bg-paper px-3 py-4 text-[13px] text-muted">
                The roster is locked while a draw is in progress or confirmed.
              </p>
            ) : available.length === 0 ? (
              <p className="rounded-2xl bg-paper px-3 py-4 text-[13px] text-muted">
                Every matching club is already in.{" "}
                <Link href="/admin/teams" className="font-semibold text-saffron">
                  Register a team
                </Link>
              </p>
            ) : (
              available.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left hover:bg-paper"
                  onClick={() => void run(() => addTeamToLeagueAction(league.id, team.id))}
                >
                  <TeamTile team={team} />
                  <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">{team.name}</span>
                  <PlusIcon />
                </button>
              ))
            )}
          </div>
          <Link href="/admin/teams" className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-xl border border-[#D8D3C8] text-[13px] font-semibold hover:bg-paper">
            New club
          </Link>
        </aside>
      </div>

      <ConfirmDialog
        open={discardOpen}
        title="Discard this draw?"
        body={`${league.name} will lose its pools. Teams stay in the league.`}
        confirmLabel="Discard draw"
        busyLabel="Discarding…"
        busy={busy}
        onCancel={() => setDiscardOpen(false)}
        onConfirm={() => {
          setBusy(true);
          void run(() => discardDrawAction(league.id))
            .then(() => setDiscardOpen(false))
            .finally(() => setBusy(false));
        }}
      />
    </div>
  );
}
