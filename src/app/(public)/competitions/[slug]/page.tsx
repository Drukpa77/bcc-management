import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CompetitionHub } from "@/components/public/competition-hub";
import { loadPublicCompetition } from "@/lib/load-public-competition";

export const metadata: Metadata = { title: "Competition" };

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const initial = await loadPublicCompetition(slug);
  if (!initial.league || !initial.view || initial.league.id !== slug) {
    notFound();
  }

  return (
    <Suspense>
      <CompetitionHub initial={initial} />
    </Suspense>
  );
}
