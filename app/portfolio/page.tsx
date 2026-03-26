import { Metadata } from 'next';
import { PortfolioList } from '@/components/portfolio/portfolio-list';

export const metadata: Metadata = {
  title: '포트폴리오 — 보노보플랫폼',
  description:
    '보노보플랫폼이 완성한 200여 개 프로젝트를 확인하세요.',
};

export default function PortfolioPage() {
  return <PortfolioList />;
}
