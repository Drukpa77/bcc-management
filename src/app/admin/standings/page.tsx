import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { Chip } from "@/components/ui/chip";
import { StandingsTable } from "@/components/ui/standings-table";
import { poolAStandings, teamById } from "@/lib/tournament";

export const metadata: Metadata = { title: "Standings" };

export default function AdminStandingsPage() {
  const rows = poolAStandings.map((r) =>
    r.teamId === "pnb" ? { ...r, note: "⚠ MANUAL EDIT" } : r,
  );

  return (
    <AdminShell
      title="Standings — Men's Pool A"
      active="/admin/standings"
      actions={<Chip>Auto-calculated from results</Chip>}
    >
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <div className="min-w-0 flex-1">
          <StandingsTable title="POS TEAM" rows={rows} teams={teamById} qualifyCount={3} />
          <p className="mt-0 rounded-b-lg border border-t-0 border-line bg-[#FEF9EE] px-3 py-1.5 text-[12px] text-[#92400E]">
            ⚠ Manual adjustment on Punakha Bulls (−1 PT, forfeiture ruling) · by T. Dorji, 09 Sept · reason logged
          </p>
        </div>
        <form className="w-full rounded-lg border border-line bg-white lg:w-[240px]">
          <div className="bg-ink px-3 py-2 font-display text-[11px] tracking-[0.12em] text-white uppercase">Manually adjust standing</div>
          <div className="space-y-2 p-2.5 text-[12px]">
            <p className="rounded border border-[#F2DFAE] bg-[#FEF9EE] p-2 text-[#92400E]">
              Overrides only for official rulings — marked publicly and logged.
            </p>
            <label>Reason (required)<textarea className="mt-0.5 h-14 w-full rounded border border-[#C9CDD6] px-2" defaultValue="Forfeiture ruling — ineligible player, R3" /></label>
            <button type="button" className="w-full rounded-[5px] bg-saffron py-1.5 font-semibold text-white">Apply override</button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
