import { NextResponse } from 'next/server';
import { demoApps } from '../../demo-apps/data/demoApps';

export async function GET() {
  return NextResponse.json({ demos: demoApps });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  return NextResponse.json({ success: true, payload });
}
