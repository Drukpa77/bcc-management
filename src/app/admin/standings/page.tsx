import type { Metadata } from "next";
import { StandingsManager } from "@/components/admin/standings-manager";

export const metadata: Metadata = { title: "Standings" };

export default function AdminStandingsPage() {
  return <StandingsManager />;
}
