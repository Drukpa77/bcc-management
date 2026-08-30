import type { Metadata } from "next";
import Link from "next/link";
import { Flags } from "@/components/brand/flags";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam } from "@/lib/tournament";

export const metadata: Metadata = { title: "Live Pool Draw" };

const wheel = "conic-gradient(#E8611C 0 36deg,#7A1F2B 36deg 72deg,#2E5EAA 72deg 108deg,#C98A12 108deg 144deg,#3E7A5A 144deg 180deg,#5B4A9E 180deg 216deg,#444B57 216deg 252deg,#C1462F 252deg 288deg,#2C7DA0 288deg 324deg,#8A5A44 324deg)";

export default function LiveDrawPage() {
  return (
    <div className="flex min-h-full flex-col bg-ink text-white">
      <Flags />
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <b className="font-display tracking-[0.08em]">LIVE POOL DRAW — MEN&apos;S DIVISION</b>
        <span className="text-[12px] text-[#7A828F]">Presentation: <b className="text-[#4ADE80]">● Connected</b></span>
        <Link href="/admin/draw/setup" className="rounded-[5px] border border-white/35 px-2 py-0.5 text-[12px]">Exit draw</Link>
      </div>
      <div className="flex flex-1 flex-col items-center gap-6 px-4 py-6 lg:flex-row lg:justify-center">
        <div className="flex flex-col items-center gap-2.5">
          <div className="wheel size-[190px]" style={{ background: wheel }}>
            <span className="ptr" />
            <span className="hub">SPIN 6</span>
          </div>
          <span className="rounded-[5px] bg-saffron px-5 py-2 font-semibold text-white">🎡 SPIN</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-display text-[11px] tracking-[0.3em] text-gold uppercase">Selected</p>
          <TeamTile team={getTeam("bmf")} size="xl" />
          <h1 className="font-display text-[22px] font-extrabold uppercase">Bumthang Falcons</h1>
          <div className="rounded-full bg-[linear-gradient(90deg,#F0B429,#E8611C)] px-4 py-1 font-display text-[12px] font-extrabold tracking-[0.14em] text-ink">
            → ASSIGNED TO POOL B
          </div>
        </div>
        <div className="flex w-[210px] flex-col gap-2">
          {[["POOL A · 3/5", ["thw", "pnb", "wde"]], ["POOL B · 3/5", ["pdr", "hat", "bmf"]]].map(([t, ids]) => (
            <div key={t as string} className="overflow-hidden rounded-lg border border-white/12 bg-white/5">
              <div className="bg-[rgba(240,180,41,.12)] px-2.5 py-1 font-display text-[11px] tracking-[0.15em] text-gold">{t as string}</div>
              <div className="flex flex-col gap-1 p-2 text-[12px]">
                {(ids as string[]).map((id) => (
                  <span key={id} className="flex items-center gap-1.5"><TeamTile team={getTeam(id)} size="sm" />{getTeam(id).name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
