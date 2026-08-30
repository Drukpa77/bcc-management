"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import { useAppStore } from "@/components/admin/use-app-store";
import { findTeam } from "@/lib/app-store";

export function FixturesBoard() {
  const { store, ready } = useAppStore();

  if (!ready || !store) {
    return <p className="text-[13px] text-muted">Loading fixtures…</p>;
  }

  const league = store.leagues.find((item) => item.id === store.activeLeagueId) ?? store.leagues[0];
  const rows = league ? store.fixtures[league.id] ?? [] : [];

  return (
    <div>
      <div className="mb-3 text-[13px] text-muted">
        {rows.length
          ? `${rows.length} fixtures for ${league?.name}`
          : "No fixtures yet — generate them after the pool draw."}
      </div>
      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="bg-ink text-[11px] tracking-[0.1em] text-[#AEB6C2] uppercase">
            <tr>
              <th className="px-2 py-1.5">Date</th>
              <th>Time</th>
              <th>Team A</th>
              <th>Team B</th>
              <th>Venue</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((fixture) => {
              const home = findTeam(store, fixture.homeId);
              const away = findTeam(store, fixture.awayId);
              if (!home || !away) {
                return null;
              }
              return (
                <tr key={fixture.id} className="border-t border-[#EEECE6]">
                  <td className="px-2 py-1.5 font-mono">{fixture.dateLabel}</td>
                  <td className="font-mono">{fixture.time}</td>
                  <td>
                    <span className="flex items-center gap-1">
                      <TeamTile team={home} size="sm" />
                      <b>{home.shortName}</b>
                    </span>
                  </td>
                  <td>
                    <span className="flex items-center gap-1">
                      <TeamTile team={away} size="sm" />
                      <b>{away.shortName}</b>
                    </span>
                  </td>
                  <td>{fixture.venue}</td>
                  <td>
                    <Badge status={fixture.status} />
                  </td>
                  <td>
                    <Link href="/admin/results" className="text-saffron">
                      Enter result
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
