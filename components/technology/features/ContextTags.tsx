import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, FilterX, MousePointer2, Target } from 'lucide-react';

const ContextTags: React.FC = () => {
    return (
        <div className="min-h-full font-sans selection:bg-rose-500/30">
            {/* Header */}
            <header className="relative py-24 px-8 md:px-16 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-white dark:from-rose-950/40 dark:via-slate-950 dark:to-slate-950 z-0" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-widest mb-8">
                            <Zap size={14} className="animate-pulse" />
                            Inverse Workflow Engineering
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                            필터링을 '안' 하는 이유 <br />
                            <span className="text-rose-600 dark:text-rose-500 italic uppercase">The Paradox of Filtering</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-3xl">
                            "찾기 위해 숨기지 마세요. <br className="hidden md:block" /> 분류하기 위해 <b>드러내세요.</b>"
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-5xl px-8 md:px-16 py-32 space-y-32">
                {/* Section 1: The Paradox */}
                <section className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                왜 필터를 <br />
                                <span className="text-rose-500 uppercase">파괴</span>했는가.
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed italic border-l-4 border-rose-500 pl-6 py-2 bg-rose-50/50 dark:bg-rose-950/10 rounded-r-2xl">
                                <p>
                                    사용자들이 가장 많이 묻습니다. <br />
                                    <b>"태그를 눌렀는데 왜 목록이 안 줄어드나요?"</b>
                                </p>
                                <p className="not-italic text-slate-900 dark:text-white font-bold">
                                    우리의 대답은 명확합니다. <br />
                                    "숨겨진 것을 찾기 위해서"입니다.
                                </p>
                            </div>
                            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                태그를 누를 때마다 목록이 줄어든다면, 태그가 <b>없는</b> 파일들은 영원히 분류될 기회를 잃습니다.
                                우리는 이 굴레를 끊기 위해 '필터'를 '주입기'로 재설계했습니다.
                            </p>
                        </div>
                    </div>

                    <div className="relative p-1 bg-gradient-to-tr from-rose-500/20 to-violet-500/20 rounded-[2.5rem] shadow-2xl">
                        <div className="relative p-8 bg-white dark:bg-slate-900 rounded-[2.4rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <span>Engineering Logic</span>
                                    <span className="text-rose-500">Galpi Way</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700 opacity-40">
                                        <p className="text-xs font-bold mb-2 line-through text-slate-400">Other Apps: Exclusionary Filter</p>
                                        <p className="text-[11px] text-slate-400 font-mono">{"Items.hide_unless(tag == selected)"}</p>
                                    </div>
                                    <div className="p-5 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-100 dark:border-rose-900/40 shadow-inner">
                                        <p className="text-xs font-bold mb-2 text-rose-600 dark:text-rose-400">Galpi: Contextual Injection</p>
                                        <p className="text-[11px] text-rose-500 dark:text-rose-300 font-mono">{"Display_All(); Enable_Stamp(selected);"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Inverse Workflow */}
                <section className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden group shadow-3xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/20 transition-colors" />

                    <div className="relative z-10 space-y-12">
                        <div className="max-w-2xl space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase">
                                '스탬프' 모드 <br />
                                <span className="text-rose-500 italic font-light italic">Inverse Workflow</span>
                            </h2>
                            <p className="text-xl text-slate-400 leading-relaxed font-light">
                                갈피는 반대로 갑니다. <b>#project:A</b>를 누르는 순간, 시스템은 단순히 보여주는 모드가 아니라 <b>'낙인을 찍는 모드'</b>가 됩니다.
                                이제 눈에 보이는 모든 파일에 클릭 한 번으로 당신으 맥락을 주입하십시오.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "No Context Switch",
                                    desc: "타이핑을 위해 키보드로 손을 옮길 필요가 없습니다. 클릭은 몰입을 깨지 않는 가장 우아한 주입 방식입니다."
                                },
                                {
                                    title: "Batch Enrichment",
                                    desc: "100개의 레퍼런스를 훑으며 필요한 것에만 체크하세요. 1분이면 대형 프로젝트의 소싱이 끝납니다."
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group/card">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 group-hover/card:scale-150 transition-transform" />
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <div className="text-center pt-20 border-t border-slate-100 dark:border-slate-800 lg:px-20">
                    <p className="text-2xl md:text-3xl font-black italic text-slate-900 dark:text-white mb-8 leading-tight">
                        "저희는 당신의 '분류' 과정을 0초로 단축시키기 위해 <br className="hidden md:block" /> 검색의 상식을 파괴했습니다."
                    </p>
                    <div className="inline-flex items-center gap-2 text-slate-400 font-mono text-[10px] tracking-[0.3em] uppercase">
                        <span className="w-12 h-px bg-slate-300 dark:bg-slate-800" />
                        Galpi Manifesto: Chapter 03
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContextTags;
