import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { FixtureGeneratorPanel } from "@/components/admin/fixture-generator-panel";

export const metadata: Metadata = { title: "Fixture Generator" };

export default function FixtureGeneratorPage() {
  return (
    <AdminShell title="Fixture Generator" active="/admin/fixtures">
      <FixtureGeneratorPanel />
    </AdminShell>
  );
}
