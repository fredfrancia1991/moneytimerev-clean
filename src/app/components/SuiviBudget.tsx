"use client";

import { useState, useEffect } from "react";
import ResumeBudget from "./ResumeBudget";
import EvolutionMensuelle from "./EvolutionMensuelle";
import TableauMouvements from "./TableauMouvements";
import RepartitionBudget from "./RepartitionBudget";
import FormulaireBudget from "./FormulaireBudget";
import ModalEdition from "./ModalEdition";
import GraphiqueCamembert from "./GraphiqueCamembert";
import { Groupe, Mouvement } from "./types";

const groupes: Groupe[] = [
  "Revenus",
  "Besoins pour vivre",
  "Plaisirs et loisirs",
  "Liberté financière",
  "Ignoré",
];

const moisNoms = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const currentYear = new Date().getFullYear();
const annees = Array.from({ length: currentYear - 2025 + 1 }, (_, i) => (2025 + i).toString());

export default function SuiviBudget() {
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [mouvements, setMouvements] = useState<Mouvement[]>([]);
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("0");
  const [groupe, setGroupe] = useState<Groupe>("Revenus");
  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filtreGroupe, setFiltreGroupe] = useState<Groupe | "Tous">("Tous");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mouvements");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setMouvements(parsed);
        } catch (e) {
          console.error("Erreur parsing mouvements", e);
        }
      }
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("mouvements", JSON.stringify(mouvements));
    }
  }, [mouvements, mounted]);

  if (!mounted) return null;

  const ajouterMouvement = () => {
    const value = parseFloat(montant);
    if (!nom || isNaN(value) || value <= 0) return;

    if (editId !== null) {
      setMouvements((prev) =>
        prev.map((m) =>
          m.id === editId ? { ...m, nom, montant: value, groupe } : m
        )
      );
      setEditId(null);
      setShowModal(false);
    } else {
      const nouveau: Mouvement = {
        id: Date.now(),
        nom,
        montant: value,
        groupe,
        mois: selectedMonth,
      };
      setMouvements((prev) => [...prev, nouveau]);
    }

    setNom("");
    setMontant("0");
    setGroupe("Revenus");
  };

  const supprimerMouvement = (id: number) => {
    setMouvements((prev) => prev.filter((m) => m.id !== id));
  };

  const ouvrirEdition = (m: Mouvement) => {
    setNom(m.nom);
    setMontant(m.montant.toString());
    setGroupe(m.groupe);
    setEditId(m.id);
    setShowModal(true);
  };

  const fermerModal = () => {
    setShowModal(false);
    setNom("");
    setMontant("0");
    setGroupe("Revenus");
    setEditId(null);
  };

  const mouvementsFiltrés = mouvements.filter(
    (m) =>
      m.mois === selectedMonth &&
      (filtreGroupe === "Tous" || m.groupe === filtreGroupe)
  );

  const somme = (g: Groupe) =>
    mouvements
      .filter((m) => m.mois === selectedMonth && m.groupe === g)
      .reduce((sum, m) => sum + m.montant, 0);

  const revenu = somme("Revenus");
  const besoins = somme("Besoins pour vivre");
  const loisirs = somme("Plaisirs et loisirs");
  const liberte = somme("Liberté financière");
  const depenses = besoins + loisirs + liberte;
  const solde = revenu - depenses;

  const pourcentage = (val: number) =>
    revenu > 0 ? ((val / revenu) * 100).toFixed(1) : "0";

  const getCouleur = (val: number, cible: number) => {
    if (revenu === 0) return "text-gray-500";
    const pourcent = (val / revenu) * 100;
    if (pourcent > cible) return "text-red-600 font-semibold";
    if (Math.abs(pourcent - cible) <= 5) return "text-green-600 font-semibold";
    return "text-yellow-600 font-medium";
  };

  return (
    <div className="space-y-12 px-4 md:px-6 lg:px-0" id="top">

      <div className="grid md:grid-cols-2 gap-6">
        <ResumeBudget
          mouvements={mouvements}
          selectedMonth={selectedMonth}
          revenu={revenu}
          solde={solde}
        />
        <RepartitionBudget
          mouvements={mouvements}
          selectedMonth={selectedMonth}
          pourcentage={pourcentage}
          getCouleur={getCouleur}
        />
      </div>

      <GraphiqueCamembert besoins={besoins} loisirs={loisirs} liberte={liberte} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#26436E]">Mouvements du mois</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={filtreGroupe}
            onChange={(e) =>
              setFiltreGroupe(e.target.value as Groupe | "Tous")
            }
            className="border p-2 rounded"
          >
            <option value="Tous">Toutes les catégories</option>
            {groupes.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <select
            value={selectedMonth.split("-")[0]}
            onChange={(e) => setSelectedMonth(`${e.target.value}-${selectedMonth.split("-")[1]}`)}
            className="border p-2 rounded"
          >
            {annees.map((annee) => (
              <option key={annee} value={annee}>{annee}</option>
            ))}
          </select>

          <select
            value={selectedMonth.split("-")[1]}
            onChange={(e) => setSelectedMonth(`${selectedMonth.split("-")[0]}-${e.target.value}`)}
            className="border p-2 rounded"
          >
            {moisNoms.map((nom, i) => {
              const month = String(i + 1).padStart(2, "0");
              const year = parseInt(selectedMonth.split("-")[0]);
              const isFuture =
                year > currentYear ||
                (year === currentYear && i + 1 > new Date().getMonth() + 1);
              return isFuture ? null : (
                <option key={month} value={month}>{nom}</option>
              );
            })}
          </select>

          <button
            onClick={() => setFiltreGroupe("Tous")}
            className="text-sm text-gray-600 underline hover:text-gray-800"
          >
            Réinitialiser
          </button>
        </div>

        <TableauMouvements
          mouvements={mouvementsFiltrés}
          onEdit={ouvrirEdition}
          onDelete={supprimerMouvement}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#26436E]">Ajouter une opération</h2>
        <FormulaireBudget
          nom={nom}
          montant={montant}
          groupe={groupe}
          onChangeNom={setNom}
          onChangeMontant={setMontant}
          onChangeGroupe={setGroupe}
          onSubmit={ajouterMouvement}
          label={editId ? "Modifier" : "Ajouter"}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#26436E]">Évolution mensuelle</h2>
        <EvolutionMensuelle
          mouvements={mouvements}
          filtreGroupe={filtreGroupe}
        />
      </div>

      {showModal && (
        <ModalEdition
          nom={nom}
          montant={montant}
          groupe={groupe}
          onChangeNom={setNom}
          onChangeMontant={setMontant}
          onChangeGroupe={setGroupe}
          onSubmit={ajouterMouvement}
          onClose={fermerModal}
        />
      )}
    </div>
  );
}