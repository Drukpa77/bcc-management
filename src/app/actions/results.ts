"use server";

import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PUBLIC_LEAGUE_COOKIE } from "@/lib/public-league";
import { revalidateTournament } from "@/lib/revalidate-tournament";

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

export async function saveResultAction(
  fixtureId: string,
  payload: ResultPayload,
  mode: "draft" | "publish",
): Promise<SaveResultResponse> {
  const session = await requireAdmin();
  const fixture = await prisma.fixture.findUnique({ where: { id: fixtureId } });
  if (!fixture) {
    return { ok: false, published: false, standingsUpdated: false, bracketUpdated: false, message: "Match not found." };
  }
  if (payload.homeScore === payload.awayScore) {
    return { ok: false, published: false, standingsUpdated: false, bracketUpdated: false, message: "Scores cannot be tied. Record overtime if needed." };
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

  revalidateTournament();
  return {
    ok: true,
    published: mode === "publish",
    standingsUpdated: mode === "publish",
    bracketUpdated: false,
    message: mode === "publish" ? "Result published. Standings recalculated." : "Draft saved. Standings will update when you publish.",
  };
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
