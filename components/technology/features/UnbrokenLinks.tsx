import React from 'react';
import { motion } from 'framer-motion';
import { Link, RefreshCw, ShieldCheck, FileSearch, Link2Off } from 'lucide-react';

const UnbrokenLinks: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-emerald-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-emerald-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Link size={12} />
                            견고한 연결성
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            완전 추적 시스템
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "파일을 옮겨도, 이름을 바꿔도,<br className="hidden md:block" /> 링크는 살아있습니다."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Problem Statement */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 mb-6">
                            <Link2Off size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">링크 깨짐의 악몽</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            기존의 파일 링크(`file://...`)는 파일 위치를 조금만 바꿔도 즉시 깨지고 맙니다.
                            <br /><br />
                            "중요한 문서를 정리하려고 폴더를 만들어서 옮겼더니, 그동안 모아둔 모든 하이퍼링크가 작동하지 않는 경험", 한 번쯤 있으실 겁니다.
                        </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-100 dark:border-red-900/30">
                        <div className="font-mono text-sm space-y-4">
                            <div className="opacity-50 line-through text-slate-500">/Users/me/Desktop/report.pdf</div>
                            <div className="text-red-500 font-bold flex items-center gap-2">
                                <span className="text-xl">⚠️</span> File not found
                            </div>
                            <div className="text-xs text-slate-400 mt-4">
                                * 단순한 경로 이동에도 기존 링크는 영원히 소실됩니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solution: Dual Tracking */}
                <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">자가 치유 아키텍처</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                HookLink는 macOS의 파일 시스템 이벤트를 감지하여, 파일의 이동을 실시간으로 추적합니다.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="text-4xl mb-4">📂</div>
                                <h3 className="font-bold text-lg mb-2">Inode Tracking</h3>
                                <p className="text-sm text-slate-400">파일의 고유 번호(inode)를 추적하여 경로가 바뀌어도 동일 파일임을 인식합니다.</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center text-slate-600">
                                <RefreshCw size={24} className="animate-spin-slow" />
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="text-4xl mb-4">🔖</div>
                                <h3 className="font-bold text-lg mb-2">Alias Bookmark</h3>
                                <p className="text-sm text-slate-400">macOS의 BookmarkData 기술을 활용, 파일이 이동되면 새 경로를 자동으로 갱신합니다.</p>
                            </div>
                        </div>

                        <div className="mt-12 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center">
                            <p className="text-emerald-200 font-medium">
                                결과: 사용자가 파일을 어디로 옮기든, HookLink의 링크는 끊어지지 않습니다.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "정리를 두려워하지 마세요.<br /> 마음껏 파일을 이동하고 구조화하세요."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default UnbrokenLinks;
