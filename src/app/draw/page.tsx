import type { Metadata } from "next";
import { PresentationBoard } from "@/components/draw/presentation-board";

export const metadata: Metadata = { title: "Official Pool Draw" };

export default function DrawPresentationPage() {
  return <PresentationBoard />;
}
