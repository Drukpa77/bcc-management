"use client";

import { useState } from "react";
import Link from "next/link";
import { TeamTile } from "@/components/ui/team-tile";
import { useAppStore } from "@/components/admin/use-app-store";
import { AdminButton } from "@/components/admin/admin-ui";
import { assignTeamPoolAction, setActiveLeagueAction } from "@/app/actions/tournament";
import { FORMAT_LABEL, findTeam, getDraw, leagueTeams } from "@/lib/app-store";
import type { Team } from "@/lib/types";

export function PoolsBoard() {
  const { store, ready, run } = useAppStore();
  const [busyId, setBusyId] = useState("");

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading pools…</p>;
  }

  const league = store.leagues.find((item) => item.id === store.activeLeagueId) ?? store.leagues[0];
  if (!league) {
    return (
      <EmptyState
        title="No league yet"
        body="Create a competition first, add clubs, then place them into Pool A or Pool B."
        href="/admin/competitions"
        action="Create a league"
      />
    );
  }

  const draw = getDraw(store, league.id);
  const clubs = leagueTeams(store, league);
  const unassigned = clubs.filter((team) => !draw.poolA.includes(team.id) && !draw.poolB.includes(team.id));

  function move(teamId: string, pool: "A" | "B" | null) {
    setBusyId(teamId);
    void run(() => assignTeamPoolAction(league.id, teamId, pool)).finally(() => setBusyId(""));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-saffron uppercase">Group stage</p>
          <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-muted">
            Officials place every club. Move a team into Pool A or Pool B — nothing is drawn or locked automatically.
          </p>
        </div>
        <Link
          href="/admin/fixtures"
          className="inline-flex h-11 items-center rounded-xl bg-saffron px-4 text-[13px] font-semibold text-white"
        >
          Edit fixtures
        </Link>
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

      {league.format !== "pools" ? (
        <EmptyState
          title={`${league.name} uses a single table`}
          body={`${FORMAT_LABEL[league.format]} competitions do not use pools. Set who plays whom on the fixtures table.`}
          href="/admin/fixtures"
          action="Open fixtures"
        />
      ) : (
        <>
          <div className="rounded-3xl bg-white p-4 ring-1 ring-[#E8E4DA]">
            <p className="font-display text-[20px] font-extrabold tracking-[0.03em] uppercase">{league.name}</p>
            <p className="mt-0.5 text-[13px] text-muted">
              {clubs.length} clubs · Pool A {draw.poolA.length} · Pool B {draw.poolB.length}
              {unassigned.length ? ` · ${unassigned.length} unplaced` : ""}
            </p>
          </div>

          {unassigned.length > 0 ? (
            <section className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#E8E4DA]">
              <div className="bg-paper px-5 py-3">
                <h3 className="font-display text-[16px] font-extrabold uppercase">Unplaced</h3>
                <p className="text-[13px] text-muted">Assign each club to a pool.</p>
              </div>
              <ul className="divide-y divide-[#F0EEE8]">
                {unassigned.map((team) => (
                  <TeamRow
                    key={team.id}
                    team={team}
                    pool={null}
                    busy={busyId === team.id}
                    onMove={move}
                  />
                ))}
              </ul>
            </section>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-2">
            <PoolColumn
              letter="A"
              accent="#F0B429"
              ids={draw.poolA}
              busyId={busyId}
              storeTeams={(id) => findTeam(store, id)}
              onMove={move}
            />
            <PoolColumn
              letter="B"
              accent="#E8611C"
              ids={draw.poolB}
              busyId={busyId}
              storeTeams={(id) => findTeam(store, id)}
              onMove={move}
            />
          </div>
        </>
      )}
    </div>
  );
}

function EmptyState({
  title,
  body,
  href,
  action,
}: {
  title: string;
  body: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[#D5D1C8] bg-white px-6 py-16 text-center">
      <p className="font-display text-[24px] font-extrabold uppercase">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-muted">{body}</p>
      <Link
        href={href}
        className="mt-6 inline-flex h-11 items-center rounded-xl bg-saffron px-4 text-[13px] font-semibold text-white"
      >
        {action}
      </Link>
    </div>
  );
}

function PoolColumn({
  letter,
  accent,
  ids,
  busyId,
  storeTeams,
  onMove,
}: {
  letter: "A" | "B";
  accent: string;
  ids: string[];
  busyId: string;
  storeTeams: (id: string) => Team | undefined;
  onMove: (teamId: string, pool: "A" | "B" | null) => void;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#E8E4DA]">
      <div className="flex items-end justify-between bg-ink px-5 py-4 text-white">
        <div>
          <p className="font-display text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: accent }}>
            Group
          </p>
          <h3 className="font-display text-[28px] font-extrabold tracking-[0.04em] uppercase">Pool {letter}</h3>
        </div>
        <p className="font-mono text-[22px] font-extrabold" style={{ color: accent }}>
          {ids.length}
        </p>
      </div>
      {ids.length === 0 ? (
        <p className="px-5 py-8 text-[13px] text-muted">No clubs in this pool yet.</p>
      ) : (
        <ul className="divide-y divide-[#F0EEE8]">
          {ids.map((id) => {
            const team = storeTeams(id);
            if (!team) {
              return null;
            }
            return (
              <TeamRow
                key={id}
                team={team}
                pool={letter}
                busy={busyId === id}
                onMove={onMove}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}

function TeamRow({
  team,
  pool,
  busy,
  onMove,
}: {
  team: Team;
  pool: "A" | "B" | null;
  busy: boolean;
  onMove: (teamId: string, pool: "A" | "B" | null) => void;
}) {
  return (
    <li className="flex flex-wrap items-center gap-3 px-4 py-3.5">
      <TeamTile team={team} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold">{team.name}</p>
        <p className="text-[12px] text-muted">{team.city ?? team.code}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <AdminButton
          type="button"
          variant={pool === "A" ? "primary" : "secondary"}
          className="h-9 px-3"
          disabled={busy || pool === "A"}
          onClick={() => onMove(team.id, "A")}
        >
          Pool A
        </AdminButton>
        <AdminButton
          type="button"
          variant={pool === "B" ? "primary" : "secondary"}
          className="h-9 px-3"
          disabled={busy || pool === "B"}
          onClick={() => onMove(team.id, "B")}
        >
          Pool B
        </AdminButton>
        {pool ? (
          <AdminButton
            type="button"
            variant="ghost"
            className="h-9 px-3"
            disabled={busy}
            onClick={() => onMove(team.id, null)}
          >
            Remove
          </AdminButton>
        ) : null}
      </div>
    </li>
  );
}
