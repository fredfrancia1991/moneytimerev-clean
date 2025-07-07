"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import InputWithInfo from "./components/InputWithInfo";
import Hero from "./components/Hero";
import SEO from "./components/SEO";

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
    <>
      <SEO title="MoneyTime Rev’ – Diagnostic financier gratuit" description="Faites le point sur vos revenus, vos dépenses et votre épargne. Gratuit, confidentiel, en moins de 2 minutes." />
      <Header />
      <Hero />

      <form className="formApple max-w-3xl mx-auto px-4" onSubmit={handleSubmit}>
        <InputWithInfo label="Revenus mensuels" value={revenus} onChange={e => setRevenus(e.target.value)} info={infos.revenus} name="revenus" />
        <InputWithInfo label="Dépenses essentielles" value={besoins} onChange={e => setBesoins(e.target.value)} info={infos.besoins} name="besoins" />
        <InputWithInfo label="Loisirs" value={loisirs} onChange={e => setLoisirs(e.target.value)} info={infos.loisirs} name="loisirs" />
        <InputWithInfo label="Épargne mensuelle" value={epargneMensuelle} onChange={e => setEpargneMensuelle(e.target.value)} info={infos.epargneMensuelle} name="epargneMensuelle" />
        <InputWithInfo label="Épargne actuelle" value={epargneActuelle} onChange={e => setEpargneActuelle(e.target.value)} info={infos.epargneActuelle} name="epargneActuelle" />
        <button type="submit" className="bg-[#187072] text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 mt-4">Obtenir mon diagnostic</button>
      </form>

      {resultMessage && (
        <div className="resultMessage max-w-2xl mx-auto mt-6 text-center bg-[#e8f3fa] text-[#187072] font-medium p-4 rounded shadow">
          {resultMessage}
        </div>
      )}
      <Footer />
    </>
  );
}
