import React from 'react';
import { Link } from 'react-router-dom';

const PersonaCTA: React.FC = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50 to-white dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-950" />
            <div className="relative z-10 text-center px-6">
                <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                    당신의 워크플로우에
                    <br />
                    <span className="text-violet-600 dark:text-purple-400">'연결'</span>을 더하세요
                </h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
                    지금 얼리버드 $4.99에 평생 소장하세요. (선착순 100명)
                </p>
                <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-violet-500/25"
                >
                    HookLink 시작하기
                </Link>
            </div>
        </div>
    );
};

export default PersonaCTA;
