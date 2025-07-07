"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import InputWithInfo from "./components/InputWithInfo";
import Hero from "./components/Hero";
import SEO from "./components/SEO";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { db } from "./lib/firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [step, setStep] = useState<"info" | "budget">("info");

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [revenus, setRevenus] = useState("");
  const [besoins, setBesoins] = useState("");
  const [loisirs, setLoisirs] = useState("");
  const [epargneMensuelle, setEpargneMensuelle] = useState("");
  const [epargneActuelle, setEpargneActuelle] = useState("");

  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const infos = {
    revenus: "Tes revenus mensuels après impôts et charges sociales.",
    besoins: "Tes dépenses essentielles comme loyer, électricité, assurances...",
    loisirs: "Tes dépenses pour le plaisir : sorties, abonnements, vacances...",
    epargneMensuelle: "Ce que tu mets de côté chaque mois (même petit !)",
    epargneActuelle: "Ce que tu as déjà de côté sur tes comptes, livrets, etc.",
  };

  const handleInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (consent) {
      setStep("budget");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const revenuNum = parseFloat(revenus) || 0;
    const besoinsNum = parseFloat(besoins) || 0;
    const loisirsNum = parseFloat(loisirs) || 0;
    const epargneNum = parseFloat(epargneMensuelle) || 0;
    const epargneActNum = parseFloat(epargneActuelle) || 0;
    const totalDepenses = besoinsNum + loisirsNum + epargneNum;

    if (revenuNum === 0) {
      setResultMessage("Merci d'indiquer au moins un revenu pour établir votre diagnostic.");
      return;
    }

    const prct = (n: number) => Math.round((n / revenuNum) * 100);

    let message = `Répartition : ${prct(besoinsNum)}% besoins / ${prct(loisirsNum)}% loisirs / ${prct(epargneNum)}% épargne.`;
    if (totalDepenses > revenuNum) {
      message += " Budget déficitaire.";
    }
    if (epargneActNum >= revenuNum * 3) {
      message += " Épargne de précaution suffisante.";
    } else {
      message += " Épargne de précaution insuffisante.";
    }
    setResultMessage(message);

    const docRef = await addDoc(collection(db, "diagnostics"), {
      prenom,
      nom,
      email,
      consent,
      revenus: revenuNum,
      besoins: besoinsNum,
      loisirs: loisirsNum,
      epargneMensuelle: epargneNum,
      epargneActuelle: epargneActNum,
      profile: message,
      mailRequested: false,
      rdvRequested: false,
      createdAt: serverTimestamp(),
    });
    setRecordId(docRef.id);
  };

  const handleSendEmail = async () => {
    if (!recordId) return;
    await updateDoc(doc(db, "diagnostics", recordId), { mailRequested: true });
    setEmailSent(true);
  };

  const handleRdv = async () => {
    if (recordId) {
      await updateDoc(doc(db, "diagnostics", recordId), { rdvRequested: true });
    }
    window.open("https://calendly.com/votre-lien", "_blank");
  };

  return (
    <div className="bg-gradient-to-b from-[#f5f6fa] to-white text-[#363945] font-sans min-h-screen flex flex-col">
      <SEO title="MoneyTime Rev’ – Diagnostic financier gratuit" description="Faites le point sur vos revenus, vos dépenses et votre épargne. Gratuit, confidentiel, en moins de 2 minutes." />
      <Header />
      <main className="flex-1 animate-fade-in px-4 sm:px-6">
        <Hero />
        {step === "info" && (
          <form className="formApple max-w-3xl mx-auto" onSubmit={handleInfoSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Prénom" required className="border border-gray-300 rounded-lg p-2" />
              <input type="text" value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" required className="border border-gray-300 rounded-lg p-2" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="sm:col-span-2 border border-gray-300 rounded-lg p-2" />
              <label className="flex items-center space-x-2 sm:col-span-2 text-sm">
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required />
                <span>J’accepte la collecte de mes données</span>
              </label>
            </div>
            <button type="submit" className="w-full bg-[#187072] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-6 flex items-center justify-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-white" />
              Commencer
            </button>
          </form>
        )}

        {step === "budget" && (
          <>
            <form className="formApple max-w-3xl mx-auto" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputWithInfo label="Revenus nets mensuels" value={revenus} onChange={e => setRevenus(e.target.value)} info={infos.revenus} name="revenus" />
                <InputWithInfo label="Dépenses besoins" value={besoins} onChange={e => setBesoins(e.target.value)} info={infos.besoins} name="besoins" />
                <InputWithInfo label="Dépenses loisirs" value={loisirs} onChange={e => setLoisirs(e.target.value)} info={infos.loisirs} name="loisirs" />
                <InputWithInfo label="Épargne mensuelle" value={epargneMensuelle} onChange={e => setEpargneMensuelle(e.target.value)} info={infos.epargneMensuelle} name="epargneMensuelle" />
                <InputWithInfo label="Épargne disponible" value={epargneActuelle} onChange={e => setEpargneActuelle(e.target.value)} info={infos.epargneActuelle} name="epargneActuelle" />
              </div>
              <button type="submit" className="w-full bg-[#187072] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-6 flex items-center justify-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-white" />
                Obtenir mon diagnostic
              </button>
            </form>
            {resultMessage && (
              <div className="resultMessage max-w-2xl mx-auto mt-6 text-center bg-[#e8f3fa] text-[#187072] font-medium p-4 rounded shadow animate-fade-in">
                {resultMessage}
              </div>
            )}
            {recordId && !emailSent && (
              <button onClick={handleSendEmail} className="w-full max-w-2xl mx-auto bg-[#26436E] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-6 block">
                Recevoir un mini bilan et des conseils par email
              </button>
            )}
            {emailSent && (
              <p className="text-center text-[#187072] font-medium mt-4">Email envoyé !</p>
            )}
            {recordId && (
              <button onClick={handleRdv} className="w-full max-w-2xl mx-auto bg-[#187072] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-4 block">
                Prendre un RDV gratuit de 30 minutes
              </button>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
