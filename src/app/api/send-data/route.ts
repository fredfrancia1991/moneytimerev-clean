import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('send-data stub', data);
  return NextResponse.json({ status: 'success' });
}