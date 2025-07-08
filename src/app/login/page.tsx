// trigger build
"use client";
export const dynamic = "force-dynamic";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/dashboard");
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    router.replace("/dashboard");
  };

  return (
    <>
      <Header />
      <main className="max-w-sm mx-auto p-4 mt-8">
        <h1 className="text-2xl font-bold text-center text-[#26436E] mb-6">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-[#187072] text-white py-2 rounded">
            Se connecter
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
