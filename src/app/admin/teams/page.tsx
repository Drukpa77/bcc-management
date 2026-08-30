import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { TeamTile } from "@/components/ui/team-tile";
import { teams } from "@/lib/tournament";

export const metadata: Metadata = { title: "Teams" };

export default function AdminTeamsPage() {
  return (
    <AdminShell
      title="Teams"
      active="/admin/teams"
      actions={<Link href="/admin/teams/register" className="rounded-[5px] bg-saffron px-2 py-1 text-[12px] font-semibold text-white">＋ Register Team</Link>}
    >
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Link key={team.id} href={`/admin/teams/${team.id}`} className="flex items-center gap-2 rounded-lg border border-line bg-white p-3">
            <TeamTile team={team} />
            <div>
              <b>{team.name}</b>
              <p className="text-[12px] text-muted">{team.gender === "women" ? "Women" : `Men · Pool ${team.pool}`} · {team.city}</p>
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
