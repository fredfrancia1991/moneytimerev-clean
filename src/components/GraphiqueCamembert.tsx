"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  besoins: number;
  loisirs: number;
  liberte: number;
};

export default function GraphiqueCamembert({ besoins, loisirs, liberte }: Props) {
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
    <div className="bg-white p-4 rounded shadow text-center">
      <h3 className="font-semibold mb-3 flex items-center justify-center gap-1">
        Répartition visuelle
        <span
          title="Visualisation graphique des dépenses par catégorie"
          className="cursor-help text-xs text-gray-400"
        >
          ℹ️
        </span>
      </h3>
      <div className="w-64 mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
}