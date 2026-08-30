import type { ReactNode } from "react";
import { AdminChrome } from "@/components/admin/admin-shell";
import { AdminStoreProvider } from "@/components/admin/app-store-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminStoreProvider>
      <AdminChrome>{children}</AdminChrome>
    </AdminStoreProvider>
  );
}
