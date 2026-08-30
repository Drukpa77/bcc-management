import type { Metadata } from "next";
import { TeamsManager } from "@/components/admin/teams-manager";

export const metadata: Metadata = { title: "Teams" };

export default function AdminTeamsPage() {
  return <TeamsManager />;
}
