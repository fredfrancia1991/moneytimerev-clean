"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Contact() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/sendData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, message }),
      });
      setSent(true);
    } catch (err) {
      console.error('Erreur envoi', err);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold text-[#187072] mb-6 text-center">Contact</h1>
        {sent ? (
          <p className="text-center text-[#187072] font-medium">Message envoyé !</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={e => setNom(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded h-32"
              required
            />
            <button type="submit" className="bg-[#187072] text-white font-bold py-2 px-6 rounded">
              Envoyer
            </button>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
