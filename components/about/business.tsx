'use client';

import Image from 'next/image';
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
} from '@/components/motion/fade-in';
import { motion } from 'framer-motion';

const areas = [
  {
    icon: '/images/tossface/laptop.svg',
    title: 'Web / Mobile',
    items: [
      '웹사이트, 모바일웹 구축',
      '하이브리드 웹앱 개발',
      'Android, iOS App 개발',
    ],
  },
  {
    icon: '/images/tossface/gear.svg',
    title: 'Program',
    items: [
      '응용 프로그램 개발',
      'TCP/IP, RS232C 통신 제어',
      'POS 및 프랜차이즈 시스템',
    ],
  },
  {
    icon: '/images/tossface/speech-bubble.svg',
    title: 'IT Consulting',
    items: [
      'Business Model 컨설팅',
      '웹기획 · 기업 전산화',
      '시스템 유지보수',
    ],
  },
  {
    icon: '/images/tossface/rocket.svg',
    title: 'Hosting',
    items: ['웹호스팅 · DB호스팅', 'SMS 문자전송', '클라우드 인프라'],
  },
];

export function AboutBusiness() {
  return (
    <section className="border-t border-border/40 bg-muted/30 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-heading text-sm font-bold tracking-widest text-primary uppercase">
            Business Area
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            사업 영역
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            DOS부터 BigData까지, 다양한 영역의 솔루션을 제공합니다
          </p>
        </FadeIn>

        <StaggerContainer
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          delay={0.2}
        >
          {areas.map((area) => (
            <motion.div
              key={area.title}
              variants={staggerItem}
              className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-border/50"
            >
              <div className="mb-5">
                <Image
                  src={area.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10"
                />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {area.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {area.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
