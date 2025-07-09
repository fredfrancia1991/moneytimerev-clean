"use client"
export const dynamic = "force-dynamic"

import type { PageProps } from 'next'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function AdminUserDetail({ params }: PageProps<{ uid: string }>) {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6">
        <h1 className="text-2xl font-bold text-[#26436E] mb-4">
          Fiche utilisateur {params.uid}
        </h1>
        <p>&lt;détails du client&gt;</p>
      </main>
      <Footer />
    </>
  )
}
