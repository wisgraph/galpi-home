import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu,
    Database,
    Shield,
    Zap,
    GitBranch,
    FileJson,
    Fingerprint,
    Code2,
    ArrowRight,
    CheckCircle2,
    XCircle,
    HardDrive
} from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import DocSidebar from '../components/technology/DocSidebar';
import { FeatureRegistry, FeatureList } from '../components/technology/TechRegistry';

/**
 * TechOverview: This is the updated "Chapter-based" or "Manifesto" overview
 * that replaces the old basic overview while maintaining the engineering truths.
 */
const TechOverview: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-950 overflow-hidden">
            {/* 1. Rust vs Electron */}
            <section className="py-20 md:py-32 border-b border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 text-cyan-500 font-black tracking-widest uppercase text-sm">
                                <Cpu size={20} /> Zero Memory Waste
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                                0.03초의 반응속도, <br />
                                그 뒤에 숨겨진 <span className="text-cyan-500 italic uppercase">'Rust'라는 고집</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                <b>"왜 굳이 어려운 Rust로 개발했나요?"</b><br />
                                우리는 쉬운 길(Electron)을 택할 수 있었습니다. 하지만 당신의 컴퓨터 메모리를 수백 MB씩 잡아먹는 '무거운 웹 앱'을 또 하나 추가하고 싶지 않았습니다. 갈피는 뼈대부터 다릅니다.
                            </p>
                            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                                <div className="flex justify-between text-xs text-slate-500 uppercase font-black tracking-widest mb-2">
                                    <span>Galpi (Rust Core)</span>
                                    <span>Avg 300 MB (Used only when needed)</span>
                                </div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '8%' }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-rose-500 uppercase font-black tracking-widest mt-4">
                                    <span>Electron Based Tool</span>
                                    <span>Max 12,000+ MB (Constant Drain)</span>
                                </div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-rose-500 to-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { icon: Zap, label: 'Performance', title: '1ms Cold Start', desc: '아이콘을 누르는 순간, 앱은 이미 켜져 있습니다. 로딩 바(Loading Bar)는 저희 사전에 없습니다.' },
                                { icon: HardDrive, label: 'Resource', title: '5MB Memory Footprint', desc: '켜놓은 줄도 모를 가벼움. 갈피는 시스템 리소스를 점유하지 않고, 조용히 당신의 명령을 대기합니다.' },
                                { icon: GitBranch, label: 'Architecture', title: 'In-Memory Architecture', desc: '디스크를 긁지 않습니다. 엔터(Enter)를 치기도 전에, 결과는 이미 화면에 떠 있습니다.' }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
                                    <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
                                        <item.icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Data Sovereignty (JSONL) */}
            <section className="py-20 md:py-32 border-b border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 bg-slate-900 rounded-[2rem] p-6 border border-white/10 shadow-3xl font-mono text-xs overflow-hidden">
                            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                </div>
                                <span className="text-slate-500 uppercase tracking-widest">data.jsonl</span>
                            </div>
                            <div className="space-y-2 text-emerald-400">
                                <p className="opacity-50">{"// Transparent text, not encrypted DB"}</p>
                                <p><span className="text-purple-400">{"{"}</span></p>
                                <p className="pl-4">"title": <span className="text-amber-300">"Project_Alpha.pdf"</span>,</p>
                                <p className="pl-4">"tags": [<span className="text-amber-300">"#context:X"</span>],</p>
                                <p className="pl-4">"inode": <span className="text-blue-400">987654321</span></p>
                                <p><span className="text-purple-400">{"}"}</span></p>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="inline-flex items-center gap-3 text-emerald-500 font-black tracking-widest uppercase text-sm">
                                <Shield size={20} /> Absolute Ownership
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                                당신의 데이터는 <br />
                                <span className="text-emerald-500 italic uppercase">오직 당신의 것입니다.</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                암호화된 블랙박스에 정보를 가두지 마세요. 갈피는 모든 연결 데이터를 투명한 <b>JSONL</b> 파일로 저장합니다. 앱이 사라져도 당신의 연결은 텍스트 파일로 영원히 남습니다.
                            </p>
                            <ul className="space-y-3 pt-2">
                                {[
                                    'iCloud, Dropbox, Git 어디서든 완벽한 동기화',
                                    '개인정보 수집 Zero: 우리는 당신이 무엇을 검색하는지 모릅니다'
                                ].map((li, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                        <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                                        <span>{li}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA in Overview */}
            <div className="py-20 text-center">
                <p className="text-slate-500 mb-4 font-medium uppercase tracking-[0.2em] text-xs">Deep Dive into Features</p>
                <h3 className="text-2xl font-bold dark:text-white mb-8">좌측 메뉴에서 상세 기능을 확인하세요.</h3>
            </div>
        </div>
    );
};

const EngineeringPage: React.FC = () => {
    // We default to 'overview' to show the Engineering Manifesto first.
    const [selectedId, setSelectedId] = useState<string>('overview');

    const SelectedComponent = selectedId === 'overview' ? TechOverview : FeatureRegistry[selectedId];

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
                <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-white to-white dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950" />

                <div className="container mx-auto px-6 relative text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black tracking-widest uppercase mb-8 shadow-2xl">
                            Engineering Manifesto
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
                            타협하지 않는 <br />
                            <span className="bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900 dark:from-white dark:via-slate-400 dark:to-white bg-clip-text text-transparent">
                                공학의 고집
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                            우리는 단순히 앱을 만들지 않습니다. <br className="hidden md:block" />
                            가장 효율적인 방식으로 사고를 연결하기 위해 '기본'부터 다시 설계했습니다.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Split View Documentation */}
            <div className="flex-1 flex flex-col md:flex-row container mx-auto max-w-7xl pt-8 pb-24">
                {/* Sidebar */}
                <DocSidebar
                    docs={[
                        { id: 'overview', title: 'Engineering Overview', highlight: true, separator: true },
                        ...FeatureList
                    ]}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 bg-white dark:bg-slate-950">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="h-full px-6 md:px-12"
                        >
                            {SelectedComponent ? (
                                <SelectedComponent />
                            ) : (
                                <div className="py-24 text-center text-slate-500">
                                    준비 중인 페이지입니다.
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Global CTA */}
            <section className="py-32 bg-slate-950 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent" />
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight">
                        공학은 <span className="text-cyan-500">정직</span>해야 합니다.
                    </h2>
                    <motion.a
                        href="/features"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-xl shadow-2xl transition-all"
                    >
                        기능 작동 원리 보기
                        <ArrowRight size={20} />
                    </motion.a>
                </div>
            </section>
        </motion.div>
    );
};

export default EngineeringPage;
