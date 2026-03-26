'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  KeyRound,
  List,
  MessageSquareText,
  Phone,
  RotateCcw,
  Send,
  Type,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface FormData {
  author: string;
  phone: string;
  title: string;
  content: string;
  password: string;
}

interface FormErrors {
  author?: string;
  phone?: string;
  title?: string;
  content?: string;
  password?: string;
}

export function ContactForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    author: '',
    phone: '',
    title: '',
    content: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    if (!form.password.trim()) e.password = '비밀번호를 입력해주세요';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      author: '',
      phone: '',
      title: '',
      content: '',
      password: '',
    });
    setErrors({});
  };

  if (submitted) {
    return (
      <>
        {/* Hero (slim) */}
        <section className="relative overflow-hidden bg-[#f9f6f1] pt-32 pb-10 lg:pt-40 lg:pb-16">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: 'url(/images/bg03.png)' }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#f9f6f1]/50 via-[#f9f6f1]/40 to-[#f9f6f1]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_50%)]" />
          </div>
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="font-heading text-sm font-bold tracking-widest text-foreground/50 uppercase">
              Contact
            </p>
            <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              견적문의
            </h1>
          </div>
        </section>

        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-lg px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2
                  className="size-8 text-emerald-600"
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-foreground">
                문의가 등록되었습니다
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                빠른 시일 내에 확인 후 답변드리겠습니다.
                <br />
                감사합니다.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition-all hover:bg-muted"
                >
                  <ArrowLeft className="size-4" strokeWidth={1.5} />
                  목록으로
                </Link>
                <Link
                  href="/contact/write"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary/90"
                  onClick={() => setSubmitted(false)}
                >
                  <Send className="size-4" strokeWidth={1.5} />새 문의
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

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

      {/* Form */}
      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Required note */}
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
              {/* Author + Phone */}
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
                    placeholder="이름을 입력하세요"
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
                    placeholder="010-0000-0000"
                    className={inputClass(errors.phone)}
                  />
                </FormField>
              </div>

              {/* Title */}
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
                  placeholder="문의 제목을 입력하세요"
                  className={inputClass(errors.title)}
                />
              </FormField>

              {/* Content */}
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
                  placeholder="프로젝트에 대해 자세히 설명해주세요. &#10;&#10;• 프로젝트 유형 (웹, 앱, 시스템 등)&#10;• 예상 일정 및 예산&#10;• 참고 사이트"
                  className={cn(
                    inputClass(errors.content),
                    'resize-none',
                  )}
                />
              </FormField>

              {/* Password */}
              <FormField
                label="비밀번호"
                required
                error={errors.password}
                icon={
                  <KeyRound className="size-4" strokeWidth={1.5} />
                }
                hint="글 수정/삭제 시 필요합니다"
              >
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="비밀번호를 설정하세요"
                  className={inputClass(errors.password)}
                />
              </FormField>

              {/* Buttons */}
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex w-32 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-muted"
                >
                  <RotateCcw className="size-4" strokeWidth={1.5} />
                  초기화
                </button>
                <button
                  type="submit"
                  disabled={submitting}
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
                    <Send className="size-4" strokeWidth={1.5} />
                  )}
                  {submitting ? '등록 중...' : '등록하기'}
                </button>
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
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  icon: React.ReactNode;
  hint?: string;
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
      {hint && !error && (
        <p className="mt-1.5 text-xs text-muted-foreground/60">
          {hint}
        </p>
      )}
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
