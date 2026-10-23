'use client';

import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Clapperboard,
  Clock,
  Coins,
  Film,
  Play,
  Star,
  Wallet,
  X,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Camera,
  CalendarDays,
  Share2,
} from 'lucide-react';
import { MOVIES_DATA } from '../data/content';
import { FILM_IMPACT } from '../data/filmImpact';
import { FILM_STILLS } from '../data/stills';
import { FILMOGRAPHY } from '../data/filmography';
import { FilmLitePage } from './FilmLitePage';
import { useApp } from '../context/AppContext';

const slugify = (n: string) =>
  n
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const CastPhoto: React.FC<{ name: string }> = ({ name }) => {
  const [failed, setFailed] = useState(false);
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return failed ? (
    <div className="w-16 h-20 rounded-lg shrink-0 flex items-center justify-center bg-[#F28C28]/15 text-[#F28C28] font-bold">
      {initials}
    </div>
  ) : (
    <img
      src={`/assets/cast/${slugify(name)}.jpg`}
      alt={name}
      loading="lazy"
      decoding="async"
      className="w-16 h-20 rounded-lg object-cover shrink-0 bg-black/10"
      onError={() => setFailed(true)}
    />
  );
};

export const FilmPage: React.FC = () => {
  const { id: routeId } = useParams<{ id: string }>();
  const liteEntry = FILMOGRAPHY.find((f) => f.id === routeId && !FILM_IMPACT[f.id]);
  if (liteEntry) return <FilmLitePage entry={liteEntry} />;
  return <FilmDeepPage />;
};

const FilmDeepPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playMovie, openQuoteCard } = useApp();
  const [posterFailed, setPosterFailed] = useState(false);
  const [stillIdx, setStillIdx] = useState<number | null>(null);

  const movie = MOVIES_DATA.find((m) => m.id === id);
  const info = id ? FILM_IMPACT[id] : undefined;

  useEffect(() => {
    setPosterFailed(false);
    setStillIdx(null);
    window.scrollTo(0, 0);
    if (movie) document.title = `${movie.title} | Leonardo DiCaprio Official`;
  }, [id, movie]);

  useEffect(() => {
    if (stillIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      const n = (FILM_STILLS[id ?? ''] ?? []).length;
      if (e.key === 'Escape') setStillIdx(null);
      else if (e.key === 'ArrowRight') setStillIdx((i) => (i === null ? i : (i + 1) % n));
      else if (e.key === 'ArrowLeft') setStillIdx((i) => (i === null ? i : (i - 1 + n) % n));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stillIdx, id]);

  if (!movie || !info) return <Navigate to="/filmography" replace />;

  const stills = FILM_STILLS[movie.id] ?? [];
  const films = MOVIES_DATA.filter((m) => FILM_IMPACT[m.id]);
  const idx = films.findIndex((m) => m.id === movie.id);
  const prev = films[(idx - 1 + films.length) % films.length];
  const next = films[(idx + 1) % films.length];

  const stats = [
    { icon: Coins, label: 'Worldwide gross', value: info.gross, note: info.grossNote },
    { icon: Wallet, label: 'Production budget', value: info.budget },
    { icon: Clock, label: 'Runtime', value: movie.duration },
    { icon: Star, label: 'Audience rating', value: `${movie.rating} / 10` },
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/filmography"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F28C28] hover:text-amber-500 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All films</span>
        </Link>

        {/* Header: poster + title block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="aspect-[2/3] max-w-xs mx-auto md:max-w-none rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#0c101c]">
              {!posterFailed ? (
                <img
                  src={`/assets/posters/${movie.id}.jpg`}
                  alt={`${movie.title} poster`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={() => setPosterFailed(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center cinema-title text-white text-xl font-black">
                  {movie.title}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-center">
            <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-[#F28C28] mb-4 border border-[#F28C28]/30">
              <Film className="w-3.5 h-3.5" />
              <span>FILM · {movie.year}</span>
            </div>
            <h1 className="cinema-title text-3xl sm:text-5xl font-black text-[#141414] dark:text-white tracking-tight leading-tight">
              {movie.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg italic font-serif text-[#F28C28]">{info.headline}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
              <span>
                Directed by <strong className="text-[#141414] dark:text-white">{info.director}</strong>
              </span>
              <span>{movie.genres.join(' · ')}</span>
              <span>{movie.ageRating}</span>
            </div>

            <p className="mt-5 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-3xl">
              {movie.synopsis}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => playMovie(movie)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-500/30 hover:scale-105 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Numbers */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <s.icon className="w-5 h-5 text-[#F28C28] mb-3" />
              <div className="text-xl sm:text-2xl font-black text-[#141414] dark:text-white">{s.value}</div>
              <div className="text-xs font-mono text-[var(--text-muted)] mt-1">{s.label}</div>
              {s.note && <p className="text-[11px] text-[var(--text-muted)] mt-2 leading-snug">{s.note}</p>}
            </div>
          ))}
        </div>


        {/* Stills from the film */}
        {stills.length > 0 && (
          <div className="mt-14">
            <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mb-6">
              Scenes from the <span className="gold-text-gradient">film</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stills.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setStillIdx(i)}
                  className={`group relative overflow-hidden rounded-xl border border-[var(--border)] bg-black/10 cursor-zoom-in ${
                    i === 0 ? 'col-span-2 row-span-2 aspect-video md:aspect-auto' : 'aspect-video'
                  }`}
                  aria-label={`Open still ${i + 1} from ${movie.title}`}
                >
                  <img
                    src={src}
                    alt={`Still ${i + 1} from ${movie.title}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {info.byTheNumbers && (
          <div className="mt-14">
            <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mb-6">
              By the <span className="gold-text-gradient">numbers</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {info.byTheNumbers.map((n) => (
                <div key={n.label} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#F28C28]">{n.value}</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">{n.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Impact + honors */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mb-5">
              Why it <span className="gold-text-gradient">matters</span>
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {info.impact.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mt-12 mb-5">
              Leonardo&apos;s <span className="gold-text-gradient">performance</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">{info.leoRole}</p>
            {movie?.quote && (
              <div className="mt-6">
                <blockquote className="pl-5 border-l-4 border-[#F28C28] italic font-serif text-lg text-[#141414] dark:text-white">
                  “{movie.quote}”
                </blockquote>
                <button
                  onClick={() =>
                    openQuoteCard({
                      id: movie.id,
                      text: movie.quote,
                      source: `${movie.title} (${movie.year})`,
                      context: `Directed by ${movie.director} · Leonardo as ${movie.role}`,
                    })
                  }
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:text-orange-300 text-xs font-mono font-medium transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Quote Card</span>
                </button>
              </div>
            )}

            {info.behindTheScenes && (
              <>
                <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mt-12 mb-5 flex items-center gap-3">
                  <Camera className="w-6 h-6 text-[#F28C28]" />
                  <span>Behind the <span className="gold-text-gradient">scenes</span></span>
                </h2>
                <div className="space-y-5">
                  {info.behindTheScenes.map((b) => (
                    <div key={b.title} className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                      <div className="font-bold text-[#141414] dark:text-white">{b.title}</div>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-2">{b.body}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {info.timeline && (
              <>
                <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mt-12 mb-5 flex items-center gap-3">
                  <CalendarDays className="w-6 h-6 text-[#F28C28]" />
                  <span>The <span className="gold-text-gradient">timeline</span></span>
                </h2>
                <ol className="relative border-l-2 border-[#F28C28]/40 ml-2 space-y-5">
                  {info.timeline.map((t) => (
                    <li key={t.when} className="pl-6 relative">
                      <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#F28C28]" />
                      <div className="text-xs font-mono font-bold text-[#F28C28]">{t.when}</div>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t.what}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {info.didYouKnow && (
              <div className="mt-12 p-6 rounded-2xl border border-[#F28C28]/40 bg-[#F28C28]/5">
                <div className="flex items-center gap-2 text-[#F28C28] mb-4">
                  <Lightbulb className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wide">Did you know?</span>
                </div>
                <ul className="space-y-3 text-sm text-[var(--text-muted)] leading-relaxed">
                  {info.didYouKnow.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F28C28] shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-4 text-[#F28C28]">
                <Award className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">Honors</h3>
              </div>
              <ul className="space-y-3 text-sm text-[var(--text-muted)] leading-snug">
                {info.honors.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F28C28] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-3 text-[#F28C28]">
                <Clapperboard className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">Director</h3>
              </div>
              <div className="text-lg font-bold text-[#141414] dark:text-white">{info.director}</div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-2">{info.directorNote}</p>
              <p className="text-[11px] font-mono text-[var(--text-muted)] mt-4">{info.studio}</p>
            </div>
          </aside>
        </div>

        {/* Cast */}
        <h2 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mt-14 mb-6">
          Cast &amp; <span className="gold-text-gradient">credits</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {info.cast.map((c) => (
            <div
              key={c.name}
              className={`p-3 rounded-xl border flex items-center gap-4 ${
                c.isLeo
                  ? 'border-[#F28C28]/60 bg-[#F28C28]/5'
                  : 'border-[var(--border)] bg-[var(--surface)]'
              }`}
            >
              <CastPhoto name={c.name} />
              <div className="min-w-0">
                <div className="font-bold text-[#141414] dark:text-white leading-snug">{c.name}</div>
                <div className="text-xs text-[#F28C28] mt-0.5">as {c.character}</div>
                {c.note && <div className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-snug">{c.note}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Prev / next */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex items-center justify-between gap-4">
          <Link
            to={`/film/${prev.id}`}
            className="group flex items-center gap-3 text-sm font-bold text-[#141414] dark:text-white hover:text-[#F28C28]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{prev.title}</span>
          </Link>
          <Link
            to={`/film/${next.id}`}
            className="group flex items-center gap-3 text-sm font-bold text-[#141414] dark:text-white hover:text-[#F28C28] text-right"
          >
            <span>{next.title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {stillIdx !== null && stills[stillIdx] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setStillIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-[#F28C28] flex items-center justify-center text-white cursor-pointer"
            onClick={() => setStillIdx(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F28C28] flex items-center justify-center text-white cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setStillIdx((stillIdx - 1 + stills.length) % stills.length);
            }}
            aria-label="Previous still"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <img
            src={stills[stillIdx]}
            alt={`Still ${stillIdx + 1} from ${movie.title}`}
            className="max-h-[88vh] max-w-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F28C28] flex items-center justify-center text-white cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setStillIdx((stillIdx + 1) % stills.length);
            }}
            aria-label="Next still"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
