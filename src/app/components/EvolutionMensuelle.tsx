"use client";
import { useState } from "react";
import { Mouvement, Groupe } from "./types";
import RepartitionBudget from "./RepartitionBudget";

export default function EvolutionMensuelle({
  mouvements,
}: {
  mouvements: Mouvement[];
}) {
  const months = Array.from(new Set(mouvements.map(m => m.mois))).sort();
  const [selected, setSelected] = useState(months[months.length - 1] || "");

  const filterMonth = (mois: string) =>
    mouvements.filter(m => m.mois === mois);

  const resume = (mois: string) => {
    const list = filterMonth(mois);
    const revenu = list
      .filter(m => m.groupe === "Revenus")
      .reduce((s, m) => s + m.montant, 0);
    const dep = list
      .filter(m => m.groupe !== "Revenus" && m.groupe !== "Ignoré")
      .reduce((s, m) => s + m.montant, 0);
    return { revenu, dep, solde: revenu - dep };
  };

  return (
    <div className="space-y-4">
      {months.length > 0 && (
        <div className="flex justify-center">
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            className="border rounded p-2"
          >
            {months.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      )}

      <RepartitionBudget mouvements={filterMonth(selected)} />

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Mois</th>
            <th className="text-right p-2">Revenus</th>
            <th className="text-right p-2">Dépenses</th>
            <th className="text-right p-2">Solde</th>
          </tr>
        </thead>
        <tbody>
          {months.map(m => {
            const r = resume(m);
            return (
              <tr key={m} className="border-b hover:bg-gray-50">
                <td className="p-2">{m}</td>
                <td className="p-2 text-right">{r.revenu.toFixed(2)} €</td>
                <td className="p-2 text-right">{r.dep.toFixed(2)} €</td>
                <td className="p-2 text-right">{r.solde.toFixed(2)} €</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
