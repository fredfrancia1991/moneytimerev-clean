"use client"
export const dynamic = "force-dynamic"

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ClientRendezVous() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6">
        <h1 className="text-2xl font-bold text-[#26436E] mb-4">Mes rendez-vous</h1>
        <p>&lt;gestion des rendez-vous&gt;</p>
      </main>
      <Footer />
    </>
  )
}
