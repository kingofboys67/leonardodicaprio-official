'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId: string;
  title: string;
  subtitle?: string;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose, youtubeId, title, subtitle }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !youtubeId) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 mb-3 text-white">
          <div className="min-w-0">
            <div className="text-base sm:text-xl font-bold truncate" style={{ color: '#FFFFFF' }}>{title}</div>
            {subtitle && <p className="text-xs sm:text-sm truncate" style={{ color: 'rgba(255,255,255,0.65)' }}>{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              YouTube
            </a>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F28C28] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close trailer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
          <iframe
            key={youtubeId}
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
