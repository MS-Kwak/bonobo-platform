'use client';

import Image from 'next/image';
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
} from '@/components/motion/fade-in';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: '/images/tossface/phone.svg',
    step: '01',
    title: '상담 & 요구분석',
    description:
      '고객의 비즈니스를 깊이 이해하고, 목표와 요구사항을 함께 정리합니다.',
  },
  {
    icon: '/images/tossface/ruler.svg',
    step: '02',
    title: '기획 & 설계',
    description:
      '업무 흐름을 표준화하고, 최적의 시스템 아키텍처를 설계합니다.',
  },
  {
    icon: '/images/tossface/laptop.svg',
    step: '03',
    title: '개발 & 테스트',
    description:
      '하나의 팀이 전 과정을 책임지며, 철저한 품질 검증을 거칩니다.',
  },
  {
    icon: '/images/tossface/rocket.svg',
    step: '04',
    title: '런칭 & 유지보수',
    description:
      '안정적인 런칭 이후에도 지속적인 운영 지원과 기술 고도화를 함께합니다.',
  },
];

export function Process() {
  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-heading text-sm font-bold tracking-widest text-primary uppercase">
            How We Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            프로젝트 진행 프로세스
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            체계적인 프로세스로 처음부터 끝까지 책임집니다
          </p>
        </FadeIn>

        <StaggerContainer
          className="relative mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          delay={0.2}
        >
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              variants={staggerItem}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <Image
                  src={item.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14"
                />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary font-heading text-xs font-bold text-primary-foreground">
                  {item.step}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {index < steps.length - 1 && (
                <div className="absolute right-0 top-7 hidden w-8 translate-x-1/2 lg:block">
                  <div className="h-px w-full bg-border" />
                </div>
              )}
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
