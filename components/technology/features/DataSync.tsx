import React from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Unlock, Code2, AlertTriangle, CheckCircle } from 'lucide-react';

const DataSync: React.FC = () => {
    return (
        <div className="min-h-full font-sans selection:bg-cyan-500/30">
            {/* Header */}
            <header className="relative py-24 px-8 md:px-16 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-white dark:from-cyan-950/20 dark:via-slate-950 dark:to-slate-950 z-0" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-black uppercase tracking-widest mb-8">
                            <Shield size={14} />
                            No Vendor Lock-in Philosophy
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                            우리는 데이터를 <br />
                            <span className="text-cyan-600 dark:text-cyan-500 italic uppercase underline decoration-cyan-500/20">암호화하지 않습니다.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-3xl">
                            "가장 안전한 금고는, <b>투명한 금고</b>입니다."
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-5xl px-8 md:px-16 py-32 space-y-32">
                {/* Section 1: Data sovereignty */}
                <section className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                            당신의 데이터는 <br />
                            <span className="text-cyan-500 italic uppercase">인질이 아닙니다.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                            <p>
                                대부분의 앱은 데이터를 꽁꽁 숨깁니다. 그래야 사용자가 도망가지 못하니까요.
                                그들은 알 수 없는 바이너리(Binary) 파일 뒤에 당신의 인생을 가둡니다.
                            </p>
                            <p className="font-bold text-slate-900 dark:text-white bg-cyan-50 dark:bg-cyan-950/20 py-2 px-4 rounded-xl border-l-4 border-cyan-500">
                                갈피는 정반대입니다. 우리는 당신이 언제든 떠날 수 있도록 문을 활짝 열어두었습니다.
                            </p>
                        </div>
                    </div>

                    <div className="relative p-1 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-[2.5rem]">
                        <div className="bg-slate-900 rounded-[2.4rem] p-8 font-mono text-xs md:text-sm text-slate-300 relative border border-white/10 shadow-3xl group">
                            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.4rem]" />
                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4 relative z-10">
                                <div className="text-slate-500 uppercase tracking-widest text-[10px]">~/Documents/갈피/data.jsonl</div>
                                <div className="text-cyan-400 text-[10px] font-black uppercase flex items-center gap-1.5"><Unlock size={12} /> Human Readable</div>
                            </div>
                            <div className="space-y-4 relative z-10">
                                <div className="text-emerald-400">
                                    <span className="text-slate-600 italic">{"// 파일이 깨져도 괜찮습니다. 한 줄만 건너뛰세요."}</span><br />
                                    {`{"id":"f81d","title":"Deep_Tech_Spec.pdf","tags":["#rust"]}`}
                                </div>
                                <div className="text-cyan-400">
                                    {`{"id":"29ea","title":"Product_Manifesto.md","tags":["#galpi"]}`}
                                </div>
                                <div className="text-slate-700 italic text-[10px]">
                                    ... 10,000+ more visible lines
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Technical Truth */}
                <section className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Code2,
                            title: "Scriptable",
                            desc: "메모장으로 여세요. 파이썬 스크립트 한 줄이면 당신만의 통계 데이터를 직접 추출할 수 있습니다."
                        },
                        {
                            icon: AlertTriangle,
                            title: "Crash Proof",
                            desc: "바이너리 DB(SQLite)는 하나만 꼬여도 전체가 먹통이 되지만, 갈피는 깨진 줄만 버리고 99%를 살려냅니다."
                        },
                        {
                            icon: CheckCircle,
                            title: "Zero Analytics",
                            desc: "서버는 당신의 파일명을 알 필요가 없습니다. 모든 처리는 당신의 드라이브에서만 일어납니다."
                        }
                    ].map((item, i) => (
                        <div key={i} className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm border-b-8 border-b-cyan-500/30 hover:border-b-cyan-500 transition-all">
                            <item.icon className="w-12 h-12 text-cyan-500 mb-8" />
                            <h3 className="text-xl font-black mb-4 text-slate-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Closing */}
                <div className="text-center pt-20 border-t border-slate-100 dark:border-slate-800 lg:px-20">
                    <p className="text-2xl md:text-3xl font-black italic text-slate-900 dark:text-white mb-8 leading-tight">
                        "진정한 자유는 데이터를 직접 <br className="hidden md:block" /> 통제할 수 있을 때 시작됩니다."
                    </p>
                    <div className="inline-flex items-center gap-2 text-slate-400 font-mono text-[10px] tracking-[0.3em] uppercase">
                        <span className="w-12 h-px bg-slate-300 dark:bg-slate-800" />
                        Galpi Manifesto: Chapter 05
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DataSync;
