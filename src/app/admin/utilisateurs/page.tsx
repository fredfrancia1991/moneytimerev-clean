"use client"
export const dynamic = "force-dynamic"

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AdminUsers() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6 space-y-4">
        <h1 className="text-2xl font-bold text-[#26436E]">Utilisateurs</h1>
        <p>&lt;liste des utilisateurs avec rôles et plans modifiables&gt;</p>
        <Link href="/admin/utilisateurs/123" className="text-[#187072] underline">
          Voir fiche utilisateur
        </Link>
      </main>
      <Footer />
    </>
  )
}
