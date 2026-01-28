import {
  Brain,
  FileText,
  Code,
  Briefcase,
  LucideIcon,
  Video,
  Compass,
} from "lucide-react";

export interface PersonaTheme {
  // Dark mode backgrounds
  bgDark: string;
  // Light mode backgrounds
  bgLight: string;
  accent: string;
  accentLight: string;
  glow: string;
  glowLight: string;
}

export interface Persona {
  id: string;
  icon: LucideIcon;
  title: string;
  role: string;
  painPoint: string;
  solution: string;
  features: string[];
  theme: PersonaTheme;
  image: string;
  secondaryImages?: string[];
}

export const personas: Persona[] = [
  {
    id: "pkm",
    icon: Brain,
    title: "노션/옵시디언, 맥(Mac) 전체를 지휘하는 마에스트로가 되다.",
    role: "PKM 아키텍터",
    painPoint:
      "훅링크와 함께, 볼트 밖의 수많은 파일과 앱을 자유자재로 호출하고 연주합니다. 노션/옵시디언은 **지식의 지휘 본부(Command Center)**가 됩니다.",
    solution: "노트와 파일을 잇는 가장 강력한 마크다운의 매개체",
    features: [
      "Instant MOC: #프로젝트A 태그로 검색된 파일 20개를 한 번에 복사",
      "Plain Text First: [파일이름](hook://uuid) 형태의 순수 텍스트 링크",
    ],
    theme: {
      bgDark: "from-violet-950 via-purple-950 to-slate-950",
      bgLight: "from-violet-50 via-purple-50 to-white",
      accent: "#a855f7",
      accentLight: "#7c3aed",
      glow: "rgba(168, 85, 247, 0.3)",
      glowLight: "rgba(168, 85, 247, 0.15)",
    },
    image: "/assets/images/obsidian_projectA.png",
    secondaryImages: [
      "/assets/images/hooklink_projectA.png",
      "/assets/images/execute_pdf.png",
    ],
  },
  {
    id: "researcher",
    icon: FileText,
    title: "300페이지 논문 속으로, 0.1초 만에 핀포인트 랜딩.",
    role: "연구자",
    painPoint:
      "논문을 읽다가 중요한 문구를 발견했습니다. 그런데 일주일 뒤, 그 문구가 '어느 논문, 몇 페이지'에 있었는지 기억나시나요? 다시 찾느라 30분을 낭비하고 계신가요?",
    solution: "페이지를 넘어, 문단까지 기억합니다.",
    features: [
      "Deep PDF Linking: 링크 클릭 시 PDF 34페이지, 3번째 문단으로 바로 이동",
      "Zotero Integration: 서지 정보와 로컬 PDF를 하나의 맥락으로",
    ],
    theme: {
      bgDark: "from-cyan-950 via-blue-950 to-slate-950",
      bgLight: "from-cyan-50 via-blue-50 to-white",
      accent: "#06b6d4",
      accentLight: "#0891b2",
      glow: "rgba(6, 182, 212, 0.3)",
      glowLight: "rgba(6, 182, 212, 0.15)",
    },
    image: "/assets/images/persona2_pdf.png",
    secondaryImages: [
      "/assets/images/persona2_data.png",
      "/assets/images/persona2_diagram.png",
      "/assets/images/persona2_heatmap.png",
    ],
  },
  {
    id: "creator",
    icon: Video, // lucide-react 아이콘 이름 (없으면 Youtube)
    title: "영감 수집부터 편집 완료까지, 끊김 없는 창작의 몰입.",
    role: "인사이트 크리에이터",
    painPoint:
      "대본 쓰랴, 자료 찾으랴, 썸네일 소스 뒤지랴... 창 전환(Alt-Tab)하다가 '몰입(Flow)'이 깨지면 영상 퀄리티도 떨어집니다. 편집자에게 소스 위치 알려주느라 시간 낭비하고 있지 않나요?",
    solution: "편집 툴과 탐색기(Finder) 사이의 벽을 허뭅니다.",
    features: [
      "Script-to-Source: 대본 속 [영상소스] 텍스트를 클릭하면 원본 영상이 즉시 재생",
      "Asset Tunneling: 수십 개의 촬영본과 B-roll을 폴더 구조 상관없이 한 줄로 요약",
    ],
    theme: {
      bgDark: "from-red-950 via-orange-950 to-slate-950",
      bgLight: "from-red-50 via-orange-50 to-white",
      accent: "#f43f5e", // Rose/Red 계열
      accentLight: "#fb7185",
      glow: "rgba(244, 63, 94, 0.3)",
      glowLight: "rgba(244, 63, 94, 0.15)",
    },
    // 앞서 만든 그래프와 썸네일 더미 이미지 경로
    image: "/assets/images/Dashboard_Analytics_Viral.png",
    secondaryImages: [
      "/assets/images/Thumb_v1_mild.jpg",
      "/assets/images/240115_Script_Draft.png",
    ],
  },
  {
    id: "planner",
    icon: Compass, // 또는 Briefcase, Map
    title: "모두가 '같은 곳'을 보게 만드세요. 말 그대로.",
    role: "프로젝트 매니저 (PM)",
    painPoint:
      "'그 내용 기획서 어디 있어요?', '최종_진짜_수정본 맞나요?' 하루 종일 파일 찾아주느라 정작 기획할 시간이 없으신가요? 말로 설명하는 동안 팀원들은 서로 다른 페이지를 보고 있습니다.",
    solution: "모호한 설명 대신, 클릭 가능한 '좌표'를 던지세요.",
    features: [
      "Deep Collaboration: 기획서 42페이지 하단 '결제 정책' 문단을 정확히 타겟팅",
      "Evidence Linking: 클라이언트의 메일과 회의록을 기획서 옆에 증거로 박제",
    ],
    theme: {
      bgDark: "from-emerald-950 via-teal-950 to-slate-950",
      bgLight: "from-emerald-50 via-teal-50 to-white",
      accent: "#10b981", // Emerald 계열
      accentLight: "#34d399",
      glow: "rgba(16, 185, 129, 0.3)",
      glowLight: "rgba(16, 185, 129, 0.15)",
    },
    // 앞서 만든 간트차트, 유저 플로우 이미지 경로
    image: "/assets/images/Fig4_Data_Ingestion_Sequence_Rev2.png", // 혹은 Gantt 차트 이미지
    secondaryImages: [
      "/assets/images/User_Flow_Login.png",
      "/assets/images/Email_Client_Request.png",
    ],
  },
  // {
  //   id: "developer",
  //   icon: Code,
  //   title: "The Context Switcher",
  //   role: "개발자/디자이너",
  //   painPoint:
  //     "코드는 짰는데, '왜' 이렇게 짰는지 기억이 안 납니다. 기획서(Jira), 디자인(Figma), 코드(VS Code)가 다 따로 놀기 때문이죠. 창을 5번씩 오갑니다.",
  //   solution: "IDE를 벗어나지 않는 맥락의 연결.",
  //   features: [
  //     "Intent Linking: 코드 주석에 hook://ticket/123 링크 삽입",
  //     "No Electron Lag: Rust로 짜인 네이티브 앱, 메모리 점유 최소",
  //   ],
  //   theme: {
  //     bgDark: "from-emerald-950 via-green-950 to-slate-950",
  //     bgLight: "from-emerald-50 via-green-50 to-white",
  //     accent: "#10b981",
  //     accentLight: "#059669",
  //     glow: "rgba(16, 185, 129, 0.3)",
  //     glowLight: "rgba(16, 185, 129, 0.15)",
  //   },
  //   image: "/assets/images/persona-developer.png",
  // },
  // {
  //   id: "royer",
  //   icon: Briefcase,
  //   title:
  //     "사건 번호가 기억나지 않아도 괜찮습니다. 당신의 기억 조각들을 하나로 잇습니다.",
  //   role: "법조인",
  //   painPoint:
  //     "사건 번호 #2025고단XXX... 뭐였더라? 바쁜 변론 준비 중 번호 하나가 떠오르지 않아 멈춰 선 적이 있나요? #의뢰인명 #날짜 등 기억나는 파편만 던지세요. 연관된 파일 하나만 찾아도 그 안에 담긴 '사건 번호'를 통해 모든 맥락이 즉시 소환됩니다.",
  //   solution:
  //     "정리가 아닌 '연결'의 힘. 단 하나의 실마리로 전체 맥락을 직조하세요.",
  //   features: [
  //     "Context Hopping: 기억나는 태그 몇 개로 탐색을 시작해, 단 0.1초 만에 전체 사건 파일로 필터링 확장",
  //     "Stable Anchoring: 파일 위치가 바뀌어도 사건 번호로 묶인 모든 링크는 절대 깨지지 않고 당신의 로직을 유지",
  //   ],
  //   theme: {
  //     bgDark: "from-amber-950 via-orange-950 to-slate-950",
  //     bgLight: "from-amber-50 via-orange-50 to-white",
  //     accent: "#f59e0b",
  //     accentLight: "#d97706",
  //     glow: "rgba(245, 158, 11, 0.3)",
  //     glowLight: "rgba(245, 158, 11, 0.15)",
  //   },
  //   image: "/assets/images/persona3_main.png",
  //   secondaryImages: [
  //     "/assets/images/persona3_launcher.png",
  //     "/assets/images/persona3_evidence.png",
  //     "/assets/images/persona3_message.png",
  //   ],
  // },
];
