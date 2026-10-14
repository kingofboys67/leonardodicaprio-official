'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clapperboard, Play, TrendingUp } from 'lucide-react';
import {
  BLOCKBUSTERS,
  CINEMA_MOMENTS,
  DIRECTORS,
  HOLLYWOOD_IMPACT,
  SCORSESE_RUN,
} from '../data/legacy';
import { MOVIES_DATA } from '../data/content';
import { FILM_IMPACT } from '../data/filmImpact';
import { useApp } from '../context/AppContext';

const poster = (id: string) => `/assets/posters/${id}.jpg`;
const fmt = (m: number) => (m >= 1000 ? `$${(m / 1000).toFixed(2)}B` : `$${m}M`);

export const HollywoodImpact: React.FC = () => {
  const { playMovie } = useApp();
  const [selected, setSelected] = useState(BLOCKBUSTERS[0].id);
  const [visible, setVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const sel = BLOCKBUSTERS.find((b) => b.id === selected) ?? BLOCKBUSTERS[0];
  const selMovie = MOVIES_DATA.find((m) => m.id === sel.id);
  const max = BLOCKBUSTERS[0].grossM;
  const total = BLOCKBUSTERS.reduce((s, b) => s + b.grossM, 0);

  return (
    <section className="pt-16 border-t border-[var(--border)]">
      {/* Heading */}
      <div className="max-w-3xl mb-10">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F28C28] mb-3">What he gave Hollywood</div>
        <h2 className="cinema-title text-3xl sm:text-5xl font-black text-[#141414] dark:text-white tracking-tight leading-tight">
          His mark on <span className="gold-text-gradient">cinema</span>
        </h2>
        <p className="mt-5 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
          Some actors have hits. Leonardo DiCaprio has had a run of films that people still argue about, quote and return
          to: a love story that broke every record, a dream-heist thriller no one saw coming, a mob epic that won Best
          Picture, and a survival drama that finally earned him an Oscar. Here is what that run looks like, film by film.
        </p>
      </div>

      {/* Interactive blockbuster chart */}
      <div ref={chartRef} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#F28C28] text-xs font-mono font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>The blockbusters</span>
            </div>
            <div className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mt-1">
              Over <span className="gold-text-gradient">${(total / 1000).toFixed(1)} billion</span> from just these {BLOCKBUSTERS.length} films
            </div>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] max-w-xs">
            Approximate worldwide box office, rounded. Tap any film to see why it mattered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bars */}
          <div className="lg:col-span-7 space-y-2">
            {BLOCKBUSTERS.map((b, i) => {
              const active = b.id === selected;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelected(b.id)}
                  className={`w-full text-left rounded-xl p-2 flex items-center gap-3 transition-colors cursor-pointer ${
                    active ? 'bg-[#F28C28]/10 ring-1 ring-[#F28C28]/50' : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  aria-pressed={active}
                >
                  <img src={poster(b.id)} alt="" className="w-9 h-[54px] rounded object-cover shrink-0 border border-[var(--border)]" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <span className="text-sm font-bold text-[#141414] dark:text-white truncate">{b.title}</span>
                      <span className="text-xs font-mono font-bold text-[#F28C28] shrink-0">{fmt(b.grossM)}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-[#F28C28] transition-all duration-1000 ease-out"
                        style={{ width: visible ? `${Math.max(4, (b.grossM / max) * 100)}%` : '0%', transitionDelay: `${i * 70}ms` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <div className="flex gap-4">
                <img src={poster(sel.id)} alt={`${sel.title} poster`} className="w-28 sm:w-32 aspect-[2/3] rounded-xl object-cover border border-[var(--border)] shadow-lg shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-mono text-[var(--text-muted)]">{sel.year}</div>
                  <div className="text-xl font-black text-[#141414] dark:text-white leading-tight mt-0.5">{sel.title}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    Directed by <span className="font-semibold text-[#141414] dark:text-white">{sel.director}</span>
                  </div>
                  <div className="mt-3 text-3xl font-black text-[#F28C28]">{fmt(sel.grossM)}</div>
                  <div className="text-[11px] text-[var(--text-muted)]">worldwide, approx.</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">{sel.hook}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selMovie && (
                  <button
                    onClick={() => playMovie(selMovie)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold cursor-pointer hover:scale-105 transition-transform"
                    style={{ color: '#FFFFFF' }}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch trailer</span>
                  </button>
                )}
                {FILM_IMPACT[sel.id] && (
                  <Link
                    to={`/film/${sel.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] hover:border-[#F28C28] text-xs font-semibold text-[#141414] dark:text-white transition-colors"
                  >
                    <span>Full story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moments that changed cinema */}
      <div className="mt-16">
        <h3 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mb-2">
          Moments that <span className="gold-text-gradient">changed the game</span>
        </h3>
        <p className="text-sm text-[var(--text-muted)] mb-8 max-w-2xl">Eight films, and what each one meant for audiences and for Hollywood.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CINEMA_MOMENTS.map((m) => {
            const hasPage = !!FILM_IMPACT[m.filmId];
            const Card = (
              <div className="group h-full flex gap-4 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[#F28C28]/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <img src={poster(m.filmId)} alt="" loading="lazy" className="w-24 sm:w-28 aspect-[2/3] rounded-xl object-cover shrink-0 border border-[var(--border)] group-hover:scale-[1.03] transition-transform" />
                <div className="min-w-0 flex flex-col">
                  <span className="self-start px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F28C28]/10 text-[#F28C28]">{m.stat}</span>
                  <div className="mt-2 text-lg font-bold text-[#141414] dark:text-white leading-snug">{m.title}</div>
                  <p className="mt-1.5 text-sm text-[var(--text-muted)] leading-relaxed">{m.body}</p>
                  {hasPage && (
                    <span className="mt-auto pt-3 text-xs font-bold text-[#F28C28] inline-flex items-center gap-1">
                      Read the full story <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </div>
              </div>
            );
            return hasPage ? (
              <Link key={m.filmId} to={`/film/${m.filmId}`} className="block">
                {Card}
              </Link>
            ) : (
              <div key={m.filmId}>{Card}</div>
            );
          })}
        </div>
      </div>

      {/* Scorsese run */}
      <div className="mt-16 rounded-3xl border border-[#F28C28]/30 bg-gradient-to-br from-[#14110c] via-[#101117] to-[#0c101c] p-6 sm:p-10 overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider" style={{ color: '#F5B66B' }}>
          <Clapperboard className="w-4 h-4" />
          <span>The Scorsese partnership</span>
        </div>
        <div className="cinema-title text-2xl sm:text-4xl font-black mt-2" style={{ color: '#FFFFFF' }}>
          Six films. Twenty-one years.
        </div>
        <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
          One of the great actor and director partnerships in film history, from Gangs of New York in 2002 to Killers
          of the Flower Moon in 2023. Each film took him somewhere new.
        </p>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 snap-x -mx-2 px-2">
          {SCORSESE_RUN.map((s, i) => {
            const hasPage = !!FILM_IMPACT[s.filmId];
            const inner = (
              <div className="w-56 shrink-0 snap-start group">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/15">
                  <img src={poster(s.filmId)} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-[#F28C28] text-white text-xs font-black flex items-center justify-center" style={{ color: '#FFFFFF' }}>
                    {i + 1}
                  </div>
                </div>
                <div className="mt-3 text-sm font-bold" style={{ color: '#FFFFFF' }}>{s.title}</div>
                <div className="text-[11px] font-mono" style={{ color: '#F5B66B' }}>{s.year}</div>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>{s.note}</p>
              </div>
            );
            return hasPage ? (
              <Link key={s.filmId} to={`/film/${s.filmId}`}>{inner}</Link>
            ) : (
              <div key={s.filmId}>{inner}</div>
            );
          })}
        </div>
      </div>

      {/* Directors */}
      <div className="mt-16">
        <h3 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mb-2">
          The directors he <span className="gold-text-gradient">worked with</span>
        </h3>
        <p className="text-sm text-[var(--text-muted)] mb-6 max-w-2xl">
          Part of his mark on cinema is the company he kept. Almost every major director of his generation has put him on screen.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {DIRECTORS.map((d) => (
            <div key={d.name} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="text-sm font-bold text-[#141414] dark:text-white leading-snug">{d.name}</div>
              <div className="text-[11px] text-[#F28C28] mt-1 leading-snug">{d.films}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What changed */}
      <div className="mt-16">
        <h3 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mb-6">
          What he <span className="gold-text-gradient">changed</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOLLYWOOD_IMPACT.map((h, i) => (
            <div key={h.title} className={`p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] ${i === 0 ? 'md:col-span-2' : ''}`}>
              <div className="font-mono text-xs font-bold text-[#F28C28] mb-1">0{i + 1}</div>
              <div className="text-base font-bold text-[#141414] dark:text-white leading-snug">{h.title}</div>
              <p className="mt-1.5 text-sm text-[var(--text-muted)] leading-relaxed">{h.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/filmography" className="inline-flex items-center gap-2 text-sm font-bold text-[#F28C28] hover:text-amber-500 group">
            <span>Explore every film in depth</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
