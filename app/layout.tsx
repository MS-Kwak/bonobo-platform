import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 900',
});

const korolev = localFont({
  src: [
    {
      path: '../public/fonts/KorolevRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/KorolevBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '보노보플랫폼',
  description:
    '복잡한 시스템도 하나의 팀이 끝까지 책임집니다. 25년 이상 200+ 프로젝트를 완성한 소프트웨어 전문 기업',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${korolev.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
