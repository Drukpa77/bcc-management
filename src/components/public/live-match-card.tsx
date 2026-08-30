import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import type { Fixture, Team } from "@/lib/types";

type LiveMatchCardProps = {
  fixture: Fixture;
  home: Team;
  away: Team;
  variant?: "hero" | "panel";
};

export function LiveMatchCard({
  fixture,
  home,
  away,
  variant = "hero",
}: LiveMatchCardProps) {
  const hero = variant === "hero";

  return (
    <article
      className={
        hero
          ? "w-full overflow-hidden rounded-lg border border-white/14 bg-white/[0.06] backdrop-blur-sm lg:w-[250px]"
          : "overflow-hidden rounded-lg border border-live bg-card shadow-[0_2px_8px_rgba(225,29,72,0.15)]"
      }
    >
      <div
        className={`flex items-center justify-between px-3 py-2 ${
          hero ? "border-b border-white/12" : "border-b border-[#F4E1E5]"
        }`}
      >
        <Badge status="live" />
        <span className={`text-[11px] ${hero ? "text-nav-muted" : "text-muted"}`}>
          {hero
            ? `${fixture.group} · ${fixture.period} · ${fixture.clock}`
            : `${fixture.period} · ${fixture.clock}`}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <TeamTile team={home} />
            <b>{home.name}</b>
          </span>
          <span
            className={`font-mono text-[22px] font-extrabold tracking-[-0.02em] ${
              hero ? "text-gold" : "text-saffron"
            }`}
          >
            {fixture.homeScore}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className={`flex items-center gap-2 ${hero ? "" : "text-ink-2"}`}>
            <TeamTile team={away} />
            {hero ? <b>{away.name}</b> : away.name}
          </span>
          <span
            className={`font-mono text-[22px] font-extrabold tracking-[-0.02em] ${
              hero ? "text-white" : "text-ink-2"
            }`}
          >
            {fixture.awayScore}
          </span>
        </div>
        <Link
          href={`/matches/${fixture.id}`}
          className="mt-1 inline-flex items-center justify-center rounded-[5px] bg-saffron px-3 py-1.5 text-[13px] font-semibold text-white shadow-[0_2px_6px_rgba(232,97,28,0.35)]"
        >
          {hero ? "Watch Match Centre →" : "Match Centre →"}
        </Link>
      </div>
    </article>
  );
}
