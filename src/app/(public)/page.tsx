import Link from "next/link";
import { CourtArcs } from "@/components/brand/court-arcs";
import { MountainSilhouette } from "@/components/brand/mountain-silhouette";
import { NextMatchCard } from "@/components/public/next-match-card";
import { PublicMatchRow } from "@/components/public/match-row";
import { EmptyPanel, PubWrap, SectionHeading } from "@/components/public/public-primitives";
import { TeamTile } from "@/components/ui/team-tile";
import { findTeam } from "@/lib/app-store";
import { isOfficialResult } from "@/lib/tournament-engine";
import { loadPublicCompetition } from "@/lib/load-public-competition";
import type { StandingRow } from "@/lib/types";

function PoolLeaders({
  title,
  rows,
  storeFind,
}: {
  title: string;
  rows: StandingRow[];
  storeFind: (id: string) => ReturnType<typeof findTeam>;
}) {
  return (
    <div className="pub-card overflow-hidden">
      <div className="flex items-center justify-between bg-ink px-3.5 py-2.5 text-gold">
        <b className="font-display text-[12px] tracking-[0.16em]">{title}</b>
        <span className="font-mono text-[10px] text-[#7A828F]">W-L · PTS</span>
      </div>
      <div className="flex flex-col">
        {rows.slice(0, 3).map((row) => {
          const team = storeFind(row.teamId);
          if (!team) {
            return null;
          }
          return (
            <Link
              key={row.teamId}
              href={`/teams/${team.id}`}
              className="flex items-center justify-between gap-2 border-t border-[#F0EEE8] px-3.5 py-2.5 first:border-t-0 hover:bg-[#FBF8F2]"
            >
              <span className="flex min-w-0 items-center gap-2.5 text-[13px]">
                <span className="w-4 font-display text-[15px] font-extrabold">{row.pos}</span>
                <TeamTile team={team} />
                <span className="truncate font-semibold">{team.name}</span>
              </span>
              <span className="font-mono text-[12px] font-bold">
                {row.won}-{row.lost} · {row.pts}
              </span>
            </Link>
          );
        })}
        {rows.length === 0 ? <p className="px-3.5 py-4 text-[13px] text-muted">No results yet</p> : null}
      </div>
    </div>
  );
}

export default async function Home() {
  const { store, league, view } = await loadPublicCompetition();
  const featured = view?.fixtures.find((fixture) => fixture.status === "upcoming" && !isOfficialResult(fixture));
  const home = featured ? findTeam(store, featured.homeId) : undefined;
  const away = featured ? findTeam(store, featured.awayId) : undefined;
  const upcoming = (view?.fixtures ?? []).filter((fixture) => !isOfficialResult(fixture)).slice(0, 4);
  const recent = (view?.fixtures ?? []).filter(isOfficialResult).slice(-3).reverse();
  const played = (view?.fixtures ?? []).filter(isOfficialResult).length;
  const total = view?.fixtures.length ?? 0;

  return (
    <>
      <section className="pub-hero px-0 pt-8 pb-10 sm:pt-10 sm:pb-12 md:pt-14 md:pb-16">
        <span className="pub-grain" />
        <CourtArcs />
        <MountainSilhouette />
        <div className="pub-wrap relative flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase sm:text-[12px] sm:tracking-[0.26em]">
              {league ? `${league.season} · ${league.location}` : "Bhutanese Basketball Cup"}
            </p>
            <h1 className="pub-display mt-3 text-white">
              {league?.name ?? "Bhutanese Basketball Cup"}
            </h1>
            <div className="pub-rule mt-5" />
            <p className="mt-4 max-w-[420px] text-[16px] leading-7 text-nav-muted">
              Live tables and the knockout bracket, drawn from one official scorebook at Changlimithang.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href="/fixtures"
                className="inline-flex items-center rounded-full bg-saffron px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(232,97,28,0.8)]"
              >
                View fixtures
              </Link>
              <Link
                href="/standings"
                className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-[13px] font-semibold text-white hover:border-gold hover:text-gold"
              >
                Standings
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-[320px]">
            {featured && home && away ? (
              <NextMatchCard fixture={featured} home={home} away={away} />
            ) : (
              <div className="rounded-2xl border border-white/12 bg-white/6 px-5 py-6">
                <p className="font-display text-[11px] font-bold tracking-[0.18em] text-gold uppercase">Season desk</p>
                <p className="mt-2 font-display text-[20px] font-extrabold uppercase">Fixtures coming soon</p>
                <p className="mt-1 text-[13px] text-nav-muted">The pool draw sets the opening night at Changlimithang.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="border-b border-line bg-white">
        <PubWrap className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {[
            ["Competition", league?.name ?? "TBC"],
            ["Clubs", `${league?.teamIds.length ?? 0} teams`],
            ["Scorebook", total ? `${played} / ${total} played` : "Awaiting fixtures"],
            ["Stage", view?.bracketReady ? "Knockout" : "Pool round"],
          ].map(([label, value]) => (
            <div key={label} className="bg-white px-4 py-4 md:px-5">
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#8A909C] uppercase">{label}</p>
              <p className="mt-1 truncate font-display text-[18px] font-extrabold uppercase">{value}</p>
            </div>
          ))}
        </PubWrap>
      </div>

      <PubWrap className="flex flex-col gap-8 py-7 sm:gap-10 sm:py-8 lg:flex-row lg:items-start lg:py-12">
        <div className="min-w-0 flex-1">
          <SectionHeading kicker="Schedule" title="Upcoming matches" href="/fixtures" action="Full fixtures" />
          {upcoming.length === 0 ? (
            <EmptyPanel title="No upcoming fixtures" copy="Generate the pool schedule after the draw, or check recent results." />
          ) : (
            <div className="pub-card divide-y divide-[#F0EEE8] overflow-hidden">
              {upcoming.map((fixture) => (
                <PublicMatchRow
                  key={fixture.id}
                  fixture={fixture}
                  home={findTeam(store, fixture.homeId)}
                  away={findTeam(store, fixture.awayId)}
                />
              ))}
            </div>
          )}

          <div className="mt-10">
            <SectionHeading kicker="Scorebook" title="Recent results" href="/results" action="All results" />
            {recent.length === 0 ? (
              <EmptyPanel title="No finals yet" copy="Published scores will land here the moment a match is signed off." />
            ) : (
              <div className="pub-card divide-y divide-[#F0EEE8] overflow-hidden">
                {recent.map((result) => (
                  <PublicMatchRow
                    key={result.id}
                    fixture={result}
                    home={findTeam(store, result.homeId)}
                    away={findTeam(store, result.awayId)}
                    official
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="flex w-full flex-col gap-4 lg:w-[300px]">
          <SectionHeading kicker="Tables" title="Pool leaders" href="/standings" action="Full table" />
          <PoolLeaders title="POOL A" rows={view?.poolAStandings ?? []} storeFind={(id) => findTeam(store, id)} />
          <PoolLeaders title="POOL B" rows={view?.poolBStandings ?? []} storeFind={(id) => findTeam(store, id)} />
          <div className="overflow-hidden rounded-2xl bg-[linear-gradient(155deg,#161B26,#2a3550)] p-5 text-white">
            <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">Playoff picture</p>
            <p className="mt-2 font-display text-[20px] leading-tight font-extrabold uppercase">
              {view?.bracketReady ? "The knockout bracket is set" : "Seeds lock after the pool stage"}
            </p>
            <Link
              href="/bracket"
              className="mt-4 inline-flex rounded-full border border-white/25 px-3.5 py-1.5 text-[12px] font-semibold text-white hover:border-gold hover:text-gold"
            >
              Open bracket
            </Link>
          </div>
        </aside>
      </PubWrap>
    </>
  );
}
