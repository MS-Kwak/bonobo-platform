'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Eye,
  User,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import type { NoticeItem } from '@/data/notices';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface Props {
  item: NoticeItem;
  prev: NoticeItem | null;
  next: NoticeItem | null;
}

export function NoticeDetail({ item, prev, next }: Props) {
  return (
    <>
      {/* Article */}
      <article className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {item.tags && item.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-3 py-1 font-heading text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl lg:text-4xl">
              {item.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border/50 pb-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <User className="size-3.5" strokeWidth={1.5} />
              {item.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" strokeWidth={1.5} />
              {formatDate(item.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="size-3.5" strokeWidth={1.5} />
              <span className="font-heading">
                {item.views.toLocaleString()}
              </span>
            </span>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="prose-base mt-10 max-w-none space-y-5 leading-relaxed text-foreground/80"
          >
            {item.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <Link
              href="/notice"
              className="inline-flex items-center gap-1.5 rounded-lg bg-muted/60 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              목록으로
            </Link>
          </motion.div>
        </div>
      </article>

      {/* Prev / Next Navigation */}
      <section className="border-t border-border/50 bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-border/50 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {prev ? (
              <Link
                href={`/notice/${prev.id}`}
                className="group flex items-center gap-3 py-6 pr-4 transition-colors hover:bg-muted/30 sm:rounded-l-xl sm:px-4"
              >
                <ChevronLeft className="size-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:text-primary" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    이전 글
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="py-6 sm:px-4">
                <p className="text-xs text-muted-foreground/40">
                  이전 글이 없습니다
                </p>
              </div>
            )}

            {next ? (
              <Link
                href={`/notice/${next.id}`}
                className="group flex items-center justify-end gap-3 py-6 pl-4 text-right transition-colors hover:bg-muted/30 sm:rounded-r-xl sm:px-4"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    다음 글
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {next.title}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ) : (
              <div className="py-6 text-right sm:px-4">
                <p className="text-xs text-muted-foreground/40">
                  다음 글이 없습니다
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
