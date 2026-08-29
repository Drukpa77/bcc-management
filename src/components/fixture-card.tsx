type Fixture = {
  id: string;
  competition: string;
  round: string;
  home: string;
  away: string;
  venue: string;
  date: string;
  time: string;
  status: string;
  homeScore?: number;
  awayScore?: number;
};

export function FixtureCard({ fixture }: { fixture: Fixture }) {
  const played = fixture.status === "Final";

  return (
    <article className="rounded-2xl border border-line bg-card p-5">
      <div className="flex items-center justify-between gap-3 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
        <span>
          {fixture.competition} · {fixture.round}
        </span>
        <span className={played ? "text-accent" : "text-amber"}>{fixture.status}</span>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <p className="font-display text-xl tracking-tight text-ink sm:text-2xl">
          {fixture.home}
        </p>
        <div className="min-w-[4.5rem] text-center">
          {played ? (
            <p className="font-display text-3xl tabular-nums text-ink">
              {fixture.homeScore}
              <span className="mx-1 text-muted">–</span>
              {fixture.awayScore}
            </p>
          ) : (
            <p className="text-sm font-medium text-muted">{fixture.time}</p>
          )}
        </div>
        <p className="text-right font-display text-xl tracking-tight text-ink sm:text-2xl">
          {fixture.away}
        </p>
      </div>
      <p className="mt-4 text-sm text-muted">
        {fixture.date} · {fixture.venue}
      </p>
    </article>
  );
}
