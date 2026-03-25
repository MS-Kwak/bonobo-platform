import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { label: '회사소개', href: '/about' },
  { label: '포트폴리오', href: '/portfolio' },
  { label: '공지사항', href: '/notice' },
  { label: '견적문의', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <Image
              src="/bonobo-logo-footer.png"
              alt="보노보플랫폼"
              width={140}
              height={36}
              className="h-8 w-auto"
            />
            <p className="text-sm leading-relaxed text-white/60">
              복잡한 시스템도 하나의 팀이 끝까지 책임집니다.
              <br />
              1999년부터 이어온 소프트웨어 전문 기업.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              바로가기
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              고객센터
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-white/40" />
                <a
                  href="tel:070-4138-7638"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  070-4138-7638
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-white/40" />
                <a
                  href="mailto:gold@bonobo.co.kr"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  gold@bonobo.co.kr
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 mt-0.5 shrink-0 text-white/40" />
                <span className="text-sm text-white/60">
                  경기도 부천시 부일로 519(심곡동) 610호
                </span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-white/40">
              운영시간 : 평일 09:30 ~ 18:00
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} (주)보노보플랫폼. All
            rights reserved. 사업자등록번호 739-81-00524 대표 황금상
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <Link
              href="#"
              className="transition-colors hover:text-white/60"
            >
              이용약관
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-white/60"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
