import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { BracketBoard } from "@/components/admin/bracket-board";

export const metadata: Metadata = { title: "Bracket" };

export default function AdminBracketPage() {
  return (
    <AdminShell title="Bracket" active="/admin/bracket">
      <BracketBoard />
    </AdminShell>
  );
}
