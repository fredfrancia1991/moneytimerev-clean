// trigger build
"use client";
export const dynamic = "force-dynamic";


import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CGU() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6 text-[#363945]">
        <h1 className="text-2xl font-bold text-center text-[#26436E] mb-6">Conditions générales d’utilisation</h1>
        <p className="mb-4">L’utilisation du site MoneyTime Rev’ implique l’acceptation pleine et entière des présentes CGU.</p>
        <p className="mb-4">L’utilisateur s’engage à fournir des informations exactes et à respecter la législation en vigueur.</p>
        <p className="mb-4">MoneyTime Rev’ se réserve le droit de modifier ces conditions à tout moment.</p>
        <p>En continuant à naviguer sur le site, vous acceptez ces conditions sans réserve.</p>
      </main>
      <Footer />
    </>
  );
}
