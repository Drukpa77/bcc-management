import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourtArcs } from "@/components/brand/court-arcs";
import { PublicMatchRow } from "@/components/public/match-row";
import { PubWrap, SectionHeading } from "@/components/public/public-primitives";
import { TeamTile } from "@/components/ui/team-tile";
import { findTeam } from "@/lib/app-store";
import { buildLeagueView, isOfficialResult } from "@/lib/tournament-engine";
import { loadTournamentState } from "@/lib/tournament-state";

export const metadata: Metadata = { title: "Team" };

export default async function TeamProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const state = await loadTournamentState();
  const team = findTeam(state, id);
  if (!team) {
    notFound();
  }

  const league = state.leagues.find((item) => item.teamIds.includes(team.id));
  const view = league ? buildLeagueView(state, league.id) : null;
  const rec = view
    ? [...view.poolAStandings, ...view.poolBStandings, ...view.table].find((row) => row.teamId === team.id)
    : undefined;
  const fixtures = league ? (state.fixtures[league.id] ?? []) : [];
  const next = fixtures.find((fixture) => !isOfficialResult(fixture) && (fixture.homeId === team.id || fixture.awayId === team.id));
  const recent = fixtures
    .filter((fixture) => isOfficialResult(fixture) && (fixture.homeId === team.id || fixture.awayId === team.id))
    .slice(-3)
    .reverse();
  const roster = state.players
    .filter((player) => player.teamId === team.id)
    .slice()
    .sort((a, b) => a.number - b.number);
  const pool = view?.poolA.includes(team.id) ? "A" : view?.poolB.includes(team.id) ? "B" : undefined;

  return (
    <>
      <div className="pub-hero relative overflow-hidden px-4 pt-10 pb-10 md:px-6">
        <span className="pub-grain" />
        <CourtArcs />
        <div className="relative mx-auto flex max-w-[1180px] flex-wrap items-center gap-5">
          <TeamTile team={team} size="xl" />
          <div>
            <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
              {team.gender === "women" ? "Women" : "Men"}
              {team.city ? ` · ${team.city}` : ""}
              {pool ? ` · Pool ${pool}` : ""}
            </p>
            <h1 className="mt-1 font-display text-[36px] leading-none font-extrabold uppercase md:text-[48px]">{team.name}</h1>
            {rec ? (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-[13px] text-nav-muted">
                  {rec.won}-{rec.lost} · {rec.pts} pts
                </span>
                <span className="flex items-center gap-1">
                  {rec.form.map((result, index) => (
                    <span
                      key={index}
                      className={`grid size-5 place-items-center rounded-[4px] text-[10px] font-bold ${
                        result === "W" ? "bg-win text-white" : "bg-white/10 text-nav-muted"
                      }`}
                    >
                      {result}
                    </span>
                  ))}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <PubWrap className="flex flex-col gap-8 py-8 md:flex-row md:items-start md:py-10">
        <div className="min-w-0 flex-1">
          <SectionHeading kicker="Roster" title="Squad" />
          {roster.length === 0 ? (
            <p className="text-[14px] text-muted">Roster not published yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {roster.map((player) => (
                <div key={player.id} className="pub-card overflow-hidden">
                  <div
                    className="relative grid h-28 place-items-center overflow-hidden font-display text-2xl font-extrabold text-white"
                    style={{ background: team.color }}
                  >
                    {player.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={player.image} alt="" className="absolute inset-0 size-full object-cover" />
                    ) : (
                      `#${player.number}`
                    )}
                    <span className="absolute right-2 bottom-2 rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[11px] font-bold">
                      #{player.number}
                    </span>
                  </div>
                  <div className="px-3 py-2.5">
                    <b className="text-[13px]">{player.name}</b>
                    <p className="text-[11px] text-muted">
                      {player.position}
                      {player.captain ? " · Captain" : ""}
                      {player.age ? ` · ${player.age}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {recent.length > 0 ? (
            <div className="mt-10">
              <SectionHeading kicker="Scorebook" title="Recent" href="/results" />
              <div className="pub-card divide-y divide-[#F0EEE8] overflow-hidden">
                {recent.map((fixture) => (
                  <PublicMatchRow
                    key={fixture.id}
                    fixture={fixture}
                    home={findTeam(state, fixture.homeId)}
                    away={findTeam(state, fixture.awayId)}
                    official
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="flex w-full flex-col gap-4 md:w-[320px]">
          <SectionHeading kicker="Next" title="Upcoming" />
          {next ? (
            <div className="pub-card overflow-hidden">
              <PublicMatchRow
                fixture={next}
                home={findTeam(state, next.homeId)}
                away={findTeam(state, next.awayId)}
              />
            </div>
          ) : (
            <p className="text-[14px] text-muted">No upcoming fixture listed.</p>
          )}
          {league ? (
            <Link href={`/standings?league=${league.id}`} className="text-[13px] font-semibold text-saffron">
              {league.name} standings
            </Link>
          ) : null}
        </aside>
      </PubWrap>
    </>
  );
}
