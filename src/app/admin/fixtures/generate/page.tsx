import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = { title: "Fixture Generator" };

export default function FixtureGeneratorPage() {
  return (
    <AdminShell title="Fixture Generator — Men's National Championship" active="/admin/fixtures">
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <div className="w-full rounded-lg border border-line bg-white lg:w-[220px]">
          <div className="bg-[#F1EFE9] px-3 py-1.5 text-[11px] font-bold">GENERATION PLAN</div>
          <div className="space-y-1 p-2.5 text-[12px]">
            <div className="flex justify-between"><span className="text-muted">Format</span><b>Pool + Playoffs</b></div>
            <div className="flex justify-between"><span className="text-muted">Pool A RR</span><b className="font-mono">10 games</b></div>
            <div className="flex justify-between"><span className="text-muted">Pool B RR</span><b className="font-mono">10 games</b></div>
            <div className="flex justify-between"><span className="text-muted">Quarter finals</span><b className="font-mono">2 reserved</b></div>
            <div className="flex justify-between"><span className="text-muted">Semi finals</span><b className="font-mono">2 reserved</b></div>
            <div className="flex justify-between"><span className="text-muted">Final</span><b className="font-mono">1 reserved</b></div>
            <button type="button" className="mt-2 w-full rounded-[5px] bg-saffron py-1.5 font-semibold text-white">⚡ GENERATE FIXTURES</button>
          </div>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-line bg-white">
          <div className="bg-[#F1EFE9] px-3 py-1.5 text-[11px] font-bold">PREVIEW — 25 FIXTURES · progression locked</div>
          <table className="w-full text-left text-[13px]">
            <thead className="bg-ink text-[11px] text-[#AEB6C2]"><tr><th className="px-2 py-1">RD</th><th>Date · Time</th><th>Match</th><th>Pool</th></tr></thead>
            <tbody>
              <tr className="border-t border-[#EEECE6]"><td className="px-2 py-1">R1</td><td>Sat 10 · 10:00</td><td><b>Warriors v Dragons</b></td><td>A</td></tr>
              <tr className="border-t border-[#EEECE6]"><td className="px-2 py-1">R1</td><td>Sat 10 · 12:30</td><td><b>Bulls v Titans</b></td><td>A</td></tr>
              <tr className="border-t border-[#EEECE6]"><td className="px-2 py-1">R1</td><td>Sat 10 · 15:00</td><td><b>Tigers v Stallions</b></td><td>B</td></tr>
              <tr><td colSpan={4} className="px-2 py-1 text-center text-muted">… 19 more pool games …</td></tr>
              <tr className="bg-qualify"><td className="px-2 py-1"><b>QF1</b></td><td>Sat 20 · 10:00</td><td><b>A #2 v B #3</b> <span className="text-muted">🔒 auto</span></td><td>—</td></tr>
              <tr className="bg-qualify"><td className="px-2 py-1"><b>SF1</b></td><td>Wed 23 · 17:00</td><td><b>A #1 v QF2 winner</b> <span className="text-muted">🔒</span></td><td>—</td></tr>
              <tr className="bg-qualify"><td className="px-2 py-1"><b>F</b></td><td>Sat 26 · 18:00</td><td><b>SF1 w v SF2 w</b> <span className="text-muted">🔒</span></td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
