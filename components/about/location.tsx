'use client';

import { FadeIn } from '@/components/motion/fade-in';
import { NaverMap } from '@/components/naver-map';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  TrainFront,
  Car,
} from 'lucide-react';

export function AboutLocation() {
  return (
    <section className="border-t border-border/40 bg-muted/30 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-heading text-sm font-bold tracking-widest text-primary uppercase">
            Location
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            오시는 길
          </h2>
        </FadeIn>

        <FadeIn className="mt-12">
          <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/50">
            <NaverMap className="h-[400px] w-full" />
          </div>
        </FadeIn>

        <FadeIn className="mt-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto_1fr]">
            {/* 연락처 */}
            <div className="space-y-6">
              <h3 className="font-heading text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Contact
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 size-[18px] shrink-0 text-primary"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">
                      경기 부천시 부일로 519
                    </p>
                    <p className="text-sm text-muted-foreground">
                      화신오피스텔 610호
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone
                    className="size-[18px] shrink-0 text-primary"
                    strokeWidth={1.5}
                  />
                  <a
                    href="tel:070-4138-7638"
                    className="text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    070-4138-7638
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail
                    className="size-[18px] shrink-0 text-primary"
                    strokeWidth={1.5}
                  />
                  <a
                    href="mailto:gold@bonobo.co.kr"
                    className="text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    gold@bonobo.co.kr
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock
                    className="size-[18px] shrink-0 text-primary"
                    strokeWidth={1.5}
                  />
                  <p className="text-[15px] text-foreground">
                    <span className="font-semibold">평일</span>{' '}
                    <span className="text-muted-foreground">
                      09:30 ~ 18:00
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden w-px bg-border lg:block" />

            {/* 교통편 */}
            <div className="space-y-6">
              <h3 className="font-heading text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Directions
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <TrainFront
                    className="mt-0.5 size-[18px] shrink-0 text-primary"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">
                      1호선 부천역
                    </p>
                    <p className="text-sm text-muted-foreground">
                      도보 약 8분
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car
                    className="mt-0.5 size-[18px] shrink-0 text-primary"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">
                      경인고속도로 부천 IC
                    </p>
                    <p className="text-sm text-muted-foreground">
                      건물 내 주차 가능 (기계식 120대)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
