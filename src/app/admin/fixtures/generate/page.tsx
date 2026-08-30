import type { Metadata } from "next";
import { FixtureGeneratorPanel } from "@/components/admin/fixture-generator-panel";

export const metadata: Metadata = { title: "Fixture Generator" };

export default function FixtureGeneratorPage() {
  return <FixtureGeneratorPanel />;
}
