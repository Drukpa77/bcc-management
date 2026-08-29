import type { Metadata } from "next";
import { clubs } from "@/lib/federation";

export const metadata: Metadata = {
  title: "Clubs",
};

export default function ClubsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-14">
      <p className="text-sm font-semibold tracking-[0.22em] text-amber uppercase">
        Affiliates
      </p>
      <h1 className="mt-3 font-display text-5xl tracking-tight text-ink sm:text-6xl">
        Member clubs
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Clubs licensed to compete in federation competitions. Affiliation
        covers player registration, officials, and home-court standards.
      </p>

      <div className="mt-12 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-background text-muted">
            <tr className="border-b border-line">
              <th className="px-5 py-3 font-medium">Club</th>
              <th className="px-5 py-3 font-medium">City</th>
              <th className="px-5 py-3 font-medium">Division</th>
              <th className="px-5 py-3 font-medium">Founded</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club.name} className="border-b border-line last:border-0">
                <td className="px-5 py-4 font-medium text-ink">{club.name}</td>
                <td className="px-5 py-4 text-muted">{club.city}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs text-accent">
                    {club.division}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted">{club.founded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
