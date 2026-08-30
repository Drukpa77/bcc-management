import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { TeamRoster } from "@/components/admin/team-roster";

export const metadata: Metadata = { title: "Team roster" };

export default async function AdminTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminShell title="Team roster" active="/admin/teams">
      <TeamRoster id={id} />
    </AdminShell>
  );
}
