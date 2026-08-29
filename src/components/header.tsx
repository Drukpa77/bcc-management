import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/signin", label: "Sign in" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-[11px] font-semibold tracking-wide text-card">
            BCC
          </span>
          <span className="text-sm font-medium tracking-tight text-ink">
            Management
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted sm:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dashboard"
          className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-card transition-opacity hover:opacity-90 sm:inline-flex"
        >
          Open workspace
        </Link>
      </div>
    </header>
  );
}
