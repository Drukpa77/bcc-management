import type { Metadata } from "next";
import { FixturesBoard } from "@/components/admin/fixtures-board";

export const metadata: Metadata = { title: "Fixtures" };

export default function AdminFixturesPage() {
  return <FixturesBoard />;
}
