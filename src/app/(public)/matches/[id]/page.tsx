import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam, liveMatch } from "@/lib/tournament";

export const metadata: Metadata = { title: "Match Centre" };

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const live = id.includes("live") || id === "thw-pdr-live";

  if (id === "womens-final") {
    const home = getTeam("tqn");
    const away = getTeam("ppx");
    return (
      <>
        <div className="hero relative overflow-hidden px-4 py-8 text-center">
          <p className="font-display text-[11px] font-bold tracking-[0.3em] text-gold uppercase">
            Women&apos;s Championship · The Final · 25 September
          </p>
          <div className="relative mt-4 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-1.5">
              <TeamTile team={home} size="xl" />
              <b className="font-display text-[17px] uppercase">{home.name}</b>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-[34px] font-extrabold text-gold">61</span>
              <Badge status="final" />
              <span className="font-mono text-[34px] font-extrabold text-[#5B6472]">54</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <TeamTile team={away} size="xl" />
              <b className="font-display text-[17px] text-nav-muted uppercase">{away.name}</b>
            </div>
          </div>
          <div className="mt-4 inline-flex rounded-full bg-[linear-gradient(90deg,#F0B429,#E8611C)] px-5 py-1.5 font-display text-[13px] font-extrabold tracking-[0.14em] text-ink">
            🏆 THIMPHU QUEENS — WOMEN&apos;S CHAMPIONS 2026
          </div>
        </div>
      </>
    );
  }

  const home = getTeam("thw");
  const away = getTeam("pdr");

  if (live) {
    return (
      <>
        <div className="bg-ink px-4 py-6 text-center text-white [background:radial-gradient(ellipse_at_50%_-30%,rgba(225,29,72,.25),transparent_60%),#161B26]">
          <div className="flex items-center justify-center gap-2">
            <Badge status="live" />
            <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
              Men&apos;s Pool A · Changlimithang Court 1
            </p>
          </div>
          <div className="mt-3 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-1.5">
              <TeamTile team={home} size="xl" />
              <b className="font-display text-[17px] uppercase">{home.name}</b>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-3 font-mono text-[38px] font-extrabold">
                <span>{liveMatch.homeScore}</span>
                <span className="text-[#5B6472]">{liveMatch.awayScore}</span>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-[#39404C] bg-[#0E1119] px-3.5 py-1">
                <b className="font-display text-[13px] text-live">Q4</b>
                <span className="font-mono text-[15px] text-gold">{liveMatch.clock}</span>
              </div>
              <p className="text-[11px] text-[#7A828F]">Warriors lead by 4 · timeout Paro</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <TeamTile team={away} size="xl" />
              <b className="font-display text-[17px] text-nav-muted uppercase">{away.name}</b>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-4 py-4 md:flex-row md:px-5">
          <table className="w-full max-w-sm border-collapse overflow-hidden rounded-lg border border-line bg-card text-[13px]">
            <thead>
              <tr className="text-right text-[11px] text-[#8A909C]">
                <th className="px-2 py-1 text-left">LIVE QUARTERS</th>
                <th>Q1</th><th>Q2</th><th>Q3</th><th className="text-live">Q4</th><th>T</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#EEECE6]">
                <td className="px-2 py-1"><span className="flex items-center gap-1.5"><TeamTile team={home} size="sm" />Warriors</span></td>
                <td className="text-right font-mono">20</td><td className="text-right font-mono">17</td><td className="text-right font-mono">21</td><td className="text-right font-mono text-live">14</td><td className="text-right font-mono font-bold">72</td>
              </tr>
              <tr className="border-t border-[#EEECE6]">
                <td className="px-2 py-1"><span className="flex items-center gap-1.5"><TeamTile team={away} size="sm" />Dragons</span></td>
                <td className="text-right font-mono">18</td><td className="text-right font-mono">19</td><td className="text-right font-mono">15</td><td className="text-right font-mono text-live">16</td><td className="text-right font-mono font-bold">68</td>
              </tr>
            </tbody>
          </table>
          <div className="min-w-0 flex-1 rounded-lg border border-line bg-card p-3">
            <b className="font-display text-[13px] tracking-[0.05em] uppercase">Live play-by-play</b>
            <div className="mt-2 flex flex-col gap-1.5 text-[13px]">
              <p><span className="inline-block w-10 font-mono text-muted">03:42</span> Timeout — Paro Dragons</p>
              <p><span className="inline-block w-10 font-mono text-muted">03:58</span> <b>#7 Wangchuk hits a three</b> · 72–68</p>
              <p><span className="inline-block w-10 font-mono text-muted">04:31</span> #10 Gyeltshen scores inside · 69–68</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="dhdr bg-ink px-4 py-6 text-center text-white md:px-5">
        <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
          Men&apos;s Pool A · Round 5 · 11 Sept · Changlimithang Court
        </p>
        <div className="mt-3 flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-1.5">
            <TeamTile team={home} size="xl" />
            <b className="font-display text-[17px] uppercase">{home.name}</b>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[32px] font-extrabold text-gold">82</span>
            <Badge status="final" />
            <span className="font-mono text-[32px] font-extrabold text-[#5B6472]">75</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <TeamTile team={away} size="xl" />
            <b className="font-display text-[17px] text-nav-muted uppercase">{away.name}</b>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-4 py-4 md:flex-row md:px-5">
        <div className="w-full md:w-[300px]">
          <table className="w-full border-collapse overflow-hidden rounded-lg border border-line bg-card text-[13px]">
            <thead>
              <tr className="text-right text-[11px] text-[#8A909C]">
                <th className="px-2 py-1 text-left">QUARTERS</th>
                <th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>T</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#EEECE6]">
                <td className="px-2 py-1"><span className="flex items-center gap-1.5"><TeamTile team={home} size="sm" />Warriors</span></td>
                <td className="text-right font-mono">22</td><td className="text-right font-mono">18</td><td className="text-right font-mono">20</td><td className="text-right font-mono">22</td><td className="text-right font-mono font-bold">82</td>
              </tr>
              <tr className="border-t border-[#EEECE6]">
                <td className="px-2 py-1"><span className="flex items-center gap-1.5"><TeamTile team={away} size="sm" />Dragons</span></td>
                <td className="text-right font-mono">19</td><td className="text-right font-mono">21</td><td className="text-right font-mono">16</td><td className="text-right font-mono">19</td><td className="text-right font-mono font-bold">75</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2 rounded-lg border border-line bg-card p-3 text-[13px]">
            <b className="font-display text-[13px] tracking-[0.05em] uppercase">Match info</b>
            <div className="mt-1.5 space-y-1">
              <div className="flex justify-between"><span className="text-muted">Competition</span><b>National Championship</b></div>
              <div className="flex justify-between"><span className="text-muted">Pool · Round</span><b>Pool A · Round 5</b></div>
              <div className="flex justify-between"><span className="text-muted">Venue</span><b>Changlimithang Court 1</b></div>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="rounded-lg border border-line bg-card p-3">
            <b className="font-display text-[13px] tracking-[0.05em] uppercase">Team stats</b>
            <p className="mt-2 text-[13px] text-muted">Fouls 18–21 · Timeouts 4–6 · Field goals 34–30</p>
          </div>
          <Link href="/standings" className="text-[12px] text-saffron">Pool A standings →</Link>
        </div>
      </div>
    </>
  );
}
