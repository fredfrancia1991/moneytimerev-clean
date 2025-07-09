"use client";
export const dynamic = "force-dynamic";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

type Props = {
  params: { uid: string };
};

export default function AdminUserDetail({ params }: Props) {
  const { uid } = params;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6">
        <h1 className="text-2xl font-bold text-[#26436E] mb-4">
          Fiche utilisateur : {uid}
        </h1>
        <p>&lt;Détails de l'utilisateur à venir...&gt;</p>
      </main>
      <Footer />
    </>
  );
}
