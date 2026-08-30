"use client";

import { useEffect, type ReactNode } from "react";
import { setActiveLeagueAction } from "@/app/actions/tournament";
import { useAppStore } from "@/components/admin/use-app-store";

export function UseActiveLeague({ leagueId, children }: { leagueId: string; children: ReactNode }) {
  const { store, ready, run } = useAppStore();

  useEffect(() => {
    if (!ready || !store || store.activeLeagueId === leagueId) {
      return;
    }
    if (!store.leagues.some((league) => league.id === leagueId)) {
      return;
    }
    void run(() => setActiveLeagueAction(leagueId));
  }, [leagueId, ready, run, store]);

  return children;
}
