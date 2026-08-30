import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { PoolsBoard } from "@/components/admin/pools-board";

export const metadata: Metadata = { title: "Pools" };

export default function AdminPoolsPage() {
  return (
    <AdminShell title="Pools" active="/admin/pools">
      <PoolsBoard />
    </AdminShell>
  );
}
