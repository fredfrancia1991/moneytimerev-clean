"use client";
import { Mouvement, Groupe } from "./types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RepartitionBudget({
  mouvements,
}: {
  mouvements: Mouvement[];
}) {
  const somme = (g: Groupe) =>
    mouvements
      .filter(m => m.groupe === g)
      .reduce((sum, m) => sum + m.montant, 0);

  const besoins = somme("Besoins pour vivre");
  const loisirs = somme("Plaisirs et loisirs");
  const liberte = somme("Liberté financière");

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
    <div className="max-w-sm mx-auto">
      <Pie data={data} />
    </div>
  );
}
