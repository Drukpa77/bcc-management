import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Competitions" };

const rows = [
  ["National Championship", "2026", "Men", "Pool + Playoffs", "10", "live"],
  ["Women's Championship", "2026", "Women", "RR + Final", "6", "live"],
  ["Youth U-18", "2026", "Mixed", "Knockout", "6/12", "registration"],
  ["Regional Championship", "2025", "Men", "Knockout", "8", "done"],
] as const;

export default function AdminCompetitionsPage() {
  return (
    <AdminShell
      title="Competitions"
      active="/admin/competitions"
      actions={<span className="rounded-[5px] bg-saffron px-2 py-1 text-[12px] font-semibold text-white">＋ Create Competition</span>}
    >
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <div className="min-w-0 flex-1 overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-ink text-[11px] tracking-[0.1em] text-[#AEB6C2] uppercase">
              <tr>
                <th className="px-2 py-1.5">Competition</th>
                <th className="px-2 py-1.5">Cat</th>
                <th className="px-2 py-1.5">Format</th>
                <th className="px-2 py-1.5 text-right">Teams</th>
                <th className="px-2 py-1.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t border-[#EEECE6]">
                  <td className="px-2 py-1.5"><b>{r[0]}</b> <span className="text-muted">{r[1]}</span></td>
                  <td className="px-2 py-1.5">{r[2]}</td>
                  <td className="px-2 py-1.5">{r[3]}</td>
                  <td className="px-2 py-1.5 text-right font-mono">{r[4]}</td>
                  <td className="px-2 py-1.5"><Badge tone={r[5]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form className="w-full overflow-hidden rounded-lg border border-line bg-white lg:w-[230px]">
          <div className="bg-ink px-3 py-2 font-display text-[11px] tracking-[0.12em] text-white uppercase">Create competition</div>
          <div className="flex flex-col gap-2 p-2.5 text-[12px]">
            <label>Name<input className="mt-0.5 h-8 w-full rounded border border-[#C9CDD6] px-2" defaultValue="Interstate Championship" /></label>
            <label>Location<input className="mt-0.5 h-8 w-full rounded border border-[#C9CDD6] px-2" defaultValue="Changlimithang, Thimphu" /></label>
            <button type="button" className="rounded-[5px] bg-saffron py-1.5 font-semibold text-white">Create competition</button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
