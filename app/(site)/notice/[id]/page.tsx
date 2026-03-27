import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNoticeById, getAdjacentNotices } from '@/lib/api/notices';
import { NoticeDetail } from '@/components/notice/notice-detail';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const psn = Number(id);
  if (isNaN(psn)) return { title: '공지사항을 찾을 수 없습니다' };

  const item = await getNoticeById(psn);
  if (!item) return { title: '공지사항을 찾을 수 없습니다' };

  const plainContent = item.content
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .trim();

  return {
    title: `${item.title} — 보노보플랫폼 공지사항`,
    description: plainContent.slice(0, 160),
  };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const psn = Number(id);
  if (isNaN(psn)) notFound();

  const item = await getNoticeById(psn);
  if (!item) notFound();

  const { prev, next } = await getAdjacentNotices(psn);

  return <NoticeDetail item={item} prev={prev} next={next} />;
}
