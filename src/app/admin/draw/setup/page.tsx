import type { Metadata } from "next";
import { DrawSetupPanel } from "@/components/admin/draw-setup-panel";

export const metadata: Metadata = { title: "Pool Draw Setup" };

export default function DrawSetupPage() {
  return <DrawSetupPanel />;
}
