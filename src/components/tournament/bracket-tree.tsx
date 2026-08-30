"use client";

import { useState } from "react";
import { BracketMatchCard } from "@/components/ui/bracket-match-card";
import { TeamTile } from "@/components/ui/team-tile";
import type { BracketMatch, Team } from "@/lib/types";

export function BracketTree({
  matches,
  teams,
  championId,
  ready,
  remaining,
}: {
  matches: BracketMatch[];
  teams: Record<string, Team>;
  championId?: string;
  ready: boolean;
  remaining?: number;
}) {
  const [stage, setStage] = useState<"qf" | "sf" | "final">("qf");
  const qf = matches.filter((match) => /qf/i.test(match.id));
  const sf = matches.filter((match) => /sf/i.test(match.id));
  const final = matches.find((match) => /final/i.test(match.id));
  const champion = championId ? teams[championId] : undefined;

  if (!ready && matches.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#D5D1C8] bg-white px-6 py-16 text-center">
        <p className="font-display text-[22px] font-extrabold uppercase">Bracket not ready</p>
        <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-muted">
          The knockout bracket will generate automatically once every Pool A and Pool B fixture has a published result
          {remaining ? ` — ${remaining} match${remaining === 1 ? "" : "es"} remaining` : ""}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-xl bg-white p-1 ring-1 ring-[#E8E4DA] lg:hidden">
        {(
          [
            ["qf", "Quarter finals"],
            ["sf", "Semi finals"],
            ["final", "Final"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setStage(id)}
            className={`h-9 flex-1 rounded-lg text-[12px] font-semibold ${
              stage === id ? "bg-ink text-gold" : "text-[#5B6472]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="hidden items-stretch gap-0 overflow-x-auto lg:flex">
        <RoundColumn title="Quarter finals" matches={qf} teams={teams} />
        <div className="conn mx-0 my-8" />
        <RoundColumn title="Semi finals" matches={sf} teams={teams} />
        <div className="conn2 mx-0" />
        <div className="flex flex-col justify-center gap-3">
          <p className="font-display text-[11px] font-bold tracking-[0.16em] text-[#8A909C] uppercase">Final</p>
          {final ? <BracketMatchCard match={final} teams={teams} className="w-[190px]" /> : null}
        </div>
        <ChampionCard team={champion} />
      </div>

      <div className="space-y-3 lg:hidden">
        {stage === "qf" ? qf.map((match) => <BracketMatchCard key={match.id} match={match} teams={teams} />) : null}
        {stage === "sf" ? sf.map((match) => <BracketMatchCard key={match.id} match={match} teams={teams} />) : null}
        {stage === "final" && final ? <BracketMatchCard match={final} teams={teams} /> : null}
        {stage === "final" ? <ChampionCard team={champion} compact /> : null}
      </div>
    </div>
  );
}

function RoundColumn({
  title,
  matches,
  teams,
}: {
  title: string;
  matches: BracketMatch[];
  teams: Record<string, Team>;
}) {
  return (
    <div className="flex flex-col justify-center gap-3">
      <p className="font-display text-[11px] font-bold tracking-[0.16em] text-[#8A909C] uppercase">{title}</p>
      {matches.map((match) => (
        <BracketMatchCard key={match.id} match={match} teams={teams} className="w-[180px]" />
      ))}
    </div>
  );
}

function ChampionCard({ team, compact }: { team?: Team; compact?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center ${compact ? "mt-2" : "ml-4"}`}>
      <div className="w-[150px] rounded-3xl bg-[linear-gradient(160deg,#161B26,#2a3550)] px-3 py-5 text-center text-white shadow-[0_10px_28px_rgba(22,27,38,.35)]">
        <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">Champion</p>
        {team ? (
          <>
            <div className="my-3 flex justify-center">
              <TeamTile team={team} size="lg" />
            </div>
            <p className="font-display text-[16px] font-extrabold uppercase">{team.name}</p>
          </>
        ) : (
          <p className="mt-3 text-[12px] text-[#7A828F]">Decided after the final</p>
        )}
      </div>
    </div>
  );
}
