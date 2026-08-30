"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/components/admin/use-app-store";
import {
  AdminButton,
  ConfirmDialog,
  Drawer,
  Field,
  FlashBanner,
  PlusIcon,
  fieldClass,
} from "@/components/admin/admin-ui";
import { ResultCard } from "@/components/tournament/result-card";
import { saveResultAction, type ResultPayload } from "@/app/actions/results";
import { findTeam } from "@/lib/app-store";
import { buildLeagueView, fixtureMeta, isOfficialResult, stageLabel } from "@/lib/tournament-engine";
import type { Fixture, MatchStage } from "@/lib/types";

const emptyPayload: ResultPayload = { homeScore: 0, awayScore: 0 };

type StageFilter = "all" | "POOL" | "A" | "B" | MatchStage;

export function ResultsManager() {
  const { store, ready, refresh } = useAppStore();
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<StageFilter>("all");
  const [editing, setEditing] = useState<Fixture | null>(null);
  const [form, setForm] = useState<ResultPayload>(emptyPayload);
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState("");
  const [publishTarget, setPublishTarget] = useState<Fixture | null>(null);
  const [force, setForce] = useState(false);
  const [conflict, setConflict] = useState("");

  const view = store ? buildLeagueView(store, store.activeLeagueId) : null;
  const league = view?.league;
  const fixtures = view?.fixtures ?? [];

  const visible = useMemo(() => {
    return fixtures.filter((fixture) => {
      const meta = fixtureMeta(fixture);
      const hay = `${fixture.homeId} ${fixture.awayId} ${fixture.group}`.toLowerCase();
      const home = store ? findTeam(store, fixture.homeId) : undefined;
      const away = store ? findTeam(store, fixture.awayId) : undefined;
      const search = `${hay} ${home?.name ?? ""} ${away?.name ?? ""}`.toLowerCase();
      const matchesQuery = search.includes(query.trim().toLowerCase());
      const matchesStage =
        stage === "all" ||
        (stage === "A" && meta.pool === "A") ||
        (stage === "B" && meta.pool === "B") ||
        meta.stage === stage;
      return matchesQuery && matchesStage;
    });
  }, [fixtures, query, stage, store]);

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading results…</p>;
  }
  if (!league) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Create a league to manage results.</p>;
  }

  function openEditor(fixture: Fixture) {
    setEditing(fixture);
    setForm({
      homeScore: fixture.homeScore ?? 0,
      awayScore: fixture.awayScore ?? 0,
      notes: fixture.notes,
      mvp: fixture.mvp,
      overtime: fixture.overtime,
      homeQ1: fixture.homeQ1,
      homeQ2: fixture.homeQ2,
      homeQ3: fixture.homeQ3,
      homeQ4: fixture.homeQ4,
      awayQ1: fixture.awayQ1,
      awayQ2: fixture.awayQ2,
      awayQ3: fixture.awayQ3,
      awayQ4: fixture.awayQ4,
    });
    setConflict("");
  }

  async function save(mode: "draft" | "publish", nextForce = force) {
    if (!editing) {
      return;
    }
    setBusy(true);
    const result = await saveResultAction(editing.id, form, mode, { forceQualificationChange: nextForce });
    if (!result.ok) {
      setConflict(result.message);
      if (result.qualificationConflict) {
        setPublishTarget(editing);
      }
      setFlash(result.message);
      setBusy(false);
      return;
    }
    await refresh();
    setBusy(false);
    setEditing(null);
    setPublishTarget(null);
    setForce(false);
    setFlash(result.message);
  }

  const upcoming = fixtures.filter((fixture) => fixture.status === "upcoming" && !isOfficialResult(fixture));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-saffron uppercase">Results management</p>
          <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted">
            Publish a final score and the {league.name} table, qualification, and bracket update together.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {upcoming[0] ? (
            <AdminButton type="button" onClick={() => openEditor(upcoming[0])}>
              <PlusIcon />
              Add result
            </AdminButton>
          ) : null}
          <Link
            href="/results"
            className="inline-flex h-11 items-center rounded-xl border border-[#D8D3C8] bg-white px-4 text-[13px] font-semibold"
          >
            View public results
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search teams"
          className={`${fieldClass} mt-0 lg:max-w-sm`}
        />
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["all", "All"],
              ["A", "Pool A"],
              ["B", "Pool B"],
              ["QUARTER_FINAL", "Quarter finals"],
              ["SEMI_FINAL", "Semi finals"],
              ["FINAL", "Final"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setStage(id)}
              className={`h-10 rounded-xl px-3 text-[12px] font-semibold ${
                stage === id ? "bg-ink text-gold" : "bg-white text-[#5B6472] ring-1 ring-[#E0DCD2]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#D5D1C8] bg-white px-6 py-16 text-center">
          <p className="font-display text-[22px] font-extrabold uppercase">No completed matches yet</p>
          <p className="mt-2 text-[14px] text-muted">Results appear here once matches are entered and published.</p>
          {upcoming[0] ? (
            <AdminButton type="button" className="mt-5" onClick={() => openEditor(upcoming[0])}>
              <PlusIcon />
              Add first result
            </AdminButton>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-3 xl:grid-cols-2">
          {visible.map((fixture) => {
            const home = findTeam(store, fixture.homeId);
            const away = findTeam(store, fixture.awayId);
            return (
              <ResultCard
                key={fixture.id}
                fixture={fixture}
                home={home}
                away={away}
                href={`/matches/${fixture.id}`}
                actions={
                  <>
                    <AdminButton type="button" variant="secondary" className="h-9" onClick={() => openEditor(fixture)}>
                      Edit result
                    </AdminButton>
                    <Link
                      href={`/matches/${fixture.id}`}
                      className="inline-flex h-9 items-center rounded-xl px-3 text-[12px] font-semibold text-[#5B6472] hover:bg-paper"
                    >
                      Match details
                    </Link>
                  </>
                }
              />
            );
          })}
        </div>
      )}

      <Drawer
        open={Boolean(editing)}
        title={editing && isOfficialResult(editing) ? "Edit result" : "Add result"}
        subtitle={
          editing
            ? `${stageLabel(fixtureMeta(editing).stage, fixtureMeta(editing).pool)} · ${league.name}`
            : undefined
        }
        onClose={() => setEditing(null)}
        footer={
          <div className="flex flex-wrap gap-2">
            <AdminButton type="button" variant="secondary" className="flex-1" onClick={() => setEditing(null)}>
              Cancel
            </AdminButton>
            <AdminButton type="button" variant="ghost" className="flex-1" disabled={busy} onClick={() => void save("draft")}>
              {busy ? "Saving…" : "Save draft"}
            </AdminButton>
            <AdminButton type="button" className="flex-1" disabled={busy} onClick={() => setPublishTarget(editing)}>
              Publish result
            </AdminButton>
          </div>
        }
      >
        {editing ? (
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <ScoreFields fixture={editing} storeHome={findTeam(store, editing.homeId)?.name} storeAway={findTeam(store, editing.awayId)?.name} form={form} setForm={setForm} />
          </form>
        ) : null}
      </Drawer>

      <ConfirmDialog
        open={Boolean(publishTarget)}
        title={conflict ? "This result affects qualification" : "Publish final result?"}
        body={
          publishTarget
            ? conflict ||
              `${findTeam(store, publishTarget.homeId)?.name ?? "Home"} ${form.homeScore} – ${form.awayScore} ${findTeam(store, publishTarget.awayId)?.name ?? "Away"}. Publishing updates standings and the bracket.`
            : ""
        }
        confirmLabel="Publish result"
        busyLabel="Publishing…"
        busy={busy}
        onCancel={() => {
          setPublishTarget(null);
          setConflict("");
        }}
        onConfirm={() => {
          if (conflict) {
            setForce(true);
          }
          void save("publish", Boolean(conflict) || force);
        }}
      />

      {flash ? <FlashBanner message={flash} onDismiss={() => setFlash("")} /> : null}
    </div>
  );
}

function ScoreFields({
  fixture,
  storeHome,
  storeAway,
  form,
  setForm,
}: {
  fixture: Fixture;
  storeHome?: string;
  storeAway?: string;
  form: ResultPayload;
  setForm: (next: ResultPayload) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Field label={storeHome ?? fixture.homePlaceholder ?? "Home"}>
          <input
            className={fieldClass}
            inputMode="numeric"
            value={form.homeScore}
            onChange={(event) => setForm({ ...form, homeScore: Number(event.target.value) || 0 })}
          />
        </Field>
        <Field label={storeAway ?? fixture.awayPlaceholder ?? "Away"}>
          <input
            className={fieldClass}
            inputMode="numeric"
            value={form.awayScore}
            onChange={(event) => setForm({ ...form, awayScore: Number(event.target.value) || 0 })}
          />
        </Field>
      </div>
      <button
        type="button"
        onClick={() => setForm({ ...form, overtime: !form.overtime })}
        className={`flex h-11 w-full items-center justify-between rounded-2xl px-4 text-[13px] ${
          form.overtime ? "bg-[#F4EEE4] text-[#9A4F1C]" : "bg-paper text-[#5B6472]"
        }`}
      >
        <span className="font-semibold">Overtime</span>
        <span>{form.overtime ? "On" : "Off"}</span>
      </button>
      <Field label="MVP">
        <input className={fieldClass} value={form.mvp ?? ""} onChange={(event) => setForm({ ...form, mvp: event.target.value })} />
      </Field>
      <Field label="Match notes">
        <textarea
          className={`${fieldClass} h-24 py-2`}
          value={form.notes ?? ""}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
        />
      </Field>
    </>
  );
}
