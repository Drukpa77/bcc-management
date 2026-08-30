"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/components/admin/use-app-store";
import { AdminButton, Drawer, Field, PlusIcon, fieldClass } from "@/components/admin/admin-ui";
import { createLeagueAction, setActiveLeagueAction } from "@/app/actions/tournament";
import { FORMAT_LABEL, getDraw, makeId, type LeagueFormat, type LeagueGender } from "@/lib/app-store";
import { buildLeagueView } from "@/lib/tournament-engine";

const emptyForm = {
  name: "",
  season: "2026",
  location: "Changlimithang, Thimphu",
  gender: "men" as LeagueGender,
  format: "pools" as LeagueFormat,
};

export function CompetitionsManager() {
  const router = useRouter();
  const { store, ready, run } = useAppStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading competitions…</p>;
  }

  function create() {
    const name = form.name.trim();
    if (!name) {
      setError("Give the competition a name.");
      return;
    }
    const createdId = makeId(name);
    setBusy(true);
    void run(() =>
      createLeagueAction({
        id: createdId,
        name,
        season: form.season.trim() || "2026",
        location: form.location.trim() || "Thimphu",
        gender: form.gender,
        format: form.format,
      }),
    )
      .then(() => {
        setOpen(false);
        setForm(emptyForm);
        router.push(`/admin/competitions/${createdId}`);
      })
      .finally(() => setBusy(false));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-saffron uppercase">Cup calendar</p>
          <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted">
            {store.leagues.length} competition{store.leagues.length === 1 ? "" : "s"}. Open one to set the roster, then draw pools or generate fixtures.
          </p>
        </div>
        <AdminButton
          type="button"
          onClick={() => {
            setError("");
            setOpen(true);
          }}
        >
          <PlusIcon />
          New competition
        </AdminButton>
      </div>

      {store.leagues.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#D5D1C8] bg-white px-6 py-16 text-center">
          <p className="font-display text-[22px] font-extrabold uppercase">No competitions yet</p>
          <p className="mt-2 text-[14px] text-muted">Create the first league to start adding clubs and fixtures.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {store.leagues.map((league) => {
            const draw = getDraw(store, league.id);
            const view = buildLeagueView(store, league.id);
            const managing = store.activeLeagueId === league.id;
            return (
              <article
                key={league.id}
                className={`overflow-hidden rounded-3xl bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(22,27,38,0.08)] ${
                  managing ? "ring-2 ring-saffron" : "ring-1 ring-[#E8E4DA]"
                }`}
              >
                <div className="h-1.5 bg-[linear-gradient(90deg,#E8611C,#F0B429,#161B26)]" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/admin/competitions/${league.id}`}
                        className="font-display text-[22px] font-extrabold tracking-[0.03em] uppercase hover:text-saffron"
                      >
                        {league.name}
                      </Link>
                      <p className="mt-0.5 text-[13px] text-muted">
                        {league.season} · {league.location}
                      </p>
                    </div>
                    <Badge tone={league.status} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-[#5B6472] capitalize">
                      {league.gender}
                    </span>
                    <span className="rounded-full bg-[#F4EEE4] px-2.5 py-1 text-[11px] font-semibold text-[#7A5340]">
                      {FORMAT_LABEL[league.format]}
                    </span>
                    <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-[#5B6472]">
                      {league.teamIds.length} {league.teamIds.length === 1 ? "team" : "teams"}
                    </span>
                    {league.format === "pools" ? (
                      <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-[#5B6472]">
                        {draw.status === "confirmed" ? "Pools locked" : draw.status === "idle" ? "No draw yet" : "Draw in progress"}
                      </span>
                    ) : null}
                  </div>

                  {league.format === "pools" && view ? (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <MiniProgress label="Pool A" done={view.poolProgress.a.done} expected={view.poolProgress.a.expected} />
                      <MiniProgress label="Pool B" done={view.poolProgress.b.done} expected={view.poolProgress.b.expected} />
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href={`/admin/competitions/${league.id}`}
                      className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-ink text-[13px] font-semibold text-white hover:bg-ink-2"
                      onClick={() => void run(() => setActiveLeagueAction(league.id))}
                    >
                      Open league
                    </Link>
                    <Link
                      href="/admin/results"
                      className="inline-flex h-10 items-center rounded-xl border border-[#D8D3C8] px-3 text-[13px] font-semibold hover:bg-paper"
                      onClick={() => void run(() => setActiveLeagueAction(league.id))}
                    >
                      Results
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Drawer
        open={open}
        title="New competition"
        subtitle="Create the league first. Add clubs from its roster page."
        onClose={() => setOpen(false)}
        footer={
          <div className="flex gap-2">
            <AdminButton type="button" variant="secondary" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton type="button" className="flex-1" disabled={busy} onClick={create}>
              {busy ? "Creating…" : "Create league"}
            </AdminButton>
          </div>
        }
      >
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            create();
          }}
        >
          {error ? <p className="rounded-xl bg-[#FDECEC] px-3 py-2 text-[13px] text-loss">{error}</p> : null}
          <Field label="Competition name">
            <input
              autoFocus
              className={fieldClass}
              value={form.name}
              placeholder="Interstate Championship"
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Season">
              <input className={fieldClass} value={form.season} onChange={(event) => setForm({ ...form, season: event.target.value })} />
            </Field>
            <Field label="Division">
              <select
                className={fieldClass}
                value={form.gender}
                onChange={(event) => setForm({ ...form, gender: event.target.value as LeagueGender })}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="mixed">Mixed</option>
              </select>
            </Field>
          </div>
          <Field label="Location">
            <input className={fieldClass} value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
          </Field>
          <Field label="Format">
            <div className="mt-1.5 grid gap-1.5">
              {(
                [
                  ["pools", "Pool + Playoffs", "Two groups, then a knockout bracket"],
                  ["round-robin", "Round Robin", "Every team plays every other team"],
                  ["knockout", "Knockout", "Single-elimination from the start"],
                ] as const
              ).map(([id, label, hint]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setForm({ ...form, format: id })}
                  className={`rounded-2xl px-3.5 py-3 text-left ${
                    form.format === id ? "bg-ink text-white" : "bg-paper text-ink-2"
                  }`}
                >
                  <p className="text-[13px] font-semibold">{label}</p>
                  <p className={`text-[12px] ${form.format === id ? "text-[#A8AFBD]" : "text-muted"}`}>{hint}</p>
                </button>
              ))}
            </div>
          </Field>
        </form>
      </Drawer>
    </div>
  );
}

function MiniProgress({ label, done, expected }: { label: string; done: number; expected: number }) {
  const pct = expected ? Math.min(100, (done / expected) * 100) : 0;
  return (
    <div className="rounded-2xl bg-paper px-3 py-2">
      <div className="flex items-center justify-between text-[11px] font-semibold text-[#5B6472]">
        <span>{label}</span>
        <span className="font-mono">
          {done}/{expected || "–"}
        </span>
      </div>
      <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white">
        <i className="block h-full rounded-full bg-saffron" style={{ width: `${pct}%` }} />
      </span>
    </div>
  );
}
