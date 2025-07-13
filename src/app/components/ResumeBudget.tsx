"use client";
import { Mouvement, Groupe } from "./types";

export default function ResumeBudget({
  mouvements,
}: {
  mouvements: Mouvement[];
}) {
  const somme = (g: Groupe) =>
    mouvements
      .filter(m => m.groupe === g)
      .reduce((sum, m) => sum + m.montant, 0);

  const revenu = somme("Revenus");
  const depenses = mouvements
    .filter(m => m.groupe !== "Revenus" && m.groupe !== "Ignoré")
    .reduce((sum, m) => sum + m.montant, 0);
  const solde = revenu - depenses;

  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Revenu</p>
        <p className="text-xl font-bold text-[#187072]">{revenu.toFixed(2)} €</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Solde</p>
        <p className="text-xl font-bold text-[#187072]">{solde.toFixed(2)} €</p>
      </div>
    </div>
  );
}
