import type { Metadata } from "next";
import { LeagueEditor } from "@/components/admin/league-editor";

export const metadata: Metadata = { title: "League" };

export default async function AdminLeaguePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LeagueEditor leagueId={id} />;
}
