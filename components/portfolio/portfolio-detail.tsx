'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Layers,
  Tag,
} from 'lucide-react';
import { FadeIn } from '@/components/motion/fade-in';
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
    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
      {label}
    </span>
  );
}

interface Props {
  item: PortfolioItem;
  categoryLabel: string;
  related: PortfolioItem[];
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="relative overflow-hidden rounded-2xl"
            style={{ background: item.thumbnail }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="relative flex min-h-[280px] flex-col justify-end p-8 sm:min-h-[360px] sm:p-12">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease,
                }}
                className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
              >
                {item.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease,
                }}
                className="mt-3 max-w-2xl text-base leading-relaxed text-white/80"
              >
                {item.description}
              </motion.p>
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
              <FadeIn>
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
              </FadeIn>

              <FadeIn delay={0.1} className="mt-10">
                <h3 className="text-lg font-bold text-foreground">
                  주요 기능
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    '사용자 친화적 UI/UX 설계',
                    '실시간 데이터 처리 및 동기화',
                    '보안 인증 및 권한 관리',
                    '확장 가능한 아키텍처 설계',
                    '관리자 대시보드 및 통계',
                    '모바일 반응형 지원',
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            {/* Right: Sidebar */}
            <FadeIn delay={0.2}>
              <div className="space-y-6 rounded-2xl bg-muted/40 p-6 lg:p-8">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Building2
                      className="size-4 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      고객사
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {item.client}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <CalendarDays
                      className="size-4 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      연도
                    </p>
                    <p className="mt-0.5 font-heading text-sm font-bold text-foreground">
                      {item.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Layers
                      className="size-4 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      카테고리
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {categoryLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Tag
                      className="size-4 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      기술 스택
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-foreground shadow-sm ring-1 ring-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="border-t border-border/50 bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-xl font-bold text-foreground">
              다른 프로젝트 보기
            </h2>
          </FadeIn>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1}>
                <Link
                  href={`/portfolio/${project.id}`}
                  className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-border/50 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <div
                    className="relative flex h-[180px] items-end p-4"
                    style={{ background: project.thumbnail }}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    <div className="relative flex w-full items-end justify-between">
                      <CategoryBadge category={project.category} />
                      <span className="font-heading text-xs font-bold text-white/70">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.client}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      자세히 보기
                      <ArrowRight className="size-3.5" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
