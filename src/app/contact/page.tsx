// trigger build
"use client";
export const dynamic = "force-dynamic";


import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6 text-[#363945]">
        <h1 className="text-2xl font-bold text-center text-[#26436E] mb-6">Contact</h1>
        <p className="mb-4">Pour toute question, vous pouvez nous écrire à l’adresse suivante&nbsp;: <a href="mailto:contact@moneytimerev.fr" className="text-[#187072] underline">contact@moneytimerev.fr</a>.</p>
        <p>Nous vous répondrons dans les meilleurs délais.</p>
      </main>
      <Footer />
    </>
  );
}
