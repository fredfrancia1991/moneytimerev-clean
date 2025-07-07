import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Données reçues dans API Next.js:", data);

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzcx7CRbBEkN6PuIziLkhWoWrrh13lQX7WMCctf7VQDO6hnnvYbz0cunWB0M4Kj-Hwc/exec';

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    console.log("Réponse Google Apps Script statut:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur Google Apps Script:", errorText);
      return NextResponse.json({ status: 'error', message: 'Erreur lors de l’envoi au script' }, { status: 500 });
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error("Erreur dans API Next.js POST:", error);
    return NextResponse.json({ status: 'error', message: (error as Error).message }, { status: 500 });
  }
}