'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  portfolioItems,
  categories,
  type PortfolioCategory,
} from '@/data/portfolio';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

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

export function PortfolioList() {
  const [active, setActive] = useState<PortfolioCategory>('all');

  const filtered =
    active === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === active);

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
              <AnimatedCount target={200} />+
            </span>{' '}
            개 프로젝트를 완성했습니다
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground"
          >
            {[
              {
                icon: Sparkles,
                label: 'Web / Mobile',
                count: portfolioItems.filter(
                  (p) => p.category === 'web',
                ).length,
              },
              {
                icon: Sparkles,
                label: 'App',
                count: portfolioItems.filter(
                  (p) => p.category === 'app',
                ).length,
              },
              {
                icon: Sparkles,
                label: 'Program',
                count: portfolioItems.filter(
                  (p) => p.category === 'program',
                ).length,
              },
              {
                icon: Sparkles,
                label: 'AI / Data',
                count: portfolioItems.filter(
                  (p) => p.category === 'ai',
                ).length,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-1.5"
              >
                <stat.icon
                  className="size-3.5 text-primary/60"
                  strokeWidth={1.5}
                />
                <span className="font-heading">{stat.label}</span>
                <span className="font-heading font-bold text-foreground">
                  {stat.count}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                onClick={() => setActive(cat.id)}
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

            <div className="ml-auto hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              <Search className="size-4" strokeWidth={1.5} />
              <span className="font-heading font-bold text-foreground">
                {filtered.length}
              </span>
              <span className="font-heading">Projects</span>
            </div>
          </motion.div>

          {/* Bento Card Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gridAutoRows: '20px', gridAutoFlow: 'dense' }}
            >
              {filtered.map((item, i) => {
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
                        : item.compact
                          ? 8
                          : 10;

                const thumbH =
                  s === 'large'
                    ? 'h-[320px]'
                    : s === 'tall'
                      ? 'h-[260px]'
                      : s === 'wide'
                        ? 'h-[200px]'
                        : item.compact
                          ? 'h-[140px]'
                          : 'h-[180px]';

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
                        style={{ background: item.thumbnail }}
                      >
                        <div
                          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                          style={{ background: item.thumbnail }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                        <div className="relative flex w-full items-end justify-between">
                          <CategoryBadge category={item.category} />
                          <span className="font-heading text-sm font-bold text-white/70">
                            {item.year}
                          </span>
                        </div>
                      </div>

                      <div
                        className={cn(
                          'flex flex-1 flex-col p-5',
                          item.compact && 'p-4',
                        )}
                      >
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
                        {!item.compact && (
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
                        <div
                          className={cn(
                            'mt-auto flex flex-wrap gap-1.5 pt-3',
                          )}
                        >
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-muted px-2 py-0.5 font-heading text-xs text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
