import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyAdmin,
  insertPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '@/lib/api/admin';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (!session) return false;
  try {
    const decoded = Buffer.from(session, 'base64').toString();
    const [id, pw] = decoded.split(':');
    if (!id || !pw) return false;
    return verifyAdmin(id, pw);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth()))
    return NextResponse.json({ error: '인증 필요' }, { status: 401 });

  const body = await req.json();
  const id = await insertPortfolio(body);
  return NextResponse.json({ id });
}

export async function PUT(req: NextRequest) {
  if (!(await checkAuth()))
    return NextResponse.json({ error: '인증 필요' }, { status: 401 });

  const { psn, ...data } = await req.json();
  if (!psn)
    return NextResponse.json({ error: 'psn 필요' }, { status: 400 });
  await updatePortfolio(psn, data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await checkAuth()))
    return NextResponse.json({ error: '인증 필요' }, { status: 401 });

  const { psn } = await req.json();
  if (!psn)
    return NextResponse.json({ error: 'psn 필요' }, { status: 400 });
  await deletePortfolio(psn);
  return NextResponse.json({ ok: true });
}
