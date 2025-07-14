"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "../lib/localAuth";

export default function Header() {
  const [connected, setConnected] = useState(false);
  const showLinks = process.env.NEXT_PUBLIC_ENV !== "prod";

  useEffect(() => {
    return onAuthStateChanged((user) => setConnected(!!user));
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-[#e2e8f0]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="text-xl font-extrabold text-[#26436E]">
          MoneyTime <span className="italic text-[#187072]">Rev’</span>
        </span>

        {showLinks && (
          <nav className="space-x-4 text-sm font-semibold text-[#187072]">
            <Link href="/" className="hover:underline">Accueil</Link>
            <Link href="/diagnostique" className="hover:underline">Diagnostique</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            {connected ? (
              <Link href="/client" className="hover:underline">Mon espace</Link>
            ) : (
              <Link href="/login" className="hover:underline">Connexion</Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}