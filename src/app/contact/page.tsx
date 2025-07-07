'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message envoyé ! (non connecté)')
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" name="name" placeholder="Votre nom" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Votre email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Votre message" value={form.message} onChange={handleChange} required />
        <button type="submit">Envoyer</button>
      </form>
    </main>
  )
}