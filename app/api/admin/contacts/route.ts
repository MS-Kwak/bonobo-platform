import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyAdmin,
  replyContact,
  deleteContact,
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

export async function PUT(req: NextRequest) {
  if (!(await checkAuth()))
    return NextResponse.json({ error: '인증 필요' }, { status: 401 });

  const { qsn, adesc } = await req.json();
  if (!qsn)
    return NextResponse.json({ error: 'qsn 필요' }, { status: 400 });
  await replyContact(qsn, adesc ?? '');
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await checkAuth()))
    return NextResponse.json({ error: '인증 필요' }, { status: 401 });

  const { qsn } = await req.json();
  if (!qsn)
    return NextResponse.json({ error: 'qsn 필요' }, { status: 400 });
  await deleteContact(qsn);
  return NextResponse.json({ ok: true });
}
