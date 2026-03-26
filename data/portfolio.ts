export type PortfolioCategory =
  | 'all'
  | 'web'
  | 'app'
  | 'program'
  | 'ai';
export type CardSize = 'large' | 'wide' | 'tall' | 'default';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  client: string;
  year: number;
  tags: string[];
  thumbnail: string;
  size?: CardSize;
  compact?: boolean;
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
    id: 'car-plate-crm',
    title: '자동차 번호판 거래업 고객관리 앱',
    description:
      '자동차 번호판 거래 업종 특화 CRM 앱. 고객 DB 관리, 거래 이력 추적, 자동 알림, 매출 통계 기능을 모바일 환경에서 제공합니다.',
    category: 'app',
    client: '번호판 거래 협회',
    year: 2026,
    tags: ['React Native', 'Supabase', 'TypeScript'],
    thumbnail: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
    size: 'default',
    compact: true,
  },
  {
    id: 'lg-ai-chatbot',
    title: 'LG CNS · LG전자 AI 챗봇 운영',
    description:
      'LG CNS 및 LG전자 고객센터 AI 챗봇 시스템 운영 및 고도화. 자연어 처리 기반 대화형 인터페이스로 고객 문의 자동 응답 및 상담 효율을 극대화했습니다.',
    category: 'ai',
    client: 'LG CNS / LG전자',
    year: 2025,
    tags: ['Python', 'NLP', 'TensorFlow', 'Docker', 'Kubernetes'],
    thumbnail:
      'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    size: 'large',
  },
  {
    id: 'happy-santa',
    title: '행복산타 — 독거 어르신 돌봄 플랫폼',
    description:
      '독거 어르신 고독사 예방을 위한 IoT 센서 기반 돌봄 관리 플랫폼. 실시간 활동 모니터링과 위험 알림 시스템을 통해 지역사회 돌봄 네트워크를 구축합니다.',
    category: 'app',
    client: '지역 사회복지기관',
    year: 2025,
    tags: ['React Native', 'IoT', 'Firebase', 'Node.js'],
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    size: 'tall',
  },
  {
    id: 'local-ad-reward',
    title: '지역 타겟 광고 및 리워드 지급 플랫폼',
    description:
      '위치 기반 타겟 광고와 리워드 적립을 결합한 O2O 플랫폼. 지역 소상공인과 소비자를 연결하는 양면 마켓을 구현했습니다.',
    category: 'web',
    client: '보노보플랫폼',
    year: 2025,
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'PWA'],
    thumbnail: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    size: 'default',
    compact: true,
  },
  {
    id: 'ai-unmanned-store',
    title: 'AI 기반 무인 매장 키오스크 시스템',
    description:
      '컴퓨터 비전과 딥러닝을 활용한 무인상점 자동 결제 시스템. 키오스크와 연동되어 상품 인식부터 결제까지 원스톱으로 처리합니다.',
    category: 'ai',
    client: '유통 스타트업',
    year: 2025,
    tags: ['Python', 'TensorFlow', 'React', 'Kiosk'],
    thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    size: 'default',
  },
  {
    id: 'rehab-reward',
    title: '재활용컵 리워드 플랫폼 및 물류 관리',
    description:
      '재활용컵 회수·세척·재배포 물류 전 과정을 관리하는 플랫폼. 리워드 적립 시스템과 실시간 물류 추적 기능을 포함합니다.',
    category: 'web',
    client: '환경 스타트업',
    year: 2025,
    tags: ['React', 'Node.js', 'MySQL', 'Logistics'],
    thumbnail: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    size: 'wide',
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
    size: 'default',
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
    size: 'tall',
  },
  {
    id: 'overseas-realestate',
    title: '해외 부동산 정보 제공 플랫폼',
    description:
      '해외 부동산 매물 등록·검색·중개를 위한 글로벌 플랫폼. 다국어 지원과 환율 자동 변환, 화상 투어 기능을 제공합니다.',
    category: 'web',
    client: '랜드글로벌',
    year: 2023,
    tags: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
    thumbnail: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    size: 'default',
    compact: true,
  },
  {
    id: 'nursing-care',
    title: '요양관리사 교육원 통합 관리 플랫폼',
    description:
      '요양관리사 교육원의 수강생 관리, 교육 과정 운영, 수료증 발급까지 전 과정을 디지털화한 통합 관리 시스템입니다.',
    category: 'web',
    client: '요양관리사 교육원',
    year: 2023,
    tags: ['PHP', 'Laravel', 'MySQL', 'jQuery'],
    thumbnail: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    size: 'default',
    compact: true,
  },
  {
    id: 'scada-vehicle',
    title: '스카이차량 매칭 플랫폼',
    description:
      '스카이차량(고소작업차) 소유자와 수요자를 실시간으로 매칭하는 플랫폼. GPS 기반 위치 추적과 예약·결제 시스템을 제공합니다.',
    category: 'web',
    client: '스카이차량 협회',
    year: 2023,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Maps API'],
    thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    size: 'default',
    compact: true,
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
    size: 'wide',
  },
  {
    id: 'construction-safety',
    title: '건설업체 안전보건관리 시스템',
    description:
      '건설 현장의 안전보건 관리를 체계화하는 시스템. 위험성 평가, 안전교육 관리, 사고 보고 및 통계 분석 기능을 포함합니다.',
    category: 'program',
    client: '건설업체',
    year: 2023,
    tags: ['C#', '.NET', 'MSSQL', 'WPF'],
    thumbnail: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    size: 'default',
    compact: true,
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
    size: 'tall',
  },
  {
    id: 'franchise-analysis',
    title: '프랜차이즈를 위한 판매 분석 플랫폼',
    description:
      '프랜차이즈 가맹점의 매출 데이터를 수집·분석하여 점포별 성과를 비교하고 최적의 운영 전략을 도출하는 BI 플랫폼입니다.',
    category: 'ai',
    client: '프랜차이즈 본사',
    year: 2022,
    tags: ['Python', 'Django', 'PostgreSQL', 'D3.js'],
    thumbnail: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    size: 'default',
  },
  {
    id: 'food-erp',
    title: '식용관 업체 ERP 시스템',
    description:
      '식용관 업종 특화 ERP 시스템. 원재료 입출고, 생산 관리, 재고 관리, 매출 분석까지 전 과정을 통합 관리합니다.',
    category: 'program',
    client: '식용관 업체',
    year: 2022,
    tags: ['Java', 'Spring', 'Oracle', 'eChart'],
    thumbnail: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    size: 'default',
    compact: true,
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
    size: 'default',
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
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    size: 'wide',
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
    thumbnail: 'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)',
    size: 'default',
    compact: true,
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
    size: 'default',
  },
  {
    id: 'franchise-sales-crm',
    title: '프랜차이즈를 위한 영업 관리 시스템',
    description:
      '프랜차이즈 영업 사원의 가맹점 방문·상담·계약 전 과정을 관리하는 CRM 시스템. 모바일 현장 보고와 실시간 영업 현황 대시보드를 제공합니다.',
    category: 'program',
    client: '프랜차이즈 본사',
    year: 2022,
    tags: ['React', 'Spring Boot', 'MySQL', 'PWA'],
    thumbnail: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    size: 'default',
  },
  {
    id: 'privacy-building',
    title: '비대면 개인화 및 건물관리 시스템',
    description:
      '비대면 환경에서의 건물 시설 관리와 입주자 개인화 서비스를 통합한 스마트 빌딩 관리 플랫폼입니다.',
    category: 'program',
    client: '건물관리 업체',
    year: 2022,
    tags: ['C#', '.NET', 'IoT', 'MSSQL'],
    thumbnail: 'linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)',
    size: 'default',
    compact: true,
  },
];
