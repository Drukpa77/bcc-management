import type { Metadata } from "next";
import { PageHeader } from "@/components/public/page-header";
import { Badge } from "@/components/ui/badge";
import { BracketMatchCard } from "@/components/ui/bracket-match-card";
import { menBracket, teamById } from "@/lib/tournament";

export const metadata: Metadata = { title: "Playoff Bracket" };

export default function BracketPage() {
  const qf = menBracket.filter((m) => m.id.startsWith("qf"));
  const sf = menBracket.filter((m) => m.id.startsWith("sf"));
  const final = menBracket.find((m) => m.id === "final")!;

  return (
    <>
      <PageHeader kicker="Men's Playoffs · Road to the Title" title="Playoff Bracket" mountains />
      <div className="bg-[linear-gradient(180deg,#F7F5F1,#F1EDE4)] px-4 py-5 md:px-5">
        <div className="mx-auto hidden max-w-[1120px] items-stretch gap-0 lg:flex">
          <div className="flex flex-col justify-center gap-3.5">
            <p className="font-display text-[11px] font-bold tracking-[0.18em] text-[#8A909C]">QUARTER FINALS · 20 SEPT</p>
            {qf.map((m) => <BracketMatchCard key={m.id} match={m} teams={teamById} className="w-[168px]" />)}
          </div>
          <div className="conn mx-0 my-8" />
          <div className="flex flex-col justify-center gap-6">
            <p className="font-display text-[11px] font-bold tracking-[0.18em] text-[#8A909C]">SEMI FINALS · 23 SEPT</p>
            {sf.map((m) => <BracketMatchCard key={m.id} match={m} teams={teamById} className="w-[168px]" />)}
          </div>
          <div className="conn2 mx-0" />
          <div className="flex flex-col justify-center gap-2.5">
            <p className="font-display text-[11px] font-bold tracking-[0.18em] text-[#8A909C]">FINAL · 26 SEPT</p>
            <BracketMatchCard match={final} teams={teamById} className="w-[176px]" />
          </div>
          <div className="ml-3 flex flex-col items-center justify-center">
            <div className="w-[120px] rounded-[10px] bg-[linear-gradient(160deg,#161B26,#2a3550)] px-2.5 py-4 text-center text-white shadow-[0_6px_18px_rgba(22,27,38,.35)]">
              <div className="text-2xl">🏆</div>
              <p className="font-display text-[11px] font-bold tracking-[0.24em] text-gold uppercase">Champion</p>
              <p className="mt-1 text-[11px] text-[#7A828F]">Decided 26 Sept</p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1120px] flex-col gap-2 lg:hidden">
          <p className="font-display text-[11px] font-bold tracking-[0.18em] text-[#8A909C]">QUARTER FINALS · 20 SEPT</p>
          {qf.map((m) => <BracketMatchCard key={m.id} match={m} teams={teamById} />)}
          <div className="ml-3.5 h-3.5 border-l-[1.5px] border-dashed border-[#C9B48A]" />
          <p className="font-display text-[11px] font-bold tracking-[0.18em] text-[#8A909C]">SEMI FINALS · 23 SEPT</p>
          {sf.map((m) => <BracketMatchCard key={m.id} match={m} teams={teamById} />)}
          <div className="ml-3.5 h-3.5 border-l-[1.5px] border-dashed border-[#C9B48A]" />
          <BracketMatchCard match={final} teams={teamById} />
        </div>

        <div className="mx-auto mt-3.5 flex max-w-[1120px] flex-wrap items-center gap-3 text-[12px] text-muted">
          <span>Winners advance automatically when results are entered</span>
          <span className="grow" />
          <span className="flex items-center gap-1"><Badge status="live" /> in play</span>
          <span className="flex items-center gap-1"><Badge status="final" /> decided</span>
        </div>
      </div>
    </>
  );
}
