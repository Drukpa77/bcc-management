import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Settings" active="/admin/settings">
      <div className="max-w-lg space-y-3 rounded-lg border border-line bg-white p-4">
        <label className="block text-[11px] font-bold tracking-[0.1em] uppercase">
          Organisation name
          <input className="mt-1 h-9 w-full rounded border border-[#C9CDD6] px-2 text-[13px]" defaultValue="Bhutanese Basketball Cup" />
        </label>
        <label className="block text-[11px] font-bold tracking-[0.1em] uppercase">
          Default venue
          <input className="mt-1 h-9 w-full rounded border border-[#C9CDD6] px-2 text-[13px]" defaultValue="Changlimithang Court, Thimphu" />
        </label>
        <button type="button" className="rounded-[5px] bg-saffron px-3 py-1.5 text-[13px] font-semibold text-white">
          Save settings
        </button>
      </div>
    </AdminShell>
  );
}
