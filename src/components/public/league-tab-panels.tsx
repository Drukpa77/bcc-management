import Link from "next/link";
import { PublicMatchRow } from "@/components/public/match-row";
import { EmptyPanel, PubWrap } from "@/components/public/public-primitives";
import { QualificationLegend } from "@/components/tournament/standings-panel";
import { BracketTree } from "@/components/tournament/bracket-tree";
import { StandingsTable } from "@/components/ui/standings-table";
import { TeamTile } from "@/components/ui/team-tile";
import { findTeam, leagueTeams } from "@/lib/app-store";
import type { PublicCompetition } from "@/lib/public-league";
import { isOfficialResult, teamMap } from "@/lib/tournament-engine";

type Store = PublicCompetition["store"];
type View = NonNullable<PublicCompetition["view"]>;
type League = NonNullable<PublicCompetition["league"]>;

export function FixturesPanel({ store, view }: { store: Store; view: View }) {
  const upcoming = view.fixtures.filter((fixture) => !isOfficialResult(fixture));
  const grouped = new Map<string, typeof upcoming>();
  for (const fixture of upcoming) {
    const key = fixture.dateLabel || "TBC";
    grouped.set(key, [...(grouped.get(key) ?? []), fixture]);
  }

  return (
    <PubWrap className="flex flex-col gap-8 py-8 md:py-10">
      {upcoming.length === 0 ? (
        <EmptyPanel
          title="No upcoming fixtures"
          copy="The group schedule appears after the pool draw. Completed games live on the results tab."
        />
      ) : (
        [...grouped.entries()].map(([label, items]) => (
          <section key={label}>
            <h2 className="mb-3 font-display text-[15px] font-extrabold tracking-[0.12em] uppercase">{label}</h2>
            <div className="pub-card divide-y divide-[#F0EEE8] overflow-hidden">
              {items.map((fixture) => (
                <PublicMatchRow
                  key={fixture.id}
                  fixture={fixture}
                  home={findTeam(store, fixture.homeId)}
                  away={findTeam(store, fixture.awayId)}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </PubWrap>
  );
}

export function ResultsPanel({ store, view }: { store: Store; view: View }) {
  const results = view.fixtures.filter(isOfficialResult);
  const grouped = new Map<string, typeof results>();
  for (const fixture of results) {
    const key = fixture.dateLabel || "Recent";
    grouped.set(key, [...(grouped.get(key) ?? []), fixture]);
  }

  return (
    <PubWrap className="flex flex-col gap-8 py-8 md:py-10">
      {results.length === 0 ? (
        <EmptyPanel title="No completed matches yet" copy="Final scores appear here once officials publish a result." />
      ) : (
        [...grouped.entries()].map(([label, items]) => (
          <section key={label}>
            <h2 className="mb-3 font-display text-[15px] font-extrabold tracking-[0.12em] uppercase">{label}</h2>
            <div className="pub-card divide-y divide-[#F0EEE8] overflow-hidden">
              {items.map((fixture) => (
                <PublicMatchRow
                  key={fixture.id}
                  fixture={fixture}
                  home={findTeam(store, fixture.homeId)}
                  away={findTeam(store, fixture.awayId)}
                  official
                />
              ))}
            </div>
          </section>
        ))
      )}
    </PubWrap>
  );
}

export function StandingsPanelView({ store, league, view }: { store: Store; league: League; view: View }) {
  const teams = teamMap(store);
  const qualifyCount = league.format === "pools" ? 3 : league.format === "round-robin" ? 2 : 0;
  return (
    <PubWrap className="flex flex-col gap-6 py-8 md:py-10">
      <QualificationLegend format={league.format} />
      {league.format === "pools" ? (
        <>
          <StandingsTable title="POOL A" rows={view.poolAStandings} teams={teams} qualifyCount={qualifyCount} className="pub-card overflow-hidden !border-0" />
          <StandingsTable title="POOL B" rows={view.poolBStandings} teams={teams} qualifyCount={qualifyCount} className="pub-card overflow-hidden !border-0" />
        </>
      ) : (
        <StandingsTable title={league.name.toUpperCase()} rows={view.table} teams={teams} qualifyCount={qualifyCount} className="pub-card overflow-hidden !border-0" />
      )}
    </PubWrap>
  );
}

export function BracketPanel({ store, view }: { store: Store; view: View }) {
  return (
    <div className="bg-[linear-gradient(180deg,#F7F5F1,#EFE8DC)] py-8 md:py-10">
      <div className="pub-wrap">
        <BracketTree
          matches={view.bracket}
          teams={teamMap(store)}
          championId={view.championId}
          ready={view.bracketReady}
          remaining={view.remainingPoolMatches}
        />
      </div>
    </div>
  );
}

export function TeamsPanel({ store, league, view }: { store: Store; league: League; view: View }) {
  const clubs = leagueTeams(store, league);
  const records = Object.fromEntries(
    [...view.poolAStandings, ...view.poolBStandings, ...view.table].map((row) => [row.teamId, row]),
  );

  return (
    <PubWrap className="grid grid-cols-1 gap-3 py-7 min-[400px]:grid-cols-2 sm:grid-cols-3 md:gap-4 md:py-10 lg:grid-cols-4">
      {clubs.map((team) => {
        const rec = records[team.id];
        const pool = view.poolA.includes(team.id) ? "A" : view.poolB.includes(team.id) ? "B" : undefined;
        return (
          <Link
            key={team.id}
            href={`/teams/${team.id}`}
            className="pub-card group p-4 text-center transition-transform hover:-translate-y-0.5 sm:p-5"
            style={{ borderTop: `4px solid ${team.color}` }}
          >
            <TeamTile team={team} size="lg" />
            <b className="mt-3 block font-display text-[14px] tracking-[0.05em] uppercase">{team.name}</b>
            <span className="text-[12px] text-muted">
              {pool ? `Pool ${pool}` : league.name} · {team.city ?? team.code}
            </span>
            {rec ? (
              <div className="mt-3 flex justify-center gap-3 border-t border-[#EEECE6] pt-3 text-[11px]">
                <span>
                  <b className="font-mono">{rec.played}</b> P
                </span>
                <span className="text-win">
                  <b className="font-mono">{rec.won}</b> W
                </span>
                <span className="text-loss">
                  <b className="font-mono">{rec.lost}</b> L
                </span>
              </div>
            ) : null}
          </Link>
        );
      })}
    </PubWrap>
  );
}
