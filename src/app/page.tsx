"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useRef } from "react";
import styles from "./page.module.css";
import { db } from "./lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [revenus, setRevenus] = useState("");
  const [besoins, setBesoins] = useState("");
  const [loisirs, setLoisirs] = useState("");
  const [epargneMensuelle, setEpargneMensuelle] = useState("");
  const [epargneDisponible, setEpargneDisponible] = useState("");

  const [blocks, setBlocks] = useState<string[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (blocks.length > 0) {
      setBlocks([]);
      setSummary(null);
      setEmailSent(false);
      setRevenus("");
      setBesoins("");
      setLoisirs("");
      setEpargneMensuelle("");
      setEpargneDisponible("");
      return;
    }

    const revenuNum = parseFloat(revenus) || 0;
    const besoinsNum = parseFloat(besoins) || 0;
    const loisirsNum = parseFloat(loisirs) || 0;
    const epargneNum = parseFloat(epargneMensuelle) || 0;
    const epargneDispoNum = parseFloat(epargneDisponible) || 0;

    if (revenuNum === 0) return;

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

    const ratioEpargne = seuilPrecaution ? epargneDispoNum / seuilPrecaution : 0;
    const bloc3 =
      ratioEpargne < 0.5
        ? "Ton épargne actuelle ne couvre pas encore les imprévus. Mais ça ne veut pas dire que tu fais mal. Ça veut dire que la vie est parfois plus rapide que l’épargne."
        : ratioEpargne < 0.9
        ? "Tu avances vers un peu plus de sécurité. Ce que tu construis compte."
        : "Tu as peut-être une petite base de sécurité. Et ça change tout dans les moments difficiles.";

    const resumeText =
      "Ce que tu viens de saisir n’est pas qu’un calcul. C’est un aperçu de ta réalité.\nCe bilan n’est pas là pour te dire comment vivre, mais pour mettre des mots sur ce que tu traverses.\nSi tu veux recevoir ce retour par mail, ou en parler gratuitement 30 minutes, c’est possible, à ton rythme.";

    const fullSummary = `${bloc1}\n${bloc2}\n${bloc3}\n${resumeText}`;

    setBlocks([bloc1, bloc2, bloc3]);
    setSummary(resumeText);
    setLoading(true);

    await addDoc(collection(db, "diagnostics"), {
      prenom,
      nom,
      email,
      consent,
      revenus: revenuNum,
      besoins: besoinsNum,
      loisirs: loisirsNum,
      epargneMensuelle: epargneNum,
      epargneDisponible: epargneDispoNum,
      totalDepenses,
      reste,
      seuilPrecaution,
      resume: fullSummary,
      mailRequested: false,
      createdAt: serverTimestamp(),
    });

    setTimeout(() => {
      setLoading(false);
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
  };

  const buttonLabel = blocks.length > 0 ? "Refaire le diagnostic" : "Commencer le diagnostic gratuit";

  return (
    <div className="bg-[#F5F6FA] min-h-screen flex flex-col font-sans text-[#26436E]">
      <Header />
      <main className="flex-1 px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          <div>
            <label className="font-semibold" htmlFor="revenus">Revenus mensuels</label>
            <input id="revenus" name="revenus" type="number" value={revenus} onChange={e => setRevenus(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="besoins">Dépenses essentielles</label>
            <input id="besoins" name="besoins" type="number" value={besoins} onChange={e => setBesoins(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="loisirs">Dépenses de confort</label>
            <input id="loisirs" name="loisirs" type="number" value={loisirs} onChange={e => setLoisirs(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="epargneMensuelle">Épargne mensuelle</label>
            <input id="epargneMensuelle" name="epargneMensuelle" type="number" value={epargneMensuelle} onChange={e => setEpargneMensuelle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="epargneDisponible">Épargne disponible</label>
            <input id="epargneDisponible" name="epargneDisponible" type="number" value={epargneDisponible} onChange={e => setEpargneDisponible(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
          </div>
          <button type="submit" className="w-full bg-[#187072] text-white font-bold py-3 rounded-xl">
            {buttonLabel}
          </button>
        </form>

        {loading && (
          <div ref={resultRef} className="mt-6 text-center">
            <p>Analyse de votre situation en cours…</p>
            <div className="mt-4 flex justify-center">
              <span className={styles.loader}></span>
            </div>
          </div>
        )}

        {blocks.length > 0 && !loading && (
          <div ref={resultRef} className={`${styles.resultCard} mt-6 max-w-xl mx-auto text-[#363945]`}>
            {blocks.map((b, i) => (
              <p key={i} className="mb-2">{b}</p>
            ))}
            {summary && <p className={`${styles.coachingSuggestion} mt-2`}>{summary}</p>}
            {!emailSent ? (
              <button onClick={handleSendEmail} className="w-full bg-[#26436E] text-white font-bold py-3 px-6 rounded-xl mt-6">
                Recevoir mon mini bilan par mail
              </button>
            ) : (
              <p className="text-center text-[#187072] font-medium mt-4">Email envoyé !</p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}