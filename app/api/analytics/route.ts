import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const event = await request.json().catch(() => null);
  console.debug('[API] analytics event', event);
  return NextResponse.json({ success: true, event });
}
