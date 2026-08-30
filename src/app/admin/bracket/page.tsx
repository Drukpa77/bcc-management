import type { Metadata } from "next";
import { BracketBoard } from "@/components/admin/bracket-board";

export const metadata: Metadata = { title: "Bracket" };

export default function AdminBracketPage() {
  return <BracketBoard />;
}
