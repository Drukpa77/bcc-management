import type { ReactNode } from "react";
import Link from "next/link";

export function PubWrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`pub-wrap ${className}`}>{children}</div>;
}

export function SectionHeading({
  kicker,
  title,
  href,
  action,
}: {
  kicker?: string;
  title: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        {kicker ? (
          <p className="font-display text-[11px] font-bold tracking-[0.22em] text-saffron uppercase">{kicker}</p>
        ) : null}
        <h2 className="font-display text-[clamp(1.15rem,4.2vw,1.625rem)] leading-none font-extrabold tracking-[0.04em] uppercase">
          {title}
        </h2>
      </div>
      {href ? (
        <Link href={href} className="shrink-0 text-[13px] font-semibold text-saffron hover:text-ink">
          {action ?? "See all"}
        </Link>
      ) : null}
    </div>
  );
}

export function EmptyPanel({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="pub-card px-4 py-12 text-center sm:px-6 sm:py-16">
      <p className="font-display text-[clamp(1.15rem,5vw,1.375rem)] font-extrabold tracking-[0.04em] uppercase">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-muted">{copy}</p>
    </div>
  );
}

export function VsMark({ children = "VS" }: { children?: string }) {
  return <span className="vs-mark">{children}</span>;
}
