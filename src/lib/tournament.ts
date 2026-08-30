import type { BracketMatch, Fixture, StandingRow, Team } from "@/lib/types";

export const teams: Team[] = [
  { id: "thw", code: "THW", name: "Thimphu Warriors", shortName: "Warriors", color: "#E8611C" },
  { id: "pdr", code: "PDR", name: "Paro Dragons", shortName: "Dragons", color: "#7A1F2B" },
  { id: "pnb", code: "PNB", name: "Punakha Bulls", shortName: "Bulls", color: "#2E5EAA" },
  { id: "hat", code: "HAT", name: "Haa Tigers", shortName: "Tigers", color: "#C98A12" },
  { id: "wde", code: "WDE", name: "Wangdue Eagles", shortName: "Eagles", color: "#3E7A5A" },
  { id: "trt", code: "TRT", name: "Trongsa Titans", shortName: "Titans", color: "#444B57" },
  { id: "gls", code: "GLS", name: "Gelephu Storm", shortName: "Storm", color: "#2C7DA0" },
  { id: "bmf", code: "BMF", name: "Bumthang Falcons", shortName: "Falcons", color: "#5B4A9E" },
  { id: "mgc", code: "MGC", name: "Mongar Chargers", shortName: "Chargers", color: "#C1462F" },
  { id: "sms", code: "SMS", name: "Samtse Stallions", shortName: "Stallions", color: "#8A5A44" },
  { id: "tqn", code: "TQN", name: "Thimphu Queens", shortName: "Queens", color: "#A2335C" },
  { id: "ppx", code: "PPX", name: "Paro Phoenix", shortName: "Phoenix", color: "#D9652B" },
  { id: "ppl", code: "PPL", name: "Punakha Pearls", shortName: "Pearls", color: "#4E7A9E" },
];

export const teamById: Record<string, Team> = Object.fromEntries(
  teams.map((team) => [team.id, team]),
);

export function getTeam(id: string): Team {
  const team = teamById[id];
  if (!team) {
    throw new Error(`Unknown team: ${id}`);
  }
  return team;
}

export const liveMatch: Fixture = {
  id: "thw-pdr-live",
  time: "10:00",
  dateLabel: "Saturday, 12 September",
  venue: "Changlimithang Court",
  homeId: "thw",
  awayId: "pdr",
  homeScore: 72,
  awayScore: 68,
  status: "live",
  period: "Q4",
  clock: "03:42",
  group: "Men's Pool A",
};

export const upcomingFixtures: Fixture[] = [
  {
    id: "thw-pdr",
    time: "10:00",
    dateLabel: "Saturday, 12 September",
    venue: "Changlimithang Court",
    homeId: "thw",
    awayId: "pdr",
    status: "upcoming",
    group: "Men · Pool A",
  },
  {
    id: "pnb-hat",
    time: "12:30",
    dateLabel: "Saturday, 12 September",
    venue: "Changlimithang Court",
    homeId: "pnb",
    awayId: "hat",
    status: "upcoming",
    group: "Men · Pool B",
  },
  {
    id: "tqn-ppx",
    time: "15:00",
    dateLabel: "Saturday, 12 September",
    venue: "Changlimithang Court",
    homeId: "tqn",
    awayId: "ppx",
    status: "upcoming",
    group: "Women",
  },
];

export const recentResults: Fixture[] = [
  {
    id: "thw-pdr-r1",
    time: "",
    dateLabel: "11 Sep",
    venue: "Changlimithang Court",
    homeId: "thw",
    awayId: "pdr",
    homeScore: 82,
    awayScore: 75,
    status: "final",
    group: "Pool A",
  },
  {
    id: "hat-bmf-r1",
    time: "",
    dateLabel: "11 Sep",
    venue: "Changlimithang Court",
    homeId: "hat",
    awayId: "bmf",
    homeScore: 69,
    awayScore: 64,
    status: "final",
    group: "Pool B",
  },
  {
    id: "tqn-ppl-r1",
    time: "",
    dateLabel: "10 Sep",
    venue: "Changlimithang Court",
    homeId: "tqn",
    awayId: "ppl",
    homeScore: 58,
    awayScore: 51,
    status: "final",
    group: "Women",
  },
];

export const poolAStandings: StandingRow[] = [
  { teamId: "thw", pos: 1, played: 5, won: 4, lost: 1, pf: 410, pa: 350, pts: 9, form: ["W", "W", "W", "L", "W"] },
  { teamId: "pnb", pos: 2, played: 5, won: 3, lost: 2, pf: 388, pa: 371, pts: 8, form: ["L", "W", "W", "L", "W"] },
  { teamId: "wde", pos: 3, played: 5, won: 3, lost: 2, pf: 362, pa: 355, pts: 8, form: ["W", "L", "W", "W", "L"] },
  { teamId: "trt", pos: 4, played: 5, won: 2, lost: 3, pf: 351, pa: 368, pts: 7, form: ["L", "W", "L", "W", "L"] },
  { teamId: "gls", pos: 5, played: 5, won: 1, lost: 4, pf: 330, pa: 397, pts: 6, form: ["W", "L", "L", "L", "L"] },
];

export const poolBStandings: StandingRow[] = [
  { teamId: "pdr", pos: 1, played: 5, won: 4, lost: 1, pf: 402, pa: 348, pts: 9, form: ["W", "W", "L", "W", "W"] },
  { teamId: "hat", pos: 2, played: 5, won: 4, lost: 1, pf: 379, pa: 341, pts: 9, form: ["W", "W", "W", "L", "W"] },
  { teamId: "bmf", pos: 3, played: 5, won: 2, lost: 3, pf: 344, pa: 352, pts: 7, form: ["L", "W", "L", "W", "L"] },
  { teamId: "mgc", pos: 4, played: 5, won: 2, lost: 3, pf: 339, pa: 361, pts: 7, form: ["W", "L", "W", "L", "L"] },
  { teamId: "sms", pos: 5, played: 5, won: 1, lost: 4, pf: 328, pa: 390, pts: 6, form: ["L", "L", "W", "L", "L"] },
];

export const sampleBracketMatch: BracketMatch = {
  id: "qf1",
  label: "QF1 · A2 v B3",
  status: "final",
  meta: "20 Sept · 10:00 · Court 1",
  home: { teamId: "pnb", score: 74, outcome: "win" },
  away: { teamId: "bmf", score: 66, outcome: "lose" },
};
