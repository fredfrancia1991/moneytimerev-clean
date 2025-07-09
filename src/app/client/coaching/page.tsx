"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { db } from '../../lib/firebase';
import { collection, doc, getDoc } from "firebase/firestore";
import { useAuth } from '../../../lib/useAuth';
export default function ClientCoaching() {
  const { user } = useAuth();
  const [coaching, setCoaching] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const fetchCoaching = async () => {
      const docRef = doc(db, "coaching", user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setCoaching(snap.data());
      } else {
        setCoaching(null);
      }
    };
    fetchCoaching();
  }, [user]);

  if (!user) return <p className="text-center">Chargement…</p>;

  return (
    <main className="max-w-3xl mx-auto p-4 mt-6">
      <h1 className="text-2xl font-bold text-[#26436E] mb-4">Mon Coaching</h1>

      {!coaching && (
        <p className="text-gray-600">Aucune donnée de coaching disponible pour le moment.</p>
      )}

      {coaching && (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Progression</h2>
            <ul className="space-y-1">
              {Object.entries(coaching.progression || {}).map(([module, done]: any) => (
                <li key={module} className="flex justify-between">
                  <span>{module}</span>
                  <span className={done ? "text-green-600" : "text-gray-500"}>
                    {done ? "✔️ Terminé" : "⏳ En cours"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Commentaire du coach</h2>
            <p className="bg-gray-100 p-3 rounded text-sm text-[#363945]">
              {coaching.commentaire || "Aucun retour pour l’instant."}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Score global</h2>
            <p className="text-xl font-bold text-[#187072]">{coaching.score ?? "N/A"} / 100</p>
          </div>
        </>
      )}
    </main>
  );
}
