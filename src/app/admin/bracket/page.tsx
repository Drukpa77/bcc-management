import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { Chip } from "@/components/ui/chip";
import { BracketMatchCard } from "@/components/ui/bracket-match-card";
import { menBracket, teamById } from "@/lib/tournament";

export const metadata: Metadata = { title: "Bracket" };

export default function AdminBracketPage() {
  return (
    <AdminShell title="Bracket — Men's Playoffs" active="/admin/bracket" actions={<Chip>Auto-progression ON</Chip>}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-3">
          <p className="font-display text-[11px] font-bold tracking-[0.16em] text-[#8A909C]">QUARTER FINALS</p>
          {menBracket.filter((m) => m.id.startsWith("qf")).map((m) => (
            <BracketMatchCard key={m.id} match={m} teams={teamById} className="w-[170px]" />
          ))}
        </div>
        <div className="conn hidden lg:block" />
        <div className="flex flex-col gap-3">
          <p className="font-display text-[11px] font-bold tracking-[0.16em] text-[#8A909C]">SEMI FINALS</p>
          {menBracket.filter((m) => m.id.startsWith("sf")).map((m) => (
            <BracketMatchCard key={m.id} match={m} teams={teamById} className="w-[170px]" />
          ))}
        </div>
        <div className="conn2 hidden lg:block" />
        <div>
          <p className="font-display text-[11px] font-bold tracking-[0.16em] text-[#8A909C]">FINAL</p>
          <BracketMatchCard match={menBracket.find((m) => m.id === "final")!} teams={teamById} className="mt-3 w-[170px]" />
          <p className="mt-2 w-[170px] rounded border border-[#BBE4C8] bg-[#EDFDF2] p-2 text-[11px] text-[#276438]">
            ✓ Winners advance automatically when a result is entered.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
