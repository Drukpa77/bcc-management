"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  buildFixtures,
  getDraw,
  getLeague,
  makeId,
  pickSpin,
  type LeagueFormat,
  type LeagueGender,
  type LeagueStatus,
} from "@/lib/app-store";
import type { MatchStage, MatchStatus } from "@/lib/types";
import { normalizeImage } from "@/lib/media";
import { loadTournamentStateFresh } from "@/lib/tournament-state";
import { revalidateTournament } from "@/lib/revalidate-tournament";

export async function loadTournamentAction() {
  return loadTournamentStateFresh();
}

async function setActive(leagueId: string) {
  await prisma.setting.upsert({
    where: { id: "default" },
    update: { activeLeagueId: leagueId },
    create: { id: "default", activeLeagueId: leagueId },
  });
}

export async function setActiveLeagueAction(leagueId: string) {
  await requireAdmin();
  await setActive(leagueId);
  revalidateTournament();
  return loadTournamentStateFresh();
}

export async function createLeagueAction(input: {
  id?: string;
  name: string;
  season: string;
  location: string;
  gender: LeagueGender;
  format: LeagueFormat;
}) {
  await requireAdmin();
  const id = input.id ?? makeId(input.name);
  await prisma.league.create({
    data: {
      id,
      name: input.name,
      season: input.season,
      location: input.location,
      gender: input.gender,
      format: input.format,
      status: "registration",
    },
  });
  await setActive(id);
  revalidateTournament();
  return { id };
}

export async function addTeamToLeagueAction(leagueId: string, teamId: string) {
  await requireAdmin();
  await prisma.leagueTeam.create({ data: { leagueId, teamId } });
  revalidateTournament();
}

export async function removeTeamFromLeagueAction(leagueId: string, teamId: string) {
  await requireAdmin();
  await prisma.leagueTeam.delete({
    where: { leagueId_teamId: { leagueId, teamId } },
  });
  revalidateTournament();
}

export async function createTeamAction(
  input: {
    name: string;
    code: string;
    shortName: string;
    color: string;
    city?: string;
    gender?: "men" | "women";
    logo?: string | null;
  },
  leagueId?: string,
) {
  await requireAdmin();
  const id = makeId(input.code || input.name);
  await prisma.team.create({
    data: {
      id,
      name: input.name,
      code: input.code,
      shortName: input.shortName,
      color: input.color,
      city: input.city,
      gender: input.gender,
      logo: normalizeImage(input.logo),
    },
  });
  if (leagueId) {
    await prisma.leagueTeam.create({ data: { leagueId, teamId: id } });
  }
  revalidateTournament();
  return { id };
}

export async function updateTeamAction(
  teamId: string,
  input: {
    name: string;
    code: string;
    shortName: string;
    color: string;
    city?: string;
    gender?: "men" | "women";
    logo?: string | null;
  },
) {
  await requireAdmin();
  await prisma.team.update({
    where: { id: teamId },
    data: {
      name: input.name,
      code: input.code,
      shortName: input.shortName,
      color: input.color,
      city: input.city,
      gender: input.gender,
      logo: normalizeImage(input.logo),
    },
  });
  revalidateTournament();
}

export async function deleteTeamAction(teamId: string) {
  await requireAdmin();
  await prisma.drawAssignment.deleteMany({ where: { teamId } });
  await prisma.fixture.deleteMany({
    where: { OR: [{ homeId: teamId }, { awayId: teamId }] },
  });
  await prisma.team.delete({ where: { id: teamId } });
  revalidateTournament();
}

export async function createPlayerAction(
  teamId: string,
  input: {
    name: string;
    number: number;
    position: string;
    age?: number;
    height?: string;
    image?: string | null;
    captain?: boolean;
  },
) {
  await requireAdmin();
  await prisma.player.create({
    data: {
      teamId,
      name: input.name,
      number: input.number,
      position: input.position,
      age: input.age ?? null,
      height: input.height,
      image: normalizeImage(input.image),
      captain: input.captain ?? false,
    },
  });
  revalidateTournament();
}

export async function updatePlayerAction(
  playerId: string,
  input: {
    name: string;
    number: number;
    position: string;
    age?: number;
    height?: string;
    image?: string | null;
    captain?: boolean;
  },
) {
  await requireAdmin();
  await prisma.player.update({
    where: { id: playerId },
    data: {
      name: input.name,
      number: input.number,
      position: input.position,
      age: input.age ?? null,
      height: input.height,
      image: normalizeImage(input.image),
      captain: input.captain ?? false,
    },
  });
  revalidateTournament();
}

export async function deletePlayerAction(playerId: string) {
  await requireAdmin();
  await prisma.player.delete({ where: { id: playerId } });
  revalidateTournament();
}

export async function startDrawAction(leagueId: string) {
  await requireAdmin();
  const state = await loadTournamentStateFresh();
  const league = getLeague(state, leagueId);
  if (!league || league.format !== "pools" || league.teamIds.length < 2) {
    return;
  }

  await prisma.draw.deleteMany({ where: { leagueId } });
  await prisma.draw.create({
    data: { leagueId, status: "drawing" },
  });
  await setActive(leagueId);
  revalidateTournament();
}

export async function spinDrawAction(leagueId: string) {
  await requireAdmin();
  const state = await loadTournamentStateFresh();
  const league = getLeague(state, leagueId);
  const draw = getDraw(state, leagueId);
  if (!league || draw.status !== "drawing" || draw.remaining.length === 0) {
    return { ok: false as const };
  }

  const pick = pickSpin(draw, league.teamIds.length);
  const record = await prisma.draw.findUnique({ where: { leagueId } });
  if (!record) {
    return { ok: false as const };
  }

  const remainingAfter = draw.remaining.length - 1;
  await prisma.drawAssignment.create({
    data: {
      drawId: record.id,
      teamId: pick.teamId,
      pool: pick.pool,
      spin: pick.spin,
    },
  });
  await prisma.draw.update({
    where: { id: record.id },
    data: { status: remainingAfter === 0 ? "complete" : "drawing" },
  });

  revalidateTournament();
  return { ok: true as const, pick };
}

export async function confirmDrawAction(leagueId: string) {
  await requireAdmin();
  await prisma.draw.update({
    where: { leagueId },
    data: { status: "confirmed", confirmedAt: new Date() },
  });
  revalidateTournament();
}

export async function discardDrawAction(leagueId: string) {
  await requireAdmin();
  await prisma.draw.deleteMany({ where: { leagueId } });
  revalidateTournament();
}

export async function generateFixturesAction(leagueId: string) {
  await requireAdmin();
  const state = await loadTournamentStateFresh();
  const fixtures = buildFixtures(state, leagueId);
  if (!fixtures) {
    return;
  }

  await prisma.fixture.deleteMany({ where: { leagueId, stage: "POOL" } });
  await prisma.fixture.createMany({
    data: fixtures.map((fixture) => ({
      id: fixture.id,
      leagueId,
      homeId: fixture.homeId,
      awayId: fixture.awayId,
      time: fixture.time,
      dateLabel: fixture.dateLabel,
      venue: fixture.venue,
      groupName: fixture.group,
      status: fixture.status,
      homeScore: fixture.homeScore,
      awayScore: fixture.awayScore,
      period: fixture.period,
      clock: fixture.clock,
      stage: fixture.stage ?? "POOL",
      pool: fixture.pool,
      round: fixture.round,
      published: false,
    })),
  });
  await prisma.draw.updateMany({
    where: { leagueId },
    data: { fixturesGeneratedAt: new Date() },
  });
  revalidateTournament();
}

export async function updateLeagueStatusAction(leagueId: string, status: LeagueStatus) {
  await requireAdmin();
  await prisma.league.update({ where: { id: leagueId }, data: { status } });
  await setActive(leagueId);
  revalidateTournament();
}

async function ensureManualDraw(leagueId: string) {
  const existing = await prisma.draw.findUnique({
    where: { leagueId },
    include: { assignments: true },
  });
  if (existing) {
    if (existing.status === "idle") {
      await prisma.draw.update({
        where: { id: existing.id },
        data: { status: "confirmed", confirmedAt: existing.confirmedAt ?? new Date() },
      });
    }
    return existing;
  }
  return prisma.draw.create({
    data: { leagueId, status: "confirmed", confirmedAt: new Date() },
    include: { assignments: true },
  });
}

export async function assignTeamPoolAction(leagueId: string, teamId: string, pool: "A" | "B" | null) {
  await requireAdmin();
  const membership = await prisma.leagueTeam.findUnique({
    where: { leagueId_teamId: { leagueId, teamId } },
  });
  if (!membership) {
    throw new Error("That club is not in this competition.");
  }

  const draw = await ensureManualDraw(leagueId);
  if (!pool) {
    await prisma.drawAssignment.deleteMany({ where: { drawId: draw.id, teamId } });
  } else {
    const existing = draw.assignments.find((row) => row.teamId === teamId);
    if (existing) {
      await prisma.drawAssignment.update({ where: { id: existing.id }, data: { pool } });
    } else {
      const spin = Math.max(0, ...draw.assignments.map((row) => row.spin)) + 1;
      await prisma.drawAssignment.create({
        data: { drawId: draw.id, teamId, pool, spin },
      });
    }
  }

  if (draw.status !== "drawing") {
    await prisma.draw.update({
      where: { id: draw.id },
      data: { status: "confirmed", confirmedAt: draw.confirmedAt ?? new Date() },
    });
  }

  revalidateTournament();
}

export type FixtureWriteInput = {
  homeId: string;
  awayId: string;
  dateLabel: string;
  time: string;
  venue: string;
  groupName: string;
  status: MatchStatus;
  stage: MatchStage;
  pool?: "A" | "B" | null;
  round?: number | null;
  homePlaceholder?: string | null;
  awayPlaceholder?: string | null;
};

function fixtureWriteData(input: FixtureWriteInput) {
  if (input.homeId && input.awayId && input.homeId === input.awayId) {
    throw new Error("A team cannot play itself.");
  }
  return {
    homeId: input.homeId,
    awayId: input.awayId,
    dateLabel: input.dateLabel.trim() || "TBC",
    time: input.time.trim() || "TBC",
    venue: input.venue.trim() || "TBC",
    groupName: input.groupName.trim() || "Match",
    status: input.status,
    stage: input.stage,
    pool: input.pool ?? null,
    round: input.round ?? null,
    homePlaceholder: input.homeId ? null : input.homePlaceholder?.trim() || "TBD",
    awayPlaceholder: input.awayId ? null : input.awayPlaceholder?.trim() || "TBD",
  };
}

export async function createFixtureAction(leagueId: string, input: FixtureWriteInput) {
  await requireAdmin();
  const id = makeId(`${leagueId}-match`);
  const data = fixtureWriteData(input);
  await prisma.fixture.create({
    data: { id, leagueId, published: false, ...data },
  });
  await setActive(leagueId);
  revalidateTournament();
  return { id };
}

export async function updateFixtureAction(fixtureId: string, input: FixtureWriteInput) {
  await requireAdmin();
  const fixture = await prisma.fixture.findUnique({ where: { id: fixtureId } });
  if (!fixture) {
    throw new Error("Match not found.");
  }
  const data = fixtureWriteData(input);
  await prisma.fixture.update({
    where: { id: fixtureId },
    data: {
      ...data,
      published: input.status === "final" ? fixture.published : false,
      publishedAt: input.status === "final" ? fixture.publishedAt : null,
    },
  });
  revalidateTournament();
}

export async function deleteFixtureAction(fixtureId: string) {
  await requireAdmin();
  await prisma.fixture.delete({ where: { id: fixtureId } });
  revalidateTournament();
}
