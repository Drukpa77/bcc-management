"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TeamTile } from "@/components/ui/team-tile";
import { useAppStore } from "@/components/admin/use-app-store";
import { createTeamAction, deleteTeamAction, updateTeamAction } from "@/app/actions/tournament";
import {
  AdminButton,
  ConfirmDialog,
  Drawer,
  Field,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  fieldClass,
} from "@/components/admin/admin-ui";
import { ImageField } from "@/components/admin/image-field";
import { TEAM_COLORS, allTeams, type LeagueGender } from "@/lib/app-store";
import type { Team } from "@/lib/types";

const emptyForm = {
  name: "",
  code: "",
  city: "",
  gender: "men" as LeagueGender,
  color: TEAM_COLORS[0],
  logo: undefined as string | undefined,
};

export function TeamsManager() {
  const { store, ready, run } = useAppStore();
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState<"all" | "men" | "women">("all");
  const [scope, setScope] = useState<"league" | "all">("league");
  const [panel, setPanel] = useState<"closed" | "create" | string>("closed");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Team | null>(null);

  const teams = useMemo(() => (store ? allTeams(store) : []), [store]);
  const editing = typeof panel === "string" && panel !== "closed" && panel !== "create"
    ? teams.find((team) => team.id === panel)
    : undefined;

  const league = store?.leagues.find((item) => item.id === store.activeLeagueId);
  const visible = teams.filter((team) => {
    const haystack = `${team.name} ${team.code} ${team.city ?? ""}`.toLowerCase();
    const matchesQuery = haystack.includes(query.trim().toLowerCase());
    const matchesDiv = division === "all" || team.gender === division;
    const matchesLeague = scope === "all" || !league || league.teamIds.includes(team.id);
    return matchesQuery && matchesDiv && matchesLeague;
  });

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading the club directory…</p>;
  }

  function openCreate() {
    setPanel("create");
    setForm(emptyForm);
    setError("");
  }

  function openEdit(team: Team) {
    setPanel(team.id);
    setForm({
      name: team.name,
      code: team.code,
      city: team.city ?? "",
      gender: team.gender ?? "men",
      color: team.color,
      logo: team.logo,
    });
    setError("");
  }

  function closePanel() {
    setPanel("closed");
    setForm(emptyForm);
    setError("");
  }

  function save() {
    const name = form.name.trim();
    const code = (form.code.trim() || name.slice(0, 3)).toUpperCase().slice(0, 3);
    if (!name) {
      setError("A team needs a name.");
      return;
    }
    const payload = {
      name,
      code,
      shortName: name.split(" ").pop() ?? name,
      color: form.color,
      city: form.city.trim() || undefined,
      gender: form.gender === "mixed" ? undefined : form.gender,
      logo: form.logo ?? null,
    };
    setBusy(true);
    void run(() =>
      editing ? updateTeamAction(editing.id, payload) : createTeamAction(payload),
    )
      .then(closePanel)
      .catch((issue) => {
        setError(issue instanceof Error ? issue.message : "Could not save this team.");
      })
      .finally(() => setBusy(false));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-saffron uppercase">Club directory</p>
          <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted">
            {teams.length} clubs in the federation. Open a roster to add players — edit the club without leaving this page.
          </p>
        </div>
        <AdminButton type="button" onClick={openCreate}>
          <PlusIcon />
          Add team
        </AdminButton>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted">
            <SearchIcon />
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search clubs, codes, or cities"
            className={`${fieldClass} mt-0 pl-10`}
          />
        </label>
        <div className="flex rounded-xl border border-[#E0DCD2] bg-white p-1">
          {(["league", "all"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setScope(item)}
              className={`h-9 rounded-lg px-3.5 text-[12px] font-semibold capitalize transition ${
                scope === item ? "bg-ink text-gold" : "text-[#5B6472] hover:text-ink-2"
              }`}
            >
              {item === "league" ? "This league" : "All clubs"}
            </button>
          ))}
        </div>
        <div className="flex rounded-xl border border-[#E0DCD2] bg-white p-1">
          {(["all", "men", "women"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setDivision(item)}
              className={`h-9 rounded-lg px-3.5 text-[12px] font-semibold capitalize transition ${
                division === item ? "bg-ink text-gold" : "text-[#5B6472] hover:text-ink-2"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#D5D1C8] bg-white/70 px-6 py-16 text-center">
          <p className="font-display text-[22px] font-extrabold uppercase">No clubs match</p>
          <p className="mt-1 text-[14px] text-muted">Try another search, or add a new team.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((team) => {
            const leagues = store.leagues.filter((league) => league.teamIds.includes(team.id));
            const roster = store.players.filter((player) => player.teamId === team.id).length;
            const selected = panel === team.id;
            return (
              <article
                key={team.id}
                className={`overflow-hidden rounded-3xl bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(22,27,38,0.08)] ${
                  selected ? "ring-2 ring-saffron" : "ring-1 ring-[#E8E4DA]"
                }`}
              >
                <div
                  className="relative flex h-[92px] items-end px-4 pb-3"
                  style={{
                    background: `linear-gradient(135deg, ${team.color} 0%, color-mix(in srgb, ${team.color} 72%, #161B26) 100%)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-25" style={{ background: "repeating-linear-gradient(115deg, transparent 0 14px, rgba(255,255,255,0.12) 14px 16px)" }} />
                  <TeamTile team={team} size="lg" />
                  <span className="relative ml-auto font-display text-[13px] font-bold tracking-[0.16em] text-white/80 uppercase">
                    {team.gender === "women" ? "Women" : "Men"}
                  </span>
                </div>
                <div className="p-4">
                  <Link
                    href={`/admin/teams/${team.id}`}
                    className="font-display text-[20px] font-extrabold tracking-[0.03em] text-ink-2 uppercase hover:text-saffron"
                  >
                    {team.name}
                  </Link>
                  <p className="mt-0.5 text-[13px] text-muted">{team.city ?? "City not set"}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-[#5B6472]">
                      {roster} {roster === 1 ? "player" : "players"}
                    </span>
                    {leagues.length ? (
                      leagues.map((league) => (
                        <span key={league.id} className="rounded-full bg-[#F4EEE4] px-2.5 py-1 text-[11px] font-semibold text-[#7A5340]">
                          {league.name}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-[#EEECE6] px-2.5 py-1 text-[11px] text-muted">Unassigned</span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/teams/${team.id}`}
                      className="inline-flex h-10 min-w-[7.5rem] flex-1 items-center justify-center rounded-xl bg-ink px-3 text-[13px] font-semibold text-white transition hover:bg-ink-2"
                    >
                      Open roster
                    </Link>
                    <AdminButton
                      type="button"
                      variant="secondary"
                      className="h-10 min-w-[5.75rem] px-3"
                      onClick={() => openEdit(team)}
                    >
                      <PencilIcon />
                      Edit
                    </AdminButton>
                    <AdminButton
                      type="button"
                      variant="danger"
                      className="h-10 min-w-[5.75rem] px-3"
                      onClick={() => setPendingDelete(team)}
                    >
                      <TrashIcon />
                      Delete
                    </AdminButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Drawer
        open={panel !== "closed"}
        title={editing ? "Edit team" : "New team"}
        subtitle={editing ? "Changes apply everywhere this club appears." : "Create the club first. Add players from its roster."}
        onClose={closePanel}
        footer={
          <div className="flex gap-2">
            <AdminButton type="button" variant="secondary" className="flex-1" onClick={closePanel}>
              Cancel
            </AdminButton>
            <AdminButton type="button" className="flex-1" disabled={busy} onClick={save}>
              {busy ? "Saving…" : editing ? "Save changes" : "Create team"}
            </AdminButton>
          </div>
        }
      >
        <form
          className="flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <div className="overflow-hidden rounded-2xl bg-paper">
            <div
              className="flex h-16 items-end px-4 pb-3"
              style={{
                background: `linear-gradient(135deg, ${form.color} 0%, color-mix(in srgb, ${form.color} 72%, #161B26) 100%)`,
              }}
            >
              <TeamTile code={form.code || "NEW"} color={form.color} logo={form.logo} size="lg" />
            </div>
            <div className="px-4 py-3">
              <p className="font-display text-[18px] font-extrabold uppercase">{form.name || "Team name"}</p>
              <p className="text-[12px] text-muted">
                {form.city || "City"} · {form.gender === "women" ? "Women" : "Men"}
              </p>
            </div>
          </div>
          {error ? <p className="rounded-xl bg-[#FDECEC] px-3 py-2 text-[13px] text-loss">{error}</p> : null}
          <ImageField
            label="Club logo"
            hint="Square works best. Shown on fixtures, tables, and the public site."
            variant="circle"
            value={form.logo}
            fallback={(form.code || "BB").slice(0, 2)}
            onChange={(logo) => setForm({ ...form, logo })}
          />
          <Field label="Team name">
            <input
              autoFocus
              className={fieldClass}
              value={form.name}
              placeholder="Thimphu Warriors"
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Code" hint="Three letters">
              <input
                className={fieldClass}
                value={form.code}
                maxLength={3}
                placeholder="THW"
                onChange={(event) => setForm({ ...form, code: event.target.value.toUpperCase() })}
              />
            </Field>
            <Field label="Division">
              <select
                className={fieldClass}
                value={form.gender}
                onChange={(event) => setForm({ ...form, gender: event.target.value as LeagueGender })}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </Field>
          </div>
          <Field label="City">
            <input
              className={fieldClass}
              value={form.city}
              placeholder="Thimphu"
              onChange={(event) => setForm({ ...form, city: event.target.value })}
            />
          </Field>
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase">Kit colour</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {TEAM_COLORS.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => setForm({ ...form, color: swatch })}
                  className={`size-8 rounded-full transition ${form.color === swatch ? "ring-2 ring-ink ring-offset-2" : "hover:scale-105"}`}
                  style={{ background: swatch }}
                  aria-label={swatch}
                />
              ))}
            </div>
          </div>
        </form>
      </Drawer>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this team?"
        body={pendingDelete ? `${pendingDelete.name} and its players will be removed from leagues and fixtures.` : ""}
        confirmLabel="Delete team"
        busy={busy}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) {
            return;
          }
          setBusy(true);
          void run(() => deleteTeamAction(pendingDelete.id))
            .then(() => {
              if (panel === pendingDelete.id) {
                closePanel();
              }
              setPendingDelete(null);
            })
            .finally(() => setBusy(false));
        }}
      />
    </div>
  );
}
