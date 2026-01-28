import React from 'react';
import { motion } from 'framer-motion';
import { Database, Lock, RefreshCw, FileJson, Cloud, CheckCircle, Copy, FileText } from 'lucide-react';

const DataSync: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-cyan-500/30">
            {/* Header */}
            <header className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-white to-slate-50 dark:from-cyan-950/20 dark:via-black dark:to-black z-0" />
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <FileJson size={12} />
                            개방형 데이터 아키텍처
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            투명한 텍스트 저장소
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            "블랙박스 DB에서 탈출하세요.<br className="hidden md:block" /> 당신의 데이터는 당신이 읽을 수 있어야 합니다."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro */}
                <section className="text-center max-w-2xl mx-auto">
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        HookLink는 사용자 데이터를 암호화된 바이너리 파일(SQLite 등)에 가두지 않습니다.
                        우리는 <strong>JSONL (Line-delimited JSON)</strong> 형식을 채택하여 진정한 데이터 소유권을 보장합니다.
                        메모장으로 열어보고, 스크립트로 가공하고, 자유롭게 복제하세요.
                    </p>
                </section>

                {/* Open Data & JSONL */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <FileText size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">완전한 개방성</h2>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl font-mono text-xs md:text-sm text-slate-300 overflow-x-auto mb-8">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                            <div className="text-slate-500">hooks.jsonl</div>
                            <div className="text-cyan-400 text-xs flex items-center gap-1"><CheckCircle size={10} /> Human Readable</div>
                        </div>
                        <div className="space-y-2 opacity-80">
                            <div>{`{"uuid":"a1b2","title":"Report.pdf","path":"/Doc/..","tags":["#work"],"updated_at":"..."}`}</div>
                            <div>{`{"uuid":"c3d4","title":"DesignRef","url":"https://..","tags":["#idea"],"updated_at":"..."}`}</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <Copy className="text-cyan-500" size={20} />
                                자유로운 복제 및 가공
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                데이터는 평범한 텍스트 파일입니다. 언제든지 파이썬 스크립트로 통계를 내거나, 다른 포맷으로 변환하거나, 백업할 수 있습니다. 벤더 락인(Lock-in)은 존재하지 않습니다.
                            </p>
                        </div>
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <Database className="text-cyan-500" size={20} />
                                손상 없는 구조
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                파일의 일부가 깨져도 해당 줄만 무시하면 됩니다. SQLite처럼 파일 전체가 열리지 않는 재앙은 발생하지 않습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Safe Sync & Conflict Resolution */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Cloud size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">충돌 없는 클라우드 동기화</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                        <div className="space-y-6">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Dropbox, iCloud, Google Drive 어디에 저장하든 상관없습니다. 여러 기기에서 동시에 수정해 <code>(conflicted copy)</code> 파일이 생겨도 HookLink는 안전하게 처리합니다.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">1</div>
                                    <span className="text-slate-700 dark:text-slate-300">충돌 파일 자동 감지 및 로드</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">2</div>
                                    <span className="text-slate-700 dark:text-slate-300">데이터 병합 (Latest Wins: 최신 수정본 채택)</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center font-bold text-indigo-600">3</div>
                                    <span className="text-slate-700 dark:text-slate-300 font-bold">데이터 유실 0% 달성</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center">
                            <RefreshCw className="w-12 h-12 text-indigo-500 mx-auto mb-4 animate-spin-slow" />
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Auto-Merge Engine</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                사용자는 기술적인 문제를 신경 쓸 필요가 없습니다.<br />그냥 여러 대의 맥에서 자유롭게 쓰세요.
                            </p>
                        </div>
                    </div>
                </section>

                {/* File Locking */}
                <section className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black shrink-0">
                            <Lock size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">안전한 파일 락 (File Locking)</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                한 컴퓨터에서 여러 개의 HookLink 창을 띄워도 데이터가 꼬이지 않습니다. Rust의 시스템 레벨 <code>File Lock</code> 기술을 사용하여, 한 번에 하나의 프로세스만 파일에 쓸 수 있도록 강력하게 제어합니다.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 font-medium">
                                <CheckCircle size={16} className="text-emerald-500" />
                                <span>Multi-Process Safety Guaranteed</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "HookLink는 당신의 데이터 주권을 존중합니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default DataSync;
