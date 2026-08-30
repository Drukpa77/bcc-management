import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { CompetitionsManager } from "@/components/admin/competitions-manager";

export const metadata: Metadata = { title: "Competitions" };

export default function AdminCompetitionsPage() {
  return (
    <AdminShell title="Competitions" active="/admin/competitions">
      <CompetitionsManager />
    </AdminShell>
  );
}
