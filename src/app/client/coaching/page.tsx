"use client"
export const dynamic = "force-dynamic"

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ClientCoaching() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 mt-6">
        <h1 className="text-2xl font-bold text-[#26436E] mb-4">Coaching</h1>
        <p>&lt;outil de coaching personnel&gt;</p>
      </main>
      <Footer />
    </>
  )
}
