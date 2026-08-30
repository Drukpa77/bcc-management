"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CourtArcs } from "@/components/brand/court-arcs";
import { MountainSilhouette } from "@/components/brand/mountain-silhouette";
import {
  BracketPanel,
  FixturesPanel,
  ResultsPanel,
  StandingsPanelView,
  TeamsPanel,
} from "@/components/public/league-tab-panels";
import { PublicMatchRow } from "@/components/public/match-row";
import { PubWrap, SectionHeading } from "@/components/public/public-primitives";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { FORMAT_LABEL, findTeam } from "@/lib/app-store";
import type { PublicCompetition } from "@/lib/public-league";
import { buildLeagueView, isOfficialResult } from "@/lib/tournament-engine";

export type CompetitionTab = "overview" | "fixtures" | "results" | "standings" | "teams" | "bracket";

const tabs: { id: CompetitionTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "fixtures", label: "Fixtures" },
  { id: "results", label: "Results" },
  { id: "standings", label: "Standings" },
  { id: "teams", label: "Teams" },
  { id: "bracket", label: "Bracket" },
];

function parseTab(value: string | null): CompetitionTab {
  return tabs.some((tab) => tab.id === value) ? (value as CompetitionTab) : "overview";
}

export function CompetitionHub({ initial }: { initial: PublicCompetition }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<CompetitionTab>(() => parseTab(searchParams.get("tab")));

  useEffect(() => {
    setTab(parseTab(searchParams.get("tab")));
  }, [searchParams]);

  const league = initial.league;
  const view = useMemo(
    () => (league ? buildLeagueView(initial.store, league.id) : null),
    [initial.store, league],
  );

  if (!league || !view) {
    return null;
  }

  function go(next: CompetitionTab) {
    setTab(next);
    const query = next === "overview" ? "" : `?tab=${next}`;
    router.replace(`${pathname}${query}`, { scroll: false });
  }

  return (
    <>
      <div className="pub-hero px-0 pt-7 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12">
        <span className="pub-grain" />
        <CourtArcs />
        <MountainSilhouette />
        <div className="pub-wrap relative">
          <p className="flex flex-wrap items-center gap-2 font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
            {league.gender} · {FORMAT_LABEL[league.format]}
            <Badge tone={league.status} />
          </p>
          <h1 className="pub-page-title mt-3">
            {league.name}
          </h1>
          <div className="pub-rule mt-4" />
          <p className="mt-3 text-[14px] text-nav-muted">
            {league.season} · {league.location} · {league.teamIds.length} teams
          </p>
        </div>
      </div>

      <div className="pub-sticky-sub border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="pub-wrap pub-tabs py-2.5 sm:py-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold whitespace-nowrap ${
                tab === item.id ? "bg-ink text-gold" : "text-[#5B6472] hover:bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "overview" ? (
        <OverviewPanel store={initial.store} league={league} view={view} onTab={go} />
      ) : null}
      {tab === "fixtures" ? <FixturesPanel store={initial.store} view={view} /> : null}
      {tab === "results" ? <ResultsPanel store={initial.store} view={view} /> : null}
      {tab === "standings" ? <StandingsPanelView store={initial.store} league={league} view={view} /> : null}
      {tab === "teams" ? <TeamsPanel store={initial.store} league={league} view={view} /> : null}
      {tab === "bracket" ? <BracketPanel store={initial.store} view={view} /> : null}
    </>
  );
}

function OverviewPanel({
  store,
  league,
  view,
  onTab,
}: {
  store: PublicCompetition["store"];
  league: NonNullable<PublicCompetition["league"]>;
  view: NonNullable<PublicCompetition["view"]>;
  onTab: (tab: CompetitionTab) => void;
}) {
  const upcoming = view.fixtures.filter((fixture) => !isOfficialResult(fixture)).slice(0, 3);
  const played = view.fixtures.filter(isOfficialResult).length;

  return (
    <PubWrap className="flex flex-col gap-8 py-8 md:flex-row md:items-start md:py-10">
      <div className="min-w-0 flex-1 space-y-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="pub-card p-4">
            <p className="text-[10px] font-bold tracking-[0.16em] text-[#8A909C] uppercase">Stage</p>
            <p className="mt-1 font-display text-[20px] font-extrabold uppercase">
              {view.bracketReady ? "Knockout" : "Pool round"}
            </p>
          </div>
          <div className="pub-card p-4">
            <p className="text-[10px] font-bold tracking-[0.16em] text-[#8A909C] uppercase">Matches</p>
            <p className="mt-1 font-display text-[20px] font-extrabold uppercase">
              {played}
              <span className="text-[13px] font-semibold text-muted"> / {view.fixtures.length || "—"}</span>
            </p>
          </div>
          <div className="pub-card p-4">
            <p className="text-[10px] font-bold tracking-[0.16em] text-[#8A909C] uppercase">Format</p>
            <p className="mt-1 font-display text-[20px] font-extrabold uppercase">{FORMAT_LABEL[league.format]}</p>
          </div>
        </div>

        <div>
          <SectionHeading title="Next fixtures" />
          {upcoming.length === 0 ? (
            <p className="text-[14px] text-muted">No upcoming fixtures listed.</p>
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
          <button
            type="button"
            onClick={() => onTab("fixtures")}
            className="mt-3 text-[13px] font-semibold text-saffron"
          >
            All fixtures in this competition
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(155deg,#161B26,#2a3550)] p-5 text-white">
          <p className="font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">Qualification</p>
          <p className="mt-2 font-display text-[18px] font-extrabold uppercase">
            {league.format === "pools"
              ? "Top 3 of each pool advance · A2 v B3 and B2 v A3 in the quarters"
              : "The table sets the knockout picture"}
          </p>
          <button
            type="button"
            onClick={() => onTab("bracket")}
            className="mt-4 inline-flex rounded-full border border-white/25 px-3.5 py-1.5 text-[12px] font-semibold"
          >
            Open this bracket
          </button>
        </div>
      </div>

      <aside className="flex w-full flex-col gap-4 md:w-[300px]">
        {(league.format === "pools"
          ? [
              { title: "POOL A", rows: view.poolAStandings.slice(0, 3) },
              { title: "POOL B", rows: view.poolBStandings.slice(0, 3) },
            ]
          : [{ title: "TABLE", rows: view.table.slice(0, 4) }]
        ).map((pool) => (
          <div key={pool.title} className="pub-card overflow-hidden">
            <div className="flex items-center justify-between bg-ink px-3.5 py-2.5 text-gold">
              <b className="font-display text-[12px] tracking-[0.16em]">{pool.title}</b>
              <span className="text-[11px] text-[#7A828F]">W-L</span>
            </div>
            <div className="flex flex-col">
              {pool.rows.map((row) => {
                const team = findTeam(store, row.teamId);
                if (!team) {
                  return null;
                }
                return (
                  <Link
                    key={row.teamId}
                    href={`/teams/${team.id}`}
                    className="flex items-center justify-between border-t border-[#F0EEE8] px-3.5 py-2.5 text-[13px] first:border-t-0 hover:bg-[#FBF8F2]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-4 font-display font-extrabold">{row.pos}</span>
                      <TeamTile team={team} />
                      {team.name}
                    </span>
                    <span className="font-mono text-[12px]">
                      {row.won}-{row.lost}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        <button type="button" onClick={() => onTab("standings")} className="text-left text-[13px] font-semibold text-saffron">
          Full table for this competition
        </button>
      </aside>
    </PubWrap>
  );
}
