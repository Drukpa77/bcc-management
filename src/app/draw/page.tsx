import type { Metadata } from "next";
import { Flags } from "@/components/brand/flags";
import { TeamTile } from "@/components/ui/team-tile";
import { getTeam } from "@/lib/tournament";

export const metadata: Metadata = { title: "Official Pool Draw" };

const wheel = "conic-gradient(#E8611C 0 36deg,#7A1F2B 36deg 72deg,#2E5EAA 72deg 108deg,#C98A12 108deg 144deg,#3E7A5A 144deg 180deg,#5B4A9E 180deg 216deg,#444B57 216deg 252deg,#C1462F 252deg 288deg,#2C7DA0 288deg 324deg,#8A5A44 324deg)";

export default function DrawPresentationPage() {
  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-[radial-gradient(ellipse_at_50%_120%,#2a3550,#161B26_65%)] text-white">
      <Flags />
      <div className="arc -bottom-80 -left-48 size-[560px]" />
      <div className="arc -right-40 -top-56 size-[400px]" />
      <div className="relative pt-5 text-center">
        <p className="font-display text-[15px] tracking-[0.1em]">BHUTAN NATIONAL BASKETBALL CHAMPIONSHIP 2026</p>
        <p className="font-display text-[11px] font-bold tracking-[0.34em] text-gold uppercase">Official Pool Draw · Men&apos;s Division</p>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-8 px-8 lg:flex-row">
        <div className="wheel size-[220px] !shadow-[0_0_60px_rgba(240,180,41,.3),inset_0_0_0_8px_#F0B429]" style={{ background: wheel }}>
          <span className="ptr" />
          <span className="hub text-xs">SPIN 6</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-display text-[13px] tracking-[0.4em] text-gold uppercase">Selected!</p>
          <TeamTile team={getTeam("bmf")} size="xl" />
          <h1 className="font-display text-[30px] font-extrabold uppercase">Bumthang Falcons</h1>
          <div className="rounded-full bg-[linear-gradient(90deg,#F0B429,#E8611C)] px-6 py-1.5 font-display text-[15px] font-extrabold tracking-[0.16em] text-ink">
            POOL B
          </div>
        </div>
        <div className="flex w-[190px] flex-col gap-2.5">
          {[["POOL A", ["thw", "pnb", "wde"]], ["POOL B", ["pdr", "hat", "bmf"]]].map(([t, ids]) => (
            <div key={t as string} className="overflow-hidden rounded-[10px] border border-[rgba(240,180,41,.35)] bg-white/5">
              <div className="bg-[rgba(240,180,41,.15)] px-2.5 py-1.5 font-display text-[12px] tracking-[0.2em] text-gold">{t as string}</div>
              <div className="flex flex-col gap-1.5 p-2.5 text-[13px]">
                {(ids as string[]).map((id) => (
                  <span key={id} className={`flex items-center gap-1.5 ${id === "bmf" ? "rounded bg-[rgba(240,180,41,.2)] px-1" : ""}`}>
                    <TeamTile team={getTeam(id)} size="sm" />
                    {id === "bmf" ? <b>{getTeam(id).name}</b> : getTeam(id).name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="relative pb-5 text-center font-display tracking-[0.2em] text-gold">6 / 10 TEAMS ASSIGNED</p>
    </div>
  );
}
