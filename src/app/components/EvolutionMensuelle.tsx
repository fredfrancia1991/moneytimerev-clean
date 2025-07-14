"use client";

import { Groupe, Mouvement } from "./types";

type Props = {
  mouvements: Mouvement[];
  filtreGroupe: Groupe | "Tous";
};

export default function EvolutionMensuelle({ mouvements, filtreGroupe }: Props) {
  const moisDisponibles = Array.from(new Set(mouvements.map((m) => m.mois))).sort();

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4 text-center flex items-center justify-center gap-1">
        Évolution mensuelle
        <span
          title="Suivi de vos revenus, dépenses et solde mois par mois"
          className="cursor-help text-xs text-gray-400"
        >
          ℹ️
        </span>
      </h2>
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
          {moisDisponibles.map((mois) => {
            const mouvementsDuMois = mouvements.filter((m) => m.mois === mois);
            const revenus = mouvementsDuMois
              .filter((m) => m.groupe === "Revenus")
              .reduce((acc, m) => acc + m.montant, 0);
            const depenses = mouvementsDuMois
              .filter(
                (m) =>
                  ["Besoins pour vivre", "Plaisirs et loisirs", "Liberté financière"].includes(m.groupe)
              )
              .reduce((acc, m) => acc + m.montant, 0);
            const solde = revenus - depenses;

            return (
              <tr key={mois} className="border-b">
                <td className="p-2">{mois}</td>
                <td className="p-2 text-right">{revenus.toFixed(2)} €</td>
                <td className="p-2 text-right">{depenses.toFixed(2)} €</td>
                <td className={`p-2 text-right ${solde >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {solde.toFixed(2)} €
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}