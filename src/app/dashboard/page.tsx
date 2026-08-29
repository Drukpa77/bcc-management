import type { Metadata } from "next";
import { dashboardTasks, fixtures } from "@/lib/federation";

export const metadata: Metadata = {
  title: "Office",
};

const panels = [
  { label: "Pending licences", value: "14" },
  { label: "Match reports due", value: "3" },
  { label: "This weekend’s games", value: "8" },
];

export default function DashboardPage() {
  const nextGame = fixtures.find((game) => game.status === "Upcoming");

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.22em] text-amber uppercase">
            Federation office
          </p>
          <h1 className="mt-2 font-display text-5xl tracking-tight text-ink">
            Operations
          </h1>
        </div>
        <p className="text-sm text-muted">Saturday, 29 August 2026</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {panels.map((panel) => (
          <div
            key={panel.label}
            className="rounded-2xl border border-line bg-card p-5"
          >
            <p className="text-sm text-muted">{panel.label}</p>
            <p className="mt-2 font-display text-4xl text-ink">{panel.value}</p>
          </div>
        ))}
      </div>

      {nextGame ? (
        <section className="mt-8 rounded-2xl border border-line bg-ink p-6 text-card">
          <p className="text-xs font-semibold tracking-[0.16em] text-amber uppercase">
            Next headline fixture
          </p>
          <p className="mt-3 font-display text-3xl tracking-tight">
            {nextGame.home} vs {nextGame.away}
          </p>
          <p className="mt-2 text-sm text-card/70">
            {nextGame.date} · {nextGame.time} · {nextGame.venue}
          </p>
        </section>
      ) : null}

      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-card">
        <div className="border-b border-line px-5 py-4">
          <h2 className="text-sm font-medium text-ink">Office queue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-muted">
              <tr className="border-b border-line">
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="px-5 py-3 font-medium">Desk</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Due</th>
              </tr>
            </thead>
            <tbody>
              {dashboardTasks.map((row) => (
                <tr key={row.name} className="border-b border-line last:border-0">
                  <td className="px-5 py-4 text-ink">{row.name}</td>
                  <td className="px-5 py-4 text-muted">{row.owner}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs text-accent">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted">{row.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
