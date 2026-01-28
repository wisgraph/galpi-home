import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, FileText, Star } from 'lucide-react';

interface Doc {
    id: string;
    title: string;
    separator?: boolean;
    highlight?: boolean;
}

interface DocSidebarProps {
    docs: Doc[];
    selectedId: string;
    onSelect: (id: string) => void;
}

const DocSidebar: React.FC<DocSidebarProps> = ({ docs, selectedId, onSelect }) => {
    return (
        <aside className="w-full md:w-80 shrink-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="p-6 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
                <div className="mb-6">
                    <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-violet-500" />
                        핵심 기능
                    </h2>
                </div>

                <nav className="space-y-1">
                    {docs.map((doc, index) => (
                        <React.Fragment key={doc.id}>
                            <button
                                onClick={() => onSelect(doc.id)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group ${selectedId === doc.id
                                    ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 font-semibold shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-2 truncate">
                                    {doc.highlight && (
                                        <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                                    )}
                                    <span className="truncate">{doc.title}</span>
                                </div>
                                {selectedId === doc.id && (
                                    <motion.div layoutId="active-doc-arrow" initial={false}>
                                        <ChevronRight size={14} className="text-violet-500" />
                                    </motion.div>
                                )}
                            </button>
                            {doc.separator && (
                                <div className="my-3 border-t border-slate-100 dark:border-slate-800 w-full" />
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default DocSidebar;
