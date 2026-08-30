import type { Metadata } from "next";
import Link from "next/link";
import { CourtArcs } from "@/components/brand/court-arcs";
import { MountainSilhouette } from "@/components/brand/mountain-silhouette";
import { PubWrap, VsMark } from "@/components/public/public-primitives";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { findTeam, getLeague } from "@/lib/app-store";
import { fixtureMeta, isOfficialResult, stageLabel } from "@/lib/tournament-engine";
import { loadTournamentState } from "@/lib/tournament-state";

export const metadata: Metadata = { title: "Match Centre" };

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = await loadTournamentState();
  const fixture = Object.values(store.fixtures)
    .flat()
    .find((item) => item.id === id);

  if (!fixture) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="font-display text-[28px] font-extrabold uppercase">Match not found</p>
        <Link href="/fixtures" className="mt-3 inline-block text-[13px] font-semibold text-saffron">
          Back to fixtures
        </Link>
      </div>
    );
  }

  const league = fixture.leagueId ? getLeague(store, fixture.leagueId) : undefined;
  const home = findTeam(store, fixture.homeId);
  const away = findTeam(store, fixture.awayId);
  const meta = fixtureMeta(fixture);
  const official = isOfficialResult(fixture);
  const homeWins = official && (fixture.homeScore ?? 0) > (fixture.awayScore ?? 0);
  const awayWins = official && (fixture.awayScore ?? 0) > (fixture.homeScore ?? 0);

  return (
    <>
      <div className="pub-hero px-0 pt-8 pb-10 text-center sm:pt-10 sm:pb-12 md:pt-12 md:pb-14">
        <span className="pub-grain" />
        <CourtArcs />
        <MountainSilhouette />
        <div className="pub-wrap relative max-w-[880px]">
          <p className="px-1 font-display text-[11px] font-bold tracking-[0.18em] break-words text-gold uppercase sm:tracking-[0.22em]">
            {league?.name} · {stageLabel(meta.stage, meta.pool)}
            {meta.round ? ` · R${meta.round}` : ""}
          </p>
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:mt-8 sm:gap-4 md:gap-8">
            <Link href={home ? `/teams/${home.id}` : "/teams"} className="flex min-w-0 flex-col items-center gap-2 sm:gap-3">
              {home ? <TeamTile team={home} size="xl" /> : <span className="size-16 rounded-full bg-white/10" />}
              <b className="max-w-full truncate font-display text-[13px] font-extrabold uppercase sm:text-[16px] md:text-[20px]">
                {home?.shortName ?? home?.name ?? fixture.homePlaceholder ?? "TBD"}
              </b>
            </Link>
            <div className="flex flex-col items-center gap-2">
              {official ? (
                <p className="font-mono text-[clamp(1.75rem,8vw,3.5rem)] leading-none font-extrabold">
                  <span className={homeWins ? "text-gold" : "text-white"}>{fixture.homeScore ?? "–"}</span>
                  <span className="mx-0.5 text-[18px] text-[#6B7280] sm:mx-1 sm:text-[22px]">–</span>
                  <span className={awayWins ? "text-gold" : "text-white"}>{fixture.awayScore ?? "–"}</span>
                </p>
              ) : (
                <VsMark />
              )}
              {official ? <Badge status="final" /> : <Badge status="upcoming">VS</Badge>}
            </div>
            <Link href={away ? `/teams/${away.id}` : "/teams"} className="flex min-w-0 flex-col items-center gap-2 sm:gap-3">
              {away ? <TeamTile team={away} size="xl" /> : <span className="size-16 rounded-full bg-white/10" />}
              <b className="max-w-full truncate font-display text-[13px] font-extrabold uppercase sm:text-[16px] md:text-[20px]">
                {away?.shortName ?? away?.name ?? fixture.awayPlaceholder ?? "TBD"}
              </b>
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-[#A8AFBD]">
            {[fixture.dateLabel, fixture.time, fixture.venue].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
      <PubWrap className="flex flex-col gap-4 py-8 md:flex-row md:py-10">
        <div className="pub-card w-full p-5 md:w-[340px]">
          <b className="font-display text-[13px] tracking-[0.08em] uppercase">Match info</b>
          <div className="mt-4 space-y-3 text-[14px]">
            <div className="flex justify-between gap-4">
              <span className="text-muted">Competition</span>
              <b>{league?.name ?? "—"}</b>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted">Stage</span>
              <b>{stageLabel(meta.stage, meta.pool)}</b>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted">Venue</span>
              <b>{fixture.venue || "TBC"}</b>
            </div>
            {fixture.mvp ? (
              <div className="flex justify-between gap-4">
                <span className="text-muted">MVP</span>
                <b>{fixture.mvp}</b>
              </div>
            ) : null}
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-4">
          {fixture.notes ? (
            <div className="pub-card p-5">
              <b className="font-display text-[13px] tracking-[0.08em] uppercase">Notes</b>
              <p className="mt-3 text-[14px] leading-6 text-muted">{fixture.notes}</p>
            </div>
          ) : (
            <div className="pub-card p-5">
              <b className="font-display text-[13px] tracking-[0.08em] uppercase">Centre</b>
              <p className="mt-3 text-[14px] leading-6 text-muted">
                {official
                  ? "This result is published and feeds standings and the knockout bracket."
                  : "Tip-off details lock once officials confirm the scorebook."}
              </p>
            </div>
          )}
          <Link href={`/standings?league=${fixture.leagueId ?? ""}`} className="inline-flex text-[13px] font-semibold text-saffron">
            View standings
          </Link>
        </div>
      </PubWrap>
    </>
  );
}
