"use client";
import { Mouvement } from "./types";

interface Props {
  mouvements: Mouvement[];
  onEdit: (m: Mouvement) => void;
  onDelete: (id: number) => void;
}

export default function TableauMouvements({
  mouvements,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className="w-full text-sm mt-8">
      <thead>
        <tr className="border-b">
          <th className="text-left p-2">Nom</th>
          <th className="text-right p-2">Montant</th>
          <th className="text-left p-2">Groupe</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {mouvements.map(m => (
          <tr key={m.id} className="border-b hover:bg-gray-50">
            <td className="p-2">{m.nom}</td>
            <td className="p-2 text-right">{m.montant.toFixed(2)} €</td>
            <td className="p-2">{m.groupe}</td>
            <td className="p-2 text-right space-x-2">
              <button
                onClick={() => onEdit(m)}
                className="px-2 py-1 text-xs bg-[#26436E] text-white rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(m.id)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded"
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
