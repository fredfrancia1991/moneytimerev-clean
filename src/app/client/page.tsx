"use client"
export const dynamic = "force-dynamic"

import Link from 'next/link'

export default function ClientHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#26436E]">Espace client</h1>
      <p>Plan actif : &lt;plan&gt;</p>
      <p>RDV restants : &lt;nombre&gt;</p>
      <Link href="/client/dashboard" className="bg-[#187072] text-white py-2 px-4 rounded inline-block">
        Accéder au tableau de bord
      </Link>
      <div>
        <h2 className="font-semibold">Historique</h2>
        <p>&lt;historique&gt;</p>
      </div>
      <div>
        <h2 className="font-semibold">Suivi personnel</h2>
        <p>&lt;outil de suivi&gt;</p>
      </div>
    </div>
  )
}
