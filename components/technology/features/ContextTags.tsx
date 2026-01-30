import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Hash, Settings, MousePointer2, Target, Layers, Layout } from 'lucide-react';

const ContextTags: React.FC = () => {
    return (
        <div className="min-h-full font-sans selection:bg-indigo-500/30">
            {/* Hero Section */}
            <header className="relative py-24 px-8 md:px-16 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-white dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950 z-0" />

                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-black uppercase tracking-widest mb-8">
                            <Zap size={14} className="animate-pulse" />
                            The Context Workflow
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                            규칙이 감각으로,<br />
                            <span className="text-indigo-600 dark:text-indigo-400 italic">스템프 시스템</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-3xl">
                            단순한 분류를 넘어 작업의 흐름을 잇습니다. <br className="hidden md:block" />
                            갈피의 3단계 태그 매커니즘이 어떻게 수동 입력을 없애는지 확인해보세요.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-6xl px-8 md:px-16 py-32 space-y-40">
                {/* Step 1: Typed Tag */}
                <section className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-2 text-indigo-500 font-black tracking-widest uppercase text-xs">
                            <Hash size={16} /> 01. The Grammar
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            타입드 태그 <br />
                            <span className="text-indigo-500">(Typed Tag)</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                            갈피는 일반적인 태그뿐만 아니라, <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">#타입:값</code> 구조의 <b>타입드 태그</b>를 지원합니다.
                            이는 데이터와 작업 맥락에 '프로젝트', '속성'과 같은 명확한 역할을 부여하여, 지능형 필터링과 자동화가 가능하게 만드는 핵심 속성(Property)이 됩니다.
                        </p>
                        <div className="flex gap-3">
                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 font-mono">#project:galpi</span>
                            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 font-mono">#client:internal</span>
                        </div>
                    </div>
                    <div className="lg:col-span-7 relative bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner group">
                        <img
                            src="/assets/images/typed_tag.png"
                            alt="Typed Tag Syntax"
                            className="w-full h-auto object-contain rounded-[1.8rem] transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-[1.8rem]" />
                    </div>
                </section>

                {/* Step 2: Context Type */}
                <section className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="order-2 lg:order-1 lg:col-span-7 relative bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner group">
                        <img
                            src="/assets/images/context_type.png"
                            alt="Context Type Settings"
                            className="w-full h-auto object-contain rounded-[1.8rem] transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-[1.8rem]" />
                    </div>
                    <div className="space-y-6 order-1 lg:order-2 lg:col-span-5">
                        <div className="inline-flex items-center gap-2 text-indigo-500 font-black tracking-widest uppercase text-xs">
                            <Settings size={16} /> 02. The Eligibility
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            컨텍스트 타입 <br />
                            <span className="text-indigo-500">(Context Type)</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                            설정 화면에서 '프로젝트'와 같이 특별한 관리가 필요한 타입을 지정할 수 있습니다.
                            여기에 등록된 타입들은 갈피 시스템의 <b>지능형 자동화 자격</b>을 얻으며, 단순한 태그를 넘어 실시간 작업 환경의 일부로 격상됩니다.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Layout size={16} />
                            <span>설정 &gt; 태그 &gt; 컨텍스트 타입 에서 관리</span>
                        </div>
                    </div>
                </section>

                {/* Step 3: Context Stamp */}
                <section className="bg-indigo-600 text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-400/20 to-transparent" />

                    <div className="flex flex-col gap-12 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 text-indigo-200 font-black tracking-widest uppercase text-xs">
                                    <Target size={16} /> 03. The Activation
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                                    컨텍스트 스탬프 <br />
                                    <span className="text-indigo-200 italic font-light italic">Context Stamp</span>
                                </h2>
                                <p className="text-lg text-indigo-100 leading-relaxed font-light">
                                    검색창 우측에 고정되는 <b>스탬프(Stamp)</b>는 현재 당신의 작업 맥락을 의미합니다.
                                    한 번 찍힌 스탬프는 당신의 모든 캡처 활동에 조용히 개입하여 입력을 대신합니다.
                                </p>
                            </div>
                            <ul className="grid sm:grid-cols-1 gap-6">
                                <li className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-900/40">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">자동 주입 (Auto-Injection)</h4>
                                        <p className="text-indigo-100/70 text-sm">새 정보를 캡처할 때, 활성화된 스탬프가 자동으로 태그로 기록됩니다.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-900/40">
                                        <MousePointer2 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl">제로 타이핑 (Zero Typing)</h4>
                                        <p className="text-indigo-100/70 text-sm">스탬프가 찍혀 있다면, 리스트의 항목을 클릭 한 번으로 일괄 분류할 수 있습니다.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="relative w-full mt-4 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center shadow-inner overflow-hidden group">
                            <img
                                src="/assets/images/context_stamp.png"
                                alt="Context Stamp in Search"
                                className="w-full h-auto object-contain rounded-[2.3rem] transition-transform duration-700 group-hover:scale-[1.01]"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.3rem]" />
                        </div>
                    </div>
                </section>

                {/* Recap */}
                <footer className="text-center space-y-8 pt-20 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.2]">
                        "정의된 타입(Type)이<br className="md:hidden" /> 현재의 스탬프(Stamp)가 되어<br className="md:hidden" /> 데이터와 만납니다."
                    </p>
                    <div className="flex justify-center gap-8 text-xs font-mono text-slate-400 tracking-widest uppercase">
                        <span>Rule</span>
                        <span className="text-slate-200 dark:text-slate-800">/</span>
                        <span>Eligibility</span>
                        <span className="text-slate-200 dark:text-slate-800">/</span>
                        <span>State</span>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default ContextTags;
