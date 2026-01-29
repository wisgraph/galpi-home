import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    HelpCircle,
    ArrowRight,
    Zap,
    Shield,
    Database,
    RefreshCw,
    CreditCard
} from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';

const faqCategories = [
    {
        id: 'comparison',
        icon: Zap,
        title: '기존 도구와의 비교',
        colorLight: 'text-violet-600',
        colorDark: 'text-purple-400',
        faqs: [
            {
                question: '저는 이미 Raycast(또는 Alfred)를 잘 쓰고 있습니다. 이게 왜 필요한가요?',
                answer: `레이캐스트는 '도구'를 열지만, 갈피는 '작업'을 엽니다.

레이캐스트는 PDF 뷰어를 실행해 줄 뿐입니다. 하지만 갈피는 그 PDF의 14페이지, 세 번째 문단을 바로 열어줍니다.

레이캐스트는 슬랙을 켜주지만, 갈피는 '기획팀 채널의 특정 스레드'로 바로 이동합니다.

Raycast와 함께 쓰세요. 앱 실행은 Raycast로, 맥락 연결은 갈피로. 둘은 최고의 콤비입니다.`
            }
        ]
    },
    {
        id: 'sustainability',
        icon: Shield,
        title: '지속 가능성',
        colorLight: 'text-emerald-600',
        colorDark: 'text-green-400',
        faqs: [
            {
                question: '구독료도 없이 \'평생 소장\'이라니, 나중에 업데이트 중단되는 거 아닌가요?',
                answer: `우리는 서버 비용이 '0원'인 구조를 만들었습니다.

대부분의 앱이 구독을 받는 이유는 클라우드 서버 유지비 때문입니다. 하지만 갈피는 모든 데이터를 당신의 컴퓨터(Local)에서 처리합니다.

우리에겐 매달 나가는 고정비가 없습니다. 따라서 한 번의 판매로도 충분히 지속 가능한 비즈니스 모델입니다. 안심하고 평생 쓰세요.`
            }
        ]
    },
    {
        id: 'data',
        icon: Database,
        title: '데이터 주권',
        colorLight: 'text-cyan-600',
        colorDark: 'text-cyan-400',
        faqs: [
            {
                question: '만약 제가 갈피를 더 이상 안 쓰게 되면, 저장해둔 링크는 다 사라지나요?',
                answer: `절대 사라지지 않습니다. 데이터는 100% 당신의 것입니다.

갈피는 알 수 없는 암호화 DB를 쓰지 않습니다. 모든 링크 정보는 Documents/갈피/data.jsonl이라는 투명한 텍스트 파일에 저장됩니다.

앱을 삭제해도 파일은 남습니다. 메모장으로 열어서 내용을 확인하거나, 다른 앱으로 데이터를 옮기는 것도 자유롭습니다.`
            }
        ]
    },
    {
        id: 'technical',
        icon: RefreshCw,
        title: '기술적 신뢰성',
        colorLight: 'text-amber-600',
        colorDark: 'text-amber-400',
        faqs: [
            {
                question: '파일을 다른 폴더로 옮기거나 이름을 바꾸면 링크가 깨지나요?',
                answer: `갈피는 끝까지 쫓아가서 연결합니다.

단순히 파일 경로(주소)만 기억하는 게 아닙니다. macOS 파일 시스템의 고유 ID(Inode)와 자체 추적 기술(xattr)을 이용해 파일이 어디로 이사 가든 찾아냅니다.

마음껏 파일을 정리하세요. 연결은 우리가 책임집니다.`
            }
        ]
    },
    {
        id: 'refund',
        icon: CreditCard,
        title: '결제 및 환불',
        colorLight: 'text-pink-600',
        colorDark: 'text-pink-400',
        faqs: [
            {
                question: '제 워크플로우랑 안 맞으면 어떡하죠?',
                answer: `7일간 충분히 써보시고 결정하세요.

구매 후 7일 이내라면, 이유를 묻지 않고 100% 환불해 드립니다.

우리는 당신이 억지로 이 앱을 쓰길 원하지 않습니다. 정말 도움이 될 때만 갈피를 소장하세요.`
            }
        ]
    }
];

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full py-6 flex items-start justify-between gap-4 text-left hover:text-slate-900 dark:hover:text-white transition-colors"
            >
                <span className={`text-lg font-medium ${isOpen ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-1"
                >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-violet-500' : 'text-slate-400 dark:text-slate-500'}`} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQPage: React.FC = () => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        setOpenItems(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

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
                <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-white to-white dark:from-pink-900/20 dark:via-slate-950 dark:to-slate-950" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-pink-300/30 to-violet-300/30 dark:from-pink-500/20 dark:to-purple-500/20 rounded-full blur-3xl opacity-30" />

                <div className="container mx-auto px-6 relative">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto text-center">


                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                <span className="text-slate-900 dark:text-white">자주 묻는</span>
                                <br />
                                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 dark:from-pink-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent">
                                    질문들
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                갈피에 대해 궁금한 점이 있으신가요?
                                <br />
                                아래에서 답을 찾아보세요.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="py-20 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto space-y-12">
                        {faqCategories.map((category, categoryIndex) => (
                            <ScrollReveal key={category.id} delay={categoryIndex * 0.1}>
                                <div className="rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    {/* Category Header */}
                                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
                                        <category.icon className={`w-5 h-5 ${category.colorLight} dark:${category.colorDark}`} />
                                        <h2 className="font-semibold text-slate-900 dark:text-white">{category.title}</h2>
                                    </div>

                                    {/* FAQs */}
                                    <div className="px-6">
                                        {category.faqs.map((faq, faqIndex) => {
                                            const itemId = `${category.id}-${faqIndex}`;
                                            return (
                                                <FAQItem
                                                    key={itemId}
                                                    question={faq.question}
                                                    answer={faq.answer}
                                                    isOpen={openItems.has(itemId)}
                                                    onToggle={() => toggleItem(itemId)}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="py-20 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                아직 질문이 있으신가요?
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">
                                이메일이나 Discord로 언제든 문의해 주세요. 빠르게 답변 드리겠습니다.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="mailto:support@galpi.app"
                                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-white font-medium transition-colors"
                                >
                                    📧 이메일 보내기
                                </a>
                                <a
                                    href="#discord"
                                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-white font-medium transition-colors"
                                >
                                    💬 Discord 참여하기
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-t from-pink-100 to-transparent dark:from-pink-900/20 dark:to-transparent" />

                <div className="container mx-auto px-6 relative">
                    <ScrollReveal>
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                준비되셨나요?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                                지금 바로 갈피를 시작하세요.
                            </p>
                            <motion.a
                                href="/pricing"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold text-lg shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-shadow"
                            >
                                가격 확인하기
                                <ArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    );
};

export default FAQPage;
