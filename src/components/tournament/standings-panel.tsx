import { StandingsTable } from "@/components/ui/standings-table";
import { qualificationCopy, type LeagueView } from "@/lib/tournament-engine";
import type { Qualification, StandingRow, Team } from "@/lib/types";

const mark: Record<Qualification, string> = {
  semi: "bg-gold",
  quarter: "bg-saffron",
  finalist: "bg-gold",
  out: "bg-[#D5D1C8]",
};

export function QualificationLegend({ format }: { format: "pools" | "round-robin" | "knockout" }) {
  const items: Qualification[] =
    format === "pools" ? ["semi", "quarter", "out"] : format === "round-robin" ? ["finalist", "out"] : ["out"];
  return (
    <div className="flex flex-wrap gap-3 text-[12px] text-muted">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-1.5">
          <i className={`size-2.5 rounded-full ${mark[item]}`} />
          {qualificationCopy(item).short}
        </span>
      ))}
    </div>
  );
}

export function StandingsPanel({
  title,
  rows,
  teams,
  format,
}: {
  title: string;
  rows: StandingRow[];
  teams: Record<string, Team>;
  format: LeagueView["league"]["format"];
}) {
  const qualifyCount = format === "pools" ? 3 : format === "round-robin" ? 2 : 0;
  return (
    <div className="space-y-3">
      <StandingsTable title={title} rows={rows} teams={teams} qualifyCount={qualifyCount} className="rounded-3xl" />
      <div className="grid gap-2 sm:grid-cols-2">
        {rows.map((row) => {
          const kind = row.qualification ?? "out";
          const team = teams[row.teamId];
          return (
            <div key={row.teamId} className="flex items-start gap-2 rounded-2xl bg-white px-3 py-2 ring-1 ring-[#E8E4DA]">
              <i className={`mt-1.5 size-2.5 shrink-0 rounded-full ${mark[kind]}`} />
              <div>
                <p className="text-[13px] font-semibold">
                  {row.pos}. {team?.name ?? row.teamId}
                </p>
                <p className="text-[12px] text-muted">{qualificationCopy(kind).long}</p>
                {row.rankReason ? <p className="mt-0.5 text-[11px] text-[#8A909C]">{row.rankReason}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
