'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/fade-in';
import { ArrowRight, Phone } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-28 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.35_0.04_260),transparent_60%),radial-gradient(ellipse_at_bottom_left,oklch(0.28_0.03_240),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-bold tracking-widest text-white/50 uppercase">
            Contact Us
          </p>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
            프로젝트를 함께 시작할
            <br />
            준비가 되셨나요?
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-white/70 lg:text-xl">
            25년간 200여 개의 프로젝트를 완성한 경험으로,
            <br className="hidden sm:block" />
            여러분의 비즈니스 모델을 현실로 만들어 드립니다.
          </p>
          <div className="mx-auto mt-12 flex max-w-sm flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center rounded-md bg-white px-8 text-base font-semibold text-primary transition-colors hover:bg-white/90 sm:w-auto"
            >
              견적문의 하기
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="tel:070-4138-7638"
              className="inline-flex h-12 w-full items-center justify-center rounded-md border border-white/30 bg-transparent px-8 text-base text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <Phone className="mr-2 size-4" />
              070-4138-7638
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/40">
            평일 09:30 ~ 18:00 · 주말/공휴일 휴무
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
