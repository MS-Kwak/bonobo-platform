'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useInView as useIntersection } from 'react-intersection-observer';
import {
  ArrowRight,
  Search,
  Sparkles,
  Loader2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  categories,
  type PortfolioItem,
  type PortfolioCategory,
} from '@/data/portfolio';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const PAGE_SIZE = 10;

const SCROLL_KEY = 'portfolio-scroll';
const FILTER_KEY = 'portfolio-filter';
const COUNT_KEY = 'portfolio-count';

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25, ease },
  },
};

function CategoryBadge({
  category,
}: {
  category: PortfolioCategory;
}) {
  const label =
    categories.find((c) => c.id === category)?.label ?? category;
  return (
    <span className="rounded-full bg-white/20 px-3 py-1 font-heading text-xs font-bold text-white backdrop-blur-sm">
      {label}
    </span>
  );
}

function AnimatedCount({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return <span ref={ref}>{count}</span>;
}

interface Props {
  initialItems: PortfolioItem[];
  categoryCounts: Record<PortfolioCategory, number>;
}

export function PortfolioList({
  initialItems,
  categoryCounts,
}: Props) {
  const [active, setActive] = useState<PortfolioCategory>('all');
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [brokenImages, setBrokenImages] = useState<Set<number>>(
    new Set(),
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const didRestore = useRef(false);

  // Restore scroll position & filter from sessionStorage (once, after mount)
  useEffect(() => {
    if (didRestore.current) return;
    didRestore.current = true;

    const savedFilter = sessionStorage.getItem(
      FILTER_KEY,
    ) as PortfolioCategory | null;
    const savedCount = sessionStorage.getItem(COUNT_KEY);

    if (savedFilter) setActive(savedFilter);
    if (savedCount)
      setDisplayCount(Math.max(Number(savedCount), PAGE_SIZE));

    const savedY = sessionStorage.getItem(SCROLL_KEY);
    if (savedY) {
      requestAnimationFrame(() => window.scrollTo(0, Number(savedY)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-time mount restore
  }, []);

  // Persist scroll position on scroll
  useEffect(() => {
    const onScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Persist filter & count whenever they change
  useEffect(() => {
    sessionStorage.setItem(FILTER_KEY, active);
    sessionStorage.setItem(COUNT_KEY, String(displayCount));
  }, [active, displayCount]);

  const { ref: loadMoreRef } = useIntersection({
    threshold: 0,
    onChange: (inView) => {
      if (inView) setDisplayCount((prev) => prev + PAGE_SIZE);
    },
  });

  const handleFilterChange = useCallback((cat: PortfolioCategory) => {
    setActive(cat);
    setDisplayCount(PAGE_SIZE);
    sessionStorage.removeItem(SCROLL_KEY);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setSearchOpen((prev) => {
      if (prev) {
        setSearchQuery('');
        setDisplayCount(PAGE_SIZE);
        return false;
      }
      requestAnimationFrame(() => searchInputRef.current?.focus());
      return true;
    });
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
    setDisplayCount(PAGE_SIZE);
  }, []);

  const filtered = initialItems.filter((item) => {
    if (active !== 'all' && item.category !== active) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.client.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const displayed = filtered.slice(0, displayCount);
  const hasMore = displayCount < filtered.length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted/40 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-blue-500/5 blur-3xl" />
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-4 font-heading text-sm font-bold tracking-widest text-primary uppercase"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            포트폴리오
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-4 max-w-xl text-lg text-muted-foreground"
          >
            1999년부터{' '}
            <span className="font-heading font-bold text-foreground">
              <AnimatedCount target={categoryCounts.all} />
            </span>
            개 프로젝트를 완성했습니다
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground"
          >
            {(
              [
                { label: 'Web / Mobile', cat: 'web' as const },
                { label: 'App', cat: 'app' as const },
                { label: 'Program', cat: 'program' as const },
                { label: 'AI / Data', cat: 'ai' as const },
              ] as const
            ).map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-1.5"
              >
                <Sparkles
                  className="size-3.5 text-primary/60"
                  strokeWidth={1.5}
                />
                <span className="font-heading">{stat.label}</span>
                <span className="font-heading font-bold text-foreground">
                  {categoryCounts[stat.cat]}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Mobile search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-4 overflow-hidden sm:hidden"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="프로젝트 검색..."
                  className="h-10 w-full rounded-xl border border-border/60 bg-muted/40 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-white"
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-wrap items-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilterChange(cat.id)}
                className={cn(
                  'relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200',
                  active === cat.id
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active === cat.id && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-primary shadow-sm"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 font-heading">
                  {cat.label}
                </span>
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="hidden overflow-hidden sm:block"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) =>
                        handleSearchChange(e.target.value)
                      }
                      placeholder="프로젝트 검색..."
                      className="h-9 w-full rounded-full border border-border/60 bg-muted/40 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-white"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={handleSearchToggle}
                className={cn(
                  'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors',
                  searchOpen
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {searchOpen ? (
                  <X className="size-4" strokeWidth={1.5} />
                ) : (
                  <Search className="size-4" strokeWidth={1.5} />
                )}
                <span className="font-heading font-bold text-foreground">
                  {filtered.length}
                </span>
                <span className="font-heading text-muted-foreground">
                  Projects
                </span>
              </button>
            </div>
          </motion.div>

          {/* Bento Card Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gridAutoRows: '20px', gridAutoFlow: 'dense' }}
            >
              {displayed.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                  <Search
                    className="mb-4 size-10 text-muted-foreground/30"
                    strokeWidth={1.5}
                  />
                  <p className="text-lg font-medium text-muted-foreground">
                    검색 결과가 없습니다
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground/60">
                    다른 키워드로 검색해보세요
                  </p>
                </div>
              )}
              {displayed.map((item, i) => {
                const s = item.size ?? 'default';
                const isWide = s === 'large' || s === 'wide';

                const colSpan = isWide ? 2 : 1;
                const rowSpan =
                  s === 'large'
                    ? 15
                    : s === 'tall'
                      ? 13
                      : s === 'wide'
                        ? 11
                        : 10;

                const thumbH =
                  s === 'large'
                    ? 'h-[320px]'
                    : s === 'tall'
                      ? 'h-[260px]'
                      : s === 'wide'
                        ? 'h-[200px]'
                        : 'h-[180px]';

                const showImage =
                  item.thumbnail && !brokenImages.has(item.id);

                return (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    custom={i % 3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    style={{
                      gridColumn: `span ${colSpan}`,
                      gridRow: `span ${rowSpan}`,
                    }}
                  >
                    <Link
                      href={`/portfolio/${item.id}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl ring-1 ring-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div
                        className={cn(
                          'relative flex shrink-0 items-end overflow-hidden p-5',
                          thumbH,
                        )}
                        style={
                          showImage
                            ? undefined
                            : { background: item.gradient }
                        }
                      >
                        {showImage ? (
                          <Image
                            src={item.thumbnail!}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes={
                              isWide
                                ? '(max-width: 640px) 100vw, 66vw'
                                : '(max-width: 640px) 100vw, 33vw'
                            }
                            onError={() =>
                              setBrokenImages((prev) =>
                                new Set(prev).add(item.id),
                              )
                            }
                          />
                        ) : (
                          <div
                            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                            style={{ background: item.gradient }}
                          />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                        <div className="relative flex w-full items-end justify-between">
                          <CategoryBadge category={item.category} />
                          <span className="font-heading text-sm font-bold text-white/70">
                            {item.year}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3
                          className={cn(
                            'font-bold text-foreground transition-colors duration-200 group-hover:text-primary',
                            isWide ? 'text-xl' : 'text-lg',
                          )}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.client}
                        </p>
                        {item.description && (
                          <p
                            className={cn(
                              'mt-2 text-sm leading-relaxed text-muted-foreground/80',
                              isWide
                                ? 'line-clamp-3'
                                : 'line-clamp-2',
                            )}
                          >
                            {item.description}
                          </p>
                        )}
                        {item.tags.length > 0 && (
                          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-muted px-2 py-0.5 font-heading text-xs text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Load more trigger */}
          {hasMore && (
            <div
              ref={loadMoreRef}
              className="mt-10 flex justify-center"
            >
              <Loader2 className="size-6 animate-spin text-muted-foreground/40" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
