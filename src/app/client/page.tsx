"use client"
export const dynamic = "force-dynamic"

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ClientHome() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6 space-y-4">
        <h1 className="text-2xl font-bold text-[#26436E]">Espace client</h1>
        <p>Plan actif : &lt;plan&gt;</p>
        <p>RDV restants : &lt;nombre&gt;</p>
        <button className="bg-[#187072] text-white py-2 px-4 rounded">
          Prendre rendez-vous
        </button>
        <div>
          <h2 className="font-semibold">Historique</h2>
          <p>&lt;historique&gt;</p>
        </div>
        <div>
          <h2 className="font-semibold">Suivi personnel</h2>
          <p>&lt;outil de suivi&gt;</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
