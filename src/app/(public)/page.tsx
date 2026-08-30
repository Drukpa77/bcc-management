import Link from "next/link";
import { CourtArcs } from "@/components/brand/court-arcs";
import { MountainSilhouette } from "@/components/brand/mountain-silhouette";
import { LiveMatchCard } from "@/components/public/live-match-card";
import { Badge } from "@/components/ui/badge";
import { FixtureRow } from "@/components/ui/fixture-row";
import { TeamTile } from "@/components/ui/team-tile";
import {
  getTeam,
  liveMatch,
  poolAStandings,
  poolBStandings,
  recentResults,
  upcomingFixtures,
} from "@/lib/tournament";

function PoolLeaders({
  title,
  rows,
}: {
  title: string;
  rows: typeof poolAStandings;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-card">
      <div className="flex items-center justify-between rounded-t-lg bg-ink px-2.5 py-1.5 text-gold">
        <b className="font-display text-[11px] tracking-[0.15em]">{title}</b>
        <span className="text-[11px] text-[#7A828F]">P · W-L · PTS</span>
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 py-2">
        {rows.slice(0, 2).map((row) => {
          const team = getTeam(row.teamId);
          return (
            <div key={row.teamId} className="flex items-center justify-between gap-2 text-[13px]">
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 font-display text-[13px] font-bold">
                  {row.pos}
                </span>
                <TeamTile team={team} />
                {team.name}
              </span>
              <span className="font-mono text-[11px] font-bold">
                {row.won}-{row.lost} · {row.pts}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const home = getTeam(liveMatch.homeId);
  const away = getTeam(liveMatch.awayId);

  return (
    <>
      <section className="hero px-4 pb-8 pt-6 md:px-5 md:pb-10 md:pt-8">
        <CourtArcs />
        <MountainSilhouette />
        <div className="relative mx-auto flex max-w-[1120px] flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
              <span className="md:hidden">10–26 Sept 2026 · Thimphu</span>
              <span className="hidden md:inline">
                10 – 26 September 2026 · Changlimithang Court, Thimphu
              </span>
            </p>
            <h1 className="font-display text-[28px] leading-none font-extrabold tracking-[0.01em] text-white uppercase md:text-[44px]">
              <span className="md:hidden">National Basketball Championship 2026</span>
              <span className="hidden md:inline">
                Bhutan National Basketball
                <br />
                Championship 2026
              </span>
            </h1>
            <p className="hidden max-w-[340px] text-[15px] leading-6 text-nav-muted md:block">
              10 men&apos;s teams across two pools. 6 women&apos;s teams, round
              robin. One champion of the Kingdom.
            </p>
            <div className="mt-2 flex gap-2">
              <Link
                href="/fixtures"
                className="inline-flex items-center rounded-[5px] bg-saffron px-4 py-2 text-[13px] font-semibold text-white shadow-[0_2px_6px_rgba(232,97,28,0.35)]"
              >
                <span className="md:hidden">Fixtures</span>
                <span className="hidden md:inline">Today&apos;s Fixtures</span>
              </Link>
              <Link
                href="/bracket"
                className="inline-flex items-center rounded-[5px] border border-white/35 px-4 py-2 text-[13px] font-semibold text-white"
              >
                <span className="md:hidden">Bracket</span>
                <span className="hidden md:inline">View Bracket</span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <LiveMatchCard fixture={liveMatch} home={home} away={away} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1120px] px-4 py-4 md:hidden">
        <LiveMatchCard
          fixture={liveMatch}
          home={home}
          away={away}
          variant="panel"
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 px-4 py-5 md:flex-row md:items-start md:gap-4 md:px-5 md:py-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[17px] font-bold tracking-[0.05em] uppercase">
              <span className="md:hidden">Upcoming</span>
              <span className="hidden md:inline">Upcoming Matches</span>
            </h2>
            <Link
              href="/fixtures"
              className="hidden text-[12px] text-saffron md:inline"
            >
              All fixtures →
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-line bg-card">
            <div className="flex items-center justify-between bg-[#F1EFE9] px-3 py-1.5 text-[12px]">
              <b className="hidden md:inline">SATURDAY, 12 SEPTEMBER</b>
              <b className="md:hidden">SAT 12 SEP</b>
              <span className="text-muted">
                <span className="md:hidden">Changlimithang</span>
                <span className="hidden md:inline">Changlimithang Court</span>
              </span>
            </div>
            <div className="flex flex-col gap-2.5 px-3 py-2.5">
              {upcomingFixtures.map((fixture) => (
                <FixtureRow
                  key={fixture.id}
                  fixture={fixture}
                  home={getTeam(fixture.homeId)}
                  away={getTeam(fixture.awayId)}
                />
              ))}
            </div>
          </div>

          <div className="mt-2 hidden items-center justify-between md:flex">
            <h2 className="font-display text-[17px] font-bold tracking-[0.05em] uppercase">
              Recent Results
            </h2>
            <Link href="/results" className="text-[12px] text-saffron">
              All results →
            </Link>
          </div>
          <div className="hidden gap-2 md:grid md:grid-cols-3">
            {recentResults.map((result) => {
              const resultHome = getTeam(result.homeId);
              const resultAway = getTeam(result.awayId);
              return (
                <article
                  key={result.id}
                  className="rounded-lg border border-line bg-card px-3 py-2.5"
                >
                  <div className="flex items-center justify-between">
                    <Badge status="final" />
                    <span className="text-[11px] text-muted">
                      {result.dateLabel} · {result.group}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <TeamTile team={resultHome} />
                      <b>{resultHome.name}</b>
                    </span>
                    <b className="font-mono text-saffron">{result.homeScore}</b>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-muted">
                    <span className="flex items-center gap-2">
                      <TeamTile team={resultAway} />
                      {resultAway.name}
                    </span>
                    <span className="font-mono">{result.awayScore}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="flex w-full flex-col gap-2 md:w-[250px]">
          <h2 className="font-display text-[17px] font-bold tracking-[0.05em] uppercase">
            Pool Leaders
          </h2>
          <div className="grid grid-cols-2 gap-2 md:hidden">
            <div className="rounded-lg border border-line bg-card p-2">
              <span className="text-[11px] text-muted">POOL A</span>
              <div className="mt-1 flex items-center gap-1.5">
                <TeamTile team={getTeam("thw")} size="sm" />
                <b className="text-[12px]">Warriors 4-1</b>
              </div>
            </div>
            <div className="rounded-lg border border-line bg-card p-2">
              <span className="text-[11px] text-muted">POOL B</span>
              <div className="mt-1 flex items-center gap-1.5">
                <TeamTile team={getTeam("pdr")} size="sm" />
                <b className="text-[12px]">Dragons 4-1</b>
              </div>
            </div>
          </div>
          <div className="hidden flex-col gap-2 md:flex">
            <PoolLeaders title="MEN'S POOL A" rows={poolAStandings} />
            <PoolLeaders title="MEN'S POOL B" rows={poolBStandings} />
            <div className="rounded-lg bg-[linear-gradient(120deg,#161B26,#25304a)] p-3.5 text-white">
              <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
                Playoff picture
              </p>
              <p className="mt-1 mb-2 font-display text-[15px] font-bold uppercase">
                Quarter Finals begin 20 Sept
              </p>
              <Link
                href="/bracket"
                className="inline-flex rounded-[5px] border border-white/35 px-2 py-0.5 text-[12px] font-semibold text-white"
              >
                View Bracket →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
