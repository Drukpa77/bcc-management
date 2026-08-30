import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { TeamTile } from "@/components/ui/team-tile";
import { allUpcoming, getTeam } from "@/lib/tournament";

export const metadata: Metadata = { title: "Fixtures" };

export default function FixturesPage() {
  const days = [
    { label: "Saturday, 12 September", note: "Matchday 5 · Changlimithang Court", short: "Sat, 12 September", items: allUpcoming().filter((f) => f.dateLabel.includes("12")) },
    { label: "Sunday, 13 September", note: "Matchday 6", short: "Sun, 13 September", items: allUpcoming().filter((f) => f.dateLabel.includes("13")) },
  ];

  return (
    <>
      <PageHeader kicker="Schedule" title="Fixtures" />
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line bg-white px-4 py-2.5 md:px-5">
        <span className="rounded-[5px] border border-[#C9CDD6] px-2 py-0.5 text-[12px] font-semibold">National Championship 2026 ▾</span>
        <Chip active>All</Chip>
        <Chip>Men</Chip>
        <Chip>Women</Chip>
        <Chip>Pool A</Chip>
        <Chip>Pool B</Chip>
        <span className="hidden h-4 w-px bg-line sm:block" />
        <Chip active>Upcoming</Chip>
        <Chip live>● Live</Chip>
        <Chip>Completed</Chip>
      </div>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-4 py-4 md:px-5">
        {days.map((day) => (
          <section key={day.label}>
            <h2 className="font-display text-[15px] font-bold tracking-[0.05em] uppercase">
              <span className="md:hidden">{day.short}</span>
              <span className="hidden md:inline">{day.label}</span>
              <span className="ml-2 text-[12px] font-semibold tracking-normal text-muted normal-case">
                · {day.note}
              </span>
            </h2>
            <div className="mt-2 overflow-hidden rounded-lg border border-line bg-card">
              {day.items.map((f, i) => {
                const home = getTeam(f.homeId);
                const away = getTeam(f.awayId);
                return (
                  <div
                    key={f.id}
                    className={`flex flex-col gap-2 px-3 py-2.5 md:flex-row md:items-center md:gap-3 ${
                      i ? "border-t border-[#EEECE6]" : ""
                    }`}
                  >
                    <span className="w-12 font-mono text-[13px] font-bold">{f.time}</span>
                    <span className="hidden flex-1 items-center justify-end gap-2 md:flex">
                      <b>{home.name}</b>
                      <TeamTile team={home} />
                    </span>
                    <Badge status="upcoming">VS</Badge>
                    <span className="hidden flex-1 items-center gap-2 md:flex">
                      <TeamTile team={away} />
                      <b>{away.name}</b>
                    </span>
                    <div className="md:hidden">
                      <div className="flex items-center gap-2"><TeamTile team={home} size="sm" /><b>{home.name}</b></div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="flex items-center gap-2"><TeamTile team={away} size="sm" /><b>{away.name}</b></span>
                        <span className="text-[11px] text-muted">{f.venue}</span>
                      </div>
                    </div>
                    <Chip>{f.group}</Chip>
                    <span className="hidden text-[12px] text-muted md:inline">{f.venue}</span>
                    <Link href={`/matches/${f.id}`} className="hidden rounded-[5px] border border-[#C9CDD6] px-2 py-0.5 text-[12px] font-semibold md:inline">
                      Preview
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
