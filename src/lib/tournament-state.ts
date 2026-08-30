import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Fixture, MatchStage, Player, StandingAdjustment, Team } from "@/lib/types";
import {
  emptyDraw,
  type AppStore,
  type League,
  type LeagueDraw,
  type LeagueFormat,
  type LeagueGender,
  type LeagueStatus,
} from "@/lib/app-store";
import { prisma } from "@/lib/db";

function toTeam(row: {
  id: string;
  code: string;
  name: string;
  shortName: string;
  color: string;
  city: string | null;
  gender: string | null;
  logo: string | null;
}): Team {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    shortName: row.shortName,
    color: row.color,
    city: row.city ?? undefined,
    gender: row.gender === "women" || row.gender === "men" ? row.gender : undefined,
    logo: row.logo ?? undefined,
  };
}

function toFixture(row: {
  id: string;
  leagueId: string;
  time: string;
  dateLabel: string;
  venue: string;
  homeId: string;
  awayId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  period: string | null;
  clock: string | null;
  groupName: string;
  stage: string;
  pool: string | null;
  round: number | null;
  published: boolean;
  notes: string | null;
  mvp: string | null;
  overtime: boolean;
  winnerId: string | null;
  publishedAt: Date | null;
  updatedById: string | null;
  homePlaceholder: string | null;
  awayPlaceholder: string | null;
  homeQ1: number | null;
  homeQ2: number | null;
  homeQ3: number | null;
  homeQ4: number | null;
  awayQ1: number | null;
  awayQ2: number | null;
  awayQ3: number | null;
  awayQ4: number | null;
}): Fixture {
  return {
    id: row.id,
    leagueId: row.leagueId,
    time: row.time,
    dateLabel: row.dateLabel,
    venue: row.venue,
    homeId: row.homeId,
    awayId: row.awayId,
    homeScore: row.homeScore ?? undefined,
    awayScore: row.awayScore ?? undefined,
    status: row.status as Fixture["status"],
    period: row.period ?? undefined,
    clock: row.clock ?? undefined,
    group: row.groupName,
    stage: row.stage as MatchStage,
    pool: row.pool === "A" || row.pool === "B" ? row.pool : undefined,
    round: row.round ?? undefined,
    published: row.published,
    notes: row.notes ?? undefined,
    mvp: row.mvp ?? undefined,
    overtime: row.overtime,
    winnerId: row.winnerId ?? undefined,
    publishedAt: row.publishedAt?.toISOString(),
    updatedById: row.updatedById ?? undefined,
    homePlaceholder: row.homePlaceholder ?? undefined,
    awayPlaceholder: row.awayPlaceholder ?? undefined,
    homeQ1: row.homeQ1 ?? undefined,
    homeQ2: row.homeQ2 ?? undefined,
    homeQ3: row.homeQ3 ?? undefined,
    homeQ4: row.homeQ4 ?? undefined,
    awayQ1: row.awayQ1 ?? undefined,
    awayQ2: row.awayQ2 ?? undefined,
    awayQ3: row.awayQ3 ?? undefined,
    awayQ4: row.awayQ4 ?? undefined,
  };
}

async function queryTournamentState(): Promise<AppStore> {
  const [teamRows, playerRows, leagueRows, setting] = await Promise.all([
    prisma.team.findMany({ orderBy: { name: "asc" } }),
    prisma.player.findMany({ orderBy: [{ teamId: "asc" }, { number: "asc" }] }),
    prisma.league.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        teams: true,
        draw: { include: { assignments: { orderBy: { spin: "asc" } } } },
        fixtures: { orderBy: [{ dateLabel: "asc" }, { time: "asc" }] },
        adjustments: { orderBy: { createdAt: "asc" } },
      },
    }),
    prisma.setting.findUnique({ where: { id: "default" } }),
  ]);

  const teams = teamRows.map(toTeam);
  const draws: AppStore["draws"] = {};
  const fixtures: AppStore["fixtures"] = {};
  const adjustments: AppStore["adjustments"] = {};
  const leagues: League[] = leagueRows.map((league) => {
    const teamIds = league.teams.map((row) => row.teamId);
    if (league.draw) {
      const log = league.draw.assignments.map((row) => ({
        spin: row.spin,
        teamId: row.teamId,
        pool: row.pool as "A" | "B",
      }));
      const assigned = new Set(log.map((entry) => entry.teamId));
      const draw: LeagueDraw = {
        leagueId: league.id,
        status: league.draw.status as LeagueDraw["status"],
        remaining: teamIds.filter((id) => !assigned.has(id)),
        poolA: log.filter((entry) => entry.pool === "A").map((entry) => entry.teamId),
        poolB: log.filter((entry) => entry.pool === "B").map((entry) => entry.teamId),
        log,
        lastPick: log.at(-1),
        confirmedAt: league.draw.confirmedAt?.toISOString(),
        fixturesGeneratedAt: league.draw.fixturesGeneratedAt?.toISOString(),
      };
      draws[league.id] = draw;
    } else {
      draws[league.id] = emptyDraw(league.id);
    }

    fixtures[league.id] = league.fixtures.map(toFixture);
    adjustments[league.id] = league.adjustments.map(
      (row): StandingAdjustment => ({
        id: row.id,
        leagueId: row.leagueId,
        teamId: row.teamId,
        pointsDelta: row.pointsDelta,
        reason: row.reason,
        createdAt: row.createdAt.toISOString(),
        createdById: row.createdById ?? undefined,
      }),
    );

    return {
      id: league.id,
      name: league.name,
      season: league.season,
      location: league.location,
      gender: league.gender as LeagueGender,
      format: league.format as LeagueFormat,
      status: league.status as LeagueStatus,
      teamIds,
      createdAt: league.createdAt.toISOString(),
    };
  });

  const players: Player[] = playerRows.map((row) => ({
    id: row.id,
    teamId: row.teamId,
    name: row.name,
    number: row.number,
    position: row.position,
    age: row.age ?? undefined,
    height: row.height ?? undefined,
    image: row.image ?? undefined,
    captain: row.captain,
    status: row.status,
  }));

  return {
    teams,
    customTeams: [],
    players,
    leagues,
    draws,
    fixtures,
    adjustments,
    activeLeagueId: setting?.activeLeagueId || leagues[0]?.id || "",
  };
}

const loadTournamentStateCached = unstable_cache(queryTournamentState, ["tournament-state"], {
  tags: ["tournament"],
  revalidate: 20,
});

export function loadTournamentStateFresh() {
  return queryTournamentState();
}

export const loadTournamentState = cache(loadTournamentStateCached);
