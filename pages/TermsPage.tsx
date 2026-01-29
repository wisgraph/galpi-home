import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';

const TermsPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950 min-h-screen"
        >
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-slate-100 dark:bg-slate-900/20 blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative max-w-4xl">
                    <ScrollReveal>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-slate-900 dark:bg-white rounded-2xl text-white dark:text-slate-900">
                                <Scale size={32} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight">서비스 이용약관</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-12 font-light">마지막 수정일: 2026년 1월 29일</p>

                        <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                            {/* 제1조 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="text-slate-400">01.</span> 목적
                                </h2>
                                <p>
                                    본 약관은 위스그래프(이하 "회사")가 제공하는 어플리케이션 '갈피(galpi)'(이하 "서비스")의 이용 조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
                                </p>
                            </section>

                            {/* 제2조 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="text-slate-400">02.</span> 서비스의 정의 및 특징
                                </h2>
                                <p>
                                    갈피는 사용자의 로컬 환경(macOS) 내 파일 및 웹페이지 링크를 관리하고 검색하는 '로컬 우선(Local-First)' 생산성 도구입니다. 모든 데이터는 사용자의 기기에 저장되며, 회사는 사용자의 데이터를 중앙 서버로 수집하거나 저장하지 않습니다.
                                </p>
                            </section>

                            {/* 제3조 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="text-slate-400">03.</span> 라이선스 및 소유권
                                </h2>
                                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 space-y-4">
                                    <p>
                                        1. 사용자가 구매한 라이선스는 서비스의 영구 소유권을 의미하지 않으며, 약정된 기간 또는 조건 하에 서비스를 이용할 수 있는 권한을 부여하는 것입니다.
                                    </p>
                                    <p>
                                        2. 1개의 라이선스 키는 원칙적으로 1명의 사용자가 소유한 기기에 한하여 등록 및 사용 가능합니다.
                                    </p>
                                </div>
                            </section>

                            {/* 제4조 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="text-slate-400">04.</span> 환불 정책
                                </h2>
                                <p>
                                    갈피는 '묻지도 따지지도 않는 7일 환불' 정책을 지향합니다. 구매 후 7일 이내에 support@galpi.app으로 환불을 요청할 경우, 사용 이유와 관계없이 전액 환불을 진행합니다. 단, 환불 처리 후 라이선스 키는 즉시 무효화됩니다.
                                </p>
                            </section>

                            {/* 제5조 */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="text-slate-400">05.</span> 책임의 제한
                                </h2>
                                <div className="flex gap-4 p-6 bg-rose-50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/20 rounded-3xl text-rose-900 dark:text-rose-200">
                                    <AlertCircle className="shrink-0" />
                                    <p className="text-sm">
                                        갈피는 사용자의 데이터 손실, 파일 시스템 오류, 또는 제3자 어플리케이션과의 충돌로 발생하는 결과에 대해 어떠한 법적 책임도 지지 않습니다. 데이터의 백업 및 관리는 전적으로 사용자의 책임입니다.
                                    </p>
                                </div>
                            </section>

                            {/* Footer */}
                            <div className="pt-16 border-t border-slate-100 dark:border-slate-800 text-center">
                                <p className="text-slate-400 text-sm">갈피와 함께 더 나은 지식 워크플로우를 만들어가시길 바랍니다.</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default TermsPage;
