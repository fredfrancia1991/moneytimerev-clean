"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Diagnostic {
  id: string;
  prenom?: string;
  nom?: string;
  email?: string;
  createdAt?: { seconds: number }; // plus précis que `any`
}

export default function Dashboard() {
  const [admin, setAdmin] = useState(false);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/login");
        return;
      }
      setUser(u);
      const isAdmin = u.email === "frederic.francia@icloud.com";
      setAdmin(isAdmin);

      const baseQuery = isAdmin
        ? query(collection(db, "diagnostics"), orderBy("createdAt", "desc"))
        : query(
            collection(db, "diagnostics"),
            where("email", "==", u.email),
            orderBy("createdAt", "desc")
          );

      const snap = await getDocs(baseQuery);
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Diagnostic[];
      setDiagnostics(data);
    });
  }, [router]);

  const logout = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-4 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#26436E]">Tableau de bord</h1>
          <button onClick={logout} className="text-sm text-red-600">
            Se déconnecter
          </button>
        </div>
        {admin ? (
          <div className="space-y-4">
            {diagnostics.map((d) => (
              <div key={d.id} className="border p-3 rounded">
                <p className="font-semibold">
                  {d.prenom} {d.nom}
                </p>
                <p className="text-sm text-gray-600">{d.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {diagnostics.map((d) => (
              <div key={d.id} className="border p-3 rounded">
                <p className="font-semibold">
                  Diagnostic du{" "}
                  {d.createdAt
                    ? new Date(d.createdAt.seconds * 1000).toLocaleDateString()
                    : "Date inconnue"}
                </p>
              </div>
            ))}
            <a
              href="https://calendly.com"
              className="block text-center bg-[#187072] text-white py-2 rounded mt-4"
            >
              Prendre rendez-vous
            </a>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}