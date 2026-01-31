import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Anchor,
    Sparkles,
    Target,
    ArrowRight,
    Play,
    MousePointer2,
    Layers,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import ScrollReveal from "../components/animations/ScrollReveal";
import VideoMask from "../components/common/VideoMask";
import { useTranslation } from "@/locales/i18n";

const featuresConfig = [
    {
        id: "context-awareness",
        icon: Target,
        color: "from-violet-500 to-purple-600",
        themeColor: "#8b5cf6",
        videoPaths: [
            "/assets/videos/auto_focus_context_recall.mov",
            "/assets/videos/typed_tag_auto_search.mov"
        ]
    },
    {
        id: "smart-tagging",
        icon: MousePointer2,
        color: "from-rose-500 to-pink-600",
        themeColor: "#f43f5e",
        videoPaths: [
            "/assets/videos/auto_context_tagging.mov",
            "/assets/videos/mouse_context_tagging.mov"
        ]
    },
    {
        id: "bulk-ops",
        icon: Sparkles,
        color: "from-blue-500 to-cyan-600",
        themeColor: "#3b82f6",
        videoPaths: [
            "/assets/videos/bulk_copy_markdown.mov",
            "/assets/videos/tag_filter_search.mov"
        ]
    },
    {
        id: "environment-recall",
        icon: Layers,
        color: "from-amber-500 to-orange-600",
        themeColor: "#f59e0b",
        videoPaths: [
            "/assets/videos/bulk_open_context.mov",
            "/assets/videos/bulk_folder_open.mov"
        ]
    },
    {
        id: "persistence",
        icon: Anchor,
        color: "from-emerald-500 to-teal-600",
        themeColor: "#10b981",
        videoPaths: [
            "/assets/videos/deep_link_obsidian.mov",
            "/assets/videos/finder_folder_save.mov"
        ]
    }
];

interface FeatureSectionProps {
    feature: any; // Using any for now as it merges Translation + Config
    index: number;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ feature, index }) => {
    const { t } = useTranslation();
    const [activeIdx, setActiveIdx] = useState(0);
    const isEven = index % 2 === 0;
    const Icon = feature.icon;

    return (
        <section className="py-24 md:py-40 border-b border-slate-100 dark:border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className={`flex flex-col lg:flex-row items-center gap-16 md:gap-24 ${isEven ? "" : "lg:flex-row-reverse"}`}>

                    {/* Text Content */}
                    <div className="w-full lg:w-2/5 space-y-8">
                        <ScrollReveal direction={isEven ? "left" : "right"}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg shadow-current/10`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className={`text-sm font-black tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
                                        {feature.subtitle}
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                                    {feature.title}
                                </h2>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-3 relative group">
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-rose-500/20 group-hover:bg-rose-500 transition-colors" />
                                    <div className="flex items-center gap-2 text-rose-500 font-black uppercase text-xs tracking-widest">
                                        <AlertCircle size={14} /> {t('featuresPage.labels.problem')}
                                    </div>
                                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light italic">
                                        "{feature.pain}"
                                    </p>
                                </div>

                                <div className="space-y-3 relative group">
                                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
                                    <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-xs tracking-widest">
                                        <CheckCircle2 size={14} /> {t('featuresPage.labels.solution')}
                                    </div>
                                    <p className="text-2xl text-slate-900 dark:text-slate-200 leading-relaxed font-bold">
                                        {feature.solution}
                                    </p>
                                </div>

                                <div className="grid gap-4 pt-4">
                                    {feature.points.map((p, i) => (
                                        <div key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                            <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-br ${feature.color}`} />
                                            <span className="text-lg font-medium">{p}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3 pt-6">
                                    {feature.videos.map((v, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveIdx(i)}
                                            className={`px-6 py-2.5 rounded-2xl text-sm font-black transition-all duration-300 border ${activeIdx === i
                                                ? `bg-cyan-600 dark:bg-cyan-500 text-white border-cyan-700 dark:border-cyan-400 shadow-xl shadow-cyan-500/20 scale-105`
                                                : "bg-transparent text-slate-500 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-300 font-bold"
                                                }`}
                                        >
                                            {v.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Video Showcase */}
                    <div className="w-full lg:w-3/5">
                        <ScrollReveal direction={isEven ? "right" : "left"} delay={0.2}>
                            <div className="relative group">
                                <div className={`absolute -inset-8 bg-gradient-to-br ${feature.color} opacity-10 blur-[100px] rounded-[4rem] group-hover:opacity-20 transition-opacity duration-700`} />

                                <div className="relative aspect-video w-full">
                                    <AnimatePresence mode="popLayout">
                                        <motion.div
                                            key={feature.videos[activeIdx].path}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <VideoMask
                                                src={feature.videos[activeIdx].path}
                                                borderRadius="3rem"
                                                className="w-full h-full shadow-[0_40px_100px_rgba(0,0,0,0.4)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-slate-200/50 dark:border-white/10"
                                                crop={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="absolute top-10 left-10 z-20">
                                        <div className="px-5 py-2.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 text-white text-xs font-black tracking-widest uppercase flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color} animate-pulse`} />
                                            {feature.videos[activeIdx].label}
                                        </div>
                                    </div>
                                </div>

                                <div className="h-16 mt-12 flex items-center justify-center text-center px-12">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={feature.videos[activeIdx].path}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed"
                                        >
                                            {feature.videos[activeIdx].desc}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
};

const FeaturesPage: React.FC = () => {
    const { t } = useTranslation();
    const featuresFromI18n = t('featuresPage.features');

    const featuresWithIcons = Array.isArray(featuresFromI18n) ? featuresFromI18n.map((f: any, i: number) => {
        const iconMap: Record<string, any> = {
            'context-awareness': Target,
            'smart-tagging': MousePointer2,
            'bulk-ops': Sparkles,
            'environment-recall': Layers,
            'persistence': Anchor
        };
        const featureConfig = featuresConfig[i] || featuresConfig[0];

        return {
            ...f,
            icon: iconMap[f.id] || Target,
            color: featureConfig.color,
            themeColor: featureConfig.themeColor,
            videos: Array.isArray(f.videos) ? f.videos.map((v: any, vi: number) => ({
                ...v,
                path: featureConfig.videoPaths[vi]
            })) : []
        };
    }) : [];

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-48 pb-24 overflow-hidden border-b border-slate-100 dark:border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 to-transparent dark:from-cyan-900/5 dark:to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>

                        <h1
                            className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-10 tracking-[ -0.05em] leading-[0.9]"
                            dangerouslySetInnerHTML={{ __html: t('featuresPage.hero.title') }}
                        />

                        <p
                            className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: t('featuresPage.hero.description') }}
                        />
                    </ScrollReveal>
                </div>
            </section>

            {/* Content Sections */}
            <div className="pb-24">
                {featuresWithIcons.map((feature: any, index: number) => (
                    <FeatureSection key={feature.id} feature={feature} index={index} />
                ))}
            </div>

            {/* CTA Section */}
            <section className="py-48 bg-slate-50 dark:bg-slate-950 relative overflow-hidden text-center">
                <div className="absolute inset-0 opacity-10 dark:opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-600 via-transparent to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <h2
                            className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tight"
                            dangerouslySetInnerHTML={{ __html: t('featuresPage.cta.title') }}
                        />
                        <p
                            className="text-2xl text-slate-500 dark:text-slate-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t('featuresPage.cta.subtitle') }}
                        />

                        <motion.a
                            href="/pricing"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-4 px-14 py-7 bg-cyan-600 dark:bg-cyan-500 text-white rounded-2xl font-black text-2xl shadow-2xl hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-all border-b-8 border-cyan-800 dark:border-cyan-600 shadow-cyan-500/20"
                        >
                            {t('featuresPage.cta.button')}
                            <ArrowRight className="w-6 h-6" />
                        </motion.a>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default FeaturesPage;
