import type { ReactNode } from "react";
import { AdminStoreProvider } from "@/components/admin/app-store-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminStoreProvider>{children}</AdminStoreProvider>;
}
