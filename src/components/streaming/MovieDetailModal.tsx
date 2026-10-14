'use client';

import React from 'react';
import {
  X,
  Play,
  Bookmark,
  Check,
  Star,
  Award,
  Calendar,
  Clock,
  DollarSign,
  UserCheck,
  Quote,
  Film,
} from 'lucide-react';
import { Movie } from '../../data/content';

interface MovieDetailModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onPlayMovie: (movie: Movie) => void;
  isSaved: boolean;
  onToggleWatchlist: (movieId: string) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  isOpen,
  onClose,
  onPlayMovie,
  isSaved,
  onToggleWatchlist,
}) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0c101c] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/10"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop Header */}
        <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden bg-slate-900">
          <img
            src={movie.backdrop || movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c101c] via-[#0c101c]/50 to-transparent" />

          {/* Quick Play Trigger button in backdrop */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => onPlayMovie(movie)}
              className="w-16 h-16 rounded-full bg-orange-500/90 hover:bg-orange-500 text-white flex items-center justify-center shadow-2xl shadow-orange-950/80 hover:scale-110 transition-transform"
            >
              <Play className="w-7 h-7 fill-white ml-1" />
            </button>
          </div>

          {/* Bottom Title on Backdrop */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500 text-white">
                {movie.quality}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-300" />
                IMDb {movie.rating}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30">
                {movie.matchScore}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-slate-800">
                {movie.ageRating}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white cinema-title">
              {movie.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-slate-800">
            <button
              onClick={() => onPlayMovie(movie)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Mastercut (4K)</span>
            </button>

            <button
              onClick={() => onToggleWatchlist(movie.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${
                isSaved
                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4 text-orange-400" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'Saved to Watchlist' : 'Add to Watchlist'}</span>
            </button>

            <div className="ml-auto text-xs text-slate-400 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {movie.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {movie.year}
              </span>
              {movie.boxOffice && (
                <span className="flex items-center gap-1.5 text-amber-300 font-mono">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  {movie.boxOffice}
                </span>
              )}
            </div>
          </div>

          {/* Synopsis & Quote */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Synopsis
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-4">
              {movie.synopsis}
            </p>

            {movie.quote && (
              <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 relative">
                <Quote className="w-5 h-5 text-orange-400/50 absolute top-3 left-3" />
                <p className="pl-6 text-xs sm:text-sm italic text-orange-200/90 font-serif">
                  “{movie.quote}”
                </p>
                <div className="text-[10px] font-mono text-orange-400/70 text-right mt-1">
                  — Leonardo DiCaprio as {movie.role}
                </div>
              </div>
            )}
          </div>

          {/* Cast & Crew Spotlight */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Principal Cast & Direction
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-orange-400 font-mono uppercase">Director</div>
                <div className="text-sm font-bold text-white truncate">{movie.director}</div>
                <div className="text-xs text-slate-400">Visionary Auteur</div>
              </div>

              {movie.cast.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                  {c.avatar ? (
                    <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                      {c.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{c.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{c.character}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Critical Acclaim */}
          {movie.awards && movie.awards.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Honors & Accolades</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.awards.map((award, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#111625] text-amber-200 border border-amber-500/30 flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {award}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
