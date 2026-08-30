"use server";

import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getDraw, getLeague } from "@/lib/app-store";
import { PUBLIC_LEAGUE_COOKIE } from "@/lib/public-league";
import { revalidateTournament } from "@/lib/revalidate-tournament";
import { loadTournamentStateFresh } from "@/lib/tournament-state";
import {
  currentSeedsFromBracket,
  knockoutHasStarted,
  plannedKnockout,
  poolsReadyForKnockout,
  progressedKnockout,
  seedsChanged,
  seedsFromStandings,
  calculateStandings,
} from "@/lib/tournament-engine";
import type { Fixture } from "@/lib/types";

export type ResultPayload = {
  homeScore: number;
  awayScore: number;
  notes?: string;
  mvp?: string;
  overtime?: boolean;
  homeQ1?: number;
  homeQ2?: number;
  homeQ3?: number;
  homeQ4?: number;
  awayQ1?: number;
  awayQ2?: number;
  awayQ3?: number;
  awayQ4?: number;
};

export type SaveResultResponse = {
  ok: boolean;
  published: boolean;
  standingsUpdated: boolean;
  bracketUpdated: boolean;
  qualificationConflict?: boolean;
  message: string;
};

async function persistKnockout(leagueId: string, fixtures: Fixture[]) {
  for (const fixture of fixtures) {
    await prisma.fixture.upsert({
      where: { id: fixture.id },
      update: {
        homeId: fixture.homeId,
        awayId: fixture.awayId,
        homePlaceholder: fixture.homePlaceholder,
        awayPlaceholder: fixture.awayPlaceholder,
        groupName: fixture.group,
        stage: fixture.stage ?? "POOL",
        time: fixture.time,
        dateLabel: fixture.dateLabel,
        venue: fixture.venue,
      },
      create: {
        id: fixture.id,
        leagueId,
        homeId: fixture.homeId,
        awayId: fixture.awayId,
        time: fixture.time,
        dateLabel: fixture.dateLabel,
        venue: fixture.venue,
        groupName: fixture.group,
        status: fixture.status,
        stage: fixture.stage ?? "POOL",
        homePlaceholder: fixture.homePlaceholder,
        awayPlaceholder: fixture.awayPlaceholder,
        published: false,
      },
    });
  }
}

async function syncBracket(leagueId: string, force = false) {
  const state = await loadTournamentStateFresh();
  const league = getLeague(state, leagueId);
  if (!league || league.format !== "pools") {
    return { updated: false, conflict: false };
  }

  const draw = getDraw(state, leagueId);
  const fixtures = state.fixtures[leagueId] ?? [];
  const adjustments = state.adjustments[leagueId] ?? [];
  if (!poolsReadyForKnockout(draw, fixtures)) {
    return { updated: false, conflict: false };
  }

  const seeds = seedsFromStandings(
    calculateStandings(draw.poolA, fixtures, adjustments, "pools"),
    calculateStandings(draw.poolB, fixtures, adjustments, "pools"),
  );

  const existing = fixtures.filter((fixture) => fixture.stage && fixture.stage !== "POOL");
  if (existing.length === 0) {
    await persistKnockout(leagueId, plannedKnockout(league, seeds));
    const afterCreate = await loadTournamentStateFresh();
    await persistKnockout(leagueId, progressedKnockout(afterCreate.fixtures[leagueId] ?? []));
    return { updated: true, conflict: false };
  }

  const current = currentSeedsFromBracket(existing);
  const conflict = seedsChanged(current, seeds) && knockoutHasStarted(existing);
  if (conflict && !force) {
    return { updated: false, conflict: true };
  }

  if (!knockoutHasStarted(existing) || force) {
    const next = plannedKnockout(league, seeds).map((planned) => {
      const prev = existing.find((item) => item.id === planned.id);
      if (!prev || prev.status === "upcoming") {
        return planned;
      }
      return { ...prev, homeId: planned.homeId, awayId: planned.awayId || prev.awayId };
    });
    await persistKnockout(leagueId, next);
  }

  const latest = await loadTournamentStateFresh();
  await persistKnockout(leagueId, progressedKnockout(latest.fixtures[leagueId] ?? []));
  return { updated: true, conflict: false };
}

export async function saveResultAction(
  fixtureId: string,
  payload: ResultPayload,
  mode: "draft" | "publish",
  options?: { forceQualificationChange?: boolean },
): Promise<SaveResultResponse> {
  const session = await requireAdmin();
  const fixture = await prisma.fixture.findUnique({ where: { id: fixtureId } });
  if (!fixture) {
    return { ok: false, published: false, standingsUpdated: false, bracketUpdated: false, message: "Match not found." };
  }
  if (payload.homeScore === payload.awayScore) {
    return { ok: false, published: false, standingsUpdated: false, bracketUpdated: false, message: "Scores cannot be tied. Record overtime if needed." };
  }

  if (mode === "publish") {
    const preview = await loadTournamentStateFresh();
    const draw = getDraw(preview, fixture.leagueId);
    const fixtures = (preview.fixtures[fixture.leagueId] ?? []).map((item) =>
      item.id === fixtureId
        ? { ...item, homeScore: payload.homeScore, awayScore: payload.awayScore, status: "final" as const, published: true }
        : item,
    );
    preview.fixtures[fixture.leagueId] = fixtures;
    if (draw.status === "confirmed") {
      const probe = await syncBracketProbe(fixture.leagueId, fixtures, options?.forceQualificationChange);
      if (probe.conflict) {
        return {
          ok: false,
          published: false,
          standingsUpdated: false,
          bracketUpdated: false,
          qualificationConflict: true,
          message: "This result affects tournament qualification. Changing it may alter teams already seeded into the knockout bracket.",
        };
      }
    }
  }

  const winnerId =
    mode === "publish" ? (payload.homeScore > payload.awayScore ? fixture.homeId : fixture.awayId) : null;

  await prisma.resultAudit.create({
    data: {
      fixtureId,
      previousHome: fixture.homeScore,
      previousAway: fixture.awayScore,
      newHome: payload.homeScore,
      newAway: payload.awayScore,
      published: mode === "publish",
      createdById: session.userId,
    },
  });

  await prisma.fixture.update({
    where: { id: fixtureId },
    data: {
      homeScore: payload.homeScore,
      awayScore: payload.awayScore,
      notes: payload.notes?.trim() || null,
      mvp: payload.mvp?.trim() || null,
      overtime: Boolean(payload.overtime),
      period: payload.overtime ? "OT" : fixture.period,
      homeQ1: payload.homeQ1 ?? null,
      homeQ2: payload.homeQ2 ?? null,
      homeQ3: payload.homeQ3 ?? null,
      homeQ4: payload.homeQ4 ?? null,
      awayQ1: payload.awayQ1 ?? null,
      awayQ2: payload.awayQ2 ?? null,
      awayQ3: payload.awayQ3 ?? null,
      awayQ4: payload.awayQ4 ?? null,
      status: mode === "publish" ? "final" : "upcoming",
      published: mode === "publish",
      publishedAt: mode === "publish" ? new Date() : fixture.publishedAt,
      updatedById: session.userId,
      winnerId,
    },
  });

  let bracketUpdated = false;
  if (mode === "publish") {
    const synced = await syncBracket(fixture.leagueId, Boolean(options?.forceQualificationChange));
    bracketUpdated = synced.updated;
  }

  revalidateTournament();
  return {
    ok: true,
    published: mode === "publish",
    standingsUpdated: mode === "publish",
    bracketUpdated,
    message:
      mode === "publish"
        ? `Result published. Standings recalculated${bracketUpdated ? " · bracket updated" : ""}.`
        : "Draft saved. Standings will update when you publish.",
  };
}

async function syncBracketProbe(leagueId: string, fixtures: Fixture[], force?: boolean) {
  const state = await loadTournamentStateFresh();
  state.fixtures[leagueId] = fixtures;
  const league = getLeague(state, leagueId);
  const draw = getDraw(state, leagueId);
  if (!league || league.format !== "pools" || !poolsReadyForKnockout(draw, fixtures)) {
    return { conflict: false };
  }
  const existing = fixtures.filter((fixture) => fixture.stage && fixture.stage !== "POOL");
  if (existing.length === 0) {
    return { conflict: false };
  }
  const seeds = seedsFromStandings(
    calculateStandings(draw.poolA, fixtures, state.adjustments[leagueId] ?? [], "pools"),
    calculateStandings(draw.poolB, fixtures, state.adjustments[leagueId] ?? [], "pools"),
  );
  return { conflict: seedsChanged(currentSeedsFromBracket(existing), seeds) && knockoutHasStarted(existing) && !force };
}

export async function adjustStandingAction(leagueId: string, teamId: string, pointsDelta: number, reason: string) {
  const session = await requireAdmin();
  const trimmed = reason.trim();
  if (!trimmed || !pointsDelta) {
    return { ok: false, message: "A reason and a non-zero points change are required." };
  }
  await prisma.standingAdjustment.create({
    data: { leagueId, teamId, pointsDelta, reason: trimmed, createdById: session.userId },
  });
  const synced = await syncBracket(leagueId);
  if (synced.conflict) {
    await prisma.standingAdjustment.deleteMany({
      where: { leagueId, teamId, reason: trimmed, createdById: session.userId },
    });
    return {
      ok: false,
      qualificationConflict: true,
      message: "This adjustment would change knockout seeding after matches have started.",
    };
  }
  revalidateTournament();
  return { ok: true, message: "Standing adjustment applied. Table recalculated." };
}

export async function resetAdjustmentAction(id: string) {
  await requireAdmin();
  const row = await prisma.standingAdjustment.findUnique({ where: { id } });
  if (!row) {
    return { ok: false, message: "Adjustment not found." };
  }
  await prisma.standingAdjustment.delete({ where: { id } });
  await syncBracket(row.leagueId);
  revalidateTournament();
  return { ok: true, message: "Adjustment removed. Table restored to calculated values." };
}

export async function setPublicLeagueAction(leagueId: string) {
  const jar = await cookies();
  jar.set(PUBLIC_LEAGUE_COOKIE, leagueId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  revalidateTournament();
}
