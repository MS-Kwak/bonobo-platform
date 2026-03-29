'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Loader2,
  Save,
  Trash2,
  ArrowLeft,
  X,
  Plus,
  ImageIcon,
  Pin,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const INPUT_CLASS =
  'h-10 w-full rounded-lg border border-border/60 bg-muted/30 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10';
const TEXTAREA_CLASS =
  'w-full rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10';

interface NoticeFormData {
  psn?: number;
  ptitle: string;
  pname: string;
  regdate: string;
  pdesc: string;
  is_pinned: number;
}

interface Props {
  initialData?: NoticeFormData;
  initialImages?: string[];
  isNew?: boolean;
}

function extractImagesFromContent(html: string): {
  images: string[];
  cleanHtml: string;
} {
  const imgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*\/?>/gi;
  const images: string[] = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    images.push(match[1]);
  }
  const cleanHtml = html
    .replace(/<img\s+[^>]*\/?>/gi, '')
    .replace(/<p[^>]*>\s*(&nbsp;|\s)*<\/p>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { images, cleanHtml };
}

function stripHtmlTags(html: string): string {
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

function buildInitial(data?: NoticeFormData): NoticeFormData {
  if (data) return data;
  return {
    ptitle: '',
    pname: '관리자',
    regdate: new Date().toISOString().split('T')[0],
    pdesc: '',
    is_pinned: 0,
  };
}

export function NoticeForm({
  initialData,
  initialImages,
  isNew,
}: Props) {
  const router = useRouter();
  const init = buildInitial(initialData);

  const isHtml = init.pdesc.includes('<') && init.pdesc.includes('>');
  if (isHtml && !initialImages) {
    const { cleanHtml } = extractImagesFromContent(init.pdesc);
    init.pdesc = stripHtmlTags(cleanHtml);
  } else if (isHtml) {
    const { cleanHtml } = extractImagesFromContent(init.pdesc);
    init.pdesc = stripHtmlTags(cleanHtml);
  }

  const [form, setForm] = useState<NoticeFormData>(init);
  const [contentImages, setContentImages] = useState<string[]>(
    initialImages ?? [],
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const contentImgRef = useRef<HTMLInputElement>(null);

  function updateField<K extends keyof NoticeFormData>(
    key: K,
    value: NoticeFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadFile(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.url;
    } catch {
      return null;
    }
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) urls.push(url);
    }
    if (urls.length > 0) {
      setContentImages((prev) => [...prev, ...urls]);
    }
    setUploading(false);
    e.target.value = '';
  }

  function buildFinalPdesc(): string {
    const cleanText = form.pdesc
      .replace(/<img\s+[^>]*\/?>/gi, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    const parts: string[] = [];
    if (cleanText) parts.push(cleanText);
    if (contentImages.length > 0) {
      parts.push(
        contentImages.map((u) => `<img src="${u}" />`).join('\n'),
      );
    }
    return parts.join('\n\n');
  }

  async function handleSave() {
    if (!form.ptitle.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        pkind: 0,
        ptitle: form.ptitle,
        pname: form.pname || '관리자',
        regdate:
          form.regdate || new Date().toISOString().split('T')[0],
        pdesc: buildFinalPdesc(),
        is_pinned: form.is_pinned,
      };
      if (isNew) {
        payload.hit = 0;
        await fetch('/api/admin/notices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/admin/notices', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ psn: form.psn, ...payload }),
        });
      }
      if (isNew) {
        router.push('/admin/notices');
      } else {
        router.back();
      }
      router.refresh();
    } catch {
      setError('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!form.psn || !confirm('정말 삭제하시겠습니까?')) return;
    setDeleting(true);
    try {
      await fetch('/api/admin/notices', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ psn: form.psn }),
      });
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
            href="/admin/notices"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {isNew ? '공지사항 등록' : '공지사항 수정'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && form.psn && (
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
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Save className="size-3.5" />
            )}
            저장
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Basic Info */}
      <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          기본 정보
        </h2>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            제목 <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={form.ptitle}
            onChange={(e) => updateField('ptitle', e.target.value)}
            className={INPUT_CLASS}
            placeholder="공지사항 제목"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              작성자
            </label>
            <input
              type="text"
              value={form.pname}
              onChange={(e) => updateField('pname', e.target.value)}
              className={INPUT_CLASS}
              placeholder="관리자"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              작성일
            </label>
            <input
              type="text"
              value={form.regdate}
              onChange={(e) => updateField('regdate', e.target.value)}
              className={INPUT_CLASS}
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            상단 고정
          </label>
          <button
            type="button"
            onClick={() =>
              updateField('is_pinned', form.is_pinned === 1 ? 0 : 1)
            }
            className={cn(
              'flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
              form.is_pinned === 1
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            <Pin className="size-3.5" />
            {form.is_pinned === 1 ? '고정됨' : '고정 안함'}
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          본문
        </h2>
        <textarea
          value={form.pdesc}
          onChange={(e) => updateField('pdesc', e.target.value)}
          className={cn(
            TEXTAREA_CLASS,
            'min-h-[300px] leading-relaxed',
          )}
          placeholder="공지 내용을 입력하세요..."
        />
      </section>

      {/* Images */}
      <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          이미지
        </h2>
        <input
          ref={contentImgRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />

        {contentImages.length > 0 ? (
          <div className="space-y-3">
            {contentImages.map((url, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg border border-border/50"
              >
                <Image
                  src={url}
                  alt={`이미지 ${i + 1}`}
                  width={700}
                  height={400}
                  className="h-48 w-full object-cover"
                  unoptimized
                />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setContentImages((prev) =>
                        prev.filter((_, j) => j !== i),
                      )
                    }
                    className="flex size-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => contentImgRef.current?.click()}
              disabled={uploading}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border/60 py-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}
              이미지 추가
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => contentImgRef.current?.click()}
            disabled={uploading}
            className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border/60 py-10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {uploading ? (
              <Loader2 className="size-8 animate-spin" />
            ) : (
              <ImageIcon className="size-8" strokeWidth={1.5} />
            )}
            <span className="text-sm font-medium">
              {uploading ? '업로드 중...' : '클릭하여 이미지 업로드'}
            </span>
            <span className="text-xs text-muted-foreground/60">
              JPG, PNG, GIF, WebP (최대 10MB)
            </span>
          </button>
        )}
      </section>
    </div>
  );
}
