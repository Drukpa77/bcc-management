export type Team = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  color: string;
};

export type MatchStatus = "live" | "final" | "upcoming";

export type Fixture = {
  id: string;
  time: string;
  dateLabel: string;
  venue: string;
  homeId: string;
  awayId: string;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  period?: string;
  clock?: string;
  group: string;
};

export type FormResult = "W" | "L";

export type StandingRow = {
  teamId: string;
  pos: number;
  played: number;
  won: number;
  lost: number;
  pf: number;
  pa: number;
  pts: number;
  form: FormResult[];
};

export type BracketEntrant = {
  teamId?: string;
  placeholder?: string;
  score?: number | null;
  outcome?: "win" | "lose" | "tbd";
};

export type BracketMatch = {
  id: string;
  label: string;
  status: MatchStatus;
  meta: string;
  home: BracketEntrant;
  away: BracketEntrant;
  featured?: boolean;
};
