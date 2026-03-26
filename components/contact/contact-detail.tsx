'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit3,
  MessageSquareReply,
  Phone,
  Trash2,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContactItem } from '@/data/contacts';
import { PasswordModal } from '@/components/contact/password-modal';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface Props {
  item: ContactItem;
  prev: ContactItem | null;
  next: ContactItem | null;
}

export function ContactDetail({ item, prev, next }: Props) {
  const router = useRouter();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f9f6f1] pt-32 pb-10 lg:pt-40 lg:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: 'url(/images/bg03.png)' }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#f9f6f1]/50 via-[#f9f6f1]/40 to-[#f9f6f1]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(180,130,50,0.05),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="font-heading text-sm font-bold tracking-widest text-foreground/50 uppercase"
            >
              Contact
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              견적문의
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          {/* Article */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Header */}
            <div className="border-b border-border/50 pb-6">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-medium',
                    item.replied
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600',
                  )}
                >
                  {item.replied ? '답변완료' : '대기중'}
                </span>
                <span className="font-heading text-xs text-muted-foreground/30">
                  #{item.id}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold leading-snug text-foreground">
                {item.title}
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5" strokeWidth={1.5} />
                  {item.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" strokeWidth={1.5} />
                  {item.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays
                    className="size-3.5"
                    strokeWidth={1.5}
                  />
                  {formatDate(item.date)}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="py-10">
              <div className="prose prose-base max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {item.content}
              </div>
            </div>

            {/* Reply */}
            {item.replied && item.reply && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-6"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <MessageSquareReply
                    className="size-4"
                    strokeWidth={1.5}
                  />
                  답변
                  {item.replyDate && (
                    <span className="ml-auto text-xs font-normal text-emerald-600/50">
                      {formatDate(item.replyDate)}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-emerald-800/80">
                  {item.reply}
                </p>
              </motion.div>
            )}

            {!item.replied && (
              <div className="rounded-2xl border border-border/50 bg-muted/20 p-6 text-center">
                <Clock
                  className="mx-auto size-8 text-muted-foreground/30"
                  strokeWidth={1.5}
                />
                <p className="mt-3 text-sm text-muted-foreground">
                  답변 대기 중입니다. 빠른 시일 내에 답변드리겠습니다.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setEditModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted"
              >
                <Edit3 className="size-4" strokeWidth={1.5} />
                수정
              </button>
              <button
                type="button"
                onClick={() => setDeleteModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-medium text-red-500 transition-all hover:bg-red-50"
              >
                <Trash2 className="size-4" strokeWidth={1.5} />
                삭제
              </button>
            </div>

            {/* Bottom back button */}
            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} />
                견적문의 목록
              </Link>
            </div>
          </motion.article>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12 divide-y divide-border/50 overflow-hidden rounded-2xl border border-border/50"
          >
            {prev && (
              <Link
                href={`/contact/${prev.id}`}
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/30"
              >
                <ChevronLeft
                  className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:-translate-x-0.5"
                  strokeWidth={1.5}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground/50">
                    이전 글
                  </p>
                  <p className="mt-0.5 truncate text-sm text-foreground">
                    {prev.title}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
                    prev.replied
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600',
                  )}
                >
                  {prev.replied ? '답변완료' : '대기중'}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/contact/${next.id}`}
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/30"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground/50">
                    다음 글
                  </p>
                  <p className="mt-0.5 truncate text-sm text-foreground">
                    {next.title}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
                    next.replied
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600',
                  )}
                >
                  {next.replied ? '답변완료' : '대기중'}
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Edit Password Modal */}
      <PasswordModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        onConfirm={() => {
          setEditModal(false);
          router.push(`/contact/${item.id}/edit`);
        }}
      />

      {/* Delete Password Modal */}
      <PasswordModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => {
          setDeleteModal(false);
          alert('삭제되었습니다. (DB 연동 후 실제 삭제)');
          router.push('/contact');
        }}
      />
    </>
  );
}
