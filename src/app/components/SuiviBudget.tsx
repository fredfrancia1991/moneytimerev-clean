"use client";
import { useState, useEffect } from "react";
import {
  Mouvement,
  Groupe,
  groupes,
} from "./types";
import FormulaireBudget from "./FormulaireBudget";
import TableauMouvements from "./TableauMouvements";
import ModalEdition from "./ModalEdition";
import RepartitionBudget from "./RepartitionBudget";
import EvolutionMensuelle from "./EvolutionMensuelle";
import ResumeBudget from "./ResumeBudget";

const STORAGE_KEY = "mouvements";

export default function SuiviBudget() {
  const moisActuel = new Date().toISOString().slice(0, 7);
  const [mouvements, setMouvements] = useState<Mouvement[]>([]);
  const [mois, setMois] = useState(moisActuel);
  const [filtre, setFiltre] = useState<Groupe | "Tous">("Tous");
  const [editing, setEditing] = useState<Mouvement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setMouvements(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mouvements));
  }, [mouvements]);

  const ajouter = (data: Omit<Mouvement, "id" | "mois">) => {
    const nouveau: Mouvement = { id: Date.now(), mois: moisActuel, ...data };
    setMouvements(m => [...m, nouveau]);
  };

  const mettreAJour = (id: number, data: Omit<Mouvement, "id" | "mois">) => {
    setMouvements(m => m.map(item => (item.id === id ? { ...item, ...data } : item)));
  };

  const supprimer = (id: number) => {
    setMouvements(m => m.filter(item => item.id !== id));
  };

  const mouvementsFiltrés = mouvements.filter(
    m =>
      m.mois === mois && (filtre === "Tous" || m.groupe === filtre)
  );

  return (
    <div className="space-y-8">
      <ResumeBudget mouvements={mouvementsFiltrés} />

      <div className="flex flex-wrap gap-4 justify-center">
        <input
          type="month"
          value={mois}
          onChange={e => setMois(e.target.value)}
          className="border rounded p-2"
        />
        <select
          value={filtre}
          onChange={e => setFiltre(e.target.value as Groupe | "Tous")}
          className="border rounded p-2"
        >
          <option value="Tous">Toutes catégories</option>
          {groupes.map(g => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <FormulaireBudget onSubmit={ajouter} />

      <TableauMouvements
        mouvements={mouvementsFiltrés}
        onEdit={m => setEditing(m)}
        onDelete={supprimer}
      />

      <RepartitionBudget mouvements={mouvementsFiltrés} />

      <EvolutionMensuelle mouvements={mouvements} />

      <ModalEdition open={!!editing} onClose={() => setEditing(null)}>
        {editing && (
          <FormulaireBudget
            initial={editing}
            onSubmit={data => {
              mettreAJour(editing.id, data);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        )}
      </ModalEdition>
    </div>
  );
}
