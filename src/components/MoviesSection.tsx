'use client';

import React, { useState } from 'react';
import {
  Film,
  Award,
  Clapperboard,
  Star,
  Sparkles,
  Play,
  Info,
  Flame,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { MOVIES_DATA, Movie } from '../data/content';

interface MoviesSectionProps {
  onPlayMovie: (movie: Movie) => void;
  onOpenDetail: (movie: Movie) => void;
}

export const MoviesSection: React.FC<MoviesSectionProps> = ({
  onPlayMovie,
  onOpenDetail,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const filters = [
    { id: 'all', label: 'All Masterworks' },
    { id: 'top10', label: 'Top 10 Ranked' },
    { id: 'scorsese', label: 'Scorsese Collaborations (6)' },
    { id: 'award-winner', label: 'Academy Award Honors' },
    { id: 'classic', label: 'Timeless Classics' },
  ];

  const top10Movies = [...MOVIES_DATA]
    .filter((m) => m.rank !== undefined)
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const filteredMovies = MOVIES_DATA.filter((movie) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'top10') return movie.rank !== undefined;
    return movie.category === activeFilter;
  });

  const scrollTop10 = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -500 : 500,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="movies" className="relative py-20 sm:py-28 border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-mono text-orange-400 font-semibold mb-3 shadow-sm">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>OFFICIAL FILMOGRAPHY</span>
          </div>
          <h2 className="cinema-title text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            A Defining Cinematic <span className="text-orange-500">Ouvre</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-2xl">
            Spanning over three decades of cinema history. Uncompromising immersion, boundary-pushing auteur collaborations, and characters that shaped global culture.
          </p>
        </div>

        {/* Signature Top 10 Showcase */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Top 10 Ranked Masterpieces
                </h3>
                <p className="text-xs text-slate-400">
                  Critical acclaim, audience impact, and cultural resonance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTop10('left')}
                className="w-9 h-9 rounded-xl bg-[#111625] hover:bg-orange-500 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center transition-colors"
                aria-label="Previous Top 10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTop10('right')}
                className="w-9 h-9 rounded-xl bg-[#111625] hover:bg-orange-500 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center transition-colors"
                aria-label="Next Top 10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex items-end gap-6 sm:gap-8 overflow-x-auto no-scrollbar pb-6 pt-2 px-1"
          >
            {top10Movies.map((movie) => {
              const rank = movie.rank || 1;
              return (
                <div
                  key={movie.id}
                  onClick={() => onOpenDetail(movie)}
                  className="flex items-end shrink-0 group relative select-none cursor-pointer"
                >
                  {/* Huge Rank Numeral Typography */}
                  <div className="relative z-0 -mr-6 sm:-mr-8 select-none pointer-events-none">
                    <span className="rank-numeral text-8xl sm:text-9xl font-black leading-none transform translate-y-3 block">
                      {rank}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="relative z-10 w-44 sm:w-52 aspect-[2/3] rounded-2xl overflow-hidden bg-[#111625] border border-slate-800 group-hover:border-orange-500 transition-all duration-300 group-hover:-translate-y-2 shadow-xl">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-300" />
                      {movie.rating}
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-3.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 block mb-0.5">
                        {movie.year} • Dir. {movie.director}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-orange-200 transition-colors line-clamp-1 mb-2">
                        {movie.title}
                      </h4>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayMovie(movie);
                          }}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-orange-500/30"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Watch Reel</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDetail(movie);
                          }}
                          className="p-1.5 rounded-lg bg-black/60 border border-slate-700 text-slate-300 hover:text-white text-xs"
                          title="View Details"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Tabs for Full Catalog */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-950/40 font-bold'
                  : 'bg-[#111625] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onOpenDetail(movie)}
              className="group relative rounded-2xl overflow-hidden bg-[#111625] border border-slate-800 hover:border-orange-500/60 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-xl flex flex-col justify-between"
            >
              {/* Poster Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {movie.year}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-bold">
                    <Star className="w-2.5 h-2.5 fill-emerald-400" />
                    {movie.rating}
                  </span>
                </div>

                {/* Bottom Overlay Info on Poster */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest block mb-0.5">
                    Dir. {movie.director}
                  </span>
                  <h3 className="cinema-title text-base font-bold text-white group-hover:text-orange-200 transition-colors line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mb-2 font-light">
                    {movie.role}
                  </p>

                  {/* Hover Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayMovie(movie);
                      }}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/30"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Scene</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetail(movie);
                      }}
                      className="p-1.5 rounded-lg bg-black/60 border border-slate-700 text-slate-300 hover:text-white text-xs"
                      title="Film Details"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
