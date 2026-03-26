import { NextRequest, NextResponse } from 'next/server';
import {
  getNoticesPaginated,
  NOTICE_PAGE_SIZE,
} from '@/lib/api/notices';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.min(
    50,
    Math.max(
      1,
      Number(searchParams.get('pageSize')) || NOTICE_PAGE_SIZE,
    ),
  );

  const result = await getNoticesPaginated(page, pageSize);

  return NextResponse.json(result);
}
