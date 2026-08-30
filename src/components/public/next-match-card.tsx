import Link from "next/link";
import { TeamTile } from "@/components/ui/team-tile";
import { VsMark } from "@/components/public/public-primitives";
import type { Fixture, Team } from "@/lib/types";

export function NextMatchCard({
  fixture,
  home,
  away,
}: {
  fixture: Fixture;
  home: Team;
  away: Team;
}) {
  return (
    <article className="w-full overflow-hidden rounded-2xl border border-white/12 bg-white/8 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-display text-[11px] font-bold tracking-[0.18em] text-gold uppercase">Next tip-off</span>
        <span className="text-[12px] text-nav-muted">{fixture.dateLabel}</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-5 text-white">
        <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
          <TeamTile team={home} size="lg" />
          <b className="font-display text-[13px] font-extrabold tracking-[0.04em] uppercase">{home.shortName}</b>
        </div>
        <VsMark />
        <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
          <TeamTile team={away} size="lg" />
          <b className="font-display text-[13px] font-extrabold tracking-[0.04em] uppercase">{away.shortName}</b>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
        <p className="text-[12px] text-nav-muted">
          {fixture.time} · {fixture.venue}
        </p>
        <Link
          href={`/matches/${fixture.id}`}
          className="rounded-full bg-saffron px-3 py-1 text-[12px] font-semibold text-white"
        >
          Preview
        </Link>
      </div>
    </article>
  );
}
