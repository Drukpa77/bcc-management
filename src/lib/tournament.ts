import type { BracketMatch, Fixture, StandingRow, Team } from "@/lib/types";

export const teams: Team[] = [
  { id: "thw", code: "THW", name: "Thimphu Warriors", shortName: "Warriors", color: "#E8611C", city: "Thimphu", pool: "A", gender: "men" },
  { id: "pdr", code: "PDR", name: "Paro Dragons", shortName: "Dragons", color: "#7A1F2B", city: "Paro", pool: "B", gender: "men" },
  { id: "pnb", code: "PNB", name: "Punakha Bulls", shortName: "Bulls", color: "#2E5EAA", city: "Punakha", pool: "A", gender: "men" },
  { id: "hat", code: "HAT", name: "Haa Tigers", shortName: "Tigers", color: "#C98A12", city: "Haa", pool: "B", gender: "men" },
  { id: "wde", code: "WDE", name: "Wangdue Eagles", shortName: "Eagles", color: "#3E7A5A", city: "Wangdue", pool: "A", gender: "men" },
  { id: "trt", code: "TRT", name: "Trongsa Titans", shortName: "Titans", color: "#444B57", city: "Trongsa", pool: "A", gender: "men" },
  { id: "gls", code: "GLS", name: "Gelephu Storm", shortName: "Storm", color: "#2C7DA0", city: "Gelephu", pool: "A", gender: "men" },
  { id: "bmf", code: "BMF", name: "Bumthang Falcons", shortName: "Falcons", color: "#5B4A9E", city: "Bumthang", pool: "B", gender: "men" },
  { id: "mgc", code: "MGC", name: "Mongar Chargers", shortName: "Chargers", color: "#C1462F", city: "Mongar", pool: "B", gender: "men" },
  { id: "sms", code: "SMS", name: "Samtse Stallions", shortName: "Stallions", color: "#8A5A44", city: "Samtse", pool: "B", gender: "men" },
  { id: "tqn", code: "TQN", name: "Thimphu Queens", shortName: "Queens", color: "#A2335C", city: "Thimphu", gender: "women" },
  { id: "ppx", code: "PPX", name: "Paro Phoenix", shortName: "Phoenix", color: "#D9652B", city: "Paro", gender: "women" },
  { id: "ppl", code: "PPL", name: "Punakha Pearls", shortName: "Pearls", color: "#4E7A9E", city: "Punakha", gender: "women" },
  { id: "wvk", code: "WVK", name: "Wangdue Valkyries", shortName: "Valkyries", color: "#5E548E", city: "Wangdue", gender: "women" },
  { id: "hrv", code: "HRV", name: "Haa Ravens", shortName: "Ravens", color: "#37423D", city: "Haa", gender: "women" },
  { id: "gcm", code: "GCM", name: "Gelephu Comets", shortName: "Comets", color: "#C98A12", city: "Gelephu", gender: "women" },
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

export const sundayFixtures: Fixture[] = [
  {
    id: "wde-gls",
    time: "10:00",
    dateLabel: "Sunday, 13 September",
    venue: "Court 1",
    homeId: "wde",
    awayId: "gls",
    status: "upcoming",
    group: "Men · Pool A · R5",
  },
  {
    id: "mgc-sms",
    time: "12:30",
    dateLabel: "Sunday, 13 September",
    venue: "Court 1",
    homeId: "mgc",
    awayId: "sms",
    status: "upcoming",
    group: "Men · Pool B · R5",
  },
];

export const womenStandings: StandingRow[] = [
  { teamId: "tqn", pos: 1, played: 4, won: 4, lost: 0, pf: 241, pa: 198, pts: 8, form: ["W", "W", "W", "W"], note: "FINALIST" },
  { teamId: "ppx", pos: 2, played: 4, won: 3, lost: 1, pf: 226, pa: 204, pts: 7, form: ["W", "L", "W", "W"], note: "FINALIST" },
  { teamId: "ppl", pos: 3, played: 4, won: 2, lost: 2, pf: 210, pa: 208, pts: 6, form: ["L", "W", "W", "L"] },
  { teamId: "wvk", pos: 4, played: 4, won: 2, lost: 2, pf: 201, pa: 211, pts: 6, form: ["W", "W", "L", "L"] },
  { teamId: "hrv", pos: 5, played: 4, won: 1, lost: 3, pf: 192, pa: 220, pts: 5, form: ["L", "L", "W", "L"] },
  { teamId: "gcm", pos: 6, played: 4, won: 0, lost: 4, pf: 185, pa: 214, pts: 4, form: ["L", "L", "L", "L"] },
];

export const extraResults: Fixture[] = [
  {
    id: "trt-pnb-ot",
    time: "",
    dateLabel: "10 Sep",
    venue: "Changlimithang Court",
    homeId: "trt",
    awayId: "pnb",
    homeScore: 77,
    awayScore: 81,
    status: "final",
    group: "Pool A",
    period: "OT",
  },
];

export const menBracket: BracketMatch[] = [
  {
    id: "qf1",
    label: "QF1 · A2 v B3",
    status: "final",
    meta: "20 Sept · 10:00 · Court 1",
    home: { teamId: "pnb", score: 74, outcome: "win" },
    away: { teamId: "bmf", score: 66, outcome: "lose" },
  },
  {
    id: "qf2",
    label: "QF2 · B2 v A3",
    status: "live",
    meta: "Q3 · 04:12 · Court 1",
    home: { teamId: "hat", score: 51, outcome: "win" },
    away: { teamId: "wde", score: 48 },
  },
  {
    id: "sf1",
    label: "SF1 · POOL A WINNER v QF2",
    status: "upcoming",
    meta: "23 Sept · 17:00 · Court 1",
    home: { teamId: "thw", score: null },
    away: { placeholder: "Winner QF2", outcome: "tbd", score: null },
  },
  {
    id: "sf2",
    label: "SF2 · POOL B WINNER v QF1",
    status: "upcoming",
    meta: "23 Sept · 19:30 · Court 1",
    home: { teamId: "pdr", score: null },
    away: { teamId: "pnb", score: null },
  },
  {
    id: "final",
    label: "CHAMPIONSHIP FINAL",
    status: "upcoming",
    meta: "26 Sept · 18:00 · Changlimithang",
    featured: true,
    home: { placeholder: "Winner SF1", outcome: "tbd", score: null },
    away: { placeholder: "Winner SF2", outcome: "tbd", score: null },
  },
];

export const warriorsSquad = [
  { number: 7, name: "Sonam Wangchuk", pos: "Point Guard · PG" },
  { number: 11, name: "Karma Tenzin", pos: "Shooting Guard · SG" },
  { number: 23, name: "Jigme Dorji", pos: "Small Forward · SF" },
  { number: 34, name: "Tashi Norbu", pos: "Power Forward · PF" },
  { number: 15, name: "Ugyen Dendup", pos: "Center · C" },
  { number: 4, name: "Pema Gyeltshen", pos: "Point Guard · PG" },
  { number: 9, name: "Kinley Rabgay", pos: "Shooting Guard · SG" },
];

export const competitions = [
  { slug: "national-championship", name: "National Championship", meta: "2026 · Men · Pool + Playoffs", teams: "10 teams · 2 pools", status: "live" as const, color: "#E8611C", href: "/competitions/national-championship" },
  { slug: "womens-championship", name: "Women's Championship", meta: "2026 · Women · Round Robin + Final", teams: "6 teams", status: "live" as const, color: "#A2335C", href: "/competitions/womens-championship" },
  { slug: "youth-u18", name: "Youth Tournament U-18", meta: "2026 · Mixed · Knockout", teams: "6 / 12 registered", status: "registration" as const, color: "#2E5EAA", href: "/competitions/youth-u18" },
  { slug: "interstate", name: "Interstate Championship", meta: "Nov 2026 · Men · Pool + Playoffs", teams: "8 teams", status: "upcoming" as const, color: "#3E8E5A", href: "/competitions/interstate" },
  { slug: "club", name: "Club Championship", meta: "Dec 2026 · Men & Women · Round Robin", teams: "12 teams", status: "upcoming" as const, color: "#C98A12", href: "/competitions/club" },
  { slug: "regional-2025", name: "Regional Championship", meta: "2025 · Men · Knockout · 🏆 Thimphu Warriors", teams: "8 teams", status: "done" as const, color: "#5B6472", href: "/competitions/regional-2025" },
];

export function allUpcoming() {
  return [...upcomingFixtures, ...sundayFixtures];
}

export function allResults() {
  return [...recentResults, ...extraResults];
}
