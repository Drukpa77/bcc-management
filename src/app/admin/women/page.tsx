import type { Metadata } from "next";
import { StandingsManager } from "@/components/admin/standings-manager";
import { UseActiveLeague } from "@/components/admin/use-active-league";

export const metadata: Metadata = { title: "Women's Championship" };

export default function AdminWomenPage() {
  return (
    <UseActiveLeague leagueId="womens-championship">
      <StandingsManager />
    </UseActiveLeague>
  );
}
