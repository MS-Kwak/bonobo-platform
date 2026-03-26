import { Metadata } from 'next';
import { NoticeList } from '@/components/notice/notice-list';

export const metadata: Metadata = {
  title: '공지사항 — 보노보플랫폼',
  description: '보노보플랫폼의 최신 소식과 공지사항을 확인하세요.',
};

export default function NoticePage() {
  return <NoticeList />;
}
