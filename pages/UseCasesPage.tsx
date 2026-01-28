import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Anchor,
  Sparkles,
  Target,
  ArrowRight,
  Play,
  MousePointer2,
  Layers,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "../components/animations/ScrollReveal";
import VideoMask from "../components/common/VideoMask";

const useCases = [
  {
    id: "context-recall",
    icon: Target,
    title: "맥락 인식 및 자동 제안",
    subtitle: "포커스 앱 기반의 연관 문서 소환",
    color: "from-violet-500 to-purple-600",
    themeColor: "#8b5cf6",
    pain: "특정 문서나 웹페이지를 열었을 때 관련 자료를 찾기 위해 다시 검색을 반복해야 했습니다.",
    solution: "갈피가 이를 자동으로 인식하여 연관된 모든 문서들을 즉시 제안합니다.",
    videos: [
      {
        path: "/assets/videos/typed_tag_auto_search.mov",
        label: "타입드 태그 검색",
        desc: "타입(Type)과 값(Value)이 결합된 태그 시스템을 통해 정교하게 맥락을 필터링합니다."
      },
      {
        path: "/assets/videos/auto_focus_context_recall.mov",
        label: "자동 맥락 소환",
        desc: "이미 등록된 문서를 다시 열면, 갈피가 그 문서의 맥락을 인식해 연관된 다른 자료들을 자동으로 제안합니다."
      }
    ],
    features: [
      "양방향 바인딩을 태그 시스템으로 개선",
      "현재 작업 맥락 자동 감지 및 관련 문서 노출",
      "검색어 입력 없이도 필요한 자료에 접근"
    ]
  },
  {
    id: "smart-tagging",
    icon: MousePointer2,
    title: "스마트 태깅 워크플로우",
    subtitle: "복잡한 입력 없는 맥락 등록",
    color: "from-rose-500 to-pink-600",
    themeColor: "#f43f5e",
    pain: "새로운 자료를 저장할 때마다 매번 태그를 타이핑하는 것은 큰 장벽입니다.",
    solution: "작업 중이라면 새로운 웹페이지나 문서를 캡처할 때 태그가 자동으로 등록됩니다.",
    videos: [
      {
        path: "/assets/videos/auto_context_tagging.mov",
        label: "태그 자동 등록",
        desc: "현재 작업 중인 프로젝트 태그를 새 갈피에 자동으로 상속"
      },
      {
        path: "/assets/videos/mouse_context_tagging.mov",
        label: "원클릭 맥락 추가",
        desc: "입력 없이 마우스 클릭만으로 컨텍스트 태그를 즉시 부여"
      }
    ],
    features: [
      "현재 포커스된 컨텍스트 태그 자동 자동완성",
      "태그 우클릭을 통한 간편한 삭제 및 수정",
      "태그 기반 맥락 관리의 스트레스 제로"
    ]
  },
  {
    id: "bulk-ops",
    icon: Sparkles,
    title: "대량 자산 관리",
    subtitle: "검색 결과를 한 번에 처리",
    color: "from-blue-500 to-cyan-600",
    themeColor: "#3b82f6",
    pain: "검색 결과들을 하나씩 열어보거나 정리를 위해 일일이 링크를 복사하는 작업은 소모적입니다.",
    solution: "검색된 모든 항목의 링크를 한 번에 복사하고 필터링된 결과를 즉시 확인하세요.",
    videos: [
      {
        path: "/assets/videos/bulk_copy_markdown.mov",
        label: "마크다운 일괄 복사",
        desc: "검색된 모든 갈피를 Obsidian 전용 [제목](링크) 리스트로 즉시 복사"
      },
      {
        path: "/assets/videos/tag_filter_search.mov",
        label: "태그 필터링",
        desc: "갈피 하단 태그 버튼 클릭 시 검색창에 자동 입력 및 필터링"
      }
    ],
    features: [
      "Cmd+Shift+C를 통한 고성능 일괄 복사",
      "태그 버튼 인터랙션을 통한 초고속 검색 필터링",
      "대량의 지식 자산을 인덱싱하는 가장 빠른 방법"
    ]
  },
  {
    id: "environment-recall",
    icon: Layers,
    title: "작업 환경 즉시 복구",
    subtitle: "여러 문서를 한 번에 오픈",
    color: "from-amber-500 to-orange-600",
    themeColor: "#f59e0b",
    pain: "매일 아침 어제 작업하던 폴더와 관련 문서들을 일일이 찾아 여느라 시간을 낭비하시나요?",
    solution: "프로젝트 태그로 검색된 모든 자산(웹, 문서, 폴더)을 엔터 한 번으로 동시에 실행합니다.",
    videos: [
      {
        path: "/assets/videos/bulk_open_context.mov",
        label: "전체 자산 일괄 실행",
        desc: "검색된 문서와 웹사이트 전체를 한 번에 오픈"
      },
      {
        path: "/assets/videos/bulk_folder_open.mov",
        label: "여러 폴더 동시 열기",
        desc: "작업에 필요한 다중 시스템 폴더를 즉시 실행"
      }
    ],
    features: [
      "한 번의 조작으로 수십 개의 창을 즉시 배열",
      "웹, 문서 뿐만 아니라 시스템 폴더까지 완벽 지원",
      "작업 기억(Working Memory)을 디지털로 즉시 로딩"
    ]
  },
  {
    id: "persistence",
    icon: Anchor,
    title: "신뢰할 수 있는 연결",
    subtitle: "파일 이동과 딥링크 지원",
    color: "from-emerald-500 to-teal-600",
    themeColor: "#10b981",
    pain: "파일 이름을 바꾸거나 위치를 이동하면 모든 연결이 깨져버려 당황스러우셨죠?",
    solution: "Inode 기반의 자가 치유 기능을 통해 폴더 위치가 바뀌어도 연결을 안전하게 유지합니다.",
    videos: [
      {
        path: "/assets/videos/deep_link_obsidian.mov",
        label: "딥링크 이동",
        desc: "클릭 한 번으로 옵시디언 문서나 저장된 웹 갈피로 즉시 도달"
      },
      {
        path: "/assets/videos/finder_folder_save.mov",
        label: "파인더 폴더 유지",
        desc: "시스템 폴더를 갈피로 등록하고 이동 시에도 연결 유지"
      }
    ],
    features: [
      "Obsidian, Web, Preview(PDF/이미지) 앱 딥링크",
      "Inode 추적을 통한 경로 변경 무결성 보장",
      "파일이 어디로 이사 가든 유지되는 강력한 연결성"
    ]
  }
];

interface CinematicSectionProps {
  useCase: typeof useCases[0];
  index: number;
}

const CinematicSection: React.FC<CinematicSectionProps> = ({ useCase, index }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const isEven = index % 2 === 0;
  const Icon = useCase.icon;

  return (
    <section className="py-24 md:py-40 border-b border-slate-100 dark:border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col lg:flex-row items-center gap-16 md:gap-24 ${isEven ? "" : "lg:flex-row-reverse"}`}>

          {/* Text Content */}
          <div className="w-full lg:w-2/5 space-y-8">
            <ScrollReveal direction={isEven ? "left" : "right"}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${useCase.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-sm font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r ${useCase.color}`}>
                    {useCase.subtitle}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                  {useCase.title}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-rose-500 font-semibold uppercase text-xs tracking-widest">The Problem</p>
                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    {useCase.pain}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-emerald-500 font-semibold uppercase text-xs tracking-widest">The Solution</p>
                  <p className="text-xl text-slate-600 dark:text-slate-200 leading-relaxed font-medium">
                    {useCase.solution}
                  </p>
                </div>

                <div className="grid gap-4 pt-4">
                  {useCase.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${useCase.color}`} />
                      <span className="text-lg">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-6">
                  {useCase.videos.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeIdx === i
                        ? `bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xl scale-105`
                        : "bg-transparent text-slate-500 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-300"
                        }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Video Showcase */}
          <div className="w-full lg:w-3/5">
            <ScrollReveal direction={isEven ? "right" : "left"} delay={0.2}>
              <div className="relative group">
                <div className={`absolute -inset-4 bg-gradient-to-br ${useCase.color} opacity-20 blur-3xl rounded-[4rem] group-hover:opacity-30 transition-opacity duration-700`} />

                {/* Fixed Aspect Ratio Container to prevent jittering */}
                <div className="relative aspect-video w-full">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={useCase.videos[activeIdx].path}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <VideoMask
                        src={useCase.videos[activeIdx].path}
                        borderRadius="3rem"
                        className="w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-white/10"
                        crop={{ top: 0, bottom: 0, left: 0, right: 0 }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Video Label Overlay - Stable placement */}
                  <div className="absolute top-8 left-8 z-20">
                    <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                      <Play className="w-3 h-3 fill-current" />
                      {useCase.videos[activeIdx].label}
                    </div>
                  </div>
                </div>

                {/* Sub-description for video - Fixed spacing to prevent layout shift */}
                <div className="h-12 mt-8 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={useCase.videos[activeIdx].path}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-slate-500 dark:text-slate-500 italic text-sm"
                    >
                      {useCase.videos[activeIdx].desc}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

const UseCasesPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/50 to-transparent dark:from-slate-900/50 dark:to-transparent" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs font-bold tracking-widest uppercase mb-8">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Real-world Workflows
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
              실제로 보시고 <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-pink-500 to-amber-500">직접 판단하세요.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              화려한 카피보다 중요한 건 당신의 작업 효율입니다. <br className="hidden md:block" />
              갈피가 여는 10가지 혁신적인 맥락 연결 시나리오.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Cinematic Content Sections */}
      <div className="pb-24">
        {useCases.map((useCase, index) => (
          <CinematicSection key={useCase.id} useCase={useCase} index={index} />
        ))}
      </div>

      {/* Final CTA */}
      <section className="py-40 bg-slate-950 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              당신의 흐름은 소중하니까
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              찾지 마세요, 부르세요. <br />
              단축키 하나로 지식의 우주를 연결하는 즐거움.
            </p>

            <motion.a
              href="/pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-slate-950 rounded-full font-bold text-xl shadow-2xl hover:bg-slate-100 transition-colors"
            >
              지금 갈피 시작하기
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default UseCasesPage;
