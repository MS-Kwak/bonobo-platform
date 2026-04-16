import { Metadata } from 'next';
import { PortfolioList } from '@/components/portfolio/portfolio-list';
import {
  getPortfolioItems,
  getCategoryCounts,
} from '@/lib/api/portfolio';

export const metadata: Metadata = {
  title: '포트폴리오 — (주)보노보플랫폼',
  description:
    '(주)보노보플랫폼이 완성한 200여 개 프로젝트를 확인하세요.',
};

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const items = await getPortfolioItems();
  const categoryCounts = getCategoryCounts(items);

  return (
    <PortfolioList
      initialItems={items}
      categoryCounts={categoryCounts}
    />
  );
}
