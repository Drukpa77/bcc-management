"use client";

import { useState } from "react";
import Link from "next/link";
import { TeamTile } from "@/components/ui/team-tile";
import { useAppStore } from "@/components/admin/use-app-store";
import { createPlayerAction, deletePlayerAction, updatePlayerAction } from "@/app/actions/tournament";
import { ImageField } from "@/components/admin/image-field";
import {
  AdminButton,
  ConfirmDialog,
  Drawer,
  Field,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  fieldClass,
} from "@/components/admin/admin-ui";
import { findTeam } from "@/lib/app-store";
import type { Player } from "@/lib/types";

const POSITIONS = [
  { id: "PG", label: "Point guard" },
  { id: "SG", label: "Shooting guard" },
  { id: "SF", label: "Small forward" },
  { id: "PF", label: "Power forward" },
  { id: "C", label: "Center" },
] as const;

const emptyPlayer = {
  name: "",
  number: "",
  position: "PG",
  age: "",
  height: "",
  captain: false,
  image: undefined as string | undefined,
};

export function TeamRoster({ id }: { id: string }) {
  const { store, ready, run } = useAppStore();
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPlayer);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Player | null>(null);

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading roster…</p>;
  }

  const team = findTeam(store, id);
  if (!team) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">This team was not found.</p>;
  }

  const teamId = team.id;
  const leagues = store.leagues.filter((league) => league.teamIds.includes(teamId));
  const roster = store.players
    .filter((player) => player.teamId === teamId)
    .slice()
    .sort((a, b) => a.number - b.number);
  const editing = editingId ? roster.find((player) => player.id === editingId) : undefined;

  function openCreate() {
    setEditingId(null);
    setForm(emptyPlayer);
    setError("");
    setPanelOpen(true);
  }

  function openEdit(player: Player) {
    setEditingId(player.id);
    setForm({
      name: player.name,
      number: String(player.number),
      position: player.position.includes("·") ? (player.position.split("·").pop()?.trim() ?? player.position) : player.position,
      age: player.age ? String(player.age) : "",
      height: player.height ?? "",
      captain: player.captain,
      image: player.image,
    });
    setError("");
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setEditingId(null);
    setForm(emptyPlayer);
    setError("");
  }

  function save() {
    const name = form.name.trim();
    const number = Number(form.number);
    if (!name || !Number.isInteger(number) || number < 0) {
      setError("Add a name and jersey number.");
      return;
    }
    if (roster.some((player) => player.number === number && player.id !== editingId)) {
      setError(`#${number} is already on this roster.`);
      return;
    }
    const payload = {
      name,
      number,
      position: form.position,
      age: form.age.trim() && Number.isFinite(Number(form.age)) ? Number(form.age) : undefined,
      height: form.height.trim() || undefined,
      image: form.image ?? null,
      captain: form.captain,
    };
    setBusy(true);
    void run(() =>
      editingId ? updatePlayerAction(editingId, payload) : createPlayerAction(teamId, payload),
    )
      .then(closePanel)
      .catch((issue) => {
        setError(issue instanceof Error ? issue.message : "Could not save this player.");
      })
      .finally(() => setBusy(false));
  }

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-3xl bg-ink text-white">
        <div className="h-1.5" style={{ background: team.color }} />
        <div className="flex flex-wrap items-center gap-5 px-6 py-6">
          <TeamTile team={team} size="xl" />
          <div className="min-w-0 flex-1">
            <Link href="/admin/teams" className="text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
              ← All teams
            </Link>
            <h2 className="font-display text-[32px] font-extrabold tracking-[0.03em] uppercase">{team.name}</h2>
            <p className="text-[14px] text-[#A8AFBD]">
              {leagues.length ? leagues.map((league) => league.name).join(" · ") : "Not in a league"}
              {team.city ? ` · ${team.city}` : ""}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[34px] font-extrabold leading-none text-gold">{roster.length}</p>
            <p className="mt-1 text-[11px] tracking-[0.14em] text-[#7A828F] uppercase">On roster</p>
          </div>
          <AdminButton type="button" onClick={openCreate}>
            <PlusIcon />
            Add player
          </AdminButton>
        </div>
      </div>

      {roster.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#D5D1C8] bg-white px-6 py-20 text-center">
          <p className="font-display text-[24px] font-extrabold uppercase">Empty roster</p>
          <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
            Add the first player to {team.name}. Jersey numbers stay unique on this team.
          </p>
          <AdminButton type="button" className="mt-6" onClick={openCreate}>
            <PlusIcon />
            Add first player
          </AdminButton>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {roster.map((player) => (
            <article
              key={player.id}
              className={`rounded-3xl bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(22,27,38,0.07)] ${
                editingId === player.id ? "ring-2 ring-saffron" : "ring-1 ring-[#E8E4DA]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl font-mono text-[22px] font-extrabold text-white ${
                    player.captain ? "ring-2 ring-gold ring-offset-2" : ""
                  }`}
                  style={{ background: team.color }}
                >
                  {player.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={player.image} alt="" className="absolute inset-0 size-full object-cover" />
                  ) : (
                    player.number
                  )}
                  {player.image ? (
                    <span className="absolute right-1 bottom-1 rounded bg-ink/80 px-1 font-mono text-[9px]">{player.number}</span>
                  ) : null}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] font-semibold">{player.name}</p>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {player.position}
                    {player.age ? ` · ${player.age}` : ""}
                    {player.height ? ` · ${player.height}` : ""}
                  </p>
                  {player.captain ? (
                    <span className="mt-2 inline-flex rounded-full bg-[#F4EEE4] px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-[#9A4F1C] uppercase">
                      Captain
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <AdminButton
                  type="button"
                  variant="secondary"
                  className="h-10 flex-1"
                  onClick={() => openEdit(player)}
                >
                  <PencilIcon />
                  Edit
                </AdminButton>
                <AdminButton
                  type="button"
                  variant="ghost"
                  className="h-10 px-3 text-loss hover:bg-[#FDECEC]"
                  aria-label={`Remove ${player.name}`}
                  onClick={() => setPendingDelete(player)}
                >
                  <TrashIcon />
                </AdminButton>
              </div>
            </article>
          ))}
        </div>
      )}

      <Drawer
        open={panelOpen}
        title={editing ? "Edit player" : "Add player"}
        subtitle={`${team.name} · jersey numbers must be unique`}
        onClose={closePanel}
        footer={
          <div className="flex gap-2">
            <AdminButton type="button" variant="secondary" className="flex-1" onClick={closePanel}>
              Cancel
            </AdminButton>
            <AdminButton type="button" className="flex-1" disabled={busy} onClick={save}>
              {busy ? "Saving…" : editing ? "Save player" : "Add to roster"}
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
          <ImageField
            label="Player photo"
            hint="Optional. Head-and-shoulders works best on the public roster."
            value={form.image}
            fallback={form.number || "#"}
            onChange={(image) => setForm({ ...form, image })}
          />
          <div className="flex items-center gap-3 rounded-2xl bg-paper p-3.5">
            <span
              className="relative grid size-14 place-items-center overflow-hidden rounded-2xl font-mono text-[22px] font-extrabold text-white"
              style={{ background: team.color }}
            >
              {form.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.image} alt="" className="absolute inset-0 size-full object-cover" />
              ) : (
                form.number || "#"
              )}
            </span>
            <div>
              <p className="font-display text-[18px] font-extrabold uppercase">{form.name || "Player name"}</p>
              <p className="text-[13px] text-muted">
                {POSITIONS.find((pos) => pos.id === form.position)?.label ?? form.position}
                {form.captain ? " · Captain" : ""}
              </p>
            </div>
          </div>
          {error ? <p className="rounded-xl bg-[#FDECEC] px-3 py-2 text-[13px] text-loss">{error}</p> : null}
          <Field label="Full name">
            <input
              autoFocus
              className={fieldClass}
              value={form.name}
              placeholder="Karma Dorji"
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Jersey">
              <input
                className={fieldClass}
                inputMode="numeric"
                value={form.number}
                placeholder="23"
                onChange={(event) => setForm({ ...form, number: event.target.value })}
              />
            </Field>
            <Field label="Age" hint="Optional — leave blank if you do not have it">
              <input
                className={fieldClass}
                inputMode="numeric"
                value={form.age}
                placeholder="Not required"
                onChange={(event) => setForm({ ...form, age: event.target.value })}
              />
            </Field>
          </div>
          <Field label="Position">
            <div className="mt-1.5 grid grid-cols-5 gap-1.5">
              {POSITIONS.map((pos) => (
                <button
                  key={pos.id}
                  type="button"
                  onClick={() => setForm({ ...form, position: pos.id })}
                  className={`h-11 rounded-xl text-[12px] font-bold transition ${
                    form.position === pos.id ? "bg-ink text-gold" : "border border-[#E0DCD2] bg-white text-[#5B6472] hover:border-ink/20"
                  }`}
                  title={pos.label}
                >
                  {pos.id}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Height">
            <input
              className={fieldClass}
              value={form.height}
              placeholder="178 cm"
              onChange={(event) => setForm({ ...form, height: event.target.value })}
            />
          </Field>
          <button
            type="button"
            onClick={() => setForm({ ...form, captain: !form.captain })}
            className={`flex h-12 items-center justify-between rounded-2xl px-4 text-left text-[14px] transition ${
              form.captain ? "bg-[#F4EEE4] text-[#9A4F1C]" : "bg-paper text-[#5B6472]"
            }`}
          >
            <span className="font-semibold">Team captain</span>
            <span className="text-[12px] font-bold tracking-[0.08em] uppercase">{form.captain ? "On" : "Off"}</span>
          </button>
        </form>
      </Drawer>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Remove player?"
        body={pendingDelete ? `${pendingDelete.name} will leave the ${team.name} roster.` : ""}
        confirmLabel="Remove player"
        busy={busy}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) {
            return;
          }
          setBusy(true);
          void run(() => deletePlayerAction(pendingDelete.id))
            .then(() => {
              if (editingId === pendingDelete.id) {
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
