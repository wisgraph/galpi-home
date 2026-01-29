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
        <div className="bg-white dark:bg-slate-950">
            {/* 1. Rust Native Performance */}
            <section className="py-20 md:py-32 border-b border-slate-100 dark:border-slate-800 px-6 md:px-12">
                <div className="max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 text-cyan-500 font-black tracking-widest uppercase text-sm">
                                <Cpu size={20} /> Zero Memory Waste
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                0.03초의 반응속도, <br />
                                그 뒤에 숨겨진 <span className="text-cyan-500 italic uppercase underline decoration-cyan-500/30 font-serif">Rust라는 고집</span>
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                <b>"왜 굳이 어려운 Rust로 개발했나요?"</b><br />
                                당신의 컴퓨터 메모리를 수백 MB씩 잡아먹는 '무거운 앱'을 만들고 싶지 않았습니다. 갈피는 네이티브 성능에 집착했고, Rust + Tauri로 그 목표를 달성했습니다.
                            </p>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] text-slate-500 uppercase font-black tracking-widest">
                                        <span>Galpi (Rust Core)</span>
                                        <span className="text-cyan-500">25 MB (Used only when needed)</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '8%' }}
                                            transition={{ duration: 1 }}
                                            className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                        <span>일반적인 링크 앱</span>
                                        <span>220+ MB (상시 점유)</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 1.5 }}
                                            className="h-full bg-slate-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { icon: Zap, title: 'Performance', desc: '아이콘을 누르는 순간, 앱은 이미 켜져 있습니다. 로딩 바(Loading Bar)는 저희 사전에 없습니다.' },
                                { icon: HardDrive, title: 'Resource', desc: '켜놓은 줄도 모를 가벼움. 갈피는 시스템 리소스를 점유하지 않고, 조용히 당신의 명령을 대기합니다.' },
                                { icon: GitBranch, title: 'Architecture', desc: '디스크를 긁지 않습니다. 엔터(Enter)를 치기도 전에, 결과는 이미 화면에 떠 있습니다.' }
                            ].map((item, i) => (
                                <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-black dark:text-white mb-2 uppercase">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Data Sovereignty (JSONL) */}
            <section className="py-20 md:py-32 px-6 md:px-12">
                <div className="max-w-5xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 bg-slate-900 rounded-[3rem] p-10 border border-white/10 shadow-3xl font-mono text-xs overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4 relative z-10">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                </div>
                                <span className="text-slate-500 uppercase tracking-widest text-[10px]">data.jsonl</span>
                            </div>
                            <div className="space-y-4 text-emerald-400 relative z-10">
                                <p className="opacity-40 italic">{"// Transparent text, not encrypted binary"}</p>
                                <div className="space-y-1">
                                    <p><span className="text-purple-400">{"{"}</span></p>
                                    <p className="pl-6">"title": <span className="text-amber-300">"Manifesto.md"</span>,</p>
                                    <p className="pl-6">"tags": [<span className="text-amber-300">"#engineering"</span>],</p>
                                    <p className="pl-6">"inode": <span className="text-blue-400">987654321</span></p>
                                    <p><span className="text-purple-400">{"}"}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-10">
                            <div className="inline-flex items-center gap-3 text-emerald-500 font-black tracking-widest uppercase text-sm">
                                <Shield size={20} /> Absolute Ownership
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                                당신의 데이터는 <br />
                                <span className="text-emerald-500 italic uppercase underline decoration-emerald-500/20">오직 당신의 것</span>
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                암호화된 블랙박스에 정보를 가두지 마세요. 갈피는 모든 데이터를 투명한 <b>JSONL</b> 파일로 저장합니다. 앱이 사라져도 당신의 연결은 텍스트 파일로 영원히 남습니다.
                            </p>
                            <div className="flex flex-col gap-4">
                                {[
                                    'iCloud, Dropbox, Git 어디서든 완벽한 동기화',
                                    '개인정보 수집 Zero: 우리는 당신이 무엇을 검색하는지 모릅니다'
                                ].map((li, i) => (
                                    <div key={i} className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-bold uppercase text-xs tracking-widest">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span>{li}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-blue-900/10 dark:via-slate-950 dark:to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />

                <div className="container mx-auto px-6 relative text-center">
                    <ScrollReveal>

                        <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">
                            타협하지 않는 <br />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
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
            <div className="flex-1 flex flex-col md:flex-row border-t border-slate-100 dark:border-slate-800 relative z-10">
                <div className="container mx-auto max-w-7xl flex flex-col md:flex-row">
                    {/* Sidebar Area with persistent divider */}
                    <DocSidebar
                        docs={[
                            { id: 'overview', title: 'Engineering Overview', highlight: false, separator: true },
                            ...FeatureList
                        ]}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0 bg-white dark:bg-slate-950 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="h-full"
                            >
                                {SelectedComponent ? (
                                    <SelectedComponent />
                                ) : (
                                    <div className="py-24 text-center text-slate-500 font-black uppercase tracking-widest">
                                        Under Construction
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            {/* Global CTA */}
            <section className="py-32 bg-slate-50 dark:bg-slate-950 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent" />
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">
                        공학은 <span className="text-blue-500">정직</span>해야 합니다.
                    </h2>
                    <motion.a
                        href="/features"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-blue-700 dark:hover:bg-blue-400 transition-all border-b-4 border-blue-800 dark:border-blue-600 shadow-blue-500/20"
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
