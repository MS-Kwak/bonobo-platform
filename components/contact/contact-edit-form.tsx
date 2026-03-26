'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  MessageSquareText,
  Phone,
  Save,
  Type,
  User,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContactItem } from '@/data/contacts';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface FormData {
  author: string;
  phone: string;
  title: string;
  content: string;
}

interface FormErrors {
  author?: string;
  phone?: string;
  title?: string;
  content?: string;
}

export function ContactEditForm({ item }: { item: ContactItem }) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    author: item.author,
    phone: item.phone,
    title: item.title,
    content: item.content,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key])
      setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.author.trim()) e.author = '작성자를 입력해주세요';
    if (!form.phone.trim()) e.phone = '연락처를 입력해주세요';
    if (!form.title.trim()) e.title = '제목을 입력해주세요';
    if (!form.content.trim()) e.content = '상세내역을 입력해주세요';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setSubmitting(false);
    setTimeout(() => router.push(`/contact/${item.id}`), 1200);
  };

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
              문의 수정
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          {/* Saved toast */}
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
            >
              <CheckCircle2
                className="size-4 shrink-0"
                strokeWidth={1.5}
              />
              수정이 완료되었습니다. 상세 페이지로 이동합니다.
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="mb-8 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
              <AlertCircle
                className="size-4 shrink-0"
                strokeWidth={1.5}
              />
              <span>
                <strong className="font-semibold">*</strong> 표시가
                있는 항목은 필수 입력 항목입니다.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  label="작성자"
                  required
                  error={errors.author}
                  icon={<User className="size-4" strokeWidth={1.5} />}
                >
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => update('author', e.target.value)}
                    className={inputClass(errors.author)}
                  />
                </FormField>
                <FormField
                  label="연락처"
                  required
                  error={errors.phone}
                  icon={
                    <Phone className="size-4" strokeWidth={1.5} />
                  }
                >
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={inputClass(errors.phone)}
                  />
                </FormField>
              </div>

              <FormField
                label="제목"
                required
                error={errors.title}
                icon={<Type className="size-4" strokeWidth={1.5} />}
              >
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update('title', e.target.value)}
                  className={inputClass(errors.title)}
                />
              </FormField>

              <FormField
                label="상세내역"
                required
                error={errors.content}
                icon={
                  <MessageSquareText
                    className="size-4"
                    strokeWidth={1.5}
                  />
                }
              >
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => update('content', e.target.value)}
                  className={cn(
                    inputClass(errors.content),
                    'resize-none',
                  )}
                />
              </FormField>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting || saved}
                  className="inline-flex w-32 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-60"
                >
                  {submitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="size-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                  ) : (
                    <Save className="size-4" strokeWidth={1.5} />
                  )}
                  {submitting ? '저장 중...' : '수정하기'}
                </button>
                <Link
                  href={`/contact/${item.id}`}
                  className="inline-flex w-32 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-muted"
                >
                  <X className="size-4" strokeWidth={1.5} />
                  취소
                </Link>
              </div>
            </form>

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
          </motion.div>
        </div>
      </section>
    </>
  );
}

function inputClass(error?: string) {
  return cn(
    'w-full rounded-xl border bg-muted/20 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20',
    error ? 'border-red-400 ring-2 ring-red-400/20' : 'border-border',
  );
}

function FormField({
  label,
  required,
  error,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
        <span className="text-muted-foreground/50">{icon}</span>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
