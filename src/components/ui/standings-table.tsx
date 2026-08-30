import { TeamTile } from "@/components/ui/team-tile";
import type { StandingRow, Team } from "@/lib/types";

type StandingsTableProps = {
  title?: string;
  rows: StandingRow[];
  teams: Record<string, Team>;
  qualifyCount?: number;
  className?: string;
};

function pd(row: StandingRow) {
  return row.pf - row.pa;
}

function formatPd(value: number) {
  if (value > 0) return `+${value}`;
  if (value < 0) return `−${Math.abs(value)}`;
  return "0";
}

export function StandingsTable({
  title = "POOL",
  rows,
  teams,
  qualifyCount = 3,
  className = "",
}: StandingsTableProps) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-line bg-card ${className}`}>
      <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
        <thead>
          <tr className="bg-ink text-[#AEB6C2]">
            <th
              colSpan={2}
              className="px-2 py-1.5 font-display text-[13px] font-bold tracking-[0.15em] text-gold"
            >
              {title}
            </th>
            <th className="px-2 py-1.5 text-right text-[11px] font-bold tracking-[0.1em]">
              P
            </th>
            <th className="px-2 py-1.5 text-right text-[11px] font-bold tracking-[0.1em]">
              W
            </th>
            <th className="px-2 py-1.5 text-right text-[11px] font-bold tracking-[0.1em]">
              L
            </th>
            <th className="px-2 py-1.5 text-right text-[11px] font-bold tracking-[0.1em]">
              PF
            </th>
            <th className="px-2 py-1.5 text-right text-[11px] font-bold tracking-[0.1em]">
              PA
            </th>
            <th className="px-2 py-1.5 text-right text-[11px] font-bold tracking-[0.1em]">
              PD
            </th>
            <th className="px-2 py-1.5 text-right text-[11px] font-bold tracking-[0.1em]">
              PTS
            </th>
            <th className="px-2 py-1.5 text-right text-[11px] font-bold tracking-[0.1em]">
              FORM
            </th>
          </tr>
          <tr className="sr-only">
            <th>POS</th>
            <th>TEAM</th>
            <th>P</th>
            <th>W</th>
            <th>L</th>
            <th>PF</th>
            <th>PA</th>
            <th>PD</th>
            <th>PTS</th>
            <th>FORM</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const team = teams[row.teamId];
            const qualified = row.pos <= qualifyCount;
            const difference = pd(row);
            return (
              <tr
                key={row.teamId}
                className={qualified ? "bg-qualify" : "bg-card"}
              >
                <td
                  className={`w-6 px-2 py-1.5 text-right ${
                    qualified ? "shadow-[inset_3px_0_0_#E8611C]" : ""
                  }`}
                >
                  <span className="inline-block w-4 font-display text-[13px] font-bold">
                    {row.pos}
                  </span>
                </td>
                <td className="px-2 py-1.5">
                  <span className="flex items-center gap-2">
                    <TeamTile team={team} />
                    <span className={qualified ? "font-bold" : ""}>{team.name}</span>
                  </span>
                </td>
                <td className="px-2 py-1.5 text-right font-mono text-[12px] font-semibold">
                  {row.played}
                </td>
                <td className="px-2 py-1.5 text-right font-mono text-[12px] font-semibold">
                  {row.won}
                </td>
                <td className="px-2 py-1.5 text-right font-mono text-[12px] font-semibold">
                  {row.lost}
                </td>
                <td className="px-2 py-1.5 text-right font-mono text-[12px] font-semibold">
                  {row.pf}
                </td>
                <td className="px-2 py-1.5 text-right font-mono text-[12px] font-semibold">
                  {row.pa}
                </td>
                <td
                  className={`px-2 py-1.5 text-right font-mono text-[12px] font-semibold ${
                    difference > 0 ? "text-win" : difference < 0 ? "text-loss" : ""
                  }`}
                >
                  {formatPd(difference)}
                </td>
                <td className="px-2 py-1.5 text-right font-mono text-[12px] font-semibold">
                  {qualified ? <b>{row.pts}</b> : row.pts}
                </td>
                <td className="px-2 py-1.5">
                  <span className="flex justify-end gap-0.5">
                    {row.form.map((result, index) => (
                      <span
                        key={`${row.teamId}-${index}`}
                        className={`grid size-3 place-items-center rounded-[3px] text-[8px] font-bold ${
                          result === "W"
                            ? "bg-win text-white"
                            : "bg-[#E4E7EC] text-[#7A828F]"
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
