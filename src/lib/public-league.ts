import type { LeagueView } from "@/lib/tournament-engine";
import type { AppStore, League } from "@/lib/app-store";

export const PUBLIC_LEAGUE_COOKIE = "bcc-public-league";

export type LeagueTab = "fixtures" | "results" | "standings" | "bracket" | "teams";

export type PublicCompetition = {
  store: AppStore;
  league: League | undefined;
  view: LeagueView | null;
};

export function tabFromPathname(pathname: string): LeagueTab | null {
  if (pathname === "/fixtures" || pathname.startsWith("/fixtures/")) {
    return "fixtures";
  }
  if (pathname === "/results" || pathname.startsWith("/results/")) {
    return "results";
  }
  if (pathname === "/standings" || pathname.startsWith("/standings/")) {
    return "standings";
  }
  if (pathname === "/bracket" || pathname.startsWith("/bracket/")) {
    return "bracket";
  }
  if (pathname === "/teams" || pathname.startsWith("/teams/")) {
    return "teams";
  }
  return null;
}

export function leagueTabs(leagueId: string, active: string) {
  const q = `?league=${leagueId}`;
  return [
    { id: "fixtures" as const, href: `/fixtures${q}`, label: "Fixtures", active: active === "fixtures" },
    { id: "results" as const, href: `/results${q}`, label: "Results", active: active === "results" },
    { id: "standings" as const, href: `/standings${q}`, label: "Standings", active: active === "standings" },
    { id: "bracket" as const, href: `/bracket${q}`, label: "Bracket", active: active === "bracket" },
    { id: "teams" as const, href: `/teams${q}`, label: "Teams", active: active === "teams" },
  ];
}
