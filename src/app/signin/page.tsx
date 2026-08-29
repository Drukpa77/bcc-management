import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-line bg-card p-8">
        <h1 className="font-serif text-3xl tracking-tight text-ink">
          Sign in
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Access the BCC Management workspace with your organisation account.
        </p>
        <form className="mt-8 space-y-4">
          <label className="block text-sm">
            <span className="text-ink">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@organisation.com"
              className="mt-1.5 h-11 w-full rounded-lg border border-line bg-background px-3 text-ink outline-none placeholder:text-muted/70 focus:border-accent"
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-1.5 h-11 w-full rounded-lg border border-line bg-background px-3 text-ink outline-none placeholder:text-muted/70 focus:border-accent"
            />
          </label>
          <Link
            href="/dashboard"
            className="flex h-11 items-center justify-center rounded-full bg-ink text-sm font-medium text-card transition-opacity hover:opacity-90"
          >
            Continue
          </Link>
        </form>
      </div>
    </div>
  );
}
