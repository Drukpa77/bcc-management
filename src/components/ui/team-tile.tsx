import type { Team } from "@/lib/types";

const sizes = {
  sm: "size-5 text-[7px]",
  md: "size-6 text-[8px]",
  lg: "size-11 text-[13px]",
  xl: "size-16 text-[19px]",
} as const;

type TeamTileProps = {
  team?: Pick<Team, "code" | "color">;
  code?: string;
  color?: string;
  size?: keyof typeof sizes;
  muted?: boolean;
};

export function TeamTile({
  team,
  code,
  color,
  size = "md",
  muted = false,
}: TeamTileProps) {
  const label = team?.code ?? code ?? "?";
  const fill = muted ? "#C3C9D2" : (team?.color ?? color ?? "#C3C9D2");

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-display font-bold text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.3)] ${sizes[size]} ${muted ? "text-[#6B7280]" : ""}`}
      style={{ background: fill }}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
