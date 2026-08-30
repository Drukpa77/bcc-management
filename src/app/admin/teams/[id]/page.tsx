import type { Metadata } from "next";
import { TeamRoster } from "@/components/admin/team-roster";

export const metadata: Metadata = { title: "Team roster" };

export default async function AdminTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TeamRoster id={id} />;
}
