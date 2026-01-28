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
                            구조화된 메타데이터
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            타입드 태그
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "단순 키워드를 넘어,<br className="hidden md:block" /> 데이터에 구조(Structure)를 부여하세요."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Concept */}
                <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">key:value</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                일반 태그가 단어의 나열이라면, Typed Tag는 <strong>타입(Type)</strong>과 <strong>값(Value)</strong>의 조합입니다. 프로그래밍 변수처럼 명확한 의미를 가집니다.
                            </p>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-400 w-24 text-right">Standard</span>
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">#design</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-rose-500 font-bold w-24 text-right">Typed</span>
                                    <span className="px-2 py-1 bg-rose-100 dark:bg-rose-900/20 rounded text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">#project:hooklink</span>
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
                            `#project:`, `#status:` 등 자주 쓰는 타입은 프리셋으로 제공됩니다. 콜론(:) 입력 시 값 서제스트가 자동으로 뜹니다.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <Palette size={20} />
                        </div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">커스텀 스타일링</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            타입별로 고유 색상을 지정할 수 있습니다. 예를 들어 `status`는 초록색, `priority`는 빨간색으로.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <Hash size={20} />
                        </div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">암시적 구조 (Implicit)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            새로운 타입 `platform:ios`를 입력하기만 하면, 시스템이 자동으로 새 타입을 인지하고 등록합니다. 설정 불필요.
                        </p>
                    </div>
                </section>

                {/* Use Cases List */}
                <section>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">프리셋 예시 (Examples)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="px-2 py-1 bg-blue-100 text-blue-700 font-mono text-sm rounded border border-blue-200 font-bold min-w-[100px] text-center">#project:</div>
                            <span className="text-slate-600 dark:text-slate-400 text-sm">업무 단위 (e.g. #project:hooklink)</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="px-2 py-1 bg-green-100 text-green-700 font-mono text-sm rounded border border-green-200 font-bold min-w-[100px] text-center">#status:</div>
                            <span className="text-slate-600 dark:text-slate-400 text-sm">진행 상태 (e.g. #status:done)</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="px-2 py-1 bg-red-100 text-red-700 font-mono text-sm rounded border border-red-200 font-bold min-w-[100px] text-center">#priority:</div>
                            <span className="text-slate-600 dark:text-slate-400 text-sm">우선순위 (e.g. #priority:high)</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="px-2 py-1 bg-amber-100 text-amber-700 font-mono text-sm rounded border border-amber-200 font-bold min-w-[100px] text-center">#date:</div>
                            <span className="text-slate-600 dark:text-slate-400 text-sm">마감일 (e.g. #date:2026-01-20)</span>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "단순히 찾는 것이 아니라, <br />데이터의 맥락을 읽을 수 있게 됩니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default TypedTags;
