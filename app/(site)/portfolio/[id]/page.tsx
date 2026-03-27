import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPortfolioById,
  getRelatedPortfolioItems,
} from '@/lib/api/portfolio';
import { categories } from '@/data/portfolio';
import { PortfolioDetail } from '@/components/portfolio/portfolio-detail';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const psn = Number(id);
  if (isNaN(psn)) return { title: '프로젝트를 찾을 수 없습니다' };

  const item = await getPortfolioById(psn);
  if (!item) return { title: '프로젝트를 찾을 수 없습니다' };

  return {
    title: `${item.title} — 보노보플랫폼 포트폴리오`,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const psn = Number(id);
  if (isNaN(psn)) notFound();

  const item = await getPortfolioById(psn);
  if (!item) notFound();

  const categoryLabel =
    categories.find((c) => c.id === item.category)?.label ??
    item.category;

  const related = await getRelatedPortfolioItems(
    item.id,
    item.category,
  );

  return (
    <PortfolioDetail
      item={item}
      categoryLabel={categoryLabel}
      related={related}
    />
  );
}
