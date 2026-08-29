import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} BCC Management. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-ink">
            Dashboard
          </Link>
          <Link href="/signin" className="hover:text-ink">
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
