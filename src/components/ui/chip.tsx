import type { ReactNode } from "react";
import Link from "next/link";

type ChipProps = {
  href?: string;
  active?: boolean;
  live?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export function Chip({ href, active, live, onClick, children }: ChipProps) {
  const className = `inline-flex rounded-full border px-2.5 py-0.5 text-[12px] font-semibold whitespace-nowrap ${
    live
      ? "border-live text-live"
      : active
        ? "border-ink bg-ink text-gold"
        : "border-[#C9CDD6] bg-white text-[#4A5262]"
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return <span className={className}>{children}</span>;
}
