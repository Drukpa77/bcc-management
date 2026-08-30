"use client";

import { useState } from "react";
import Link from "next/link";
import { Flags } from "@/components/brand/flags";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam } from "@/lib/tournament";

function Side({
  id,
  score,
  onAdd,
}: {
  id: string;
  score: number;
  onAdd: (n: number) => void;
}) {
  const team = getTeam(id);
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-[10px] border border-white/12 bg-white/5 p-4">
      <TeamTile team={team} size="lg" />
      <b className="font-display uppercase">{team.name}</b>
      <span className="font-mono text-[44px] font-extrabold text-gold">{score}</span>
      <div className="flex gap-1.5">
        {[1, 2, 3].map((n) => (
          <button key={n} type="button" onClick={() => onAdd(n)} className="rounded-[5px] border border-white/25 px-3 py-1.5 text-[13px] font-semibold">
            +{n}
          </button>
        ))}
        <button type="button" onClick={() => onAdd(-1)} className="rounded-[5px] border border-white/15 px-2 py-1.5 text-[#7A828F]">−1</button>
      </div>
    </div>
  );
}

export default function LiveScorePage() {
  const [home, setHome] = useState(72);
  const [away, setAway] = useState(68);

  return (
    <div className="flex min-h-full flex-col bg-ink text-white">
      <Flags />
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="flex items-center gap-2">
          <Badge status="live" />
          <b className="font-display tracking-[0.06em]">SCORE PANEL — MEN&apos;S POOL A · ROUND 5</b>
        </span>
        <span className="text-[12px] text-[#7A828F]">Public site updates instantly</span>
        <Link href="/admin" className="text-[12px] text-gold">← Dashboard</Link>
      </div>
      <div className="flex flex-1 flex-col gap-3.5 p-4 lg:flex-row">
        <Side id="thw" score={home} onAdd={(n) => setHome((s) => Math.max(0, s + n))} />
        <div className="flex w-full flex-col items-center justify-center gap-2.5 lg:w-[190px]">
          <p className="text-[11px] font-bold tracking-[0.1em] text-[#7A828F] uppercase">Quarter</p>
          <div className="flex gap-1">
            {["Q1", "Q2", "Q3", "Q4", "OT"].map((q) => (
              <span key={q} className={`rounded-full border px-2 py-0.5 text-[12px] ${q === "Q4" ? "border-live bg-live text-white" : "border-[#39404C] text-[#7A828F]"}`}>{q}</span>
            ))}
          </div>
          <div className="rounded-lg border border-[#39404C] bg-[#0E1119] px-4 py-1.5 font-mono text-[22px] text-gold">03:42</div>
          <button type="button" className="w-full rounded-[5px] bg-live py-2 font-semibold">■ END MATCH</button>
          <p className="text-center text-[11px] text-[#5B6472]">Ending stores the result and auto-updates standings + bracket</p>
        </div>
        <Side id="pdr" score={away} onAdd={(n) => setAway((s) => Math.max(0, s + n))} />
      </div>
    </div>
  );
}
