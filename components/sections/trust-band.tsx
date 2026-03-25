'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  FolderKanban,
  Building2,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import {
  StaggerContainer,
  staggerItem,
} from '@/components/motion/fade-in';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: ShieldCheck,
    value: 'GS',
    label: '인증 획득',
    suffix: '인증',
    isText: true,
  },
  {
    icon: Calendar,
    value: 1999,
    label: '년 설립',
    suffix: '년~',
    isText: false,
  },
  {
    icon: FolderKanban,
    value: 200,
    label: '프로젝트 완성',
    suffix: '+',
    isText: false,
  },
  {
    icon: Building2,
    value: 50,
    label: '대기업 · 공공기관 협력',
    suffix: '+',
    isText: false,
  },
];

function CountUp({
  target,
  suffix,
  isText,
  inView,
}: {
  target: number | string;
  suffix: string;
  isText: boolean;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || isText) return;
    const num = target as number;
    const duration = 1500;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, isText]);

  if (isText) {
    return (
      <span className="font-heading text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
        {target as string}
        {suffix}
      </span>
    );
  }

  return (
    <span className="font-heading text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
      {inView ? count.toLocaleString() : '0'}
      {suffix}
    </span>
  );
}

export function TrustBand() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="border-y border-border/50 bg-muted/50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-border/50">
                <stat.icon className="size-5" strokeWidth={1.5} />
              </div>
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                isText={stat.isText}
                inView={inView}
              />
              <p className="mt-1.5 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
