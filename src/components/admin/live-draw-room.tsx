"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Flags } from "@/components/brand/flags";
import { DrawWheel } from "@/components/draw/draw-wheel";
import { TeamTile } from "@/components/ui/team-tile";
import { useAppStore } from "@/components/admin/use-app-store";
import { confirmDrawAction, spinDrawAction } from "@/app/actions/tournament";
import { findTeam, getDraw, leagueTeams, poolCaps, randomIndex } from "@/lib/app-store";

export function LiveDrawRoom() {
  const { store, ready, refresh } = useAppStore();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const rotationRef = useRef(0);

  if (!ready || !store) {
    return (
      <div className="grid min-h-full place-items-center bg-ink text-[13px] text-[#7A828F]">
        Loading draw…
      </div>
    );
  }

  const league = store.leagues.find((item) => item.id === store.activeLeagueId) ?? store.leagues[0];
  if (!league) {
    return (
      <div className="grid min-h-full place-items-center bg-ink text-white">
        <Link href="/admin/competitions" className="text-gold">
          Create a league first
        </Link>
      </div>
    );
  }

  const draw = getDraw(store, league.id);
  const remaining = draw.remaining
    .map((id) => findTeam(store, id))
    .filter((team): team is NonNullable<typeof team> => Boolean(team));
  const total = league.teamIds.length;
  const caps = poolCaps(total);
  const lastTeam = draw.lastPick ? findTeam(store, draw.lastPick.teamId) : undefined;
  const assigned = draw.log.length;
  const canSpin = draw.status === "drawing" && remaining.length > 0 && !spinning;

  async function spin() {
    if (!canSpin) {
      return;
    }
    setSpinning(true);
    const result = await spinDrawAction(league.id);
    if (!result.ok) {
      setSpinning(false);
      return;
    }
    const slice = 360 / remaining.length;
    const extra = 5 + randomIndex(3);
    const current = rotationRef.current;
    const currentMod = ((current % 360) + 360) % 360;
    const targetMod = ((-((result.pick.remainingIndex + 0.5) * slice) % 360) + 360) % 360;
    let delta = extra * 360 + (targetMod - currentMod);
    if (delta < extra * 360) {
      delta += 360;
    }
    const next = current + delta;
    rotationRef.current = next;
    setRotation(next);
    window.setTimeout(() => {
      void refresh().then(() => {
        setSpinning(false);
        setRotation(0);
        rotationRef.current = 0;
      });
    }, 4000);
  }

  return (
    <div className="flex min-h-full flex-col bg-ink text-white">
      <Flags />
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <b className="font-display tracking-[0.08em]">LIVE POOL DRAW — {league.name.toUpperCase()}</b>
        <span className="text-[12px] text-[#7A828F]">
          Presentation: <b className="text-[#4ADE80]">● Connected</b>
        </span>
        <Link href="/admin/draw/setup" className="rounded-[5px] border border-white/35 px-2 py-0.5 text-[12px]">
          Exit draw
        </Link>
      </div>

      {draw.status === "idle" ? (
        <div className="grid flex-1 place-items-center text-center">
          <div>
            <p className="text-[13px] text-[#7A828F]">No live draw for this league yet.</p>
            <Link href="/admin/draw/setup" className="mt-2 inline-block text-gold">
              Go to draw setup
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-1 flex-col items-center gap-6 px-4 py-6 lg:flex-row lg:justify-center">
            <div className="flex flex-col items-center gap-2.5">
              <DrawWheel
                teams={remaining}
                rotation={rotation}
                spinning={spinning}
                hub={draw.status === "complete" || draw.status === "confirmed" ? "DONE" : `SPIN ${assigned + 1}`}
                labelRadius={70}
              />
              {canSpin ? (
                <button type="button" onClick={spin} className="rounded-[5px] bg-saffron px-5 py-2 font-semibold text-white">
                  🎡 SPIN
                </button>
              ) : draw.status === "complete" ? (
                <button
                  type="button"
                  onClick={() => void confirmDrawAction(league.id).then(() => refresh())}
                  className="rounded-[5px] bg-saffron px-5 py-2 font-semibold text-white"
                >
                  ✓ CONFIRM POOLS
                </button>
              ) : draw.status === "confirmed" ? (
                <Link href="/admin/fixtures/generate" className="rounded-[5px] bg-saffron px-5 py-2 font-semibold text-white">
                  Generate fixtures
                </Link>
              ) : (
                <span className="rounded-[5px] bg-white/10 px-5 py-2 text-[#7A828F]">Spinning…</span>
              )}
              <span className="text-[11px] text-[#7A828F]">
                {spinning ? "Wheel sealed" : `RNG · spin ${Math.min(assigned + 1, total)} of ${total}`}
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              {draw.status === "complete" || draw.status === "confirmed" ? (
                <>
                  <p className="font-display text-[11px] tracking-[0.3em] text-gold uppercase">Draw complete</p>
                  <h1 className="font-display text-[22px] font-extrabold uppercase">Both pools are full</h1>
                  <p className="text-[12px] text-[#7A828F]">
                    {draw.status === "confirmed" ? "Pools are official." : "Confirm to lock pools and enable fixtures."}
                  </p>
                </>
              ) : lastTeam && draw.lastPick ? (
                <>
                  <p className="font-display text-[11px] tracking-[0.3em] text-gold uppercase">Selected</p>
                  <TeamTile team={lastTeam} size="xl" />
                  <h1 className="font-display text-[22px] font-extrabold uppercase">{lastTeam.name}</h1>
                  <div className="rounded-full bg-[linear-gradient(90deg,#F0B429,#E8611C)] px-4 py-1 font-display text-[12px] font-extrabold tracking-[0.14em] text-ink">
                    → ASSIGNED TO POOL {draw.lastPick.pool}
                  </div>
                </>
              ) : (
                <>
                  <p className="font-display text-[11px] tracking-[0.3em] text-gold uppercase">Ready</p>
                  <h1 className="font-display text-[22px] font-extrabold uppercase">{leagueTeams(store, league).length} teams on the wheel</h1>
                  <p className="text-[12px] text-[#7A828F]">Spin to send the first team to Pool A.</p>
                </>
              )}
              <div className="mt-2 w-[170px]">
                <div className="flex justify-between text-[11px] text-[#7A828F]">
                  <span>Draw progress</span>
                  <b className="text-white">
                    {assigned} / {total}
                  </b>
                </div>
                <span className="mt-1 block h-1.5 overflow-hidden rounded bg-[#2A3244]">
                  <i
                    className="block h-full bg-[linear-gradient(90deg,#E8611C,#F0B429)]"
                    style={{ width: `${total ? (assigned / total) * 100 : 0}%` }}
                  />
                </span>
              </div>
            </div>

            <div className="flex w-[210px] flex-col gap-2">
              {(
                [
                  ["A", draw.poolA, caps.a],
                  ["B", draw.poolB, caps.b],
                ] as const
              ).map(([label, ids, cap]) => (
                <div key={label} className="overflow-hidden rounded-lg border border-white/12 bg-white/5">
                  <div className="bg-[rgba(240,180,41,.12)] px-2.5 py-1 font-display text-[11px] tracking-[0.15em] text-gold">
                    POOL {label} · {ids.length}/{cap}
                  </div>
                  <div className="flex flex-col gap-1 p-2 text-[12px]">
                    {ids.map((id) => {
                      const team = findTeam(store, id);
                      if (!team) {
                        return null;
                      }
                      const fresh = draw.lastPick?.teamId === id;
                      return (
                        <span
                          key={id}
                          className={`flex items-center gap-1.5 ${fresh ? "rounded bg-[rgba(240,180,41,.15)] px-1" : ""}`}
                        >
                          <TeamTile team={team} size="sm" />
                          {team.name}
                          {fresh ? " ←" : ""}
                        </span>
                      );
                    })}
                    {Array.from({ length: Math.max(0, cap - ids.length) }).map((_, index) => (
                      <span key={`open-${label}-${index}`} className="text-[#5B6472]">
                        — open slot —
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[12px] text-[#7A828F]">
            <span>
              Remaining on wheel:{" "}
              {remaining.length ? remaining.map((team) => team.code).join(" · ") : "none"}
            </span>
            {draw.status === "confirmed" ? (
              <Link href="/admin/pools" className="text-gold">
                View pools
              </Link>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
