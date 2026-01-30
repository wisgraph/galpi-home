import React from 'react';
import { Database, FileJson, Anchor } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '@/locales/i18n';

const data = [
  { name: 'Electron App', ram: 1500 },
  { name: 'Galpi (Rust)', ram: 85 },
];

const TechDeepDive: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <section id="engineering" className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 dark:bg-slate-900/20 -skew-x-12 translate-x-1/4"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-16 max-w-7xl mx-auto">

          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2
              className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white leading-tight"
              dangerouslySetInnerHTML={{ __html: t('tech.title') }}
            />
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              {t('tech.description')}
            </p>

            <div className="space-y-12">
              <div className="flex gap-6 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300">
                  <Database size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {t('tech.features.0.title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {t('tech.features.0.desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-violet-600 dark:text-purple-400 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300">
                  <FileJson size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-purple-400 transition-colors">
                    {t('tech.features.1.title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {t('tech.features.1.desc')}
                  </p>
                  <span className="inline-block mt-3 text-xs px-2.5 py-1 bg-violet-100 dark:bg-purple-900/20 text-violet-700 dark:text-purple-300 border border-violet-200 dark:border-purple-500/30 rounded font-medium">No Vendor Lock-in</span>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:border-pink-500/50 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-300">
                  <Anchor size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {t('tech.features.2.title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {t('tech.features.2.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visuals */}
          <div className="lg:w-1/2 w-full pt-8">
            {/* Chart Card */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-8 shadow-2xl backdrop-blur-sm">
              <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-8 uppercase tracking-widest">
                {t('tech.chart.title') || 'Memory Usage Comparison'}
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1e293b" : "#e2e8f0"} horizontal={false} />
                    <XAxis type="number" stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={12} tickFormatter={(value) => `${value}MB`} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke={isDark ? "#e2e8f0" : "#1e293b"} fontSize={13} width={100} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
                      contentStyle={{
                        backgroundColor: isDark ? '#0f172a' : '#ffffff',
                        borderColor: isDark ? '#334155' : '#e2e8f0',
                        color: isDark ? '#fff' : '#1e293b',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="ram" radius={[0, 4, 4, 0]} barSize={32}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 1 ? '#8b5cf6' : (isDark ? '#334155' : '#cbd5e1')} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Code Snippet Card */}
            <div className="bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl font-mono text-xs overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 opacity-50"></div>
              <div className="flex items-center gap-2 mb-5 border-b border-slate-800/50 pb-3">
                <FileJson size={14} className="text-yellow-400" />
                <span className="text-slate-400">~/Documents/갈피/data.jsonl</span>
              </div>
              <div className="text-slate-400 space-y-1.5 leading-relaxed">
                <p><span className="text-slate-500">{`{`}</span></p>
                <p className="pl-4"><span className="text-purple-400">"id"</span>: <span className="text-green-400">"550e8400-e29b..."</span>,</p>
                <p className="pl-4"><span className="text-purple-400">"title"</span>: <span className="text-cyan-400">"Q1_Revenue_Report.pdf"</span>,</p>
                <p className="pl-4"><span className="text-purple-400">"path"</span>: <span className="text-green-400">"/Users/kim/Docs..."</span>,</p>
                <p className="pl-4"><span className="text-purple-400">"tags"</span>: [<span className="text-green-400">"finance"</span>, <span className="text-green-400">"2024"</span>],</p>
                <p className="pl-4"><span className="text-purple-400">"bookmark_blob"</span>: <span className="text-slate-600">"&lt;base64_inode_data&gt;"</span></p>
                <p><span className="text-slate-500">{`}`}</span></p>
              </div>

              {/* Reflection effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechDeepDive;