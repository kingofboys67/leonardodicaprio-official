'use client';

import React from 'react';
import { Award, Globe2, Sparkles, Quote, Calendar, ArrowUpRight, Share2 } from 'lucide-react';
import { FAMOUS_QUOTES } from '../data/content';
import { useApp } from '../context/AppContext';

export const AboutSection: React.FC = () => {
  const { openQuoteCard } = useApp();
  const milestones = [
    {
      year: '1993',
      title: 'Breakthrough & Oscar Recognition',
      desc: 'At just 19 years old, earned his first Academy Award nomination for What’s Eating Gilbert Grape, announcing a fearless new artistic presence.',
    },
    {
      year: '1997',
      title: 'Cultural Phenomenon & Global Icon',
      desc: 'Starring as Jack Dawson in James Cameron’s Titanic, which secured 11 Academy Awards and redefined modern cinema history.',
    },
    {
      year: '1998',
      title: 'The Leonardo DiCaprio Foundation',
      desc: 'Established his foundation at age 24 with a mission to protect the world’s last wild places and foster harmony between humanity and nature.',
    },
    {
      year: '2002–2023',
      title: 'The Scorsese Partnership',
      desc: 'Forged one of cinema’s most enduring auteur collaborations across 6 masterworks: Gangs of New York, The Aviator, The Departed, Shutter Island, The Wolf of Wall Street, and Killers of the Flower Moon.',
    },
    {
      year: '2014',
      title: 'UN Messenger of Peace',
      desc: 'Appointed by UN Secretary-General Ban Ki-moon with a special focus on climate change, delivering landmark speeches before the UN General Assembly.',
    },
    {
      year: '2016',
      title: 'Academy Award & Historic Address',
      desc: 'Won the Academy Award for Best Actor for The Revenant, using his global platform to demand immediate collective action on climate emergency.',
    },
    {
      year: '2021–Present',
      title: 'Co-Founding Re:wild',
      desc: 'Partnered with renowned conservation scientists to launch Re:wild, catalyzing a worldwide movement to restore degraded ecosystems and reintroduce lost species.',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#080b12] text-slate-200 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 -left-64 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-emerald-400 mb-4 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BIOGRAPHY & PHILOSOPHY</span>
          </div>
          <h2 className="cinema-title text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            The Intersection of <span className="gold-text-gradient">Art</span> and{' '}
            <span className="emerald-text-gradient">Advocacy</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed">
            For three decades, Leonardo DiCaprio has stood at the summit of world cinema while channeling his global platform into one of the most effective conservation crusades in modern history.
          </p>
        </div>

        {/* Dual Pillar Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Pillar 1: Cinematic Legacy */}
          <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-800 hover:border-slate-700 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="cinema-title text-2xl font-bold text-white mb-3">
                Mastery of Character
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-6">
                From his early raw performances in <span className="text-white italic">This Boy's Life</span> and <span className="text-white italic">What's Eating Gilbert Grape</span> to boundary-pushing sagas with directors Martin Scorsese, Christopher Nolan, Quentin Tarantino, and Alejandro G. Iñárritu, Leonardo has consistently chosen complex, uncompromising roles that interrogate the human soul.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>7 Academy Award Nominations</span>
              <span className="text-amber-300 font-semibold">1 Oscar Win (The Revenant)</span>
            </div>
          </div>

          {/* Pillar 2: Planetary Stewardship */}
          <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="cinema-title text-2xl font-bold text-white mb-3">
                Planetary Stewardship
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-6">
                Leonardo's activism is defined by tangible, frontline impact. Through <span className="text-emerald-300 font-medium">Re:wild</span>, <span className="text-emerald-300 font-medium">Earth Alliance</span>, and his eponymous foundation, he has funded grassroots environmental defenders, secured hundreds of millions of acres of indigenous land, and sounded the alarm across international forums.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>UN Messenger of Peace</span>
              <span className="text-emerald-300 font-semibold">$100M+ Direct Funding</span>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="mb-20">
          <h3 className="cinema-title text-xl sm:text-2xl font-bold text-white mb-10 text-center">
            Key Career & Humanitarian Milestones
          </h3>
          <div className="relative border-l border-slate-800/80 ml-4 sm:ml-32 space-y-10">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-12 group">
                {/* Timeline Node Point */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#080b12] border-2 border-slate-700 group-hover:border-emerald-400 group-hover:bg-emerald-400 transition-all duration-300 shadow-md" />
                
                {/* Year Label */}
                <span className="sm:absolute sm:-left-28 sm:top-1 font-mono text-xs sm:text-sm font-bold text-emerald-400 tracking-wider block mb-1 sm:mb-0">
                  {m.year}
                </span>

                <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 hover:border-slate-700 transition-all">
                  <h4 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Famous Quote Highlight Callout */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-amber-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 relative overflow-hidden">
          <Quote className="absolute -bottom-10 -right-6 w-48 h-48 text-white/[0.03] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="cinema-title text-lg sm:text-2xl md:text-3xl text-slate-100 font-normal italic leading-relaxed mb-6">
              “{FAMOUS_QUOTES[0].text}”
            </p>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-amber-300 uppercase tracking-widest font-mono">
                Leonardo DiCaprio
              </span>
              <span className="text-xs text-slate-400 mt-1">
                {FAMOUS_QUOTES[0].source}
              </span>
              <button
                onClick={() =>
                  openQuoteCard({
                    id: 'oscar-2016',
                    text: FAMOUS_QUOTES[0].text,
                    source: FAMOUS_QUOTES[0].source,
                    context: '88th Academy Awards Acceptance Speech',
                  })
                }
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 hover:text-orange-300 text-xs font-mono font-semibold transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Quote Card</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
