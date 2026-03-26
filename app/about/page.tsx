import { Metadata } from 'next';
import { AboutHero } from '@/components/about/hero';
import { AboutIntro } from '@/components/about/intro';
import { AboutBusiness } from '@/components/about/business';
import { AboutHistory } from '@/components/about/history';
import { AboutLocation } from '@/components/about/location';

export const metadata: Metadata = {
  title: '회사소개 — 보노보플랫폼',
  description:
    '1999년 창립 이래 DOS에서 AI까지, 25년간 200여 개 프로젝트를 완성한 소프트웨어 전문 기업 보노보플랫폼을 소개합니다.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutBusiness />
      <AboutHistory />
      <AboutLocation />
    </>
  );
}
