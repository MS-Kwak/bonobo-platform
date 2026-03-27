import Link from 'next/link';
import { Plus, Pencil, Pin } from 'lucide-react';
import { getAdminNoticeList } from '@/lib/api/admin';

export const dynamic = 'force-dynamic';

export default async function AdminNoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? '';
  const { items, total, totalPages } = await getAdminNoticeList(
    page,
    20,
    search,
  );

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            공지사항 관리
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            총 {total}개
          </p>
        </div>
        <Link
          href="/admin/notices/new"
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
          placeholder="제목 검색..."
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
                작성일
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
            {items.map((item) => (
              <tr
                key={item.psn}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-4 py-3 font-heading text-muted-foreground">
                  {item.psn}
                </td>
                <td className="max-w-[350px] px-4 py-3">
                  <div className="flex items-center gap-2">
                    {item.is_pinned === 1 && (
                      <Pin className="size-3.5 shrink-0 text-primary" />
                    )}
                    <span className="truncate font-medium text-foreground">
                      {item.ptitle}
                    </span>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {new Date(item.regdate).toISOString().split('T')[0]}
                </td>
                <td className="hidden px-4 py-3 text-center font-heading text-muted-foreground sm:table-cell">
                  {item.hit}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/admin/notices/${item.psn}`}
                    className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Pencil className="size-3.5" />
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
                  href={`/admin/notices?page=${p}${search ? `&search=${search}` : ''}`}
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
