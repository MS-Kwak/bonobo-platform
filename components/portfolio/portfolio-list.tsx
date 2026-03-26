'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/motion/fade-in';
import {
  portfolioItems,
  categories,
  type PortfolioCategory,
} from '@/data/portfolio';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3 } },
};

function CategoryBadge({
  category,
}: {
  category: PortfolioCategory;
}) {
  const label =
    categories.find((c) => c.id === category)?.label ?? category;
  return (
    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
      {label}
    </span>
  );
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
      <section className="bg-muted/40 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <p className="mb-4 font-heading text-sm font-bold tracking-widest text-primary uppercase">
              Portfolio
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              포트폴리오
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              1999년부터 200여 개 프로젝트를 완성했습니다
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Filter Tabs */}
          <FadeIn>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  className={cn(
                    'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
                    active === cat.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Card Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className={cn(item.featured && 'lg:col-span-2')}
                >
                  <Link
                    href={`/portfolio/${item.id}`}
                    className="group block overflow-hidden rounded-2xl ring-1 ring-border/50 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                  >
                    {/* Thumbnail */}
                    <div
                      className={cn(
                        'relative flex items-end p-5',
                        item.featured ? 'h-[280px]' : 'h-[200px]',
                      )}
                      style={{ background: item.thumbnail }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                      <div className="relative flex w-full items-end justify-between">
                        <CategoryBadge category={item.category} />
                        <span className="font-heading text-sm font-bold text-white/70">
                          {item.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.client}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">
                        {item.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        자세히 보기
                        <ArrowRight className="size-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
