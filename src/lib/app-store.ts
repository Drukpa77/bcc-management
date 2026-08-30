import { teams as seedTeams } from "@/lib/tournament";
import type { Fixture, Player, StandingAdjustment, Team } from "@/lib/types";

export const STORAGE_KEY = "bcc-app-v1";
export const CHANNEL_NAME = "bcc-app";

export type LeagueFormat = "pools" | "round-robin" | "knockout";
export type LeagueGender = "men" | "women" | "mixed";
export type LeagueStatus = "registration" | "upcoming" | "live" | "done";

export type League = {
  id: string;
  name: string;
  season: string;
  location: string;
  gender: LeagueGender;
  format: LeagueFormat;
  status: LeagueStatus;
  teamIds: string[];
  createdAt: string;
};

export type DrawLogEntry = {
  spin: number;
  teamId: string;
  pool: "A" | "B";
};

export type LeagueDraw = {
  leagueId: string;
  status: "idle" | "drawing" | "complete" | "confirmed";
  remaining: string[];
  poolA: string[];
  poolB: string[];
  log: DrawLogEntry[];
  lastPick?: DrawLogEntry;
  confirmedAt?: string;
  fixturesGeneratedAt?: string;
};

export type AppStore = {
  teams: Team[];
  customTeams: Team[];
  players: Player[];
  leagues: League[];
  draws: Record<string, LeagueDraw>;
  fixtures: Record<string, Fixture[]>;
  adjustments: Record<string, StandingAdjustment[]>;
  activeLeagueId: string;
};

export const FORMAT_LABEL: Record<LeagueFormat, string> = {
  pools: "Pool + Playoffs",
  "round-robin": "Round Robin",
  knockout: "Knockout",
};

export const TEAM_COLORS = [
  "#E8611C",
  "#7A1F2B",
  "#2E5EAA",
  "#C98A12",
  "#3E7A5A",
  "#5B4A9E",
  "#444B57",
  "#C1462F",
  "#2C7DA0",
  "#8A5A44",
  "#A2335C",
  "#D9652B",
];

function menIds() {
  return seedTeams.filter((team) => team.gender === "men").map((team) => team.id);
}

function womenIds() {
  return seedTeams.filter((team) => team.gender === "women").map((team) => team.id);
}

export function defaultStore(): AppStore {
  return {
    teams: seedTeams,
    customTeams: [],
    players: [],
    activeLeagueId: "national-championship",
    leagues: [
      {
        id: "national-championship",
        name: "National Championship",
        season: "2026",
        location: "Changlimithang, Thimphu",
        gender: "men",
        format: "pools",
        status: "live",
        teamIds: menIds(),
        createdAt: "2026-01-15T00:00:00.000Z",
      },
      {
        id: "womens-championship",
        name: "Women's Championship",
        season: "2026",
        location: "Changlimithang, Thimphu",
        gender: "women",
        format: "round-robin",
        status: "live",
        teamIds: womenIds(),
        createdAt: "2026-01-15T00:00:00.000Z",
      },
    ],
    draws: {},
    fixtures: {},
    adjustments: {},
  };
}

export function loadStore(): AppStore {
  if (typeof window === "undefined") {
    return defaultStore();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultStore();
    }

    const parsed = JSON.parse(raw) as Partial<AppStore>;
    const base = defaultStore();
    return {
      ...base,
      ...parsed,
      customTeams: parsed.customTeams ?? [],
      players: parsed.players ?? [],
      leagues: parsed.leagues?.length ? parsed.leagues : base.leagues,
      draws: parsed.draws ?? {},
      fixtures: parsed.fixtures ?? {},
      adjustments: parsed.adjustments ?? {},
      activeLeagueId: parsed.activeLeagueId || base.activeLeagueId,
    };
  } catch {
    return defaultStore();
  }
}

export function saveStore(store: AppStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function allTeams(store: AppStore): Team[] {
  if (store.teams.length) {
    return store.teams;
  }
  const extras = store.customTeams.filter((team) => !seedTeams.some((seed) => seed.id === team.id));
  return [...seedTeams, ...extras];
}

export function findTeam(store: AppStore, id: string): Team | undefined {
  return allTeams(store).find((team) => team.id === id);
}

export function leagueTeams(store: AppStore, league: League): Team[] {
  return league.teamIds
    .map((id) => findTeam(store, id))
    .filter((team): team is Team => Boolean(team));
}

export function getLeague(store: AppStore, id: string): League | undefined {
  return store.leagues.find((league) => league.id === id);
}

export function activeLeague(store: AppStore): League | undefined {
  return getLeague(store, store.activeLeagueId) ?? store.leagues[0];
}

export function makeId(name: string): string {
  const base =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 24) || "item";
  return `${base}-${Math.random().toString(36).slice(2, 6)}`;
}

export function randomIndex(length: number): number {
  if (length <= 1) {
    return 0;
  }
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % length;
}

export function poolCaps(count: number) {
  return { a: Math.ceil(count / 2), b: Math.floor(count / 2) };
}

export function emptyDraw(leagueId: string): LeagueDraw {
  return { leagueId, status: "idle", remaining: [], poolA: [], poolB: [], log: [] };
}

export function getDraw(store: AppStore, leagueId: string): LeagueDraw {
  return store.draws[leagueId] ?? emptyDraw(leagueId);
}

export function pickSpin(draw: LeagueDraw, total: number): DrawLogEntry & { remainingIndex: number } {
  const remainingIndex = randomIndex(draw.remaining.length);
  const teamId = draw.remaining[remainingIndex];
  const spin = draw.log.length + 1;
  const { a: capA, b: capB } = poolCaps(total);
  let pool: "A" | "B" = spin % 2 === 1 ? "A" : "B";
  if (pool === "A" && draw.poolA.length >= capA) {
    pool = "B";
  }
  if (pool === "B" && draw.poolB.length >= capB) {
    pool = "A";
  }
  return { teamId, pool, spin, remainingIndex };
}

export function createLeague(
  store: AppStore,
  input: {
    id?: string;
    name: string;
    season: string;
    location: string;
    gender: LeagueGender;
    format: LeagueFormat;
  },
): AppStore {
  const league: League = {
    ...input,
    id: input.id ?? makeId(input.name),
    teamIds: [],
    status: "registration",
    createdAt: new Date().toISOString(),
  };
  return { ...store, leagues: [...store.leagues, league], activeLeagueId: league.id };
}

export function addTeamToLeague(store: AppStore, leagueId: string, teamId: string): AppStore {
  return {
    ...store,
    leagues: store.leagues.map((league) =>
      league.id === leagueId && !league.teamIds.includes(teamId)
        ? { ...league, teamIds: [...league.teamIds, teamId] }
        : league,
    ),
  };
}

export function removeTeamFromLeague(store: AppStore, leagueId: string, teamId: string): AppStore {
  return {
    ...store,
    leagues: store.leagues.map((league) =>
      league.id === leagueId
        ? { ...league, teamIds: league.teamIds.filter((id) => id !== teamId) }
        : league,
    ),
  };
}

export function createTeam(
  store: AppStore,
  input: Omit<Team, "id">,
  leagueId?: string,
): AppStore {
  const team: Team = { ...input, id: makeId(input.code || input.name) };
  const withTeam = { ...store, customTeams: [...store.customTeams, team] };
  return leagueId ? addTeamToLeague(withTeam, leagueId, team.id) : withTeam;
}

export function setActiveLeague(store: AppStore, leagueId: string): AppStore {
  return { ...store, activeLeagueId: leagueId };
}

export function startDraw(store: AppStore, leagueId: string): AppStore {
  const league = getLeague(store, leagueId);
  if (!league || league.format !== "pools" || league.teamIds.length < 2) {
    return store;
  }

  return {
    ...store,
    activeLeagueId: leagueId,
    draws: {
      ...store.draws,
      [leagueId]: {
        leagueId,
        status: "drawing",
        remaining: [...league.teamIds],
        poolA: [],
        poolB: [],
        log: [],
      },
    },
    fixtures: { ...store.fixtures, [leagueId]: [] },
  };
}

export function applySpin(store: AppStore, leagueId: string, pick: DrawLogEntry): AppStore {
  const draw = getDraw(store, leagueId);
  if (draw.status !== "drawing" || !draw.remaining.includes(pick.teamId)) {
    return store;
  }

  const remaining = draw.remaining.filter((id) => id !== pick.teamId);
  const next: LeagueDraw = {
    ...draw,
    remaining,
    poolA: pick.pool === "A" ? [...draw.poolA, pick.teamId] : draw.poolA,
    poolB: pick.pool === "B" ? [...draw.poolB, pick.teamId] : draw.poolB,
    log: [...draw.log, pick],
    lastPick: pick,
    status: remaining.length === 0 ? "complete" : "drawing",
  };

  return { ...store, draws: { ...store.draws, [leagueId]: next } };
}

export function confirmDraw(store: AppStore, leagueId: string): AppStore {
  const draw = getDraw(store, leagueId);
  if (draw.status !== "complete") {
    return store;
  }

  return {
    ...store,
    draws: {
      ...store.draws,
      [leagueId]: { ...draw, status: "confirmed", confirmedAt: new Date().toISOString() },
    },
  };
}

export function discardDraw(store: AppStore, leagueId: string): AppStore {
  const draws = { ...store.draws };
  const fixtures = { ...store.fixtures };
  delete draws[leagueId];
  delete fixtures[leagueId];
  return { ...store, draws, fixtures };
}

export type RoundGame = { home: string; away: string; round: number };

export function roundRobin(teamIds: string[]): RoundGame[] {
  const teams = [...teamIds];
  if (teams.length < 2) {
    return [];
  }
  if (teams.length % 2 === 1) {
    teams.push("BYE");
  }

  const n = teams.length;
  const rounds = n - 1;
  const half = n / 2;
  const arr = [...teams];
  const games: RoundGame[] = [];

  for (let round = 0; round < rounds; round += 1) {
    for (let i = 0; i < half; i += 1) {
      const home = arr[i];
      const away = arr[n - 1 - i];
      if (home !== "BYE" && away !== "BYE") {
        games.push({ home, away, round: round + 1 });
      }
    }
    const last = arr.pop();
    if (last) {
      arr.splice(1, 0, last);
    }
  }

  return games;
}

const SLOTS = ["10:00", "12:30", "15:00"];

function formatDay(date: Date) {
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export function buildFixtures(store: AppStore, leagueId: string): Fixture[] | null {
  const league = getLeague(store, leagueId);
  if (!league) {
    return null;
  }

  const draw = getDraw(store, leagueId);
  let games: (RoundGame & { group: string; pool?: "A" | "B" })[] = [];

  if (league.format === "pools") {
    if (draw.status !== "confirmed") {
      return null;
    }
    games = [
      ...roundRobin(draw.poolA).map((game) => ({ ...game, group: `Pool A · R${game.round}`, pool: "A" as const })),
      ...roundRobin(draw.poolB).map((game) => ({ ...game, group: `Pool B · R${game.round}`, pool: "B" as const })),
    ].sort((a, b) => a.round - b.round || a.group.localeCompare(b.group));
  } else if (league.format === "round-robin") {
    if (league.teamIds.length < 2) {
      return null;
    }
    games = roundRobin(league.teamIds).map((game) => ({ ...game, group: `Round ${game.round}` }));
  } else {
    return null;
  }

  const start = new Date(2026, 8, 10);
  let day = 0;
  let slot = 0;

  return games.map((game) => {
    if (slot >= SLOTS.length) {
      slot = 0;
      day += 1;
    }
    const date = new Date(start);
    date.setDate(start.getDate() + day);
    const fixture: Fixture = {
      id: `${leagueId}-${game.home}-${game.away}-r${game.round}`,
      leagueId,
      time: SLOTS[slot],
      dateLabel: formatDay(date),
      venue: league.location,
      homeId: game.home,
      awayId: game.away,
      status: "upcoming",
      group: game.group,
      stage: "POOL",
      pool: game.pool,
      round: game.round,
      published: false,
    };
    slot += 1;
    return fixture;
  });
}

export function generateFixtures(store: AppStore, leagueId: string): AppStore {
  const fixtures = buildFixtures(store, leagueId);
  if (!fixtures) {
    return store;
  }

  const draw = getDraw(store, leagueId);
  return {
    ...store,
    fixtures: { ...store.fixtures, [leagueId]: fixtures },
    draws: store.draws[leagueId]
      ? {
          ...store.draws,
          [leagueId]: { ...draw, fixturesGeneratedAt: new Date().toISOString() },
        }
      : store.draws,
  };
}

export function availableTeams(store: AppStore, league: League): Team[] {
  return allTeams(store).filter((team) => {
    if (league.teamIds.includes(team.id)) {
      return false;
    }
    if (league.gender !== "mixed" && team.gender && team.gender !== league.gender) {
      return false;
    }
    return true;
  });
}

export function rosterLocked(draw: LeagueDraw) {
  return draw.status === "drawing" || draw.status === "complete" || draw.status === "confirmed";
}

export function pairCount(n: number) {
  return n < 2 ? 0 : (n * (n - 1)) / 2;
}
