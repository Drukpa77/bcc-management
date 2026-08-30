import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { allUpcoming, getTeam, recentResults } from "@/lib/tournament";

export const metadata: Metadata = { title: "Fixtures" };

export default function AdminFixturesPage() {
  return (
    <AdminShell
      title="Fixtures"
      active="/admin/fixtures"
      actions={
        <Link href="/admin/fixtures/generate" className="rounded-[5px] bg-saffron px-2 py-1 text-[12px] font-semibold text-white">
          ＋ Create fixture
        </Link>
      }
    >
      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="bg-ink text-[11px] tracking-[0.1em] text-[#AEB6C2] uppercase">
            <tr>
              <th className="px-2 py-1.5">Date</th>
              <th>Time</th>
              <th>Team A</th>
              <th>Team B</th>
              <th>Venue</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUpcoming().map((f) => (
              <tr key={f.id} className="border-t border-[#EEECE6]">
                <td className="px-2 py-1.5 font-mono">{f.dateLabel.slice(0, 7)}</td>
                <td className="font-mono">{f.time}</td>
                <td><span className="flex items-center gap-1"><TeamTile team={getTeam(f.homeId)} size="sm" /><b>{getTeam(f.homeId).shortName}</b></span></td>
                <td><span className="flex items-center gap-1"><TeamTile team={getTeam(f.awayId)} size="sm" /><b>{getTeam(f.awayId).shortName}</b></span></td>
                <td>{f.venue}</td>
                <td><Badge status={f.status} /></td>
                <td>
                  {f.status === "live" || f.id === "thw-pdr" ? (
                    <Link href="/admin/live" className="rounded-[5px] bg-live px-2 py-0.5 text-[11px] font-semibold text-white">Score panel</Link>
                  ) : (
                    <span className="text-saffron">Edit</span>
                  )}
                </td>
              </tr>
            ))}
            {recentResults.slice(0, 1).map((f) => (
              <tr key={f.id} className="border-t border-[#EEECE6]">
                <td className="px-2 py-1.5 font-mono">{f.dateLabel}</td>
                <td className="font-mono">17:00</td>
                <td><span className="flex items-center gap-1"><TeamTile team={getTeam(f.homeId)} size="sm" /><b>{getTeam(f.homeId).shortName}</b> <b className="font-mono text-saffron">{f.homeScore}</b></span></td>
                <td><span className="flex items-center gap-1"><TeamTile team={getTeam(f.awayId)} size="sm" />{getTeam(f.awayId).shortName} <span className="font-mono text-muted">{f.awayScore}</span></span></td>
                <td>Court 1</td>
                <td><Badge status="final" /></td>
                <td className="text-saffron">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
