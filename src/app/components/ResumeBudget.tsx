"use client";

import { Mouvement } from "./types";

type Props = {
  mouvements: Mouvement[];
  selectedMonth: string;
  revenu: number;
  solde: number;
};


export default function ResumeBudget({ revenu, solde }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
          Revenu
          <span
            title="Total des entrées (ex. : salaires, aides) enregistrées ce mois-ci"
            className="cursor-help text-xs text-gray-400"
          >
            ℹ️
          </span>
        </p>
        <p className="text-xl font-bold text-[#187072]">{revenu.toFixed(2)} €</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
          Solde
          <span
            title="Différence entre vos revenus et vos dépenses pour le mois"
            className="cursor-help text-xs text-gray-400"
          >
            ℹ️
          </span>
        </p>
        <p
          className={`text-xl font-bold ${
            solde >= 0 ? "text-[#187072]" : "text-red-600"
          }`}
        >
          {solde.toFixed(2)} €
        </p>
      </div>
    </div>
  );
}