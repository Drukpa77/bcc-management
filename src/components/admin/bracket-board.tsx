"use client";

import { useAppStore } from "@/components/admin/use-app-store";
import { BracketTree } from "@/components/tournament/bracket-tree";
import { buildLeagueView, teamMap } from "@/lib/tournament-engine";

export function BracketBoard() {
  const { store, ready } = useAppStore();

  if (!ready || !store) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Loading bracket…</p>;
  }

  const view = buildLeagueView(store, store.activeLeagueId);
  if (!view) {
    return <p className="px-1 py-12 text-center text-[13px] text-muted">Create a league to view the bracket.</p>;
  }

  if (view.league.format !== "pools") {
    return (
      <div className="rounded-3xl border border-dashed border-[#D5D1C8] bg-white px-6 py-16 text-center">
        <p className="font-display text-[22px] font-extrabold uppercase">{view.league.name}</p>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-muted">
          This competition is {view.league.format === "round-robin" ? "round robin" : "knockout"} and does not use the pool-to-playoff bracket.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-saffron uppercase">
          {view.league.name} · {view.league.season}
        </p>
        <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-muted">
          A1 and B1 skip to the semis. QF1 is A2 v B3. QF2 is B2 v A3. Winners move automatically when a result is published.
        </p>
      </div>
      <BracketTree
        matches={view.bracket}
        teams={teamMap(store)}
        championId={view.championId}
        ready={view.bracketReady}
        remaining={view.remainingPoolMatches}
      />
    </div>
  );
}
