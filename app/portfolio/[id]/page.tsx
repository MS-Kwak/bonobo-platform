import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { portfolioItems, categories } from '@/data/portfolio';
import { PortfolioDetail } from '@/components/portfolio/portfolio-detail';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const item = portfolioItems.find((p) => p.id === id);
  if (!item) return { title: '프로젝트를 찾을 수 없습니다' };

  return {
    title: `${item.title} — 보노보플랫폼 포트폴리오`,
    description: item.description,
  };
}

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ id: item.id }));
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const item = portfolioItems.find((p) => p.id === id);
  if (!item) notFound();

  const categoryLabel =
    categories.find((c) => c.id === item.category)?.label ??
    item.category;

  const others = portfolioItems.filter((p) => p.id !== item.id);
  const sameCategory = others.filter((p) => p.category === item.category);
  const rest = others.filter((p) => p.category !== item.category);
  const related = [...sameCategory, ...rest].slice(0, 3);

  return (
    <>
      {/* Back button */}
      <div className="bg-white pt-24 lg:pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            포트폴리오 목록
          </Link>
        </div>
      </div>

      <PortfolioDetail
        item={item}
        categoryLabel={categoryLabel}
        related={related}
      />
    </>
  );
}
