"use client"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white py-4 px-6 shadow border-b">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-xl font-extrabold text-[#26436E]">
          MoneyTime <span className="italic text-[#187072]">Rev’</span>
        </span>
        <div className="flex gap-4 text-sm text-[#26436E] font-semibold">
          <Link href="/" className="hover:underline">Accueil</Link>
          <Link href="/offres" className="hover:underline">Offres</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
        </div>
      </nav>
    </header>
  )
}
