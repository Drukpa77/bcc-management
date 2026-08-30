"use client";

import { useState } from "react";
import { useAppStore } from "@/components/admin/use-app-store";
import { AdminButton, Field, FlashBanner, fieldClass } from "@/components/admin/admin-ui";
import { QualificationLegend, StandingsPanel } from "@/components/tournament/standings-panel";
import { adjustStandingAction, resetAdjustmentAction } from "@/app/actions/results";
import { findTeam } from "@/lib/app-store";
import { buildLeagueView, teamMap } from "@/lib/tournament-engine";

export function StandingsManager() {
  const { store, ready, refresh } = useAppStore();
  const [pool, setPool] = useState<"A" | "B" | "table">("A");
  const [teamId, setTeamId] = useState("");
  const [delta, setDelta] = useState("-1");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState("");

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading standings…</p>;
  }

  const view = buildLeagueView(store, store.activeLeagueId);
  if (!view) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Create a league to view standings.</p>;
  }

  const teams = teamMap(store);
  const rows = view.league.format === "pools" ? (pool === "B" ? view.poolBStandings : view.poolAStandings) : view.table;
  const title =
    view.league.format === "pools" ? `Pool ${pool === "B" ? "B" : "A"} standings` : `${view.league.name} table`;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-saffron uppercase">{view.league.name} · {view.league.season}</p>
        <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted">
          Calculated from published results. Use an override only for official rulings.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {view.league.format === "pools" ? (
          <div className="flex rounded-xl bg-white p-1 ring-1 ring-[#E0DCD2]">
            {(["A", "B"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPool(item)}
                className={`h-9 rounded-lg px-3 text-[12px] font-semibold ${
                  pool === item ? "bg-ink text-gold" : "text-[#5B6472]"
                }`}
              >
                Pool {item}
              </button>
            ))}
          </div>
        ) : null}
        <QualificationLegend format={view.league.format} />
      </div>

      <StandingsPanel title={title.toUpperCase()} rows={rows} teams={teams} format={view.league.format} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-3xl bg-white p-5 ring-1 ring-[#E8E4DA]">
          <p className="font-display text-[16px] font-extrabold uppercase">Active adjustments</p>
          {view.adjustments.length === 0 ? (
            <p className="mt-2 text-[13px] text-muted">None. The table is entirely calculated from results.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {view.adjustments.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-paper px-3 py-2">
                  <div>
                    <p className="text-[13px] font-semibold">
                      {findTeam(store, item.teamId)?.name ?? item.teamId} · {item.pointsDelta > 0 ? "+" : ""}
                      {item.pointsDelta} pts
                    </p>
                    <p className="text-[12px] text-muted">{item.reason}</p>
                  </div>
                  <AdminButton
                    type="button"
                    variant="ghost"
                    className="h-9 text-loss hover:bg-[#FDECEC]"
                    onClick={() => {
                      setBusy(true);
                      void resetAdjustmentAction(item.id)
                        .then((result) => {
                          setFlash(result.message);
                          return refresh();
                        })
                        .finally(() => setBusy(false));
                    }}
                  >
                    Reset
                  </AdminButton>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form
          className="rounded-3xl bg-white p-5 ring-1 ring-[#E8E4DA]"
          onSubmit={(event) => {
            event.preventDefault();
            setBusy(true);
            void adjustStandingAction(view.league.id, teamId, Number(delta), reason)
              .then((result) => {
                setFlash(result.message);
                if (result.ok) {
                  setReason("");
                }
                return refresh();
              })
              .finally(() => setBusy(false));
          }}
        >
          <p className="font-display text-[16px] font-extrabold uppercase">Authorised adjustment</p>
          <p className="mt-1 text-[12px] text-muted">For forfeits, penalties, or corrections — not everyday scoring.</p>
          <div className="mt-4 space-y-3">
            <Field label="Team">
              <select className={fieldClass} value={teamId} onChange={(event) => setTeamId(event.target.value)} required>
                <option value="">Select team</option>
                {view.league.teamIds.map((id) => (
                  <option key={id} value={id}>
                    {findTeam(store, id)?.name ?? id}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Points change">
              <input className={fieldClass} value={delta} onChange={(event) => setDelta(event.target.value)} />
            </Field>
            <Field label="Reason">
              <textarea className={`${fieldClass} h-20 py-2`} value={reason} onChange={(event) => setReason(event.target.value)} required />
            </Field>
            <AdminButton type="submit" className="w-full" disabled={busy}>
              {busy ? "Applying…" : "Apply override"}
            </AdminButton>
          </div>
        </form>
      </div>
      {flash ? <FlashBanner message={flash} onDismiss={() => setFlash("")} /> : null}
    </div>
  );
}
