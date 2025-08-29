import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { email, msg } = await req.json();
    if (!email || !msg) {
      return NextResponse.json({ ok: false, error: 'Missing email or message' }, { status: 400 });
    }
    console.log('CONTACT', { email, msg, ts: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
