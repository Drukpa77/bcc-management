import type { Team } from "@/lib/types";

type DrawWheelProps = {
  teams: Team[];
  rotation: number;
  spinning: boolean;
  hub: string;
  sizeClass?: string;
  labelRadius: number;
};

export function DrawWheel({
  teams,
  rotation,
  spinning,
  hub,
  sizeClass = "size-[190px]",
  labelRadius,
}: DrawWheelProps) {
  const count = Math.max(teams.length, 1);
  const slice = 360 / count;
  const gradient = teams.length
    ? `conic-gradient(${teams
        .map((team, index) => `${team.color} ${index * slice}deg ${(index + 1) * slice}deg`)
        .join(",")})`
    : "#2A3244";

  return (
    <div className={`wheel ${sizeClass}`}>
      <div
        className={`wheel-face ${spinning ? "wheel-spinning" : ""}`}
        style={{ background: gradient, transform: `rotate(${rotation}deg)` }}
      >
        {teams.map((team, index) => {
          const angle = (index + 0.5) * slice;
          return (
            <span
              key={team.id}
              className="absolute top-1/2 left-1/2 text-[8px] font-bold text-white drop-shadow"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${labelRadius}px)`,
              }}
            >
              {team.code}
            </span>
          );
        })}
      </div>
      <span className="ptr" />
      <span className="hub z-[3]">{hub}</span>
    </div>
  );
}
