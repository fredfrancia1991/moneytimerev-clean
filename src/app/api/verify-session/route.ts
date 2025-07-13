import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { idToken } = await req.json()
  console.log('verify-session stub', idToken)
  return NextResponse.json({ success: true })
}
