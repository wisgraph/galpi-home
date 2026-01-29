import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Lock, Database } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';

const PrivacyPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950 min-h-screen"
        >
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-violet-100 dark:bg-violet-900/10 blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative max-w-4xl">
                    <ScrollReveal>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-violet-600 rounded-2xl text-white">
                                <ShieldCheck size={32} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight">개인정보처리방침</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-12 font-light">마지막 수정일: 2026년 1월 29일</p>

                        <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                            {/* 핵심 원칙 */}
                            <div className="p-8 bg-violet-600 text-white rounded-[2.5rem] shadow-2xl shadow-violet-600/20">
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                                    <EyeOff size={24} /> 한 줄 요약: 저희는 여러분을 감시하지 않습니다.
                                </h2>
                                <p className="text-violet-100 leading-relaxed">
                                    갈피는 사용자의 소중한 데이터와 개인정보를 탐내지 않습니다. 모든 데이터 처리는 오직 귀하의 맥(Mac) 안에서만 이루어지며, 외부 서버로 전송되지 않습니다.
                                </p>
                            </div>

                            {/* 상세 내용 */}
                            <section className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4 p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
                                        <Lock size={24} className="text-violet-500" />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">수집하지 않는 항목</h3>
                                        <ul className="text-sm space-y-2 opacity-80">
                                            <li>- 등록된 파일명 및 경로</li>
                                            <li>- 사용자의 검색 쿼리 및 태그 정보</li>
                                            <li>- 웹 브라우징 기록 및 스크랩된 내용</li>
                                            <li>- 어플리케이션 사용 통계</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4 p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
                                        <Database size={24} className="text-violet-500" />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">데이터 저장 방식</h3>
                                        <p className="text-sm">
                                            모든 인덱스 정보는 로컬 드라이브의 사용자 문서 폴더 내 <code>.jsonl</code> 형식으로 투명하게 저장됩니다. 사용자는 언제든 이 데이터를 직접 눈으로 확인하고 이동하거나 삭제할 수 있습니다.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">결제 및 라이선스 검증</h2>
                                <p>
                                    라이선스 구매 시 입력한 이메일 주소는 오직 구매 확인 및 라이선스 키 발송, 그리고 중복 실행 방지를 위한 최소한의 인증 용도로만 사용됩니다. 결제 정보(카드 번호 등)는 암호화되어 안전한 결제 대행사(PG사)를 통해서만 처리되며, 저희는 이를 보관하지 않습니다.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">정보의 파기</h2>
                                <p>
                                    사용자가 라이선스 해지를 요청하거나 서비스 이용을 중단할 경우, 수집된 최소한의 계정 정보는 관련 법령에 따라 일정 기간 보관 후 지체 없이 파기합니다.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">문의처</h2>
                                <p>
                                    개인정보와 관련하여 불안한 점이 있거나 권리 행사를 원하시는 경우, 언제든 아래 연락처로 말씀해 주십시오.<br />
                                    이메일: wisgraph.license@gmail.com
                                </p>
                            </section>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default PrivacyPage;
