// trigger build
"use client";
export const dynamic = "force-dynamic";


import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Offres() {
  return (
    <>
      <Header />
      <main className="bg-[#f4f6f7] text-[#2a2a2a] font-sans py-12 px-4 min-h-screen">
        <h1 className="text-center text-3xl font-bold text-[#187072] mb-10">
          Nos offres d’accompagnement
        </h1>

        <section className="flex flex-wrap justify-center gap-6 mb-12">
          <article className="bg-white rounded-2xl shadow-lg p-6 max-w-xs w-full relative hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-bold text-[#12544e] mb-4">Formule 3 mois</h2>
            <ul className="mb-4 space-y-2 text-base">
              <li>✔️ 3 rendez-vous individuels (1h/mois)</li>
              <li>✔️ Accès à l’outil pendant 6 mois</li>
              <li>✔️ Synthèse écrite après chaque séance</li>
            </ul>
            <div className="text-[#187072] font-medium text-base">49 €/mois</div>
            <div className="absolute -top-3 right-4 bg-[#187072] text-white px-3 py-1 text-sm rounded-full font-bold">Tarif solidaire disponible</div>
          </article>

          <article className="bg-white rounded-2xl shadow-lg p-6 max-w-xs w-full relative hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-bold text-[#12544e] mb-4">Formule 6 mois</h2>
            <ul className="mb-4 space-y-2 text-base">
              <li>✔️ 6 rendez-vous individuels (1h/mois)</li>
              <li>✔️ Accès à l’outil pendant 12 mois</li>
              <li>✔️ Synthèse écrite après chaque séance</li>
            </ul>
            <div className="text-[#187072] font-medium text-base">39 €/mois</div>
            <div className="absolute -top-3 right-4 bg-[#187072] text-white px-3 py-1 text-sm rounded-full font-bold">Tarif solidaire sur demande</div>
          </article>

          <article className="bg-white rounded-2xl shadow-lg p-6 max-w-xs w-full relative hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-bold text-[#12544e] mb-4">Cycle collectif « Solutions Budget »</h2>
            <ul className="mb-4 space-y-2 text-base">
              <li>✔️ 1 atelier collectif par semaine</li>
              <li>✔️ Partage d’astuces concrètes, motivation</li>
            </ul>
            <div className="text-[#187072] font-medium text-base">19 €/mois</div>
            <div className="absolute -top-3 right-4 bg-[#e0f0ef] text-[#12544e] px-3 py-1 text-sm rounded-full font-bold">Premier RDV offert</div>
          </article>
        </section>

        <section className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-[#12544e] text-center mb-6">
            Tableau récapitulatif
          </h3>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#e0f0ef] text-[#187072] font-bold">
                <tr>
                  <th className="p-3 border-b"> </th>
                  <th className="p-3 border-b">3 mois</th>
                  <th className="p-3 border-b">6 mois</th>
                  <th className="p-3 border-b">Collectif</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="p-3 border-b">RDV individuels mensuels</td>
                  <td className="p-3 border-b">✔️</td>
                  <td className="p-3 border-b">✔️</td>
                  <td className="p-3 border-b"></td>
                </tr>
                <tr className="text-center">
                  <td className="p-3 border-b">Synthèse écrite</td>
                  <td className="p-3 border-b">✔️</td>
                  <td className="p-3 border-b">✔️</td>
                  <td className="p-3 border-b"></td>
                </tr>
                <tr className="text-center">
                  <td className="p-3 border-b">Accès à l’outil Google Sheet</td>
                  <td className="p-3 border-b">6 mois</td>
                  <td className="p-3 border-b">12 mois</td>
                  <td className="p-3 border-b">Pendant le cycle</td>
                </tr>
                <tr className="text-center">
                  <td className="p-3 border-b">Tarif solidaire</td>
                  <td className="p-3 border-b">✔️</td>
                  <td className="p-3 border-b">✔️</td>
                  <td className="p-3 border-b"></td>
                </tr>
                <tr className="text-center">
                  <td className="p-3">Ateliers collectifs</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">✔️</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-[#555] mt-6 leading-relaxed">
            Premier rendez-vous offert pour choisir la formule adaptée.<br />
            L’outil MoneyTime Rev’ reste accessible après le suivi individuel.<br />
            Le tarif solidaire est réservé aux personnes en difficulté, sur simple demande.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
