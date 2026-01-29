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
    title: "지식 체계의 마에스트로, 옵시디언/노션 그 이상을 지휘하다.",
    role: "PKM 아키텍터",
    painPoint:
      "흩어진 노트와 파일을 하나의 맥락으로 관통하고 싶은 '진짜 전문가'를 위한 도구입니다. 당신의 도구들이 파편화되어 있다면, 갈피는 그것들을 잇는 유일한 마크다운 접착제가 될 것입니다.",
    solution: "지식의 연결이 곧 부가가치인 분들을 위하여.",
    features: [
      "Instant MOC: #프로젝트A 태그로 검색된 파일 20개를 0.1초 만에 마크다운 소환",
      "Plain Text First: 당신이 시스템을 떠나도 링크는 텍스트로 영원히 남습니다",
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
    title: "사고의 흐름을 방해하는 30분의 검색, 0.5초의 소환으로 바꾸세요.",
    role: "연구자 / 대학원생",
    painPoint:
      "수백 편의 논문 속에서 '그 문구' 하나를 찾으려 30분을 버리고 계신가요? 그 시간은 당신의 통찰을 위해 쓰여야 합니다. 갈피는 당신의 마우스를 내려놓고 사고의 흐름에만 집중하게 만듭니다.",
    solution: "페이지를 넘어, 문단까지 0.5초 만에 랜딩.",
    features: [
      "Deep PDF Linking: 링크 클릭 시 PDF 34페이지, 3번째 문단으로 핀포인트 이동",
      "Zotero Integration: 서지 정보와 로컬 PDF를 하나의 완벽한 맥락으로 연결",
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
    id: "developer",
    icon: Code,
    title: "성능은 도덕입니다. 사고의 속도를 앞지르는 네이티브 연결.",
    role: "엔지니어 / 디자이너",
    painPoint:
      "무거운 툴은 사고를 둔탁하게 만듭니다. Rust로 짜인 극강의 가벼움으로 딜레이 없는 연결을 경험하세요. 코드는 편집기에, 기획서는 사고의 맥락 안에 가두세요.",
    solution: "IDE를 벗어나지 않는 맥락의 순간이동.",
    features: [
      "Intent Linking: 코드 주석에 galpi:// 링크로 모든 기획서 즉시 호출",
      "Native optimized: 메모리 점유율 100MB 미만, 0 latency 성능",
    ],
    theme: {
      bgDark: "from-red-950 via-orange-950 to-slate-950",
      bgLight: "from-red-50 via-orange-50 to-white",
      accent: "#f43f5e",
      accentLight: "#fb7185",
      glow: "rgba(244, 63, 94, 0.3)",
      glowLight: "rgba(244, 63, 94, 0.15)",
    },
    image: "/assets/images/persona-developer.png",
  },
  {
    id: "planner",
    icon: Compass,
    title: "회의 10분 줄이는 법: 말 대신 '좌표'를 던지세요.",
    role: "프로젝트 매니저 (PM)",
    painPoint:
      "팀원들이 자료를 찾을 때마다 당신의 흐름이 깨지나요? 모호한 설명 대신 정확한 좌표를 던지세요. 모두가 같은 곳을 보게 만드는 것, 그것이 전문가의 효율입니다.",
    solution: "설명하지 말고, 링크를 던지세요.",
    features: [
      "Deep Collaboration: 기획서 42페이지 하단 정확한 문단 타겟팅",
      "Self-Healing: 파일 경로가 바뀌어도 Inode 기반 추적으로 연결 유지",
    ],
    theme: {
      bgDark: "from-emerald-950 via-teal-950 to-slate-950",
      bgLight: "from-emerald-50 via-teal-50 to-white",
      accent: "#10b981",
      accentLight: "#34d399",
      glow: "rgba(16, 185, 129, 0.3)",
      glowLight: "rgba(16, 185, 129, 0.15)",
    },
    image: "/assets/images/persona4_pm.png",
  },
];
