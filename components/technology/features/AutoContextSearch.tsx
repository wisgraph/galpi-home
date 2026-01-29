import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Cpu, Brain, Repeat, Settings2, Sparkles, MousePointer2, Keyboard } from 'lucide-react';

const AutoContextSearch: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-purple-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-slate-50 dark:from-purple-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={12} />
                            Flow Preservation
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            마우스 없는 세상 <br className="md:hidden" />
                            <span className="text-purple-600 dark:text-purple-400 italic">(Keyboard Only)</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            마우스에 손을 올리지 마세요. <br className="hidden md:block" />
                            흐름(Flow)을 깨지 않는 극단적인 키보드 온리 철학.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Core Concept */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">몰입을 위한 1초의 사수</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                            작업 도중 마우스로 손이 가는 1초, 그 찰나에 몰입은 깨집니다. 갈피는 <strong>키보드 위에서 모든 것이 끝나도록</strong> 설계되었습니다.
                            검색, 태그 추가, 파일 실행, 링크 복사까지. 방향키와 <code>Tab</code>, <code>Enter</code>면 충분합니다.
                        </p>
                        <div className="p-5 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-900/30 flex items-start gap-4">
                            <MousePointer2 className="text-rose-500 shrink-0 mt-1 rotate-12" size={24} />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">마우스는 '최후의 수단'입니다.</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    우리는 마우스를 사용하는 것이 인터페이스의 실패라고 믿습니다. 당신의 손이 키보드에 머무는 시간이 길어질수록, 생산성은 기하급수적으로 올라갑니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 relative">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800">
                                <Keyboard className="text-purple-500" size={20} />
                                <div className="flex-1">
                                    <div className="text-[10px] text-slate-400 uppercase tracking-widest">Everything within Reach</div>
                                    <div className="text-xs font-bold text-slate-700 dark:text-white">No Mouse Required</div>
                                </div>
                            </div>

                            <div className="flex justify-center py-2 text-purple-500 animate-pulse">
                                <Zap size={20} />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 border-dashed text-center">
                                    <div className="text-[10px] text-purple-400 font-black uppercase mb-1">Tab</div>
                                    <div className="text-[10px] text-slate-500">Navigate</div>
                                </div>
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 border-dashed text-center">
                                    <div className="text-[10px] text-purple-400 font-black uppercase mb-1">Enter</div>
                                    <div className="text-[10px] text-slate-500">Execute</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Automation Integration */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <Brain size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">지능형 맥락 감지 (Smart Context)</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">과거의 작업실을 0.5초 만에 복원</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                현재 보고 있는 문서를 여는 순간, 갈피는 그 안에 담긴 맥락을 즉시 감지합니다. 이전에 같이 보았던 웹사이트, 참고했던 PDF들이 검색창에 자동으로 리스트업됩니다. <strong>"저번에 뭐 봤더라?"</strong> 고민하는 낭비를 멈추세요.
                            </p>
                        </div>
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 text-indigo-500">
                                <Settings2 size={24} />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">커스텀 맥락 정의</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                <code>#project</code> 외에도 당신이 정의한 <code>#area</code>, <code>#topic</code> 등 모든 태그 키가 맥락의 기준이 됩니다. 갈피는 당신의 사고 구조를 강제하지 않고, 그저 뒤따를 뿐입니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "단 1초도 낭비하지 마세요. 당신의 시간은 비쌉니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default AutoContextSearch;
