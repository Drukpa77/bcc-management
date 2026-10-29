"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useAppStore } from "@/components/admin/use-app-store";
import {
  AdminButton,
  ConfirmDialog,
  FlashBanner,
  PlusIcon,
  TrashIcon,
} from "@/components/admin/admin-ui";
import {
  createFixtureAction,
  deleteFixtureAction,
  updateFixtureAction,
  type FixtureWriteInput,
} from "@/app/actions/tournament";
import { findTeam, leagueTeams } from "@/lib/app-store";
import { TeamTile } from "@/components/ui/team-tile";
import { VsMark } from "@/components/public/public-primitives";
import type { Fixture, MatchStage, MatchStatus, Team } from "@/lib/types";

const STATUSES: { value: MatchStatus; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "live", label: "Live now" },
  { value: "final", label: "Final" },
  { value: "postponed", label: "Postponed" },
  { value: "cancelled", label: "Cancelled" },
];

const GROUPS: { key: string; label: string; groupName: string; stage: MatchStage; pool: "A" | "B" | null }[] = [
  { key: "A", label: "Pool A", groupName: "Pool A", stage: "POOL", pool: "A" },
  { key: "B", label: "Pool B", groupName: "Pool B", stage: "POOL", pool: "B" },
  { key: "QF", label: "Quarter-final", groupName: "Quarter Final", stage: "QUARTER_FINAL", pool: null },
  { key: "SF", label: "Semi-final", groupName: "Semi Final", stage: "SEMI_FINAL", pool: null },
  { key: "F", label: "Final", groupName: "Championship Final", stage: "FINAL", pool: null },
  { key: "C", label: "Custom", groupName: "", stage: "POOL", pool: null },
];

type Filter = "all" | "live" | "upcoming" | "final" | "A" | "B" | "knockout";

type Draft = {
  id: string;
  homeId: string;
  awayId: string;
  dateLabel: string;
  time: string;
  venue: string;
  groupKey: string;
  customGroup: string;
  status: MatchStatus;
};

function groupKeyFor(fixture: Fixture) {
  if (fixture.stage === "QUARTER_FINAL") return "QF";
  if (fixture.stage === "SEMI_FINAL") return "SF";
  if (fixture.stage === "FINAL") return "F";
  if (fixture.pool === "A" || fixture.group.toLowerCase().includes("pool a")) return "A";
  if (fixture.pool === "B" || fixture.group.toLowerCase().includes("pool b")) return "B";
  return "C";
}

function toDraft(fixture: Fixture): Draft {
  const groupKey = groupKeyFor(fixture);
  return {
    id: fixture.id,
    homeId: fixture.homeId,
    awayId: fixture.awayId,
    dateLabel: fixture.dateLabel,
    time: fixture.time,
    venue: fixture.venue,
    groupKey,
    customGroup: groupKey === "C" ? fixture.group : "",
    status: fixture.status,
  };
}

function toInput(draft: Draft): FixtureWriteInput {
  const group = GROUPS.find((item) => item.key === draft.groupKey) ?? GROUPS[0];
  return {
    homeId: draft.homeId,
    awayId: draft.awayId,
    dateLabel: draft.dateLabel,
    time: draft.time,
    venue: draft.venue,
    groupName: draft.groupKey === "C" ? draft.customGroup || "Match" : group.groupName,
    status: draft.status,
    stage: group.stage,
    pool: group.pool,
  };
}

function emptyDraft(venue: string): Draft {
  return {
    id: `new-${Date.now()}`,
    homeId: "",
    awayId: "",
    dateLabel: "",
    time: "",
    venue,
    groupKey: "A",
    customGroup: "",
    status: "upcoming",
  };
}

function statusTone(status: MatchStatus) {
  if (status === "live") return "bg-live text-white";
  if (status === "final") return "bg-[#E8E4DA] text-[#4A5262]";
  if (status === "postponed") return "bg-[#FEF9EE] text-[#92400E] ring-1 ring-[#F2DFAE]";
  if (status === "cancelled") return "bg-[#EEECE6] text-[#6B7280]";
  return "bg-white text-[#5B6472] ring-1 ring-[#D8D3C8]";
}

function cardAccent(status: MatchStatus) {
  if (status === "live") return "border-l-live shadow-[0_16px_40px_rgba(225,29,72,0.12)]";
  if (status === "final") return "border-l-[#C9CDD6]";
  if (status === "postponed") return "border-l-[#F0B429]";
  if (status === "cancelled") return "border-l-[#C9CDD6] opacity-70";
  return "border-l-gold";
}

export function FixturesBoard() {
  const { store, ready, run } = useAppStore();
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [creating, setCreating] = useState<Draft | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Draft | null>(null);

  const league = store?.leagues.find((item) => item.id === store.activeLeagueId) ?? store?.leagues[0];
  const rows = league ? (store?.fixtures[league.id] ?? []) : [];
  const teams = store && league ? leagueTeams(store, league) : [];

  const visible = useMemo(() => rows.map((fixture) => drafts[fixture.id] ?? toDraft(fixture)), [drafts, rows]);

  const counts = useMemo(
    () => ({
      total: rows.length,
      live: rows.filter((item) => item.status === "live").length,
      upcoming: rows.filter((item) => item.status === "upcoming").length,
      final: rows.filter((item) => item.status === "final").length,
    }),
    [rows],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return visible.filter((draft) => {
      const home = store ? findTeam(store, draft.homeId) : undefined;
      const away = store ? findTeam(store, draft.awayId) : undefined;
      const hay = `${home?.name ?? ""} ${away?.name ?? ""} ${draft.dateLabel} ${draft.venue} ${draft.groupKey}`.toLowerCase();
      const matchesQuery = !needle || hay.includes(needle);
      const matchesFilter =
        filter === "all" ||
        (filter === "live" && draft.status === "live") ||
        (filter === "upcoming" && draft.status === "upcoming") ||
        (filter === "final" && draft.status === "final") ||
        (filter === "A" && draft.groupKey === "A") ||
        (filter === "B" && draft.groupKey === "B") ||
        (filter === "knockout" && ["QF", "SF", "F"].includes(draft.groupKey));
      return matchesQuery && matchesFilter;
    });
  }, [filter, query, store, visible]);

  const grouped = useMemo(() => {
    const map = new Map<string, Draft[]>();
    for (const draft of filtered) {
      const key = draft.dateLabel.trim() || "Date TBC";
      map.set(key, [...(map.get(key) ?? []), draft]);
    }
    return [...map.entries()];
  }, [filtered]);

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading the match schedule…</p>;
  }
  if (!league) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Create a competition before adding matches.</p>;
  }

  function patch(id: string, update: Partial<Draft>, isNew = false) {
    if (isNew) {
      setCreating((current) => (current && current.id === id ? { ...current, ...update } : current));
      return;
    }
    setDrafts((current) => {
      const original = rows.find((item) => item.id === id);
      const base = current[id] ?? (original ? toDraft(original) : emptyDraft(league.location));
      return { ...current, [id]: { ...base, ...update } };
    });
  }

  async function persist(draft: Draft, isNew: boolean) {
    setBusyId(draft.id);
    setError("");
    try {
      if (isNew) {
        await run(() => createFixtureAction(league.id, toInput(draft)));
        setCreating(null);
        setFlash("Match added to the schedule.");
      } else {
        await run(() => updateFixtureAction(draft.id, toInput(draft)));
        setDrafts((current) => {
          const next = { ...current };
          delete next[draft.id];
          return next;
        });
        setFlash("Match updated.");
      }
      setOpenId(null);
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : "Could not save this match.");
    } finally {
      setBusyId("");
    }
  }

  async function markLive(draft: Draft) {
    await persist({ ...draft, status: "live" }, false);
  }

  async function remove(id: string) {
    setBusyId(id);
    setError("");
    try {
      await run(() => deleteFixtureAction(id));
      setPendingDelete(null);
      setFlash("Match removed.");
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : "Could not delete this match.");
    } finally {
      setBusyId("");
    }
  }

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "live", label: "Live" },
    { id: "upcoming", label: "Upcoming" },
    { id: "final", label: "Final" },
    { id: "A", label: "Pool A" },
    { id: "B", label: "Pool B" },
    { id: "knockout", label: "Knockout" },
  ];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[28px] bg-ink text-white">
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute -top-24 -right-16 size-[280px] rounded-full border-[18px] border-white/10" />
          <div className="absolute -bottom-32 -left-10 size-[320px] rounded-full border-[22px] border-saffron/20" />
        </div>
        <div className="relative flex flex-col gap-6 p-5 md:flex-row md:items-end md:justify-between md:p-7">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold tracking-[0.22em] text-gold uppercase">Match operations</p>
            <h2 className="mt-2 font-display text-[32px] leading-none font-extrabold tracking-[0.03em] uppercase">
              {league.name}
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-[#C4CAD6]">
              Choose the two clubs, then set when they play. <span className="text-white">Live now</span> appears on the
              public site as soon as you save.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatChip icon={<LiveIcon />} label="Live" value={counts.live} accent />
            <StatChip icon={<CalendarIcon />} label="Upcoming" value={counts.upcoming} />
            <StatChip icon={<WhistleIcon />} label="Final" value={counts.final} />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`h-10 rounded-full px-3.5 text-[13px] font-semibold transition ${
                filter === item.id ? "bg-ink text-gold" : "bg-white text-[#5B6472] ring-1 ring-[#E0DCD2] hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <label className="relative min-w-0 flex-1 lg:w-56">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted">
              <SearchGlyph />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search clubs or dates"
              className="h-11 w-full rounded-xl border border-[#E0DCD2] bg-white pr-3 pl-10 text-[14px] outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/15"
            />
          </label>
          <AdminButton
            type="button"
            onClick={() => {
              const next = emptyDraft(league.location);
              setCreating(next);
              setOpenId(next.id);
            }}
          >
            <PlusIcon />
            Add match
          </AdminButton>
        </div>
      </div>

      {error ? <p className="rounded-2xl bg-[#FDECEC] px-4 py-3 text-[13px] text-loss">{error}</p> : null}

      {creating ? (
        <MatchCard
          draft={creating}
          teams={teams}
          storeFind={(id) => findTeam(store, id)}
          busy={busyId === creating.id}
          dirty
          expanded
          isNew
          onChange={(update) => patch(creating.id, update, true)}
          onSave={() => void persist(creating, true)}
          onCancel={() => setCreating(null)}
          onDelete={() => setCreating(null)}
          onToggle={() => setOpenId(creating.id)}
        />
      ) : null}

      {grouped.length === 0 && !creating ? (
        <div className="rounded-[28px] border border-dashed border-[#D5D1C8] bg-white px-6 py-16 text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-ink text-gold">
            <CourtIcon />
          </span>
          <p className="mt-4 font-display text-[24px] font-extrabold uppercase">No matches in this view</p>
          <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-muted">
            Add a match and pick the two clubs. The public fixtures page follows this list exactly.
          </p>
        </div>
      ) : (
        grouped.map(([date, matches]) => (
          <section key={date} className="space-y-3">
            <div className="flex items-center gap-3 px-1">
              <CalendarIcon />
              <h3 className="font-display text-[15px] font-extrabold tracking-[0.08em] uppercase">{date}</h3>
              <span className="h-px flex-1 bg-[#E8E4DA]" />
              <span className="text-[12px] font-semibold text-muted">
                {matches.length} match{matches.length === 1 ? "" : "es"}
              </span>
            </div>
            {matches.map((draft) => (
              <MatchCard
                key={draft.id}
                draft={draft}
                teams={teams}
                storeFind={(id) => findTeam(store, id)}
                busy={busyId === draft.id}
                dirty={Boolean(drafts[draft.id])}
                expanded={openId === draft.id}
                onChange={(update) => patch(draft.id, update)}
                onSave={() => void persist(draft, false)}
                onCancel={() => {
                  setDrafts((current) => {
                    const next = { ...current };
                    delete next[draft.id];
                    return next;
                  });
                  setOpenId(null);
                }}
                onDelete={() => setPendingDelete(draft)}
                onToggle={() => setOpenId((current) => (current === draft.id ? null : draft.id))}
                onMarkLive={() => void markLive({ ...draft, status: "live" })}
              />
            ))}
          </section>
        ))
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Remove this match?"
        body={
          pendingDelete
            ? "It will leave the public schedule. Published scores for this fixture will also be removed."
            : ""
        }
        confirmLabel="Remove match"
        busy={busyId === pendingDelete?.id}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            void remove(pendingDelete.id);
          }
        }}
      />

      {flash ? <FlashBanner message={flash} onDismiss={() => setFlash("")} /> : null}
    </div>
  );
}

function MatchCard({
  draft,
  teams,
  storeFind,
  busy,
  dirty,
  expanded,
  isNew,
  onChange,
  onSave,
  onCancel,
  onDelete,
  onToggle,
  onMarkLive,
}: {
  draft: Draft;
  teams: Team[];
  storeFind: (id: string) => Team | undefined;
  busy: boolean;
  dirty?: boolean;
  expanded: boolean;
  isNew?: boolean;
  onChange: (update: Partial<Draft>) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onMarkLive?: () => void;
}) {
  const home = storeFind(draft.homeId);
  const away = storeFind(draft.awayId);
  const group = GROUPS.find((item) => item.key === draft.groupKey);

  return (
    <article
      className={`overflow-hidden rounded-[24px] border border-[#E8E4DA] border-l-4 bg-white transition ${cardAccent(draft.status)} ${
        expanded ? "ring-2 ring-saffron/30" : "hover:shadow-[0_18px_40px_rgba(22,27,38,0.08)]"
      }`}
    >
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-6 md:p-5">
        <div className="flex min-w-[9.5rem] items-start gap-3 text-[#5B6472]">
          <span className="mt-0.5 grid size-10 place-items-center rounded-2xl bg-paper text-ink">
            <ClockIcon />
          </span>
          <div>
            <p className="font-mono text-[16px] font-extrabold text-ink">{draft.time || "TBC"}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[12px]">
              <PinIcon />
              <span className="line-clamp-1">{draft.venue || "Venue TBC"}</span>
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <TeamSide team={home} align="left" />
            <VsMark />
            <TeamSide team={away} align="right" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase ${statusTone(draft.status)}`}>
            {draft.status === "live" ? <span className="pulse-dot size-1.5 rounded-full bg-white" /> : null}
            {draft.status === "live" ? "Live now" : draft.status}
          </span>
          <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-[#5B6472]">
            {group?.label ?? "Match"}
          </span>
          {draft.status === "upcoming" && onMarkLive ? (
            <AdminButton type="button" className="h-9 px-3" onClick={onMarkLive} disabled={busy}>
              Go live
            </AdminButton>
          ) : null}
          {draft.status === "live" ? (
            <Link
              href="/admin/results"
              className="inline-flex h-9 items-center rounded-xl bg-ink px-3 text-[12px] font-semibold text-white"
            >
              Enter score
            </Link>
          ) : null}
          <AdminButton type="button" variant="secondary" className="h-9 px-3" onClick={onToggle}>
            {expanded ? "Close" : "Edit"}
          </AdminButton>
        </div>
      </div>

      {expanded ? (
        <div className="border-t border-[#F0EEE8] bg-[#FBF9F5] px-4 py-4 md:px-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <TeamPicker
              label="Home"
              value={draft.homeId}
              teams={teams}
              selected={home}
              onChange={(homeId) => onChange({ homeId })}
            />
            <div className="hidden items-center justify-center lg:flex">
              <VsMark />
            </div>
            <TeamPicker
              label="Away"
              value={draft.awayId}
              teams={teams}
              selected={away}
              onChange={(awayId) => onChange({ awayId })}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Field icon={<CalendarIcon />} label="Date">
              <input
                className={fieldClass}
                value={draft.dateLabel}
                placeholder="Sat 20 Sep"
                onChange={(event) => onChange({ dateLabel: event.target.value })}
              />
            </Field>
            <Field icon={<ClockIcon />} label="Tip-off">
              <input
                className={fieldClass}
                value={draft.time}
                placeholder="18:00"
                onChange={(event) => onChange({ time: event.target.value })}
              />
            </Field>
            <Field icon={<PinIcon />} label="Venue">
              <input
                className={fieldClass}
                value={draft.venue}
                placeholder="Changlimithang Court"
                onChange={(event) => onChange({ venue: event.target.value })}
              />
            </Field>
          </div>

          <div className="mt-4">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase">Stage</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {GROUPS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onChange({ groupKey: item.key })}
                  className={`h-9 rounded-full px-3 text-[12px] font-semibold ${
                    draft.groupKey === item.key ? "bg-ink text-gold" : "bg-white text-[#5B6472] ring-1 ring-[#E0DCD2]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {draft.groupKey === "C" ? (
              <input
                className={`${fieldClass} mt-2 max-w-sm`}
                value={draft.customGroup}
                placeholder="Custom group name"
                onChange={(event) => onChange({ customGroup: event.target.value })}
              />
            ) : null}
          </div>

          <div className="mt-4">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase">Public status</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {STATUSES.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onChange({ status: item.value })}
                  className={`h-9 rounded-full px-3 text-[12px] font-semibold ${
                    draft.status === item.value ? statusTone(item.value) : "bg-white text-[#5B6472] ring-1 ring-[#E0DCD2]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
            <AdminButton type="button" variant="ghost" className="text-loss hover:bg-[#FDECEC]" onClick={onDelete} disabled={busy}>
              <TrashIcon />
              {isNew ? "Discard" : "Remove"}
            </AdminButton>
            <AdminButton type="button" variant="secondary" onClick={onCancel} disabled={busy}>
              Cancel
            </AdminButton>
            <AdminButton type="button" onClick={onSave} disabled={busy}>
              {busy ? "Saving…" : isNew ? "Add match" : dirty ? "Save changes" : "Save"}
            </AdminButton>
          </div>
        </div>
      ) : null}
    </article>
  );
}

const fieldClass =
  "h-11 w-full rounded-xl border border-[#E0DCD2] bg-white px-3 text-[14px] outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/15";

function Field({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function TeamSide({ team, align }: { team?: Team; align: "left" | "right" }) {
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-2.5 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      {team ? <TeamTile team={team} size="lg" /> : <span className="grid size-11 place-items-center rounded-full border border-dashed border-[#D5D1C8] text-[11px] text-muted">TBD</span>}
      <div className="min-w-0">
        <p className="truncate font-display text-[16px] font-extrabold tracking-[0.03em] uppercase">
          {team?.name ?? "Select club"}
        </p>
        <p className="text-[12px] text-muted">{team?.city ?? (align === "left" ? "Home" : "Away")}</p>
      </div>
    </div>
  );
}

function TeamPicker({
  label,
  value,
  teams,
  selected,
  onChange,
}: {
  label: string;
  value: string;
  teams: Team[];
  selected?: Team;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const list = selected && !teams.some((team) => team.id === selected.id) ? [selected, ...teams] : teams;

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <p className="text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase">{label}</p>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="mt-1.5 flex w-full items-center gap-3 rounded-2xl border border-[#E0DCD2] bg-white px-3 py-2.5 text-left hover:border-saffron"
      >
        {selected ? <TeamTile team={selected} size="lg" /> : <span className="size-11 rounded-full bg-paper" />}
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-[16px] font-extrabold uppercase">{selected?.name ?? "TBD"}</span>
          <span className="text-[12px] text-muted">{selected?.city ?? "Choose a club"}</span>
        </span>
      </button>
      {open ? (
        <div className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-[#E8E4DA] bg-white p-2 shadow-[0_18px_40px_rgba(22,27,38,0.14)]">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-paper"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
          >
            <span className="size-9 rounded-full border border-dashed border-[#D5D1C8]" />
            <span className="text-[13px] font-semibold text-muted">To be decided</span>
          </button>
          {list.map((team) => (
            <button
              key={team.id}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-paper ${
                value === team.id ? "bg-qualify" : ""
              }`}
              onClick={() => {
                onChange(team.id);
                setOpen(false);
              }}
            >
              <TeamTile team={team} size="lg" />
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-semibold">{team.name}</span>
                <span className="text-[12px] text-muted">{team.city ?? team.code}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function StatChip({
  icon,
  label,
  value,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className={`min-w-[92px] rounded-2xl px-3 py-2 ${accent ? "bg-live/20" : "bg-white/10"}`}>
      <p className="flex items-center gap-1.5 text-[11px] tracking-[0.12em] text-[#A8AFBD] uppercase">
        {icon}
        {label}
      </p>
      <p className="font-display text-[26px] leading-none font-extrabold">{value}</p>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3.2" width="12" height="10.6" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6.4h12M5.2 2v2.4M10.8 2v2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.8V8l2.2 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 12.2s4-3.3 4-6A4 4 0 1 0 3 6.2c0 2.7 4 6 4 6Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7" cy="6.2" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="3" fill="currentColor" />
    </svg>
  );
}

function WhistleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 6.2h6.2a2.8 2.8 0 1 1 0 1.6H6.4L5 10.4H2V6.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function CourtIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 4v14M3 11h16" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="11" cy="11" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SearchGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
