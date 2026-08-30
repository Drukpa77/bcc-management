import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam, warriorsSquad } from "@/lib/tournament";

export const metadata: Metadata = { title: "Team" };

export default async function AdminTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let team;
  try {
    team = getTeam(id);
  } catch {
    notFound();
  }

  return (
    <AdminShell title={team.name} active="/admin/teams">
      <div className="mb-2.5 flex items-center gap-3 rounded-lg border border-line bg-white p-3">
        <TeamTile team={team} size="xl" />
        <div>
          <b className="font-display text-[17px] uppercase">{team.name}</b>
          <p className="text-[12px] text-muted">National Championship 2026 · {team.gender === "women" ? "Women" : `Men's Pool ${team.pool}`} · {team.city} Dzongkhag</p>
          <p className="text-[12px] text-muted">Coach: Ugyen Tshering · Manager: Deki Yangzom</p>
        </div>
        <Badge tone="registration">REGISTERED</Badge>
      </div>
      <div className="overflow-hidden rounded-lg border border-line bg-white">
        <div className="bg-[#F1EFE9] px-3 py-1.5 text-[11px] font-bold">SQUAD ({warriorsSquad.length})</div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-ink text-[11px] text-[#AEB6C2]"><tr><th className="px-2 py-1">#</th><th>Player</th><th>Position</th><th>Status</th></tr></thead>
          <tbody>
            {warriorsSquad.map((p) => (
              <tr key={p.number} className="border-t border-[#EEECE6]">
                <td className="px-2 py-1 font-mono">{p.number}</td>
                <td><b>{p.name}</b>{p.number === 7 ? <span className="ml-1 text-saffron">Captain</span> : null}</td>
                <td>{p.pos}</td>
                <td><Badge tone="registration">ACTIVE</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
