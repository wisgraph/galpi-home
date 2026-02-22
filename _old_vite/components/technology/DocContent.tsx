import React from 'react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface DocContentProps {
    content: string;
    title: string;
}

const DocContent: React.FC<DocContentProps> = ({ content, title }) => {
    return (
        <div className="flex-1 min-w-0 bg-slate-50 dark:bg-slate-900/30">
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                {title}
                            </h1>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">
                                Technical Documentation
                            </div>
                        </div>

                        <article className="prose prose-slate dark:prose-invert prose-lg max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl prose-pre:shadow-sm
              prose-code:text-violet-600 dark:prose-code:text-violet-400 prose-code:bg-violet-50 dark:prose-code:bg-violet-500/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-li:text-slate-600 dark:prose-li:text-slate-300
              prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:bg-white dark:prose-img:bg-slate-800
              prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            ">
                            <Markdown>{content}</Markdown>
                        </article>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DocContent;
