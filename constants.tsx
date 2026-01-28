import { Persona, ComparisonItem, PricingTier, FAQItem } from './types';

export const PERSONAS: Persona[] = [
  {
    id: 'pkm',
    title: 'The PKM Architect',
    role: '옵시디언/노션 사용자',
    painPoint: "옵시디언 그래프는 아름답지만, 정작 중요한 PDF 원본과 엑셀 파일은 파인더 어딘가에 고립되어 있습니다. 노트와 파일이 따로 노는 '반쪽짜리 세컨드 브레인'을 쓰고 계시진 않나요?",
    solution: "노트와 파일을 잇는 가장 강력한 마크다운 접착제.",
    features: [
      "Instant MOC: #프로젝트A 태그로 검색된 파일 20개를 한 번에 복사",
      "Plain Text First: [파일이름](hook://uuid) 형태의 순수 텍스트 링크 지원"
    ]
  },
  {
    id: 'researcher',
    title: 'The Deep Diver',
    role: '연구자/대학원생',
    painPoint: "논문을 읽다가 중요한 문구를 발견했습니다. 그런데 일주일 뒤, 그 문구가 '어느 논문, 몇 페이지'에 있었는지 기억나시나요? 다시 찾느라 30분을 낭비하고 계신가요?",
    solution: "페이지를 넘어, 문단까지 기억합니다.",
    features: [
      "Deep PDF Linking: 링크 클릭 시 PDF 34페이지, 3번째 문단으로 이동",
      "Zotero Integration: 서지 정보와 로컬 PDF를 하나의 맥락으로 연결"
    ]
  },
  {
    id: 'developer',
    title: 'The Context Switcher',
    role: '개발자/디자이너',
    painPoint: "코드는 짰는데, '왜' 이렇게 짰는지 기억이 안 납니다. 기획서(Jira), 디자인(Figma), 코드(VS Code)가 다 따로 놀기 때문이죠. 이 셋을 확인하느라 창을 5번씩 오갑니다.",
    solution: "IDE를 벗어나지 않는 맥락의 연결.",
    features: [
      "Intent Linking: 코드 주석에 galpi://ticket/123 링크 삽입",
      "Native Rust Performance: 메모리 점유율 100MB 미만, 0 latency"
    ]
  },
  {
    id: 'pm',
    title: 'The Project Lead',
    role: '법조인/PM/기획자',
    painPoint: "회의 시작 3분 전. '그때 그 메일'과 첨부파일, 지난 회의록을 찾느라 식은땀을 흘립니다. 파일을 정리하는 것보다 찾는 게 더 일이 되어버렸습니다.",
    solution: "모든 자료를 '사건' 중심으로 재편합니다.",
    features: [
      "Project Hub: 이메일, 계약서, 슬랙 메시지... 태그 하나로 통합 호출",
      "Self-Healing: 파일을 다른 폴더로 옮겨도 끝까지 추적하여 연결 유지"
    ]
  }
];

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: '핵심 엔진',
    competitor: 'AppleScript (느림, 불안정)',
    galpi: 'Rust Native (즉시 반응)',
    note: '메모리 점유율 1/10'
  },
  {
    feature: '연결 방식',
    competitor: '1:1 수동 연결 (Manual Graph)',
    galpi: '맥락 기반 자동 연결 (Set Theory)',
    note: '노가다 vs 자동화'
  },
  {
    feature: '데이터 형태',
    competitor: 'SQLite DB (암호화/불투명)',
    galpi: 'JSONL 텍스트 (투명/개방형)',
    note: '데이터 주권 보장'
  },
  {
    feature: '복잡도',
    competitor: 'O(N²) (파일이 늘면 느려짐)',
    galpi: 'O(1) (늘어도 속도 일정)',
    note: '수만 개 링크도 0.1초'
  },
  {
    feature: '링크 유지력',
    competitor: 'Alias 의존 (종종 깨짐)',
    galpi: 'Inode + UUID 이중 추적',
    note: '파일 추적률 99.9%'
  },
  {
    feature: '가격 정책',
    competitor: '매년 $70 (임대 모델) 💸',
    galpi: '$4.99 (얼리버드 평생 소장) ☕️',
    note: '구독료 0원'
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    features: [
      '모든 기능 체험 가능',
      '최대 50개 링크 생성',
      '50개 이하 읽기/검색/실행 평생 무제한',
      '데이터 로컬 저장',
      '7일 묻지마 환불 보장'
    ],
    cta: '무료 다운로드'
  },
  {
    name: 'Pro Lifetime',
    price: '$4.99',
    originalPrice: '$14.99',
    highlight: true,
    features: [
      '모든 기능 무제한',
      '링크 생성 무제한',
      '평생 무료 업데이트',
      '우선 기술 지원',
      '선착순 100명 한정 특가'
    ],
    cta: '얼리버드 구매하기'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "저는 이미 Raycast(또는 Alfred)를 잘 쓰고 있습니다. 이게 왜 필요한가요?",
    answer: "레이캐스트는 '도구'를 열지만, 갈피는 '작업'을 엽니다. 레이캐스트는 PDF 뷰어를 실행해 줄 뿐입니다. 하지만 갈피는 그 PDF의 14페이지, 세 번째 문단을 바로 열어줍니다. Raycast와 함께 쓰세요. 앱 실행은 Raycast로, 맥락 연결은 갈피로. 둘은 최고의 콤비입니다."
  },
  {
    question: "구독료도 없이 '평생 소장'이라니, 나중에 업데이트 중단되는 거 아닌가요?",
    answer: "우리는 서버 비용이 '0원'인 구조를 만들었습니다. 갈피는 모든 데이터를 당신의 컴퓨터(Local)에서 처리합니다. 우리에겐 매달 나가는 고정비가 없습니다. 따라서 한 번의 판매로도 충분히 지속 가능한 비즈니스 모델입니다."
  },
  {
    question: "만약 제가 HookLink를 더 이상 안 쓰게 되면, 저장해둔 링크는 다 사라지나요?",
    answer: "절대 사라지지 않습니다. 데이터는 100% 당신의 것입니다. 갈피는 알 수 없는 암호화 DB를 쓰지 않습니다. 모든 링크 정보는 Documents/갈피/data.jsonl이라는 투명한 텍스트 파일에 저장됩니다. 메모장으로 열어서 확인하세요."
  },
  {
    question: "파일을 다른 폴더로 옮기거나 이름을 바꾸면 링크가 깨지나요?",
    answer: "갈피는 끝까지 쫓아가서 연결합니다. 단순히 파일 경로(주소)만 기억하는 게 아닙니다. macOS 파일 시스템의 고유 ID(Inode)와 자체 추적 기술(xattr)을 이용해 파일이 어디로 이사 가든 찾아냅니다."
  },
  {
    question: "제 워크플로우랑 안 맞으면 어떡하죠?",
    answer: "7일간 충분히 써보시고 결정하세요. 구매 후 7일 이내라면, 이유를 묻지 않고 100% 환불해 드립니다. 우리는 당신이 억지로 이 앱을 쓰길 원하지 않습니다."
  }
];

export const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Technology', href: '/technology' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
];