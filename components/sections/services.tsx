'use client';

import Image from 'next/image';
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
} from '@/components/motion/fade-in';
import { motion } from 'framer-motion';

const services = [
  {
    icon: '/images/tossface/laptop.svg',
    title: 'Web / Mobile / App',
    description:
      '반응형 웹사이트, 모바일 앱, 하이브리드 앱까지. 사용자 경험을 최우선으로 설계하고 개발합니다.',
    tags: [
      'React',
      'Next.js',
      'React Native',
      'Flutter',
      'PWA',
      'iOS',
      'Android',
    ],
  },
  {
    icon: '/images/tossface/gear.svg',
    title: 'Program / System',
    description:
      'ERP, POS, 프랜차이즈 통합 시스템, TCP/IP·RS232C 통신 제어 등 기업 맞춤형 응용 프로그램을 구축합니다.',
    tags: [
      'Java',
      'Spring',
      '.NET',
      'Oracle',
      'MariaDB',
      'PostgreSQL',
      'Supabase',
    ],
  },
  {
    icon: '/images/tossface/robot.svg',
    title: 'AI / Data',
    description:
      '머신러닝 기반 예측 시스템, 빅데이터 분석, IoT 연동 등 AI 기술을 비즈니스에 접목합니다.',
    tags: ['Python', 'TensorFlow', 'LLM', 'BigData', 'IoT'],
  },
  {
    icon: '/images/tossface/speech-bubble.svg',
    title: 'IT Consulting / Hosting',
    description:
      'Business Model 컨설팅, 웹기획, 기업 전산화 설계부터 웹호스팅·DB호스팅·시스템 유지보수까지.',
    tags: ['Consulting', 'Hosting', 'SMS', 'Cloud', 'Security'],
  },
];

export function Services() {
  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-heading text-sm font-bold tracking-widest text-primary uppercase">
            Services
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            무엇이든 만들 수 있습니다
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            25년간 축적된 기술력으로, 다양한 영역의 소프트웨어를
            개발합니다.
          </p>
        </FadeIn>

        <StaggerContainer
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          delay={0.2}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              className="group relative rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5">
                <Image
                  src={service.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10"
                />
              </div>

              <h3 className="font-heading text-lg font-bold text-foreground">
                {service.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
