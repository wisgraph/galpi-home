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
    AlertCircle
} from "lucide-react";
import ScrollReveal from "../components/animations/ScrollReveal";
import VideoMask from "../components/common/VideoMask";

const featuresData = [
    {
        id: "context-awareness",
        icon: Target,
        title: "맥락 인식: 검색하지 마세요",
        subtitle: "Context Prediction Engine",
        color: "from-violet-500 to-purple-600",
        themeColor: "#8b5cf6",
        pain: "또 검색창을 띄우셨습니까? 같은 파일을 하루에 10번 검색하는 건 인생의 낭비입니다.",
        solution: "갈피는 당신이 문서를 여는 순간, 뇌보다 먼저 연관 자료를 대령합니다. 검색하지 마세요. 그냥 주어지는 것을 누르세요.",
        videos: [
            {
                path: "/assets/videos/auto_focus_context_recall.mov",
                label: "자동 맥락 소환",
                desc: "이미 등록된 문서를 다시 열면, 갈피가 그 문서의 맥락을 인식해 연관 자료를 자동으로 제안합니다."
            },
            {
                path: "/assets/videos/typed_tag_auto_search.mov",
                label: "타입드 태그 엔진",
                desc: "타입(Type)과 값(Value)이 결합된 태그 시스템으로 정교하게 맥락을 필터링합니다."
            }
        ],
        points: [
            "현재 작업 맥락 자동 감지 및 관련 문서 노출",
            "검색어 입력 없이도 필요한 자료에 즉시 접근",
            "사고의 흐름을 끊지 않는 지능형 제안"
        ]
    },
    {
        id: "smart-tagging",
        icon: MousePointer2,
        title: "스마트 태깅: 키보드를 칠 필요가 없습니다",
        subtitle: "Zero-Input Tagging",
        color: "from-rose-500 to-pink-600",
        themeColor: "#f43f5e",
        pain: "태그 정리, 귀찮아서 미루다가 결국 포기하셨죠? 타이핑하는 순간 당신의 몰입은 깨집니다.",
        solution: "갈피에서는 캡처하는 순간, 현재 작업 중인 프로젝트의 태그가 자동으로 상속됩니다. 당신은 '분류'라는 노동에서 완전히 해방됩니다.",
        videos: [
            {
                path: "/assets/videos/auto_context_tagging.mov",
                label: "태그 자동 상속",
                desc: "현재 작업 중인 프로젝트 태그를 새 갈피에 자동으로 부여합니다."
            },
            {
                path: "/assets/videos/mouse_context_tagging.mov",
                label: "원클릭 맥락 추가",
                desc: "타이핑 없이 마우스 클릭만으로 컨텍스트를 즉시 연결합니다."
            }
        ],
        points: [
            "현재 포커스된 컨텍스트 태그 자동 추천",
            "태그 기반 맥락 관리의 스트레스 제로",
            "분류가 아닌 '연결'에 집중하는 워크플로우"
        ]
    },
    {
        id: "bulk-ops",
        icon: Sparkles,
        title: "대량 관리: 노가다는 기계에게 넘기세요",
        subtitle: "Markdown Bulk-Export",
        color: "from-blue-500 to-cyan-600",
        themeColor: "#3b82f6",
        pain: "링크 20개를 언제 하나씩 복사하고 있습니까? 당신의 시간은 그것보다 훨씬 가치 있습니다.",
        solution: "복잡한 설정 없이, Cmd+Shift+C 한 번이면 검색된 수십 개의 문서를 마크다운 리스트로 즉시 변환합니다. 옵시디언(Obsidian) 유저들이 열광하는 이유입니다.",
        videos: [
            {
                path: "/assets/videos/bulk_copy_markdown.mov",
                label: "마크다운 일괄 복사",
                desc: "검색된 모든 갈피를 Obsidian 전용 [제목](링크) 리스트로 즉시 복사"
            },
            {
                path: "/assets/videos/tag_filter_search.mov",
                label: "초고속 필터링",
                desc: "태그 버튼 하나로 수만 개의 자료 중 필요한 것만 즉시 걸러냅니다."
            }
        ],
        points: [
            "Cmd+Shift+C를 통한 고성능 일괄 복사",
            "수동 작업 대비 100배 빠른 자료 정리",
            "대량의 지식 자산을 인덱싱하는 가장 효율적인 방법"
        ]
    },
    {
        id: "environment-recall",
        icon: Layers,
        title: "환경 복구: 0.5초 만에 복귀하세요",
        subtitle: "Workspace Snapshot",
        color: "from-amber-500 to-orange-600",
        themeColor: "#f59e0b",
        pain: "어제 하던 작업을 다시 세팅하는 데 15분을 쓰고 계시진 않나요? 뇌를 예열하는 데 너무 많은 힘을 빼지 마세요.",
        solution: "엔터(Enter) 한 번으로 웹사이트, PDF, 파인더 창을 동시에 띄웁니다. 당신의 뇌를 '작업 모드'로 전환하는 데 걸리는 시간, 단 0.5초.",
        videos: [
            {
                path: "/assets/videos/bulk_open_context.mov",
                label: "컨텍스트 일괄 실행",
                desc: "검색된 모든 문서를 한 번에 오픈하여 작업 환경을 즉시 복구합니다."
            },
            {
                path: "/assets/videos/bulk_folder_open.mov",
                label: "다중 폴더 오픈",
                desc: "관련된 모든 시스템 폴더를 동시에 열어 프로젝트를 바로 시작합니다."
            }
        ],
        points: [
            "한 번의 조작으로 수십 개의 창을 즉시 배열",
            "웹, 문서, 파인더 폴더까지 완벽 지원",
            "작업 기억(Working Memory)을 디지털로 즉시 로딩"
        ]
    },
    {
        id: "persistence",
        icon: Anchor,
        title: "신뢰성: 불멸(Indestructible)의 링크",
        subtitle: "Self-Healing Link Engine",
        color: "from-emerald-500 to-teal-600",
        themeColor: "#10b981",
        pain: "파일 이름 하나 바꿨다고 링크가 다 깨져버리는, 유리 같은 도구들의 배신에 지치셨습니까?",
        solution: "갈피의 링크는 절대 끊어지지 않습니다. 파일이 어디로 숨든 Inode 추적 기술이 끝까지 찾아냅니다. 마음대로 폴더를 정리하세요.",
        videos: [
            {
                path: "/assets/videos/deep_link_obsidian.mov",
                label: "정밀한 딥링크",
                desc: "클릭 한 번으로 옵시디언 문서나 저장된 웹 리소스의 특정 위치로 도달합니다."
            },
            {
                path: "/assets/videos/finder_folder_save.mov",
                label: "파일 시스템 추적",
                desc: "폴더가 이동하거나 이름이 바뀌어도 경로를 잃지 않고 찾아갑니다."
            }
        ],
        points: [
            "Inode + UUID 기반의 자가 치유(Self-Healing) 기술",
            "Obsidian, Web, Preview 앱과의 완벽한 딥링크 통합",
            "파일 위치에 상관없이 유지되는 견고한 데이터 연결"
        ]
    }
];

interface FeatureSectionProps {
    feature: typeof featuresData[0];
    index: number;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ feature, index }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const isEven = index % 2 === 0;
    const Icon = feature.icon;

    return (
        <section className="py-24 md:py-40 border-b border-slate-100 dark:border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className={`flex flex-col lg:flex-row items-center gap-16 md:gap-24 ${isEven ? "" : "lg:flex-row-reverse"}`}>

                    {/* Text Content */}
                    <div className="w-full lg:w-2/5 space-y-8">
                        <ScrollReveal direction={isEven ? "left" : "right"}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg shadow-current/10`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className={`text-sm font-black tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
                                        {feature.subtitle}
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                                    {feature.title}
                                </h2>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-3 relative group">
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-rose-500/20 group-hover:bg-rose-500 transition-colors" />
                                    <div className="flex items-center gap-2 text-rose-500 font-black uppercase text-xs tracking-widest">
                                        <AlertCircle size={14} /> The Problem
                                    </div>
                                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light italic">
                                        "{feature.pain}"
                                    </p>
                                </div>

                                <div className="space-y-3 relative group">
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
                                    <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-xs tracking-widest">
                                        <CheckCircle2 size={14} /> The Solution
                                    </div>
                                    <p className="text-2xl text-slate-900 dark:text-slate-200 leading-relaxed font-bold">
                                        {feature.solution}
                                    </p>
                                </div>

                                <div className="grid gap-4 pt-4">
                                    {feature.points.map((p, i) => (
                                        <div key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                            <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-br ${feature.color}`} />
                                            <span className="text-lg font-medium">{p}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3 pt-6">
                                    {feature.videos.map((v, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveIdx(i)}
                                            className={`px-6 py-2.5 rounded-2xl text-sm font-black transition-all duration-300 border ${activeIdx === i
                                                ? `bg-cyan-600 dark:bg-cyan-500 text-white border-cyan-700 dark:border-cyan-400 shadow-xl shadow-cyan-500/20 scale-105`
                                                : "bg-transparent text-slate-500 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-300 font-bold"
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
                                <div className={`absolute -inset-8 bg-gradient-to-br ${feature.color} opacity-10 blur-[100px] rounded-[4rem] group-hover:opacity-20 transition-opacity duration-700`} />

                                <div className="relative aspect-video w-full">
                                    <AnimatePresence mode="popLayout">
                                        <motion.div
                                            key={feature.videos[activeIdx].path}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <VideoMask
                                                src={feature.videos[activeIdx].path}
                                                borderRadius="3rem"
                                                className="w-full h-full shadow-[0_40px_100px_rgba(0,0,0,0.4)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-slate-200/50 dark:border-white/10"
                                                crop={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="absolute top-10 left-10 z-20">
                                        <div className="px-5 py-2.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 text-white text-xs font-black tracking-widest uppercase flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color} animate-pulse`} />
                                            {feature.videos[activeIdx].label}
                                        </div>
                                    </div>
                                </div>

                                <div className="h-16 mt-12 flex items-center justify-center text-center px-12">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={feature.videos[activeIdx].path}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed"
                                        >
                                            {feature.videos[activeIdx].desc}
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

const FeaturesPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-48 pb-24 overflow-hidden border-b border-slate-100 dark:border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 to-transparent dark:from-cyan-900/5 dark:to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>

                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-10 tracking-[ -0.05em] leading-[0.9]">
                            직접 눈으로 <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 underline decoration-cyan-500/20 underline-offset-8">확인하십시오.</span>
                        </h1>

                        <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed font-light">
                            화려한 카피로 현혹하지 않습니다. <br className="hidden md:block" />
                            갈피가 당신의 워크플로우에서 <strong className="text-slate-900 dark:text-white font-black underline"> '비효율'을 제거하는 5가지 순간</strong>입니다.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Content Sections */}
            <div className="pb-24">
                {featuresData.map((feature, index) => (
                    <FeatureSection key={feature.id} feature={feature} index={index} />
                ))}
            </div>

            {/* CTA Section */}
            <section className="py-48 bg-slate-50 dark:bg-slate-950 relative overflow-hidden text-center">
                <div className="absolute inset-0 opacity-10 dark:opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-600 via-transparent to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">
                            당신의 소중한 시간을 <br />
                            <span className="text-cyan-500">진짜 가치 있는 일</span>에 쓰세요.
                        </h2>
                        <p className="text-2xl text-slate-500 dark:text-slate-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
                            찾지 마세요, 부르세요. <br />
                            0.03초 엔진의 힘으로, 0.5초 만에 당신의 지적 우주를 연결합니다.
                        </p>

                        <motion.a
                            href="/pricing"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-4 px-14 py-7 bg-cyan-600 dark:bg-cyan-500 text-white rounded-2xl font-black text-2xl shadow-2xl hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-all border-b-8 border-cyan-800 dark:border-cyan-600 shadow-cyan-500/20"
                        >
                            지금 갈피 시작하기
                            <ArrowRight className="w-6 h-6" />
                        </motion.a>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default FeaturesPage;
