import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { DashboardHome } from "@/components/admin/dashboard-home";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard" active="/admin">
      <DashboardHome />
    </AdminShell>
  );
}
