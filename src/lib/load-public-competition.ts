import { cookies } from "next/headers";
import { loadTournamentState } from "@/lib/tournament-state";
import { buildLeagueView } from "@/lib/tournament-engine";
import { PUBLIC_LEAGUE_COOKIE, type PublicCompetition } from "@/lib/public-league";

export async function loadPublicCompetition(requestedId?: string): Promise<PublicCompetition> {
  const store = await loadTournamentState();
  let id = requestedId;
  if (!id) {
    const jar = await cookies();
    id = jar.get(PUBLIC_LEAGUE_COOKIE)?.value || store.activeLeagueId || store.leagues[0]?.id;
  }
  const league = store.leagues.find((item) => item.id === id) ?? store.leagues[0];
  return {
    store,
    league,
    view: league ? buildLeagueView(store, league.id) : null,
  };
}
