import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ResultsManager } from "@/components/admin/results-manager";

export const metadata: Metadata = { title: "Results" };

export default function AdminResultsPage() {
  return (
    <AdminShell title="Results" active="/admin/results">
      <ResultsManager />
    </AdminShell>
  );
}
