"use client";

import { useEffect } from "react";
import { Flags } from "@/components/brand/flags";
import { DrawWheel } from "@/components/draw/draw-wheel";
import { TeamTile } from "@/components/ui/team-tile";
import { useAppStore } from "@/components/admin/use-app-store";
import { findTeam, getDraw } from "@/lib/app-store";

export function PresentationBoard() {
  const { store, ready, refresh } = useAppStore();

  useEffect(() => {
    const timer = window.setInterval(() => {
      void refresh();
    }, 1500);
    return () => window.clearInterval(timer);
  }, [refresh]);

  if (!ready || !store) {
    return <div className="grid min-h-full place-items-center bg-ink text-[#7A828F]">Connecting…</div>;
  }

  const league = store.leagues.find((item) => item.id === store.activeLeagueId) ?? store.leagues[0];
  const draw = league ? getDraw(store, league.id) : undefined;
  const remaining =
    draw?.remaining
      .map((id) => findTeam(store, id))
      .filter((team): team is NonNullable<typeof team> => Boolean(team)) ?? [];
  const lastTeam = draw?.lastPick ? findTeam(store, draw.lastPick.teamId) : undefined;
  const assigned = draw?.log.length ?? 0;
  const total = league?.teamIds.length ?? 0;
  const done = draw?.status === "complete" || draw?.status === "confirmed";

  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-[radial-gradient(ellipse_at_50%_120%,#2a3550,#161B26_65%)] text-white">
      <Flags />
      <div className="arc -bottom-80 -left-48 size-[560px]" />
      <div className="arc -right-40 -top-56 size-[400px]" />
      <div className="relative pt-5 text-center">
        <p className="font-display text-[15px] tracking-[0.1em]">
          {league ? league.name.toUpperCase() : "BHUTANESE BASKETBALL CUP"} {league?.season}
        </p>
        <p className="font-display text-[11px] font-bold tracking-[0.34em] text-gold uppercase">
          Official Pool Draw · {league?.gender === "women" ? "Women" : "Men"}&apos;s Division
        </p>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-8 px-8 lg:flex-row">
        <DrawWheel
          teams={remaining}
          rotation={0}
          spinning={false}
          hub={done ? "DONE" : `SPIN ${Math.min(assigned + 1, total || 1)}`}
          sizeClass="size-[220px] !shadow-[0_0_60px_rgba(240,180,41,.3),inset_0_0_0_8px_#F0B429]"
          labelRadius={82}
        />
        <div className="flex flex-col items-center gap-2 text-center">
          {done ? (
            <>
              <p className="font-display text-[13px] tracking-[0.4em] text-gold uppercase">Draw complete</p>
              <h1 className="font-display text-[30px] font-extrabold uppercase">Pools are set</h1>
            </>
          ) : lastTeam && draw?.lastPick ? (
            <>
              <p className="font-display text-[13px] tracking-[0.4em] text-gold uppercase">Selected!</p>
              <TeamTile team={lastTeam} size="xl" />
              <h1 className="font-display text-[30px] font-extrabold uppercase">{lastTeam.name}</h1>
              <div className="rounded-full bg-[linear-gradient(90deg,#F0B429,#E8611C)] px-6 py-1.5 font-display text-[15px] font-extrabold tracking-[0.16em] text-ink">
                POOL {draw.lastPick.pool}
              </div>
            </>
          ) : (
            <>
              <p className="font-display text-[13px] tracking-[0.4em] text-gold uppercase">Waiting</p>
              <h1 className="font-display text-[30px] font-extrabold uppercase">
                {draw?.status === "drawing" ? "Stand by for spin 1" : "Operator will begin shortly"}
              </h1>
            </>
          )}
        </div>
        <div className="flex w-[190px] flex-col gap-2.5">
          {(
            [
              ["POOL A", draw?.poolA ?? []],
              ["POOL B", draw?.poolB ?? []],
            ] as const
          ).map(([title, ids]) => (
            <div key={title} className="overflow-hidden rounded-[10px] border border-[rgba(240,180,41,.35)] bg-white/5">
              <div className="bg-[rgba(240,180,41,.15)] px-2.5 py-1.5 font-display text-[12px] tracking-[0.2em] text-gold">
                {title}
              </div>
              <div className="flex flex-col gap-1.5 p-2.5 text-[13px]">
                {ids.length === 0 ? <span className="text-[#7A828F]">Waiting…</span> : null}
                {ids.map((id) => {
                  const team = findTeam(store, id);
                  if (!team) {
                    return null;
                  }
                  const fresh = draw?.lastPick?.teamId === id;
                  return (
                    <span
                      key={id}
                      className={`flex items-center gap-1.5 ${fresh ? "rounded bg-[rgba(240,180,41,.2)] px-1" : ""}`}
                    >
                      <TeamTile team={team} size="sm" />
                      {fresh ? <b>{team.name}</b> : team.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="relative pb-5 text-center font-display tracking-[0.2em] text-gold">
        {assigned} / {total || 0} TEAMS ASSIGNED
      </p>
    </div>
  );
}
