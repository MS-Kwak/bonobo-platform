import { NextRequest, NextResponse } from 'next/server';
import { verifyContactPassword } from '@/lib/api/contacts';

export async function POST(req: NextRequest) {
  const { qsn, password } = await req.json();

  if (!qsn || !password) {
    return NextResponse.json(
      { error: '필수 항목 누락' },
      { status: 400 },
    );
  }

  const valid = await verifyContactPassword(qsn, password);
  return NextResponse.json({ valid });
}
