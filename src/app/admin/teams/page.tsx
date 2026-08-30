import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { TeamsManager } from "@/components/admin/teams-manager";

export const metadata: Metadata = { title: "Teams" };

export default function AdminTeamsPage() {
  return (
    <AdminShell title="Teams" active="/admin/teams">
      <TeamsManager />
    </AdminShell>
  );
}
