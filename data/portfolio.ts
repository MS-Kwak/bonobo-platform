export type PortfolioCategory =
  | 'all'
  | 'web'
  | 'app'
  | 'program'
  | 'ai';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  client: string;
  year: number;
  tags: string[];
  thumbnail: string;
  featured?: boolean;
}

export const categories: { id: PortfolioCategory; label: string }[] =
  [
    { id: 'all', label: '전체' },
    { id: 'web', label: 'Web / Mobile' },
    { id: 'app', label: 'App' },
    { id: 'program', label: 'Program' },
    { id: 'ai', label: 'AI / Data' },
  ];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'happy-santa',
    title: '행복산타',
    description:
      '독거 어르신 고독사 예방을 위한 IoT 센서 기반 돌봄 관리 플랫폼. 실시간 활동 모니터링과 위험 알림 시스템을 통해 지역사회 돌봄 네트워크를 구축합니다.',
    category: 'app',
    client: '사회복지기관',
    year: 2025,
    tags: ['React Native', 'IoT', 'Firebase', 'Node.js'],
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    featured: true,
  },
  {
    id: 'ai-unmanned-store',
    title: 'AI 기반 무인상점 자동 결제 플랫폼',
    description:
      '컴퓨터 비전과 딥러닝을 활용한 무인상점 자동 결제 시스템. 키오스크와 연동되어 상품 인식부터 결제까지 원스톱으로 처리합니다.',
    category: 'ai',
    client: '유통 스타트업',
    year: 2024,
    tags: ['Python', 'TensorFlow', 'React', 'Kiosk'],
    thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    featured: true,
  },
  {
    id: 'nara-bidding',
    title: '나라장터 공사 입찰 낙찰가 분석 플랫폼',
    description:
      '공공조달 입찰 데이터를 수집·분석하여 낙찰가를 예측하는 웹 플랫폼. 과거 낙찰 이력 기반 통계 분석과 시각화 대시보드를 제공합니다.',
    category: 'web',
    client: '건설업체 컨소시엄',
    year: 2024,
    tags: ['Next.js', 'Python', 'PostgreSQL', 'Chart.js'],
    thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'ad-earning',
    title: '애드어닝 — 광고 리워드 App',
    description:
      '사용자가 광고를 시청하고 리워드를 적립할 수 있는 모바일 애플리케이션. 광고주와 사용자를 연결하는 양면 플랫폼을 구현했습니다.',
    category: 'app',
    client: '애드어닝',
    year: 2024,
    tags: ['Flutter', 'Spring Boot', 'MySQL', 'AWS'],
    thumbnail: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 'bullsone-mall',
    title: '불스원 쇼핑몰 및 통합 운영 시스템',
    description:
      '불스원 공식 온라인 쇼핑몰과 재고·주문·배송을 아우르는 통합 운영 시스템을 구축. ERP 연동과 실시간 재고 동기화를 지원합니다.',
    category: 'web',
    client: '(주)불스원',
    year: 2022,
    tags: ['Java', 'Spring', 'Oracle', 'Vue.js'],
    thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    featured: true,
  },
  {
    id: 'gs-certified-privacy',
    title: 'GS인증 비대면 개인정보 및 거래관리 시스템',
    description:
      'GS인증을 획득한 비대면 환경에서의 개인정보 보호 및 전자 거래 관리 시스템. 본인인증, 전자서명, 문서 관리 기능을 포함합니다.',
    category: 'program',
    client: '금융기관',
    year: 2022,
    tags: ['C#', '.NET', 'MSSQL', 'PKI'],
    thumbnail: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    id: 'iot-hotel-management',
    title: 'IoT 기반 호텔 객실 통합 관리 시스템',
    description:
      'IoT 센서와 AI를 결합하여 호텔 객실의 조명, 온도, 에너지를 자동 제어하는 스마트 객실 관리 시스템을 개발했습니다.',
    category: 'ai',
    client: '호텔 체인',
    year: 2021,
    tags: ['Python', 'MQTT', 'React', 'TensorFlow'],
    thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    id: 'dataview-ml',
    title: '머신러닝 기반 판매 예측 플랫폼 DataView',
    description:
      '과거 판매 데이터와 외부 변수를 활용한 머신러닝 판매 예측 시스템. 직관적인 대시보드와 리포트 자동 생성 기능을 제공합니다.',
    category: 'ai',
    client: '유통 대기업',
    year: 2019,
    tags: ['Python', 'Scikit-learn', 'Django', 'D3.js'],
    thumbnail: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
  {
    id: 'kats-mailing',
    title: '한국교통안전공단 발송물 생산 관리 시스템',
    description:
      '대량 우편물의 생산·발송 프로세스를 체계적으로 관리하는 시스템. 바코드 추적, 배치 관리, 실시간 현황 모니터링 기능을 구현했습니다.',
    category: 'program',
    client: '한국교통안전공단',
    year: 2020,
    tags: ['Java', 'Spring', 'Oracle', 'Barcode'],
    thumbnail: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  },
  {
    id: 'nias-cattle-sensor',
    title: '국립축산과학원 소 센서 측정 분석 시스템',
    description:
      '축산 IoT 센서 데이터를 수집·분석하여 소의 건강 상태와 행동 패턴을 모니터링하는 시스템. 이상 징후 조기 감지 알고리즘을 개발했습니다.',
    category: 'ai',
    client: '국립축산과학원',
    year: 2020,
    tags: ['Python', 'IoT', 'ML', 'PostgreSQL'],
    thumbnail: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  },
  {
    id: 'land-global',
    title: '해외부동산 중개 플랫폼 랜드글로벌',
    description:
      '해외 부동산 매물 등록·검색·중개를 위한 글로벌 플랫폼. 다국어 지원과 환율 자동 변환, 화상 투어 기능을 제공합니다.',
    category: 'web',
    client: '랜드글로벌',
    year: 2023,
    tags: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
    thumbnail: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
  },
  {
    id: 'car-plate-crm',
    title: '자동차 번호판 거래업 고객관리 앱',
    description:
      '자동차 번호판 거래 업종 특화 CRM 앱. 고객 DB 관리, 거래 이력 추적, 자동 알림, 매출 통계 기능을 모바일 환경에서 제공합니다.',
    category: 'app',
    client: '번호판 거래 협회',
    year: 2026,
    tags: ['React Native', 'Supabase', 'TypeScript'],
    thumbnail: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
  },
];
