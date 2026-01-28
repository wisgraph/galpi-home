import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, GitBranch, ArrowRight, Anchor, Layers } from 'lucide-react';

const KnowledgeWorkflow: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-teal-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-white to-slate-50 dark:from-teal-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <BrainCircuit size={12} />
                            지식 운영 체제
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            양방향 연결의 진화
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "링크를 넘어,<br className="hidden md:block" /> 당신의 디지털 작업실(Context)을 소환하세요."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro */}
                <section className="text-center max-w-2xl mx-auto">
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Hookmark가 파일과 파일 사이의 '길'을 만들었다면, <strong>HookLink</strong>는 그 길을 통해 당신의 모든 지식 파편들이 유기적으로 움직이는 '스마트한 작업 생태계'를 구축합니다.
                    </p>
                </section>

                {/* Section 1: Context Fixing */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                            <Anchor size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">지식의 단절을 해결하는 '맥락의 고정'</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            나중에 링크를 찾아도 "내가 이걸 왜 저장했지?"라고 되묻곤 합니다. HookLink는 캡처의 순간, 그 맥락(Context)을 함께 박제합니다.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs">A</span>
                                <span>컨텍스트 태그 활성화 (#project:A)</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs">B</span>
                                <span>그냥 캡처 (분류 고민 X)</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <span className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs">✓</span>
                                <span className="font-bold text-teal-600 dark:text-teal-400">자동으로 맥락 박제 및 분류 완료</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 relative min-h-[300px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                        {/* Abstract Visual */}
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-bold shadow-lg shadow-teal-500/30">
                                Context: #Project_A
                            </div>
                            <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-700" />
                            <div className="flex gap-2">
                                <div className="p-3 bg-white dark:bg-black rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse">file_1.pdf</div>
                                <div className="p-3 bg-white dark:bg-black rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse delay-75">link_2.url</div>
                                <div className="p-3 bg-white dark:bg-black rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse delay-150">note_3.md</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Digital Desk */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Layers size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">생각의 속도로 전환하는 '디지털 데스크'</h2>
                    </div>

                    <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/50 to-transparent" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">즉각적인 전환 (Instant Switching)</h3>
                                <p className="text-slate-300 leading-relaxed mb-8">
                                    오후 업무 시작 전, 검색창에 <code className="bg-white/20 px-1 rounded">#project:B</code>를 입력하세요.<br /><br />
                                    그 즉시 당신의 화면은 프로젝트 B와 관련된 피그마, 노션, 슬랙 대화로 재구성됩니다. 오전 업무의 잔상을 지우는 데 <strong>단 1초</strong>면 충분합니다.
                                </p>
                            </div>
                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center font-bold">A</div>
                                    <div className="flex-1">
                                        <div className="text-slate-400 text-xs">Previous Context</div>
                                        <div className="font-bold">Project Alpha</div>
                                    </div>
                                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                                </div>
                                <div className="flex justify-center text-slate-500"><ArrowRight className="rotate-90 md:rotate-0" /></div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-600 border border-indigo-400 shadow-xl shadow-indigo-500/20 cursor-pointer">
                                    <div className="w-8 h-8 rounded bg-white text-indigo-600 flex items-center justify-center font-bold">B</div>
                                    <div className="flex-1">
                                        <div className="text-indigo-200 text-xs">Active Context</div>
                                        <div className="font-bold text-white">Project Beta</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Bidirectional Loop */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">완벽한 루프 (The Perfect Loop)</h2>

                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-200 via-indigo-200 to-teal-200 dark:from-teal-900 dark:via-indigo-900 dark:to-teal-900 -z-10" />

                        <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                            <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 mb-4 font-black">1</div>
                            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">수집 (Capture)</h3>
                            <p className="text-sm text-slate-500">웹과 앱의 파편을 <br />컨텍스트와 함께 수집</p>
                        </div>
                        <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                            <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 mb-4 font-black">2</div>
                            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">정리 (Organize)</h3>
                            <p className="text-sm text-slate-500">지능형 자동완성과 <br />타입드 태그로 의미 부여</p>
                        </div>
                        <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                            <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 mb-4 font-black">3</div>
                            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">이동 (Jump)</h3>
                            <p className="text-sm text-slate-500">원본 파편의 위치로 <br />즉시 되돌아가기</p>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "단순한 링크 수집가가 아닌,<br /> 지능적인 지식 설계자가 되세요."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default KnowledgeWorkflow;
