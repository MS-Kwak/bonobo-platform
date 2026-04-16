'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Megaphone,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: '대시보드',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: '포트폴리오',
    href: '/admin/portfolio',
    icon: Briefcase,
  },
  {
    label: '공지사항',
    href: '/admin/notices',
    icon: Megaphone,
  },
  {
    label: '견적문의',
    href: '/admin/contacts',
    icon: MessageSquare,
  },
  {
    label: '설정',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/admin'
      ? pathname === '/admin'
      : pathname.startsWith(href);

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  }

  const currentPage =
    navItems.find((item) => isActive(item.href))?.label ?? '관리자';

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-border/50 bg-card transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-14 items-center gap-2 border-b border-border/50 px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/images/bonobo-logo.png"
              alt="(주)보노보플랫폼"
              width={120}
              height={30}
              className="h-6 w-auto dark:invert"
            />
          </Link>
          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 font-heading text-[10px] font-bold text-primary">
            ADMIN
          </span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <Icon className="size-4" strokeWidth={1.8} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border/50 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4" strokeWidth={1.8} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/50 bg-card/80 px-4 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/admin" className="hover:text-foreground">
              관리자
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="font-medium text-foreground">
              {currentPage}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              사이트 보기
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
