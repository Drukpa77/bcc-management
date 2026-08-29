import type { Metadata } from "next";
import { competitions } from "@/lib/federation";

export const metadata: Metadata = {
  title: "Competitions",
};

export default function CompetitionsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-14">
      <p className="text-sm font-semibold tracking-[0.22em] text-amber uppercase">
        Season 2026
      </p>
      <h1 className="mt-3 font-display text-5xl tracking-tight text-ink sm:text-6xl">
        Competitions
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        National leagues and cups administered by the federation — fixtures,
        standings, and club eligibility in one place.
      </p>

      <div className="mt-12 space-y-5">
        {competitions.map((item) => (
          <article
            key={item.slug}
            className="grid gap-6 rounded-2xl border border-line bg-card p-6 sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-amber uppercase">
                {item.status}
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink">{item.name}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                {item.blurb}
              </p>
            </div>
            <p className="text-sm text-muted">
              {item.teams} teams · {item.season} season
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
