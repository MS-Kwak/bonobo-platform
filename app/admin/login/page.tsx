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
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/images/bonobo-logo.png"
            alt="보노보플랫폼"
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
          className="rounded-2xl border border-border/60 bg-card p-6 shadow-lg"
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
                className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
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
                className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
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
            className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
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
          &copy; 보노보플랫폼
        </p>
      </div>
    </div>
  );
}
