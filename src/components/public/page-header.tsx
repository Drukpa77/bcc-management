import type { ReactNode } from "react";
import { CourtArcs } from "@/components/brand/court-arcs";
import { MountainSilhouette } from "@/components/brand/mountain-silhouette";
import { PubWrap } from "@/components/public/public-primitives";

type PageHeaderProps = {
  kicker: string;
  title: string;
  mountains?: boolean;
  children?: ReactNode;
};

export function PageHeader({
  kicker,
  title,
  mountains = true,
  children,
}: PageHeaderProps) {
  return (
    <div className="pub-hero px-0 pt-6 pb-7 text-white sm:pt-8 sm:pb-8 md:pt-10 md:pb-9">
      <span className="pub-grain" />
      <CourtArcs />
      {mountains ? <MountainSilhouette /> : null}
      <PubWrap className="relative">
        <p className="font-display text-[11px] font-bold tracking-[0.24em] text-gold uppercase">{kicker}</p>
        <h1 className="pub-page-title mt-2">
          {title}
        </h1>
        <div className="pub-rule mt-4" />
        {children}
      </PubWrap>
    </div>
  );
}
