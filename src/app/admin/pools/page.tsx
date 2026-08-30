import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam, poolAStandings, poolBStandings } from "@/lib/tournament";

export const metadata: Metadata = { title: "Pools" };

export default function AdminPoolsPage() {
  return (
    <AdminShell
      title="Pools — Men's National Championship"
      active="/admin/pools"
      actions={<Link href="/admin/draw/setup" className="rounded-[5px] border border-[#C9CDD6] px-2 py-1 text-[12px]">🎡 Re-run draw</Link>}
    >
      <div className="mb-2"><Badge tone="done">POOLS CONFIRMED</Badge></div>
      <div className="grid gap-2.5 md:grid-cols-2">
        {[
          ["MEN'S POOL A · 5 TEAMS", poolAStandings],
          ["MEN'S POOL B · 5 TEAMS", poolBStandings],
        ].map(([title, rows]) => (
          <div key={title as string} className="overflow-hidden rounded-lg border border-line bg-white">
            <div className="flex items-center justify-between bg-ink px-3 py-1.5 text-gold">
              <b className="font-display text-[11px] tracking-[0.15em]">{title as string}</b>
              <span className="text-[11px] text-[#7A828F]">Drawn 02 Sept, 19:12</span>
            </div>
            <div className="flex flex-col gap-1.5 p-2.5">
              {(rows as typeof poolAStandings).map((row, i) => {
                const team = getTeam(row.teamId);
                return (
                  <div key={team.id} className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-2"><TeamTile team={team} /><b>{team.name}</b></span>
                    <span className="text-muted">Spin {i * 2 + (title.toString().includes("A") ? 1 : 2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 rounded-lg border border-[#BBE4C8] bg-[#EDFDF2] p-2.5 text-[12px] text-[#276438]">
        <b>✓ Pools official.</b> Fixtures were generated on 03 Sept. Public site is up to date.
      </p>
    </AdminShell>
  );
}
