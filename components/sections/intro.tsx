'use client';

import Image from 'next/image';
import {
  FadeIn,
  StaggerContainer,
  staggerItem,
} from '@/components/motion/fade-in';
import { motion } from 'framer-motion';

const values = [
  {
    icon: '/images/tossface/lightbulb.svg',
    title: '깊이 있는 이해',
    description:
      '비즈니스 본질을 파악하고 최적의 기술 솔루션을 설계합니다',
  },
  {
    icon: '/images/tossface/laptop.svg',
    title: '기획부터 운영까지',
    description:
      '분절된 외주가 아닌, 하나의 팀이 전 과정을 책임집니다',
  },
  {
    icon: '/images/tossface/handshake.svg',
    title: '장기적 파트너십',
    description:
      '납품 후에도 지속적인 유지보수와 기술 지원을 약속합니다',
  },
];

export function Intro() {
  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-heading text-sm font-bold tracking-widest text-primary uppercase">
            About Us
          </p>
          <h2 className="text-3xl font-bold leading-snug tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            사회적 가치를 기술로 실현하는 것,
            <br />
            보노보플랫폼의 지향점입니다
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">
            1999년 창립 이래, 우리는 단순히 코드를 작성하는 것이
            아니라
            <br className="hidden lg:block" />
            클라이언트의 비즈니스를 깊이 이해하고 함께 성장해왔습니다.
          </p>
        </FadeIn>

        <StaggerContainer
          className="mt-20 grid gap-8 sm:grid-cols-3"
          delay={0.2}
        >
          {values.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-5">
                <Image
                  src={item.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
