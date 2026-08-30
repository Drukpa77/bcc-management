import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam } from "@/lib/tournament";

export const metadata: Metadata = { title: "Players" };

const players = [
  { n: 7, name: "Sonam Wangchuk", team: "thw", pos: "PG", age: 27, ht: 178 },
  { n: 12, name: "Tshering Wangchuk", team: "hat", pos: "C", age: 30, ht: 192 },
  { n: 3, name: "Dema Wangchuk", team: "tqn", pos: "SG", age: 23, ht: 169 },
];

export default function AdminPlayersPage() {
  return (
    <AdminShell title="Players" active="/admin/players">
      <div className="mb-2 flex flex-wrap gap-1.5">
        <Chip active>All (184)</Chip>
        <Chip>Men</Chip>
        <Chip>Women</Chip>
      </div>
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <div className="min-w-0 flex-1 overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-ink text-[11px] text-[#AEB6C2] uppercase">
              <tr><th className="px-2 py-1">#</th><th>Player</th><th>Team</th><th>Pos</th><th>Age</th><th>Ht</th><th>Status</th></tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.name} className="border-t border-[#EEECE6]">
                  <td className="px-2 py-1 font-mono">{p.n}</td>
                  <td><b>{p.name}</b></td>
                  <td><span className="flex items-center gap-1"><TeamTile team={getTeam(p.team)} size="sm" />{getTeam(p.team).shortName}</span></td>
                  <td>{p.pos}</td>
                  <td className="font-mono">{p.age}</td>
                  <td className="font-mono">{p.ht}</td>
                  <td><Badge tone="registration">ACTIVE</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form className="w-full rounded-lg border border-line bg-white lg:w-[230px]">
          <div className="bg-ink px-3 py-2 font-display text-[11px] tracking-[0.12em] text-white uppercase">Edit player</div>
          <div className="space-y-2 p-2.5 text-[12px]">
            <p><b>Sonam Wangchuk</b><br /><span className="text-muted">Thimphu Warriors</span></p>
            <label>Jersey #<input className="mt-0.5 h-8 w-full rounded border border-[#C9CDD6] px-2" defaultValue="7" /></label>
            <button type="button" className="w-full rounded-[5px] bg-saffron py-1.5 font-semibold text-white">Save changes</button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
