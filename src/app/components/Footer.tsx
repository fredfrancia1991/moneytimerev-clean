"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] text-[#4a4a4a] text-sm mt-12 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Link href="/cgu" className="block hover:underline">CGU</Link>
          <Link href="/mentions-legales" className="block hover:underline">Mentions légales</Link>
          <Link href="/politique-de-confidentialite" className="block hover:underline">Politique de confidentialité</Link>
          <Link href="/contact" className="block hover:underline">Contact</Link>
        </div>
        <div className="space-y-2 text-xs">
          <p>Éditeur : MoneyTime Rev’</p>
          <p>Hébergeur : Google Cloud Platform</p>
          <p>Les données collectées sont traitées dans le respect du RGPD.</p>
        </div>
        <div className="text-xs md:text-right flex items-end justify-center md:justify-end">
          © 2025 MoneyTime Rev’ – Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
