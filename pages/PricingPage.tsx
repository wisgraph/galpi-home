import React from 'react';
import { motion } from 'framer-motion';
import {
    Check,
    X,
    Shield,
    Zap,
    CreditCard,
    Gift,
    ArrowRight,
    Coffee,
} from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';

const comparisonFeatures = [
    { feature: '핵심 기술', competitor: 'Raw AppleScript (느림)', galpi: 'Accessibility API + Low-level Script', note: '30ms vs 1,000ms+ (압도적 속도)' },
    { feature: '반응 속도', competitor: '클릭 후 딜레이 발생 (Laggy)', galpi: '0.03초 (30ms) 즉시 반응', note: '뇌의 속도를 따라잡음' },
    { feature: '메모리 점유', competitor: '500MB → 12GB+ (Memory Leak)', galpi: '평균 300MB (고정/안정적)', note: '새지 않는 안정성 (Rust Core)' },
    { feature: '연결 방식', competitor: '1:1 수동 연결 (노가다 방식)', galpi: '맥락 기반 자동 제안 (Set Theory)', note: '수동 작업 vs 자동화된 프레임워크' },
    { feature: '데이터 주권', competitor: '불투명한 DB (Black Box)', galpi: 'JSONL 텍스트 (Open Data)', note: '내 데이터는 온전히 나의 것' },
    { feature: '가격 정책', competitor: '매년 $70 (구독형 모델)', galpi: '$4.99 (얼리버드 평생 소장)', note: '구독료 0원' },
];

const pricingPlans = [
    {
        name: 'Starter',
        subtitle: 'Free Forever',
        price: '$0',
        description: '부담 없이 시작하세요',
        features: [
            { text: '모든 기능 체험 가능', included: true },
            { text: '최대 50개 링크 생성', included: true },
            { text: '50개 이하 읽기/검색/실행 평생 무제한', included: true, highlight: true },
            { text: '데이터 로컬 저장', included: true },
            { text: '링크 생성 무제한', included: false },
            { text: '우선 기술 지원', included: false },
        ],
        cta: '무료 다운로드',
        ctaLink: '#download',
        highlighted: false
    },
    {
        name: 'Pro Lifetime',
        subtitle: 'Early Bird Special',
        price: '$4.99',
        originalPrice: '$14.99',
        description: '커피 한 잔 값으로 평생 소장',
        badge: '🔥 선착순 100명',
        features: [
            { text: '모든 기능 무제한', included: true },
            { text: '링크 생성 무제한', included: true, highlight: true },
            { text: '읽기/검색/실행 평생 무제한', included: true },
            { text: '데이터 로컬 저장', included: true },
            { text: '평생 무료 업데이트', included: true },
            { text: '우선 기술 지원', included: true },
        ],
        cta: '얼리버드 구매하기',
        ctaLink: '#purchase',
        highlighted: true
    }
];

const trustBadges = [
    { icon: Shield, text: '7일 묻지마 환불 보장', subtext: '마음에 안 들면 메일 한 통 주세요' },
    { icon: Zap, text: 'No Vendor Lock-in', subtext: '앱을 지워도 데이터는 텍스트 파일로 남습니다' },
    { icon: CreditCard, text: 'Secure Payment', subtext: 'Lemon Squeezy로 안전한 결제' },
];

const PricingPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950"
        >
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-white to-white dark:from-amber-900/20 dark:via-slate-950 dark:to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-300/30 to-orange-300/30 dark:from-amber-500/20 dark:to-orange-500/20 rounded-full blur-3xl opacity-30" />

                <div className="container mx-auto px-6 relative">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center">


                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                <span className="text-slate-900 dark:text-white">길을 찾는 데 쓰는 <span className="text-amber-600 dark:text-amber-400 italic underline decoration-amber-500/30">20분</span>,</span>
                                <br />
                                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                                    이제 당신의 '진짜 일'에 투자하세요.
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                도구는 빌리는 게 아니라 소장하는 것입니다.
                                <br />
                                <span className="text-slate-500">No Subscriptions. Buy Once, Own Forever.</span>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {pricingPlans.map((plan, index) => (
                                <ScrollReveal key={plan.name} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        className={`relative rounded-3xl p-8 h-full ${plan.highlighted
                                            ? 'bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/5 border-2 border-amber-300 dark:border-amber-500/30'
                                            : 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700'
                                            }`}
                                    >
                                        {plan.badge && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-sm font-semibold">
                                                {plan.badge}
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{plan.subtitle}</p>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                                            <div className="flex items-baseline gap-2">
                                                {plan.originalPrice && (
                                                    <span className="text-lg text-slate-400 dark:text-slate-500 line-through">{plan.originalPrice}</span>
                                                )}
                                                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                                                    {plan.price}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 mt-2">{plan.description}</p>
                                        </div>

                                        <ul className="space-y-4 mb-8">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    {feature.included ? (
                                                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.highlight ? 'text-amber-500' : 'text-emerald-500'}`} />
                                                    ) : (
                                                        <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-400 dark:text-slate-600" />
                                                    )}
                                                    <span className={feature.included ? (feature.highlight ? 'text-amber-700 dark:text-amber-300' : 'text-slate-700 dark:text-slate-300') : 'text-slate-400 dark:text-slate-500'}>
                                                        {feature.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <motion.a
                                            href={plan.ctaLink}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`block w-full py-4 rounded-xl font-semibold text-center transition-all ${plan.highlighted
                                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40'
                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                                                }`}
                                        >
                                            {plan.cta}
                                        </motion.a>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-12 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-6">
                            {trustBadges.map((badge, index) => (
                                <ScrollReveal key={index} delay={index * 0.1}>
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
                                        <badge.icon className="w-6 h-6 text-amber-500 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{badge.text}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{badge.subtext}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">왜 갈피인가?</h2>
                                <p className="text-slate-600 dark:text-slate-400">1세대 그래프 도구와의 비교</p>
                            </div>

                            <div className="overflow-x-auto bg-white dark:bg-transparent rounded-2xl border border-slate-200 dark:border-transparent">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-700">
                                            <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-medium">비교 항목</th>
                                            <th className="text-left py-4 px-4 text-rose-600 dark:text-red-400 font-medium">기존 도구</th>
                                            <th className="text-left py-4 px-4 text-emerald-600 dark:text-green-400 font-medium">갈피</th>
                                            <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-medium">비고</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonFeatures.map((row, i) => (
                                            <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                                                <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">{row.feature}</td>
                                                <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{row.competitor}</td>
                                                <td className="py-4 px-4 text-emerald-700 dark:text-green-300">{row.galpi}</td>
                                                <td className="py-4 px-4 text-amber-600 dark:text-amber-400 text-sm">{row.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-20 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-3xl mx-auto text-center">
                            <Gift className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                "왜 구독을 받지 않나요?"
                            </h2>
                            <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                                <p>
                                    우리는 <span className="text-slate-900 dark:text-white font-medium">서버 비용이 '0원'인 구조</span>를 만들었습니다.
                                </p>
                                <p>
                                    대부분의 앱이 구독을 받는 이유는 클라우드 서버 유지비 때문입니다.
                                    하지만 갈피는 모든 데이터를 <span className="text-amber-600 dark:text-amber-400">당신의 컴퓨터(Local)</span>에서 처리합니다.
                                </p>
                                <p>
                                    우리에겐 매달 나가는 고정비가 없습니다.
                                    따라서 한 번의 판매로도 충분히 지속 가능한 비즈니스 모델입니다.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-100 to-transparent dark:from-amber-900/20 dark:to-transparent" />

                <div className="container mx-auto px-6 relative">
                    <ScrollReveal>
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                더 빠르고, 더 안전하고, 더 합리적입니다
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                                망설일 이유가 있나요?
                            </p>
                            <motion.a
                                href="#purchase"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-semibold text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow"
                            >
                                갈피로 갈아타기 ($4.99)
                                <ArrowRight className="w-5 h-5" />
                            </motion.a>
                            <p className="text-sm text-slate-500 mt-4">
                                기존 훅마크 사용자 환영 | 데이터 마이그레이션 지원(예정)
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default PricingPage;
