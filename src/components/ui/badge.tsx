import type { ReactNode } from "react";
import type { MatchStatus } from "@/lib/types";

const styles = {
  live: "bg-live text-white",
  final: "bg-[#E4E7EC] text-[#4A5262]",
  upcoming: "border border-[#AEB6C2] bg-white text-[#5B6472]",
  postponed: "border border-[#F2DFAE] bg-[#FEF9EE] text-[#92400E]",
  cancelled: "bg-[#E4E7EC] text-[#4A5262]",
  registration: "bg-[#DCEBDD] text-[#276438]",
  done: "bg-ink text-gold",
} as const;

type BadgeTone = keyof typeof styles;

const labels: Record<BadgeTone, string> = {
  live: "LIVE",
  final: "FINAL",
  upcoming: "UPCOMING",
  postponed: "POSTPONED",
  cancelled: "CANCELLED",
  registration: "REGISTRATION OPEN",
  done: "COMPLETED",
};

type BadgeProps = {
  tone?: BadgeTone;
  status?: MatchStatus;
  children?: ReactNode;
  className?: string;
};

export function Badge({
  tone,
  status,
  children,
  className = "",
}: BadgeProps) {
  const resolved = tone ?? status ?? "upcoming";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] px-1.5 py-0.5 font-sans text-[10px] font-bold tracking-[0.12em] ${styles[resolved]} ${className}`}
    >
      {resolved === "live" ? (
        <span className="pulse-dot inline-block size-1.5 rounded-full bg-white" />
      ) : null}
      {children ?? labels[resolved]}
    </span>
  );
}
