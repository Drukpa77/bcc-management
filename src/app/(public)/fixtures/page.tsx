import type { Metadata } from "next";
import { PageHeader } from "@/components/public/page-header";
import { LeagueWorkspace } from "@/components/public/league-workspace";
import { loadPublicCompetition } from "@/lib/load-public-competition";

export const metadata: Metadata = { title: "Fixtures" };
export default async function FixturesPage({
  searchParams,
}: {
  searchParams: Promise<{ league?: string }>;
}) {
  const { league: leagueId } = await searchParams;
  const initial = await loadPublicCompetition(leagueId);

  if (!initial.league || !initial.view) {
    return <PageHeader kicker="Schedule" title="Fixtures" />;
  }

  return <LeagueWorkspace tab="fixtures" initial={initial} />;
}
