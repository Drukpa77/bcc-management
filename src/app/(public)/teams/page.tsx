import type { Metadata } from "next";
import { PageHeader } from "@/components/public/page-header";
import { LeagueWorkspace } from "@/components/public/league-workspace";
import { loadPublicCompetition } from "@/lib/load-public-competition";

export const metadata: Metadata = { title: "Teams" };
export default async function TeamsPage({
  searchParams,
}: {
  searchParams: Promise<{ league?: string }>;
}) {
  const { league: leagueId } = await searchParams;
  const initial = await loadPublicCompetition(leagueId);

  if (!initial.league || !initial.view) {
    return <PageHeader kicker="Clubs" title="Teams" />;
  }

  return <LeagueWorkspace tab="teams" initial={initial} />;
}
