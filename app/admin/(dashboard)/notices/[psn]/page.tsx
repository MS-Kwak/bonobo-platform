import { notFound } from 'next/navigation';
import { getAdminNoticeById } from '@/lib/api/admin';
import { NoticeForm } from '@/components/admin/notice-form';

export const dynamic = 'force-dynamic';

const OLD_IMAGE_PREFIX = '/admin/files/';
const LEGACY_IMAGE_BASE = 'https://bonobo.co.kr/admin/files/';

function resolveImageUrl(src: string): string {
  if (src.startsWith(OLD_IMAGE_PREFIX)) {
    return LEGACY_IMAGE_BASE + src.slice(OLD_IMAGE_PREFIX.length);
  }
  return src;
}

function extractImages(pdesc: string): string[] {
  const imgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*\/?>/gi;
  const images: string[] = [];
  let match;
  while ((match = imgRegex.exec(pdesc)) !== null) {
    images.push(resolveImageUrl(match[1]));
  }
  return images;
}

export default async function AdminNoticeEditPage({
  params,
}: {
  params: Promise<{ psn: string }>;
}) {
  const { psn } = await params;
  const id = Number(psn);
  if (!id || isNaN(id)) notFound();

  const row = await getAdminNoticeById(id);
  if (!row) notFound();

  const images = extractImages(row.pdesc ?? '');

  const initialData = {
    psn: row.psn,
    ptitle: row.ptitle ?? '',
    pname: row.pname ?? '관리자',
    regdate: row.regdate
      ? new Date(row.regdate).toISOString().split('T')[0]
      : '',
    pdesc: row.pdesc ?? '',
    is_pinned: row.is_pinned ?? 0,
  };

  return (
    <NoticeForm
      key={`edit-${row.psn}`}
      initialData={initialData}
      initialImages={images}
    />
  );
}
