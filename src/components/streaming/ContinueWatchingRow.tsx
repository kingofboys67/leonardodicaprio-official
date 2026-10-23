import React from 'react';
import { Play, Clock, RotateCcw } from 'lucide-react';
import { Movie } from '../../data/content';

interface ContinueWatchingRowProps {
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
  onOpenDetail: (movie: Movie) => void;
}

export const ContinueWatchingRow: React.FC<ContinueWatchingRowProps> = ({
  movies,
  onPlayMovie,
}) => {
  const continueItems = movies.filter((m) => m.continueWatching);

  if (continueItems.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <RotateCcw className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Continue <span className="text-orange-500">Watching</span>
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
            {continueItems.length} in progress
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {continueItems.map((movie) => {
          const cw = movie.continueWatching!;

          return (
            <div
              key={movie.id}
              onClick={() => onPlayMovie(movie)}
              className="group relative rounded-2xl overflow-hidden bg-[#111625] border border-slate-800/80 hover:border-orange-500/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-orange-950/30 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <img
                  src={movie.backdrop || movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-black/40 to-transparent" />

                {/* Center Hover Play Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500/90 group-hover:bg-orange-500 text-white flex items-center justify-center shadow-xl shadow-orange-950/80 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Remaining badge */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-slate-200 text-[10px] font-mono flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-orange-400" />
                  <span>{cw.remaining}</span>
                </div>

                {/* Progress Bar Container at the bottom of the image */}
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500"
                    style={{ width: `${cw.progress}%` }}
                  />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors truncate">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    {cw.lastWatchedEpisode || movie.genres.join(' • ')}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono font-bold text-orange-400">
                    {cw.progress}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
