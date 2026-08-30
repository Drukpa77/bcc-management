import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam, poolAStandings, poolBStandings, upcomingFixtures, warriorsSquad } from "@/lib/tournament";

export const metadata: Metadata = { title: "Team" };

export default async function TeamProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let team;
  try {
    team = getTeam(id);
  } catch {
    notFound();
  }
  const rec = [...poolAStandings, ...poolBStandings].find((r) => r.teamId === team.id);
  const next = upcomingFixtures.find((f) => f.homeId === team.id || f.awayId === team.id);
  const opponent = next ? getTeam(next.homeId === team.id ? next.awayId : next.homeId) : null;

  return (
    <>
      <div className="dhdr relative overflow-hidden bg-[linear-gradient(120deg,#161B26_40%,#3a2416)] px-4 py-6 text-white md:px-5">
        <div className="arc -right-20 -top-36 size-[280px] !border-[rgba(232,97,28,0.25)]" />
        <div className="relative flex flex-wrap items-center gap-4">
          <TeamTile team={team} size="xl" />
          <div>
            <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
              National Championship 2026 · {team.gender === "women" ? "Women" : `Men's Pool ${team.pool}`} · {team.city}
            </p>
            <h1 className="font-display text-[26px] font-extrabold uppercase">{team.name}</h1>
            {rec ? (
              <div className="mt-1 flex items-center gap-1">
                <span className="text-[11px] text-nav-muted">Form</span>
                {rec.form.map((r, i) => (
                  <span key={i} className={`grid size-3 place-items-center rounded-[3px] text-[8px] font-bold ${r === "W" ? "bg-win text-white" : "bg-[#39404C] text-nav-muted"}`}>{r}</span>
                ))}
              </div>
            ) : null}
          </div>
          {rec ? (
            <div className="ml-auto flex gap-4">
              {[
                [`${rec.pos}${rec.pos === 1 ? "st" : "nd"}`, `POOL ${team.pool}`],
                [`${rec.won}–${rec.lost}`, "W–L"],
                [`+${rec.pf - rec.pa}`, "PD"],
                [String(rec.pts), "PTS"],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="font-mono text-[22px] font-extrabold text-gold">{v}</p>
                  <p className="text-[11px] text-[#7A828F]">{l}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-4 py-4 md:flex-row md:items-start md:px-5">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-[13px] font-bold tracking-[0.05em] uppercase">Squad</h2>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(team.id === "thw" ? warriorsSquad : warriorsSquad.slice(0, 5)).map((p) => (
              <div key={p.number} className="overflow-hidden rounded-lg border border-line bg-card">
                <div className="grid h-14 place-items-center bg-[linear-gradient(180deg,#DDE1E7,#C3C9D2)] font-display text-lg font-bold text-[#8A909C]">
                  #{p.number}
                </div>
                <div className="px-2 py-1.5">
                  <b className="text-[12px]">{p.name}</b>
                  <p className="text-[11px] text-muted">{p.pos}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="flex w-full flex-col gap-2 md:w-[250px]">
          <h2 className="font-display text-[13px] font-bold tracking-[0.05em] uppercase">Upcoming</h2>
          {next && opponent ? (
            <div className="rounded-lg border border-line bg-card p-2.5">
              <div className="flex items-center justify-between">
                <Badge status="upcoming">SAT {next.time}</Badge>
                <Chip>Pool {team.pool}</Chip>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <TeamTile team={opponent} />
                <b>vs {opponent.name}</b>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}
