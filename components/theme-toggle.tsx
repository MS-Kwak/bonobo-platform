'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          'flex size-9 items-center justify-center rounded-lg transition-colors',
          className,
        )}
        aria-label="테마 변경"
      >
        <Sun className="size-[18px]" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted',
        theme === 'dark'
          ? 'text-white hover:text-grey-200'
          : 'text-muted-foreground',
        className,
      )}
      aria-label="테마 변경"
    >
      {theme === 'dark' ? (
        <Sun className="size-[18px]" />
      ) : (
        <Moon className="size-[18px]" />
      )}
    </button>
  );
}
