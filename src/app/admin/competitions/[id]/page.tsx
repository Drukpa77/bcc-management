import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { LeagueEditor } from "@/components/admin/league-editor";

export const metadata: Metadata = { title: "League" };

export default async function AdminLeaguePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminShell title="League" active="/admin/competitions">
      <LeagueEditor leagueId={id} />
    </AdminShell>
  );
}
