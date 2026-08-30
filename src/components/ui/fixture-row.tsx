import type { Fixture, Team } from "@/lib/types";
import { TeamTile } from "@/components/ui/team-tile";

type FixtureRowProps = {
  fixture: Fixture;
  home: Team;
  away: Team;
};

export function FixtureRow({ fixture, home, away }: FixtureRowProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {fixture.time ? (
        <span className="w-11 shrink-0 font-mono text-[11px] font-bold text-ink-2">
          {fixture.time}
        </span>
      ) : null}
      <div className="flex min-w-0 grow items-center gap-2 text-[13px]">
        <span className="truncate md:hidden">
          {home.code} <span className="text-muted">vs</span> {away.code}
        </span>
        <span className="hidden min-w-0 items-center gap-2 truncate md:flex">
          <TeamTile team={home} />
          {home.name}
          <span className="text-muted">vs</span>
          <TeamTile team={away} />
          {away.name}
        </span>
      </div>
      <span className="shrink-0 rounded-full border border-[#C9CDD6] bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#4A5262]">
        <span className="md:hidden">{fixture.group.replace("Men · ", "")}</span>
        <span className="hidden md:inline">{fixture.group}</span>
      </span>
    </div>
  );
}
