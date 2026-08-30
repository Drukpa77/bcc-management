import type { Metadata } from "next";
import { CompetitionsManager } from "@/components/admin/competitions-manager";

export const metadata: Metadata = { title: "Competitions" };

export default function AdminCompetitionsPage() {
  return <CompetitionsManager />;
}
