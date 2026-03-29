'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Lock,
  MessageSquarePlus,
  PenLine,
  Send,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PasswordModal } from '@/components/contact/password-modal';
import type { ContactListResult } from '@/lib/api/contacts';

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
  data: ContactListResult;
}

export function ContactList({ data }: Props) {
  const router = useRouter();
  const [passwordModalId, setPasswordModalId] = useState<
    number | null
  >(null);
  const [pwError, setPwError] = useState('');
  const [verifying, setVerifying] = useState(false);

  async function handlePasswordConfirm(password: string) {
    if (!passwordModalId) return;
    setVerifying(true);
    setPwError('');
    try {
      const res = await fetch('/api/contact/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qsn: passwordModalId, password }),
      });
      const result = await res.json();
      if (result.valid) {
        setPasswordModalId(null);
        router.push(`/contact/${passwordModalId}`);
      } else {
        setPwError('비밀번호가 일치하지 않습니다.');
      }
    } catch {
      setPwError('확인 중 오류가 발생했습니다.');
    } finally {
      setVerifying(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f9f6f1] pt-32 pb-20 lg:pt-40 lg:pb-28">
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
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              프로젝트에 대해 편하게 문의해주세요
            </motion.p>

            {/* Stats chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="mt-8 flex items-center gap-3"
            >
              {[
                {
                  icon: Send,
                  label: '총 문의',
                  value: data.totalCount,
                  chip: 'bg-amber-500/12 text-amber-700',
                },
                {
                  icon: CheckCircle2,
                  label: '답변완료',
                  value: data.repliedCount,
                  chip: 'bg-emerald-500/12 text-emerald-700',
                },
                {
                  icon: Clock,
                  label: '대기중',
                  value: data.pendingCount,
                  chip: 'bg-orange-500/12 text-orange-600',
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.08,
                    ease,
                  }}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-4 py-2',
                    stat.chip,
                  )}
                >
                  <stat.icon className="size-4" strokeWidth={1.5} />
                  <span className="text-xs font-medium">
                    {stat.label}
                  </span>
                  <span className="font-heading text-sm font-bold">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Action bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mb-8 flex items-center justify-between"
          >
            <p className="text-sm text-muted-foreground">
              총{' '}
              <span className="font-heading font-bold text-foreground">
                {data.totalCount}
              </span>
              건의 문의
            </p>
            <Link
              href="/contact/write"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              <PenLine className="size-4" strokeWidth={1.5} />
              문의하기
            </Link>
          </motion.div>

          {/* Cards */}
          <div className="space-y-3">
            {data.items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: (i % 6) * 0.06,
                  ease,
                }}
              >
                <button
                  type="button"
                  onClick={() => setPasswordModalId(item.id)}
                  className="group flex w-full items-center gap-4 rounded-xl p-4 text-left ring-1 ring-border/40 transition-all duration-200 hover:bg-muted/30 hover:ring-border/60 hover:shadow-sm sm:gap-5 sm:p-5"
                >
                  {/* Status */}
                  <div
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-xl',
                      item.replied
                        ? 'bg-emerald-500/10'
                        : 'bg-amber-500/10',
                    )}
                  >
                    {item.replied ? (
                      <CheckCircle2
                        className="size-5 text-emerald-600"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Clock
                        className="size-5 text-amber-600"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                        {item.title}
                      </h3>
                      <Lock
                        className="size-3.5 shrink-0 text-muted-foreground/30"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="size-3" strokeWidth={1.5} />
                        {item.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays
                          className="size-3"
                          strokeWidth={1.5}
                        />
                        {formatDate(item.date)}
                      </span>
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-medium',
                          item.replied
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-amber-500/10 text-amber-600',
                        )}
                      >
                        {item.replied ? '답변완료' : '대기중'}
                      </span>
                    </div>
                  </div>

                  {/* Number */}
                  <span className="hidden font-heading text-sm text-muted-foreground/30 sm:block">
                    #{item.id}
                  </span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1">
              {Array.from(
                { length: data.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <Link
                  key={p}
                  href={`/contact?page=${p}`}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                    p === data.currentPage
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:bg-muted',
                  )}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}

          {/* Write button (bottom) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/contact/write"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted hover:shadow-sm"
            >
              <MessageSquarePlus
                className="size-4 text-primary"
                strokeWidth={1.5}
              />
              새 문의 작성하기
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Password Modal */}
      <PasswordModal
        isOpen={passwordModalId !== null}
        onClose={() => {
          setPasswordModalId(null);
          setPwError('');
        }}
        onConfirm={handlePasswordConfirm}
        error={pwError}
        loading={verifying}
      />
    </>
  );
}
