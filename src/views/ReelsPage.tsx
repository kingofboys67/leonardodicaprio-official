'use client';

import React from 'react';
import { Video } from 'lucide-react';
import { ReelsBackdrop, ReelsSection } from '../components/ReelsSection';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { getBreadcrumbSchema, getProfilePageSchema } from '../utils/schema';

export const ReelsPage: React.FC = () => {
  const { playReel } = useApp();
  const profilePage = getProfilePageSchema('/reels');
  const breadcrumbs = getBreadcrumbSchema([{ name: 'Video Reels', path: '/reels' }]);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Video Reels | Leonardo DiCaprio Official"
        description="Watch exclusive video reels of Leonardo DiCaprio: Oscar acceptance speeches, Cannes red carpet moments, film trailers, behind the scenes, and fan interactions."
        type="video.other"
        jsonLd={[profilePage, breadcrumbs]}
      />
      {/* The backdrop starts below the navigation bar so the bar keeps its own colour */}
      <div className="relative mt-20 overflow-hidden">
        <ReelsBackdrop />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-5 border border-orange-500/40 bg-black/40 backdrop-blur-md" style={{ color: '#FFB366' }}>
            <Video className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-widest text-[11px]">Video Reels</span>
          </div>
          <h1
            className="cinema-title text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4"
            style={{ color: '#FFFFFF', textShadow: '0 4px 24px rgba(0,0,0,0.55)' }}
          >
            Leonardo on Camera: Clips &amp; <span className="gold-text-gradient">Moments</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
            Red carpets, behind-the-scenes footage from his films, and moments with fans.
          </p>
        </div>

        <ReelsSection onPlayReel={playReel} />
      </div>
    </div>
  );
};
