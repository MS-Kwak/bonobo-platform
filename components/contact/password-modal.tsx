'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

function PasswordForm({
  onClose,
  onConfirm,
}: Pick<PasswordModalProps, 'onClose' | 'onConfirm'>) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!password.trim()) {
        setError(true);
        return;
      }
      onConfirm(password);
    },
    [password, onConfirm],
  );

  return (
    <>
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 rounded-lg p-1.5 text-muted-foreground/40 transition-colors hover:bg-muted hover:text-muted-foreground"
      >
        <X className="size-4" />
      </button>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Icon */}
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Lock className="size-5 text-primary" strokeWidth={1.5} />
        </div>

        <h3 className="mt-4 text-center text-lg font-bold text-foreground">
          비밀번호 확인
        </h3>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          등록시 입력한 비밀번호를 입력해주세요
        </p>

        {/* Input */}
        <div className="mt-6">
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="비밀번호"
            className={`w-full rounded-xl border bg-muted/30 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              error
                ? 'border-red-400 ring-2 ring-red-400/20'
                : 'border-border'
            }`}
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1.5 text-xs text-red-500"
              >
                비밀번호를 입력해주세요
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-white transition-all hover:bg-primary/90"
          >
            확인
          </button>
        </div>
      </form>
    </>
  );
}

export function PasswordModal({
  isOpen,
  onClose,
  onConfirm,
}: PasswordModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{
              duration: 0.25,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <PasswordForm onClose={onClose} onConfirm={onConfirm} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
