import Link from "next/link";
import { Logo } from "@/components/logo";
import { publicNav } from "@/components/public/nav-links";

export function PublicFooter() {
  return (
    <footer className="pub-site-footer mt-auto bg-ink text-[#8B93A3]">
      <div className="pub-wrap grid gap-8 py-8 sm:py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-16 w-auto" />
          <p className="mt-3 font-display text-[18px] font-extrabold tracking-[0.06em] text-white uppercase">
            Bhutanese Basketball Cup
          </p>
          <p className="mt-2 max-w-sm text-[13px] leading-6">
            Official results of the Bhutanese Basketball Cup. Fixtures, tables, and the knockout
            bracket update from the same published scores.
          </p>
        </div>
        <div>
          <p className="font-display text-[11px] font-bold tracking-[0.2em] text-gold uppercase">Explore</p>
          <div className="mt-3 flex flex-col gap-1.5">
            {publicNav.map((link) => (
              <Link key={link.href} href={link.href} className="text-[13px] text-[#8B93A3] hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-display text-[11px] font-bold tracking-[0.2em] text-gold uppercase">Venue</p>
          <p className="mt-3 text-[13px] leading-6 text-white">Changlimithang Court</p>
          <p className="text-[13px]">Thimphu, Bhutan</p>
          <p className="mt-4 text-[12px]">Season 2026</p>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="pub-wrap flex items-center justify-between gap-3 py-3 text-[11px]">
          <span>© Bhutanese Basketball Cup 2026</span>
          <Link href="/admin/login" className="text-[#8B93A3] hover:text-white">
            Officials
          </Link>
        </div>
      </div>
    </footer>
  );
}
