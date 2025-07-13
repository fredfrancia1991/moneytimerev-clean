import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { uid, plan } = await req.json()
  console.log('update-plan stub', uid, plan)
  return NextResponse.json({ success: true })
}
