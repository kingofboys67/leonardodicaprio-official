import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { QUICK_FACTS } from '../data/faq';

export const QuickFactsBox: React.FC = () => {
  return (
    <aside
      aria-label="Quick Facts"
      className="my-10 rounded-2xl border border-orange-500/30 bg-[#0e1424]/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative overflow-hidden"
    >
      <div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,140,40,0.15) 0%, transparent 70%)',
        }}
      />
      <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-orange-400 uppercase mb-4">
        <Info className="w-4 h-4 text-orange-400" />
        <span>Entity Dossier · Quick Facts</span>
      </div>

      <h2 className="cinema-title text-2xl font-black text-white mb-6">
        Quick Facts: Leonardo DiCaprio
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUICK_FACTS.map((fact) => (
          <div
            key={fact.label}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-orange-500/40 transition-colors"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              {fact.label}
            </div>
            <div className="text-sm sm:text-base font-semibold text-white leading-snug">
              {fact.value}
            </div>
            {fact.sourceUrl && (
              <a
                href={fact.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-mono"
              >
                <span>Source: {fact.sourceLabel || 'Official'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
