"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F5F6FA] text-[#363945]">
      <Header />

      <div className="flex-1 py-24 px-6 max-w-3xl mx-auto space-y-24 text-center">
        {/* Section 1 : Accroche */}
        <section className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#26436E]">
            Vous ne savez plus où passe votre argent ?
          </h1>
          <p className="text-lg text-gray-700">
            Vous n’êtes pas seul. MoneyTime Rev’ vous aide à y voir clair,<br />
            pas à pas, sans jugement, avec des repères simples et utiles.
          </p>
        </section>

        {/* Section 2 : Inscription */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#26436E]">
            Soyez informé dès le lancement
          </h2>
          <p className="text-gray-600">
            MoneyTime Rev’ est en cours de finalisation. Laissez-nous votre e-mail pour être informé à l’ouverture.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="flex-1 p-3 border border-gray-300 rounded"
              disabled
            />
            <button
              className="bg-[#187072] text-white px-6 py-3 rounded font-semibold cursor-not-allowed"
              disabled
            >
              Être prévenu du lancement
            </button>
          </form>
          <p className="text-xs text-center text-gray-400">
            (Formulaire inactif pour le moment – lancement prévu prochainement)
          </p>
        </section>

        {/* Section 3 : Comment ça se passe ? */}
        <section className="space-y-6 text-left">
          <h2 className="text-2xl font-semibold text-center text-[#26436E]">
            Concrètement, comment ça se passe ?
          </h2>
          <p className="text-gray-700">
            Vous ne recevrez pas un simple PDF ni un simulateur compliqué.
          </p>
          <p className="text-gray-700">
            Tout commence par un diagnostic clair, pour comprendre votre situation actuelle.
          </p>
          <p className="text-gray-700">
            Nous vous aidons ensuite à analyser vos dépenses, vos équilibres et vos marges de manœuvre.
          </p>
          <p className="text-gray-700">
            Vous identifiez ce qui vous pèse, ce que vous pouvez ajuster, et ce qui fonctionne déjà bien.
          </p>
          <p className="text-gray-700">
            Et surtout, vous avancez à votre rythme, avec un accompagnement solide et humain, si vous souhaitez aller plus loin.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}