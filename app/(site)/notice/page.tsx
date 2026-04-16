import { Metadata } from 'next';
import { getNoticesPaginated } from '@/lib/api/notices';
import { NoticeList } from '@/components/notice/notice-list';

export const metadata: Metadata = {
  title: '공지사항 — (주)보노보플랫폼',
  description:
    '(주)보노보플랫폼의 최신 소식과 공지사항을 확인하세요.',
};

export const dynamic = 'force-dynamic';

export default async function NoticePage() {
  const firstPage = await getNoticesPaginated(1);

  return (
    <NoticeList
      initialItems={firstPage.items}
      totalCount={firstPage.totalCount}
      totalPages={firstPage.totalPages}
    />
  );
}
