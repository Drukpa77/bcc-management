"use client";

import { useState } from "react";
import Link from "next/link";
import { TeamTile } from "@/components/ui/team-tile";
import { useAppStore } from "@/components/admin/use-app-store";
import { AdminButton, ConfirmDialog } from "@/components/admin/admin-ui";
import {
  confirmDrawAction,
  discardDrawAction,
  setActiveLeagueAction,
} from "@/app/actions/tournament";
import { FORMAT_LABEL, findTeam, getDraw, poolCaps, type LeagueDraw } from "@/lib/app-store";
import type { Team } from "@/lib/types";

function formatDrawn(iso?: string) {
  if (!iso) {
    return null;
  }
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusCopy: Record<LeagueDraw["status"], { label: string; className: string }> = {
  idle: { label: "No draw yet", className: "bg-white text-[#5B6472] ring-1 ring-[#D8D3C8]" },
  drawing: { label: "Draw in progress", className: "bg-live text-white" },
  complete: { label: "Awaiting confirmation", className: "bg-[#F4EEE4] text-[#9A4F1C]" },
  confirmed: { label: "Pools official", className: "bg-ink text-gold" },
};

export function PoolsBoard() {
  const { store, ready, run } = useAppStore();
  const [busy, setBusy] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading pools…</p>;
  }

  const league = store.leagues.find((item) => item.id === store.activeLeagueId) ?? store.leagues[0];
  if (!league) {
    return (
      <EmptyState
        title="No league yet"
        body="Create a competition first. Pools appear once a league uses the pool-and-playoff format."
        href="/admin/competitions"
        action="Create a league"
      />
    );
  }

  const draw = getDraw(store, league.id);
  const caps = poolCaps(league.teamIds.length);
  const assigned = draw.poolA.length + draw.poolB.length;
  const total = league.teamIds.length;
  const drawnAt = formatDrawn(draw.confirmedAt);
  const fixturesAt = formatDrawn(draw.fixturesGeneratedAt);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-saffron uppercase">Group stage</p>
          <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted">
            Two pools, drawn live. Odd spins go to A, even spins to B — then lock the groups and build fixtures.
          </p>
        </div>
        <span className={`inline-flex h-8 items-center rounded-full px-3 text-[11px] font-bold tracking-[0.12em] uppercase ${statusCopy[draw.status].className}`}>
          {statusCopy[draw.status].label}
        </span>
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
          title={`${league.name} skips the draw`}
          body={`${FORMAT_LABEL[league.format]} leagues go straight to a single table. Generate fixtures from the roster instead.`}
          href="/admin/fixtures/generate"
          action="Open fixture generator"
        />
      ) : (
        <>
          <div className="flex flex-col gap-3 rounded-3xl bg-white p-4 ring-1 ring-[#E8E4DA] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-[20px] font-extrabold tracking-[0.03em] uppercase">{league.name}</p>
              <p className="mt-0.5 text-[13px] text-muted">
                {league.location} · {total} teams
                {drawnAt ? ` · locked ${drawnAt}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {draw.status === "idle" ? (
                <Link href="/admin/draw/setup" className={linkButton("primary")}>
                  Start live draw
                </Link>
              ) : null}
              {draw.status === "drawing" ? (
                <Link href="/admin/draw" className={linkButton("primary")}>
                  Continue draw
                </Link>
              ) : null}
              {draw.status === "complete" ? (
                <AdminButton
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setBusy(true);
                    void run(() => confirmDrawAction(league.id)).finally(() => setBusy(false));
                  }}
                >
                  {busy ? "Locking…" : "Confirm pools"}
                </AdminButton>
              ) : null}
              {draw.status === "confirmed" ? (
                <Link href="/admin/fixtures/generate" className={linkButton("primary")}>
                  {fixturesAt ? "View fixtures" : "Generate fixtures"}
                </Link>
              ) : null}
              {draw.status !== "idle" ? (
                <Link href="/draw" target="_blank" className={linkButton("secondary")}>
                  Presentation
                </Link>
              ) : null}
              {draw.status !== "idle" ? (
                <AdminButton type="button" variant="ghost" className="text-loss hover:bg-[#FDECEC]" onClick={() => setDiscardOpen(true)}>
                  Discard
                </AdminButton>
              ) : null}
            </div>
          </div>

          {draw.status === "idle" ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <IdlePool letter="A" hint="Odd spins land here" />
              <IdlePool letter="B" hint="Even spins land here" />
            </div>
          ) : (
            <>
              {draw.status === "drawing" || draw.status === "complete" ? (
                <div className="overflow-hidden rounded-2xl bg-[#F4EEE4] px-4 py-3">
                  <div className="flex items-center justify-between gap-3 text-[13px]">
                    <p className="font-semibold text-[#7A5340]">
                      {draw.status === "complete"
                        ? "Both pools are full. Confirm to make them official."
                        : `${assigned} of ${total} teams placed · ${draw.remaining.length} still on the wheel`}
                    </p>
                    <span className="font-mono text-[13px] font-bold text-[#9A4F1C]">
                      {assigned}/{total}
                    </span>
                  </div>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/70">
                    <i
                      className="block h-full rounded-full bg-[linear-gradient(90deg,#E8611C,#F0B429)]"
                      style={{ width: `${total ? (assigned / total) * 100 : 0}%` }}
                    />
                  </span>
                </div>
              ) : null}

              {draw.status === "confirmed" ? (
                <div className="rounded-2xl bg-[#EDFDF2] px-4 py-3 text-[13px] text-[#276438]">
                  <p className="font-semibold">Pools are locked for {league.name}.</p>
                  <p className="mt-0.5">
                    {fixturesAt
                      ? `Fixtures were generated ${fixturesAt}.`
                      : "The group schedule is ready to generate from these two tables."}
                  </p>
                </div>
              ) : null}

              <div className="grid gap-4 lg:grid-cols-2">
                <PoolColumn
                  letter="A"
                  accent="#F0B429"
                  ids={draw.poolA}
                  cap={caps.a}
                  draw={draw}
                  storeTeams={(id) => findTeam(store, id)}
                />
                <PoolColumn
                  letter="B"
                  accent="#E8611C"
                  ids={draw.poolB}
                  cap={caps.b}
                  draw={draw}
                  storeTeams={(id) => findTeam(store, id)}
                />
              </div>
            </>
          )}
        </>
      )}

      <ConfirmDialog
        open={discardOpen}
        title="Discard this draw?"
        body={`${league.name} will lose both pools. You can spin again from the live draw.`}
        confirmLabel="Discard & redraw"
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

function linkButton(variant: "primary" | "secondary") {
  return variant === "primary"
    ? "inline-flex h-11 items-center justify-center rounded-xl bg-saffron px-4 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(232,97,28,0.22)] hover:bg-[#d45518]"
    : "inline-flex h-11 items-center justify-center rounded-xl border border-[#D8D3C8] bg-white px-4 text-[13px] font-semibold text-ink-2 hover:bg-paper";
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
      <Link href={href} className={`${linkButton("primary")} mt-6`}>
        {action}
      </Link>
    </div>
  );
}

function IdlePool({ letter, hint }: { letter: "A" | "B"; hint: string }) {
  return (
    <div className="rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-[#E8E4DA]">
      <p
        className="font-display text-[72px] leading-none font-extrabold"
        style={{ color: letter === "A" ? "#F0B429" : "#E8611C" }}
      >
        {letter}
      </p>
      <p className="mt-2 font-display text-[18px] font-extrabold tracking-[0.08em] uppercase">Pool {letter}</p>
      <p className="mt-1 text-[13px] text-muted">{hint}</p>
    </div>
  );
}

function PoolColumn({
  letter,
  accent,
  ids,
  cap,
  draw,
  storeTeams,
}: {
  letter: "A" | "B";
  accent: string;
  ids: string[];
  cap: number;
  draw: LeagueDraw;
  storeTeams: (id: string) => Team | undefined;
}) {
  const openSlots = Math.max(0, cap - ids.length);

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
          <span className="text-[13px] text-[#7A828F]">/{cap}</span>
        </p>
      </div>
      <ol className="divide-y divide-[#F0EEE8]">
        {ids.map((id, index) => {
          const team = storeTeams(id);
          if (!team) {
            return null;
          }
          const spin = draw.log.find((entry) => entry.teamId === id);
          const fresh = draw.lastPick?.teamId === id && draw.status === "drawing";
          return (
            <li key={id} className={`flex items-center gap-3 px-4 py-3.5 ${fresh ? "bg-qualify" : ""}`}>
              <span className="w-6 font-mono text-[12px] font-bold text-[#A8AFBD]">{String(index + 1).padStart(2, "0")}</span>
              <TeamTile team={team} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold">{team.name}</p>
                <p className="text-[12px] text-muted">
                  {team.city ?? team.code}
                  {spin ? ` · Spin ${spin.spin}` : ""}
                </p>
              </div>
              {fresh ? (
                <span className="rounded-full bg-[#F4EEE4] px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-[#9A4F1C] uppercase">
                  Just in
                </span>
              ) : null}
            </li>
          );
        })}
        {Array.from({ length: openSlots }).map((_, index) => (
          <li key={`open-${letter}-${index}`} className="flex items-center gap-3 px-4 py-3.5">
            <span className="w-6 font-mono text-[12px] font-bold text-[#D5D1C8]">
              {String(ids.length + index + 1).padStart(2, "0")}
            </span>
            <span className="size-11 rounded-full border border-dashed border-[#D5D1C8]" />
            <p className="text-[13px] text-[#A8AFBD]">Open slot</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
