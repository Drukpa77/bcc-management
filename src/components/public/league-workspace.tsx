"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PageHeader } from "@/components/public/page-header";
import { CompetitionBar } from "@/components/public/competition-bar";
import {
  BracketPanel,
  FixturesPanel,
  ResultsPanel,
  StandingsPanelView,
  TeamsPanel,
} from "@/components/public/league-tab-panels";
import { setPublicLeagueAction } from "@/app/actions/results";
import {
  leagueTabs,
  type LeagueTab,
  type PublicCompetition,
} from "@/lib/public-league";
import { buildLeagueView } from "@/lib/tournament-engine";

const titles: Record<LeagueTab, { kicker: string; title: string }> = {
  fixtures: { kicker: "Schedule", title: "Fixtures" },
  results: { kicker: "Scorebook", title: "Results" },
  standings: { kicker: "Tables", title: "Standings" },
  bracket: { kicker: "Playoffs", title: "Bracket" },
  teams: { kicker: "Clubs", title: "Teams" },
};

export function LeagueWorkspace({
  tab,
  initial,
}: {
  tab: LeagueTab;
  initial: PublicCompetition;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [store, setStore] = useState(initial.store);
  const [leagueId, setLeagueId] = useState(initial.league?.id ?? "");
  const [activeTab, setActiveTab] = useState<LeagueTab>(tab);

  useEffect(() => {
    setStore(initial.store);
    if (initial.league?.id) {
      setLeagueId(initial.league.id);
    }
  }, [initial]);

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const league = store.leagues.find((item) => item.id === leagueId) ?? store.leagues[0];
  const view = useMemo(
    () => (league ? buildLeagueView(store, league.id) : null),
    [store, league],
  );
  const heading = titles[activeTab];

  if (!league || !view) {
    return <PageHeader kicker={heading.kicker} title={heading.title} />;
  }

  return (
    <>
      <PageHeader kicker={`${league.name} · ${league.season}`} title={heading.title}>
        <p className="mt-3 text-[14px] text-nav-muted">
          {league.location} · {league.teamIds.length} clubs
        </p>
      </PageHeader>
      <CompetitionBar
        leagues={store.leagues}
        currentId={league.id}
        tabs={leagueTabs(league.id, activeTab)}
        onTabSelect={setActiveTab}
        onLeagueSelect={(id) => {
          setLeagueId(id);
          void setPublicLeagueAction(id).then(() => {
            router.replace(`${pathname}?league=${id}`);
          });
        }}
      />
      {activeTab === "fixtures" ? <FixturesPanel store={store} view={view} /> : null}
      {activeTab === "results" ? <ResultsPanel store={store} view={view} /> : null}
      {activeTab === "standings" ? <StandingsPanelView store={store} league={league} view={view} /> : null}
      {activeTab === "bracket" ? <BracketPanel store={store} view={view} /> : null}
      {activeTab === "teams" ? <TeamsPanel store={store} league={league} view={view} /> : null}
    </>
  );
}
