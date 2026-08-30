import type { Metadata } from "next";
import { PoolsBoard } from "@/components/admin/pools-board";

export const metadata: Metadata = { title: "Pools" };

export default function AdminPoolsPage() {
  return <PoolsBoard />;
}
