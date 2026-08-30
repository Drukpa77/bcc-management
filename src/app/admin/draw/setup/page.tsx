import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { DrawSetupPanel } from "@/components/admin/draw-setup-panel";

export const metadata: Metadata = { title: "Pool Draw Setup" };

export default function DrawSetupPage() {
  return (
    <AdminShell title="Live Pool Draw — Setup" active="/admin/draw/setup">
      <DrawSetupPanel />
    </AdminShell>
  );
}
