import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-line bg-card p-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-amber uppercase">
          BCC Basketball Federation
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">
          Sign in
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          For club administrators, referees, and federation staff.
        </p>
        <form className="mt-8 space-y-4">
          <label className="block text-sm">
            <span className="text-ink">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@club.bcc"
              className="mt-1.5 h-11 w-full rounded-lg border border-line bg-background px-3 text-ink outline-none placeholder:text-muted/70 focus:border-amber"
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-1.5 h-11 w-full rounded-lg border border-line bg-background px-3 text-ink outline-none placeholder:text-muted/70 focus:border-amber"
            />
          </label>
          <Link
            href="/dashboard"
            className="flex h-11 items-center justify-center rounded-full bg-ink text-sm font-semibold text-card transition-opacity hover:opacity-90"
          >
            Continue to office
          </Link>
        </form>
      </div>
    </div>
  );
}
