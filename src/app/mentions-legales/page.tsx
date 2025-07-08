// trigger build
"use client";
export const dynamic = "force-dynamic";


import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6 text-[#363945]">
        <h1 className="text-2xl font-bold text-center text-[#26436E] mb-6">Mentions légales</h1>
        <p className="mb-4">Éditeur : MoneyTime Rev’ – contact@moneytimerev.fr</p>
        <p className="mb-4">Hébergeur : Google Cloud Platform – 8 rue de Londres, 75009 Paris</p>
        <p className="mb-4">Les contenus de ce site sont protégés par le droit d’auteur. Toute reproduction est interdite sans autorisation.</p>
        <p>Les données personnelles collectées sont utilisées uniquement pour répondre aux demandes et sont traitées conformément à la réglementation.</p>
      </main>
      <Footer />
    </>  );
}
