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
    Vote,
    AlertTriangle,
    TrendingUp
} from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import FAQ from '../components/FAQ';


const pricingPlans = [
    {
        name: 'Starter',
        subtitle: 'Free Forever',
        price: '$0',
        description: '부담 없이 시작하세요',
        features: [
            { text: '모든 기능 체험 가능', included: true },
            { text: '최대 50개 링크 생성', included: true },
            { text: '50개 이하 리딩/검색 평생 무제한', included: true, highlight: true },
            { text: '데이터 로컬 저장', included: true },
            { text: '링크 생성 무제한', included: false },
            { text: '우선 기술 지원', included: false },
        ],
        cta: '무료 다운로드',
        ctaLink: 'https://github.com/wisgraph/galpi-release',
        highlighted: false
    },
    {
        name: 'Pro Lifetime',
        subtitle: 'Super Early Bird',
        price: '$4.99',
        originalPrice: '$19.99',
        description: '선착순 100명 한정 최저가',
        badge: '🔥 100명 한정',
        features: [
            { text: '모든 기능 무제한', included: true },
            { text: '링크 생성 무제한', included: true, highlight: true },
            { text: '읽기/검색/실행 평생 무제한', included: true },
            { text: '데이터 로컬 저장', included: true },
            { text: '평생 무료 업데이트 (100+ 앱)', included: true },
            { text: '우선 기술 지원', included: true },
        ],
        cta: 'Super Early Bird 구매',
        ctaLink: '#purchase',
        highlighted: true
    }
];

const priceRoadmap = [
    { phase: 'Phase 1', apps: '핵심 4개', price: '$4.99', status: '🔥 선착순 100명', current: true, note: '(Super Early Bird)' },
    { phase: 'Phase 2', apps: '핵심 4개', price: '$6.99', status: '101명부터', current: false, note: '(인원 마감 시)' },
    { phase: 'Phase 3', apps: '20개 확장', price: '$9.99', status: '업데이트 시', current: false, note: '' },
    { phase: 'Phase 4', apps: '50개 확장', price: '$14.99', status: '업데이트 시', current: false, note: '' },
    { phase: 'Phase 5', apps: '100개+ 완성', price: '$19.99', status: '정상가', current: false, note: '' },
];

const trustBadges = [
    { icon: Shield, text: '7일 묻지마 환불 보장', subtext: '마음에 안 들면 메일 한 통 주세요' },
    { icon: Zap, text: 'No Vendor Lock-in', subtext: '앱을 지워도 데이터는 텍스트로 남습니다' },
    { icon: CreditCard, text: 'Secure Payment', subtext: 'Lemon Squeezy 안전 결제' },
];

const PricingPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950 min-h-screen"
        >
            {/* Hero Section - Restored to Amber/Orange Theme with [투명한 경고] Wording */}
            <section className="relative py-24 md:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-white dark:from-amber-900/10 dark:via-slate-950 dark:to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-amber-300/30 to-orange-300/30 dark:from-amber-600/10 dark:to-orange-600/10 rounded-full blur-[120px] opacity-30" />

                <div className="container mx-auto px-6 relative">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center space-y-8">

                            <div className="space-y-4">
                                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-500 font-medium">
                                    (Finder, Chrome, Obsidian, Preview)
                                </p>
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
                                    <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent italic">
                                        지금 당장 100개의 앱 연동이 필요하신가요?
                                    </span>
                                </h1>
                            </div>

                            <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed space-y-4 font-light">
                                <p className="font-bold text-slate-900 dark:text-white">
                                    갈피는 이 4가지 앱에 최적화된 <span className="text-amber-600 dark:text-amber-400">속도와 깊이</span>를 제공합니다.
                                </p>
                                <p>
                                    앞으로 추가될 100개 이상의 앱 연동을 <strong className="text-slate-900 dark:text-white">가장 저렴한 가격에 평생 소장</strong>하고 싶다면, <br />
                                    <strong className="text-amber-600 dark:text-amber-400">지금이 마지막 기회입니다.</strong>
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Pricing Cards - Restoring GitHub Design Style with Amber/Orange Theme */}
            <section className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-amber-400/5 dark:bg-orange-900/5 blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-10">
                            {pricingPlans.map((plan, index) => (
                                <ScrollReveal key={plan.name} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className={`relative rounded-[2.5rem] p-10 h-full transition-all border-2 ${plan.highlighted
                                            ? 'bg-white dark:bg-slate-900 border-amber-400 shadow-[0_20px_60px_rgba(245,158,11,0.12)]'
                                            : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                                            }`}
                                    >
                                        {plan.badge && (
                                            <div className="absolute -top-4 right-10 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                                {plan.badge}
                                            </div>
                                        )}

                                        <div className="mb-10">
                                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                                                {plan.name}
                                            </h3>
                                            <div className="flex items-baseline gap-2">
                                                {plan.originalPrice && <span className="text-slate-400 line-through text-2xl font-light">{plan.originalPrice}</span>}
                                                <span className={`text-7xl font-black tracking-tighter italic ${plan.highlighted ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>
                                                    {plan.price}
                                                </span>
                                            </div>
                                            <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium italic">{plan.description}</p>
                                        </div>

                                        <ul className="space-y-4 mb-12 flex-grow">
                                            {plan.features.map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-4 text-slate-600 dark:text-slate-400">
                                                    {feature.included ? (
                                                        <Check size={18} className={feature.highlight ? 'text-amber-500' : 'text-emerald-500'} strokeWidth={3} />
                                                    ) : (
                                                        <X size={18} className="text-slate-300" strokeWidth={3} />
                                                    )}
                                                    <span className={`text-base leading-tight ${feature.highlight ? 'text-slate-900 dark:text-white font-bold' : ''}`}>
                                                        {feature.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <motion.a
                                            href={plan.ctaLink}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-5 rounded-2xl font-black text-xl text-center flex items-center justify-center gap-2 transition-all ${plan.highlighted
                                                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xl shadow-orange-600/30'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200'
                                                }`}
                                        >
                                            {plan.cta}
                                            <ArrowRight size={20} />
                                        </motion.a>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Price Roadmap - Restored to Amber/Orange Theme with [주식/우상향] Wording */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    <ScrollReveal>
                        <div className="text-center mb-16 space-y-4">
                            <div className="inline-flex items-center gap-2 text-orange-500 font-black uppercase text-sm tracking-widest mb-2">
                                <TrendingUp size={20} /> Price Appreciation
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">갈피의 가격은 '주식'처럼 우상향합니다.</h2>
                            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                우리는 지원 앱이 늘어날 때마다 가격을 현실화할 예정입니다. <br />
                                <strong>단, 이미 구매한 분들은 추가 비용 없이 평생 업데이트를 받습니다.</strong>
                            </p>
                        </div>
                    </ScrollReveal>
                    <div className="grid gap-4">
                        {priceRoadmap.map((item, i) => (
                            <div key={i} className={`flex flex-col md:flex-row items-center justify-between p-8 rounded-3xl border transition-all ${item.current
                                ? 'bg-amber-500/5 border-amber-500 shadow-xl scale-[1.02] z-10'
                                : 'bg-slate-50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800 opacity-50'
                                }`}>
                                <div className="flex items-center gap-6 mb-4 md:mb-0">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${item.current ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                        {item.phase}
                                    </span>
                                    <span className={`text-xl font-bold ${item.current ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{item.apps} 지원</span>
                                    {item.note && <span className="text-xs text-slate-400 italic">{item.note}</span>}
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className={`text-3xl font-black ${item.current ? 'text-amber-600' : 'text-slate-400'}`}>{item.price}</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center text-slate-400 italic font-medium">
                        "오늘 $4.99에 구매하신 분은, 나중에 앱이 100개가 되어도 $0원입니다."
                    </div>
                </div>
            </section>

            {/* Voting Section - Engagement Wording */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center text-slate-900 dark:text-white relative overflow-hidden border border-slate-100 dark:border-white/5 shadow-xl dark:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent pointer-events-none" />
                        <div className="relative z-10 space-y-8">
                            <Vote size={48} className="mx-auto text-amber-500" />
                            <h2 className="text-4xl font-black tracking-tight">다음 지원 앱은 여러분이 결정합니다.</h2>
                            <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                                저희는 쓰지도 않는 200개 앱을 무작정 넣지 않습니다. <br />
                                유저분들이 가장 많이 요청한 앱부터 하나씩, <strong>장인 정신으로 깎아서</strong> 탑재합니다.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-xl mx-auto text-sm">
                                <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-xl flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                                    <Check size={14} /> [필수] Finder, Chrome
                                </div>
                                <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-xl flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
                                    🚧 [개발 중] Arc Browser
                                </div>
                                <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-xl flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
                                    🗳️ [투표] Notion, Slack...
                                </div>
                            </div>

                            <button className="px-10 py-5 bg-amber-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl shadow-amber-600/30">
                                다음 지원 앱 투표하기 →
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section className="py-32 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-20 tracking-tight">자주 묻는 질문</h2>
                    <FAQ />
                </div>
            </section>

            {/* CTA - Final Marketing Flare */}
            <section className="py-40 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                                    100개 앱을 지원할 때쯤엔, <br />
                                    <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent italic">가격은 4배($19.99)가 되어 있을 겁니다.</span>
                                </h2>
                                <p className="text-2xl text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                                    가장 저렴한 오늘, 미래의 기능까지 미리 소장하세요.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <motion.a
                                    href="#purchase"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-white font-black text-2xl shadow-2xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all border-b-4 border-orange-800"
                                >
                                    Super Early Bird 구매하기 ($4.99)
                                    <ArrowRight size={28} />
                                </motion.a>
                            </div>

                            <p className="text-slate-500 font-medium tracking-widest text-sm uppercase">Buy Once, Own Forever.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default PricingPage;
