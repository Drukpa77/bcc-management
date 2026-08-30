import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import { Chip } from "@/components/ui/chip";
import { StandingsTable } from "@/components/ui/standings-table";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam, poolAStandings, poolBStandings, teamById, womenStandings } from "@/lib/tournament";

export const metadata: Metadata = { title: "Standings" };

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ div?: string }>;
}) {
  const { div } = await searchParams;
  const women = div === "women";

  return (
    <>
      <PageHeader
        kicker={women ? "Women's Championship 2026 · Round Robin" : "National Championship 2026 · Men"}
        title={women ? "Women's Standings" : "Pool Standings"}
      />
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-white px-4 py-2.5 md:px-5">
        <Chip href="/standings" active={!women}>Men</Chip>
        <Chip href="/standings?div=women" active={women}>Women</Chip>
        <span className="grow" />
        <span className="flex items-center gap-1.5 text-[12px] text-muted">
          <span className="inline-block h-2.5 w-2.5 bg-qualify shadow-[inset_3px_0_0_#E8611C]" />
          {women ? "Top 2 reach the Final" : "Qualify for playoffs (top 3)"}
        </span>
      </div>
      {women ? (
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3.5 px-4 py-4 md:flex-row md:items-start md:px-5">
          <StandingsTable title="ROUND ROBIN" rows={womenStandings} teams={teamById} qualifyCount={2} className="min-w-0 flex-1" />
          <aside className="flex w-full flex-col gap-2 md:w-[250px]">
            <div className="rounded-lg bg-[linear-gradient(160deg,#161B26,#2a3550)] p-3.5 text-center text-white">
              <p className="font-display text-[11px] font-bold tracking-[0.24em] text-gold uppercase">Women&apos;s Final · 25 Sept</p>
              <div className="my-2.5 flex items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <TeamTile team={getTeam("tqn")} size="lg" />
                  <b className="text-[12px]">Queens</b>
                </div>
                <span className="font-display text-lg font-extrabold text-gold">VS</span>
                <div className="flex flex-col items-center gap-1">
                  <TeamTile team={getTeam("ppx")} size="lg" />
                  <b className="text-[12px]">Phoenix</b>
                </div>
              </div>
              <Link href="/matches/womens-final" className="inline-flex rounded-[5px] bg-saffron px-2 py-1 text-[12px] font-semibold text-white">
                Match preview →
              </Link>
            </div>
          </aside>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3.5 px-4 py-4 md:px-5">
          <StandingsTable title="POOL A" rows={poolAStandings} teams={teamById} qualifyCount={3} />
          <StandingsTable title="POOL B" rows={poolBStandings} teams={teamById} qualifyCount={3} />
        </div>
      )}
    </>
  );
}
