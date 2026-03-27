import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdmin } from '@/lib/api/admin';
import { put } from '@vercel/blob';

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

  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json(
      { error: '파일이 없습니다' },
      { status: 400 },
    );
  }

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      {
        error:
          '허용되지 않는 파일 형식입니다 (jpg, png, gif, webp만 가능)',
      },
      { status: 400 },
    );
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: '파일 크기가 10MB를 초과합니다' },
      { status: 400 },
    );
  }

  const timestamp = Date.now();
  const blobPath = `portfolio/${timestamp}-${file.name}`;

  try {
    const blob = await put(blobPath, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error('Blob upload error:', err);
    return NextResponse.json(
      { error: '이미지 업로드에 실패했습니다' },
      { status: 500 },
    );
  }
}
