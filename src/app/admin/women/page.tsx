import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { StandingsManager } from "@/components/admin/standings-manager";

export const metadata: Metadata = { title: "Women's Championship" };

export default function AdminWomenPage() {
  return (
    <AdminShell title="Women" active="/admin/women">
      <p className="mb-4 text-[13px] text-muted">
        Switch the league selector to Women&apos;s Championship to manage that table, results, and qualification.
      </p>
      <StandingsManager />
    </AdminShell>
  );
}
