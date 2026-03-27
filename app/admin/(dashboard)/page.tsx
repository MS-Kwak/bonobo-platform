import {
  Briefcase,
  Megaphone,
  MessageSquare,
  Eye,
} from 'lucide-react';
import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [[portfolio], [notice], [contact], [recentContacts]] =
    await Promise.all([
      pool.query<RowDataPacket[]>(
        'SELECT COUNT(*) as cnt FROM PubNotice WHERE pkind IN (1,2)',
      ),
      pool.query<RowDataPacket[]>(
        'SELECT COUNT(*) as cnt FROM PubNotice WHERE pkind = 0',
      ),
      pool.query<RowDataPacket[]>(
        'SELECT COUNT(*) as cnt FROM WebQA',
      ),
      pool.query<RowDataPacket[]>(
        'SELECT qsn, writer, title, regdate, adesc FROM WebQA ORDER BY regdate DESC LIMIT 5',
      ),
    ]);

  return {
    portfolioCount: portfolio[0].cnt as number,
    noticeCount: notice[0].cnt as number,
    contactCount: contact[0].cnt as number,
    recentContacts: recentContacts as {
      qsn: number;
      writer: string;
      title: string;
      regdate: Date;
      adesc: string | null;
    }[],
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      label: '포트폴리오',
      count: stats.portfolioCount,
      icon: Briefcase,
      href: '/admin/portfolio',
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      label: '공지사항',
      count: stats.noticeCount,
      icon: Megaphone,
      href: '/admin/notices',
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      label: '견적문의',
      count: stats.contactCount,
      icon: MessageSquare,
      href: '/admin/contacts',
      color: 'text-emerald-500 bg-emerald-500/10',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          대시보드
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          보노보플랫폼 관리 시스템
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-xl border border-border/50 bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${card.color}`}
                >
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>
                <span className="font-heading text-3xl font-bold text-foreground">
                  {card.count}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                {card.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="rounded-xl border border-border/50 bg-card">
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
          <h2 className="font-bold text-foreground">최근 견적문의</h2>
          <Link
            href="/admin/contacts"
            className="text-xs font-medium text-primary hover:underline"
          >
            전체보기
          </Link>
        </div>
        <div className="divide-y divide-border/50">
          {stats.recentContacts.map((c) => (
            <Link
              key={c.qsn}
              href={`/admin/contacts/${c.qsn}`}
              className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {c.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {c.writer} &middot;{' '}
                  {new Date(c.regdate).toISOString().split('T')[0]}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  c.adesc
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}
              >
                {c.adesc ? '답변완료' : '대기중'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
