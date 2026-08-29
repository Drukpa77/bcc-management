export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
      >
        <circle cx="16" cy="16" r="15" className="fill-amber" />
        <path
          d="M16 2.5c3.4 3.2 5.5 7.6 5.5 13.5S19.4 26.3 16 29.5C12.6 26.3 10.5 21.9 10.5 16S12.6 5.7 16 2.5Z"
          fill="none"
          className="stroke-ink"
          strokeWidth="1.35"
        />
        <path
          d="M3.2 11.2c8.2 2.2 17.4 2.2 25.6 0M3.2 20.8c8.2-2.2 17.4-2.2 25.6 0"
          fill="none"
          className="stroke-ink"
          strokeWidth="1.35"
        />
      </svg>
      <span className="leading-tight">
        <span className="block text-[11px] font-semibold tracking-[0.22em] uppercase">
          BCC
        </span>
        <span className="block text-sm font-medium tracking-tight">
          Basketball Federation
        </span>
      </span>
    </span>
  );
}
