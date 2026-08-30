import type { ReactNode } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { fixtureMeta, stageLabel } from "@/lib/tournament-engine";
import type { Fixture, Team } from "@/lib/types";

export function ResultCard({
  fixture,
  home,
  away,
  href,
  actions,
}: {
  fixture: Fixture;
  home?: Team;
  away?: Team;
  href?: string;
  actions?: ReactNode;
}) {
  const meta = fixtureMeta(fixture);
  const official = fixture.status === "final" && fixture.published !== false;
  const homeWins = official && (fixture.homeScore ?? 0) > (fixture.awayScore ?? 0);
  const body = (
    <article className="rounded-3xl bg-white p-4 ring-1 ring-[#E8E4DA]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase">
          {stageLabel(meta.stage, meta.pool)}
          {meta.round ? ` · R${meta.round}` : ""}
        </span>
        <span className="flex items-center gap-1.5">
          {official ? <Badge status="final">{fixture.overtime ? "FINAL · OT" : "FINAL"}</Badge> : null}
          {fixture.status === "upcoming" && fixture.homeScore != null ? (
            <span className="rounded-full bg-[#F4EEE4] px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-[#9A4F1C] uppercase">
              Draft
            </span>
          ) : null}
          {official ? (
            <span className="rounded-full bg-[#EDFDF2] px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-[#276438] uppercase">
              Published
            </span>
          ) : null}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className={`flex items-center justify-end gap-2 text-right ${homeWins ? "" : official ? "text-muted" : ""}`}>
          <div className="min-w-0">
            <p className={`truncate font-display text-[16px] font-extrabold uppercase ${homeWins ? "text-ink-2" : ""}`}>
              {home?.name ?? fixture.homePlaceholder ?? "TBD"}
            </p>
          </div>
          {home ? <TeamTile team={home} size="lg" /> : <span className="size-11 rounded-full bg-paper" />}
        </div>
        <p className="font-mono text-[28px] font-extrabold leading-none">
          <span className={homeWins ? "text-saffron" : ""}>{fixture.homeScore ?? "–"}</span>
          <span className="mx-1 text-[16px] text-muted">–</span>
          <span className={!homeWins && official ? "text-saffron" : ""}>{fixture.awayScore ?? "–"}</span>
        </p>
        <div className={`flex items-center gap-2 ${!homeWins && official ? "" : official ? "text-muted" : ""}`}>
          {away ? <TeamTile team={away} size="lg" /> : <span className="size-11 rounded-full bg-paper" />}
          <p className="truncate font-display text-[16px] font-extrabold uppercase">
            {away?.name ?? fixture.awayPlaceholder ?? "TBD"}
          </p>
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] text-muted">
        {[fixture.dateLabel, fixture.time, fixture.venue].filter(Boolean).join(" · ")}
      </p>
      {actions ? <div className="mt-3 flex flex-wrap justify-end gap-2">{actions}</div> : null}
    </article>
  );

  if (href && !actions) {
    return <Link href={href}>{body}</Link>;
  }
  return body;
}
