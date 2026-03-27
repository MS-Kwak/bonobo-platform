import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { getAdminPortfolioList } from '@/lib/api/admin';

export const dynamic = 'force-dynamic';

const K_LABELS: Record<string, string> = {
  k01: 'ERP',
  k02: 'IoT',
  k03: '빅데이터',
  k04: '예측분석',
  k05: '매칭플랫폼',
  k06: '쇼핑몰',
  k07: '홈페이지',
  k08: 'App',
  k09: '응용프로그램',
  k10: '정부지원사업',
};

export default async function AdminPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? '';
  const { items, total, totalPages } = await getAdminPortfolioList(
    page,
    20,
    search,
  );

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            포트폴리오 관리
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            총 {total}개
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" />
          신규 등록
        </Link>
      </div>

      <form className="flex gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="제목, 고객사 검색..."
          className="h-9 flex-1 rounded-lg border border-border/60 bg-card px-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/40"
        />
        <button
          type="submit"
          className="h-9 rounded-lg bg-muted px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
        >
          검색
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/40">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  #
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  제목
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">
                  고객사
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                  구분
                </th>
                <th className="hidden px-4 py-3 text-center font-medium text-muted-foreground sm:table-cell">
                  조회
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {items.map((item) => {
                const tags: string[] = [];
                for (let i = 1; i <= 10; i++) {
                  const k = `k${String(i).padStart(2, '0')}`;
                  if ((item as Record<string, number>)[k] === 1)
                    tags.push(K_LABELS[k]);
                }
                return (
                  <tr
                    key={item.psn}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3 font-heading text-muted-foreground">
                      {item.psn}
                    </td>
                    <td className="max-w-[300px] px-4 py-3">
                      <p className="truncate font-medium text-foreground">
                        {item.ptitle}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground sm:hidden">
                        {item.client_name || item.pname}
                      </p>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                      {item.client_name || item.pname}
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                        {tags.length > 3 && (
                          <span className="text-[11px] text-muted-foreground">
                            +{tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-center font-heading text-muted-foreground sm:table-cell">
                      {item.hit}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/admin/portfolio/${item.psn}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Pencil className="size-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 border-t border-border/50 px-4 py-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (p) => (
                <Link
                  key={p}
                  href={`/admin/portfolio?page=${p}${search ? `&search=${search}` : ''}`}
                  className={`flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {p}
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
