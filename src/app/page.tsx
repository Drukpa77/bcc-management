import Link from "next/link";
import { FixtureCard } from "@/components/fixture-card";
import { competitions, fixtures, news } from "@/lib/federation";

const upcoming = fixtures.filter((game) => game.status === "Upcoming").slice(0, 2);

export default function Home() {
  return (
    <>
      <section className="hero-court text-card">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold tracking-[0.22em] text-amber uppercase">
            BCC Basketball Federation
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
            The game. The clubs.
            <span className="block text-amber">The national court.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-card/75">
            Competitions, licensing, and fixtures under one federation — for
            clubs, players, and officials across the country.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/fixtures"
              className="inline-flex h-12 items-center justify-center rounded-full bg-amber px-6 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              This weekend’s fixtures
            </Link>
            <Link
              href="/competitions"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-medium text-card transition-colors hover:bg-white/10"
            >
              View competitions
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
          <div>
            <p className="font-display text-5xl text-ink">48</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Affiliated clubs nationwide
            </p>
          </div>
          <div>
            <p className="font-display text-5xl text-ink">1,240</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Licensed players this season
            </p>
          </div>
          <div>
            <p className="font-display text-5xl text-ink">3</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              National competitions in play
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Upcoming tip-off
          </h2>
          <Link
            href="/fixtures"
            className="text-sm font-medium text-accent hover:underline"
          >
            All fixtures
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {upcoming.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Competitions
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {competitions.map((item) => (
              <Link
                key={item.slug}
                href="/competitions"
                className="rounded-2xl border border-line bg-background p-6 transition-colors hover:border-amber"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-amber uppercase">
                  {item.status}
                </p>
                <h3 className="mt-3 font-display text-2xl text-ink">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.blurb}</p>
                <p className="mt-4 text-sm text-muted">
                  {item.teams} teams · {item.season}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Federation news
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-line bg-card p-6"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                {item.date}
              </p>
              <h3 className="mt-3 text-lg font-medium leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
