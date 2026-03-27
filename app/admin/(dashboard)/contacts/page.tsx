import Link from 'next/link';
import { Eye } from 'lucide-react';
import { getAdminContactList } from '@/lib/api/admin';

export const dynamic = 'force-dynamic';

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? '';
  const { items, total, totalPages } = await getAdminContactList(
    page,
    10,
    search,
  );

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          견적문의 관리
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          총 {total}개
        </p>
      </div>

      <form className="flex gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="제목, 작성자 검색..."
          className="h-9 flex-1 rounded-lg border border-border/60 bg-muted/30 px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/40"
        />
        <button
          type="submit"
          className="h-9 rounded-lg bg-muted px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
        >
          검색
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
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
                작성자
              </th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                작성일
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                상태
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                보기
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {items.map((item) => (
              <tr
                key={item.qsn}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-4 py-3 font-heading text-muted-foreground">
                  {item.qsn}
                </td>
                <td className="max-w-[300px] px-4 py-3">
                  <p className="truncate font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground sm:hidden">
                    {item.writer}
                  </p>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {item.writer}
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                  {new Date(item.regdate).toISOString().split('T')[0]}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      item.adesc
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {item.adesc ? '답변완료' : '대기중'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/admin/contacts/${item.qsn}`}
                    className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Eye className="size-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 border-t border-border/50 px-4 py-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (p) => (
                <Link
                  key={p}
                  href={`/admin/contacts?page=${p}${search ? `&search=${search}` : ''}`}
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
