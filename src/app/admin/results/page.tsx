import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { TeamTile } from "@/components/ui/team-tile";
import { allResults, getTeam } from "@/lib/tournament";

export const metadata: Metadata = { title: "Results" };

export default function AdminResultsPage() {
  return (
    <AdminShell title="Results" active="/admin/results">
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-line bg-white">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-ink text-[11px] text-[#AEB6C2] uppercase">
              <tr><th className="px-2 py-1.5">Date</th><th>Match</th><th className="text-right">Score</th><th>Stage</th></tr>
            </thead>
            <tbody>
              {allResults().map((r) => (
                <tr key={r.id} className="border-t border-[#EEECE6]">
                  <td className="px-2 py-1.5 font-mono">{r.dateLabel}</td>
                  <td><b>{getTeam(r.homeId).shortName}</b> v {getTeam(r.awayId).shortName}</td>
                  <td className="text-right font-mono font-bold">{r.homeScore}–{r.awayScore}</td>
                  <td>{r.group}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-[#EEECE6] px-3 py-1.5 text-[12px] text-muted">
            Results auto-update standings → qualification → bracket → public site.
          </p>
        </div>
        <form className="w-full rounded-lg border border-line bg-white lg:w-[240px]">
          <div className="bg-ink px-3 py-2 font-display text-[11px] tracking-[0.12em] text-white uppercase">Enter match result</div>
          <div className="flex flex-col items-center gap-2 p-2.5">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <TeamTile team={getTeam("pnb")} />
                <input className="mt-1 h-9 w-11 rounded border border-[#C9CDD6] text-center font-mono" defaultValue="78" />
              </div>
              <span className="text-muted">—</span>
              <div className="text-center">
                <TeamTile team={getTeam("hat")} />
                <input className="mt-1 h-9 w-11 rounded border border-[#C9CDD6] text-center font-mono" defaultValue="83" />
              </div>
            </div>
            <p className="text-[11px] text-muted">On save: Tigers +1 W · Bulls +1 L · standings re-ranked</p>
            <button type="button" className="w-full rounded-[5px] bg-saffron py-1.5 text-[13px] font-semibold text-white">Save result</button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
