import { Persona, ComparisonItem, PricingTier, FAQItem } from './types';

export const PERSONAS: Persona[] = [
  {
    id: 'pkm',
    title: 'The PKM Architect',
    role: '지식 체계의 마에스트로',
    painPoint: "단순히 파일을 저장하는 분들은 이 도구가 필요 없습니다. 하지만 수많은 흩어진 노트와 파일을 하나의 맥락으로 관통하고 싶은 '진짜 전문가'라면, 갈피는 당신의 유일한 마크다운 접착제가 될 것입니다.",
    solution: "지식의 연결이 곧 부가가치인 분들을 위하여.",
    features: [
      "Instant MOC: #프로젝트A 태그로 검색된 파일 20개를 0.1초 만에 마크다운으로 소환",
      "Plain Text First: 당신이 시스템을 떠나도 링크는 텍스트로 영원히 남습니다"
    ]
  },
  {
    id: 'researcher',
    title: 'The Deep Diver',
    role: '연구자/대학원생',
    painPoint: "수백 편의 논문 속에서 '그 문구' 하나를 찾으려 30분을 버리고 계신가요? 그 시간은 당신의 통찰을 위해 쓰여야 합니다. 갈피는 당신의 마우스를 내려놓고 사고의 흐름에만 집중하게 만듭니다.",
    solution: "페이지를 넘어, 문단까지 0.5초 만에 랜딩.",
    features: [
      "Deep PDF Linking: 링크 클릭 시 PDF 34페이지, 3번째 문단으로 핀포인트 이동",
      "Zotero Integration: 서지 정보와 로컬 PDF를 하나의 완벽한 맥락으로 연결"
    ]
  },
  {
    id: 'developer',
    title: 'The Context Switcher',
    role: '엔지니어링의 정점',
    painPoint: "무거운 툴에 지치셨나요? 사고의 속도를 따라오지 못하는 딜레이는 죄악입니다. Rust로 짜인 극강의 가벼움으로, 코드는 VS Code에 두고 기획서와 디자인은 사고의 맥락 안에 가두세요.",
    solution: "IDE를 벗어나지 않는 맥락의 순간이동.",
    features: [
      "Intent Linking: 코드 주석에 galpi://ticket/123 링크로 모든 기획서 즉시 호출",
      "Native Rust Performance: 메모리 점유율 100MB 미만, 사고의 속도를 앞지르는 성능"
    ]
  },
  {
    id: 'pm',
    title: 'The Project Lead',
    role: '비즈니스 마인드셋',
    painPoint: "팀원들이 '그 기획서 어디 있어요?'라고 물을 때마다 흐름이 깨지나요? 모호한 설명 대신 클릭 가능한 '좌표'를 던지세요. 모두가 같은 곳을 보게 만드는 것, 그것이 리더의 효율입니다.",
    solution: "설명하지 말고, 링크를 던지세요.",
    features: [
      "Evidence Linking: 클라이언트 메일과 회의록을 기획서 옆에 증거로 박제",
      "Self-Healing: 파일 경로가 바뀌어도 Inode 기반 추적으로 연결 유지"
    ]
  }
];

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: '핵심 엔진',
    competitor: '무거운 Electron + 단순 스크립트',
    galpi: 'Rust Core + 최적화된 네이티브 스택',
    note: '메모리 점유율 1/10 (비교 불가능)'
  },
  {
    feature: '반응 속도',
    competitor: '클릭 후 딜레이 발생 (Laggy)',
    galpi: '0.1초 즉시 반응 (Instant Response)',
    note: '사고의 흐름을 끊지 않는 가벼움'
  },
  {
    feature: '연결 방식',
    competitor: '1:1 수동 연결 (노가다 방식)',
    galpi: '맥락 기반 자동 제안 (Set Theory 기반)',
    note: '수동 작업 vs 자동화된 프레임워크'
  },
  {
    feature: '데이터 주권',
    competitor: '알 수 없는 암호화 DB (Black Box)',
    galpi: '투명한 JSONL 텍스트 (Open Data)',
    note: '내 데이터는 온전히 나의 것'
  },
  {
    feature: '링크 유지력',
    competitor: 'Alias 의존 (파일 이동 시 깨짐)',
    galpi: 'Inode + UUID 이중 추적 (Self-Healing)',
    note: '파일이 어디로 가든 찾아냅니다'
  },
  {
    feature: '가격 정책',
    competitor: '매년 $70 (구독형 임대 모델)',
    galpi: '$4.99 (얼리버드 평생 소장)',
    note: '구독 피로도 Zero'
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    features: [
      '모든 기능 체험 가능',
      '최대 50개 링크 생성',
      '기존 링크 검색/실행 평생 무제한',
      '100% 로컬 데이터 저장',
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
      '베타 기간 한정 얼리버드 혜택',
      '링크 생성/연결 무제한',
      '모든 기능 평생 소장 권한',
      '정식 출시 후 구독형($XX/년) 미적용',
      '우선 기술 지원'
    ],
    cta: '커피 한 잔 값으로 평생 소장하기'
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