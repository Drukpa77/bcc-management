import type { AppStore, League, LeagueDraw } from "@/lib/app-store";
import { findTeam, getDraw, getLeague, pairCount } from "@/lib/app-store";
import type {
  BracketMatch,
  Fixture,
  FormResult,
  MatchStage,
  Qualification,
  StandingAdjustment,
  StandingRow,
  Team,
} from "@/lib/types";

export const WIN_POINTS = 2;
export const LOSS_POINTS = 1;

export type SeedKey = "A1" | "A2" | "A3" | "B1" | "B2" | "B3";
export type PoolSeeds = Partial<Record<SeedKey, string>>;

export type LeagueView = {
  league: League;
  fixtures: Fixture[];
  poolA: string[];
  poolB: string[];
  poolAStandings: StandingRow[];
  poolBStandings: StandingRow[];
  table: StandingRow[];
  bracket: BracketMatch[];
  bracketReady: boolean;
  knockoutStarted: boolean;
  championId?: string;
  poolProgress: { a: { done: number; expected: number }; b: { done: number; expected: number } };
  remainingPoolMatches: number;
  adjustments: StandingAdjustment[];
};

export function fixtureMeta(fixture: Fixture): {
  stage: MatchStage;
  pool?: "A" | "B";
  round?: number;
} {
  if (fixture.stage) {
    return { stage: fixture.stage, pool: fixture.pool, round: fixture.round };
  }

  const group = fixture.group ?? "";
  if (/quarter/i.test(group) || /^QF/i.test(fixture.id)) {
    return { stage: "QUARTER_FINAL" };
  }
  if (/semi/i.test(group) || /^SF/i.test(fixture.id)) {
    return { stage: "SEMI_FINAL" };
  }
  if (/final/i.test(group) || /final/i.test(fixture.id)) {
    return { stage: "FINAL" };
  }

  const poolMatch = group.match(/Pool\s+([AB])/i);
  const roundMatch = group.match(/R(?:ound\s*)?(\d+)/i);
  return {
    stage: "POOL",
    pool: poolMatch ? (poolMatch[1].toUpperCase() as "A" | "B") : undefined,
    round: roundMatch ? Number(roundMatch[1]) : undefined,
  };
}

export function isOfficialResult(fixture: Fixture) {
  return fixture.status === "final" && fixture.published !== false && fixture.homeScore != null && fixture.awayScore != null;
}

export function matchWinner(fixture: Fixture): string | undefined {
  if (!isOfficialResult(fixture) || fixture.homeScore === fixture.awayScore) {
    return fixture.winnerId;
  }
  return fixture.homeScore! > fixture.awayScore! ? fixture.homeId : fixture.awayId;
}

export function stageLabel(stage: MatchStage, pool?: "A" | "B") {
  if (stage === "POOL") {
    return pool ? `Pool ${pool}` : "Pool";
  }
  if (stage === "QUARTER_FINAL") {
    return "Quarter Final";
  }
  if (stage === "SEMI_FINAL") {
    return "Semi Final";
  }
  return "Final";
}

function emptyRow(teamId: string): StandingRow {
  return { teamId, pos: 0, played: 0, won: 0, lost: 0, pf: 0, pa: 0, pts: 0, form: [] };
}

function applyResult(row: StandingRow, scored: number, conceded: number) {
  row.played += 1;
  row.pf += scored;
  row.pa += conceded;
  if (scored > conceded) {
    row.won += 1;
    row.pts += WIN_POINTS;
    row.form.push("W");
  } else {
    row.lost += 1;
    row.pts += LOSS_POINTS;
    row.form.push("L");
  }
  if (row.form.length > 5) {
    row.form = row.form.slice(-5) as FormResult[];
  }
}

function headToHeadDiff(a: string, b: string, fixtures: Fixture[]) {
  let aPts = 0;
  let bPts = 0;
  let aPd = 0;
  for (const fixture of fixtures) {
    if (!isOfficialResult(fixture)) {
      continue;
    }
    const sides = [fixture.homeId, fixture.awayId];
    if (!sides.includes(a) || !sides.includes(b)) {
      continue;
    }
    const aScore = fixture.homeId === a ? fixture.homeScore! : fixture.awayScore!;
    const bScore = fixture.homeId === b ? fixture.homeScore! : fixture.awayScore!;
    aPd += aScore - bScore;
    if (aScore > bScore) {
      aPts += 1;
    } else if (bScore > aScore) {
      bPts += 1;
    }
  }
  if (aPts !== bPts) {
    return bPts - aPts;
  }
  return -aPd;
}

function compareRows(a: StandingRow, b: StandingRow, fixtures: Fixture[]) {
  if (b.pts !== a.pts) {
    return b.pts - a.pts;
  }
  const h2h = headToHeadDiff(a.teamId, b.teamId, fixtures);
  if (h2h !== 0) {
    return h2h;
  }
  const pdA = a.pf - a.pa;
  const pdB = b.pf - b.pa;
  if (pdB !== pdA) {
    return pdB - pdA;
  }
  if (b.pf !== a.pf) {
    return b.pf - a.pf;
  }
  return a.teamId.localeCompare(b.teamId);
}

function rankReason(row: StandingRow, neighbour: StandingRow | undefined, fixtures: Fixture[]) {
  if (!neighbour) {
    return row.pos === 1 ? "Leads the table on competition points." : "Placed on competition points.";
  }
  if (row.pts !== neighbour.pts) {
    return `Separated from ${neighbour.teamId} on competition points.`;
  }
  const h2h = headToHeadDiff(row.teamId, neighbour.teamId, fixtures);
  if (h2h !== 0) {
    return "Level on points — ranked on head-to-head.";
  }
  if (row.pf - row.pa !== neighbour.pf - neighbour.pa) {
    return "Level on points — ranked on point difference.";
  }
  if (row.pf !== neighbour.pf) {
    return "Level on points and difference — ranked on points scored.";
  }
  return "Ranked by organiser order.";
}

export function qualificationFor(pos: number, format: League["format"]): Qualification {
  if (format === "pools") {
    if (pos === 1) {
      return "semi";
    }
    if (pos === 2 || pos === 3) {
      return "quarter";
    }
    return "out";
  }
  if (format === "round-robin") {
    return pos <= 2 ? "finalist" : "out";
  }
  return "out";
}

export function qualificationCopy(kind: Qualification) {
  if (kind === "semi") {
    return { short: "Semi-final", long: "Qualified directly for the semi-finals" };
  }
  if (kind === "quarter") {
    return { short: "Quarter-final", long: "Qualified for the quarter-finals" };
  }
  if (kind === "finalist") {
    return { short: "Final", long: "Qualified for the championship final" };
  }
  return { short: "Eliminated", long: "Eliminated from knockout qualification" };
}

export function calculateStandings(
  teamIds: string[],
  fixtures: Fixture[],
  adjustments: StandingAdjustment[] = [],
  format: League["format"] = "pools",
): StandingRow[] {
  const rows = new Map(teamIds.map((id) => [id, emptyRow(id)]));
  const relevant = fixtures.filter((fixture) => {
    if (!isOfficialResult(fixture)) {
      return false;
    }
    return fixtureMeta(fixture).stage === "POOL";
  });

  for (const fixture of relevant) {
    if (!rows.has(fixture.homeId) || !rows.has(fixture.awayId)) {
      continue;
    }
    applyResult(rows.get(fixture.homeId)!, fixture.homeScore!, fixture.awayScore!);
    applyResult(rows.get(fixture.awayId)!, fixture.awayScore!, fixture.homeScore!);
  }

  for (const adjustment of adjustments) {
    const row = rows.get(adjustment.teamId);
    if (!row) {
      continue;
    }
    row.pts += adjustment.pointsDelta;
    row.adjustmentPts = (row.adjustmentPts ?? 0) + adjustment.pointsDelta;
    row.note = "ADJ";
  }

  const ranked = [...rows.values()].sort((a, b) => compareRows(a, b, relevant));
  return ranked.map((row, index) => {
    const pos = index + 1;
    const neighbour = ranked[index - 1];
    return {
      ...row,
      pos,
      qualification: qualificationFor(pos, format),
      rankReason: rankReason(row, neighbour, relevant).replace(neighbour?.teamId ?? "", "the side above"),
    };
  });
}

export function poolGamesComplete(teamIds: string[], fixtures: Fixture[], pool: "A" | "B") {
  const expected = pairCount(teamIds.length);
  const done = fixtures.filter((fixture) => {
    const meta = fixtureMeta(fixture);
    return meta.stage === "POOL" && meta.pool === pool && isOfficialResult(fixture);
  }).length;
  return { done, expected };
}

export function poolsReadyForKnockout(draw: LeagueDraw, fixtures: Fixture[]) {
  if (draw.status !== "confirmed" || draw.poolA.length < 3 || draw.poolB.length < 3) {
    return false;
  }
  const a = poolGamesComplete(draw.poolA, fixtures, "A");
  const b = poolGamesComplete(draw.poolB, fixtures, "B");
  return a.expected > 0 && a.done >= a.expected && b.expected > 0 && b.done >= b.expected;
}

export function seedsFromStandings(poolA: StandingRow[], poolB: StandingRow[]): PoolSeeds {
  return {
    A1: poolA[0]?.teamId,
    A2: poolA[1]?.teamId,
    A3: poolA[2]?.teamId,
    B1: poolB[0]?.teamId,
    B2: poolB[1]?.teamId,
    B3: poolB[2]?.teamId,
  };
}

export function knockoutFixtures(fixtures: Fixture[]) {
  return fixtures.filter((fixture) => fixtureMeta(fixture).stage !== "POOL");
}

export function knockoutHasStarted(fixtures: Fixture[]) {
  return knockoutFixtures(fixtures).some(
    (fixture) => isOfficialResult(fixture),
  );
}

export function currentSeedsFromBracket(fixtures: Fixture[]): PoolSeeds {
  const bySlot = Object.fromEntries(knockoutFixtures(fixtures).map((fixture) => [slotId(fixture.id), fixture]));
  return {
    A1: bySlot.sf1?.homeId || undefined,
    A2: bySlot.qf1?.homeId || undefined,
    A3: bySlot.qf2?.awayId || undefined,
    B1: bySlot.sf2?.homeId || undefined,
    B2: bySlot.qf2?.homeId || undefined,
    B3: bySlot.qf1?.awayId || undefined,
  };
}

export function seedsChanged(current: PoolSeeds, next: PoolSeeds) {
  return (["A1", "A2", "A3", "B1", "B2", "B3"] as SeedKey[]).some((key) => current[key] && next[key] && current[key] !== next[key]);
}

export function slotId(fixtureId: string) {
  const match = fixtureId.match(/-(qf1|qf2|sf1|sf2|final)$/);
  return match?.[1] ?? fixtureId;
}

export function knockoutId(leagueId: string, slot: "qf1" | "qf2" | "sf1" | "sf2" | "final") {
  return `${leagueId}-${slot}`;
}

export function plannedKnockout(league: League, seeds: PoolSeeds): Fixture[] {
  const venue = league.location;
  return [
    {
      id: knockoutId(league.id, "qf1"),
      leagueId: league.id,
      time: "10:00",
      dateLabel: "Playoffs",
      venue,
      homeId: seeds.A2 ?? "",
      awayId: seeds.B3 ?? "",
      status: "upcoming",
      group: "Quarter Final 1 · A2 v B3",
      stage: "QUARTER_FINAL",
      homePlaceholder: "A2",
      awayPlaceholder: "B3",
    },
    {
      id: knockoutId(league.id, "qf2"),
      leagueId: league.id,
      time: "13:00",
      dateLabel: "Playoffs",
      venue,
      homeId: seeds.B2 ?? "",
      awayId: seeds.A3 ?? "",
      status: "upcoming",
      group: "Quarter Final 2 · B2 v A3",
      stage: "QUARTER_FINAL",
      homePlaceholder: "B2",
      awayPlaceholder: "A3",
    },
    {
      id: knockoutId(league.id, "sf1"),
      leagueId: league.id,
      time: "17:00",
      dateLabel: "Playoffs",
      venue,
      homeId: seeds.A1 ?? "",
      awayId: "",
      status: "upcoming",
      group: "Semi Final 1 · A1 v Winner QF2",
      stage: "SEMI_FINAL",
      homePlaceholder: "Pool A Winner",
      awayPlaceholder: "Winner QF2",
    },
    {
      id: knockoutId(league.id, "sf2"),
      leagueId: league.id,
      time: "19:30",
      dateLabel: "Playoffs",
      venue,
      homeId: seeds.B1 ?? "",
      awayId: "",
      status: "upcoming",
      group: "Semi Final 2 · B1 v Winner QF1",
      stage: "SEMI_FINAL",
      homePlaceholder: "Pool B Winner",
      awayPlaceholder: "Winner QF1",
    },
    {
      id: knockoutId(league.id, "final"),
      leagueId: league.id,
      time: "18:00",
      dateLabel: "Championship Final",
      venue,
      homeId: "",
      awayId: "",
      status: "upcoming",
      group: "Championship Final",
      stage: "FINAL",
      homePlaceholder: "Winner SF1",
      awayPlaceholder: "Winner SF2",
    },
  ];
}

export function progressedKnockout(fixtures: Fixture[]): Fixture[] {
  const map = new Map(fixtures.map((fixture) => [slotId(fixture.id), { ...fixture }]));
  const qf1 = map.get("qf1");
  const qf2 = map.get("qf2");
  const sf1 = map.get("sf1");
  const sf2 = map.get("sf2");
  const final = map.get("final");

  if (qf2 && sf1 && isOfficialResult(qf2)) {
    sf1.awayId = matchWinner(qf2) ?? "";
  }
  if (qf1 && sf2 && isOfficialResult(qf1)) {
    sf2.awayId = matchWinner(qf1) ?? "";
  }
  if (sf1 && final && isOfficialResult(sf1)) {
    final.homeId = matchWinner(sf1) ?? "";
  }
  if (sf2 && final && isOfficialResult(sf2)) {
    final.awayId = matchWinner(sf2) ?? "";
  }

  return [...map.values()];
}

export function championFrom(fixtures: Fixture[]) {
  const final = knockoutFixtures(fixtures).find((fixture) => fixtureMeta(fixture).stage === "FINAL");
  return final && isOfficialResult(final) ? matchWinner(final) : undefined;
}

function entrant(teamId: string | undefined, placeholder: string | undefined, score: number | undefined, winner?: string) {
  const resolved = teamId || undefined;
  return {
    teamId: resolved,
    placeholder: resolved ? undefined : placeholder,
    score: score ?? null,
    outcome: !resolved ? ("tbd" as const) : winner ? (winner === resolved ? ("win" as const) : ("lose" as const)) : undefined,
  };
}

export function bracketFromFixtures(fixtures: Fixture[]): BracketMatch[] {
  const slots = ["qf1", "qf2", "sf1", "sf2", "final"] as const;
  const labels: Record<(typeof slots)[number], string> = {
    qf1: "QF1 · A2 v B3",
    qf2: "QF2 · B2 v A3",
    sf1: "SF1 · A1 v Winner QF2",
    sf2: "SF2 · B1 v Winner QF1",
    final: "Championship Final",
  };

  const matches: BracketMatch[] = [];
  for (const slot of slots) {
    const fixture = fixtures.find((item) => slotId(item.id) === slot);
    if (!fixture) {
      continue;
    }
    const winner = isOfficialResult(fixture) ? matchWinner(fixture) : undefined;
    const status: BracketMatch["status"] = fixture.status === "final" ? "final" : "upcoming";
    matches.push({
      id: fixture.id,
      label: labels[slot],
      status,
      meta: [fixture.dateLabel, fixture.time, fixture.venue].filter(Boolean).join(" · "),
      featured: slot === "final",
      home: entrant(fixture.homeId, fixture.homePlaceholder, fixture.homeScore, winner),
      away: entrant(fixture.awayId, fixture.awayPlaceholder, fixture.awayScore, winner),
    });
  }
  return matches;
}

export function teamMap(store: AppStore): Record<string, Team> {
  return Object.fromEntries(store.teams.map((team) => [team.id, team]));
}

export function buildLeagueView(store: AppStore, leagueId: string): LeagueView | null {
  const league = getLeague(store, leagueId);
  if (!league) {
    return null;
  }
  const draw = getDraw(store, league.id);
  const fixtures = store.fixtures[league.id] ?? [];
  const adjustments = (store.adjustments?.[league.id] ?? []).filter((item) => item.leagueId === league.id);
  const poolAStandings = calculateStandings(draw.poolA, fixtures, adjustments, league.format);
  const poolBStandings = calculateStandings(draw.poolB, fixtures, adjustments, league.format);
  const table = calculateStandings(league.teamIds, fixtures, adjustments, league.format);
  const a = poolGamesComplete(draw.poolA, fixtures, "A");
  const b = poolGamesComplete(draw.poolB, fixtures, "B");
  const ready = league.format === "pools" ? poolsReadyForKnockout(draw, fixtures) : false;

  return {
    league,
    fixtures,
    poolA: draw.poolA,
    poolB: draw.poolB,
    poolAStandings,
    poolBStandings,
    table,
    bracket: bracketFromFixtures(fixtures),
    bracketReady: ready || knockoutFixtures(fixtures).length > 0,
    knockoutStarted: knockoutHasStarted(fixtures),
    championId: championFrom(fixtures),
    poolProgress: { a, b },
    remainingPoolMatches: Math.max(0, a.expected - a.done) + Math.max(0, b.expected - b.done),
    adjustments,
  };
}

export function findFixtureTeam(store: AppStore, id: string) {
  return id ? findTeam(store, id) : undefined;
}
