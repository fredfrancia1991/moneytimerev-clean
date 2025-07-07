"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import InputWithInfo from "./components/InputWithInfo";
import Hero from "./components/Hero";
import SEO from "./components/SEO";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [revenus, setRevenus] = useState("");
  const [besoins, setBesoins] = useState("");
  const [loisirs, setLoisirs] = useState("");
  const [epargneMensuelle, setEpargneMensuelle] = useState("");
  const [epargneActuelle, setEpargneActuelle] = useState("");
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const infos = {
    revenus: "Tes revenus mensuels après impôts et charges sociales.",
    besoins: "Tes dépenses essentielles comme loyer, électricité, assurances...",
    loisirs: "Tes dépenses pour le plaisir : sorties, abonnements, vacances...",
    epargneMensuelle: "Ce que tu mets de côté chaque mois (même petit !)",
    epargneActuelle: "Ce que tu as déjà de côté sur tes comptes, livrets, etc."
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const revenuNum = parseFloat(revenus) || 0;
    const besoinsNum = parseFloat(besoins) || 0;
    const loisirsNum = parseFloat(loisirs) || 0;
    const epargneNum = parseFloat(epargneMensuelle) || 0;
    const totalDepenses = besoinsNum + loisirsNum + epargneNum;

    if (revenuNum === 0) {
      setResultMessage("Merci d'indiquer au moins un revenu pour établir votre diagnostic.");
    } else if (totalDepenses > revenuNum) {
      setResultMessage("Attention : vos dépenses dépassent vos revenus. Il est temps d’agir !");
    } else {
      setResultMessage("Bravo ! Vos finances sont équilibrées, continuez ainsi.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f5f6fa] to-white text-[#363945] font-sans min-h-screen flex flex-col">
      <SEO title="MoneyTime Rev’ – Diagnostic financier gratuit" description="Faites le point sur vos revenus, vos dépenses et votre épargne. Gratuit, confidentiel, en moins de 2 minutes." />
      <Header />
      <main className="flex-1 animate-fade-in px-4 sm:px-6">
        <Hero />

        <form className="formApple max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputWithInfo label="Revenus mensuels" value={revenus} onChange={e => setRevenus(e.target.value)} info={infos.revenus} name="revenus" />
            <InputWithInfo label="Dépenses essentielles" value={besoins} onChange={e => setBesoins(e.target.value)} info={infos.besoins} name="besoins" />
            <InputWithInfo label="Loisirs" value={loisirs} onChange={e => setLoisirs(e.target.value)} info={infos.loisirs} name="loisirs" />
            <InputWithInfo label="Épargne mensuelle" value={epargneMensuelle} onChange={e => setEpargneMensuelle(e.target.value)} info={infos.epargneMensuelle} name="epargneMensuelle" />
            <InputWithInfo label="Épargne actuelle" value={epargneActuelle} onChange={e => setEpargneActuelle(e.target.value)} info={infos.epargneActuelle} name="epargneActuelle" />
          </div>
          <button
            type="submit"
            className="w-full bg-[#187072] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-6 flex items-center justify-center gap-2"
          >
            <CheckCircleIcon className="w-5 h-5 text-white" />
            Obtenir mon diagnostic
          </button>
        </form>

        {resultMessage && (
          <div className="resultMessage max-w-2xl mx-auto mt-6 text-center bg-[#e8f3fa] text-[#187072] font-medium p-4 rounded shadow animate-fade-in">
            {resultMessage}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
