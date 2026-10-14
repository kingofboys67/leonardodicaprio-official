'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  Trees,
  Waves,
  Users,
  Heart,
  BookOpen,
  Leaf,
  Vote,
  HandHeart,
} from 'lucide-react';

const FACTS = [
  { value: '≈ 1.2°C', label: 'How much warmer the planet was in 2015–2024 than in the late 1800s', source: 'World Meteorological Organization' },
  { value: '420+ ppm', label: 'Carbon dioxide in the atmosphere, about 50% above pre-industrial levels', source: 'NOAA / Scripps Institution of Oceanography' },
  { value: '73%', label: 'Average fall in monitored wildlife populations since 1970', source: 'WWF / ZSL Living Planet Report 2024' },
  { value: '1 million', label: 'Plant and animal species threatened with extinction', source: 'IPBES Global Assessment, 2019' },
  { value: '≈ 10 million ha', label: 'Forest lost to deforestation each year in the late 2010s', source: 'UN Food and Agriculture Organization' },
  { value: '≈ 21–24 cm', label: 'How far global sea level has risen since 1880', source: 'NASA / NOAA' },
];

const PILLARS = [
  {
    icon: Flame,
    title: 'A warming climate',
    body: 'Heatwaves, wildfires, droughts and floods are becoming more frequent and more intense as the planet warms. The Paris Agreement set the goal of holding warming to well below 2°C and pushing for 1.5°C. Every fraction of a degree matters for the people and places in the way.',
  },
  {
    icon: Trees,
    title: 'Forests and wild places',
    body: 'Forests, wetlands and grasslands pull carbon out of the air and shelter most of the life on land. When they are cleared, that carbon is released and the wildlife is lost. Studies suggest that protecting and restoring nature could deliver up to about a third of the emission cuts needed by 2030.',
  },
  {
    icon: Waves,
    title: 'The oceans',
    body: 'The ocean has absorbed more than 90% of the extra heat trapped by greenhouse gases, and about a quarter of our carbon dioxide. The cost is hotter, more acidic water. Coral reefs are in the middle of a fourth global bleaching event, first declared in 2024.',
  },
  {
    icon: Users,
    title: 'Indigenous guardians',
    body: 'Indigenous Peoples manage or hold rights to about a quarter of the world\'s land, including some of its most biodiverse forests. Protecting their land rights is one of the most effective and fairest ways to protect nature.',
  },
];

const ACTIONS = [
  { icon: BookOpen, title: 'Learn and share', body: 'Read the science, watch the films, and talk about it with the people around you.' },
  { icon: Leaf, title: 'Shrink your footprint', body: 'Cut wasted energy, choose cleaner travel, and eat in ways that spare forests and oceans.' },
  { icon: Vote, title: 'Use your voice', body: 'Vote, write and speak up for strong climate and nature protection where you live.' },
  { icon: HandHeart, title: 'Back frontline groups', body: 'Support the rangers, communities and scientists who defend wild places every day.' },
];

export const PlanetarySection: React.FC = () => {
  return (
    <section
      id="planet"
      className="py-16 sm:py-24 border-t border-[var(--border)] relative overflow-hidden bg-gradient-to-b from-emerald-950/10 via-transparent to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-500 font-semibold mb-4">
            <Heart className="w-3.5 h-3.5 fill-emerald-500" />
            <span>PLANETARY DEFENSE</span>
          </div>
          <h2 className="cinema-title text-3xl sm:text-5xl font-black text-[#141414] dark:text-white mb-5">
            Defending Earth&apos;s <span className="emerald-text-gradient">Wild Heart</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Look at Leonardo&apos;s own pages and one thing stands out: beyond the films, he keeps coming back to the
            planet. Climate change, disappearing wildlife, burning forests and the people defending them are the
            subjects he returns to again and again. This is what he is talking about, in plain terms.
          </p>
        </div>

        {/* State of the planet */}
        <div className="mt-12">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-500 mb-4">
            The state of our planet
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACTS.map((f) => (
              <div key={f.value} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <div className="text-3xl sm:text-4xl font-black text-emerald-500">{f.value}</div>
                <p className="text-sm text-[var(--text)] mt-2 leading-snug">{f.label}</p>
                <p className="text-[11px] font-mono text-[var(--text-muted)] mt-3">Source: {f.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why it matters */}
        <div className="mt-14">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-500 mb-4">
            What is at stake
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PILLARS.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-bold text-[#141414] dark:text-white">{p.title}</div>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leonardo's part */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <h3 className="cinema-title text-2xl sm:text-3xl font-black text-[#141414] dark:text-white mb-4">
              Using a platform for the planet
            </h3>
            <div className="space-y-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              <p>
                Leonardo started the Leonardo DiCaprio Foundation in 1998 and has spent more than twenty years since
                putting his name and voice behind climate and nature. In 2014 he was named a United Nations Messenger
                of Peace focused on climate change, and in 2016 he produced and starred in the documentary{' '}
                <em>Before the Flood</em>.
              </p>
              <p>
                When he accepted his Oscar that same year, he used his speech to call climate change real and urgent,
                and to ask people to support leaders who act on it. Since then he has helped launch Earth Alliance,
                which funds frontline climate and conservation work, and works with Re:wild to protect wildlife and
                wild places around the world.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <div className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider mb-1">Re:wild</div>
              <p className="text-xs text-[var(--text-muted)]">Protecting and restoring wildlife and wild places, working with Indigenous Peoples and local communities.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <div className="text-xs font-mono font-bold text-teal-500 uppercase tracking-wider mb-1">Earth Alliance</div>
              <p className="text-xs text-[var(--text-muted)]">Funding frontline climate and conservation work, including emergency response to wildfires.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <div className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider mb-1">Leonardo DiCaprio Foundation</div>
              <p className="text-xs text-[var(--text-muted)]">Founded in 1998 to protect wild places. In 2021 it joined forces with Global Wildlife Conservation to form Re:wild.</p>
            </div>
          </div>
        </div>

        {/* What you can do + pledge CTA */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-[#0b1d17] via-[#0c1a1f] to-[#0c101c] p-8 sm:p-12">
          <div className="max-w-2xl">
            <div className="text-2xl sm:text-4xl font-black cinema-title" style={{ color: '#FFFFFF' }}>
              The planet needs all of us
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
              No one can fix this alone, but everyone can do something. Here is where to start.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACTIONS.map((a) => (
              <div key={a.title} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <a.icon className="w-5 h-5 text-emerald-400 mb-3" />
                <div className="text-sm font-bold" style={{ color: '#FFFFFF' }}>{a.title}</div>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>{a.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to="/charity#pledge"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all"
              style={{ color: '#FFFFFF' }}
            >
              <span>Take the pledge</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/charity"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/25 hover:border-white/50 hover:bg-white/5 font-semibold text-sm transition-all"
              style={{ color: '#FFFFFF' }}
            >
              <span>Explore his conservation work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
