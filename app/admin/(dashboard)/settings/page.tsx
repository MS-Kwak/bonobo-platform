'use client';

import { useState } from 'react';
import { Loader2, KeyRound } from 'lucide-react';

export default function AdminSettingsPage() {
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (newPw !== confirmPw) {
      setMessage({
        type: 'error',
        text: '새 비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: oldPw,
          newPassword: newPw,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error });
      } else {
        setMessage({
          type: 'success',
          text: '비밀번호가 변경되었습니다.',
        });
        setOldPw('');
        setNewPw('');
        setConfirmPw('');
      }
    } catch {
      setMessage({
        type: 'error',
        text: '서버 오류가 발생했습니다.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">설정</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          비밀번호 변경
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-border/50 bg-card p-6"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            현재 비밀번호
          </label>
          <input
            type="password"
            value={oldPw}
            onChange={(e) => setOldPw(e.target.value)}
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/30 px-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            새 비밀번호
          </label>
          <input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/30 px-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            비밀번호 확인
          </label>
          <input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/30 px-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            required
          />
        </div>

        {message && (
          <p
            className={`text-sm ${message.type === 'error' ? 'text-destructive' : 'text-emerald-600 dark:text-emerald-400'}`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <KeyRound className="size-4" />
          )}
          비밀번호 변경
        </button>
      </form>
    </div>
  );
}
