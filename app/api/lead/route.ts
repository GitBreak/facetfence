import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { email, store, plan } = await req.json();
    if (!email || !store) {
      return NextResponse.json({ ok: false, error: 'Missing email or store' }, { status: 400 });
    }
    console.log('LEAD', { email, store, plan, ts: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
