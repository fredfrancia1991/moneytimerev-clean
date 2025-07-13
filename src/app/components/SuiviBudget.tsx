"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Mouvement {
  id: number;
  nom: string;
  montant: number;
  groupe: Groupe;
  mois: string; // YYYY-MM
}

type Groupe =
  | "Revenus"
  | "Besoins pour vivre"
  | "Plaisirs et loisirs"
  | "Liberté financière"
  | "Ignoré";

const groupes: Groupe[] = [
  "Revenus",
  "Besoins pour vivre",
  "Plaisirs et loisirs",
  "Liberté financière",
  "Ignoré",
];

export default function SuiviBudget() {
  const moisActuel = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState<string>(moisActuel);
  const [mouvements, setMouvements] = useState<Mouvement[]>([]);
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("0");
  const [groupe, setGroupe] = useState<Groupe>("Revenus");

  const ajouterMouvement = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(montant);
    if (!nom || isNaN(value) || value <= 0) return;

    const nouveau: Mouvement = {
      id: Date.now(),
      nom,
      montant: value,
      groupe,
      mois: moisActuel,
    };

    setMouvements((prev) => [...prev, nouveau]);
    setNom("");
    setMontant("0");
    setGroupe("Revenus");
  };

  const mouvementsFiltrés = mouvements.filter((m) => m.mois === selectedMonth);
  const somme = (g: Groupe) =>
    mouvementsFiltrés
      .filter((m) => m.groupe === g)
      .reduce((sum, m) => sum + m.montant, 0);

  const revenu = somme("Revenus");
  const besoins = somme("Besoins pour vivre");
  const loisirs = somme("Plaisirs et loisirs");
  const liberte = somme("Liberté financière");
  const depenses = besoins + loisirs + liberte;
  const solde = revenu - depenses;

  const data = {
    labels: ["Besoins", "Loisirs", "Liberté"],
    datasets: [
      {
        data: [besoins, loisirs, liberte],
        backgroundColor: ["#187072", "#26436E", "#E8F3FA"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Revenu</p>
          <p className="text-xl font-bold text-[#187072]">
            {revenu.toFixed(2)} €
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Solde</p>
          <p className="text-xl font-bold text-[#187072]">
            {solde.toFixed(2)} €
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Besoins pour vivre</p>
          <p className="text-lg font-semibold text-[#26436E]">
            {besoins.toFixed(2)} €
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Plaisirs et loisirs</p>
          <p className="text-lg font-semibold text-[#26436E]">
            {loisirs.toFixed(2)} €
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Liberté financière</p>
          <p className="text-lg font-semibold text-[#26436E]">
            {liberte.toFixed(2)} €
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto">
        <Pie data={data} />
      </div>

      <div className="flex justify-center">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      <form onSubmit={ajouterMouvement} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
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
            onChange={(e) => setMontant(e.target.value)}
            className="border rounded p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Groupe</label>
          <select
            value={groupe}
            onChange={(e) => setGroupe(e.target.value as Groupe)}
            className="border rounded p-2"
          >
            {groupes.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-[#187072] text-white py-2 px-4 rounded">
          Ajouter
        </button>
      </form>

      <table className="w-full text-sm mt-8">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Nom</th>
            <th className="text-right p-2">Montant</th>
            <th className="text-left p-2">Groupe</th>
          </tr>
        </thead>
        <tbody>
          {mouvementsFiltrés.map((m) => (
            <tr key={m.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{m.nom}</td>
              <td className="p-2 text-right">{m.montant.toFixed(2)} €</td>
              <td className="p-2">{m.groupe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

