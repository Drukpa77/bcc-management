"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { loadTournamentAction } from "@/app/actions/tournament";
import type { AppStore } from "@/lib/app-store";

type StoreApi = {
  store: AppStore | null;
  ready: boolean;
  refresh: () => Promise<void>;
  run: (fn: () => Promise<unknown>) => Promise<void>;
};

const StoreContext = createContext<StoreApi | null>(null);

let persistedStore: AppStore | null = null;
let inflight: Promise<AppStore> | null = null;

function useTournamentStore(enabled: boolean, initial: AppStore | null) {
  const [store, setStore] = useState<AppStore | null>(initial ?? persistedStore);

  const refresh = useCallback(async () => {
    if (!inflight) {
      inflight = loadTournamentAction()
        .then((next) => {
          persistedStore = next;
          return next;
        })
        .finally(() => {
          inflight = null;
        });
    }
    const next = await inflight;
    setStore(next);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (store) {
      persistedStore = store;
      return;
    }
    void refresh();
  }, [enabled, refresh, store]);

  const run = useCallback(
    async (fn: () => Promise<unknown>) => {
      await fn();
      await refresh();
    },
    [refresh],
  );

  return useMemo(
    () => ({ store, ready: store !== null, refresh, run }),
    [store, refresh, run],
  );
}

export function AdminStoreProvider({
  children,
  initial = null,
}: {
  children: ReactNode;
  initial?: AppStore | null;
}) {
  const pathname = usePathname();
  const enabled = pathname !== "/admin/login";
  const api = useTournamentStore(enabled, initial);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(StoreContext);
  const local = useTournamentStore(ctx === null, null);
  return ctx ?? local;
}
