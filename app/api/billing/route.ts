import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  return NextResponse.json({
    success: true,
    sessionId: 'stripe_placeholder_session',
    payload,
  });
}
