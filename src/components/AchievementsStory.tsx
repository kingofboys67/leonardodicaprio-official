'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ExternalLink, Globe2, Home, Medal, Star, Trophy, Users } from 'lucide-react';
import {
  ACHIEVEMENT_TIMELINE,
  AWARD_BODIES,
  CAREER_RECORDS,
  DOCUMENTARIES,
  FAMILY_ROOTS,
  PLANET_FACTS,
  PRESENCE,
  SOURCES,
} from '../data/achievements';

const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, seen };
};

const CountUp: React.FC<{ to: number; run: boolean }> = ({ to, run }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
};

const Heading: React.FC<{ kicker: string; children: React.ReactNode; intro?: string }> = ({ kicker, children, intro }) => (
  <div className="max-w-3xl mb-8">
    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F28C28] mb-3">{kicker}</div>
    <div role="heading" aria-level={2} className="cinema-title text-3xl sm:text-4xl font-black text-[#141414] dark:text-white tracking-tight">
      {children}
    </div>
    {intro && <p className="mt-3 text-base text-[var(--text-muted)] leading-relaxed">{intro}</p>}
  </div>
);

const KINDS = [
  ['all', 'Everything'],
  ['award', 'Awards'],
  ['honour', 'Honours'],
  ['planet', 'Planet'],
] as const;

const KIND_STYLE: Record<string, string> = {
  award: 'bg-[#F28C28]/10 text-[#F28C28]',
  honour: 'bg-purple-500/10 text-purple-500',
  planet: 'bg-emerald-500/10 text-emerald-500',
  career: 'bg-sky-500/10 text-sky-500',
};
const KIND_LABEL: Record<string, string> = { award: 'Award', honour: 'Honour', planet: 'Planet', career: 'Career' };

export const AchievementsStory: React.FC = () => {
  const [kind, setKind] = useState<(typeof KINDS)[number][0]>('all');
  const stats = useInView();
  const timeline = ACHIEVEMENT_TIMELINE.filter((m) => kind === 'all' || m.kind === kind);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Headline numbers */}
      <section className="py-12 sm:py-16" ref={stats.ref}>
        <Heading kicker="The numbers" intro="Totals for his major acting awards, as listed on Wikipedia.">
          A career in <span className="gold-text-gradient">awards</span>
        </Heading>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {AWARD_BODIES.map((a) => (
            <div key={a.name} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <div className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase tracking-wide leading-snug min-h-[2.5rem]">{a.name}</div>
              <div className="mt-3 flex items-end gap-4">
                <div>
                  <div className="text-4xl font-black text-[#F28C28] leading-none"><CountUp to={a.wins} run={stats.seen} /></div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-1">{a.wins === 1 ? 'win' : 'wins'}</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#141414] dark:text-white leading-none"><CountUp to={a.nominations} run={stats.seen} /></div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-1">nominations</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-5 rounded-2xl border border-[#F28C28]/40 bg-[#F28C28]/5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
          <div>
            <div className="text-3xl font-black text-[#F28C28]">124 wins · 354 nominations</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">Across every award and festival listed on his Wikipedia awards page</div>
          </div>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            He also won the Berlin Film Festival’s Silver Bear for Best Actor, MTV Movie Awards for Titanic, The Aviator and The Revenant, and a People’s Choice Award.
          </p>
        </div>
      </section>

      {/* Award bodies detail */}
      <section className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AWARD_BODIES.map((a) => (
            <div key={a.name} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-2 text-[#F28C28] mb-3">
                <Trophy className="w-4 h-4" />
                <div className="text-sm font-bold text-[#141414] dark:text-white">{a.name}</div>
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] leading-snug">
                {a.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F28C28] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex justify-between items-center">
                <Link
                  to={
                    a.name.includes('Academy')
                      ? '/achievements/academy-awards'
                      : a.name.includes('Golden Globe')
                      ? '/achievements/golden-globes'
                      : a.name.includes('BAFTA')
                      ? '/achievements/bafta-awards'
                      : a.name.includes('Screen Actors Guild')
                      ? '/achievements/sag-awards'
                      : '/achievements/critics-choice'
                  }
                  className="text-xs font-mono font-bold text-[#F28C28] hover:text-amber-400 inline-flex items-center gap-1.5"
                >
                  <span>Explore full record &amp; nominations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="pt-20">
        <Heading kicker="Year by year" intro="The milestones, honours and turning points, from his first Oscar nomination to today.">
          His <span className="gold-text-gradient">milestones</span>
        </Heading>
        <div className="flex flex-wrap gap-2 mb-8">
          {KINDS.map(([k, label]) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                kind === k ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text)]'
              }`}
              style={kind === k ? { color: '#FFFFFF' } : undefined}
            >
              {label}
            </button>
          ))}
        </div>
        <ol className="relative border-l-2 border-[#F28C28]/30 ml-3 space-y-6">
          {timeline.map((m, i) => (
            <li key={`${m.year}-${m.title}-${i}`} className="pl-7 relative">
              <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[#F28C28]" />
              <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[#F28C28]/50 transition-colors">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#F28C28]">{m.year}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${KIND_STYLE[m.kind]}`}>{KIND_LABEL[m.kind]}</span>
                </div>
                <div className="mt-1.5 text-lg font-bold text-[#141414] dark:text-white leading-snug">{m.title}</div>
                <p className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Records */}
      <section className="pt-20">
        <Heading kicker="Records" intro="Numbers that show the reach of his films.">
          By the <span className="gold-text-gradient">numbers</span>
        </Heading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CAREER_RECORDS.map((r) => (
            <div key={r.label} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <Medal className="w-5 h-5 text-[#F28C28] mb-3" />
              <div className="text-3xl font-black text-[#141414] dark:text-white">{r.value}</div>
              <p className="text-sm text-[var(--text-muted)] mt-1 leading-snug">{r.label}</p>
              <p className="text-[11px] font-mono text-[var(--text-muted)] mt-2">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planet */}
      <section className="pt-20">
        <Heading kicker="Beyond the screen" intro="His work for the planet, which many count as his greatest achievement.">
          Environmental <span className="emerald-text-gradient">leadership</span>
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANET_FACTS.map((p) => (
            <div key={p.label} className="p-5 rounded-2xl bg-[var(--surface)] border border-emerald-500/25">
              <Globe2 className="w-5 h-5 text-emerald-500 mb-3" />
              <div className="text-3xl font-black text-emerald-500">{p.value}</div>
              <div className="text-sm font-bold text-[#141414] dark:text-white mt-1 leading-snug">{p.label}</div>
              <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <div className="text-sm font-bold text-[#141414] dark:text-white mb-3">Documentaries he produced, narrated or hosted</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-[var(--text-muted)]">
            {DOCUMENTARIES.map((d) => (
              <li key={d.title} className="flex gap-3">
                <span className="font-mono text-[#F28C28] shrink-0">{d.year}</span>
                <span>
                  <span className="font-semibold text-[#141414] dark:text-white">{d.title}</span>, {d.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Link to="/charity" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-500 hover:text-emerald-400 group">
            <span>See his conservation work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Family roots */}
      <section className="pt-20">
        <Heading kicker="Where he comes from" intro={FAMILY_ROOTS.intro}>
          Family <span className="gold-text-gradient">roots</span>
        </Heading>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FAMILY_ROOTS.facts.map((f) => (
              <div key={f.label} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-center gap-2 text-[#F28C28] mb-2">
                  <Users className="w-4 h-4" />
                  <div className="text-xs font-mono font-bold uppercase tracking-wide">{f.label}</div>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.value}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-2 text-[#F28C28] mb-3">
                <Home className="w-4 h-4" />
                <div className="text-sm font-bold text-[#141414] dark:text-white">Growing up</div>
              </div>
              <div className="space-y-3 text-sm text-[var(--text-muted)] leading-relaxed">
                {FAMILY_ROOTS.childhood.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <Link to="/legacy" className="inline-flex items-center gap-2 text-sm font-bold text-[#F28C28] hover:text-amber-500 group">
              <span>Read the full story of his life</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Presence */}
      <section className="pt-20">
        <Heading kicker="In public" intro="How he shows up in the world.">
          Public <span className="gold-text-gradient">presence</span>
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESENCE.map((p) => (
            <div key={p.title} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <Star className="w-5 h-5 text-[#F28C28] mb-3" />
              <div className="text-lg font-bold text-[#141414] dark:text-white">{p.title}</div>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sources */}
      <section className="pt-20">
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center gap-2 text-[#F28C28] mb-3">
            <Award className="w-4 h-4" />
            <div className="text-sm font-bold uppercase tracking-wide">Sources</div>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-3">Awards totals and facts on this page come from these public sources and may change over time.</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 text-[var(--text-muted)] hover:text-[#F28C28] underline-offset-2 hover:underline">
                  <ExternalLink className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
