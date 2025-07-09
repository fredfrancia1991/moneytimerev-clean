"use client";
export const dynamic = "force-dynamic";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { db } from "./lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitted) {
      setSubmitted(false);
      setEmailSent(false);
      setPrenom("");
      setNom("");
      setEmail("");
      setAnalysis("");
      return;
    }

    const message =
      `Merci ${prenom || ""} ! Voici une piste pour mieux gérer ton budget : ` +
      "prends quelques minutes chaque semaine pour suivre tes dépenses.";

    setAnalysis(message);

    try {
      await addDoc(collection(db, "diagnosticsSimple"), {
        prenom,
        nom,
        email,
        message,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Could not save diagnostic", err);
    }

    setSubmitted(true);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6FA] text-[#26436E] font-sans">
      <Header />
      <main className="flex-1 px-4 py-8">
        <section className="max-w-3xl mx-auto text-center space-y-4 mb-8">
          <h1 className="text-3xl font-extrabold">
            Prenez votre avenir financier en main
          </h1>
          <p className="text-lg">
            Commencez avec un diagnostic gratuit pour découvrir nos conseils personnalisés.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-xl shadow">
          <div>
            <label htmlFor="prenom" className="font-semibold">Prénom</label>
            <input
              id="prenom"
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="nom" className="font-semibold">Nom</label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="font-semibold">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <button type="submit" className="w-full bg-[#187072] text-white font-bold py-3 rounded-xl">
            {submitted ? "Refaire le diagnostic" : "Lancer le diagnostic gratuit"}
          </button>
        </form>

        {submitted && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-8 space-y-4 text-[#363945]">
            <p>{analysis}</p>
            <p className="italic text-[#187072]">
              Ce diagnostic est fictif et sert d'exemple avant l'intégration complète.
            </p>
            {!emailSent ? (
              <button
                onClick={handleSendEmail}
                className="w-full bg-[#26436E] text-white font-bold py-3 rounded-xl"
              >
                Recevoir ce bilan par mail et réserver un rendez-vous de 30 min
              </button>
            ) : (
              <p className="text-center text-[#187072] font-medium">
                Vous recevrez bientôt un email avec les détails.
              </p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
