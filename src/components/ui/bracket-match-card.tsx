import { Badge } from "@/components/ui/badge";
import { TeamTile } from "@/components/ui/team-tile";
import type { BracketEntrant, BracketMatch, Team } from "@/lib/types";

type BracketMatchCardProps = {
  match: BracketMatch;
  teams: Record<string, Team>;
  className?: string;
};

function scoreColor(match: BracketMatch, side: BracketEntrant) {
  if (match.status === "live" && side.outcome === "win") return "text-live";
  if (side.outcome === "win") return "text-saffron";
  return "";
}

function SideRow({
  side,
  teams,
  match,
}: {
  side: BracketEntrant;
  teams: Record<string, Team>;
  match: BracketMatch;
}) {
  const team = side.teamId ? teams[side.teamId] : undefined;
  const muted = !team || side.outcome === "tbd" || side.outcome === "lose";

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1.5 text-[13px] ${
        side.outcome === "win" ? "font-bold" : ""
      } ${side.outcome === "lose" || side.outcome === "tbd" ? "text-[#98A0AC]" : ""}`}
    >
      <TeamTile
        team={team}
        code={team?.code ?? "?"}
        muted={!team}
        size="sm"
      />
      <span className="min-w-0 truncate">
        {team?.name ?? side.placeholder ?? "TBD"}
      </span>
      <span
        className={`ml-auto font-mono text-[13px] font-bold ${
          side.score == null ? "text-muted" : scoreColor(match, side)
        }`}
      >
        {side.score ?? "–"}
      </span>
    </div>
  );
}

export function BracketMatchCard({
  match,
  teams,
  className = "",
}: BracketMatchCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-[7px] border bg-card text-[13px] ${
        match.featured
          ? "border-2 border-gold shadow-[0_4px_14px_rgba(240,180,41,0.3)]"
          : "border-line"
      } ${className}`}
    >
      <div
        className={`flex items-center justify-between px-2 py-1 text-[10px] font-bold tracking-[0.12em] ${
          match.featured ? "bg-ink text-gold" : "bg-[#F1EFE9] text-[#6B7280]"
        }`}
      >
        <span>{match.label}</span>
        <Badge status={match.status} />
      </div>
      <SideRow side={match.home} teams={teams} match={match} />
      <div className="border-t border-[#F1EFE9]">
        <SideRow side={match.away} teams={teams} match={match} />
      </div>
      {match.meta ? (
        <div className="border-t border-[#F1EFE9] bg-card px-2 py-1 text-[10px] font-bold tracking-[0.12em] text-[#6B7280]">
          {match.meta}
        </div>
      ) : null}
    </article>
  );
}
