'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Layers,
  Tag,
} from 'lucide-react';
import {
  categories,
  type PortfolioItem,
  type PortfolioCategory,
} from '@/data/portfolio';

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

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

const features = [
  '사용자 친화적 UI/UX 설계',
  '실시간 데이터 처리 및 동기화',
  '보안 인증 및 권한 관리',
  '확장 가능한 아키텍처 설계',
  '관리자 대시보드 및 통계',
  '모바일 반응형 지원',
];

interface Props {
  item: PortfolioItem;
  categoryLabel: string;
  related: PortfolioItem[];
}

function SidebarItem({
  icon: Icon,
  label,
  children,
  index,
}: {
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  label: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease }}
      className="flex items-start gap-3"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-4 text-primary" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">
          {label}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

function FeatureItem({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07, ease }}
      className="flex items-start gap-2.5 text-sm text-muted-foreground"
    >
      <CheckCircle2
        className="mt-0.5 size-4 shrink-0 text-primary/60"
        strokeWidth={1.5}
      />
      {text}
    </motion.li>
  );
}

export function PortfolioDetail({
  item,
  categoryLabel,
  related,
}: Props) {
  return (
    <>
      {/* Hero Thumbnail */}
      <section className="bg-white pt-6 pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-2xl"
            style={{ background: item.thumbnail }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="relative flex min-h-[280px] flex-col justify-end p-8 sm:min-h-[360px] sm:p-12">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
              >
                <CategoryBadge category={item.category} />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
                className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
              >
                {item.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease }}
                className="mt-3 max-w-2xl text-base leading-relaxed text-white/80"
              >
                {item.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {item.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.7 + i * 0.05,
                      ease,
                    }}
                    className="rounded-full bg-white/15 px-3 py-1 font-heading text-xs font-bold text-white backdrop-blur-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left: Project overview */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
              >
                <h2 className="text-xl font-bold text-foreground">
                  프로젝트 개요
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>{item.description}</p>
                  <p>
                    보노보플랫폼은 고객의 비즈니스 요구사항을 깊이
                    이해하고, 최적의 기술 스택을 선정하여 안정적이고
                    확장 가능한 시스템을 구축했습니다. 프로젝트 전
                    과정에서 고객과의 긴밀한 소통을 통해 높은 만족도를
                    달성했습니다.
                  </p>
                  <p>
                    요구사항 분석부터 설계, 개발, 테스트, 배포,
                    유지보수까지 전체 소프트웨어 개발 생명주기를
                    책임지고 수행하여, 고객사의 업무 효율성을 크게
                    향상시켰습니다.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="mt-10"
              >
                <h3 className="text-lg font-bold text-foreground">
                  주요 기능
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {features.map((feature, i) => (
                    <FeatureItem
                      key={feature}
                      text={feature}
                      index={i}
                    />
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6 rounded-2xl bg-muted/40 p-6 lg:p-8">
              <SidebarItem icon={Building2} label="고객사" index={0}>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  {item.client}
                </p>
              </SidebarItem>

              <SidebarItem icon={CalendarDays} label="연도" index={1}>
                <p className="mt-0.5 font-heading text-sm font-bold text-foreground">
                  {item.year}
                </p>
              </SidebarItem>

              <SidebarItem icon={Layers} label="카테고리" index={2}>
                <p className="mt-0.5 font-heading text-sm font-semibold text-foreground">
                  {categoryLabel}
                </p>
              </SidebarItem>

              <SidebarItem icon={Tag} label="기술 스택" index={3}>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + i * 0.06,
                        ease,
                      }}
                      className="rounded-md bg-white px-2.5 py-1 font-heading text-xs font-medium text-foreground shadow-sm ring-1 ring-border/50"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </SidebarItem>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="border-t border-border/50 bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-xl font-bold text-foreground"
          >
            다른 프로젝트 보기
          </motion.h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
              >
                <Link
                  href={`/portfolio/${project.id}`}
                  className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div
                    className="relative flex h-[180px] items-end overflow-hidden p-4"
                    style={{ background: project.thumbnail }}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      style={{ background: project.thumbnail }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    <div className="relative flex w-full items-end justify-between">
                      <CategoryBadge category={project.category} />
                      <span className="font-heading text-xs font-bold text-white/70">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.client}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                      <span className="opacity-0 transition-all duration-300 group-hover:opacity-100">
                        자세히 보기
                      </span>
                      <ArrowRight className="size-3.5 -translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
