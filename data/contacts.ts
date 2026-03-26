export interface ContactItem {
  id: string;
  author: string;
  phone: string;
  title: string;
  content: string;
  password?: string;
  date: string;
  replied: boolean;
  reply?: string;
  replyDate?: string;
}

export const contactItems: ContactItem[] = [
  {
    id: '142',
    author: '민서찡',
    phone: '010-3121-3220',
    title: 'Next.js 공공기관 프로젝트 운영 의뢰 문의합니다.',
    content:
      'Next.js 공공기관 프로젝트 운영 의뢰 문의합니다. 테스트입니다.',
    date: '2026-03-26',
    replied: false,
  },
  {
    id: '141',
    author: '심현주',
    phone: '010-****-****',
    title: '회사 홈페이지 제작 혹은 리뉴얼',
    content:
      '안녕하세요. 회사 홈페이지 리뉴얼을 고민하고 있어 문의드립니다. 현재 워드프레스 기반으로 운영 중인데, React 기반으로 전환하고 싶습니다.',
    date: '2026-02-25',
    replied: true,
    reply:
      '문의 감사합니다. 홈페이지 리뉴얼 관련하여 상세 안내 메일을 발송드렸습니다. 확인 부탁드립니다.',
    replyDate: '2026-02-26',
  },
  {
    id: '140',
    author: '비다',
    phone: '010-****-****',
    title: 'PDF to HTML5 솔루션 문의합니다',
    content:
      'PDF 문서를 HTML5로 변환하는 솔루션에 대해 문의드립니다. 대량의 PDF 문서를 웹에서 열람할 수 있도록 변환이 필요합니다.',
    date: '2026-02-06',
    replied: true,
    reply:
      '안녕하세요. PDF to HTML5 변환 솔루션 관련 견적서를 메일로 발송드렸습니다.',
    replyDate: '2026-02-07',
  },
  {
    id: '139',
    author: '안산',
    phone: '010-****-****',
    title: '방문 미팅 가능하신지요?',
    content:
      '프로젝트 논의를 위해 방문 미팅이 가능한지 문의드립니다. 이번 주 중으로 방문 가능할까요?',
    date: '2026-02-02',
    replied: true,
    reply:
      '네, 방문 미팅 가능합니다. 일정 조율을 위해 연락처로 연락드리겠습니다.',
    replyDate: '2026-02-03',
  },
  {
    id: '138',
    author: '김도영',
    phone: '010-****-****',
    title: '보험 영업 관리',
    content:
      '보험 영업 관리 시스템 개발 관련 문의드립니다. 현재 엑셀로 관리 중인 고객 데이터를 시스템화하고 싶습니다.',
    date: '2026-01-23',
    replied: true,
    reply:
      '보험 영업 관리 시스템 관련 포트폴리오와 견적을 전달드렸습니다.',
    replyDate: '2026-01-24',
  },
  {
    id: '137',
    author: '박하영',
    phone: '010-****-****',
    title: '교육 시험 플랫폼입니다. 견적요청~~~^^*',
    content:
      '온라인 교육 및 시험 플랫폼 개발을 의뢰하고 싶습니다. CBT 방식의 시험 시스템이 필요합니다.',
    date: '2026-01-05',
    replied: true,
    reply:
      '교육 시험 플랫폼 관련 상세 미팅 일정을 잡아 연락드리겠습니다.',
    replyDate: '2026-01-06',
  },
  {
    id: '136',
    author: '심대형',
    phone: '010-****-****',
    title: '급여 ERP 판매 가능하시나요?',
    content:
      '급여 ERP 솔루션 판매 관련 문의드립니다. 50인 규모 회사에서 사용할 급여 관리 시스템이 필요합니다.',
    date: '2025-12-27',
    replied: true,
    reply:
      '급여 ERP 관련 데모 시연 및 견적 안내를 이메일로 발송드렸습니다.',
    replyDate: '2025-12-28',
  },
  {
    id: '135',
    author: '김여준',
    phone: '010-****-****',
    title: 'AI 에이전트 - n8n - ERP연동 ... 상담요',
    content:
      'AI 에이전트와 n8n 워크플로우를 활용한 ERP 연동 자동화에 대해 상담받고 싶습니다.',
    date: '2025-12-22',
    replied: true,
    reply:
      'AI 에이전트 및 n8n ERP 연동 관련 상세 상담을 위해 연락드리겠습니다.',
    replyDate: '2025-12-23',
  },
];
