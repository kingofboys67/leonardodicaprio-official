import React, { useState } from 'react';
import { Award, Trophy } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../../data/content';

export const AchievementsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Oscar', 'Golden Globe', 'BAFTA', 'Humanitarian', 'Box Office'];

  const filteredAchievements = ACHIEVEMENTS_DATA.filter((a) => {
    if (activeFilter === 'All') return true;
    return a.category === activeFilter;
  });

  return (
    <section id="achievements" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>HALL OF ACCLAIM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight cinema-title mb-4">
            Honors & <span className="gold-text-gradient">Academy Legacy</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
            Recognizing over 30 years of transformative cinematic performances, boundary-pushing storytelling, and global humanitarian leadership.
          </p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { value: '1 Oscar', label: 'Best Leading Actor', sub: 'The Revenant (88th Academy Awards)' },
            { value: '7 Nominations', label: 'Academy Awards', sub: 'Across 3 decades of auteur cinema' },
            { value: '3 Golden Globes', label: 'Best Actor Honors', sub: 'The Aviator, Wolf of Wall St, Revenant' },
            { value: '$7.2B+', label: 'Global Box Office', sub: 'Titanic, Inception, Revenant & more' },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#111625] to-[#151c2e] border border-amber-500/20 text-center relative overflow-hidden"
            >
              <div className="text-2xl sm:text-4xl font-black text-amber-300 mb-1 tracking-tight cinema-title">
                {item.value}
              </div>
              <div className="text-xs font-bold text-white mb-0.5">{item.label}</div>
              <div className="text-[11px] text-slate-400">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold shadow-md shadow-amber-950/40'
                  : 'bg-[#111625] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#111625] border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.stat || item.year}
                  </span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>

                <h3 className="text-base font-bold text-white mb-1 cinema-title">
                  {item.title}
                </h3>
                <div className="text-[11px] font-mono text-orange-400 mb-2">
                  {item.organization}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>{item.category}</span>
                <span className="text-amber-400/80 font-mono">{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
