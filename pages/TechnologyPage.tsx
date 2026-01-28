import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Cpu,
    Database,
    Shield,
    Zap,
    GitBranch,
    FileJson,
    Fingerprint,
    Code2,
    Terminal,
    ArrowRight,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import DocSidebar from '../components/technology/DocSidebar';
import { FeatureRegistry, FeatureList } from '../components/technology/TechRegistry';

// Data Definitions
const chapters = [
    {
        id: 'philosophy',
        icon: GitBranch,
        badge: 'Chapter 1',
        title: 'Sets over Graphs',
        subtitle: '왜 우리는 양방향 링크 테이블을 버렸는가?',
        color: 'from-purple-500 to-violet-600',
        content: {
            problem: '기존의 연결 도구들은 \'파일 A\'와 \'파일 B\'를 잇는 다리(Link Table)를 만듭니다. 파일이 100개가 되면, 다리는 수천 개가 필요합니다. 이 방식은 무겁고, 하나만 끊어져도 맥락이 사라집니다.',
            solution: '갈피는 \'Set(집합)\'을 사용합니다. #2026_기획이라는 맥락(Context)을 켜두면, 이후 등록하는 웹사이트, PDF, 문서는 자동으로 해당 집합의 원소가 됩니다.',
            benefits: [
                'Zero Friction: 링크를 걸기 위해 팝업을 띄울 필요 없음',
                'Auto-Context: 런처가 현재 활성화된 맥락을 기억하고 태그 자동 입력',
                'O(1) 복잡도: 파일이 늘어나도 속도는 일정'
            ]
        }
    },
    {
        id: 'engine',
        icon: Cpu,
        badge: 'Chapter 2',
        title: 'Rust, not Scripts',
        subtitle: '스크립트 떡칠(Glue Code)에서 벗어나다',
        color: 'from-cyan-500 to-blue-600',
        content: {
            problem: '많은 맥용 생산성 도구들이 수백 개의 AppleScript에 의존해 작동합니다. 크롬이 업데이트되면 앱이 멈추고, 파인더가 느려지면 앱도 느려집니다.',
            solution: '갈피는 시스템 레벨 언어인 Rust로 작성되었습니다. 스크립트를 거치지 않고 macOS Accessibility API와 직접 통신합니다.',
            stats: [
                { label: '메모리 점유율', value: '<100MB', note: 'Electron의 1/10' },
                { label: '검색 속도', value: '0.05초', note: '수만 개 링크도 즉시' },
                { label: '시작 시간', value: '0.1초', note: '비동기 로딩' }
            ]
        }
    },
    {
        id: 'data',
        icon: FileJson,
        badge: 'Chapter 3',
        title: 'JSONL Storage',
        subtitle: '당신의 데이터는 당신이 읽을 수 있어야 합니다',
        color: 'from-emerald-500 to-green-600',
        content: {
            problem: '소프트웨어가 업데이트되다가 DB가 깨져서(Corruption) 데이터를 날린 경험이 있으신가요? 혹은 앱을 지웠더니 내 데이터도 인질처럼 잠겨버린 적은요?',
            solution: '갈피의 저장소는 평범한 텍스트 파일(data.jsonl)입니다. 데이터베이스 엔진이 깨질 일이 없습니다.',
            features: [
                { icon: Code2, text: 'Human Readable: 메모장으로 열어볼 수 있음' },
                { icon: Shield, text: 'Corruption Proof: 충돌 시 사람이 직접 수정 가능' },
                { icon: GitBranch, text: 'Git Friendly: 버전 관리 및 백업 최적화' }
            ]
        }
    },
    {
        id: 'resilience',
        icon: Fingerprint,
        badge: 'Chapter 4',
        title: 'Dual-Tracking System',
        subtitle: '파일이 도망가도 끝까지 쫓아갑니다',
        color: 'from-amber-500 to-orange-600',
        content: {
            problem: '단순히 파일 경로(Path)만 저장하는 것은 아마추어 방식입니다. 파일 이름을 바꾸거나 폴더를 옮기면 링크가 깨집니다.',
            solution: '갈피는 macOS의 심층 기능을 활용해 이중 추적 시스템을 가동합니다.',
            tracking: [
                {
                    name: 'BookmarkData',
                    description: '파일 시스템의 고유 ID(Inode)를 추적. 파인더에서 파일 이름을 바꾸거나 폴더를 옮겨도 바뀐 경로를 즉시 알아냅니다.'
                },
                {
                    name: 'Xattr UUID',
                    description: '파일 자체에 보이지 않는 디지털 문신(Extended Attribute)을 새겨 넣습니다. 디스크 포맷 후 복원 등 최악의 경우에도 Spotlight 엔진이 파일을 다시 찾아냅니다.'
                }
            ]
        }
    }
];

const memoryTable = [
    { users: '일반 유저', links: '10,000개', json: '약 2.5 MB', memory: '약 4 MB', note: '스포티파이 노래 한 곡 용량도 안 됨' },
    { users: '헤비 유저', links: '100,000개', json: '약 25 MB', memory: '약 40 MB', note: '크롬 탭 1개보다 가벼움' },
    { users: '익스트림', links: '1,000,000개', json: '약 250 MB', memory: '약 390 MB', note: '100만 개를 모으는 사람은 거의 없음' },
];

const TechOverview: React.FC = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Chapters */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-24">
                        {chapters.map((chapter, index) => (
                            <ScrollReveal key={chapter.id} delay={index * 0.1}>
                                <div className="relative">
                                    {/* Chapter Badge */}
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${chapter.color} text-white text-sm font-medium mb-6`}>
                                        <chapter.icon className="w-4 h-4" />
                                        {chapter.badge}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                                        {chapter.title}
                                    </h2>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">{chapter.subtitle}</p>

                                    {/* Content Grid */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Problem */}
                                        <div className="p-6 rounded-2xl bg-rose-50 dark:bg-red-500/5 border border-rose-200 dark:border-red-500/20">
                                            <div className="flex items-center gap-2 mb-4">
                                                <XCircle className="w-5 h-5 text-rose-500 dark:text-red-400" />
                                                <span className="text-sm font-semibold text-rose-600 dark:text-red-400 uppercase tracking-wider">The Problem</span>
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{chapter.content.problem}</p>
                                        </div>

                                        {/* Solution */}
                                        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-green-500/5 border border-emerald-200 dark:border-green-500/20">
                                            <div className="flex items-center gap-2 mb-4">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-green-400" />
                                                <span className="text-sm font-semibold text-emerald-600 dark:text-green-400 uppercase tracking-wider">Our Solution</span>
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{chapter.content.solution}</p>
                                        </div>
                                    </div>

                                    {/* Additional Content based on chapter type */}
                                    {chapter.content.benefits && (
                                        <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Benefits</h4>
                                            <ul className="space-y-3">
                                                {chapter.content.benefits.map((benefit, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <Zap className="w-5 h-5 text-violet-500 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                                        <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {chapter.content.stats && (
                                        <div className="mt-6 grid grid-cols-3 gap-4">
                                            {chapter.content.stats.map((stat, i) => (
                                                <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
                                                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stat.value}</div>
                                                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                                                    <div className="text-xs text-slate-500 mt-1">{stat.note}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {chapter.content.features && (
                                        <div className="mt-6 grid md:grid-cols-3 gap-4">
                                            {chapter.content.features.map((feature, i) => (
                                                <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                                                    <feature.icon className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">{feature.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {chapter.content.tracking && (
                                        <div className="mt-6 space-y-4">
                                            {chapter.content.tracking.map((track, i) => (
                                                <div key={i} className="p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${chapter.color} flex items-center justify-center text-white font-bold`}>
                                                            {i + 1}
                                                        </div>
                                                        <span className="font-semibold text-slate-900 dark:text-white">{track.name}</span>
                                                    </div>
                                                    <p className="text-slate-600 dark:text-slate-400 ml-10">{track.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Memory Table Section */}
            <section className="py-20 bg-white/50 dark:bg-slate-950/50">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">📊 데이터 규모별 메모리 점유율</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-center mb-8">Rust 기반이기에 가능한 경량화</p>

                            <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-700">
                                            <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-medium">사용자 유형</th>
                                            <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-medium">링크 개수</th>
                                            <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-medium">JSON 크기</th>
                                            <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-medium">메모리</th>
                                            <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-medium">비고</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {memoryTable.map((row, i) => (
                                            <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                                                <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">{row.users}</td>
                                                <td className="py-4 px-4 text-slate-700 dark:text-slate-300">{row.links}</td>
                                                <td className="py-4 px-4 text-slate-700 dark:text-slate-300">{row.json}</td>
                                                <td className="py-4 px-4 text-cyan-600 dark:text-cyan-400 font-semibold">{row.memory}</td>
                                                <td className="py-4 px-4 text-slate-500 text-sm">{row.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* For Developers Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">For Developers</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                    <Database className="w-8 h-8 text-violet-500 dark:text-purple-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Open Adapter</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        (향후 지원 예정) 우리의 연동 로직은 투명하게 공개될 것입니다. 당신만의 워크플로우를 직접 코딩하세요.
                                    </p>
                                </div>

                                <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                    <Shield className="w-8 h-8 text-emerald-500 dark:text-green-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Telemetry</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        우리는 당신이 어떤 파일을 여는지 추적하지 않습니다. 서버로 전송되는 데이터는 '라이선스 인증 키' 단 하나뿐입니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 relative overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-6 relative">
                    <ScrollReveal>
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                더 가볍고, 더 투명하고, 더 합리적인 도구
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                                복잡한 선 긋기를 멈추고, 이제 '맥락'을 정의하세요.
                            </p>
                            <motion.a
                                href="/pricing"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
                            >
                                갈피 베타 참여하기
                                <ArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

const TechnologyPage: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string>('search-engine');

    const SelectedComponent = FeatureRegistry[selectedId];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950 min-h-screen flex flex-col"
        >
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-white to-white dark:from-cyan-900/10 dark:via-slate-950 dark:to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-300/30 to-blue-300/30 dark:from-cyan-500/20 dark:to-blue-500/20 rounded-full blur-3xl opacity-30" />

                <div className="container mx-auto px-6 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            <span className="text-slate-900 dark:text-white">
                                생각의 흐름을
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                기술로 증명합니다
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            갈피가 제안하는{" "}
                            <span className="text-slate-900 dark:text-white font-medium">
                                압도적인 성능
                            </span>
                            과
                            <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                                {" "}
                                설계 철학
                            </span>
                            을 만나보세요.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Split View */}
            <div className="flex-1 flex flex-col md:flex-row container mx-auto max-w-7xl">
                {/* Sidebar */}
                <DocSidebar
                    docs={FeatureList}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />

                {/* Main Content */}
                <main className="flex-1 min-w-0 bg-white dark:bg-slate-950">
                    <div className="h-full">
                        {selectedId === 'overview' ? (
                            <TechOverview />
                        ) : (
                            SelectedComponent ? (
                                <motion.div
                                    key={selectedId}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <SelectedComponent />
                                </motion.div>
                            ) : (
                                <div className="p-12 text-center text-slate-500">
                                    준비 중인 페이지입니다.
                                </div>
                            )
                        )}
                    </div>
                </main>
            </div>
        </motion.div>
    );
};

export default TechnologyPage;
