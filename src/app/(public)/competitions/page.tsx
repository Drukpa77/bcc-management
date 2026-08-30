import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import { PubWrap } from "@/components/public/public-primitives";
import { Badge } from "@/components/ui/badge";
import { FORMAT_LABEL } from "@/lib/app-store";
import { loadTournamentState } from "@/lib/tournament-state";

export const metadata: Metadata = { title: "Competitions" };

const colors = ["#E8611C", "#A2335C", "#2E5EAA", "#3E8E5A", "#C98A12", "#5B6472"];

export default async function CompetitionsPage() {
  const state = await loadTournamentState();

  return (
    <>
      <PageHeader kicker="Season 2026" title="Competitions">
        <p className="mt-3 max-w-lg text-[14px] text-nav-muted">
          Every national window on the Bhutanese Basketball Cup calendar, from the men’s championship to the women’s table.
        </p>
      </PageHeader>
      <PubWrap className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-3 md:py-10">
        {state.leagues.map((league, index) => (
          <article key={league.id} className="pub-card flex flex-col p-5" style={{ borderTop: `4px solid ${colors[index % colors.length]}` }}>
            <div className="flex items-start justify-between gap-3">
              <span
                className="grid size-12 place-items-center rounded-2xl font-display text-xl font-extrabold text-white"
                style={{ background: colors[index % colors.length] }}
              >
                {league.name.slice(0, 1)}
              </span>
              <Badge tone={league.status} />
            </div>
            <h2 className="mt-4 font-display text-[22px] leading-tight font-extrabold tracking-[0.03em] uppercase">
              {league.name}
            </h2>
            <p className="mt-1 text-[13px] text-muted">
              {league.season} · {league.gender} · {FORMAT_LABEL[league.format]}
            </p>
            <p className="mt-1 text-[13px] text-muted">{league.location}</p>
            <div className="mt-auto flex items-center justify-between border-t border-[#EEECE6] pt-3">
              <span className="text-[13px] font-semibold">{league.teamIds.length} teams</span>
              <Link
                href={`/competitions/${league.id}`}
                className="rounded-full bg-ink px-3 py-1 text-[12px] font-semibold text-gold"
              >
                Open
              </Link>
            </div>
          </article>
        ))}
      </PubWrap>
    </>
  );
}
