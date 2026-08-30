export type Player = {
  id: string;
  teamId: string;
  name: string;
  number: number;
  position: string;
  age?: number;
  height?: string;
  image?: string;
  captain: boolean;
  status: string;
};

export type Team = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  color: string;
  city?: string;
  pool?: "A" | "B";
  gender?: "men" | "women";
  logo?: string;
};

export type MatchStatus = "live" | "final" | "upcoming" | "postponed" | "cancelled";
export type MatchStage = "POOL" | "QUARTER_FINAL" | "SEMI_FINAL" | "FINAL";
export type Qualification = "semi" | "quarter" | "out" | "finalist";

export type Fixture = {
  id: string;
  leagueId?: string;
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
  stage?: MatchStage;
  pool?: "A" | "B";
  round?: number;
  published?: boolean;
  notes?: string;
  mvp?: string;
  overtime?: boolean;
  winnerId?: string;
  publishedAt?: string;
  updatedById?: string;
  homePlaceholder?: string;
  awayPlaceholder?: string;
  homeQ1?: number;
  homeQ2?: number;
  homeQ3?: number;
  homeQ4?: number;
  awayQ1?: number;
  awayQ2?: number;
  awayQ3?: number;
  awayQ4?: number;
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
  note?: string;
  qualification?: Qualification;
  adjustmentPts?: number;
  rankReason?: string;
};

export type StandingAdjustment = {
  id: string;
  leagueId: string;
  teamId: string;
  pointsDelta: number;
  reason: string;
  createdAt: string;
  createdById?: string;
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
