'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: ease as unknown as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-linear-to-b from-[#e8edf4] via-[#d5dfed] to-[#c8d6e8]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(30,111,217,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(100,140,200,0.08)_0%,transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center lg:px-8">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mb-6 font-heading text-sm font-bold tracking-widest text-muted-foreground uppercase"
        >
          Software Development Company — Since 1999
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mx-auto max-w-3xl text-4xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          웹 · 앱 · AI,
          <br />
          <span className="font-heading">하나의 팀</span>이 끝까지
          책임집니다
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          아이디어를 현실로 만드는 소프트웨어 전문 기업.
          <br className="hidden sm:block" />
          기획부터 개발, 운영까지 한 팀이 책임지고 완성합니다.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'px-8 h-12 text-base font-semibold gap-2',
            )}
          >
            프로젝트 문의하기
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'px-8 h-12 text-base',
            )}
          >
            개발 실적 보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
