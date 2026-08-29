import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-card/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-card">
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-6 text-card/65">
            Governing competitions, clubs, and the game nationwide.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link href="/competitions" className="hover:text-card">
            Competitions
          </Link>
          <Link href="/clubs" className="hover:text-card">
            Clubs
          </Link>
          <Link href="/fixtures" className="hover:text-card">
            Fixtures
          </Link>
          <Link href="/dashboard" className="hover:text-card">
            Office
          </Link>
          <Link href="/signin" className="hover:text-card">
            Sign in
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-6 py-5 text-xs tracking-wide text-card/45">
          © {new Date().getFullYear()} BCC Basketball Federation. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
