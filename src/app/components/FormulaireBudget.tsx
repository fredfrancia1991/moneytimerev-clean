"use client";
import { useState } from "react";
import { Mouvement, Groupe, groupes } from "./types";

interface Props {
  initial?: Mouvement;
  onSubmit: (data: Omit<Mouvement, "id" | "mois">) => void;
  onCancel?: () => void;
}

export default function FormulaireBudget({ initial, onSubmit, onCancel }: Props) {
  const [nom, setNom] = useState(initial?.nom || "");
  const [montant, setMontant] = useState(initial ? String(initial.montant) : "0");
  const [groupe, setGroupe] = useState<Groupe>(initial?.groupe || "Revenus");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(montant);
    if (!nom || isNaN(value) || value <= 0) return;
    onSubmit({ nom, montant: value, groupe });
    if (!initial) {
      setNom("");
      setMontant("0");
      setGroupe("Revenus");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex flex-col">
        <label className="font-medium">Nom</label>
        <input
          type="text"
          value={nom}
          onChange={e => setNom(e.target.value)}
          className="border rounded p-2"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Montant</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={montant}
          onChange={e => setMontant(e.target.value)}
          className="border rounded p-2"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Groupe</label>
        <select
          value={groupe}
          onChange={e => setGroupe(e.target.value as Groupe)}
          className="border rounded p-2"
        >
          {groupes.map(g => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <div className="space-x-2">
        <button type="submit" className="bg-[#187072] text-white py-2 px-4 rounded">
          {initial ? "Enregistrer" : "Ajouter"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 border rounded"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
