import React from 'react';
import { motion } from 'framer-motion';
import { Database, Lock, RefreshCw, FileJson, Cloud, CheckCircle, Copy, FileText, Shield } from 'lucide-react';

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
                            <Shield size={12} />
                            Data Sovereignty
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                            당신의 데이터는 <br className="md:hidden" />
                            <span className="text-cyan-600 dark:text-cyan-400 italic">투명한 금고</span>여야 합니다.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            블랙박스 DB(SQLite)에서 탈출하세요. <br className="hidden md:block" />
                            메모장으로 열어볼 수 있는 투명함이 갈피의 철학입니다.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-32 relative z-10 space-y-24">

                {/* Intro */}
                <section className="text-center max-w-2xl mx-auto">
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                        갈피는 사용자 데이터를 암호화된 바이너리 파일에 가두지 않습니다.
                        우리는 <strong>JSONL (Plain Text)</strong> 형식을 채택하여 진정한 데이터 소유권을 보장합니다.
                        앱이 사라져도, 서비스가 중단되어도 당신의 기록은 텍스트 파일로 영원히 남습니다.
                    </p>
                </section>

                {/* Open Data & JSONL */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                            <FileText size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">완전한 개방성 (Human Readable)</h2>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-6 md:p-10 shadow-3xl font-mono text-xs md:text-sm text-slate-300 overflow-x-auto mb-8 relative border border-white/10">
                        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                            <div className="text-slate-500 uppercase tracking-widest text-xs">~/Documents/갈피/data.jsonl</div>
                            <div className="text-cyan-400 text-[10px] font-black uppercase flex items-center gap-1.5"><CheckCircle size={10} /> Always Accessible</div>
                        </div>
                        <div className="space-y-3 opacity-90">
                            <div className="text-emerald-400">{`{"uuid":"a1b2","title":"Report.pdf","tags":["#work"],"inode":98765}`}</div>
                            <div className="text-cyan-400">{`{"uuid":"c3d4","title":"DesignRef","tags":["#idea"],"url":"https://.."}`}</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-lg">
                                <Copy className="text-cyan-500" size={24} />
                                벤더 락인 Zero
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                데이터는 평범한 텍스트입니다. 파이썬으로 가공하거나, 깃(Git)으로 버전 관리를 하거나, 다른 앱으로 옮기세요. 우리는 당신의 데이터를 인질로 잡지 않습니다.
                            </p>
                        </div>
                        <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-lg">
                                <Database className="text-cyan-500" size={24} />
                                자가 치유 구조
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                파일의 일부가 깨져도 한 줄만 건너뛰면 그만입니다. DB 엔진 전체가 망가져 데이터를 영영 잃어버리는 비극은 갈피에서 발생하지 않습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Safe Sync */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Cloud size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">로컬 퍼스트, 충돌 없는 동기화</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                        <div className="space-y-6">
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                iCloud, Dropbox, Google Drive 어디에 저장하든 상관없습니다. 여러 기기에서 동시에 수정해도 갈피는 <strong>'Latest Wins'</strong> 정책과 텍스트 기반 병합으로 데이터 유실을 0%로 철저히 막아냅니다.
                            </p>
                            <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                                <RefreshCw className="w-12 h-12 text-indigo-500 mx-auto mb-4 animate-spin-slow" />
                                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Auto-Merge Engine</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    사용자는 기술적 충돌을 신경 쓸 필요가 없습니다. <br />그냥 동기화 폴더에 넣고 평소처럼 쓰세요.
                                </p>
                            </div>
                        </div>
                        <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
                            <h4 className="font-bold dark:text-white">The Engineering Truth</h4>
                            <ul className="space-y-4">
                                {[
                                    '시스템 레벨 File Lock으로 다중 프로세스 수정 방지',
                                    '텍스트 기반 병합으로 Conflict 발생 시에도 데이터 보존',
                                    'Zero Telemetry: 검색어조차 서버로 전송하지 않습니다'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-400">
                                        <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-10 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 dark:text-slate-400">
                        "당신이 기록하는 모든 것의 주권은 당신에게 있습니다."
                    </p>
                </div>

            </main>
        </div>
    );
};

export default DataSync;
