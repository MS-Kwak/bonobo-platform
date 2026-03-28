'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Loader2,
  Save,
  Trash2,
  ArrowLeft,
  X,
  Plus,
  Upload,
  ImageIcon,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const INPUT_CLASS =
  'h-10 w-full rounded-lg border border-border/60 bg-muted/30 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10';
const TEXTAREA_CLASS =
  'w-full rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10';
const SELECT_CLASS =
  'h-10 w-full rounded-lg border border-border/60 bg-muted/30 px-3 text-sm text-foreground outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-primary/10';

const CATEGORY_OPTIONS = [
  { id: 'web', label: 'Web / Mobile' },
  { id: 'app', label: 'App' },
  { id: 'program', label: 'Program' },
  { id: 'ai', label: 'AI / Data' },
] as const;

const TECH_STACK_OPTIONS = [
  'React',
  'React Native',
  'Next.js',
  'Flutter',
  'Node.js',
  'Supabase',
  'MariaDB',
  'MySQL',
  'PostgreSQL',
  'PHP',
  'TailwindCSS',
  'PWA',
  'Python',
  'Java',
  'Spring',
  'Vue.js',
  'Angular',
  'JavaScript',
  'TypeScript',
  'jQuery',
  'Docker',
  'AWS',
  'Firebase',
  'MQTT',
  'OpenCV',
  'REST API',
  'Android',
  'iOS',
  '바코드 SDK',
  'TensorFlow',
  'WebSocket',
  'IoT',
] as const;

const K_FLAG_MAP: Record<string, string[]> = {
  web: ['k05', 'k06', 'k07'],
  app: ['k08'],
  program: ['k01', 'k09', 'k10'],
  ai: ['k02', 'k03', 'k04'],
};

const K_FLAG_OPTIONS: {
  key: string;
  label: string;
  group: string;
}[] = [
  { key: 'k01', label: 'ERP', group: 'program' },
  { key: 'k05', label: '매칭플랫폼', group: 'web' },
  { key: 'k06', label: '쇼핑몰', group: 'web' },
  { key: 'k07', label: '홈페이지', group: 'web' },
  { key: 'k08', label: 'App', group: 'app' },
  { key: 'k09', label: '응용프로그램', group: 'program' },
  { key: 'k10', label: '정부지원사업', group: 'program' },
  { key: 'k02', label: 'IoT', group: 'ai' },
  { key: 'k03', label: '빅데이터', group: 'ai' },
  { key: 'k04', label: '예측분석', group: 'ai' },
];

interface PortfolioFormData {
  psn?: number;
  pkind: number;
  ptitle: string;
  pname: string;
  client_name: string;
  regdate: string;
  pdesc: string;
  tech_stack: string;
  card_size: string;
  himage: string;
  category: string;
  description: string;
  features: string;
  k01: number;
  k02: number;
  k03: number;
  k04: number;
  k05: number;
  k06: number;
  k07: number;
  k08: number;
  k09: number;
  k10: number;
}

interface Props {
  initialData?: PortfolioFormData;
  isNew?: boolean;
}

function buildInitial(data?: PortfolioFormData): PortfolioFormData {
  if (data) return data;
  return {
    pkind: 1,
    ptitle: '',
    pname: '보노보플랫폼',
    client_name: '',
    regdate: new Date().toISOString().split('T')[0],
    pdesc: '',
    tech_stack: '',
    card_size: '',
    himage: '',
    category: 'web',
    description: '',
    features: '',
    k01: 0,
    k02: 0,
    k03: 0,
    k04: 0,
    k05: 0,
    k06: 0,
    k07: 0,
    k08: 0,
    k09: 0,
    k10: 0,
  };
}

function extractImagesFromPdesc(pdesc: string): {
  images: string[];
  cleanPdesc: string;
} {
  const imgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*\/?>/gi;
  const images: string[] = [];
  let match;
  while ((match = imgRegex.exec(pdesc)) !== null) {
    images.push(match[1]);
  }
  const cleanPdesc = pdesc
    .replace(/<img\s+[^>]*\/?>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { images, cleanPdesc };
}

function detectCategory(data: PortfolioFormData): string {
  if (data.k02 === 1 || data.k03 === 1 || data.k04 === 1) return 'ai';
  if (data.k08 === 1) return 'app';
  if (data.k01 === 1 || data.k09 === 1 || data.k10 === 1)
    return 'program';
  if (data.k05 === 1 || data.k06 === 1 || data.k07 === 1)
    return 'web';
  return 'web';
}

export function PortfolioForm({ initialData, isNew }: Props) {
  const router = useRouter();
  const init = buildInitial(initialData);
  if (initialData && !initialData.category) {
    init.category = detectCategory(init);
  }

  const { images: initImages, cleanPdesc } = extractImagesFromPdesc(
    init.pdesc,
  );
  init.pdesc = cleanPdesc;

  const [form, setForm] = useState<PortfolioFormData>(init);
  const [selectedTech, setSelectedTech] = useState<string[]>(
    init.tech_stack
      ? init.tech_stack
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
  );
  const [customTech, setCustomTech] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentFileInputRef = useRef<HTMLInputElement>(null);
  const [contentImages, setContentImages] =
    useState<string[]>(initImages);

  const updateField = useCallback(
    <K extends keyof PortfolioFormData>(
      key: K,
      val: PortfolioFormData[K],
    ) => {
      setForm((prev) => ({ ...prev, [key]: val }));
    },
    [],
  );

  function handleCategoryChange(cat: string) {
    const reset: Record<string, number> = {};
    for (let i = 1; i <= 10; i++)
      reset[`k${String(i).padStart(2, '0')}`] = 0;
    const defaultFlag = K_FLAG_MAP[cat]?.[0];
    if (defaultFlag) reset[defaultFlag] = 1;
    setForm((prev) => ({ ...prev, ...reset, category: cat }));
  }

  function toggleKFlag(key: string) {
    setForm((prev) => {
      const updated = {
        ...prev,
        [key]: prev[key as keyof PortfolioFormData] === 1 ? 0 : 1,
      };
      updated.category = detectCategory(updated as PortfolioFormData);
      return updated;
    });
  }

  function toggleTech(tech: string) {
    setSelectedTech((prev) => {
      const next = prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech];
      setForm((f) => ({ ...f, tech_stack: next.join(', ') }));
      return next;
    });
  }

  function addCustomTech() {
    const t = customTech.trim();
    if (!t || selectedTech.includes(t)) return;
    const next = [...selectedTech, t];
    setSelectedTech(next);
    setForm((f) => ({ ...f, tech_stack: next.join(', ') }));
    setCustomTech('');
  }

  async function uploadFile(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || '업로드 실패');
        return null;
      }
      const data = await res.json();
      return data.url as string;
    } catch {
      setError('이미지 업로드 중 오류가 발생했습니다.');
      return null;
    }
  }

  async function handleThumbnailUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const url = await uploadFile(file);
    if (url) updateField('himage', url);
    setUploading(false);
    e.target.value = '';
  }

  async function handleContentImageUpload(
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

  function removeThumbnail() {
    updateField('himage', '');
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
        pkind: form.pkind,
        ptitle: form.ptitle,
        pname: form.pname || '보노보플랫폼',
        client_name: form.client_name || null,
        pdesc: buildFinalPdesc(),
        short_desc: form.description || null,
        features: form.features || null,
        tech_stack: form.tech_stack || null,
        card_size: form.card_size || null,
        himage: form.himage || null,
        k01: form.k01,
        k02: form.k02,
        k03: form.k03,
        k04: form.k04,
        k05: form.k05,
        k06: form.k06,
        k07: form.k07,
        k08: form.k08,
        k09: form.k09,
        k10: form.k10,
      };
      if (isNew) {
        payload.regdate =
          form.regdate || new Date().toISOString().split('T')[0];
        payload.hit = 0;
        await fetch('/api/admin/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/admin/portfolio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ psn: form.psn, ...payload }),
        });
      }
      router.push('/admin/portfolio');
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
      await fetch('/api/admin/portfolio', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ psn: form.psn }),
      });
      router.push('/admin/portfolio');
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
            href="/admin/portfolio"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {isNew ? '포트폴리오 등록' : '포트폴리오 수정'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
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
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Basic Info */}
        <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            기본 정보
          </h2>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              제목 <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={form.ptitle}
              onChange={(e) => updateField('ptitle', e.target.value)}
              className={INPUT_CLASS}
              placeholder="프로젝트 제목"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                고객사
              </label>
              <input
                type="text"
                value={form.client_name}
                onChange={(e) =>
                  updateField('client_name', e.target.value)
                }
                className={INPUT_CLASS}
                placeholder="고객사명"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                연도
              </label>
              <input
                type="text"
                value={form.regdate}
                onChange={(e) =>
                  updateField('regdate', e.target.value)
                }
                className={INPUT_CLASS}
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                카드 크기
              </label>
              <select
                value={form.card_size}
                onChange={(e) =>
                  updateField('card_size', e.target.value)
                }
                className={SELECT_CLASS}
              >
                <option value="">자동 배치</option>
                <option value="default">기본 (1칸)</option>
                <option value="large">Large (2칸, 높음)</option>
                <option value="wide">Wide (2칸)</option>
                <option value="tall">Tall (1칸, 높음)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Category */}
        <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            카테고리
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                  form.category === cat.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              세부 구분 (리스트에 표시될 태그)
            </p>
            <div className="flex flex-wrap gap-2">
              {K_FLAG_OPTIONS.map((opt) => {
                const active =
                  form[opt.key as keyof PortfolioFormData] === 1;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => toggleKFlag(opt.key)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                      active
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground/60">
              선택한 구분에 따라 프론트 필터 카테고리가 자동
              결정됩니다 (AI/Data &gt; App &gt; Program &gt; Web
              우선순위)
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            기술 스택
          </h2>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK_OPTIONS.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  selectedTech.includes(tech)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                )}
              >
                {tech}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customTech}
              onChange={(e) => setCustomTech(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomTech();
                }
              }}
              className="h-8 flex-1 rounded-lg border border-border/60 bg-muted/30 px-3 text-xs text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/40"
              placeholder="직접 입력 후 추가"
            />
            <button
              type="button"
              onClick={addCustomTech}
              className="flex h-8 items-center gap-1 rounded-lg border border-border/60 px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="size-3" /> 추가
            </button>
          </div>
          {selectedTech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedTech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => toggleTech(tech)}
                    className="rounded-full p-0.5 transition-colors hover:bg-primary/20"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Content */}
        <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            콘텐츠
          </h2>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              한줄 설명
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) =>
                updateField('description', e.target.value)
              }
              className={INPUT_CLASS}
              placeholder="프로젝트를 한 문장으로 설명"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              프로젝트 개요
            </label>
            <textarea
              value={form.pdesc}
              onChange={(e) => updateField('pdesc', e.target.value)}
              rows={8}
              className={TEXTAREA_CLASS}
              placeholder="프로젝트 상세 설명"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              주요 기능 (줄바꿈으로 구분)
            </label>
            <textarea
              value={form.features}
              onChange={(e) =>
                updateField('features', e.target.value)
              }
              rows={5}
              className={TEXTAREA_CLASS}
              placeholder={
                '사용자 등록 및 인증\n실시간 알림\n관리자 대시보드'
              }
            />
          </div>
        </section>

        {/* Thumbnail Image */}
        <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            대표 이미지
          </h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleThumbnailUpload}
          />

          {form.himage ? (
            <div className="relative overflow-hidden rounded-lg border border-border/50">
              <Image
                src={form.himage}
                alt="대표 이미지"
                width={700}
                height={400}
                className="h-48 w-full object-cover"
                unoptimized
              />
              <div className="absolute top-2 right-2 flex gap-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex size-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                >
                  <Upload className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="flex size-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border/60 py-10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {uploading ? (
                <Loader2 className="size-8 animate-spin" />
              ) : (
                <ImageIcon className="size-8" strokeWidth={1.5} />
              )}
              <span className="text-sm font-medium">
                {uploading
                  ? '업로드 중...'
                  : '클릭하여 이미지 업로드'}
              </span>
              <span className="text-xs text-muted-foreground/60">
                JPG, PNG, GIF, WebP (최대 10MB)
              </span>
            </button>
          )}
        </section>

        {/* Content Images */}
        <section className="space-y-4 rounded-xl border border-border/50 bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              상세 이미지
            </h2>
            <button
              type="button"
              onClick={() => contentFileInputRef.current?.click()}
              disabled={uploading}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-border/60 px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <Plus className="size-3" />
              )}
              이미지 추가
            </button>
          </div>
          <input
            ref={contentFileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleContentImageUpload}
          />

          {contentImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {contentImages.map((url, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-border/50"
                >
                  <Image
                    src={url}
                    alt={`상세 이미지 ${i + 1}`}
                    width={300}
                    height={200}
                    className="h-32 w-full object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setContentImages((prev) =>
                        prev.filter((_, j) => j !== i),
                      )
                    }
                    className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-md bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground/50 py-6">
              프로젝트 상세 페이지에 표시될 이미지를 추가하세요
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
