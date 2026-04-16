'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, LogIn } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || '로그인에 실패했습니다.');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-50 via-indigo-50/50 to-purple-50/40 dark:from-[#1a1c22] dark:via-[#1e2028] dark:to-[#22202e]" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-100/40 blur-3xl dark:bg-indigo-900/10" />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/images/bonobo-logo.png"
            alt="(주)보노보플랫폼"
            width={160}
            height={40}
            className="mx-auto mb-6 h-9 w-auto dark:invert"
          />
          <h1 className="text-xl font-bold text-foreground">
            관리자 로그인
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            보노보플랫폼 관리 시스템
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/8 dark:bg-white/5 dark:shadow-black/20"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="admin-id"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                아이디
              </label>
              <input
                id="admin-id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/40 bg-white/60 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 dark:bg-white/6"
                placeholder="ID"
                autoFocus
                required
              />
            </div>
            <div>
              <label
                htmlFor="admin-pw"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                비밀번호
              </label>
              <input
                id="admin-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full rounded-lg border border-border/40 bg-white/60 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 dark:bg-white/6"
                placeholder="Password"
                required
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogIn className="size-4" />
            )}
            로그인
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          &copy; (주)보노보플랫폼
        </p>
      </div>
    </div>
  );
}
