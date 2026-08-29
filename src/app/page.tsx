import Link from "next/link";

const capabilities = [
  {
    title: "Operations",
    body: "Track work across teams, keep status visible, and close the loop without extra tools.",
  },
  {
    title: "People",
    body: "A single view of roles, availability, and the work each person is responsible for.",
  },
  {
    title: "Projects",
    body: "Plan, assign, and review progress from intake through delivery in one workspace.",
  },
];

const stats = [
  { value: "1", label: "workspace for the whole organisation" },
  { value: "Live", label: "status instead of scattered updates" },
  { value: "Clear", label: "ownership on every piece of work" },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
        <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
          BCC Management
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.1] tracking-tight text-ink sm:text-7xl">
          Run the organisation from one calm workspace.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          Plan work, see who owns it, and keep operations moving — without
          jumping between spreadsheets, chats, and inboxes.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-card transition-opacity hover:opacity-90"
          >
            View dashboard
          </Link>
          <Link
            href="/signin"
            className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-card px-6 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
          >
            Sign in
          </Link>
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl text-ink">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
          Built for how teams actually work
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-line bg-card p-6"
            >
              <h3 className="text-lg font-medium text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
