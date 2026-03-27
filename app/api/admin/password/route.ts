import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateAdminPassword } from '@/lib/api/admin';

export async function PUT(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (!session) {
    return NextResponse.json({ error: '인증 필요' }, { status: 401 });
  }

  const decoded = Buffer.from(session, 'base64').toString();
  const [id] = decoded.split(':');

  const { oldPassword, newPassword } = await req.json();

  const updated = await updateAdminPassword(
    id,
    oldPassword,
    newPassword,
  );
  if (!updated) {
    return NextResponse.json(
      { error: '현재 비밀번호가 올바르지 않습니다.' },
      { status: 400 },
    );
  }

  cookieStore.set(
    'admin_session',
    Buffer.from(`${id}:${newPassword}`).toString('base64'),
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
