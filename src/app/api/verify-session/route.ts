import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '../../lib/firebaseAdmin'

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json()
    if (!idToken) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }
    const decoded = await adminAuth.verifyIdToken(idToken)
    const snap = await adminDb
      .collection('utilisateurs')
      .doc(decoded.uid)
      .get()
    const role = snap.exists ? snap.data()?.role ?? 'client' : 'client'
    return NextResponse.json({ uid: decoded.uid, email: decoded.email, role })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
