import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FileJson, Anchor, Database } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const data = [
  { name: 'Electron App', ram: 220, label: '220MB' },
  { name: '갈피 (Rust)', ram: 25, label: '25MB' },
];

const TechDeepDive: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="tech" className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute right-0 top-1/3 w-[800px] h-[800px] bg-violet-200 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-16 max-w-7xl mx-auto">

          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white leading-tight">
              가볍지만, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-500 dark:from-cyan-400 dark:to-blue-500">가장 튼튼한 금고.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              우리는 애플리케이션의 성능보다 사용자의 '데이터 주권'을 더 무겁게 생각합니다.<br />
              갈피가 망해도 당신의 연결은 사라지지 않습니다. 가장 안전한 금고는 '투명한 금고'이기 때문입니다.
            </p>

            <div className="space-y-12">
              <div className="flex gap-6 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300">
                  <Database size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">30ms의 한계 돌파 (Native Path)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    남들은 느린 AppleScript를 그냥 씁니다. 갈피는 macOS의 Accessibility API에 직접 탄 중 저수준 최적화를 통해 30ms(0.03초)라는 반응 속도를 구현했습니다. 뇌의 속도를 따라잡는 쾌적함을 경험하세요.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-violet-600 dark:text-purple-400 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300">
                  <FileJson size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-purple-400 transition-colors">메모리 도둑을 잡았습니다 (Rust Core)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    켜둘수록 비대해지는 앱(Memory Leak)에 지치셨나요? Rust Core가 리소스를 엄격하게 통제하여 12GB까지 치솟는 경쟁사와 달리 항상 300MB 내외의 고정된 가벼움을 유지합니다.
                  </p>
                  <span className="inline-block mt-3 text-xs px-2.5 py-1 bg-violet-100 dark:bg-purple-900/20 text-violet-700 dark:text-purple-300 border border-violet-200 dark:border-purple-500/30 rounded font-medium">Memory Stability Guaranteed</span>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:border-pink-500/50 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-300">
                  <Anchor size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">투명한 데이터 권리 (JSONL)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    당신의 데이터를 암호화된 블랙박스에 가두지 마세요. 갈피는 모든 연결을 투명한 텍스트 파일(JSONL)로 저장합니다. 가장 안전한 금고는 '투명한 금고'이기 때문입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visuals */}
          <div className="lg:w-1/2 w-full pt-8">
            {/* Chart Card */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-8 shadow-2xl backdrop-blur-sm">
              <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-8 uppercase tracking-widest">Memory Usage Comparison</h4>
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