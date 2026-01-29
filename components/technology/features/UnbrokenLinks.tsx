import React from 'react';
import { motion } from 'framer-motion';
import { Link2Off, Compass, Anchor, ShieldCheck, Target, ExternalLink } from 'lucide-react';

const UnbrokenLinks: React.FC = () => {
    return (
        <div className="min-h-full font-sans selection:bg-emerald-500/30">
            {/* Header */}
            <header className="relative py-24 px-8 md:px-16 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-white dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950 z-0" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-widest mb-8">
                            <Anchor size={14} />
                            Self-Healing Engine
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                            파일 좀 옮겼다고 링크가 깨진다면, <br />
                            <span className="text-emerald-600 dark:text-emerald-500 italic uppercase underline decoration-emerald-500/30">그건 도구가 아닙니다.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-3xl">
                            "정리는 자유로워야 합니다. <br className="hidden md:block" /> 갈피의 연결은 <b>강철 와이어</b>처럼 질깁니다."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-5xl px-8 md:px-16 py-32 space-y-32">
                {/* Section 1: The Nightmare */}
                <section className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                            <Link2Off size={32} />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                            "폴더 정리 한 번 했다가, <br /> <span className="text-red-500">지옥</span>을 보았습니다."
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                            기존의 파일 링크(`file://`)는 너무나 연약합니다. 폴더 이름 하나, 파일 이름 하나만 바꿔도 길을 잃습니다.
                            우리는 이 허무한 경험을 기술로 해결했습니다.
                        </p>
                        <div className="p-6 bg-red-50 dark:bg-red-950/10 rounded-2xl border border-red-100 dark:border-red-900/20 italic text-slate-500 dark:text-slate-400 font-light text-sm">
                            "1년 전 스크랩한 자료들 중 30%가 링크가 깨져 있더군요. 그게 제가 이 기능을 만든 이유입니다."
                        </div>
                    </div>

                    <div className="relative p-8 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6">
                            <div className="px-4 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase rounded-full animate-bounce shadow-lg shadow-red-500/20">
                                Nightmare Case
                            </div>
                        </div>
                        <div className="space-y-8 pt-8">
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yesterday (Active)</p>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 font-mono text-xs text-slate-500">
                                    /Users/me/Documents/Draft/v1_Final.pdf
                                </div>
                            </div>
                            <div className="flex justify-center text-red-500 opacity-50"><Link2Off size={32} /></div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Today (Renamed & Moved)</p>
                                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-100 dark:border-red-900/30 font-mono text-xs text-red-500 shadow-inner">
                                    /Users/me/Projects/Archive/v1_Real_Final.pdf
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Stalker Logic */}
                <section className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden group">
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-50 shadow-[0_0_20px_rgba(16,185,129,0.3)]" />

                    <div className="max-w-3xl space-y-10 relative z-10">
                        <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm tracking-widest uppercase">
                            <Target size={18} className="animate-spin-slow" />
                            Persistent Tracking Engine
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight uppercase">
                            갈피는 집요한 <br />
                            <span className="text-emerald-500 italic uppercase">추적자(Stalker)</span>입니다.
                        </h2>
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            파일의 이름이 바뀌어도, 폴더가 10번 바뀌어도, 심지어 <b>휴지통</b>에 들어가도 갈피는 끝까지 쫓아갑니다.
                            우리는 경로가 아닌, 운영체제가 부여한 영혼의 고유번호 <b>Inode</b>를 물고 늘어집니다.
                        </p>

                        <div className="grid md:grid-cols-2 gap-10 pt-10 text-left">
                            <div className="space-y-4 p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                <h4 className="text-emerald-400 font-black flex items-center gap-3 uppercase tracking-tight">
                                    <ShieldCheck size={20} /> Inode Tracking
                                </h4>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">
                                    파일의 위치나 이름에 의존하지 않습니다. 하위 파일 시스템의 고유 식별자를 통해 '동일성'을 물리적으로 보장합니다.
                                </p>
                            </div>
                            <div className="space-y-4 p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                <h4 className="text-emerald-400 font-black flex items-center gap-3 uppercase tracking-tight">
                                    <ExternalLink size={20} /> Alias Bookmark
                                </h4>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">
                                    macOS의 북마크 기술을 활용하여, 시스템이 스스로 파일의 이동 경로를 갈피에게 '보고'하게 만듭니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <div className="text-center pt-20 border-t border-slate-100 dark:border-slate-800 lg:px-20">
                    <p className="text-2xl md:text-3xl font-black italic text-slate-900 dark:text-white mb-8 leading-tight">
                        "마음껏 폴더를 정리하세요. <br className="hidden md:block" /> 연결은 저희가 책임집니다."
                    </p>
                    <div className="inline-flex items-center gap-2 text-slate-400 font-mono text-[10px] tracking-[0.3em] uppercase">
                        <span className="w-12 h-px bg-slate-300 dark:bg-slate-800" />
                        Galpi Manifesto: Chapter 07
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UnbrokenLinks;
