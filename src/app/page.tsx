'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-24 space-y-24 px-6 pb-16 max-w-4xl mx-auto text-gray-900">
        {/* 🏠 Accueil */}
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur MoneyTime Rev’</h1>
          <p className="text-lg mb-6">
            Ta méthode simple et concrète pour reprendre le contrôle de tes finances personnelles avec la règle des 50/30/20.
          </p>
          <a href="#contact" className="inline-block bg-[#187072] text-white px-6 py-3 rounded hover:bg-[#145c5c] transition">
            Prendre contact
          </a>
        </section>

        {/* 📊 Section Méthode */}
        <section id="methode">
          <h2 className="text-2xl font-bold mb-4 text-[#26436E]">La méthode 50 / 30 / 20</h2>
          <p className="mb-6">
            Une répartition simple :
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>50 %</strong> pour tes besoins essentiels (loyer, alimentation, transport...)</li>
            <li><strong>30 %</strong> pour tes envies (loisirs, sorties, abonnements…)</li>
            <li><strong>20 %</strong> pour tes objectifs (épargne, remboursement, projets…)</li>
          </ul>
        </section>

        {/* 💬 Section Coaching */}
        <section id="coaching">
          <h2 className="text-2xl font-bold mb-4 text-[#26436E]">Coaching personnalisé</h2>
          <p className="mb-4">
            Je t’accompagne étape par étape pour adapter cette méthode à ta réalité, te fixer des objectifs clairs, et suivre tes résultats chaque mois.
          </p>
          <p className="mb-6">
            Disponible à la séance ou en suivi mensuel, selon tes besoins.
          </p>
          <a href="/diagnostique" className="inline-block bg-[#26436E] text-white px-6 py-3 rounded hover:bg-[#1e3456] transition">
            Faire le diagnostic gratuit
          </a>
        </section>

        {/* 📬 Section Contact */}
        <section id="contact">
          <h2 className="text-2xl font-bold mb-4 text-[#26436E]">Contact</h2>
          <p className="mb-4">Tu veux en savoir plus ou démarrer ? Écris-moi directement :</p>
          <form className="space-y-4 max-w-md">
            <input type="text" placeholder="Ton prénom" className="w-full border border-gray-300 px-4 py-2 rounded" />
            <input type="email" placeholder="Ton e-mail" className="w-full border border-gray-300 px-4 py-2 rounded" />
            <textarea placeholder="Ton message" className="w-full border border-gray-300 px-4 py-2 rounded h-32" />
            <button type="submit" className="bg-[#187072] text-white px-6 py-3 rounded hover:bg-[#145c5c] transition">
              Envoyer
            </button>
          </form>
        </section>
      </main>
    </>
  )
}
