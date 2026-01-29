import React from 'react';
import { motion } from 'framer-motion';
import { Link, RefreshCw, ShieldCheck, FileSearch, Link2Off, Compass } from 'lucide-react';

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
                            <Compass size={12} />
                            Self-Healing Engine
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            파일이 도망가도 <br className="md:hidden" />
                            <span className="text-emerald-600 dark:text-emerald-400 italic">끝까지 쫓아갑니다.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            정리를 두려워하지 마세요. <br className="hidden md:block" />
                            이름을 바꾸고 위치를 옮겨도, 갈피는 살아있습니다.
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
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">링크 깨짐의 악몽</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                            단순한 경로 기반 링크(`file://...`)는 아마추어의 방식입니다.
                            폴더 하나만 옮겨도 그동안 쌓아온 지식의 맥락은 영원히 소실됩니다.
                            우리는 이 허무한 경험을 기술로 해결했습니다.
                        </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-100 dark:border-red-900/30">
                        <div className="font-mono text-sm space-y-4">
                            <div className="opacity-50 line-through text-slate-500">/Users/me/Desktop/report.pdf</div>
                            <div className="text-red-500 font-bold flex items-center gap-2">
                                <span className="text-xl">⚠️</span> Broken Link
                            </div>
                            <div className="text-xs text-slate-400 mt-4 leading-relaxed">
                                * 기존 도구들은 경로가 바뀌면 손을 놓습니다. <br />
                                하지만 갈피는 다릅니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solution: Dual Tracking */}
                <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black mb-4">이중 추적 시스템 (Dual Tracking)</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                                macOS의 심층 기능을 활용해 파일이 어디로 이사 가든 찾아냅니다.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-4xl mb-4">📂</div>
                                <h3 className="font-bold text-lg mb-2">Inode Tracking</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">파일 시스템의 고유 ID(Inode)를 추적하여 경로가 바뀌어도 동일 파일임을 판별합니다.</p>
                            </div>
                            <div className="hidden md:flex items-center justify-center text-slate-600">
                                <RefreshCw size={24} className="animate-spin-slow" />
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="text-4xl mb-4">🔖</div>
                                <h3 className="font-bold text-lg mb-2">Alias Bookmark</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">macOS의 BookmarkData 기술을 활용, 시스템이 직접 새 경로를 보고하게 만듭니다.</p>
                            </div>
                        </div>

                        <div className="mt-12 p-5 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-center">
                            <p className="text-emerald-200 font-bold">
                                결과: 마음껏 파일을 정리하세요. 연결은 저희가 책임집니다.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "기술은 당신의 정리를 방해하지 않는 정적이어야 합니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default UnbrokenLinks;
