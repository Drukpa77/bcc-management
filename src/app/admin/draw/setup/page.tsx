import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { Chip } from "@/components/ui/chip";
import { TeamTile } from "@/components/ui/team-tile";
import { teams } from "@/lib/tournament";

export const metadata: Metadata = { title: "Pool Draw Setup" };

export default function DrawSetupPage() {
  const men = teams.filter((t) => t.gender === "men");
  return (
    <AdminShell title="Live Pool Draw — Setup" active="/admin/draw/setup">
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <div className="w-full rounded-lg border border-line bg-white lg:w-[250px]">
          <div className="bg-[#F1EFE9] px-3 py-1.5 text-[11px] font-bold">DRAW SETTINGS</div>
          <div className="space-y-2 p-2.5 text-[12px]">
            <p className="rounded border border-line bg-paper p-2">🔒 Fully random — cryptographic RNG, logged.</p>
            <Link href="/admin/draw" className="flex justify-center rounded-[5px] bg-saffron py-2 font-semibold text-white">▶ START LIVE DRAW</Link>
            <Link href="/draw" className="flex justify-center rounded-[5px] border border-[#C9CDD6] py-1.5">Open presentation display ↗</Link>
          </div>
        </div>
        <div className="min-w-0 flex-1 rounded-lg border border-line bg-white">
          <div className="bg-[#F1EFE9] px-3 py-1.5 text-[11px] font-bold">ELIGIBLE TEAMS — 10 SELECTED</div>
          <div className="grid grid-cols-2 gap-1.5 p-2.5 text-[13px]">
            {men.map((t) => (
              <span key={t.id} className="flex items-center gap-1.5">
                <Chip active>✓</Chip>
                <TeamTile team={t} size="sm" />
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
