import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="mt-auto flex items-center justify-between bg-ink px-4 py-3 text-[11px] text-[#7A828F] md:px-5">
      <span>© Bhutan Basketball Federation 2026</span>
      <span className="hidden sm:inline">Changlimithang Court · Thimphu</span>
      <Link href="/admin/login" className="text-[#7A828F] no-underline sm:hidden">
        Admin Login
      </Link>
    </footer>
  );
}
