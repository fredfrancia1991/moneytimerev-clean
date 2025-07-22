"use client";

import { Groupe, Mouvement } from "./types";

type Props = {
  mouvements: Mouvement[];
  selectedMonth: string;
  pourcentage: (val: number) => string;
  getCouleur: (val: number, cible: number) => string;
};

export default function RepartitionBudget({
  mouvements,
  selectedMonth,
  pourcentage,
  getCouleur,
}: Props) {
  const somme = (g: Groupe) =>
    mouvements
      .filter((m) => m.mois === selectedMonth && m.groupe === g)
      .reduce((sum, m) => sum + m.montant, 0);

  const besoins = somme("Besoins pour vivre");
  const loisirs = somme("Plaisirs et loisirs");
  const liberte = somme("Liberté financière");

  return (
    <div className="bg-white p-4 rounded shadow text-center space-y-2">
      <h3 className="font-semibold text-lg mb-2 flex items-center justify-center gap-1">
        Répartition des dépenses
        <span
          title="Comparaison entre vos dépenses réelles et les objectifs 50% Besoins / 30% Loisirs / 20% Liberté"
          className="cursor-help text-xs text-gray-400"
        >
          ℹ️
        </span>
      </h3>

      <p className={getCouleur(besoins, 50)}>
        Besoins : {besoins.toFixed(2)} € • {pourcentage(besoins)} % (objectif 50 %)
      </p>
      <p className={getCouleur(loisirs, 30)}>
        Loisirs : {loisirs.toFixed(2)} € • {pourcentage(loisirs)} % (objectif 30 %)
      </p>
      <p className={getCouleur(liberte, 20)}>
        Liberté : {liberte.toFixed(2)} € • {pourcentage(liberte)} % (objectif 20 %)
      </p>
    </div>
  );
}