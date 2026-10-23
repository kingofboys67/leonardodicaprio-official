'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ExternalLink, Globe2, Heart, Quote, Sparkles, Star } from 'lucide-react';
import {
  CARES,
  LEGACY_ERAS,
  LegacyEra,
  PHILOSOPHY,
  REMEMBERED,
  WIKIPEDIA_LINKS,
} from '../data/legacy';
import { HollywoodImpact } from './HollywoodImpact';

const SectionHeading: React.FC<{ kicker: string; children: React.ReactNode; intro?: string }> = ({
  kicker,
  children,
  intro,
}) => (
  <div className="max-w-3xl mb-10">
    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F28C28] mb-3">{kicker}</div>
    <h2 className="cinema-title text-3xl sm:text-4xl font-black text-[#141414] dark:text-white tracking-tight">
      {children}
    </h2>
    {intro && <p className="mt-4 text-base text-[var(--text-muted)] leading-relaxed">{intro}</p>}
  </div>
);

const Photo: React.FC<{ src: string; caption: string; focus?: string; credit?: string; className?: string }> = ({
  src,
  caption,
  focus,
  credit,
  className = '',
}) => (
  <figure className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-black/10 ${className}`}>
    <img
      src={src}
      alt={caption}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      style={{ objectPosition: focus }}
    />
    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
      <figcaption className="text-[11px] sm:text-xs leading-snug" style={{ color: '#FFFFFF' }}>
        {caption}
        {credit && <span className="block mt-0.5 text-[10px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{credit}</span>}
      </figcaption>
    </div>
  </figure>
);

const Era: React.FC<{ era: LegacyEra; index: number }> = ({ era, index }) => {
  const n = era.images.length;
  const grid =
    n === 1
      ? 'grid-cols-1'
      : n === 2
      ? 'grid-cols-2'
      : n === 3
      ? 'grid-cols-2'
      : 'grid-cols-2';
  return (
    <article className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 border-t border-[var(--border)]">
      <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="font-mono text-sm font-bold text-[#F28C28] mb-2">{era.years}</div>
        <h3 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white leading-tight">
          {era.title}
        </h3>
        <p className="mt-3 text-base italic font-serif text-[#F28C28]">{era.summary}</p>
        <div className="mt-5 space-y-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          {era.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-6">
          <Link
            to={`/legacy/${era.id}`}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#F28C28] hover:text-amber-400 group"
          >
            <span>Explore {era.years} chapter &amp; archive</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      <div className={`lg:col-span-7 grid ${grid} gap-3 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        {era.images.map((img, i) => (
          <Photo
            key={img.src}
            {...img}
            className={`${i === 0 && n % 2 === 1 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
          />
        ))}
      </div>
    </article>
  );
};

export const LegacyStory: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Opening */}
      <section className="py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] max-w-sm mx-auto lg:max-w-none rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
            <img src="/assets/portraits/studio-portrait.jpg" alt="Leonardo DiCaprio" className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }} />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono text-[#F28C28] mb-4 border border-[#F28C28]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HIS LEGACY</span>
          </div>
          <h2 className="cinema-title text-3xl sm:text-5xl font-black text-[#141414] dark:text-white tracking-tight leading-tight">
            A life in <span className="gold-text-gradient">film</span>, and a voice for the <span className="emerald-text-gradient">planet</span>
          </h2>
          <div className="mt-6 space-y-4 text-base text-[var(--text-muted)] leading-relaxed">
            <p>
              Leonardo Wilhelm DiCaprio was born in Los Angeles on November 11, 1974. His father, George, was an
              underground comics artist and distributor, and his mother, Irmelin, worked as a legal secretary. His
              parents separated when he was very young, and he grew up with his mother in a Los Angeles that was a long
              way from the glamour of the film business he would one day define.
            </p>
            <p>
              He started working as a child actor, landed a film role at sixteen, and was nominated for an Oscar at
              nineteen. Over the three decades since, he has become one of the best-known and most respected actors in
              the world, and one of the most prominent voices in the fight to protect nature.
            </p>
            <p>
              This page tells his story: where he began, how he became the artist he is, what he has meant to Hollywood,
              what he believes, and what he is most likely to be remembered for.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ['1974', 'Born in Los Angeles'],
              ['30+', 'years on screen'],
              ['6', 'films with Scorsese'],
              ['1998', 'Foundation founded'],
            ].map(([v, l]) => (
              <div key={l} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-center">
                <div className="text-2xl font-black text-[#F28C28]">{v}</div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From where he started to where he is */}
      <section className="pt-6">
        <SectionHeading kicker="From where he started to where he is" intro="Six chapters, from a young actor in Los Angeles to one of the defining figures of modern cinema.">
          The <span className="gold-text-gradient">journey</span>
        </SectionHeading>
        {LEGACY_ERAS.map((era, i) => (
          <Era key={era.id} era={era} index={i} />
        ))}
      </section>

      {/* What he did for Hollywood */}
      <HollywoodImpact />

      {/* Philosophy */}
      <section className="pt-20">
        <SectionHeading kicker="What he believes" intro="Patterns that show up in the way he works and the way he lives.">
          His <span className="gold-text-gradient">philosophy</span>
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PHILOSOPHY.map((p, i) => (
            <div key={p.title} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <div className="font-mono text-xs font-bold text-[#F28C28] mb-2">0{i + 1}</div>
              <div className="text-lg font-bold text-[#141414] dark:text-white leading-snug">{p.title}</div>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-8 sm:p-10 rounded-3xl border border-[#F28C28]/30 bg-gradient-to-br from-[#14110c] via-[#101117] to-[#0c101c] relative overflow-hidden">
          <Quote className="absolute -bottom-8 -right-4 w-40 h-40 text-white/[0.04]" />
          <div className="relative max-w-3xl">
            <p className="cinema-title text-xl sm:text-2xl italic leading-relaxed" style={{ color: '#FFFFFF' }}>
              Accepting the Academy Award in 2016, he called climate change “the most urgent threat facing our entire species.”
            </p>
            <div className="mt-4 text-xs font-mono uppercase tracking-widest" style={{ color: '#F5B66B' }}>
              Leonardo DiCaprio · Oscars, 2016
            </div>
          </div>
        </div>
      </section>

      {/* What he cares about */}
      <section className="pt-20">
        <SectionHeading kicker="What matters most to him" intro="The causes and ideas he returns to again and again.">
          What he <span className="emerald-text-gradient">cares about</span>
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CARES.map((c) => (
            <div key={c.title} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold text-[#141414] dark:text-white">{c.title}</div>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/charity" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-500 hover:text-emerald-400 group">
            <span>See his conservation work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>


      {/* Further reading on Wikipedia */}
      <section className="pt-20">
        <SectionHeading kicker="Go deeper" intro="Wikipedia, the free encyclopedia, has detailed articles on his life and work. These links open in a new tab.">
          Read more on <span className="gold-text-gradient">Wikipedia</span>
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WIKIPEDIA_LINKS.map((w) => (
            <a
              key={w.href}
              href={w.href}
              target="_blank"
              rel="noopener"
              className="group flex items-start gap-3 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[#F28C28]/60 hover:-translate-y-0.5 transition-all"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-[#F28C28]/10 text-[#F28C28] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-[#141414] dark:text-white leading-snug flex items-center gap-1.5">
                  <span>{w.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 shrink-0" />
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{w.note}</div>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-4 text-[11px] font-mono text-[var(--text-muted)]">
          Articles are from Wikipedia and are shared under the Creative Commons Attribution-ShareAlike licence.
        </p>
      </section>

      {/* How he will be remembered */}
      <section className="pt-20">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-12 shadow-sm">
          <SectionHeading kicker="The legacy" intro="When people talk about Leonardo DiCaprio's legacy, these are the things most likely to be remembered.">
            How he will be <span className="gold-text-gradient">remembered</span>
          </SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {REMEMBERED.map((r) => (
              <div key={r.title} className="p-5 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
                <Star className="w-5 h-5 text-[#F28C28] mb-3" />
                <div className="text-sm font-bold text-[#141414] dark:text-white leading-snug">{r.title}</div>
                <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base text-[var(--text-muted)] leading-relaxed">
            An actor who grew up in the film business and then became one of its great modern figures. A performer who
            refused to repeat himself. And a public figure who spent much of his influence defending the natural world.
            That combination, of art that moves people and a life spent trying to protect something larger than
            himself, is what is likely to last.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/charity#pledge"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all"
              style={{ color: '#FFFFFF' }}
            >
              <Heart className="w-4 h-4" />
              <span>Carry the legacy forward: take the pledge</span>
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] hover:border-[#F28C28] text-sm font-semibold text-[#141414] dark:text-white transition-all"
            >
              <span>Browse the photo gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
