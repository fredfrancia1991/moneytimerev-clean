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
  onClose: () => void;
};

export default function ModalEdition({
  nom,
  montant,
  groupe,
  onChangeNom,
  onChangeMontant,
  onChangeGroupe,
  onSubmit,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold text-center">Modifier le mouvement</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-3"
        >
          <input
            type="text"
            value={nom}
            onChange={(e) => onChangeNom(e.target.value)}
            placeholder="Nom"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            step="0.01"
            min="0"
            value={montant}
            onChange={(e) => onChangeMontant(e.target.value)}
            placeholder="Montant"
            className="border p-2 w-full rounded"
            required
          />
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
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-[#187072] text-white px-4 py-2 rounded"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
