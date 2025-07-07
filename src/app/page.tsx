"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, ChangeEvent, useRef, useEffect } from "react";

function InfoBulle({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!show) return;
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Node)) setShow(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [show]);

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setShow((v) => !v);
  };

  return (
    <span ref={ref} className="infoIcon">
      <span
        tabIndex={0}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onTouchStart={handleToggle}
        onClick={handleToggle}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        aria-label="Afficher l’information"
        role="button"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="9" fill="#E8F3FA" stroke="#b7c5d9" strokeWidth="1.5" />
          <text x="10" y="14.2" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#187072" fontFamily="Arial">i</text>
        </svg>
      </span>
      {show && <span className="infoBubble">{text}</span>}
    </span>
  );
}

function InputWithInfo({ label, value, onChange, info, name }: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  info: string;
  name: string;
}) {
  return (
    <label className="inputBlock">
      <div className="labelRow">
        <span>{label}</span>
        <InfoBulle text={info} />
      </div>
      <div className="inputWrapper">
        <span className="euro">€</span>
        <input
          type="number"
          value={value}
          name={name}
          onChange={onChange}
          className="input"
          placeholder="0"
          min="0"
          step="any"
          inputMode="decimal"
        />
      </div>
    </label>
  );
}

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
      <Header />
      <main className="bg-[#e0f0ef] p-6 max-w-3xl mx-auto my-8 rounded-xl text-center text-[#12544e] shadow-md font-bold text-lg">
        <p>
          Faites le point sur vos finances en 2 minutes.<br />
          Gratuit, confidentiel, sans engagement.
        </p>
      </main>

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
