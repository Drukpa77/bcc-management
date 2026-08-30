"use client";

import Link from "next/link";
import { useAppStore } from "@/components/admin/use-app-store";
import { generateFixturesAction, setActiveLeagueAction } from "@/app/actions/tournament";
import { FORMAT_LABEL, buildFixtures, findTeam, getDraw, pairCount } from "@/lib/app-store";

export function FixtureGeneratorPanel() {
  const { store, ready, run } = useAppStore();

  if (!ready || !store) {
    return <p className="text-[13px] text-muted">Loading generator…</p>;
  }

  const league = store.leagues.find((item) => item.id === store.activeLeagueId) ?? store.leagues[0];
  if (!league) {
    return <p className="text-[13px] text-muted">Create a league first.</p>;
  }

  const draw = getDraw(store, league.id);
  const preview = store.fixtures[league.id] ?? buildFixtures(store, league.id) ?? [];
  const canGenerate =
    (league.format === "pools" && draw.status === "confirmed") ||
    (league.format === "round-robin" && league.teamIds.length >= 2);
  const poolAGames = pairCount(draw.poolA.length);
  const poolBGames = pairCount(draw.poolB.length);

  return (
    <div className="flex flex-col gap-2.5 lg:flex-row">
      <div className="w-full rounded-lg border border-line bg-white lg:w-[220px]">
        <div className="bg-[#F1EFE9] px-3 py-1.5 text-[11px] font-bold">GENERATION PLAN</div>
        <div className="space-y-1 p-2.5 text-[12px]">
          <label className="block">
            <span className="text-muted">League</span>
            <select
              className="mt-0.5 h-8 w-full rounded border border-[#C9CDD6] px-2"
              value={league.id}
              onChange={(event) => void run(() => setActiveLeagueAction(event.target.value))}
            >
              {store.leagues.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex justify-between">
            <span className="text-muted">Format</span>
            <b>{FORMAT_LABEL[league.format]}</b>
          </div>
          {league.format === "pools" ? (
            <>
              <div className="flex justify-between">
                <span className="text-muted">Pool A RR</span>
                <b className="font-mono">{poolAGames} games</b>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Pool B RR</span>
                <b className="font-mono">{poolBGames} games</b>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Playoffs</span>
                <b className="font-mono">5 reserved</b>
              </div>
            </>
          ) : (
            <div className="flex justify-between">
              <span className="text-muted">Round robin</span>
              <b className="font-mono">{pairCount(league.teamIds.length)} games</b>
            </div>
          )}
          <button
            type="button"
            disabled={!canGenerate}
            onClick={() => void run(() => generateFixturesAction(league.id))}
            className="mt-2 w-full rounded-[5px] bg-saffron py-1.5 font-semibold text-white disabled:opacity-50"
          >
            ⚡ GENERATE FIXTURES
          </button>
          {!canGenerate && league.format === "pools" ? (
            <p className="text-[11px] text-muted">
              Confirm the pool draw first.{" "}
              <Link href="/admin/draw/setup" className="text-saffron">
                Open draw
              </Link>
            </p>
          ) : null}
        </div>
      </div>
      <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-line bg-white">
        <div className="bg-[#F1EFE9] px-3 py-1.5 text-[11px] font-bold">
          PREVIEW — {preview.length} FIXTURES
          {league.format === "pools" ? " · progression locked" : ""}
        </div>
        {preview.length === 0 ? (
          <p className="p-3 text-[13px] text-muted">No fixtures to preview yet.</p>
        ) : (
          <table className="w-full text-left text-[13px]">
            <thead className="bg-ink text-[11px] text-[#AEB6C2]">
              <tr>
                <th className="px-2 py-1">RD</th>
                <th>Date · Time</th>
                <th>Match</th>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((fixture) => {
                const home = findTeam(store, fixture.homeId);
                const away = findTeam(store, fixture.awayId);
                return (
                  <tr key={fixture.id} className="border-t border-[#EEECE6]">
                    <td className="px-2 py-1">{fixture.group.split("·").pop()?.trim()}</td>
                    <td>
                      {fixture.dateLabel} · {fixture.time}
                    </td>
                    <td>
                      <b>
                        {home?.shortName ?? "TBD"} v {away?.shortName ?? "TBD"}
                      </b>
                    </td>
                    <td>{fixture.group.includes("Pool B") ? "B" : fixture.group.includes("Pool A") ? "A" : "—"}</td>
                  </tr>
                );
              })}
              {league.format === "pools" ? (
                <>
                  <tr className="bg-qualify">
                    <td className="px-2 py-1">
                      <b>QF1</b>
                    </td>
                    <td>Sat 20 · 10:00</td>
                    <td>
                      <b>A #2 v B #3</b> <span className="text-muted">🔒 auto</span>
                    </td>
                    <td>—</td>
                  </tr>
                  <tr className="bg-qualify">
                    <td className="px-2 py-1">
                      <b>SF1</b>
                    </td>
                    <td>Wed 23 · 17:00</td>
                    <td>
                      <b>A #1 v QF2 winner</b> <span className="text-muted">🔒</span>
                    </td>
                    <td>—</td>
                  </tr>
                  <tr className="bg-qualify">
                    <td className="px-2 py-1">
                      <b>F</b>
                    </td>
                    <td>Sat 26 · 18:00</td>
                    <td>
                      <b>SF1 w v SF2 w</b> <span className="text-muted">🔒</span>
                    </td>
                    <td>—</td>
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
