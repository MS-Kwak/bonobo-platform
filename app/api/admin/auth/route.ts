import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/api/admin';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { id, password } = await req.json();
  const valid = await verifyAdmin(id, password);

  if (!valid) {
    return NextResponse.json(
      { error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(
    'admin_session',
    Buffer.from(`${id}:${password}`).toString('base64'),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    },
  );

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
