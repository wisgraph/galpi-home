import React from 'react';
import { PRICING_TIERS } from '../constants';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-violet-100 dark:bg-brand-900/10 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 relative">

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight relative z-10">구독료 <span className="text-violet-600 dark:text-violet-400">0원</span>.</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 relative z-10">도구는 빌리는 게 아니라 소장하는 것입니다.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {PRICING_TIERS.map((tier, idx) => (
            <div key={idx} className="group relative">
              <div className={`absolute -inset-[1px] rounded-[26px] blur-sm opacity-50 transition duration-500 ${tier.highlight ? 'bg-violet-500' : 'bg-transparent'}`}></div>

              <div className={`relative h-full rounded-3xl p-8 flex flex-col ${tier.highlight
                ? 'bg-white dark:bg-slate-900 border border-violet-300 dark:border-violet-500/50 shadow-xl'
                : 'bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800'
                }`}>
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider shadow-lg">
                    Best Value
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-2 ${tier.highlight ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {tier.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-8">
                  {tier.originalPrice && <span className="text-slate-400 dark:text-slate-500 line-through text-lg">{tier.originalPrice}</span>}
                  <span className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">{tier.price}</span>
                  <span className="text-slate-400 dark:text-slate-500 font-medium">/ lifetime</span>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <div className={`mt-0.5 rounded-full p-0.5 ${tier.highlight ? 'bg-violet-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                        <Check size={14} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-bold transition-all relative overflow-hidden group/btn ${tier.highlight
                  ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white'
                  }`}>
                  <span className="relative z-10">{tier.cta}</span>
                </button>
                {tier.highlight && (
                  <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500 italic">
                    * 정식 버전 출시 후에는 구독형($XX/년)으로 전환될 예정입니다. 지금이 가장 저렴합니다.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;