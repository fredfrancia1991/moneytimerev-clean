"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import InputWithInfo from "./components/InputWithInfo";
import Hero from "./components/Hero";
import SEO from "./components/SEO";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { db } from "./lib/firebase";
<<<<<<< HEAD
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
=======
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
>>>>>>> main

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

<<<<<<< HEAD
  const [blocks, setBlocks] = useState<string[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
=======
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);
>>>>>>> main
  const [emailSent, setEmailSent] = useState(false);

  const infos = {
    revenus: "Tes revenus mensuels après impôts et charges sociales.",
    besoins: "Tes dépenses essentielles comme loyer, électricité, assurances...",
    loisirs: "Tes dépenses pour le plaisir : sorties, abonnements, vacances...",
    epargneMensuelle: "Ce que tu mets de côté chaque mois (même petit !)",
    epargneActuelle: "Ce que tu as déjà de côté sur tes comptes, livrets, etc.",
<<<<<<< HEAD
  };

  const handleInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (consent) {
      setStep("budget");
    }
=======
>>>>>>> main
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
<<<<<<< HEAD

    if (revenuNum === 0) {
      return;
    }

    const totalDepenses = besoinsNum + loisirsNum;
    const reste = revenuNum - totalDepenses;
    const seuilPrecaution = totalDepenses * 3;

    const bloc1 =
      reste < -50
        ? "Il est possible que tu sois déjà à découvert, ou très proche. Tu fais sûrement comme tu peux avec ce que tu as."
        : reste < 100
        ? "Tu sembles gérer au plus juste. Il n’y a peut-être pas de marge, mais tu tiens."
        : "Il te reste peut-être un peu en fin de mois. Ce n’est pas forcément confortable, mais c’est un début de souffle.";

    const ratioLoisirs = revenuNum ? loisirsNum / revenuNum : 0;
    const bloc2 =
      ratioLoisirs < 0.1
        ? "Tu es peut-être dans une période où l’essentiel prend toute la place. Et c’est OK."
        : ratioLoisirs < 0.25
        ? "Tu sembles trouver un certain équilibre. Pas parfait, mais fonctionnel."
        : "Tu arrives peut-être à t’accorder des petits moments pour toi. C’est une force quand c’est possible.";

    const ratioEpargne = seuilPrecaution ? epargneActNum / seuilPrecaution : 0;
    const bloc3 =
      ratioEpargne < 0.5
        ? "Ton épargne actuelle ne couvre pas encore les imprévus. Mais ça ne veut pas dire que tu fais mal. Ça veut dire que la vie est parfois plus rapide que l’épargne."
        : ratioEpargne < 0.9
        ? "Tu avances vers un peu plus de sécurité. Ce que tu construis compte."
        : "Tu as peut-être une petite base de sécurité. Et ça change tout dans les moments difficiles.";

    setBlocks([bloc1, bloc2, bloc3]);

    setSummary(
      "Ce que tu viens de saisir n’est pas qu’un calcul. C’est un aperçu de ta réalité.\nCe bilan n’est pas là pour te dire comment vivre, mais pour mettre des mots sur ce que tu traverses.\nSi tu veux recevoir ce retour par mail, ou en parler gratuitement 30 minutes, c’est possible, à ton rythme."
    );
  };

  const handleSendEmail = async () => {
    const revenuNum = parseFloat(revenus) || 0;
    const besoinsNum = parseFloat(besoins) || 0;
    const loisirsNum = parseFloat(loisirs) || 0;
    const epargneNum = parseFloat(epargneMensuelle) || 0;
    const epargneActNum = parseFloat(epargneActuelle) || 0;

    const totalDepenses = besoinsNum + loisirsNum;
    const reste = revenuNum - totalDepenses;
    const seuilPrecaution = totalDepenses * 3;

    const blocText = blocks.join("\n");
    const resume = `${blocText}\n${summary ?? ''}`;

    await addDoc(collection(db, "diagnostics"), {
=======
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
>>>>>>> main
      prenom,
      nom,
      email,
      consent,
      revenus: revenuNum,
      besoins: besoinsNum,
      loisirs: loisirsNum,
      epargneMensuelle: epargneNum,
      epargneActuelle: epargneActNum,
<<<<<<< HEAD
      totalDepenses,
      reste,
      seuilPrecaution,
      resume,
      mailRequested: true,
      createdAt: serverTimestamp(),
    });

    setEmailSent(true);
=======
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
>>>>>>> main
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
<<<<<<< HEAD
            {blocks.length > 0 && (
              <div className="resultMessage max-w-2xl mx-auto mt-6 text-center space-y-4 bg-[#e8f3fa] text-[#187072] font-medium p-4 rounded shadow animate-fade-in">
                {blocks.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
                {summary && <p className="mt-2 font-normal">{summary}</p>}
              </div>
            )}
            {blocks.length > 0 && !emailSent && (
              <button onClick={handleSendEmail} className="w-full max-w-2xl mx-auto bg-[#26436E] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-6 block">
                Recevoir mon mini bilan par mail
=======
            {resultMessage && (
              <div className="resultMessage max-w-2xl mx-auto mt-6 text-center bg-[#e8f3fa] text-[#187072] font-medium p-4 rounded shadow animate-fade-in">
                {resultMessage}
              </div>
            )}
            {recordId && !emailSent && (
              <button onClick={handleSendEmail} className="w-full max-w-2xl mx-auto bg-[#26436E] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-6 block">
                Recevoir un mini bilan et des conseils par email
>>>>>>> main
              </button>
            )}
            {emailSent && (
              <p className="text-center text-[#187072] font-medium mt-4">Email envoyé !</p>
            )}
<<<<<<< HEAD
=======
            {recordId && (
              <button onClick={handleRdv} className="w-full max-w-2xl mx-auto bg-[#187072] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-4 block">
                Prendre un RDV gratuit de 30 minutes
              </button>
            )}
>>>>>>> main
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
