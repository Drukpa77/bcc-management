import type { Metadata } from "next";
import { LiveDrawRoom } from "@/components/admin/live-draw-room";

export const metadata: Metadata = { title: "Live Pool Draw" };

export default function LiveDrawPage() {
  return <LiveDrawRoom />;
}
