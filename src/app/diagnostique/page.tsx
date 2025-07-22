"use client";

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react";

export default function DiagnosticPage() {
  const [revenus, setRevenus] = useState("");
  const [besoins, setBesoins] = useState("");
  const [loisirs, setLoisirs] = useState("");
  const [projets, setProjets] = useState("");
  const [epargneDispo, setEpargneDispo] = useState("");
  const [resultat, setResultat] = useState<string | null>(null);

  const analyser = () => {
    const r = parseFloat(revenus);
    const b = parseFloat(besoins);
    const l = parseFloat(loisirs);
    const p = parseFloat(projets);
    const e = parseFloat(epargneDispo);

    if (isNaN(r) || isNaN(b) || isNaN(l) || isNaN(p) || isNaN(e) || r <= 0) {
      setResultat("Veuillez remplir tous les champs avec des valeurs valides.");
      return;
    }

    const total = b + l + p;
    const depassement = total > r;
    const reste = r - total;
    const seuilPrecaution = 3 * (b + l);

    let message = "";

    if (depassement) {
      message += "Votre budget semble actuellement en déséquilibre. Avec le coaching, on peut poser les choses ensemble et trouver des solutions durables. ";
    } else if (reste < r * 0.05) {
      message += "Votre situation paraît très serrée. Un accompagnement peut vous aider à faire le point et à retrouver un peu de respiration financière. ";
    } else {
      message += "Vous semblez garder une certaine stabilité. Avec l’accompagnement, vous pouvez affiner vos choix et sécuriser vos priorités. ";
    }

    if (b / r > 0.6) {
      message += "Les dépenses liées aux besoins sont prédominantes. Le coaching peut vous aider à y voir plus clair et à mieux piloter vos charges. ";
    }
    if (l / r < 0.1) {
      message += "La part accordée aux loisirs est très limitée. Ensemble, on peut réfléchir à comment réintroduire un peu de confort sans mettre en péril l’équilibre. ";
    }
    if (p / r < 0.1) {
      message += "L’épargne ou les remboursements semblent faibles. Nous pouvons explorer ensemble comment les renforcer progressivement. ";
    }

    if (!isNaN(e)) {
      if (e >= seuilPrecaution) {
        message += `Votre épargne actuelle couvre environ ${(e / (b + l)).toFixed(1)} mois de dépenses essentielles. C’est un socle rassurant pour faire face à l’imprévu.`;
      } else {
        message += `Votre épargne disponible représente environ ${(e / (b + l)).toFixed(1)} mois de dépenses essentielles. L’accompagnement peut vous aider à bâtir une épargne de précaution stable.`;
      }
    }

    setResultat(message.trim());
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F5F6FA] text-[#363945]">
      <Header />

      <div className="flex-1 py-20 px-6 max-w-3xl mx-auto space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#26436E]">
            Où va votre argent, vraiment ?
          </h1>
          <p className="text-gray-700 text-lg">
            Parfois, le déséquilibre ne vient pas de ce qu'on croit.<br />
            Voici une lecture simple pour faire le point.
          </p>
        </section>

        <section className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow space-y-2">
            <div className="text-3xl">💡</div>
            <h2 className="font-semibold text-[#26436E]">Besoins essentiels</h2>
            <p className="text-sm text-gray-600">
              Loyer, alimentation, énergie, transport… tout ce qui vous permet de vivre.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow space-y-2">
            <div className="text-3xl">🎉</div>
            <h2 className="font-semibold text-[#26436E]">Loisirs et confort</h2>
            <p className="text-sm text-gray-600">
              Abonnements, sorties, petits plaisirs. Pas indispensables, mais importants.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow space-y-2">
            <div className="text-3xl">🛡️</div>
            <h2 className="font-semibold text-[#26436E]">Épargne & remboursement de dettes</h2>
            <p className="text-sm text-gray-600">
              Ce que vous mettez de côté ou remboursez pour demain.
            </p>
          </div>
        </section>

        <section className="text-center space-y-6">
          <h2 className="text-2xl font-semibold text-[#26436E]">Aperçu de notre analyse</h2>
          <p className="text-gray-700 max-w-xl mx-auto">
            Remplissez ces quelques champs pour recevoir un aperçu rapide et humain de votre situation financière.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 max-w-lg mx-auto">
            <input
              type="number"
              placeholder="Revenus mensuels (€)"
              value={revenus}
              onChange={(e) => setRevenus(e.target.value)}
              className="p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Besoins essentiels (€)"
              value={besoins}
              onChange={(e) => setBesoins(e.target.value)}
              className="p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Loisirs et confort (€)"
              value={loisirs}
              onChange={(e) => setLoisirs(e.target.value)}
              className="p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Épargne & dettes (€)"
              value={projets}
              onChange={(e) => setProjets(e.target.value)}
              className="p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Épargne disponible (€)"
              value={epargneDispo}
              onChange={(e) => setEpargneDispo(e.target.value)}
              className="p-3 border rounded"
            />
          </div>

          <button
            onClick={analyser}
            className="mt-4 bg-[#187072] text-white px-6 py-3 rounded hover:bg-[#145d5f] transition"
          >
            Voir l’analyse
          </button>

          {resultat && (
            <div className="mt-8 bg-white border border-gray-200 rounded p-6 text-left text-gray-700 shadow">
              <h3 className="text-lg font-semibold text-[#26436E] mb-2">Résultat :</h3>
              <p>{resultat}</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}