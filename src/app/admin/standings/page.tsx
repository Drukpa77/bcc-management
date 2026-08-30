import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { StandingsManager } from "@/components/admin/standings-manager";

export const metadata: Metadata = { title: "Standings" };

export default function AdminStandingsPage() {
  return (
    <AdminShell title="Standings" active="/admin/standings">
      <StandingsManager />
    </AdminShell>
  );
}
