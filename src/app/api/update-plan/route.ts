import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function POST(req: NextRequest) {
  try {
    const { uid, plan } = await req.json()
    if (!uid || !plan) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }
    await adminDb.collection('utilisateurs').doc(uid).update({ plan })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 })
  }
}
