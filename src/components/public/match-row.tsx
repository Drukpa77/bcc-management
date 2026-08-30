import Link from "next/link";
import { TeamTile } from "@/components/ui/team-tile";
import { VsMark } from "@/components/public/public-primitives";
import type { Fixture, Team } from "@/lib/types";

function TeamSide({
  team,
  placeholder,
  align,
  muted,
  score,
  emphasize,
}: {
  team?: Team;
  placeholder?: string;
  align: "left" | "right";
  muted?: boolean;
  score?: number | string;
  emphasize?: boolean;
}) {
  const name = team?.name ?? placeholder ?? "TBD";
  return (
    <span
      className={`flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5 ${align === "right" ? "justify-end text-right" : ""} ${
        muted ? "text-[#8A909C]" : ""
      }`}
    >
      {align === "left" && team ? <TeamTile team={team} size="lg" /> : null}
      {align === "left" && !team ? <span className="size-11 rounded-full bg-paper" /> : null}
      <span className="min-w-0">
        <b className="block truncate font-display text-[15px] font-extrabold tracking-[0.03em] uppercase md:text-[16px]">
          {name}
        </b>
        {score != null ? (
          <span className={`font-mono text-[18px] font-extrabold md:hidden ${emphasize ? "text-saffron" : ""}`}>
            {score}
          </span>
        ) : null}
      </span>
      {align === "right" && team ? <TeamTile team={team} size="lg" /> : null}
      {align === "right" && !team ? <span className="size-11 rounded-full bg-paper" /> : null}
    </span>
  );
}

function MobileSide({
  team,
  placeholder,
  score,
  emphasize,
  muted,
}: {
  team?: Team;
  placeholder?: string;
  score?: number | string;
  emphasize?: boolean;
  muted?: boolean;
}) {
  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${muted ? "text-[#8A909C]" : ""}`}>
      <TeamTile team={team} size="md" />
      <b className="min-w-0 truncate font-display text-[14px] font-extrabold tracking-[0.03em] uppercase">
        {team?.shortName ?? team?.name ?? placeholder ?? "TBD"}
      </b>
      {score != null ? (
        <span className={`ml-auto font-mono text-[18px] font-extrabold ${emphasize ? "text-saffron" : ""}`}>{score}</span>
      ) : null}
    </span>
  );
}

export function PublicMatchRow({
  fixture,
  home,
  away,
  official = false,
}: {
  fixture: Fixture;
  home?: Team;
  away?: Team;
  official?: boolean;
}) {
  const homeWins = official && (fixture.homeScore ?? 0) > (fixture.awayScore ?? 0);
  const awayWins = official && (fixture.awayScore ?? 0) > (fixture.homeScore ?? 0);

  return (
    <Link
      href={`/matches/${fixture.id}`}
      className="block px-3 py-3.5 transition-colors hover:bg-[#FBF8F2] sm:px-4 sm:py-4"
    >
      <div className="flex flex-col gap-2.5 sm:hidden">
        <span className="flex items-center justify-between gap-2 text-[11px] text-muted">
          <span className="font-mono font-bold text-ink-2">{fixture.time || "TBC"}</span>
          <span className="truncate">{fixture.group}</span>
        </span>
        <MobileSide
          team={home}
          placeholder={fixture.homePlaceholder}
          score={official ? fixture.homeScore : undefined}
          emphasize={homeWins}
          muted={official && !homeWins}
        />
        <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-[#8A909C] uppercase">
          <span className="h-px flex-1 bg-[#EEECE6]" />
          {official ? "Final" : "Versus"}
          <span className="h-px flex-1 bg-[#EEECE6]" />
        </span>
        <MobileSide
          team={away}
          placeholder={fixture.awayPlaceholder}
          score={official ? fixture.awayScore : undefined}
          emphasize={awayWins}
          muted={official && !awayWins}
        />
      </div>

      <span className="hidden items-center gap-4 sm:flex">
        <span className="w-[72px] shrink-0 md:w-[88px]">
          <span className="block font-mono text-[14px] font-bold">{fixture.time || "TBC"}</span>
          <span className="block truncate text-[11px] text-muted">{fixture.group}</span>
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-3">
          <TeamSide
            team={home}
            placeholder={fixture.homePlaceholder}
            align="right"
            muted={official && !homeWins}
            score={official ? fixture.homeScore : undefined}
            emphasize={homeWins}
          />
          {official ? (
            <span className="hidden items-baseline gap-1 font-mono text-[22px] font-extrabold leading-none md:flex">
              <span className={homeWins ? "text-saffron" : ""}>{fixture.homeScore ?? "–"}</span>
              <span className="text-[13px] text-muted">–</span>
              <span className={awayWins ? "text-saffron" : ""}>{fixture.awayScore ?? "–"}</span>
            </span>
          ) : (
            <VsMark />
          )}
          <TeamSide
            team={away}
            placeholder={fixture.awayPlaceholder}
            align="left"
            muted={official && !awayWins}
            score={official ? fixture.awayScore : undefined}
            emphasize={awayWins}
          />
        </span>
        <span className="hidden w-28 truncate text-right text-[12px] text-muted lg:block">{fixture.venue || "TBC"}</span>
      </span>
    </Link>
  );
}
