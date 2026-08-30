"use client";

import { useEffect, type ButtonHTMLAttributes, type ReactNode } from "react";

export const fieldClass =
  "mt-1.5 h-11 w-full rounded-xl border border-[#E0DCD2] bg-[#FBF9F5] px-3.5 text-[14px] text-ink-2 outline-none transition placeholder:text-[#A8AFBD] focus:border-saffron focus:bg-white focus:ring-4 focus:ring-saffron/15";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase">
      {label}
      {children}
      {hint ? (
        <span className="mt-1.5 block text-[12px] font-medium tracking-normal text-muted normal-case">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-saffron text-white shadow-[0_8px_18px_rgba(232,97,28,0.22)] hover:bg-[#d45518]",
  secondary: "border border-[#D8D3C8] bg-white text-ink-2 hover:border-ink/20 hover:bg-paper",
  ghost: "text-[#5B6472] hover:bg-white hover:text-ink-2",
  danger: "border border-[#E8B4B4] bg-[#FDECEC] text-loss hover:bg-[#FAD4D4]",
};

export function AdminButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      {...props}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-semibold transition disabled:pointer-events-none disabled:opacity-50 ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Drawer({
  open,
  title,
  subtitle,
  onClose,
  footer,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="admin-overlay fixed inset-0 z-40 flex justify-end">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-[#161B26]/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="admin-drawer relative flex h-full w-full max-w-[420px] flex-col bg-white shadow-[-24px_0_60px_rgba(22,27,38,0.18)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#F0EEE8] px-6 py-5">
          <div>
            <p className="font-display text-[22px] font-extrabold tracking-[0.04em] uppercase">{title}</p>
            {subtitle ? <p className="mt-1 text-[13px] leading-relaxed text-muted">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full text-[#5B6472] hover:bg-paper"
            aria-label="Close panel"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer ? <div className="border-t border-[#F0EEE8] bg-[#FBF9F5] px-6 py-4">{footer}</div> : null}
      </aside>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  busyLabel,
  onConfirm,
  onCancel,
  busy,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  busyLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  busy?: boolean;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onCancel]);

  if (!open) {
    return null;
  }

  return (
    <div className="admin-overlay fixed inset-0 z-50 grid place-items-center p-4">
      <button type="button" aria-label="Cancel" className="absolute inset-0 bg-[#161B26]/45 backdrop-blur-[2px]" onClick={onCancel} />
      <div role="alertdialog" aria-modal="true" aria-label={title} className="admin-dialog relative w-full max-w-[400px] rounded-3xl bg-white p-6 shadow-[0_24px_60px_rgba(22,27,38,0.22)]">
        <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-[#FDECEC] text-loss">
          <TrashIcon />
        </div>
        <p className="font-display text-[22px] font-extrabold tracking-[0.04em] uppercase">{title}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">{body}</p>
        <div className="mt-6 flex justify-end gap-2">
          <AdminButton type="button" variant="secondary" onClick={onCancel} disabled={busy}>
            Keep
          </AdminButton>
          <AdminButton type="button" variant="danger" onClick={onConfirm} disabled={busy}>
            {busy ? (busyLabel ?? "Removing…") : confirmLabel}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}

export function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M10.6 3.2 14.8 7.4 6.4 15.8H2.2v-4.2L10.6 3.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m9 4.8 4.2 4.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function FlashBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 4200);
    return () => window.clearTimeout(timer);
  }, [onDismiss, message]);

  return (
    <div className="fixed right-5 bottom-5 z-50 max-w-sm rounded-2xl bg-ink px-4 py-3 text-[13px] leading-relaxed text-white shadow-[0_16px_40px_rgba(22,27,38,0.28)]">
      {message}
    </div>
  );
}

export function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.2 5h11.6M6.4 5V3.2h5.2V5M4.4 5l.8 10.2h7.6L13.6 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
