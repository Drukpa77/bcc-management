import type { Metadata } from "next";
import { FixtureCard } from "@/components/fixture-card";
import { fixtures } from "@/lib/federation";

export const metadata: Metadata = {
  title: "Fixtures",
};

export default function FixturesPage() {
  const upcoming = fixtures.filter((game) => game.status === "Upcoming");
  const results = fixtures.filter((game) => game.status === "Final");

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-14">
      <p className="text-sm font-semibold tracking-[0.22em] text-amber uppercase">
        Calendar
      </p>
      <h1 className="mt-3 font-display text-5xl tracking-tight text-ink sm:text-6xl">
        Fixtures & results
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Official times and scores. Clubs enter match reports through the
        federation office after each tip-off.
      </p>

      <h2 className="mt-12 font-display text-3xl text-ink">This weekend</h2>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {upcoming.map((fixture) => (
          <FixtureCard key={fixture.id} fixture={fixture} />
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl text-ink">Latest results</h2>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {results.map((fixture) => (
          <FixtureCard key={fixture.id} fixture={fixture} />
        ))}
      </div>
    </div>
  );
}
