import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import { Chip } from "@/components/ui/chip";
import { TeamTile } from "@/components/ui/team-tile";
import { poolAStandings, poolBStandings, teams } from "@/lib/tournament";

export const metadata: Metadata = { title: "Teams" };

export default function TeamsPage() {
  const men = teams.filter((t) => t.gender === "men");
  const records = Object.fromEntries(
    [...poolAStandings, ...poolBStandings].map((r) => [r.teamId, r]),
  );

  return (
    <>
      <PageHeader kicker="National Championship 2026" title="Teams" />
      <div className="flex flex-wrap gap-1.5 border-b border-line bg-white px-4 py-2.5 md:px-5">
        <Chip active>Men</Chip>
        <Chip href="/standings?div=women">Women</Chip>
        <Chip>Pool A</Chip>
        <Chip>Pool B</Chip>
      </div>
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-2 gap-2.5 px-4 py-4 sm:grid-cols-3 lg:grid-cols-4 md:px-5">
        {men.map((team) => {
          const rec = records[team.id];
          return (
            <Link
              key={team.id}
              href={`/teams/${team.id}`}
              className="rounded-lg border border-line bg-card p-3.5 text-center"
              style={{ borderTop: `3px solid ${team.color}` }}
            >
              <TeamTile team={team} size="lg" />
              <b className="mt-2 block font-display text-[13px] tracking-[0.05em] uppercase">{team.name}</b>
              <span className="text-[11px] text-muted">Pool {team.pool} · {team.city}</span>
              {rec ? (
                <div className="mt-2 flex justify-center gap-2.5 border-t border-[#EEECE6] pt-2 text-[11px]">
                  <span><b className="font-mono">{rec.played}</b> P</span>
                  <span className="text-win"><b className="font-mono">{rec.won}</b> W</span>
                  <span className="text-loss"><b className="font-mono">{rec.lost}</b> L</span>
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>
    </>
  );
}
