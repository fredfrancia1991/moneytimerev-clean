"use client";

import { Groupe } from "./types";

type Props = {
  nom: string;
  montant: string;
  groupe: Groupe;
  onChangeNom: (val: string) => void;
  onChangeMontant: (val: string) => void;
  onChangeGroupe: (val: Groupe) => void;
  onSubmit: () => void;
  label?: string;
};

export default function FormulaireBudget({
  nom,
  montant,
  groupe,
  onChangeNom,
  onChangeMontant,
  onChangeGroupe,
  onSubmit,
  label = "Ajouter",
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div>
        <label className="font-medium">Nom</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => onChangeNom(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label className="font-medium">Montant (€)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={montant}
          onChange={(e) => onChangeMontant(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label className="font-medium">Catégorie</label>
        <select
          value={groupe}
          onChange={(e) => onChangeGroupe(e.target.value as Groupe)}
          className="border p-2 w-full rounded"
        >
          {["Revenus", "Besoins pour vivre", "Plaisirs et loisirs", "Liberté financière", "Ignoré"].map(
            (g) => (
              <option key={g} value={g}>
                {g}
              </option>
            )
          )}
        </select>
      </div>
      <button
        type="submit"
        className="bg-[#187072] text-white py-2 px-4 rounded w-full"
      >
        {label}
      </button>
    </form>
  );
}
