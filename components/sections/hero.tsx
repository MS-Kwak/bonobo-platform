'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ChevronDown,
  Monitor,
  Cpu,
  BrainCircuit,
  Rocket,
  Lightbulb,
  Handshake,
} from 'lucide-react';
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

const floatingIcons = [
  {
    Icon: Monitor,
    className: 'left-[8%] top-[20%] size-12 lg:size-16',
    delay: 0,
  },
  {
    Icon: Cpu,
    className: 'right-[10%] top-[22%] size-10 lg:size-14',
    delay: 1.2,
  },
  {
    Icon: BrainCircuit,
    className: 'left-[12%] bottom-[28%] size-10 lg:size-14',
    delay: 0.6,
  },
  {
    Icon: Rocket,
    className: 'right-[8%] bottom-[30%] size-12 lg:size-16',
    delay: 1.8,
  },
  {
    Icon: Lightbulb,
    className: 'left-[25%] top-[14%] size-9 lg:size-12',
    delay: 2.4,
  },
  {
    Icon: Handshake,
    className: 'right-[22%] bottom-[20%] size-10 lg:size-12',
    delay: 3.0,
  },
];

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-linear-to-b from-[#e8edf4] via-[#d5dfed] to-[#c8d6e8]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(30,111,217,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(100,140,200,0.08)_0%,transparent_55%)]" />

      {/* A: Floating Lucide Icons */}
      {floatingIcons.map((item) => (
        <motion.div
          key={item.Icon.displayName}
          className={cn('absolute z-0', item.className)}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          <item.Icon
            className="size-full text-white/40"
            strokeWidth={1.2}
          />
        </motion.div>
      ))}

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
          <br />
          기획부터 개발, 운영까지 한 팀이 책임지고 완성합니다.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'w-full sm:w-auto px-8 h-12 text-base font-semibold gap-2',
            )}
          >
            프로젝트 문의하기
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'w-full sm:w-auto px-8 h-12 text-base',
            )}
          >
            포트폴리오 보기
          </Link>
        </motion.div>

        {/* B: Trust Badges */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.0}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground/70"
        >
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-muted-foreground/40" />
            GS 인증 획득
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-muted-foreground/40" />
            1999년 설립
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-muted-foreground/40" />
            200+ 프로젝트
          </span>
        </motion.div>
      </div>

      {/* C: Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1.5 text-muted-foreground/50"
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="font-heading text-[10px] tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
