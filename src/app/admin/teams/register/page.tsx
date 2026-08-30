"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";

const roster = [
  { n: 4, name: "Dorji Tshewang", pos: "PG", age: 24, ht: "176 cm" },
  { n: 7, name: "Sangay Wangdi", pos: "SG", age: 22, ht: "181 cm" },
  { n: 11, name: "Tandin Norbu", pos: "SF", age: 26, ht: "185 cm" },
  { n: 23, name: "Phub Gyeltshen", pos: "PF", age: 25, ht: "189 cm" },
];

export default function RegisterTeamPage() {
  const [step, setStep] = useState(2);

  return (
    <AdminShell title="Register Team" active="/admin/teams/register">
      <div className="mb-3 flex items-center justify-center gap-2 text-[12px]">
        {[
          [1, "Team information"],
          [2, "Players"],
          [3, "Review & register"],
        ].map(([n, label]) => (
          <span key={n} className="flex items-center gap-1.5">
            <span className={`grid size-5 place-items-center rounded-full text-[11px] font-bold ${
              step > Number(n) ? "bg-ink text-gold" : step === n ? "bg-saffron text-white" : "border border-[#C9CDD6] text-[#8A909C]"
            }`}>{step > Number(n) ? "✓" : n}</span>
            <button type="button" onClick={() => setStep(Number(n))}>{label}</button>
          </span>
        ))}
      </div>
      {step === 1 ? (
        <div className="mx-auto max-w-md space-y-2 rounded-lg border border-line bg-white p-4">
          <label className="block text-[11px] font-bold uppercase">Team name<input className="mt-1 h-9 w-full rounded border border-[#C9CDD6] px-2" defaultValue="Gelephu Storm" /></label>
          <label className="block text-[11px] font-bold uppercase">Code<input className="mt-1 h-9 w-full rounded border border-[#C9CDD6] px-2" defaultValue="GLS" /></label>
          <button type="button" onClick={() => setStep(2)} className="rounded-[5px] bg-saffron px-3 py-1.5 text-[13px] font-semibold text-white">Continue to players →</button>
        </div>
      ) : null}
      {step === 2 ? (
        <div className="flex flex-col gap-2.5 lg:flex-row">
          <form className="w-full rounded-lg border border-line bg-white lg:w-[240px]">
            <div className="bg-[#F1EFE9] px-3 py-1.5 text-[11px] font-bold">ADD PLAYER</div>
            <div className="space-y-2 p-2.5 text-[12px]">
              <label className="block">Full name<input className="mt-0.5 h-8 w-full rounded border border-[#C9CDD6] px-2" defaultValue="Kinley Rabgay" /></label>
              <label className="block">Jersey #<input className="mt-0.5 h-8 w-full rounded border border-[#C9CDD6] px-2" defaultValue="9" /></label>
              <button type="button" className="w-full rounded-[5px] bg-ink-2 py-1.5 font-semibold text-white">＋ Add player to roster</button>
            </div>
          </form>
          <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-line bg-white">
            <div className="bg-[#F1EFE9] px-3 py-1.5 text-[11px] font-bold">GELEPHU STORM — ROSTER (7) · Min 8 · Max 15</div>
            <table className="w-full text-left text-[13px]">
              <thead><tr className="bg-ink text-[11px] text-[#AEB6C2]"><th className="px-2 py-1">#</th><th>Player</th><th>Pos</th><th>Age</th><th>Height</th></tr></thead>
              <tbody>
                {roster.map((p) => (
                  <tr key={p.n} className="border-t border-[#EEECE6]">
                    <td className="px-2 py-1 font-mono">{p.n}</td>
                    <td><b>{p.name}</b></td>
                    <td>{p.pos}</td>
                    <td>{p.age}</td>
                    <td>{p.ht}</td>
                  </tr>
                ))}
                <tr><td colSpan={5} className="bg-qualify px-2 py-1.5 text-center text-[12px] text-[#B3441A]">⚠ Add at least 1 more player to continue (8 minimum)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {step === 3 ? (
        <div className="rounded-lg border border-line bg-white p-4">
          <p className="font-display text-[17px] font-bold uppercase">Review & register</p>
          <p className="mt-1 text-[13px] text-muted">Gelephu Storm · 7 players on roster. Confirm to publish to the public site.</p>
          <button type="button" className="mt-3 rounded-[5px] bg-saffron px-3 py-1.5 text-[13px] font-semibold text-white">Register team</button>
        </div>
      ) : null}
      <div className="mt-3 flex justify-between">
        <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} className="rounded-[5px] border border-[#C9CDD6] bg-white px-3 py-1 text-[13px]">← Back</button>
        <button type="button" onClick={() => setStep((s) => Math.min(3, s + 1))} className="rounded-[5px] bg-saffron px-3 py-1 text-[13px] font-semibold text-white">Continue →</button>
      </div>
    </AdminShell>
  );
}
