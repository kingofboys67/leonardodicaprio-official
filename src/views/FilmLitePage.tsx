'use client';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Film, Play, Star, X, ChevronLeft, ChevronRight, Tv } from 'lucide-react';
import { FILMOGRAPHY, FilmographyEntry } from '../data/filmography';
import { FILM_WHY } from '../data/filmWhy';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { getMovieSchema, getBreadcrumbSchema } from '../utils/schema';

const KIND_LABEL: Record<FilmographyEntry['kind'], string> = { film: 'Film', series: 'TV series', documentary: 'Documentary' };

const CastPhoto: React.FC<{ src: string | null; name: string }> = ({ src, name }) => {
  const [failed, setFailed] = useState(!src);
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return failed ? (
    <div className="w-16 h-20 rounded-lg shrink-0 flex items-center justify-center bg-[#F28C28]/15 text-[#F28C28] font-bold">{initials}</div>
  ) : (
    <img src={src ?? ''} alt={name} loading="lazy" className="w-16 h-20 rounded-lg object-cover shrink-0 bg-black/10" onError={() => setFailed(true)} />
  );
};

/** Detail page for titles that do not have a full editorial write-up. */
export const FilmLitePage: React.FC<{ entry: FilmographyEntry }> = ({ entry }) => {
  const { playTrailerById } = useApp();
  const [posterFailed, setPosterFailed] = useState(!entry.poster);
  const [stillIdx, setStillIdx] = useState<number | null>(null);

  useEffect(() => {
    setPosterFailed(!entry.poster);
    setStillIdx(null);
    window.scrollTo(0, 0);
  }, [entry]);

  useEffect(() => {
    if (stillIdx === null) return;
    const n = entry.stills.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStillIdx(null);
      else if (e.key === 'ArrowRight') setStillIdx((i) => (i === null ? i : (i + 1) % n));
      else if (e.key === 'ArrowLeft') setStillIdx((i) => (i === null ? i : (i - 1 + n) % n));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stillIdx, entry.stills.length]);

  const why = FILM_WHY[entry.id];
  const sameKind = FILMOGRAPHY.slice().sort((a, b) => a.year - b.year);
  const idx = sameKind.findIndex((f) => f.id === entry.id);
  const prev = sameKind[(idx - 1 + sameKind.length) % sameKind.length];
  const next = sameKind[(idx + 1) % sameKind.length];

  const facts = [
    entry.release && { icon: Calendar, label: entry.kind === 'series' ? 'Series began' : 'Released', value: entry.release.replace(/\s*\(.*\)/, '') },
    entry.runtime && { icon: Clock, label: 'Runtime', value: entry.runtime },
    entry.score && { icon: Star, label: 'Audience score', value: `${entry.score.toFixed(1)} / 10` },
    { icon: entry.kind === 'series' ? Tv : Film, label: 'Type', value: KIND_LABEL[entry.kind] },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; label: string; value: string }[];

  const movieSchema = getMovieSchema({
    id: entry.id,
    title: entry.title,
    year: entry.year,
    director: entry.director,
    role: entry.role,
    synopsis: entry.synopsis,
    genres: entry.genres,
    duration: entry.runtime || undefined,
    image: entry.poster || undefined,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Filmography', path: '/filmography' },
    { name: entry.title, path: `/film/${entry.id}` },
  ]);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <SEOHead
        title={`${entry.title} (${entry.year}) | Leonardo DiCaprio Official`}
        description={`${entry.title} (${entry.year}) — Leonardo DiCaprio as ${entry.role}. ${entry.synopsis}`}
        type="video.other"
        jsonLd={[movieSchema, breadcrumbSchema]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/filmography" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F28C28] hover:text-amber-500 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>All films</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="aspect-[2/3] max-w-xs mx-auto md:max-w-none rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#0c101c]">
              {!posterFailed ? (
                <img src={entry.poster ?? ''} alt={`${entry.title} poster`} className="w-full h-full object-cover" onError={() => setPosterFailed(true)} />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center cinema-title text-white text-xl font-black">{entry.title}</div>
              )}
            </div>
          </div>
          <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-center">
            <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-[#F28C28] mb-4 border border-[#F28C28]/30">
              <Film className="w-3.5 h-3.5" />
              <span>{KIND_LABEL[entry.kind].toUpperCase()} · {entry.year}</span>
            </div>
            <h1 className="cinema-title text-3xl sm:text-5xl font-black text-[#141414] dark:text-white tracking-tight leading-tight">{entry.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
              <span>
                {entry.kind === 'series' ? '' : 'Directed by '}
                <strong className="text-[#141414] dark:text-white">{entry.director}</strong>
              </span>
              {entry.genres.length > 0 && <span>{entry.genres.join(' · ')}</span>}
            </div>
            <p className="mt-5 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-3xl">{entry.synopsis}</p>
            <div className="mt-4 text-base text-[#F28C28]">Leonardo as {entry.role}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              {entry.trailer && (
                <button
                  onClick={() => playTrailerById(entry.id, entry.title, `${entry.year} • ${entry.director}`)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-500/30 hover:scale-105 transition-all cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Trailer</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <s.icon className="w-5 h-5 text-[#F28C28] mb-3" />
              <div className="text-xl font-black text-[#141414] dark:text-white">{s.value}</div>
              <div className="text-xs font-mono text-[var(--text-muted)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>


        {why && (
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mb-5">
                Why it <span className="gold-text-gradient">matters</span>
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                {why.why.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[#F28C28]/40">
                <div className="text-sm font-bold uppercase tracking-wide text-[#F28C28] mb-3">
                  {entry.kind === 'documentary' ? "Leonardo's role" : "Leonardo's performance"}
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{why.performance}</p>
              </div>
            </aside>
          </div>
        )}

        {entry.stills.length > 0 && (
          <div className="mt-14">
            <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mb-6">
              Scenes from the <span className="gold-text-gradient">film</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {entry.stills.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setStillIdx(i)}
                  className={`group relative overflow-hidden rounded-xl border border-[var(--border)] bg-black/10 cursor-zoom-in ${i === 0 ? 'col-span-2 row-span-2 aspect-video md:aspect-auto' : 'aspect-video'}`}
                  aria-label={`Open still ${i + 1} from ${entry.title}`}
                >
                  <img src={src} alt={`Still ${i + 1} from ${entry.title}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </button>
              ))}
            </div>
          </div>
        )}

        {entry.cast.length > 0 && (
          <>
            <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mt-14 mb-6">
              {entry.kind === 'series' ? 'Cast' : <>Cast &amp; <span className="gold-text-gradient">credits</span></>}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {entry.cast.map((c) => {
                const isLeo = c.name === 'Leonardo DiCaprio';
                return (
                  <div key={c.name} className={`p-3 rounded-xl border flex items-center gap-4 ${isLeo ? 'border-[#F28C28]/60 bg-[#F28C28]/5' : 'border-[var(--border)] bg-[var(--surface)]'}`}>
                    <CastPhoto src={c.photo} name={c.name} />
                    <div className="min-w-0">
                      <div className="font-bold text-[#141414] dark:text-white leading-snug">{c.name}</div>
                      {c.character && <div className="text-xs text-[#F28C28] mt-0.5">as {c.character}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-16 pt-8 border-t border-[var(--border)] flex items-center justify-between gap-4">
          <Link to={`/film/${prev.id}`} className="group flex items-center gap-3 text-sm font-bold text-[#141414] dark:text-white hover:text-[#F28C28]">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{prev.title}</span>
          </Link>
          <Link to={`/film/${next.id}`} className="group flex items-center gap-3 text-sm font-bold text-[#141414] dark:text-white hover:text-[#F28C28] text-right">
            <span>{next.title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {stillIdx !== null && entry.stills[stillIdx] && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setStillIdx(null)} role="dialog" aria-modal="true">
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-[#F28C28] flex items-center justify-center text-white cursor-pointer" onClick={() => setStillIdx(null)} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F28C28] flex items-center justify-center text-white cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setStillIdx((stillIdx - 1 + entry.stills.length) % entry.stills.length); }}
            aria-label="Previous still"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <img src={entry.stills[stillIdx]} alt={`Still ${stillIdx + 1} from ${entry.title}`} className="max-h-[88vh] max-w-full rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <button
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F28C28] flex items-center justify-center text-white cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setStillIdx((stillIdx + 1) % entry.stills.length); }}
            aria-label="Next still"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
