import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { noticeItems } from '@/data/notices';
import { NoticeDetail } from '@/components/notice/notice-detail';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const item = noticeItems.find((n) => n.id === id);
  if (!item) return { title: '공지사항을 찾을 수 없습니다' };

  return {
    title: `${item.title} — 보노보플랫폼 공지사항`,
    description: item.content.slice(0, 160),
  };
}

export function generateStaticParams() {
  return noticeItems.map((item) => ({ id: item.id }));
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const currentIdx = noticeItems.findIndex((n) => n.id === id);
  if (currentIdx === -1) notFound();

  const item = noticeItems[currentIdx];
  const prev =
    currentIdx < noticeItems.length - 1
      ? noticeItems[currentIdx + 1]
      : null;
  const next = currentIdx > 0 ? noticeItems[currentIdx - 1] : null;

  return <NoticeDetail item={item} prev={prev} next={next} />;
}
