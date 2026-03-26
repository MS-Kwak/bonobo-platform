'use client';

import {
  FadeIn,
  StaggerContainer,
  staggerItem,
} from '@/components/motion/fade-in';
import { motion } from 'framer-motion';
import { Calendar, Code2, Users, ShieldCheck } from 'lucide-react';

const values = [
  {
    icon: Calendar,
    label: '25+ Years',
    desc: '1999년 창업 이래 축적된 개발 노하우',
  },
  {
    icon: Code2,
    label: 'DOS to AI',
    desc: 'DOS부터 인공지능까지 기술 진화와 함께',
  },
  {
    icon: Users,
    label: 'Customer First',
    desc: '고객 관점의 시스템 설계와 표준화',
  },
  {
    icon: ShieldCheck,
    label: 'GS Certified',
    desc: 'GS인증 · Q품질인증 · K마크인증 획득',
  },
];

export function AboutIntro() {
  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <p className="mb-4 font-heading text-sm font-bold tracking-widest text-primary uppercase">
            Company
          </p>
          <h2 className="text-3xl font-bold leading-snug tracking-tight text-foreground sm:text-4xl">
            20여년의 노하우와 솔루션으로
            <br />
            고객사의 시스템을 만들어 갑니다
          </h2>
        </FadeIn>

        <FadeIn className="mt-8 max-w-3xl">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              보노보플랫폼은 1999년 소프트빌에서 출발하여, 2006년
              법인전환한 소프트웨어 개발 및 플랫폼 운영 회사입니다.
            </p>
            <p>
              1980년대말 DOS 환경의 시스템 개발을 시작으로, 1990년대
              Windows와 웹 기반 시스템 개발, 2000년 초반의 모바일
              환경, 그리고 현재 진행중인 인공지능까지 개발 솔루션과
              경험을 축적한 기업으로 안정적인 시스템 서비스를 제공하는
              IT 기업입니다.
            </p>
            <p>
              시스템은 업무의 효율성과 소통의 원활함을 제공하는
              수단입니다. 고객의 입장에서 Needs를 파악하고, 시스템적
              사고로 업무를 표준화하여 효율화를 추구하며, 미래의 효율
              가치를 제시할 수 있어야 합니다.
            </p>
            <p className="font-semibold text-foreground">
              보노보플랫폼은 항상 여러분의 파트너가 될 준비가 되어
              있습니다.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          delay={0.2}
        >
          {values.map((v) => (
            <motion.div
              key={v.label}
              variants={staggerItem}
              className="flex items-start gap-4 rounded-xl border border-border/50 bg-muted/30 p-5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <v.icon
                  className="size-5 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">
                  {v.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {v.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
