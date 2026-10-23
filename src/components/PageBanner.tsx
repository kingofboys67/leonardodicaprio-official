'use client';

import React from 'react';

interface PageBannerProps {
  badge: string;
  badgeIcon?: React.ReactNode;
  title: string;
  highlightWord?: string;
  description: string;
  bgGradient?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  badge,
  badgeIcon,
  title,
  highlightWord,
  description,
  bgGradient = 'from-amber-500/10 via-[#F28C28]/5 to-transparent',
}) => {
  return (
    <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden border-b border-[var(--border)]">
      {/* Background ambient lighting */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${bgGradient} pointer-events-none opacity-80`}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#F28C28]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative subtle grid / noise */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-mono text-[#F28C28] dark:text-[#ff9d42] mb-5 border border-[#F28C28]/30 shadow-md">
          {badgeIcon}
          <span className="font-semibold uppercase tracking-widest text-[11px]">{badge}</span>
        </div>

        {/* Page Title */}
        <h1 className="cinema-title text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#141414] dark:text-white mb-4">
          {highlightWord ? (
            <>
              {title.replace(highlightWord, '')}
              <span className="gold-text-gradient">{highlightWord}</span>
            </>
          ) : (
            title
          )}
        </h1>

        {/* Subtitle / Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
