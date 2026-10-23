'use client';

import React from 'react';
import { Trophy } from 'lucide-react';
import { DarkBackdrop } from '../components/DarkBackdrop';
import { AchievementsStory } from '../components/AchievementsStory';

export const AchievementsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* The backdrop starts below the navigation bar so the bar keeps its own colour */}
      <div className="relative mt-20 overflow-hidden dark-scope">
        <DarkBackdrop image="/assets/portraits/portrait-2008.jpg" side="left" position="50% 12%">
          {/* Right-hand side visual: a giant, faint trophy in a golden glow */}
          <div
            className="hidden lg:block absolute top-10 right-[4%] w-[520px] h-[520px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,182,107,0.20) 0%, rgba(242,140,40,0.06) 45%, transparent 70%)' }}
          />
          <Trophy
            className="hidden lg:block absolute top-16 right-[8%] w-[420px] h-[420px]"
            strokeWidth={0.6}
            style={{ color: 'rgba(245,182,107,0.22)' }}
          />
        </DarkBackdrop>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-6">
          <div className="lg:ml-[42%] text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-5 border border-orange-500/40 bg-black/40 backdrop-blur-md" style={{ color: '#FFB366' }}>
              <Trophy className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase tracking-widest text-[11px]">Hall of Acclaim</span>
            </div>
            <h1
              className="cinema-title text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4"
              style={{ color: '#FFFFFF', textShadow: '0 4px 24px rgba(0,0,0,0.55)' }}
            >
              His Awards, Honours &amp; Global <span className="gold-text-gradient">Recognition</span>
            </h1>
            <p className="max-w-xl text-sm sm:text-base md:text-lg font-light leading-relaxed mx-auto lg:mx-0" style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
              Everything he has achieved: the awards, the honours, the records, his work for the planet, and where he comes from.
            </p>
          </div>
        </div>

        <AchievementsStory />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 -mt-12 text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Background photo: Colin Chou ·{' '}
          <a href="https://commons.wikimedia.org/wiki/File:LeonardoDiCaprioNov08.jpg" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
            CC BY-SA 3.0
          </a>
        </div>
      </div>
    </div>
  );
};
