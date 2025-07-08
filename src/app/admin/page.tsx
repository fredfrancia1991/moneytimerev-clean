"use client"
export const dynamic = "force-dynamic"

import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function AdminHome() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6 space-y-4">
        <h1 className="text-2xl font-bold text-[#26436E]">Espace admin</h1>
        <Link href="/admin/utilisateurs" className="text-[#187072] underline">
          Gérer les utilisateurs
        </Link>
        <Link href="/admin/diagnostics" className="text-[#187072] underline">
          Diagnostics
        </Link>
      </main>
      <Footer />
    </>
  )
}
