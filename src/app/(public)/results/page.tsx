import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { TeamTile } from "@/components/ui/team-tile";
import { allResults, getTeam } from "@/lib/tournament";

export const metadata: Metadata = { title: "Results" };

export default function ResultsPage() {
  const groups = [
    { label: "Thursday, 11 September", items: allResults().filter((r) => r.dateLabel.includes("11")) },
    { label: "Wednesday, 10 September", items: allResults().filter((r) => r.dateLabel.includes("10")) },
  ];

  return (
    <>
      <PageHeader kicker="Final scores" title="Results" />
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line bg-white px-4 py-2.5 md:px-5">
        <span className="rounded-[5px] border border-[#C9CDD6] px-2 py-0.5 text-[12px] font-semibold">National Championship 2026 ▾</span>
        <Chip active>All</Chip>
        <Chip>Men</Chip>
        <Chip>Women</Chip>
        <Chip>Pool A</Chip>
        <Chip>Pool B</Chip>
      </div>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-4 py-4 md:px-5">
        {groups.map((group) => (
          <section key={group.label}>
            <h2 className="font-display text-[15px] font-bold tracking-[0.05em] uppercase">{group.label}</h2>
            <div className="mt-2 overflow-hidden rounded-lg border border-line bg-card">
              {group.items.map((r, i) => {
                const home = getTeam(r.homeId);
                const away = getTeam(r.awayId);
                const homeWins = (r.homeScore ?? 0) >= (r.awayScore ?? 0);
                return (
                  <div
                    key={r.id}
                    className={`flex flex-col gap-2 px-3 py-2.5 md:flex-row md:items-center md:gap-3 ${i ? "border-t border-[#EEECE6]" : ""}`}
                  >
                    <Badge status="final">{r.period === "OT" ? "FINAL · OT" : "FINAL"}</Badge>
                    <span className={`flex flex-1 items-center justify-end gap-2 ${homeWins ? "" : "text-muted"}`}>
                      {homeWins ? <b>{home.name}</b> : home.name}
                      <TeamTile team={home} />
                    </span>
                    <span className="font-mono text-[15px] font-bold">
                      <span className={homeWins ? "text-saffron" : "text-muted"}>{r.homeScore}</span>
                      <span className="text-muted"> — </span>
                      <span className={!homeWins ? "text-saffron" : "text-muted"}>{r.awayScore}</span>
                    </span>
                    <span className={`flex flex-1 items-center gap-2 ${homeWins ? "text-muted" : ""}`}>
                      <TeamTile team={away} />
                      {!homeWins ? <b>{away.name}</b> : away.name}
                    </span>
                    <Chip>{r.group}</Chip>
                    <Link href={`/matches/${r.id}`} className="rounded-[5px] border border-[#C9CDD6] px-2 py-0.5 text-[12px] font-semibold">
                      Match details
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
