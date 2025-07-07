'use client'

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'


export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await addDoc(collection(db, 'contacts'), {
        ...form,
        date: new Date()
      })
      setStatus('success')
      setForm({ nom: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold text-[#26436E]">Contactez-nous</h2>
      <input
        type="text"
        name="nom"
        placeholder="Votre nom"
        value={form.nom}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="message"
        placeholder="Votre message"
        value={form.message}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded h-32"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-[#187072] text-white px-6 py-2 rounded hover:opacity-90"
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
      </button>
      {status === 'success' && <p className="text-green-600">Message envoyé ✅</p>}
      {status === 'error' && <p className="text-red-600">Erreur lors de l’envoi ❌</p>}
    </form>
  )
}
