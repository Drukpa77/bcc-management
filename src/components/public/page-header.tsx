import type { ReactNode } from "react";
import { MountainSilhouette } from "@/components/brand/mountain-silhouette";

type PageHeaderProps = {
  kicker: string;
  title: string;
  mountains?: boolean;
  children?: ReactNode;
};

export function PageHeader({
  kicker,
  title,
  mountains = false,
  children,
}: PageHeaderProps) {
  return (
    <div className="dhdr relative overflow-hidden bg-ink px-4 py-5 text-white md:px-5">
      {mountains ? <MountainSilhouette variant="compact" /> : null}
      <p className="relative font-display text-[11px] font-bold tracking-[0.22em] text-gold uppercase">
        {kicker}
      </p>
      <h1 className="relative mt-1 font-display text-[26px] leading-none font-extrabold tracking-[0.01em] uppercase md:text-[32px]">
        {title}
      </h1>
      {children}
    </div>
  );
}
