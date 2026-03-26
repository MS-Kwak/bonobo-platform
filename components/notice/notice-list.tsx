'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Bell,
  CalendarDays,
  ChevronRight,
  Eye,
  Megaphone,
  PinOff,
  Pin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { noticeItems, type NoticeItem } from '@/data/notices';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatViews(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천`;
  return n.toLocaleString();
}

export function NoticeList() {
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(
    () =>
      new Set(noticeItems.filter((n) => n.pinned).map((n) => n.id)),
  );

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const pinned = noticeItems.filter((n) => pinnedIds.has(n.id));
  const rest = noticeItems.filter((n) => !pinnedIds.has(n.id));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-10 lg:pt-40 lg:pb-16">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity"
            style={{ backgroundImage: 'url(/images/bg02.png)' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.04),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="font-heading text-sm font-bold tracking-widest text-white/60 uppercase"
            >
              Notice
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              공지사항
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-4 max-w-lg text-base leading-relaxed text-white/60"
            >
              보노보플랫폼의 최신 소식과 성과를 전해드립니다
            </motion.p>

            {/* Icon chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="mt-8 flex items-center gap-3"
            >
              {[
                {
                  icon: Bell,
                  label: '소식',
                  color: 'bg-blue-400/15 text-blue-300',
                },
                {
                  icon: Award,
                  label: '인증',
                  color: 'bg-amber-400/15 text-amber-300',
                },
                {
                  icon: Megaphone,
                  label: '공고',
                  color: 'bg-emerald-400/15 text-emerald-300',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.08,
                    ease,
                  }}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-4 py-2',
                    item.color,
                  )}
                >
                  <item.icon className="size-4" strokeWidth={1.5} />
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex items-center gap-8 text-sm"
            >
              <div className="flex flex-col items-center">
                <span className="font-heading text-2xl font-bold text-white">
                  {noticeItems.length}
                </span>
                <span className="text-xs text-white/40">
                  총 게시글
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="font-heading text-2xl font-bold text-white">
                  {pinnedIds.size}
                </span>
                <span className="text-xs text-white/40">고정됨</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="font-heading text-2xl font-bold text-white">
                  {noticeItems
                    .reduce((sum, n) => sum + n.views, 0)
                    .toLocaleString()}
                </span>
                <span className="text-xs text-white/40">
                  총 조회수
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notice List */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Pinned */}
          <AnimatePresence>
            {pinned.length > 0 && (
              <motion.div layout className="mb-10 space-y-4">
                {pinned.map((item) => (
                  <PinnedCard
                    key={item.id}
                    item={item}
                    onUnpin={(e) => togglePin(item.id, e)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Regular List */}
          <div className="divide-y divide-border/60">
            <AnimatePresence>
              {rest.map((item, i) => (
                <RegularRow
                  key={item.id}
                  item={item}
                  index={i}
                  onPin={(e) => togglePin(item.id, e)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function PinnedCard({
  item,
  onUnpin,
}: {
  item: NoticeItem;
  onUnpin: (e: React.MouseEvent) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease }}
    >
      <Link
        href={`/notice/${item.id}`}
        className="group relative block overflow-hidden rounded-2xl bg-primary/3 p-6 ring-1 ring-primary/10 transition-all duration-300 hover:bg-primary/6 hover:ring-primary/20 hover:shadow-lg sm:p-8"
      >
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onUnpin}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-red-500/10"
            title="고정 해제"
          >
            <PinOff
              className="size-4 text-primary transition-colors group-[:hover]:text-primary"
              strokeWidth={1.5}
            />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                고정
              </span>
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="hidden rounded-full bg-primary/10 px-2.5 py-0.5 font-heading text-xs font-medium text-primary sm:inline-block"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-2 text-lg font-bold text-foreground transition-colors duration-200 group-hover:text-primary sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {item.content}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays
                  className="size-3.5"
                  strokeWidth={1.5}
                />
                {formatDate(item.date)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="size-3.5" strokeWidth={1.5} />
                <span className="font-heading">
                  {formatViews(item.views)}
                </span>
              </span>
            </div>
          </div>
          <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </Link>
    </motion.div>
  );
}

function RegularRow({
  item,
  index,
  onPin,
}: {
  item: NoticeItem;
  index: number;
  onPin: (e: React.MouseEvent) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06, ease }}
    >
      <div className="group flex items-center gap-4 py-5 sm:gap-6 sm:px-4 sm:rounded-xl">
        <div className="hidden shrink-0 sm:block">
          <div className="flex size-12 flex-col items-center justify-center rounded-xl bg-muted/60 font-heading text-xs leading-tight">
            <span className="text-lg font-bold text-foreground">
              {new Date(item.date).getDate()}
            </span>
            <span className="text-muted-foreground">
              {new Date(item.date).toLocaleDateString('ko-KR', {
                month: 'short',
              })}
            </span>
          </div>
        </div>

        <Link href={`/notice/${item.id}`} className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
            {item.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 sm:hidden">
              <CalendarDays className="size-3" strokeWidth={1.5} />
              {formatDate(item.date)}
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              <span>{item.author}</span>
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-3" strokeWidth={1.5} />
              <span className="font-heading">
                {formatViews(item.views)}
              </span>
            </span>
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className="hidden rounded bg-muted px-1.5 py-0.5 font-heading text-xs text-muted-foreground sm:inline-block"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>

        <button
          type="button"
          onClick={onPin}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground/30 transition-all hover:bg-primary/10 hover:text-primary"
          title="상단에 고정"
        >
          <Pin className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
}
