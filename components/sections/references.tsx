'use client';

import Marquee from 'react-fast-marquee';
import { FadeIn } from '@/components/motion/fade-in';

const clients = [
  'LG CNS',
  'LG전자',
  '불스원',
  '한국교통안전공단',
  'KB카드',
  '롯데카드',
  '한국수자원공사',
  '대검찰청',
  '(주)교원',
  '포항제철',
  '한국우편사업진흥원',
  '농업기술실용화재단',
  '국립축산과학원',
  '서울시',
];

export function References() {
  return (
    <section className="overflow-hidden border-y border-border/40 bg-muted/30 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center">
          <p className="font-heading text-sm font-bold tracking-widest text-primary uppercase">
            Trusted By
          </p>
          <p className="mt-3 text-lg text-muted-foreground">
            대기업 · 공공기관을 포함한 다양한 파트너와 함께합니다
          </p>
        </FadeIn>
      </div>

      <div className="mt-14">
        <Marquee speed={40} gradient gradientWidth={80} pauseOnHover>
          {clients.map((name) => (
            <div
              key={name}
              className="mx-8 flex h-14 items-center justify-center"
            >
              <span className="whitespace-nowrap text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-foreground/80">
                {name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
