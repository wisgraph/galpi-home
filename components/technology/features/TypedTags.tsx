import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Edit3, Palette, LayoutGrid, Hash } from 'lucide-react';

const TypedTags: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-rose-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-slate-50 dark:from-rose-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-1/2 left-0 w-[400px] h-[800px] bg-rose-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Tag size={12} />
                            Automation First
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            태그 관리가 <br className="md:hidden" />
                            <span className="text-rose-600 dark:text-rose-400 italic">'노동'</span>이 되어서는 안 됩니다.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            입력은 줄이고, 구조는 단단하게. <br className="hidden md:block" />
                            당신이 타이핑하는 그 순간, 이미 구조화를 끝마칩니다.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Concept */}
                <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">입력과 동시에 학습됩니다.</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                설정을 위해 메뉴를 뒤지지 마세요. 검색창에 <code>#platform:ios</code>라고 입력하는 순간, 시스템은 <code>platform</code>이라는 타입을 즉시 학습하고 등록합니다.
                            </p>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-400 w-24 text-right">Standard</span>
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">#design</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-rose-500 font-bold w-24 text-right">Typed</span>
                                    <span className="px-2 py-1 bg-rose-100 dark:bg-rose-900/20 rounded text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">#project:galpi</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-100 dark:bg-black/50 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                            <div className="relative z-10 space-y-4 w-full max-w-sm">
                                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-blue-500 rounded-full" />
                                    <div>
                                        <div className="text-xs text-slate-400 font-bold uppercase">Project</div>
                                        <div className="font-mono text-slate-900 dark:text-white">#project:antigravity</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-green-500 rounded-full" />
                                    <div>
                                        <div className="text-xs text-slate-400 font-bold uppercase">Status</div>
                                        <div className="font-mono text-slate-900 dark:text-white">#status:doing</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <LayoutGrid size={20} />
                        </div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">스마트 프리셋 (Preset)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            콜론(<code>:</code>)을 누르면, 갈피가 당신의 패턴을 분석해 다음 값을 제안합니다. 타이핑을 멈추고 선택만 하세요.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <Palette size={20} />
                        </div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">시각적 우선순위</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            <code>#status:done</code>은 무채색으로, <code>#priority:high</code>는 붉은색으로. 정보의 경중을 색상으로 즉시 판단하세요.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <Hash size={20} />
                        </div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">암시적 구조 (Implicit)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            태그를 다는 순간이 곧 데이터베이스를 설계하는 순간입니다. 별도의 설정 화면은 필요하지 않습니다.
                        </p>
                    </div>
                </section>

                {/* Use Cases List */}
                <section>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">지능형 제안 예시 (Smart Suggest)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="px-2 py-1 bg-blue-100 text-blue-700 font-mono text-sm rounded border border-blue-200 font-bold min-w-[100px] text-center">#status:</div>
                            <span className="text-slate-600 dark:text-slate-400 text-sm">→ done, doing, todo (자동 제안)</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="px-2 py-1 bg-red-100 text-red-700 font-mono text-sm rounded border border-red-200 font-bold min-w-[100px] text-center">#priority:</div>
                            <span className="text-slate-600 dark:text-slate-400 text-sm">→ High(Red), Low(Green)</span>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "단순히 찾는 도구가 아닙니다. <br />데이터의 맥락을 읽는 도구입니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default TypedTags;
