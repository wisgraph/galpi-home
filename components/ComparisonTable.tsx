import React from 'react';
import { COMPARISON_DATA } from '../constants';
import { Check, X } from 'lucide-react';

const ComparisonTable: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">1세대 도구의 시대는 끝났습니다.</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            무거운 스크립트, 깨지는 데이터베이스, 수동 연결의 노가다.<br className="hidden md:block" />
            갈피는 이 모든 문제를 아키텍처 레벨에서 해결했습니다.
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full max-w-5xl mx-auto border-collapse text-left relative z-10">
            <thead>
              <tr>
                <th className="p-6 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider">비교 항목</th>
                <th className="p-6 border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-medium w-1/3 text-sm uppercase tracking-wider">기존 연결 도구 (H)</th>
                <th className="relative p-6 w-1/3 border-b border-violet-300 dark:border-indigo-500/30">
                  <span className="relative z-10 text-violet-600 dark:text-indigo-400 font-bold text-lg">갈피 (Next Gen)</span>
                </th>
                <th className="p-6 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium hidden md:table-cell text-sm uppercase tracking-wider">Why?</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="group hover:bg-slate-100 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="p-6 border-b border-slate-200 dark:border-slate-800/50 font-semibold text-slate-700 dark:text-slate-300">{row.feature}</td>
                  <td className="p-6 border-b border-slate-200 dark:border-slate-800/50 text-slate-500">{row.competitor}</td>
                  <td className="p-6 border-b border-slate-200 dark:border-slate-800/50 bg-violet-50 dark:bg-indigo-900/5 border-x border-violet-100 dark:border-slate-800/30 text-slate-900 dark:text-white font-medium md:border-x-0">
                    {row.galpi}
                  </td>
                  <td className="p-6 border-b border-slate-200 dark:border-slate-800/50 text-slate-500 text-sm italic hidden md:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">더 빠르고, 더 안전하고, 더 합리적입니다.</h3>
          <a href="#pricing" className="inline-block px-10 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-violet-500/25">
            갈피로 갈아타기 (얼리버드 $4.99)
          </a>
          <p className="mt-6 text-sm text-slate-500">기존 훅마크 사용자 환영 | 데이터 마이그레이션 지원(예정)</p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;