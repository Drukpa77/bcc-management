import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const work = [
  { name: "Q3 operations review", owner: "Tashi", status: "In review", due: "3 Sep" },
  { name: "Staff roster update", owner: "Pema", status: "In progress", due: "5 Sep" },
  { name: "Vendor contracts", owner: "Sonam", status: "Queued", due: "12 Sep" },
  { name: "Site visit notes", owner: "Kinley", status: "Complete", due: "28 Aug" },
];

const panels = [
  { label: "Open items", value: "18" },
  { label: "Due this week", value: "6" },
  { label: "People online", value: "9" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
            Workspace
          </p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight text-ink">
            Dashboard
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
            <p className="mt-2 font-serif text-4xl text-ink">{panel.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-card">
        <div className="border-b border-line px-5 py-4">
          <h2 className="text-sm font-medium text-ink">Current work</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-muted">
              <tr className="border-b border-line">
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="px-5 py-3 font-medium">Owner</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Due</th>
              </tr>
            </thead>
            <tbody>
              {work.map((row) => (
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
