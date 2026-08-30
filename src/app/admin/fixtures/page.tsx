import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { FixturesBoard } from "@/components/admin/fixtures-board";

export const metadata: Metadata = { title: "Fixtures" };

export default function AdminFixturesPage() {
  return (
    <AdminShell
      title="Fixtures"
      active="/admin/fixtures"
      actions={
        <Link href="/admin/fixtures/generate" className="rounded-[5px] bg-saffron px-2 py-1 text-[12px] font-semibold text-white">
          ＋ Create fixture
        </Link>
      }
    >
      <FixturesBoard />
    </AdminShell>
  );
}
