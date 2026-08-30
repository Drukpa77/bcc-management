import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam, poolAStandings, poolBStandings, upcomingFixtures } from "@/lib/tournament";

export const metadata: Metadata = { title: "National Championship" };

export default function CompetitionDetailPage() {
  return (
    <>
      <div className="dhdr relative overflow-hidden bg-ink px-4 py-6 text-white md:px-5">
        <div className="arc -right-24 -top-36 size-[300px]" />
        <div className="relative flex items-start gap-3.5">
          <span className="grid size-16 place-items-center rounded-xl bg-saffron text-2xl">🏆</span>
          <div>
            <p className="flex items-center gap-2 font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
              Men · Pool + Playoffs · <Badge status="live" />
            </p>
            <h1 className="mt-1 font-display text-[24px] leading-none font-extrabold uppercase">
              Bhutan National Basketball Championship 2026
            </h1>
            <p className="mt-1 text-[12px] text-nav-muted">
              10 – 26 September 2026 · Changlimithang Court, Thimphu · 10 teams · 2 pools
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-1 border-b-2 border-line bg-white px-4 md:px-5">
        {["Overview", "Fixtures", "Results", "Standings", "Teams", "Bracket"].map((tab, i) => (
          <Link
            key={tab}
            href={["/competitions/national-championship", "/fixtures", "/results", "/standings", "/teams", "/bracket"][i]}
            className={`px-3 py-2 font-display text-[13px] font-bold tracking-[0.08em] uppercase ${
              i === 0 ? "border-b-2 border-saffron text-saffron" : "text-[#6B7280]"
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-4 py-4 md:flex-row md:items-start md:px-5">
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-line bg-card p-2.5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8A909C] uppercase">Stage</p>
              <p className="font-display text-[18px] font-extrabold">Pool Round · MD 5 of 5</p>
            </div>
            <div className="rounded-lg border border-line bg-card p-2.5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8A909C] uppercase">Matches Played</p>
              <p className="font-display text-[22px] font-extrabold">23<span className="text-[14px] font-semibold text-muted"> / 29</span></p>
            </div>
            <div className="rounded-lg border border-line bg-card p-2.5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8A909C] uppercase">Next Milestone</p>
              <p className="font-display text-[18px] font-extrabold">QF · 20 Sept</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-line bg-card">
            <div className="flex items-center justify-between border-b border-[#EEECE6] px-3 py-2">
              <b className="font-display text-[13px] tracking-[0.05em] uppercase">Next Fixtures</b>
              <Link href="/fixtures" className="text-[12px] text-saffron">Full schedule →</Link>
            </div>
            <div className="flex flex-col gap-2 p-3">
              {upcomingFixtures.slice(0, 2).map((f) => (
                <div key={f.id} className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="w-[70px] font-mono text-[11px] font-bold">SAT · {f.time}</span>
                  <span className="flex grow items-center gap-2">
                    <TeamTile team={getTeam(f.homeId)} />
                    {getTeam(f.homeId).name}
                    <span className="text-muted">vs</span>
                    <TeamTile team={getTeam(f.awayId)} />
                    {getTeam(f.awayId).name}
                  </span>
                  <Chip>{f.group.replace("Men · ", "")}</Chip>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-[linear-gradient(120deg,#161B26,#25304a)] p-3.5 text-white">
            <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">Playoff qualification</p>
            <p className="mt-1 font-display text-[15px] font-bold uppercase">
              Top 3 of each pool advance · A2 v B3 and B2 v A3 in Quarter Finals
            </p>
            <Link href="/bracket" className="mt-2 inline-flex rounded-[5px] border border-white/35 px-2 py-0.5 text-[12px] font-semibold">
              Bracket →
            </Link>
          </div>
        </div>
        <aside className="flex w-full flex-col gap-2 md:w-[300px]">
          {[
            { title: "POOL A", rows: poolAStandings.slice(0, 3) },
            { title: "POOL B", rows: poolBStandings.slice(0, 3) },
          ].map((pool) => (
            <div key={pool.title} className="overflow-hidden rounded-lg border border-line bg-card">
              <div className="flex items-center justify-between bg-ink px-2.5 py-1.5 text-gold">
                <b className="font-display text-[11px] tracking-[0.15em]">{pool.title}</b>
                <span className="text-[11px] text-[#7A828F]">W-L</span>
              </div>
              <div className="flex flex-col gap-1 p-2">
                {pool.rows.map((row) => {
                  const team = getTeam(row.teamId);
                  return (
                    <div key={row.teamId} className="flex items-center justify-between text-[13px]">
                      <span className="flex items-center gap-2">
                        <span className="w-4 font-display font-bold">{row.pos}</span>
                        <TeamTile team={team} />
                        {team.name}
                      </span>
                      <span className="font-mono text-[11px]">{row.won}-{row.lost}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
