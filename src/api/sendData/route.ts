import { NextRequest, NextResponse } from 'next/server'
import { firestore } from '@/lib/firebaseAdmin'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('Données reçues dans API Next.js:', data)

    await firestore.collection('contacts').add({
      nom: data.nom,
      email: data.email,
      message: data.message,
      createdAt: new Date(),
    })

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error("Erreur dans API Next.js POST:", error);
    return NextResponse.json({ status: 'error', message: (error as Error).message }, { status: 500 });
  }
}
