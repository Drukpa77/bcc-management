import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam } from "@/lib/tournament";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Dashboard"
      active="/admin"
      actions={<Chip>National Championship 2026 ▾</Chip>}
    >
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {([
          ["Total Teams", "16", false],
          ["Total Players", "184", false],
          ["Upcoming", "6", false],
          ["Live now", "1", true],
          ["Completed", "23", false],
        ] as const).map(([l, v, live]) => (
          <div key={l} className={`rounded-lg border bg-white p-2.5 ${live ? "border-live" : "border-line"}`}>
            <p className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${live ? "text-live" : "text-[#8A909C]"}`}>
              {live ? "● Live now" : l}
            </p>
            <p className={`font-display text-[22px] font-extrabold ${live ? "text-live" : ""}`}>{v}</p>
          </div>
        ))}
        <div className="rounded-lg border border-line bg-white p-2.5">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8A909C] uppercase">Tournament</p>
          <p className="font-display text-[15px] font-extrabold">Pool round</p>
          <span className="mt-1 block h-1.5 overflow-hidden rounded bg-[#E4E7EC]"><i className="block h-full w-[79%] bg-saffron" /></span>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <Link href="/admin/teams/register" className="rounded-[5px] bg-saffron px-3 py-1.5 text-[13px] font-semibold text-white">＋ Register Team</Link>
        <Link href="/admin/players" className="rounded-[5px] bg-ink-2 px-3 py-1.5 text-[13px] font-semibold text-white">＋ Add Player</Link>
        <Link href="/admin/fixtures/generate" className="rounded-[5px] border border-[#C9CDD6] bg-white px-3 py-1.5 text-[13px] font-semibold">＋ Create Fixture</Link>
        <Link href="/admin/draw/setup" className="rounded-[5px] border border-[#C9CDD6] bg-white px-3 py-1.5 text-[13px] font-semibold">🎡 Start Pool Draw</Link>
        <Link href="/admin/results" className="rounded-[5px] border border-[#C9CDD6] bg-white px-3 py-1.5 text-[13px] font-semibold">✎ Enter Result</Link>
        <Link href="/admin/live" className="rounded-[5px] bg-live px-3 py-1.5 text-[13px] font-semibold text-white">● Go Live</Link>
      </div>
      <div className="mt-2.5 flex flex-col gap-2 md:flex-row">
        <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-line bg-white">
          <div className="flex items-center justify-between bg-[#F1EFE9] px-3 py-1.5">
            <b className="text-[11px]">TODAY&apos;S FIXTURES</b>
            <Link href="/admin/fixtures" className="text-[12px] text-saffron">Manage →</Link>
          </div>
          <div className="flex items-center justify-between border-b border-[#EEECE6] px-3 py-2 text-[13px]">
            <span className="flex items-center gap-2"><Badge status="live" />THW v PDR · Q4 03:42</span>
            <Link href="/admin/live" className="rounded-[5px] bg-live px-2 py-0.5 text-[12px] font-semibold text-white">Score panel</Link>
          </div>
          <div className="flex items-center justify-between border-b border-[#EEECE6] px-3 py-2 text-[13px]">
            <span><span className="mr-2 font-mono">12:30</span>PNB v HAT · Pool B</span>
            <span className="rounded-[5px] border border-[#C9CDD6] px-2 py-0.5 text-[12px]">Start match</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 text-[13px]">
            <span><span className="mr-2 font-mono">15:00</span>TQN v PPX · Women</span>
            <span className="rounded-[5px] border border-[#C9CDD6] px-2 py-0.5 text-[12px]">Start match</span>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg border border-line bg-white md:w-[220px]">
          <div className="bg-[#F1EFE9] px-3 py-1.5"><b className="text-[11px]">LEADERS</b></div>
          {[
            ["Pool A", "thw", "Warriors 4-1"],
            ["Pool B", "pdr", "Dragons 4-1"],
            ["Women", "tqn", "Queens 4-0"],
          ].map(([l, id, n]) => (
            <div key={l} className="flex items-center justify-between border-t border-[#EEECE6] px-3 py-1.5 text-[12px]">
              <span className="text-muted">{l}</span>
              <span className="flex items-center gap-1"><TeamTile team={getTeam(id)} size="sm" /><b>{n}</b></span>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
