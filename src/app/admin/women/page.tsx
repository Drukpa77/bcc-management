import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { StandingsTable } from "@/components/ui/standings-table";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam, teamById, womenStandings } from "@/lib/tournament";

export const metadata: Metadata = { title: "Women's Championship" };

export default function AdminWomenPage() {
  return (
    <AdminShell title="Women's Championship — Round Robin + Final" active="/admin/women" actions={<Badge status="live" />}>
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <div className="min-w-0 flex-1">
          <StandingsTable title="ROUND ROBIN — 12 OF 15 PLAYED" rows={womenStandings} teams={teamById} qualifyCount={2} />
        </div>
        <div className="w-full overflow-hidden rounded-lg border border-line bg-white lg:w-[240px]">
          <div className="bg-ink px-3 py-1.5 font-display text-[11px] tracking-[0.15em] text-gold">THE FINAL — AUTO-SEEDED</div>
          <div className="space-y-2 p-2.5 text-[12px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1"><TeamTile team={getTeam("tqn")} size="sm" /><b>Queens (1st)</b></span>
              vs
              <span className="flex items-center gap-1"><b>Phoenix (2nd)</b><TeamTile team={getTeam("ppx")} size="sm" /></span>
            </div>
            <p className="text-muted">Seeds lock automatically when the last round-robin game is entered</p>
            <button type="button" className="w-full rounded-[5px] bg-saffron py-1.5 font-semibold text-white">Confirm final fixture</button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
