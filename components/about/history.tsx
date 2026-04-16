'use client';

import {
  FadeIn,
  StaggerContainer,
  staggerItem,
} from '@/components/motion/fade-in';
import { motion } from 'framer-motion';
import {
  Rocket,
  HeartHandshake,
  Sparkles,
  Award,
  Wifi,
  Server,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Palette,
  Globe,
  Smartphone,
  GraduationCap,
  Monitor,
  Printer,
  Scale,
  Building2,
  Terminal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Milestone {
  year: string;
  icon: LucideIcon;
  events: string[];
}

const milestones: Milestone[] = [
  {
    year: '2026',
    icon: Rocket,
    events: [
      '자동차 번호판 거래업 고객관리 앱 및 넘버 중고거래 플랫폼',
    ],
  },
  {
    year: '2025',
    icon: HeartHandshake,
    events: [
      '행복산타 — 독거 어르신 고독사 예방 돌봄 관리 플랫폼',
      '스너글리 강아지 유치원·호텔 웹사이트 개발',
      'LG CNS · LG전자 AI 챗봇, 글로벌 챗봇, ThinQ 앱 챗봇, 서비스 홈페이지 운영 (2018~)',
    ],
  },
  {
    year: '2024',
    icon: Sparkles,
    events: [
      '광고 리워드 App — 애드어닝(AddEarning)',
      '재활용컵 선순환 포인트 지급 App — GGE컵',
      '나라장터 공사 입찰 낙찰가 분석 플랫폼',
      'AI 기반 무인상점 자동 결제 플랫폼 및 키오스크',
    ],
  },
  {
    year: '2023',
    icon: Globe,
    events: [
      '해외부동산 중개 플랫폼 — 랜드글로벌',
      '(주)불스원몰 유지보수 계약',
      '요양보호사 교육원 통합 관리 시스템',
      'TM 관리 시스템',
      '광고 리워드 플랫폼 — 애드워드',
    ],
  },
  {
    year: '2022',
    icon: Award,
    events: [
      '(주)불스원 쇼핑몰 및 통합 운영 시스템',
      '심부름 중개 플랫폼 및 기부 관리 시스템 (TDB)',
      '건설업체 안전관리 ERP',
      '사다리 차량 중개 플랫폼',
      '축사 CCTV 및 장비 원격 제어 감시 시스템 (IoT)',
    ],
  },
  {
    year: '2021',
    icon: Wifi,
    events: [
      '연결고리 — IoT 기반 호텔 객실 통합 관리 시스템 (staygo.kr)',
      '명신 — 양계 농장을 위한 통합 관리 시스템 (ERP)',
      '비드비 — 나라장터 낙찰가 예측 시스템 (빅데이터분석)',
      '캐치빌 — 부동산 정보 제공 및 매물 관리 시스템',
      '시라노소개팅 — 소개팅 채널 및 매칭 관리 시스템',
      '한국IoT — 스마트알약(IoT)을 활용한 전국 소 체온 및 활동량 분석 시스템',
      '동해수산 — 학교 급식 식자재 물류 관리 시스템',
      'KOMLINE — 선박 경로 추적 및 경로 예측 시스템',
      'miDNA유전체연구소 — 한우 DNA 검사 관리 시스템',
      '헬퍼스하이 — 복지 재단을 위한 TM 관리 시스템',
      '(주)플랜비 — 프랜차이즈를 위한 레시피 및 원가 관리 시스템',
    ],
  },
  {
    year: '2020',
    icon: Server,
    events: [
      '한국교통안전공단, KB카드, 롯데카드 발송물 생산 관리 시스템',
      '판한계약 — 아르바이트 비대면 전자서명 계약 플랫폼',
      '머슴감시 — 국회 발의 법안 이력 조회 및 평가 App',
      'SO-People — 식당 일용직 구인·구직 플랫폼',
      '원스톱 — SNS 홍보 중개 및 아르바이트 관리 App 및 시스템 구축',
      '작은세계 — 사회적 약자를 위한 전문 상담 중개 플랫폼',
      '바심즈 — 중독자를 위한 쇼핑몰 및 커뮤니티 플랫폼',
      '프랜차이즈 가맹점을 위한 원가관리, 상권분석 및 설문 조사 시스템',
      '진성 — 중고차 매칭 사이트 및 관리 시스템',
      '국립축산과학원 — 소 센서 측정 분석 시스템, 정보 제공 사이트 및 공공 API 개발',
      '사물인터넷(IoT)을 활용한 호텔 객실 통합 관리 시스템',
      'IoT 기반 미세먼지 모니터링 App 및 공기청정기 자동 제어 시스템',
    ],
  },
  {
    year: '2019',
    icon: BarChart3,
    events: [
      '빅데이터 연구개발전담부서 인증 (2019년 5월 8일)',
      '데이터뷰 — 빅데이터 머신러닝 기반 판매 예측 플랫폼 (dataview.kr)',
      '로클릭 — 소장 자동 생성 사이트 (lawclick.kr)',
      '메리츠화재 — 출력발송관리 시스템',
      '가사서비스 중개 플랫폼 (Android, iOS App 우량각시)',
      '서울시 청년대출사업 관리 시스템 (청년지갑)',
      '부동산 매물 및 분양 정보 사이트 (pexview.com)',
      '하이드론 — 드론 조종사·이용자 중개 플랫폼 (Android, iOS App)',
    ],
  },
  {
    year: '2018',
    icon: MessageSquare,
    events: [
      '머신러닝 기반 패션 스타일 추천 쇼핑몰',
      '성형수술 커뮤니티 PC웹 및 모바일웹',
      "명리학 기반 '영업의 감각' 모바일 웹",
      '생활우편주문시스템 (dm114.kr 한국우편사업진흥원-POSA 발주)',
      '수학 및 논술 학습 평가 시스템',
      '온라인 마케터 커뮤니티 사이트 (mpclub.co.kr)',
      '변리사중개플랫폼 (PC웹 및 모바일웹 catchus.co.kr)',
    ],
  },
  {
    year: '2017',
    icon: ShieldCheck,
    events: [
      '소프트웨어 품질인증 획득',
      '(주)제조 플러스 제조업체 중개 플랫폼 Web & App (jejoplus.com)',
      '(주)데이타존 회사 홈페이지 (datazone.co.kr)',
      '생활정보우편 주문 사이트 (dm114.co.kr)',
      'POD(맞춤형 주문 출판) 사이트 (datazone-pod.co.kr)',
      "명리학 기반 '직업의 감각' App",
      '옥외전광판 콘텐츠 관리 및 제어 시스템',
      '한국타이어 스마트가이드 태블릿 앱 개발',
    ],
  },
  {
    year: '2016',
    icon: Palette,
    events: [
      '(주)비스켓글로벌 과일주스 다국적 프랜차이즈 통합 관리 시스템 및 App',
      '서울기독대학 취·창업 지원 센터 홈페이지',
      '(주)열방플러스 회사 홈페이지 개발',
      '패션스타일링 인공지능 추천 시스템',
      '(주)은하시스템 가구업종 영업관리 통합 시스템',
      '(주)펀듀 P2P 크라우딩 웹 시스템',
      '한일식품 생산 및 물류 관리 시스템',
      '한국가사노동지원협회 아이돌봄서비스 관리 시스템 개발',
    ],
  },
  {
    year: '2015',
    icon: Smartphone,
    events: [
      '지역화폐 기반 온라인 품앗이 시스템 개발 및 런칭 (poomasi.co.kr)',
      '영업사원용 고객관리 Web 버전 개발 (mydm.co.kr/crm)',
      '전국여성가사사업단 홈페이지 개발 (kohwa.or.kr)',
      '(주)동양P&F 공장 플랜트 PCS 산출 프로그램 개발 (Silo, Dust Collector 등)',
      '(주)비스켓글로벌 회원 마일리지 및 쿠폰 관리 개발',
      '(주)태영 버스 마일리지 장비 관리 시스템 개발',
    ],
  },
  {
    year: '2014',
    icon: Monitor,
    events: [
      '하이미디어컴퓨터학원-노원지점 통합 시스템 개발',
      '동양P&F 공장 플랜트 PCS 산출 프로그램 개발 (Blower)',
      '방송용 숙기 실시간 제어 프로그램 개발',
      '영업사원용 고객관리 Hybrid-App버전 개발',
      '전국여성가사사업단-운영관리시스템 보안 개발',
    ],
  },
  {
    year: '2013',
    icon: GraduationCap,
    events: [
      '학교 보건 관리 Package 프로그램 (전국 2,000여 개 학교 사용)',
      '의료 협동 조합의 조합원 및 의료 정보 통합 관리 시스템',
      'RFID를 이용한 POS 관리 시스템 (한국, 호주, 미국 등 배포)',
      '농업기술실용화재단 특허 통합 관리 시스템',
      'Meat Watch 시스템 (농림수산부 축산물 추적 시스템과 연동)',
    ],
  },
  {
    year: '2012',
    icon: Globe,
    events: [
      '보드랍 키친 웹 사이트 개발',
      '성우무역 중국 의류 무역 통합 시스템 구축',
      '성우무역 의류무역상거래 웹 사이트 구축 (한국어/중국어 버전)',
      '보험및 자동차 영업맨을 위한 고객관리시스템 (PC버전/모바일웹)',
      'DM발송 전문업체 다운서비스 웹 사이트 개발',
    ],
  },
  {
    year: '2011',
    icon: Smartphone,
    events: [
      '(주)포인코인 — 포인트 및 주문배달 시스템 구축',
      '스포츠 언더웨어 — 솔리디아 사이트 구축',
      '스포츠 언더웨어 — 솔리디아 쇼핑몰 구축',
      '온라인마케팅(블로그, 트위터, 카페 및 바이럴 마케팅) — 솔리디아',
      '(주)JPIP — 광고회사 2D 모델링 사이트 구축 (jpip.co.kr)',
      '(주)하이미디어컴퓨터학원 — 학원 관리 시스템',
      '(주)하이미디어컴퓨터학원 — CID장비를 이용한 콜센터 구축',
      '지자체 — 문화관광App (iPad, Android용) 컨설팅/기획/DB설계/PM',
    ],
  },
  {
    year: '2010',
    icon: Printer,
    events: [
      '(주)디지털프린팅 — 인쇄업체 프랜차이즈 통합 관리 시스템',
      '(주)포레스코 — 근태 출입기 관리 시스템',
      '통합 포인트(포인코인) 관리 프로그램, 웹, 신용단말기통신 개발',
      '유워너트 — 토플배틀넷 시스템 개발',
      '강촌 파르테논 전원 주택 — 분양 웹 사이트 개발',
    ],
  },
  {
    year: '2009',
    icon: Scale,
    events: [
      '한국형사정책연구원 — 대검찰청 범죄통계 분석 시스템 및 웹 사이트 개발',
      '영어유치원 · 밤비니 어학원 통합 관리 시스템 개발',
      '디지털프린팅 — SMS 및 이메일을 이용한 고객 관리 시스템 개발',
    ],
  },
  {
    year: '2008',
    icon: Printer,
    events: [
      '카톨릭아카원(중앙일보계열사) — 통합 관리 시스템',
      '디지털 프린팅 — 웹 주문 시스템 구축 (한국 및 일본 버전 개발)',
      '디지털 프린팅 — 판촉물 웹 주문 시스템',
      '서진 프린팅 — 영업 및 주문 관리 통합 시스템 개발',
      '민주노총(전국실업자연대) — 도우미서비스 프랜차이즈 관리 시스템 개발',
      'YES 영도 어학원 — 통합 시스템 5차 추가 개발',
      '민병철어학원 관리시스템 커스터마이징',
    ],
  },
  {
    year: '2002~2007',
    icon: Building2,
    events: [
      'Point/공동구매/복권개념의 전자상거래 사이트 구축',
      '인쇄업체 영업관리시스템 구축',
      '아미고몰 전자 상거래 사이트 구축',
      '케이블방송국 육아TV 웹사이트 구축',
      '아이스크림 프랜차이즈 폴리미터 웹사이트 구축',
      '한중문화재단 퇘왕벌회 웹사이트 구축',
      '한미은행 웹사이트 구축',
      '중고차 중개 사이트 구축',
      '렌트카 중개 사이트 구축',
      '포항제철 산하업체 문서관리 시스템 구축',
      '광양제철산하 신영기공 물류 관리 통합 시스템 구축',
      '법인전환 — (주)보노보플랫폼 설립 (2006)',
    ],
  },
  {
    year: '1999~2001',
    icon: Terminal,
    events: [
      '소프트빌 창업, IBM/Windows 기반 시스템 개발 시작',
      '인터넷 게시-전자상거래 웹사이트 구축',
      '국내 여행 포탈 사이트 구축',
      '토스 어학원 — 통합 관리 시스템 개발',
      '대학신문 — 대학캠퍼스 클럽 시스템 개발 (옥외광고매체 온라인관리 시스템)',
      '영도어학원 프랜차이즈 통합정보시스템 구축',
      '우리교육 정기간행물 독자관리시스템 구축',
      '시사일본어학원 자동출결시스템 구축',
      '(주)샌드위치 보험사 및 자동차 영업용 고객관리시스템 구축',
      '판매/재고관리시스템 GoSale Package 개발',
      '(주)교원 빨간펜 학원프랜차이즈 통합정보시스템 구축',
      '(주)메이디아 중국유학원 학생관리시스템 구축',
      '인쇄업체 ERP 시스템 구축',
      '노인병원협의회 홈페이지 구축',
      '경찰고시 전국모의고사 성적처리시스템 구축',
      '공인중개사 전국모의고사 성적처리시스템 구축',
      '학원관리 Package 프로그램 개발',
      '부산종로학원 통합정보시스템 구축',
      '창의와탐구 학원프랜차이즈 통합정보시스템 DB구축',
    ],
  },
];

export function AboutHistory() {
  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-heading text-sm font-bold tracking-widest text-primary uppercase">
            History
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            개발 실적
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            1999년부터 이어온 기술의 발자취
          </p>
        </FadeIn>

        <StaggerContainer
          className="relative mx-auto mt-16 max-w-3xl"
          delay={0.05}
        >
          {/* Center line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border lg:left-1/2 lg:-translate-x-px" />

          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={milestone.year}
                variants={staggerItem}
                className={`relative mb-14 last:mb-0 pl-14 lg:w-1/2 ${
                  isLeft
                    ? 'lg:pl-0 lg:pr-16 lg:text-right'
                    : 'lg:ml-auto lg:pl-16 lg:text-left'
                }`}
              >
                {/* Mobile dot */}
                <div className="absolute left-[11px] top-1.5 size-[18px] rounded-full border-[3px] border-primary bg-white lg:hidden" />
                {/* Desktop dot */}
                <div
                  className={`absolute top-1.5 hidden size-[18px] rounded-full border-[3px] border-primary bg-white lg:block ${
                    isLeft ? 'right-[-9px]' : 'left-[-9px]'
                  }`}
                />

                <div
                  className={`flex items-center gap-2.5 ${
                    isLeft ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <milestone.icon
                      className="size-4 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-heading text-2xl font-bold text-primary">
                    {milestone.year}
                  </span>
                </div>

                <ul
                  className={`mt-3 space-y-1.5 ${
                    isLeft ? 'lg:text-right' : 'lg:text-left'
                  }`}
                >
                  {milestone.events.map((event) => (
                    <li
                      key={event}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {event}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
