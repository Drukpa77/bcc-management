import type { Metadata } from "next";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { CourtArcs } from "@/components/brand/court-arcs";
import { DzongStripe } from "@/components/brand/dzong-stripe";
import { MountainSilhouette } from "@/components/brand/mountain-silhouette";
import { Logo } from "@/components/logo";

export const metadata: Metadata = { title: "Admin Login" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="relative grid min-h-full place-items-center overflow-hidden bg-[linear-gradient(120deg,#161B26_40%,#25304a)]">
      <CourtArcs />
      <MountainSilhouette />
      <form
        action={loginAction}
        className="relative w-[min(100%-2rem,320px)] overflow-hidden rounded-xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,.45)]"
      >
        <div className="absolute inset-x-0 top-0">
          <DzongStripe />
        </div>
        <div className="mt-2 mb-4 flex flex-col items-center gap-1">
          <Logo className="h-16 w-auto" priority />
          <b className="font-display text-[13px] tracking-[0.05em] uppercase">Tournament Admin</b>
          <span className="text-[11px] text-muted">Bhutanese Basketball Cup · Staff only</span>
        </div>
        {error ? (
          <p className="mb-2 rounded border border-[#F2C2C2] bg-[#FDECEC] px-2 py-1.5 text-center text-[12px] text-loss">
            Email or password is incorrect.
          </p>
        ) : null}
        <label className="block text-[11px] font-bold tracking-[0.1em] text-[#5B6472] uppercase">
          Email
          <input
            name="email"
            type="email"
            required
            defaultValue="admin@bhutanbasketball.bt"
            className="mt-1 h-9 w-full rounded-[5px] border border-[#C9CDD6] px-2.5 text-[13px] font-medium text-ink-2"
          />
        </label>
        <label className="mt-2 block text-[11px] font-bold tracking-[0.1em] text-[#5B6472] uppercase">
          Password
          <input
            name="password"
            type="password"
            required
            className="mt-1 h-9 w-full rounded-[5px] border border-[#C9CDD6] px-2.5 text-[13px]"
          />
        </label>
        <button
          type="submit"
          className="mt-4 flex h-9 w-full items-center justify-center rounded-[5px] bg-saffron text-[13px] font-semibold text-white shadow-[0_2px_6px_rgba(232,97,28,.35)]"
        >
          Sign in to Admin
        </button>
        <p className="mt-2 text-center text-[11px] text-muted">Secure area — staff accounts only</p>
        <p className="mt-2 text-center">
          <Link href="/" className="text-[11px] text-saffron">
            ← Public site
          </Link>
        </p>
      </form>
    </div>
  );
}
