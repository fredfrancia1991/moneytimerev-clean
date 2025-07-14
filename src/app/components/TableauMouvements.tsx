"use client";

import { Mouvement } from "./types";

type Props = {
  mouvements: Mouvement[];
  onEdit: (m: Mouvement) => void;
  onDelete: (id: number) => void;
};

export default function TableauMouvements({ mouvements, onEdit, onDelete }: Props) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b bg-gray-50">
          <th className="text-left p-2">Nom</th>
          <th className="text-right p-2">Montant</th>
          <th className="text-left p-2">Catégorie</th>
          <th className="text-right p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {mouvements.map((m) => (
          <tr key={m.id} className="border-b hover:bg-gray-50">
            <td className="p-2">{m.nom}</td>
            <td className="p-2 text-right">{m.montant.toFixed(2)} €</td>
            <td className="p-2">{m.groupe}</td>
            <td className="p-2 text-right space-x-2">
              <button
                onClick={() => onEdit(m)}
                className="text-blue-600 hover:underline"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(m.id)}
                className="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
