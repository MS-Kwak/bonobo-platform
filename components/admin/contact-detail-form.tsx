'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  MessageSquareReply,
  Phone,
  Save,
  Trash2,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ContactData {
  qsn: number;
  regdate: string;
  writer: string;
  title: string;
  content: string;
  tel: string | null;
  adesc: string | null;
  adate: string | null;
  vcnt: number;
}

interface Props {
  data: ContactData;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function ContactDetailForm({ data }: Props) {
  const router = useRouter();
  const isHtml =
    data.content.includes('<') && data.content.includes('>');
  const displayContent = isHtml
    ? stripHtml(data.content)
    : data.content;

  const [reply, setReply] = useState(data.adesc ?? '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const isReplied = !!data.adesc;

  async function handleSaveReply() {
    if (!reply.trim()) {
      setError('답변 내용을 입력해주세요.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qsn: data.qsn, adesc: reply }),
      });
      if (!res.ok) throw new Error();
      router.back();
      router.refresh();
    } catch {
      setError('답변 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (
      !confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')
    )
      return;
    setDeleting(true);
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qsn: data.qsn }),
      });
      if (!res.ok) throw new Error();
      router.back();
      router.refresh();
    } catch {
      setError('삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/contacts"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            견적문의 상세
          </h1>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-destructive/30 px-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
        >
          {deleting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Trash2 className="size-3.5" />
          )}
          삭제
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Inquiry Info */}
      <section className="space-y-5 rounded-xl border border-border/50 bg-card p-5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-xs font-medium',
              isReplied
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
            )}
          >
            {isReplied ? '답변완료' : '대기중'}
          </span>
          <span className="font-heading text-xs text-muted-foreground/40">
            #{data.qsn}
          </span>
          <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground/40">
            조회 {data.vcnt}
          </span>
        </div>

        <h2 className="text-xl font-bold leading-snug text-foreground">
          {data.title}
        </h2>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border/40 pb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="size-3.5" strokeWidth={1.5} />
            {data.writer}
          </span>
          {data.tel && (
            <span className="flex items-center gap-1.5">
              <Phone className="size-3.5" strokeWidth={1.5} />
              {data.tel}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" strokeWidth={1.5} />
            {formatDate(data.regdate)}
          </span>
        </div>

        <div className="prose-sm max-w-none whitespace-pre-wrap leading-relaxed text-foreground/80">
          {displayContent}
        </div>
      </section>

      {/* Reply Section */}
      <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
        <div className="flex items-center gap-2">
          <MessageSquareReply
            className="size-4 text-primary"
            strokeWidth={1.5}
          />
          <h2 className="text-sm font-semibold text-foreground">
            답변
          </h2>
          {isReplied && data.adate && (
            <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground/50">
              <CheckCircle2 className="size-3" />
              {formatDate(data.adate)}
            </span>
          )}
          {!isReplied && (
            <span className="ml-auto flex items-center gap-1 text-xs text-amber-500">
              <Clock className="size-3" />
              대기중
            </span>
          )}
        </div>

        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
          placeholder="답변 내용을 입력하세요..."
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSaveReply}
            disabled={saving}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Save className="size-3.5" />
            )}
            답변 저장
          </button>
        </div>
      </section>
    </div>
  );
}
