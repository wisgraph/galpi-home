import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Minus,
    Zap,
    Shield,
    Database,
    RefreshCw,
    CreditCard,
    MessageCircle,
    ExternalLink,
    AlertCircle
} from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';

const faqCategories = [
    {
        id: 'comparison',
        icon: Zap,
        title: '1. 기존 도구와의 비교 (The Elephant in the Room)',
        color: 'text-violet-500',
        faqs: [
            {
                question: '이미 훅마크(Hookmark)가 있는데, 굳이 갈피를 써야 합니까?',
                answer: (
                    <div className="space-y-4">
                        <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-violet-500 pl-4 py-1">
                            "헤비 유저라면 훅마크를 쓰시고, 스피드광이라면 갈피를 쓰세요."
                        </p>
                        <p>솔직히 말씀드립니다. 훅마크는 훌륭합니다. 200개가 넘는 앱을 지원하고 기능도 방대합니다. 하지만 그만큼 무겁고 느립니다.</p>
                        <p>여러분이 하루 종일 100가지 앱을 쓴다면 훅마크가 정답입니다. 하지만 <strong>Finder, Chrome, Obsidian, Preview</strong> 이 4가지를 업무의 90%로 사용한다면?</p>
                        <p className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl">
                            갈피는 훅마크보다 <strong className="text-violet-600">20배 빠르고, 메모리는 1/20만 사용하며, 가격은 1/14입니다.</strong> 저희는 '보편성'을 포기하고 '속도'와 '깊이'를 선택했습니다.
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        id: 'sustainability',
        icon: Shield,
        title: '2. 지속 가능성 (The Sustainability)',
        color: 'text-indigo-500',
        faqs: [
            {
                question: '평생 소장 $4.99? 먹튀 하거나 망하는 거 아닙니까?',
                answer: (
                    <div className="space-y-4">
                        <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-indigo-500 pl-4 py-1">
                            "저희는 매달 나가는 '서버 비용'이 0원입니다. 그래서 안 망합니다."
                        </p>
                        <p>대부분의 SaaS가 구독료를 받는 이유는 클라우드 서버 유지비 때문입니다. 유저가 늘수록 적자가 나는 구조죠.</p>
                        <p>
                            갈피는 <strong>로컬 우선(Local-First)</strong> 앱입니다. 데이터 처리는 여러분의 맥에서 이루어지고, 저장은 여러분의 하드디스크에 합니다.
                        </p>
                        <p>
                            저희에게는 고정 지출이 없습니다. 즉, 한 번 팔면 그 수익은 온전히 개발자의 인건비와 업데이트 비용으로 쓰입니다. 가장 지속 가능한 비즈니스 모델을 택했습니다.
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        id: 'data',
        icon: Database,
        title: '3. 데이터 주권 (The Safety)',
        color: 'text-purple-500',
        faqs: [
            {
                question: '개발자가 업데이트를 중단하면 내 데이터는 어떻게 됩니까?',
                answer: (
                    <div className="space-y-4">
                        <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-purple-500 pl-4 py-1">
                            "갈피가 사라져도, 당신의 데이터는 살아남습니다."
                        </p>
                        <p>저희는 최악의 상황(폐업)까지 대비해 설계했습니다. 갈피는 데이터를 암호화된 DB에 가두지 않습니다. 모든 연결 정보는 <strong>JSONL</strong>이라는 투명한 텍스트 파일로 저장됩니다.</p>
                        <p>
                            만약 갈피 앱이 없어져도, 여러분은 메모장이나 엑셀, 혹은 파이썬 스크립트로 데이터를 열어보고 백업할 수 있습니다. <strong>저희는 여러분의 데이터를 인질로 잡지 않습니다.</strong>
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        id: 'technical',
        icon: RefreshCw,
        title: '4. 기술적 신뢰성 (The Engineering)',
        color: 'text-violet-600',
        faqs: [
            {
                question: 'AppleScript 기반 앱들은 다 느리던데, 이건 진짜 빠릅니까?',
                answer: (
                    <div className="space-y-4">
                        <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-violet-600 pl-4 py-1">
                            "그냥 쓴 게 아니라, 뼈만 남기고 깎았기 때문입니다."
                        </p>
                        <p>맞습니다. 보통의 AppleScript 앱은 느립니다. 스크립트 실행을 위해 무거운 프로세스를 띄우기 때문입니다.</p>
                        <p>
                            저희는 <strong>Rust</strong>를 사용하여 스크립트를 밀리초(ms) 단위로 통제합니다. 또한, 가능한 모든 구간에서 스크립트 대신 <strong>macOS Accessibility API(접근성 API)</strong>를 사용하여 OS와 직접 통신합니다.
                        </p>
                        <p className="bg-violet-50 dark:bg-violet-900/10 p-4 rounded-xl text-violet-900 dark:text-violet-200 font-bold">
                            "0.03초". 이것은 마케팅 용어가 아니라, 계측된 팩트입니다. 직접 써보고 느리지 않다면 환불하십시오.
                        </p>
                    </div>
                )
            }
        ]
    },
    {
        id: 'refund',
        icon: CreditCard,
        title: '5. 결제 및 환불 (The Guarantee)',
        color: 'text-rose-500',
        faqs: [
            {
                question: '제 맥 환경에서 제대로 작동 안 하면 어쩌죠?',
                answer: (
                    <div className="space-y-4">
                        <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-rose-500 pl-4 py-1">
                            "7일 안에 메일 주세요. 묻지도 따지지도 않고 환불해 드립니다."
                        </p>
                        <p>맥의 환경은 다양합니다. 권한 문제나 특정 버전 충돌이 있을 수 있습니다. 구매 후 7일간 충분히 테스트해보세요.</p>
                        <p>
                            만약 실행이 안 되거나, 기대만큼 빠르지 않거나, 심지어 <strong>그냥 마음에 안 들어도</strong> 괜찮습니다. support@galpi.app으로 메일 한 통만 보내주시면, 이유를 묻지 않고 100% 환불 처리해 드립니다. <strong>리스크는 저희가 집집니다.</strong>
                        </p>
                    </div>
                )
            }
        ]
    }
];

const FAQPage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<string | null>('comparison-0');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 bg-white dark:bg-slate-950 min-h-screen"
        >
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden border-b border-slate-100 dark:border-slate-800/50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-violet-100 dark:bg-violet-900/10 blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative text-center">
                    <ScrollReveal>
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight">
                            구매하기 전에 <br />
                            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent italic underline decoration-violet-500/20 underline-offset-8">의심부터 하세요.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                            저희는 여러분이 맹목적으로 구매하는 것을 원치 않습니다. <br className="hidden md:block" />
                            갈피가 당신의 워크플로우에 맞는지, 우리가 믿을 만한 팀인지 꼼꼼히 검증하십시오. <br className="hidden md:block" />
                            가장 날카로운 질문들에 대해 피하지 않고 답해 드립니다.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Categories */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6 max-w-4xl space-y-16">
                    {faqCategories.map((category) => (
                        <div key={category.id} className="space-y-8">
                            <div className="flex items-center gap-3 px-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <category.icon className={`w-6 h-6 ${category.color}`} />
                                <h2 className="text-lg font-black text-slate-800 dark:text-slate-200 tracking-tight">{category.title}</h2>
                            </div>

                            <div className="grid gap-6">
                                {category.faqs.map((faq, idx) => {
                                    const id = `${category.id}-${idx}`;
                                    const isOpen = activeIndex === id;
                                    return (
                                        <div
                                            key={id}
                                            className={`transition-all duration-500 rounded-[2.5rem] border ${isOpen
                                                ? 'bg-white dark:bg-slate-900 border-violet-300 dark:border-violet-500/30 shadow-2xl shadow-violet-500/5'
                                                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                                                }`}
                                        >
                                            <button
                                                onClick={() => setActiveIndex(isOpen ? null : id)}
                                                className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                                            >
                                                <span className={`text-xl font-bold tracking-tight transition-colors ${isOpen ? 'text-violet-600' : 'text-slate-700 dark:text-slate-300'
                                                    }`}>
                                                    Q. "{faq.question}"
                                                </span>
                                                <div className={`shrink-0 ml-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                                                    ? 'bg-violet-500 border-violet-500 text-white'
                                                    : 'border-slate-200 dark:border-slate-700 text-slate-400'
                                                    }`}>
                                                    {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                                </div>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                    >
                                                        <div className="px-8 pb-10 text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-light pt-4 border-t border-slate-50 dark:border-slate-800/50">
                                                            <div className="flex items-start gap-4">
                                                                <span className="text-2xl font-black text-violet-500 mt-1">A.</span>
                                                                <div className="w-full">
                                                                    {faq.answer}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Outro - Discord Link */}
            <section className="py-32 bg-slate-950 text-white overflow-hidden relative border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-sm font-black text-violet-500 uppercase tracking-[0.4em] mb-4"> 여전히 남은 질문 </h2>
                                <h3 className="text-4xl md:text-6xl font-black tracking-tight">
                                    개발자와 직접 <span className="italic">대화하고 싶으신가요?</span>
                                </h3>
                            </div>

                            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                                저희는 숨지 않습니다. 디스코드 커뮤니티에는 저를 포함한 초기 유저들이 상주하고 있습니다. <br />
                                기능 요청, 버그 제보, 혹은 단순한 수다도 환영합니다.
                            </p>

                            <motion.a
                                href="https://discord.gg/yourlink"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-4 px-12 py-6 bg-violet-600 text-white rounded-2xl font-black text-2xl shadow-2xl shadow-violet-600/20 transition-all border-b-4 border-violet-800"
                            >
                                <MessageCircle size={28} />
                                개발자에게 직접 따지러 가기 (Discord)
                                <ExternalLink size={20} className="opacity-50" />
                            </motion.a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default FAQPage;
