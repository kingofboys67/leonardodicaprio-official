import React, { useState, useEffect } from 'react';
import {
  Play,
  Film,
  Info,
  Bookmark,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { Movie } from '../../data/content';

interface HeroBillboardProps {
  featuredMovies: Movie[];
  onPlayMovie: (movie: Movie) => void;
  onOpenDetail: (movie: Movie) => void;
  watchlist: string[];
  onToggleWatchlist: (movieId: string) => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  featuredMovies,
  onPlayMovie,
  onOpenDetail,
  watchlist,
  onToggleWatchlist,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMovie = featuredMovies[currentIndex] || featuredMovies[0];

  // Auto rotate every 8 seconds if user hasn't clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  if (!currentMovie) return null;

  const isSaved = watchlist.includes(currentMovie.id);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#0a0e19] border border-slate-800/80 shadow-2xl mb-10 group">
      {/* Cinematic Backdrop Image with soft motion */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
        <img
          key={currentMovie.id}
          src={currentMovie.backdrop || currentMovie.image}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center animate-in fade-in zoom-in-105 duration-1000 scale-[1.02]"
        />

        {/* Multi-directional gradient vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b11] via-[#080b11]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b11]/50 via-transparent to-transparent" />
      </div>

      {/* Floating Carousel Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-orange-500/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 hover:scale-110"
        aria-label="Previous featured movie"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-orange-500/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 hover:scale-110"
        aria-label="Next featured movie"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Billboard Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12 z-10 max-w-3xl">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[11px] font-black uppercase tracking-wider shadow-lg shadow-orange-500/40">
            <Flame className="w-3.5 h-3.5 fill-white" />
            #1 IN MOVIES TODAY
          </span>

          <span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            IMDb {currentMovie.rating}
          </span>

          <span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-slate-200 text-xs font-mono border border-white/10">
            {currentMovie.quality}
          </span>

          <span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-slate-200 text-xs font-mono border border-white/10">
            {currentMovie.audio}
          </span>

          <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-orange-400 font-bold text-xs border border-orange-500/30">
            {currentMovie.ageRating}
          </span>
        </div>

        {/* Movie Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-3 drop-shadow-xl cinema-title">
          {currentMovie.title}
        </h1>

        {/* Tagline */}
        {currentMovie.tagline && (
          <p className="text-sm sm:text-base font-medium italic text-orange-300/90 mb-2">
            “{currentMovie.tagline}”
          </p>
        )}

        {/* Metadata info row */}
        <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium mb-3">
          <span className="text-emerald-400 font-semibold">{currentMovie.matchScore}</span>
          <span>•</span>
          <span>{currentMovie.year}</span>
          <span>•</span>
          <span>{currentMovie.duration}</span>
          <span>•</span>
          <span className="text-slate-400">Dir. {currentMovie.director}</span>
        </div>

        {/* Synopsis excerpt */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-3 mb-6 font-light">
          {currentMovie.synopsis}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Watch Now Button (Ronas IT Cinema Orange) */}
          <button
            onClick={() => onPlayMovie(currentMovie)}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-200"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Watch Now</span>
          </button>

          {/* Watch Trailer */}
          <button
            onClick={() => onPlayMovie(currentMovie)}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm border border-white/20 hover:border-white/30 transition-all duration-200"
          >
            <Film className="w-4 h-4" />
            <span>Trailer</span>
          </button>

          {/* Add to Watchlist */}
          <button
            onClick={() => onToggleWatchlist(currentMovie.id)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-xl backdrop-blur-md border text-sm font-medium transition-all ${
              isSaved
                ? 'bg-orange-500/20 border-orange-500/60 text-orange-300 shadow-md shadow-orange-950/40'
                : 'bg-black/40 hover:bg-black/60 border-white/15 text-slate-200 hover:text-white'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4 text-orange-400" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden sm:inline">{isSaved ? 'In Watchlist' : '+ Watchlist'}</span>
          </button>

          {/* Detail Modal trigger */}
          <button
            onClick={() => onOpenDetail(currentMovie)}
            className="w-11 h-11 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            title="Film Synopsis & Awards"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Indicator Pills */}
      <div className="absolute right-6 sm:right-10 bottom-6 sm:bottom-10 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {featuredMovies.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Jump to ${m.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-7 bg-orange-500 shadow-md shadow-orange-500/60' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
