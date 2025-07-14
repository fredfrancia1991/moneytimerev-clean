"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SuiviBudget from "../components/SuiviBudget";

export default function PageSuiviBudget() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F5F6FA] text-[#363945]">
      <Header />

      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-9xl mx-auto space-y-10">        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#26436E] transition-all duration-500 ease-out opacity-0 animate-fadeInUp">
          Mon tableau de bord budgétaire
        </h1>

        <p className="text-center text-sm text-gray-500 max-w-xl mx-auto">
          Visualisez vos revenus, vos dépenses et suivez votre équilibre mois par mois.
        </p>

        <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-6 transition-all duration-300 ease-in-out">
          <SuiviBudget />
        </section>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </main>
  );
}