"use client";

import { useRef, useState } from "react";
import { readImageFile } from "@/lib/media";

export function ImageField({
  label,
  hint,
  value,
  onChange,
  variant = "square",
  fallback,
}: {
  label: string;
  hint?: string;
  value?: string;
  onChange: (next?: string) => void;
  variant?: "square" | "circle";
  fallback?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  async function takeFile(file?: File) {
    if (!file) {
      return;
    }
    setError("");
    try {
      onChange(await readImageFile(file, variant === "circle" ? 320 : 400));
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : "Could not read that image.");
    }
  }

  return (
    <div>
      <p className="text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase">{label}</p>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void takeFile(event.dataTransfer.files[0]);
        }}
        className={`mt-2 flex flex-col items-stretch gap-3 rounded-2xl border border-dashed px-3.5 py-3 transition min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-4 ${
          dragging ? "border-saffron bg-[#FFF6F0]" : "border-[#E0DCD2] bg-[#FBF9F5]"
        }`}
      >
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`relative grid size-[72px] shrink-0 place-items-center overflow-hidden bg-ink text-gold ${
            variant === "circle" ? "rounded-full" : "rounded-2xl"
          }`}
          aria-label={`Upload ${label.toLowerCase()}`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <span className="font-display text-[18px] font-extrabold">{fallback ?? "+"}</span>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-ink-2">{value ? "Photo added" : "Drop a photo or browse"}</p>
          <p className="mt-0.5 text-[12px] text-muted">{hint ?? "PNG or JPG. We’ll resize it automatically."}</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-gold"
            >
              {value ? "Replace" : "Upload"}
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => onChange(undefined)}
                className="rounded-full px-3 py-1 text-[11px] font-semibold text-loss hover:bg-[#FDECEC]"
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(event) => {
            void takeFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>
      {error ? <p className="mt-1.5 text-[12px] text-loss">{error}</p> : null}
    </div>
  );
}
