import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import { Badge } from "@/components/ui/badge";
import { competitions } from "@/lib/tournament";

export const metadata: Metadata = { title: "Competitions" };

export default function CompetitionsPage() {
  return (
    <>
      <PageHeader kicker="Season 2026" title="Competitions" mountains />
      <div className="mx-auto grid w-full max-w-[1120px] gap-3 px-4 py-5 sm:grid-cols-2 lg:grid-cols-3 md:px-5">
        {competitions.map((item) => (
          <article
            key={item.slug}
            className="rounded-lg border border-line bg-card p-3.5"
            style={{ borderTop: `3px solid ${item.color}` }}
          >
            <div className="flex items-center justify-between">
              <span
                className="grid size-11 place-items-center rounded-lg font-display text-lg text-white"
                style={{ background: item.color }}
              >
                🏆
              </span>
              <Badge tone={item.status} />
            </div>
            <h2 className="mt-2 font-display text-[17px] font-bold tracking-[0.03em] uppercase">
              {item.name}
            </h2>
            <p className="text-[12px] text-muted">{item.meta}</p>
            <div className="mt-2 flex items-center justify-between border-t border-[#EEECE6] pt-2">
              <span className="text-[12px] text-muted">{item.teams}</span>
              <Link
                href={item.href}
                className="rounded-[5px] border border-[#C9CDD6] bg-white px-2 py-0.5 text-[12px] font-semibold"
              >
                {item.status === "done" ? "Archive →" : "Open →"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
